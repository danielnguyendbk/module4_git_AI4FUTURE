import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Pool } from 'pg';

type DependencyStatus = 'up' | 'down';

interface DependencyHealth {
  status: DependencyStatus;
}

export interface InfrastructureHealth {
  status: 'ok' | 'error';
  database: DependencyHealth;
  redis: DependencyHealth;
}

@Injectable()
export class InfrastructureHealthService {
  async check(): Promise<InfrastructureHealth> {
    const [database, redis] = await Promise.all([
      this.checkDatabase(),
      this.checkRedis(),
    ]);

    return {
      status: database.status === 'up' && redis.status === 'up' ? 'ok' : 'error',
      database,
      redis,
    };
  }

  private async checkDatabase(): Promise<DependencyHealth> {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return { status: 'down' };
    }

    const pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 3000,
    });

    try {
      await pool.query('SELECT 1');
      return { status: 'up' };
    } catch {
      return { status: 'down' };
    } finally {
      await pool.end();
    }
  }

  private async checkRedis(): Promise<DependencyHealth> {
    const connectionUrl = process.env.REDIS_URL;
    if (!connectionUrl) {
      return { status: 'down' };
    }

    const client = new Redis(connectionUrl, {
      connectTimeout: 3000,
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      retryStrategy: () => null,
    });

    try {
      await client.connect();
      const response = await client.ping();
      return { status: response === 'PONG' ? 'up' : 'down' };
    } catch {
      return { status: 'down' };
    } finally {
      client.disconnect();
    }
  }
}
