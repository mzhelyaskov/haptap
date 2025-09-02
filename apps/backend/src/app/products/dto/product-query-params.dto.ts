import { ProductConstants } from '@app/products/constants';
import { ProductSortParams } from '@app/products/models/product-sort-params';
import { UrlSortParamValidator } from '@app/shared/validators/url-sort-param.validator';
import { UrlSortParamTransformer } from '@app/utils/transformers/url-sort-params.transformer';
import { Expose, Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, Validate } from 'class-validator';

export class ProductQueryParamsDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page: number = 1;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = 10;

  @Expose({ name: 'sort' })
  @IsOptional()
  @IsString()
  @Validate(UrlSortParamValidator, ProductConstants.SORTABLE_FIELDS)
  private _rawSort?: string;

  get sort(): ProductSortParams | undefined {
    return UrlSortParamTransformer.transform(this._rawSort);
  }

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  maxPrice?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  @Transform(({ value }) => parseInt(value, 10))
  rating?: number;

  @IsOptional()
  @IsString()
  query?: string;
}