import { AppConfigModule } from '@@be-api/app/app-config.module';
import { AppDatabaseModule } from '@@be-api/app/app-database.module';
import { AuthModule } from '@@be-api/app/auth/auth.module';
import { ProductsModule } from '@@be-api/app/products/products.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AppConfigModule, AuthModule, AppDatabaseModule, ProductsModule]
})
export class AppModule {}
