import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV } from '@@be-api/environments/tokens';
import { environment } from '@@be-api/environments/env';
import { EnvVarsSchema } from '@@be-api/environments/schemas';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environment],
      validationSchema: EnvVarsSchema
    }),
  ],
  providers: [{ provide: ENV, useFactory: environment }],
  exports: [ENV, ConfigModule],
})
export class AppConfigModule {}
