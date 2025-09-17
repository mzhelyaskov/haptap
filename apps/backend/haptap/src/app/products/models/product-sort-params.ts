import { SortParams } from '@@be-haptap/app/models/sort-params';
import { Product } from '@@be-haptap/app/products/entities/product.entity';

export type ProductSortParams = SortParams<Pick<Product, 'name' | 'price' | 'rating'>>
