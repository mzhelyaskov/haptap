import { AppConfigModule } from '@app/app-config.module';
import { AppDatabaseModule } from '@app/app-database.module';
import { AuthModule } from '@app/auth/auth.module';
import { ProductsModule } from '@app/products/products.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AppConfigModule, AppDatabaseModule, AuthModule, ProductsModule],
})
export class AppModule {}