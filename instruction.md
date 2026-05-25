# Portfolio Instructions

This file is the reference for all future portfolio work in this workspace.

## Stack

- Next.js
- Tailwind CSS
- Vercel for deployment
- Framer Motion used for site motion and shared animation presets
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
- [lib/motion.ts](lib/motion.ts): shared Framer Motion variants, easing, and viewport presets.
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

## Session Changes (May 2026)

### Motion System Updates

- **Added Framer Motion across the site**:
  - Page load now fades in with a subtle upward motion.
  - Navbar fades in smoothly and uses animated active-link underlines.
  - Sections reveal with staggered, viewport-based motion.

- **Reusable motion presets**:
  - Shared variants and timing live in `lib/motion.ts`.
  - Use the shared easing and reveal presets for consistent premium motion.

- **Interaction polish**:
  - Cards, chips, buttons, and navigation links use subtle hover lift and transition feedback.
  - Motion stays restrained: no bounce, spin, parallax-heavy effects, or flashy animation.

- **Ambient background motion**:
  - Added very low-opacity radial gradient motion for depth.
  - Keep background animation subtle and slow.

- **Reduced motion support**:
  - MotionConfig respects user reduced-motion preferences.
  - Global CSS also reduces transitions and scroll motion when needed.

- **Current motion guidelines**:
  - Entrance animations should stay in the 0.6s to 0.9s range.
  - Hover effects should stay in the 0.2s to 0.4s range.
  - Use `whileInView`, `viewport={{ once: true }}`, and staggered variants for section reveals.
  - Keep the experience premium, minimal, and professional.

### Scroll Navigation Updates

- **Added fixed right-side scroll arrows**:
  - Small up/down buttons now sit on the right side of the page.
  - The arrows use a minimal dark glass style with subtle borders and blur.
  - They stay unobtrusive and match the premium portfolio aesthetic.

- **Scroll behavior**:
  - Down arrow appears near the top of the page and moves to the next section.
  - Up arrow appears after scrolling and returns to the previous section or top.
  - Buttons hide when they are not needed to avoid clutter.

- **Section targeting**:
  - Major page wrappers use `data-scroll-section="true"` markers.
  - The shared shell detects visible sections and scrolls between them with smooth `scrollIntoView` behavior.

- **Implementation notes**:
  - Right-side scroll controls live in `components/portfolio-shell.tsx`.
  - Section markers were added in `components/portfolio-sections.tsx`.
  - The arrows use lucide `ChevronUp` and `ChevronDown` icons.
  - Reduced motion preferences are respected when scrolling.

### Projects Updates

- **Added CarbonSense project**:
  - Year: 2025
  - Role: Backend Developer
  - Multi-image carousel (5 images: carbonsense1.png through carbonsense5.png)
  - Images served from `public/images/projects/carbonsense/`

- **Image arrays support**:
  - Extended `Project.image` type to accept `string | string[] | null`
  - Single-image projects remain as strings; multi-image projects use arrays

- **Implemented ImageCarousel component**:
  - Displays project images with fade-in/fade-out transitions
  - Interval: 3.5 seconds between images
  - Uses `transition-opacity duration-700 ease-in-out`
  - Integrated into `ProjectCard` component

- **Sorted projects by year**:
  - Projects now display descending by year (latest first)

- **My Crew Manager images**:
  - Copied from `images/projects/mycrewmanager/` to `public/images/projects/mycrewmanager/`
  - Supports two-image carousel (mycrewmanagerdesktop.png, mycrewmanagerphone.png)

### Home Skills Section Updates

- **Categorized skill logos**:
  - Reorganized Home skills into category-based grid layout
  - Hidden 'Core Work Skills' and 'Education' from Home display (kept only on About page)

- **Skill logo rendering**:
  - Implemented `ToolIcon(name)` component: renders black and white SVG logos (h-8 w-8)
  - Implemented `ToolLogos(label)` component: handles multiple logos per skill category label
  - Implemented `getLogoKeys(label)` helper: maps combined labels to individual skill keys

- **Logo styling**:
  - Plain black and white SVGs (no colored backgrounds or circular containers)
  - Size: h-8 w-8 (increased from h-6 w-6 for better visibility)
  - Fallback: text initials for skills without custom logos

- **Supported skill logos**:
  - Programming: Python, Java, TypeScript, Kotlin, PHP
  - Frontend: HTML, CSS, Flutter
  - Backend: Node.js, Django, Laravel, PHP
  - Databases: PostgreSQL, MySQL, MongoDB
  - Cloud: AWS
  - Game Dev: Ren'Py

### Theme Persistence Updates

- **Global theme provider architecture**:
  - Added centralized theme state in `components/theme-provider.tsx`
  - Exported `useTheme()` hook for shared access across pages/components
  - Replaced page-level/local theme ownership with provider-managed state

- **Persistent theme storage**:
  - Theme is saved to `localStorage` using key `portfolio-theme`
  - Saved theme is restored on load and reused on route navigation
  - Theme source constants and guards live in `lib/theme.ts`

- **Hydration-safe initial theme**:
  - Injected pre-hydration script (`THEME_INIT_SCRIPT`) in `app/layout.tsx` head
  - Script applies theme to document before React hydration to prevent flash
  - Enabled `suppressHydrationWarning` on `<html>` for SSR/client attribute parity

- **Global document application**:
  - Theme is applied consistently to `document.documentElement` and `document.body`
  - Uses both `data-theme` and `dark` class toggling for compatibility
  - Updates `color-scheme` (`dark`/`light`) to keep native UI aligned

- **Cross-tab synchronization**:
  - Theme changes are synchronized across browser tabs via `storage` event listener
  - Switching in one tab updates all open tabs automatically

- **Tailwind and transition compatibility**:
  - Set `darkMode: 'class'` in `tailwind.config.ts`
  - Kept `data-theme`-based global styles in `app/globals.css`
  - Added smooth theme transitions for background, text, and border colors (~220ms to 240ms)

- **Implementation rule moving forward**:
  - Do not add new page-level `theme` state or direct localStorage theme logic in route components.
  - Always use `useTheme()` from `components/theme-provider.tsx`.

### Key Files Modified

- `data/portfolio.ts`: Added CarbonSense, updated project structure, sorted by year
- `components/portfolio-sections.tsx`: Added ImageCarousel, ToolIcon, ToolLogos, getLogoKeys; restructured Home skills; fixed JSX
- `public/images/projects/mycrewmanager/`: Copied asset files
- `public/images/projects/carbonsense/`: Carbonsense asset files (pre-existing)
- `components/theme-provider.tsx`: Added global theme context, persistence, hydration handling, cross-tab sync
- `lib/theme.ts`: Added theme constants, guards, and pre-hydration init script
- `app/layout.tsx`: Injected theme init script and wrapped app with `ThemeProvider`
- `components/portfolio-shell.tsx`: Switched from local theme state to global `useTheme()`
- `components/portfolio-app.tsx`: Removed local theme state and reused global `useTheme()`
- `tailwind.config.ts`: Enabled class-based dark mode
- `app/globals.css`: Added smoother global theme transition styling
