import { UrlSortParamValidator } from '@@be-haptap/app/shared/validators/url-sort-param.validator';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [UrlSortParamValidator],
  exports: [UrlSortParamValidator],
})
export class SharedModule {}
