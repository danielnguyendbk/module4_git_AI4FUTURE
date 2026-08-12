import { Controller, Get } from '@nestjs/common';
import {
  InfrastructureHealth,
  InfrastructureHealthService,
} from './infrastructure-health.service';

@Controller('health')
export class InfrastructureHealthController {
  constructor(
    private readonly infrastructureHealthService: InfrastructureHealthService,
  ) {}

  @Get('infrastructure')
  check(): Promise<InfrastructureHealth> {
    return this.infrastructureHealthService.check();
  }
}
