import { ProductResponse } from '@@be-api/app/models/pagination-response';
import { Product } from '@@be-api/app/products/entities/product.entity';

export type ProductsSearchResponseDto = ProductResponse<Product>;
