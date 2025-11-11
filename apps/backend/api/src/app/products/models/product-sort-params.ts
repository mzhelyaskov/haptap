import { SortParams } from '@@be-api/app/models/sort-params';
import { Product } from '@@be-api/app/products/entities/product.entity';

export type ProductSortParams = SortParams<Pick<Product, 'name' | 'price' | 'rating'>>
