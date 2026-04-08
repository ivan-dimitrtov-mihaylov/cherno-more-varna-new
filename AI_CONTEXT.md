# AI System Context - Hotel Cherno More

## Project Overview
Luxury hotel website for "Hotel Cherno More" in Varna, Bulgaria. Features accommodation booking, restaurant info, conference center details, casino, and special offers. Includes an AI Concierge powered by Gemini.

## Tech Stack
- **React 19** + **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS 4** for styling
- **React Router 7** for navigation
- **Motion** for animations
- **Lucide React** for icons
- **Google Generative AI** for AI features
- **Shadcn/UI** components

## Coding Standards
1. **Components**: Small, focused files (<100 lines). PascalCase naming.
2. **Styling**: Tailwind utility classes only. Use `bg-brand-blue`, `font-serif`, etc.
3. **State**: React hooks (`useState`, `useEffect`). Context for global state (`AppContext`).
4. **Routing**: Define routes in `src/App.tsx`. Use `Link` for navigation.
5. **Animations**: Use `motion` components. Declarative animations preferred.
6. **i18n**: Support BG, EN, RU, UA, DE via `useAppContext().language`.

## Design System
- **Colors**: `brand-blue` (#233A5E), `brand-blue-light` (#2D4B7A), `amber-500` for accents.
- **Typography**: `font-serif` (Playfair Display) for headings, `font-sans` (Inter) for body.
- **Layout**: Responsive, mobile-first. Max-width containers (`max-w-7xl`).
- **Effects**: `backdrop-blur`, `liquid-glass` class for premium feel.

## AI Concierge Rules
- **Role**: Virtual concierge for Hotel Cherno More.
- **Tone**: Professional, luxurious, helpful.
- **Language**: Match user's language (BG/EN/RU/UA/DE).
- **Knowledge**: Hotel history (1978), 199 rooms, 14 floors, Casino, Restaurant Panorama, Conference Center.
- **Booking**: Direct users to "Book Now" button or external booking URL.

## File Structure
```
src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── pages/          # Route-level components
├── App.tsx         # Main app & routing
├── main.tsx        # Entry point
└── index.css       # Global styles & Tailwind config
```

## Key URLs
- **Booking Engine**: `https://sky-eu1.clock-software.com/spa/pms-wbe/#/hotel/12786`
- **Hotel Site**: `https://www.chernomorebg.com`

## Instructions for AI Agents
- Always check existing code before making changes.
- Maintain consistency with existing design patterns.
- Use TypeScript interfaces for props and data.
- Ensure responsive design on all new components.
- Do not remove existing functionality unless requested.
- Keep system prompts centralized in `AIConcierge.tsx`.