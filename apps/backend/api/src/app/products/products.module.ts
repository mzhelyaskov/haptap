import { SharedModule } from '@@be-api/app/shared/shared.module';
import { Product } from '@@be-api/app/products/entities/product.entity';
import { ProductsController } from '@@be-api/app/products/products.controller';
import { ProductsService } from '@@be-api/app/products/products.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
