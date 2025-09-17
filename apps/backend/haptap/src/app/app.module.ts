import { AppConfigModule } from '@@be-haptap/app/app-config.module';
import { AppDatabaseModule } from '@@be-haptap/app/app-database.module';
import { AuthModule } from '@@be-haptap/app/auth/auth.module';
import { ProductsModule } from '@@be-haptap/app/products/products.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AppConfigModule, AuthModule, AppDatabaseModule, ProductsModule]
})
export class AppModule {}
