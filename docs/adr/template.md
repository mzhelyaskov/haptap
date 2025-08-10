# [short title of solved problem and solution]

- Status: [draft | proposed | rejected | accepted | deprecated | … | superseded by [xxx](yyyymmdd-xxx.md)] <!-- optional -->
- Deciders: [list everyone involved in the decision] <!-- optional -->
- Date: [YYYY-MM-DD when the decision was last updated] <!-- optional. To customize the ordering without relying on Git creation dates and filenames -->
- Tags: [space and/or comma separated list of tags] <!-- optional -->

Technical Story: [description | ticket/issue URL] <!-- optional -->

---

## Context

[Describe the context and problem statement, e.g., in free form using two to three sentences. You may want to articulate the problem in form of a question.]

## Decision

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
