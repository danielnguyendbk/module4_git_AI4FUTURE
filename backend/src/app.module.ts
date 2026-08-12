import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureHealthModule } from './infrastructure/infrastructure-health.module';

@Module({
  imports: [InfrastructureHealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
