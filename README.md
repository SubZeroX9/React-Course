# React Vite Nx Monorepo

A React 19 application built with Vite, organized as an Nx monorepo with proper library structure and module boundaries.

## How to Run

### Development
```bash
npx nx serve react-app
# Or use npm script
npm run dev
```

### Build
```bash
npx nx build react-app
# Or use npm script
npm run build
```

### Lint
```bash
# Lint the main app
npx nx lint react-app

# Lint all projects
npx nx run-many -t lint --all
```

### Test
```bash
# Run E2E tests
npx nx test:e2e react-app
# Or use npm script
npm run test:e2e
```

### Project Graph
```bash
npx nx graph
```

## Workspace Structure

### Apps
- **react-app**: Main React application with Vite, React Router, TanStack Query, and PrimeReact UI

### Libraries

#### Required Libraries (Homework)
- **ui**: Reusable UI components (ToastContainer, Header, Footer, ProductCard, FilterSidebar, ThemeSwitcher, LanguageSwitcher, StarRating)
- **hooks**: TanStack Query hooks (useProducts, useProduct, useCategories, usePrefetchProduct)
- **i18n**: Internationalization (i18next config, useRTL hook, language store, translations for en/he)

#### Additional Libraries (Better Organization)
- **stores**: Zustand state management (filterStore, themeStore, toastStore)
- **context**: React Context providers (SidebarContext, SidebarProvider, useLocalStorage, useSidebar)
- **api**: API client and functions (Axios client, getProducts, getCategoryList, getProductById)
- **types**: Shared TypeScript interfaces (Product, ProductSummary, PaginatedResponse)
- **utils**: Utility functions (queryKeys for TanStack Query, themeLoader for dynamic PrimeReact themes)

## Architecture Rules (Module Boundaries)

Nx enforces clean architecture through ESLint `@nx/enforce-module-boundaries` rules:

### Dependency Hierarchy
```
types (no dependencies)
  ↓
utils (depends on: types)
  ↓
api, stores (depend on: types, utils)
  ↓
hooks (depends on: api, stores, types, utils)
  ↓
context (depends on: stores, hooks, types, utils)
i18n (depends on: stores, types, utils)
  ↓
ui (depends on: hooks, stores, context, i18n, types, utils)
  ↓
app (can depend on all libs)
```

### Rules Enforced
- **Apps** can depend on all libs
- **UI** can depend on: hooks, stores, context, i18n, types, utils
- **Hooks** can depend on: api, stores, types, utils
- **i18n** can depend on: stores, types, utils
- **Stores** can depend on: types, utils
- **Context** can depend on: stores, hooks, types, utils
- **API** can depend on: types, utils
- **Utils** can depend on: types
- **Types** has no dependencies
- **Libs cannot import from apps** (enforced automatically)

## Nx Affected Demo

Affected projects are determined based on git changes. On the `nx-migration` branch (created for this homework), all projects show as affected since it's a new branch diverging from `main`:

```bash
$ npx nx show projects --affected

react-app
api
hooks
ui
context
i18n
stores
types
utils
```

Running affected tasks:
```bash
$ npx nx affected -t lint,build,test

NX   Affected criteria defaulted to --base=main --head=HEAD

NX   Running targets lint, build for project react-app:
- react-app
```

Nx intelligently runs tasks only for projects affected by changes, improving CI/CD performance by skipping unchanged projects.

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Vite 7** for dev server and builds
- **Nx** for monorepo management and caching
- **React Router v7** for routing
- **TanStack Query v5** for server state management
- **Zustand** for global client state
- **PrimeReact** for UI components
- **i18next** for internationalization (English/Hebrew)
- **React Hook Form + Zod** for form validation
- **Tailwind CSS** for styling
- **Playwright** for E2E testing

## Path Aliases

TypeScript and Vite are configured with path aliases for cleaner imports:

```typescript
@react-app/types     → libs/types/src/index.ts
@react-app/utils     → libs/utils/src/index.ts
@react-app/api       → libs/api/src/index.ts
@react-app/stores    → libs/stores/src/index.ts
@react-app/hooks     → libs/hooks/src/index.ts
@react-app/context   → libs/context/src/index.ts
@react-app/i18n      → libs/i18n/src/index.ts
@react-app/ui        → libs/ui/src/index.ts
```
