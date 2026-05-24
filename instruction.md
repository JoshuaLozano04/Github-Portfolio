# Portfolio Instructions

This file is the reference for all future portfolio work in this workspace.

## Stack

- Next.js
- Tailwind CSS
- Vercel for deployment
- Framer Motion optional for animations
- MDX optional for blogs and project writeups

## Local Development

- Use `npm start` for local development with automatic UI reloads.
- Use `npm run serve` for a production-style local preview.

## Implemented Structure

- App Router is used for the site structure.
- Home, Projects, About, and Contacts are separate pages.
- Shared navigation, language switching, and theme toggling live in a shared client shell.
- CV-driven content lives in a dedicated data file.
- Page sections and reusable UI live in separate component files.
- Static assets should be served from `public/`.

## Visual Direction

- Theme should be dark blue to black.
- Style should feel professional, modern, and clean.
- Element colors should stay black, white, and grayscale.
- Avoid bright or playful styling.
- Use subtle gradients, strong contrast, and polished spacing.
- Icons are now larger and optimized for crisp rendering (SVGs use larger `h-5 w-5` with slightly increased stroke widths).
- CTAs and interactive elements use monochrome accents (black/white/gray) to keep the professional tone.

## Global Navigation

- Top navbar with Home, Projects, About, Contacts.
- These should point to real pages, not just on-page anchors.
- Add a language selector to translate the whole portfolio.
- Add a theme toggle for night and dark mode.
- Keep the navbar shared across all pages.

## Home Page

Home is only a summary of the other sections and should not repeat everything in full.

Home should stay shorter than the other pages and act as the landing summary.

### Section 1

- Single combined hero card containing:
  - Name
  - Profile picture
  - Short description
  - Location
  - Primary CTAs: "Contact me" (links to Contacts) and "View works" (links to Projects)
  - Social icon links (Email, LinkedIn, GitHub)

### Section 2

- Show 3 featured projects in card format.
- Each card should include project name, tech stack, and role.

### Section 3

- Show programming languages, tools, and skills grouped by category (see Skills section below).

### Section 4

- Add a button that transitions to the Contacts tab.

## Projects Page

- Show all projects on a dedicated page.
- Include filters and search.
- Each project should show title, short description, tech stack, role, and screenshot when available.
- If a screenshot is not available, use a professional fallback card instead of a broken image.

## About Page

- Show all skills and programming languages on a dedicated page.
- Group them clearly by category.

## Contacts Page

- Simple contact form on its own page.
- Include reCAPTCHA for anti-bot protection when a backend or form service is wired up.
- Keep the layout minimal and easy to use.

## Content Reference From CV

- Name: Joshua S. Lozano
- Title: Full Stack Developer
- Education: PHINMA University of Pangasinan, BSIT
- Skills and tools: Java, Python, HTML & CSS, PHP, MySQL, Laravel, Kotlin, Flutter, Node.js, TypeScript, PostgreSQL, MongoDB, AWS
- Core work skills: frontend development, backend development, cloud programming, database management, AI development, leadership, trainability, computational thinking, problem solving, teamwork, collaboration

## Projects From CV

- My Crew Manager
- Fitness Club Management System
- Library Management System
- Flixrecos
- Chambers of Forsaken

## Current Project Files

- [app/layout.tsx](app/layout.tsx): root layout and shared shell integration.
- [app/page.tsx](app/page.tsx): Home page summary.
- [app/projects/page.tsx](app/projects/page.tsx): Projects page.
- [app/about/page.tsx](app/about/page.tsx): About page.
- [app/contacts/page.tsx](app/contacts/page.tsx): Contacts page.
- [components/portfolio-shell.tsx](components/portfolio-shell.tsx): shared navbar, language, and theme state.
- [components/portfolio-sections.tsx](components/portfolio-sections.tsx): page section components.
- [data/portfolio.ts](data/portfolio.ts): CV copy, translations, projects, and skills.
- [app/globals.css](app/globals.css): global styling.
- [public/images](public/images): profile photo and project assets.

## Change Rules Moving Forward

- Keep updates aligned with this route-based structure unless explicitly asked otherwise.
- Use the CV as the source of truth for biography, skills, and project information.
- Keep the home page as a summary only.
- Keep Projects, About, and Contacts as separate pages.
- Keep the shared shell, data file, and component split intact when extending the site.
- Keep the overall tone professional and consistent with the dark blue to black theme.
- When updating skills or tools, update `data/portfolio.ts` first and rely on `copy.skills` and `copy.tools` for UI rendering.
- Icons and SVGs: prefer crisp SVGs with `h-5 w-5` and increased stroke widths for clarity; avoid embedded raster icons in the UI shell.
- Local dev commands:
  - `npm start` — development server with hot reload (default local workflow)
  - `npm run serve` — production-style preview using `next start`
