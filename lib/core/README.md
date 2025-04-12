# Clean Architecture Implementation

This directory contains the implementation of Clean Architecture principles for the Protected Animals project.

## Directory Structure

- **domain**: Contains the core business logic and entities
  - **entities**: Business objects and repository interfaces
- **usecases**: Contains the application-specific business rules
  - **species**: Use cases related to species
  - **blog**: Use cases related to blog posts
- **factories**: Factories for creating use cases and repositories

## Clean Architecture Principles

The implementation follows these key principles:

1. **Independence of frameworks**: The core business logic is independent of UI, database, or external frameworks
2. **Testability**: Business rules can be tested without UI, database, or external dependencies
3. **Independence of UI**: The UI can change without changing the business rules
4. **Independence of database**: The database can be changed without affecting the business logic
5. **Independence of external agencies**: Business rules don't know anything about the outside world

## Usage Example

```typescript
// Get a use case from the factory
const getFeaturedSpeciesUseCase = SpeciesFactory.createGetFeaturedSpeciesUseCase();

// Execute the use case
const species = await getFeaturedSpeciesUseCase.execute(6);
```

## Benefits

- **Maintainability**: Changes to one part of the system don't affect other parts
- **Testability**: Business logic can be tested in isolation
- **Flexibility**: Easy to swap implementations (e.g., change from Supabase to another database)
- **Scalability**: New features can be added without modifying existing code
