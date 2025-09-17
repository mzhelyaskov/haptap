import { SortDirection } from './sort-direction';

export declare type SortParams<T> = {
  [K in keyof T]?: SortDirection;
}