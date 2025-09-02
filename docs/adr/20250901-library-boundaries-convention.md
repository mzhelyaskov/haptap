# Library boundaries convention 

- Status: draft
- Tags: doc, project-structure, module-boundaries

---

## Context

[Describe the context and problem statement, e.g., in free form using two to three sentences. You may want to articulate the problem in form of a question.]

## Decision

### Allowed Dependencies
The table below shows the allowed dependencies between architectural layers. The vertical axis (Dependent Layer) represents
the layer that is importing, and the horizontal axis represents the layers that can be imported.

| **Dependent Layer** | `@models` | `@utils` | `@shared` | `@config` | `@ui` | `@sdk/*` | `@features/*` | `@scopes/*` |
|:---------------------| :---| :---| :---| :---| :---| :---| :---| :---|
| **`@scopes/*`**      | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | X |
| **`@features/*`**    | ✅ | ✅ | ✅ | X | ✅ | ✅ | X | X |
| **`@sdk/*`**         | ✅ | ✅ | X | X | ✅ | X | X | X |
| **`@ui`**            | ✅ | ✅ | X | X | X | X | X | X |
| **`@config`**        | ✅ | ✅ | X | X | X | X | X | X |
| **`@shared`**        | ✅ | ✅ | X | X | ✅ | X | X | X |
| **`@utils`**         | ✅ | X | X | X | X | X | X | X |
| **`@models`**        | X | X | X | X | X | X | X | X |


_For example, the table shows that `@scopes/*` can import from any layer except other `@scopes/*`, while `@ui` can only depend on `@models` and `@utils`._



```
├── apps/
│   ├── frontend/ (dir)                                                   # All frontend apps
│   │   ├── my-app/ (dir)
│   │   │   ├── web (app)                 @fe-my-app/web/*                # WEB application
│   │   │   │   └── src/
│   │   │   │       ├── api/                                              # Implements API calls (e.g. via HTTP)
│   │   │   │       │   └── any.api.ts
│   │   │   │       ├── components/
│   │   │   │       │   └── example/
│   │   │   │       │       ├── example.component.ts
│   │   │   │       │       ├── example.component.html
│   │   │   │       │       ├── example.component.scss
│   │   │   │       │       └── example-component.service.ts
│   │   │   │       ├── config/
│   │   │   │       │   └── app-routes.config.ts
│   │   │   │       ├── dialogs/                                          # Dialog component and dialog related classes
│   │   │   │       │   └── info
│   │   │   │       │       ├── info.dialog.ts
│   │   │   │       │       └── info-dialog.service.ts
│   │   │   │       ├── directives/
│   │   │   │       │   └── any.directive.ts
│   │   │   │       ├── guards/
│   │   │   │       │   └── any.guard.ts
│   │   │   │       ├── mappers/
│   │   │   │       │   └── any.mapper.ts
│   │   │   │       ├── models/
│   │   │   │       │   └── any.ts | any.model.ts
│   │   │   │       ├── features/                                         # Application level features (modules)
│   │   │   │       │   ├── auth/
│   │   │   │       │   ├── chat/
│   │   │   │       │   └── ...
│   │   │   │       ├── pages/                                            # Page module and other page-specific files
│   │   │   │       │   ├── marketplace/
│   │   │   │       │   └── shifts/
│   │   │   │       ├── pipes/
│   │   │   │       │   └── any.pipe.ts
│   │   │   │       ├── providers/                                        # Dependency provider functions
│   │   │   │       │   └── any.provider.ts
│   │   │   │       ├── resolvers/
│   │   │   │       │   └── any.resolver.ts
│   │   │   │       ├── services/
│   │   │   │       │   ├── any.service.ts
│   │   │   │       │   └── any.strategy.ts
│   │   │   │       ├── store/
│   │   │   │       │   ├── app.actions.ts
│   │   │   │       │   ├── app.state.ts
│   │   │   │       │   ├── some.store                                    # Data-specific storage
│   │   │   │       │   └── some.repository.ts                            # Data-specific repository
│   │   │   │       ├── tokens/
│   │   │   │       │   └── any.token.ts
│   │   │   │       └── tests/
│   │   │   │           ├── mocks/                                        # Global mocks
│   │   │   │           └── utils/                                        # Any test shared functionality / global test utils
│   │   │   │
│   │   │   └── mobile/ (app)             @fe-my-app/web/*                # Mobile application
│   │   │       └── src/
│   │   │           └── ...
│   │   │
│   │   ├── dev-portal/ (app)
│   │   ├── dashboard/ (app)
│   │   └── ...
│   │
│   └── backend/                                                          # All backend apps
│       ├── my-app/ (app)
│       └── ...
│
└── libs/ (dir)
    ├── api-contracts/ (lib)              @@api-contracts/*               # Shared API contracts between frontend and backend
    ├── frontend/ (dir)                                                   # All frontend libraries
    │   ├── @assets/ (dir)
    │   ├── @styles/ (dir)                                                # Global styles
    │   │
    │   ├── features/ (dir)                                               # Directory with domain specific libraries
    │   │   └── shifts/ (lib)             @@fe-features/shifts/*          # Domain specific library example
    │   │       ├── api/ (dir)
    │   │       │   ├── in/ (dir)                                         # Provides public functionalities exposed to other feature libs that depend on this feature library
    │   │       │   └── out/ (dir)                                        # Implements dependencies for API calls (e.g. via HTTP)
    │   │       ├── shell/ (dir)                                          # Shell container components, router configuration, and use case specific "smart/page" components
    │   │       ├── services/ (dir)                                       # Business logic
    │   │       ├── store/ (dir)
    │   │       ├── ui/ (dir)                                             # Feature-library specific ui components
    │   │       └── ...
    │   │
    │   ├── apps/ (dir)                                                   # Contains directories with application-specific libraries
    │   │   ├── my-app/ (dir)
    │   │   │   ├── @assets/ (dir)                                        # Application-specific assets
    │   │   │   ├── @styles/ (dir)                                        # Application-specific styles
    │   │   │   ├── features/ (dir)
    │   │   │   │   ├── calendar/ (lib)   @@fe-my-app/features/calendar/*
    │   │   │   │   └── ...
    │   │   │   ├── models/ (lib)         @@fe-my-app/models/*
    │   │   │   ├── ui/ (lib)             @@fe-my-app/ui/*
    │   │   │   └── ...
    │   │   └── ...
    │   │
    │   ├── sdk/ (dir)                                                    # Use case agnostic independent libraries
    │   │   ├── auth/ (lib)               @@fe-sdk/auth/*
    │   │   ├── analytics/ (lib)          @@fe-sdk/analytics/*
    │   │   ├── dialogs/ (lib)            @@fe-sdk/dialogs/*
    │   │   ├── router/ (lib)             @@fe-sdk/router/*
    │   │   └── ... 
    │   │
    │   ├── models/ (lib)                 @@fe-models/*                   # All global models
    │   ├── config/ (lib)                 @@fe-config/*                   # Global configuration
    │   ├── shared/ (lib)                 @@fe-shared/*                   # Global shared files
    │   │   ├── animations/ (dir)         @@fe-shared/animations/*
    │   │   ├── components/ (dir)         @@fe-shared/components/*
    │   │   ├── providers/ (dir)          @@fe-shared/providers/*
    │   │   └── ...
    │   │
    │   ├── ui/ (dir)                                                     # Generic and configurable UI libraries for all frontend apps
    │   │   ├── alert/ (lib)              @@fe-ui/alert/*
    │   │   ├── button/ (lib)             @@fe-ui/button/*
    │   │   └── ...
    │   │
    │   └── utils/ (lib)                  @@fe-utils/*                    # Library with use case agnostic utility functions
    │
    └── backend/ (dir)                                                    # All backend libraries
```


[Describe result decisions what and how we do]

## Consequences
### Positive <!-- optional -->

- [e.g., improvement of quality attribute satisfaction, follow-up decisions required, …]
- …

### Negative <!-- optional -->

- [e.g., compromising quality attribute, follow-up decisions required, …]
- …

## Rejected Alternatives
1. [Rejection reason title example 1]

   **Rejection reasons:**
  - High risk of desynchronization between frontend and backend.
  - Increases maintenance effort when API changes occur.


3. S[Rejection reason title example 1]

   **Rejection reason:**
  - Requires additional build steps and tooling for code generation.
  - Increases complexity for local development, especially when backend is not running.


3. Storing enums only in frontend

   **Rejection reason:**
  - Backend would have no shared reference for values, leading to possible mismatches in logic.
  - Violates the principle of the backend owning the API contract definition.

- … <!-- numbers of reasons can vary -->

### … <!-- numbers of Rejected Alternatives can vary -->
