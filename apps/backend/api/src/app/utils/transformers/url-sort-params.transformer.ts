import { SortDirection } from '@@be-api/app/models';
import { SortParams } from '@@be-api/app/models/sort-params';
import { Memoize } from '@@be-api/app/shared/decorators/memoize.decorator';

export class UrlSortParamTransformer {
  @Memoize()
  static transform<T>(sortQuery: unknown): SortParams<T> | undefined {
    if (typeof sortQuery !== 'string') {
      return undefined;
    }
    const sortParams: SortParams<T> = {};
    for (const fieldToSortDirection of sortQuery.split(',')) {
      const [field, direction] = fieldToSortDirection.split(':') as [
        keyof T,
        SortDirection
      ];
      if (field && direction) {
        sortParams[field] = direction as SortDirection;
      }
    }
    return Object.keys(sortParams).length > 0 ? sortParams : undefined;
  }
}
