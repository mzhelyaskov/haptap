# Data Model Naming Convention

- Status: Accepted
- Date: 2025-08-10
- Tags: naming, contracts, dto, entity

---

## Context

Our application architecture consists of several distinct data structure types:

- **Entities**: TypeORM classes that map to database tables.
-  **API Contract Interfaces**: Pure TypeScript `interface` types in a shared library (`api-contracts`) that define the shape of data exchanged between the client and server.
- **Back-end DTOs**: NestJS classes used in controllers to handle incoming data (`@Body`, `@Query`) and format outgoing data. These classes contain validation decorators.

Without a consistent naming convention, it can be difficult to distinguish between these different structures, leading to confusion and potential errors. We need a clear, predictable system for naming these data structures to improve code readability and maintainability.

## Decision

We will adopt a suffix-based naming convention for types and files to clearly identify the purpose of each data structure.

1.  **Entities**:
  -   **Type Name**: No suffix. Represents the core domain object. Example: `User`, `Product`.
  -   **File Name**: Use `.entity.ts` suffix. Example: `user.entity.ts`, `product.entity.ts`.

2.  **API Contract Interfaces**:
  -   **Type Name**: Use `Request` and `Response` suffixes. Example: `CreateUserRequest`, `UserResponse`.
  -   **File Name**: Use `.interfaces.ts` suffix. Group related interfaces by domain. Example: `user.interfaces.ts`.

3.  **Back-end DTOs**:
  -   **Type Name**: Use a `Dto` suffix. The name should also clearly describe its specific use. Example: `CreateUserDto`, `ProductQueryParamsDto`.
  -   **File Name**: Use `.dto.ts` suffix. Example: `create-user.dto.ts`, `product-query-params.dto.ts`.

## Consequences

### Positive

- **Improved Readability**: The purpose of any given class or interface is immediately clear from its name, reducing ambiguity.
- **Self-Documenting Code**: The convention makes the code easier to understand without needing to check import paths or definitions.
- **Consistency**: A unified standard across the repository makes the codebase more predictable and easier for new developers to learn.
- **Better File Navigation**: Suffixes make it easier to search for and identify specific types of files in the IDE.

### Negative

- **Longer Names**: This convention can result in slightly more verbose names for classes and interfaces (e.g., `ProductsSearchResponseDto`). This is a minor trade-off for the clarity it provides.
- **Requires Discipline**: The team must adhere to the convention for it to be effective.

## Rejected Alternatives

### 1. Using a single generic name (e.g., `User`) for all layers and files

**Rejection reasons:**
- Creates significant confusion and potential for naming collisions. It becomes impossible to know if `User` refers to the database entity, the API request payload, or the API response without checking the import path or file content.
- This approach hides the critical distinction between the internal database model and the public API contract, which can lead to accidentally leaking sensitive data.

### 2. Using an "I" prefix for interfaces (e.g., `IUserResponse`)

**Rejection reasons:**
- This is a legacy convention often seen in languages like C# or Java. It is generally discouraged in the modern TypeScript community as being redundant.
- The name of a type should describe its purpose (e.g., it's a `Response`), not what kind of type it is (an `interface`).

### 3. Using only a `Dto` suffix for all API-related structures

**Rejection reasons:**
- This convention is not descriptive enough. A name like `UserDto` doesn't clarify if it's for creating a user (and thus might contain a password) or for responding with user data (which should never contain a password).
- The `Request` / `Response` suffix pattern provides more specific and valuable context about the data's purpose and direction of flow.
