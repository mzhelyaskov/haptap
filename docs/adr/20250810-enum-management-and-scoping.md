# Enforce API Namespace for Shared API Enums

- Status: accepted
- Date: 2025-08-09
- Tags: contracts, api, enums

Technical Story: Internal architecture decision on where API enums should be stored to ensure consistency between backend and frontend.

---

## Context

Our backend and frontend both rely on enums that represent fixed sets of values defined by the API (e.g., `UserRole`, `OrderStatus`).  
If these enums are duplicated separately in backend and frontend codebases, there is a risk of **desynchronization** — where values diverge over time, leading to bugs and inconsistent behavior.

Currently, without clear rules, enums can end up:
- Defined only in backend code, with the frontend using hardcoded strings.
- Defined in both backend and frontend, but with different names or values.
- Placed in the wrong location inside the shared codebase, making their purpose unclear.

## Decision

All enums that are part of the API contract must be stored in the shared `@api/contracts` library under the `enums/` directory.  
This ensures that:
- Backend and frontend use the **same single source of truth** for API enums.
- Enum values remain consistent across the stack.
- The intent and scope of each enum are clear from its location.

Example structure:
<pre>
libs/
└── contracts/
  └── src/
    └── enums/
      ├── user-role.ts
      ├── order-status.ts
      └── ...
</pre>

Example usage:

```ts
// Backend and Frontend
import { Api } from '@api/contracts';
const userRole: Api.UserRole = ...
```

## Consequences
### Positive
- Eliminates duplication of enum definitions.
- Guarantees that frontend and backend always use the same values.
- Simplifies maintenance by having a single place to update enums.
### Negative
- Backend code must avoid adding server-only logic to enums stored in @api/contracts.
- Shared library becomes a dependency for both frontend and backend builds.

## Rejected Alternatives
1. Duplicating enums in the backend and frontend

   **Rejection reasons:**
   - High risk of desynchronization between frontend and backend.
   - Increases maintenance effort when API changes occur.


3. Storing enums only in the backend and generating frontend types

   **Rejection reason:**
   - Requires additional build steps and tooling for code generation.
   - Increases complexity for local development, especially when the backend is not running.


3. Storing enums only in the frontend

   **Rejection reason:**
   - Backend would have no shared reference for values, leading to possible mismatches in logic.
   - Violates the principle of the backend owning the API contract definition.
