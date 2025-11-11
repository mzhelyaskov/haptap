# Aliases & Paths Configuration

- Status: draft
- Date: 2025-09-14
- Tags: doc, tooling, tsconfig, module-resolution, monorepo
- Deciders: Frontend Architecture Working Group (proposed)

Technical Story: Make imports unambiguous and maintainable by standardizing path aliases across the monorepo.

---

## Context

In a large Nx monorepo, inconsistent import paths (relative hops, deep imports, ad-hoc aliases) make reviews noisy, refactors risky, and dependency graphs opaque. We need a single source of truth for how projects are addressed and a clear visual signal that differentiates internal code from external packages.

## Decision

### 1. Namespace policy

#### Reserved internal prefixes
- `@@fe-*` is reserved for all frontend code (apps & libs).
- `@@be-*` is reserved for all backend code (apps & libs).
- `@@*` FE ↔ BE shared libs

Internal (monorepo) code—apps and libraries—must use aliases prefixed with `@@`.
- Frontend apps: `@@fe-<app-name>/*`
- Backend apps: `@@be-<app-name>/*`
- Frontend libs: `@@fe-<family>/<name>` (e.g., `@@fe-sdk/auth`, `@@fe-features/shifts`, `@@fe-ui/button`)
- Backend libs: `@@be-<family>/<name>` (if present)
- Global libs: `@@fe-<family>` (e.g., `@@api-contracts`)

External/vendor packages keep their natural names (single `@` or bare), e.g. `@angular/*`, `rxjs`, etc.

#### Why this split
- Instant signal: `@@` means “ours” (monorepo), `@`/bare means “vendor.”
- No collisions with third-party scopes.
- Easy to audit/replace internal imports.

### 2. Aliases: `@@` for all internal (apps & libs), `@` (or bare) for external
Define all aliases in the root tsconfig.base.json (or tsconfig.base.ts). One alias per library, pointing at its public API (src/index.ts). Apps may expose a /* glob to their src/*.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@@api-contracts": ["libs/api-contracts/src/index.ts"],
      "@@fe-sdk/auth": ["libs/frontend/sdk/auth/src/index.ts"],
      "@@fe-features/shifts": ["libs/frontend/features/shifts/src/index.ts"],
      "@@fe-ui/button": ["libs/frontend/ui/button/src/index.ts"],
      "@@fe-haptap/web/*": ["apps/frontend/haptap/web/src/*"],
      "@@fe-haptap/mobile/*": ["apps/frontend/haptap/mobile/src/*"],
      "@@be-api/*": ["apps/backend/haptap/src/*"]
    }
  }
}
```

### 3.Alias rules:

- **One canonical alias per library** → points to `src/index.ts`.
- **No self-imports by alias inside a library** → use relative imports internally.
  - Rationale: avoids barrel cycles, keeps internals free to move, and prevents accidental API leaks.
- **Applications import libraries only via aliases** (never relative into libs).
- **No overlapping aliases** (one project ⇢ one alias).
- **Kebab-case** for alias segments: haptap-web, push-notifications, etc.
- **Consistent families** for discoverability: \
  `@@fe-models`, `@@fe-utils`, `@@fe-config`, `@@fe-ui/<cmp>`, `@@fe-shared`, `@@fe-sdk/<svc>`, `@@fe-features/<domain>`, `@@fe-app/<app>/*`


## Consequences
### Positive
- Uniform, human-readable imports across the repo.
- Fewer accidental deep imports; easier refactors.
- Zero namespace collision with vendor scopes.
- Straightforward code search and codemods (@@ is unique).
