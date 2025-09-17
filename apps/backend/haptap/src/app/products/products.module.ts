import { SharedModule } from '@@be-haptap/app/shared/shared.module';
import { Product } from '@@be-haptap/app/products/entities/product.entity';
import { ProductsController } from '@@be-haptap/app/products/products.controller';
import { ProductsService } from '@@be-haptap/app/products/products.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
