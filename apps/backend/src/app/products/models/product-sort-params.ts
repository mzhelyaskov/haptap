import { SortParams } from '@app/models/sort-params';
import { Product } from '@app/products/entities/product.entity';

export type ProductSortParams = SortParams<Pick<Product, 'name' | 'price' | 'rating'>>