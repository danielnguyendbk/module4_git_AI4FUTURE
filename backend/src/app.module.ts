import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { InfrastructureHealthModule } from './infrastructure/infrastructure-health.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DocumentsModule, InfrastructureHealthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
