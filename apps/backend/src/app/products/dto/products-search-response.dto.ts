import { ProductResponse } from '@app/models/pagination-response';
import { Product } from '@app/products/entities/product.entity';

export type ProductsSearchResponseDto = ProductResponse<Product>;