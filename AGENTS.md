# AGENTS.md

## Development Commands

- `yarn start` - Start Metro bundler
- `yarn android` - Run Android app
- `yarn lint` - Run ESLint
- `yarn test` - Run Jest tests
- `yarn test --testNamePattern="test name"` - Run single test
- `yarn fresh:android` - Clean cache and run Android (recommended)

## Code Style Guidelines

- Use TypeScript strict mode for all new files
- Import order: React → React Native → third-party → local imports
- Use functional components with React.FC type
- Prefer async/await over promises
- Always wrap async operations in try-catch blocks
- Use descriptive variable names (no single letters except loops)
- Follow Prettier config: single quotes, trailing commas, arrow parens avoided
- Component props interfaces: ComponentNameProps
- Export types from centralized src/types/index.ts
- Use const by default, let when necessary, never var
- Add JSDoc comments for all functions
- Follow React Native accessibility patterns (accessibilityLabel, accessibilityRole)
