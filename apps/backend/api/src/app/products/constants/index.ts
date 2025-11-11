import { ProductSortParams } from '@@be-api/app/products/models/product-sort-params';

export class ProductConstants {
  static readonly SORTABLE_FIELDS: (keyof ProductSortParams)[] = ['name', 'price', 'rating'];
}
