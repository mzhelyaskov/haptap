# Interface first API contracts

- Status: accepted
- Date: 2025-08-09
- Tags: doc, contracts

---

## Context and Problem Statement

Our application requires a clear, stable, and strongly-typed contract for data exchange between the back-end API and its clients (e.g., the front-end). Without a well-defined strategy, there is a risk of implicit contracts, inconsistencies, and tight coupling between the server's implementation and the client's implementation. We need to establish a "single source of truth" for all API data structures that can be easily shared and consumed by different parts of the system.

## Decision

We will adopt the **"Interface-first"** approach for defining our API contracts. This means that a plain TypeScript `interface` will be the single source of truth for the shape of our API data.

Here’s how it works in practice:

**1. Create Shared Interfaces in a Common Library**

All data structures for API requests and responses will be defined as `interface` types in a shared, framework-agnostic library (`libs/api-contracts`).

**Example: `libs/api-contracts/src/lib/user.ts`**
```typescript
export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  password: string;
}
```

**2. Back-end DTOs Implement the Shared Interfaces**

On the back-end, our NestJS DTO classes will implement these shared interfaces. This ensures our API follows the contract and allows us to add validation decorators.

**Example: `apps/backend/src/auth/dto/create-user.dto.ts`**

```typescript
import { CreateUserRequest } from '@my-workspace/api-interfaces';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
}
```

**3. Front-end Services Use the Shared Interfaces for Typing**

On the front-end, our API services will import and use the interfaces directly for strong type safety in requests and responses.

**Example: `apps/frontend/src/app/user.api.ts`**

```typescript
import { Api } from '@haptap/contracts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class UserApiService {
  constructor(private http: HttpClient) {}

  createUser(data: Api.CreateUserRequest): Observable<Api.UserResponse> {
    return this.http.post<UserResponse>('/api/users', data);
  }
}
```

## Consequences

### Positive:

- **Explicit and Stable Contract:** The API contract is explicitly defined and decoupled from any implementation details of the server or client.
- **Strong Typing Across the Stack:** Both front-end and back-end can rely on the same TypeScript types, reducing the chance of integration errors.
- **Improved Collaboration:** Teams can work independently on the client and server, relying on the shared interfaces as a firm agreement.
- **Framework Agnostic:** The contract library contains no dependencies on NestJS, Angular, React, or any other framework, making it truly reusable and future-proof.

### Negative:

* **Minor Code Duplication:** It is necessary to declare properties in both the interface and the implementing DTO class on the back-end (to add decorators). We consider this an acceptable trade-off for architectural purity and stability.

## Rejected Alternatives

### 1. Using DTO Classes as the Shared Contract

This approach suggests placing DTO **classes** (potentially with back-end validation decorators) in the shared library instead of interfaces.

**Rejection reason:**
- **Unwanted Dependencies on the Client:** This would force the front-end to depend on back-end-specific libraries like `class-validator`. This pollutes the client-side bundle with unnecessary code and creates a tight coupling to the back-end's technology stack.
- **Violation of Separation:** The contract should only define the "shape" of the data, not its validation logic or behavior. Mixing these concerns makes the contract less clean and reusable.

### 2. No Shared Contract (Implicit Contract)

In this approach, the front-end would manually create its own interfaces to match what it expects from the API response.

**Rejection reason:**
- **High Risk of Desynchronization:** Any change on the back-end API could break the front-end without any compile-time errors. This leads to runtime bugs that are difficult to track.
- **Duplication of Effort:** Both teams would be defining the same data structures independently, which is inefficient and error-prone.
- **Lack of a Single Source of Truth:** It becomes unclear which definition of a data structure is the correct one, leading to confusion and maintenance overhead.
