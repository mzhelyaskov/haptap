import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from '@@be-api/app/products/dto/create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
