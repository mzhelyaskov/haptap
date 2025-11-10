# Enforcing API Namespace for Shared Contracts

- Status: accepted
- Date: 2025-08-09
- Tags: doc, contracts

---

## Context and Problem Statement

All API contracts (interfaces and enums only) are stored in the `@api/contracts` library.  
This library exists to prevent API contract desynchronization between backend and frontend, ensuring both sides share the exact same type definitions.

On the frontend, we want to clearly separate API models from internal frontend models. 
This prevents leaking backend-specific structures into the internal frontend domain.

This is necessary for:
- Code readability — making it immediately clear when a type comes from backend API contracts.
- Maintainability — avoiding accidental coupling between frontend internal models and backend contracts.
- Scalability — ensuring new developers follow a consistent import style.

## Decision

To avoid confusion between internal models and API models — and to have a consistent import style and clear namespace for all API contracts — direct named imports like:
```ts
import { UserDto } from '@api/contracts'; // ❌ unclear if API or internal
```
are disallowed.

Instead, all API models must be accessed via the `Api` namespace:
```ts
import { Api } from '@api/contracts'; // ✅ explicit API origin
const user: Api.User = ...
```

We will technically enforce that all backend contracts are accessed only via the `Api` namespace.
Direct named imports will not be possible at all. It ensures the `Api` namespace pattern becomes a hard rule, not just a recommendation.


## Implementation
- The contracts library’s index.ts will only export a single Api object containing all public API types.
- There will be no direct exports of DTOs, enums, or types from @haptap/contracts.

**Example:**
```ts
// libs/contracts/src/public-api.ts
export * from './dto/user.dto';
export * from './enums/user-role.enum';

// libs/contracts/src/index.ts
import * as ApiNamespace from './public-api';
export const Api = ApiNamespace;
```
**Usage:**
```ts
// ✅ Allowed
import { Api } from '@haptap/contracts';
const user: Api.UserDto = { ... };

// ❌ Not possible
import { UserDto } from '@haptap/contracts'; // Compilation error
```

## Consequences

### Positive:
- Enforces namespace-based access to shared contracts without relying on linting rules alone.
- Eliminates the risk of inconsistent imports across the codebase.
- Makes it visually obvious when a type originates from backend API contracts.
- Works naturally with IDE auto-imports — they will insert Api. automatically.

### Negative:
- Slightly more verbose usage (Api.X vs X).
- Slightly less flexibility if direct named imports were ever required — changing the architecture later would require modifying index.ts to expose them.
- Maybe unfamiliar to developers used to name imports.

## Rejected Alternatives
### 1. Convention-only
Relying on team discipline to always use `import * as Api`.

**Rejection reasons:**
- No technical enforcement, too easy to break.

### 2. ESLint enforcement rule
Possible to forbid named imports via linting.

**Rejection reasons:**
- Linting can be disabled or skipped in rare cases.

### 3. Separate npm package for contracts
Would also enforce controlled imports, but adds maintenance overhead.

**Rejection reasons:**
- Overkill for a monorepo setup.
