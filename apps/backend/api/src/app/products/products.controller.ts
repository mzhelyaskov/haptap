import { JwtAuthGuard } from '@@be-api/app/auth/guards/jwt-auth.guard';
import { CreateProductDto } from '@@be-api/app/products/dto/create-product.dto';
import { ProductQueryParamsDto } from '@@be-api/app/products/dto/product-query-params.dto';
import { ProductsSearchResponseDto } from '@@be-api/app/products/dto/products-search-response.dto';
import { UpdateProductDto } from '@@be-api/app/products/dto/update-product.dto';
import { Product } from '@@be-api/app/products/entities/product.entity';
import { ProductsService } from '@@be-api/app/products/products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getProducts(@Query() query: ProductQueryParamsDto): Promise<ProductsSearchResponseDto> {
    return this.productsService.getByParams$(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOneWithComments(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    const product: Product | null = await this.productsService.getProductWithComments$(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create$(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update$(id, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<UpdateProductDto>,
  ): Promise<Product> {
    return this.productsService.update$(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove$(id);
  }
}
