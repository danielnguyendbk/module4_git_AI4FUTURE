import { Module } from '@nestjs/common';
import { InfrastructureHealthController } from './infrastructure-health.controller';
import { InfrastructureHealthService } from './infrastructure-health.service';

@Module({
  controllers: [InfrastructureHealthController],
  providers: [InfrastructureHealthService],
})
export class InfrastructureHealthModule {}
