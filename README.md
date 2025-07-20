# React Pokemon Search demo

## Project Overview

This project is a React 19 + TypeScript + Vite app for reusable, accessible form and UI components, styled with Bootstrap (via react-bootstrap). It demonstrates a component library approach, with a focus on modern, type-safe, and accessible forms, and a simple Pokémon search/favorites demo.

## Architecture & Structure

- **Components**: All in `src/components/`, each in its own folder (e.g., `Input/`, `PokemonCard/`). Each folder has an `index.ts` barrel export and a main component file. Components use TypeScript interfaces, `forwardRef`, and extend HTML attributes for flexibility and accessibility.
- **Pages**: In `src/pages/`, each page in its own folder, exported via `index.ts`.
- **Hooks**: In `src/hooks/`, e.g., `useDebounce`, `usePokemon` (for API data fetching with react-query).
- **Store**: In `src/store/`, using Zustand for global state (favorites management, see `favorites.ts`).
- **Routing**: Centralized in `src/routes.ts` and used in `src/main.tsx` with React Router v7.
- **Styling**: Bootstrap (imported in `main.tsx`), react-bootstrap components, and some custom CSS in `src/index.css`.

## Data Flow & Integration Patterns

- **Form State**: Managed with `react-hook-form` and validated with `yup` (see example in `src/pages/Contant.tsx` component).
- **API Data**: Fetched via custom hooks (e.g., `usePokemon` uses react-query for caching and error handling).
- **Favorites**: Managed globally with Zustand (`useFavoritesStore`), accessible in any component.
- **Component Communication**: Props and hooks; no context API used. Components are designed to be reusable and composable.

## Component & Coding Patterns

- **Use react-bootstrap**: Prefer `<Form.Control>`, `<Form.Label>`, `<Card>`, etc. over raw HTML. Always use Bootstrap classes for layout and state.
- **Error Handling**: All form components accept an `error` prop and use Bootstrap's validation classes (see `Input.tsx`).
- **Forwarded Refs**: All form controls use `forwardRef` for integration with form libraries.
- **TypeScript**: All components/interfaces are strictly typed and extend native HTML attributes for compatibility.
- **Accessibility**: Always provide labels, ARIA attributes, and proper roles.

**Example Input Component Pattern:**

```tsx
import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import Form from 'react-bootstrap/Form';
import type { FormControlProps } from 'react-bootstrap/FormControl';

// Merge FormControlProps and native input props, omitting conflicts from HTML attributes
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormControlProps> &
  FormControlProps & {
    label: string;
    error?: string;
    isLoading?: boolean;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, value, isLoading, ...rest }, ref) => {
    return (
      <Form.Group className="mb-3 w-100">
        <Form.Label htmlFor={label}>{label}</Form.Label>
        <div className="position-relative d-flex flex-column align-items-center justify-content-center">
          <Form.Control id={label} ref={ref} isInvalid={!!error} value={value} {...rest} />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          {isLoading && (
            <div className="position-absolute end-0 pe-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </Form.Group>
    );
  },
);
```

## Workflows & Commands

- **Dev server**: `npm run dev` (Vite, HMR)
- **Build**: `npm run build` (TypeScript + Vite)
- **Lint**: `npm run lint` (ESLint, see `eslint.config.js`)
- **Format**: `npm run format` (Prettier)
- **Format:check**: `npm run format:check` (Prettier check only)
- **Preview**: `npm run preview` (local prod build)

## Project-Specific Conventions

- **Component folders**: Always use a folder per component with `index.ts` barrel export.
- **Props**: Use TypeScript interfaces, extend HTML attributes, and support `error` and `ref` where relevant.
- **Styling**: Use Bootstrap classes and react-bootstrap components for all UI. Add custom classes only in `src/index.css`.
- **State**: Use Zustand for global state, react-query for async data, react-hook-form for forms.
- **Routing**: Use centralized route definitions from `src/routes.ts`.

## Formatting & Linting

This project uses **Prettier** for code formatting and **ESLint** for linting. Please ensure your code is formatted and linted before committing. Use the following commands:

- `npm run format` – Format all files with Prettier
- `npm run format:check` – Check formatting without making changes
- `npm run lint` – Run ESLint

## Integration Points and stack

- [**React v19**](https://react.dev/): Core library
- [**react-router-dom v7**](https://reactrouter.com/home): For routing
- [**Bootstrap v5**](https://getbootstrap.com/): CSS framework for utility classes and layout
- [**react-bootstrap v2**](https://react-bootstrap.netlify.app/): All UI and forms using React components
- [**react-bootstrap-icons v1**](https://react-bootstrap.netlify.app/): Icons for UI using React components
- [**react-hook-form v7**](https://www.react-hook-form.com/): Form state/validation
- [**Yup v1**](https://github.com/jquense/yup): Schema validation
- [**react-query v5**](https://tanstack.com/query/v5/docs/framework/react/overview): Data fetching/caching
- [**Zustand v5**](https://github.com/pmndrs/zustand): Global state management

## Key Files & Examples

- `src/components/Input/Input.tsx`: Canonical form input pattern
- `src/components/PokemonCard/PokemonCard.tsx`: Example of stateful, styled card with global store
- `src/components/PokemonFinder/PokemonFinder.tsx`: Example of form, async data, and error handling
- `src/store/favorites.ts`: Zustand store pattern

---

When adding or updating code, always:

- Follow the component, typing, and styling patterns above
- Use react-bootstrap and Bootstrap classes for all UI
- Ensure accessibility and error handling in all form components

For questions, see the above files for canonical examples.
