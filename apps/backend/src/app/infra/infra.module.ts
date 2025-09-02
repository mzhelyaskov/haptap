import { RedirectService } from '@app/infra/services/redirect.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [RedirectService],
  exports: [RedirectService],
})
export class InfraModule {}