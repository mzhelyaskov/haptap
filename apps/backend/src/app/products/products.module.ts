import { Product } from '@app/products/entities/product.entity';
import { ProductsController } from '@app/products/products.controller';
import { ProductsService } from '@app/products/products.service';
import { SharedModule } from '@app/shared/shared.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}