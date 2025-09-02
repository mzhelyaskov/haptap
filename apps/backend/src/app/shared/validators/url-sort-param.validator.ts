import { SortDirection } from '@app/models/sort-direction';
import { Memoize } from '@app/shared/decorators/memoize.decorator';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

enum ErrorReason {
  FIELD,
  DIRECTION
}

@ValidatorConstraint({ name: 'UrlSortParamValidator', async: false })
export class UrlSortParamValidator implements ValidatorConstraintInterface {
  private errorReason: ErrorReason | null = null;
  private invalidSortField: string | null = null;
  private invalidSortDirection: string | null = null;

  @Memoize({ length: 1 })
  validate(sortQuery: string, args: ValidationArguments): boolean {
    this.resetValidationContext();
    for (const fieldToSortDirection of sortQuery.split(',')) {
      const [field, direction] = fieldToSortDirection.split(':');
      if (!field && !direction) {
        continue;
      }
      this.invalidSortField = field;
      this.invalidSortDirection = direction;
      if (!this.isValidSortableField(field, args.constraints)) {
        this.errorReason = ErrorReason.FIELD;
        return false;
      }
      if (!this.isValidSortDirection(direction)) {
        this.errorReason = ErrorReason.DIRECTION;
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    if (this.errorReason === ErrorReason.FIELD) {
      return this.buildFieldErrorMessage(args.constraints);
    }
    if (this.errorReason === ErrorReason.DIRECTION) {
      return this.buildDirectionErrorMessage();
    }
    return 'Invalid sort value';
  }

  private isValidSortableField(field: string, allowedFields: string[]): boolean {
    return allowedFields.includes(field);
  }

  private isValidSortDirection(direction: string): direction is SortDirection {
    return Object.values(SortDirection).includes(direction as SortDirection);
  }

  private buildFieldErrorMessage(allowedFields: string[]): string {
    return [
      `Invalid sort field: ${this.invalidSortField}.`,
      `Allowed fields: ${allowedFields.join(', ')}.`
    ].join(' ');
  }

  private buildDirectionErrorMessage(): string {
    return [
      `Invalid sort direction: ${this.invalidSortDirection} on field: ${this.invalidSortField}.`,
      `Allowed directions: ${SortDirection.ASC} or ${SortDirection.DESC}.`
    ].join(' ');
  }

  private resetValidationContext(): void {
    this.errorReason = null;
    this.invalidSortField = null;
    this.invalidSortDirection = null;
  }
}