# AI Development Rules - Hotel Cherno More

## Tech Stack
- **React 19**: Core frontend library for building the user interface.
- **TypeScript**: Used for all components and utilities to ensure type safety.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS 4**: Utility-first CSS framework for all styling needs.
- **React Router 7**: Handles client-side routing and navigation.
- **Motion (formerly Framer Motion)**: Primary library for all animations and transitions.
- **Lucide React**: Standard icon library for the application.
- **Google Generative AI (Gemini)**: Powering the AI Concierge and intelligent features.
- **Shadcn/UI & Radix UI**: Base for accessible and styled UI components.

## Library Usage Rules

### 1. Styling & Layout
- **Tailwind CSS**: Use utility classes for all styling. Avoid writing custom CSS unless absolutely necessary.
- **Responsive Design**: Always use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) to ensure a mobile-first, responsive layout.
- **Theming**: Utilize the custom theme variables defined in `src/index.css` (e.g., `font-sans`, `font-serif`).

### 2. Components & UI
- **Shadcn/UI**: Use pre-built Shadcn components for common UI elements (buttons, inputs, modals).
- **Lucide React**: Use only Lucide icons for consistency.
- **Small Components**: Keep components focused and under 100 lines of code. Refactor into smaller sub-components when they grow too large.

### 3. State & Logic
- **React Hooks**: Use standard hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) for local state and side effects.
- **Routing**: All routes must be defined in `src/App.tsx`. Use `Link` from `react-router-dom` for internal navigation.

### 4. Animations
- **Motion**: Use the `motion` component for all entry, exit, and state-based animations. Prefer declarative animations over manual CSS transitions.

### 5. AI Integration
- **Gemini API**: Use the `GoogleGenerativeAI` package for AI features. Keep system prompts centralized and concise.

### 6. File Structure
- **Pages**: Place top-level views in `src/pages/`.
- **Components**: Place reusable UI elements in `src/components/`.
- **Naming**: Use PascalCase for component files (e.g., `BookingModal.tsx`) and camelCase for utility files.