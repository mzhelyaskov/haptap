import { SortParams } from '@app/models/sort-params';
import { Memoize } from '@app/shared/decorators/memoize.decorator';

export class UrlSortParamTransformer {

  @Memoize()
  static transform<T>(sortQuery: unknown): SortParams<T> | undefined {
    if (typeof sortQuery !== 'string') {
      return undefined;
    }
    const sortParams: SortParams<T> = {};
    for (const fieldToSortDirection of sortQuery.split(',')) {
      const [field, direction] = fieldToSortDirection.split(':');
      if (field && direction) {
        sortParams[field] = direction as SortParams<T>;
      }
    }
    return Object.keys(sortParams).length > 0 ? sortParams : undefined;
  }
}