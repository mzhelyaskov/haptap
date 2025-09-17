import { ProductResponse } from '@@be-haptap/app/models/pagination-response';
import { Product } from '@@be-haptap/app/products/entities/product.entity';

export type ProductsSearchResponseDto = ProductResponse<Product>;
