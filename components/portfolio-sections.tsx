'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { FaAws } from 'react-icons/fa6';
import {
  SiCss,
  SiDjango,
  SiDocker,
  SiFigma,
  SiFlutter,
  SiGithub,
  SiGit,
  SiHtml5,
  SiKotlin,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiTypescript,
  SiVercel
} from 'react-icons/si';
import { usePortfolio } from '@/components/portfolio-shell';
import type { Project } from '@/data/portfolio';

const categories: Array<Project['category'] | 'All'> = ['All', 'Web', 'Database', 'Desktop', 'Game', 'AI'];

const skillIcons = {
  java: SiOpenjdk,
  python: SiPython,
  typescript: SiTypescript,
  kotlin: SiKotlin,
  php: SiPhp,
  html: SiHtml5,
  css: SiCss,
  flutter: SiFlutter,
  node: SiNodedotjs,
  django: SiDjango,
  laravel: SiLaravel,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  aws: FaAws,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
  vercel: SiVercel,
  figma: SiFigma
} as const;

type SkillIconKey = keyof typeof skillIcons;

type HomeSkillItem = {
  label: string;
  iconKey: SkillIconKey;
};

type HomeSkillGroup = {
  title: string;
  items: HomeSkillItem[];
};

const homeSkillGroups: HomeSkillGroup[] = [
  {
    title: 'Programming',
    items: [
      { label: 'Java', iconKey: 'java' },
      { label: 'Python', iconKey: 'python' },
      { label: 'TypeScript', iconKey: 'typescript' },
      { label: 'Kotlin', iconKey: 'kotlin' },
      { label: 'PHP', iconKey: 'php' }
    ]
  },
  {
    title: 'Frontend',
    items: [
      { label: 'HTML', iconKey: 'html' },
      { label: 'CSS', iconKey: 'css' },
      { label: 'Flutter', iconKey: 'flutter' }
    ]
  },
  {
    title: 'Backend',
    items: [
      { label: 'Node.js', iconKey: 'node' },
      { label: 'Django', iconKey: 'django' },
      { label: 'Laravel', iconKey: 'laravel' },
      { label: 'PHP', iconKey: 'php' }
    ]
  },
  {
    title: 'Databases',
    items: [
      { label: 'PostgreSQL', iconKey: 'postgresql' },
      { label: 'MySQL', iconKey: 'mysql' },
      { label: 'MongoDB', iconKey: 'mongodb' }
    ]
  },
  {
    title: 'Cloud & Tools',
    items: [
      { label: 'AWS', iconKey: 'aws' },
      { label: 'Git', iconKey: 'git' },
      { label: 'GitHub', iconKey: 'github' },
      { label: 'Docker', iconKey: 'docker' },
      { label: 'Vercel', iconKey: 'vercel' },
      { label: 'Figma', iconKey: 'figma' }
    ]
  }
];

function getSkillIcon(iconKey: SkillIconKey) {
  return skillIcons[iconKey];
}

export function HomePage() {
  const { copy } = usePortfolio();
  const featuredProjects = copy.projects.slice(0, 3);

  return (
    <main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-10 py-12">
      <section>
        <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 shadow-soft">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white">{copy.hero.eyebrow}</span>
              <h1 className="mt-4 max-w-[12ch] text-5xl font-semibold tracking-[-0.04em] text-white md:text-7xl">{copy.hero.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">{copy.hero.summary}</p>
              <p className="mt-5 text-sm text-neutral-400">
                Based in <span className="text-neutral-100">{copy.hero.location}</span>
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ActionLink href="/contacts" icon={<ArrowRightIcon />} label="Contact me" variant="primary" />
                <ActionLink href="/projects" icon={<GridIcon />} label="View works" variant="secondary" />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <SocialIconLink href="mailto:melchizedek.lozano@gmail.com" label="Email" icon={<EmailIcon />} />
                <SocialIconLink href="https://www.linkedin.com/in/joshua-lozano" label="LinkedIn" icon={<LinkedInIcon />} external />
                <SocialIconLink href="https://github.com/JoshuaLozano04" label="GitHub" icon={<GitHubIcon />} external />
              </div>
            </div>

            <div className="hidden lg:block">
              <img src="/images/profile.jpg" alt="Portrait of Joshua S. Lozano" className="aspect-[0.92] w-full rounded-[1.25rem] object-cover" />
              <div className="mt-4 text-center">
                <div className="text-lg font-semibold text-white">Joshua S. Lozano</div>
                <div className="text-sm text-neutral-400">Full Stack Developer</div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <SectionHeading title={copy.featured} description={copy.hero.featuredDescription} />
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={`${project.title}-${project.year}`} project={project} />
        ))}
      </section>
      <div className="flex justify-center">
        <ActionLink href="/projects" icon={<ArrowRightIcon />} label="See more" variant="primary" />
      </div>

      <SectionHeading title={copy.hero.toolsTitle} description={copy.hero.toolsDescription} />
      <HomeSkillsPreview />

      <section className="rounded-[2rem] border border-white/10 bg-neutral-950/80 p-7 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">{copy.hero.ctaTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-400">{copy.hero.ctaDescription}</p>
          </div>
          <ActionLink href="/contacts" icon={<ArrowRightIcon />} label={copy.hero.ctaButton} variant="primary" />
        </div>
      </section>
    </main>
  );
}

function HomeSkillsPreview() {
  return (
    <section className="grid gap-5 xl:grid-cols-2">
      {homeSkillGroups.map((group) => (
        <article
          key={group.title}
          className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_35px_100px_rgba(0,0,0,0.55)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_36%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">Selected stack</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{group.title}</h3>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">{group.items.length} items</span>
          </div>

          <div className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {group.items.map((item) => {
              const Icon = getSkillIcon(item.iconKey);

              return (
                <div
                  key={item.label}
                  className="group/item flex min-h-[108px] flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_0_24px_rgba(255,255,255,0.08)]"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-black/40 text-neutral-200 transition duration-300 group-hover/item:border-white/20 group-hover/item:bg-black/55 group-hover/item:text-white group-hover/item:shadow-[0_0_24px_rgba(255,255,255,0.07)]">
                    <Icon aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <span className="text-sm font-medium leading-5 text-neutral-200 transition duration-300 group-hover/item:text-white">{item.label}</span>
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );
}

export function ProjectsPage() {
  const { copy } = usePortfolio();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | Project['category']>('All');

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return copy.projects.filter((project) => {
      const searchable = [project.title, project.summary, project.role, project.category, project.year, project.tech.join(' ')].join(' ').toLowerCase();
      const matchesSearch = !query || searchable.includes(query);
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, copy.projects, search]);

  return (
    <main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-10 py-12">
      <SectionHeading title={copy.hero.projectsTitle} description={copy.hero.projectsDescription} />
      <div className="flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-neutral-950/80 p-5 shadow-soft lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects, stacks, roles"
            className="w-full rounded-2xl border border-white/10 bg-neutral-950/90 px-4 py-3.5 pl-11 text-white outline-none placeholder:text-neutral-500"
          />
          <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-white/10 ${activeCategory === category ? 'border-white bg-white text-black' : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'}`}
            >
              <CategoryIcon category={category} />
              <span>{category}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={`${project.title}-${project.year}`} project={project} />
        ))}
      </div>
    </main>
  );
}

export function AboutPage() {
  const { copy } = usePortfolio();

  return (
    <main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-10 py-12">
      <SectionHeading title={copy.hero.aboutTitle} description={copy.hero.aboutDescription} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {copy.skills.map((skill) => (
          <article key={skill.title} className="rounded-[1.5rem] border border-white/10 bg-neutral-950/80 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {skill.items.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-neutral-300">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export function ContactsPage() {
  const { copy } = usePortfolio();

  return (
    <main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-10 py-12">
      <SectionHeading title={copy.hero.contactsTitle} description={copy.hero.contactsDescription} />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-white/10 bg-neutral-950/80 p-7 shadow-soft">
          <ContactForm submitLabel={copy.hero.submitButton} />
        </article>
        <article className="rounded-[2rem] border border-white/10 bg-neutral-950/80 p-7 shadow-soft">
          <h3 className="text-xl font-semibold text-white">{copy.hero.contactSideTitle}</h3>
          <p className="mt-4 text-sm leading-7 text-neutral-400">{copy.hero.contactSideCopy}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Chip>melchizedek.lozano@gmail.com</Chip>
            <Chip>LinkedIn</Chip>
            <Chip>GitHub</Chip>
            <Chip>reCAPTCHA ready</Chip>
          </div>
          <p className="mt-6 text-sm leading-7 text-neutral-400">{copy.hero.contactNote}</p>
        </article>
      </div>
    </main>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">{title}</h2>
      <p className="max-w-4xl text-sm leading-7 text-neutral-400 md:text-base">{description}</p>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-neutral-300">{children}</span>;
}

function ActionLink({ href, icon, label, variant }: { href: string; icon: ReactNode; label: string; variant: 'primary' | 'secondary' }) {
  const base = 'inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 font-medium shadow-soft transition';
  const styles =
    variant === 'primary'
      ? 'bg-white text-black hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white/20'
      : 'border border-white/10 bg-white/6 text-white hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10';

  return (
    <a href={href} className={`${base} ${styles}`}>
      <span>{label}</span>
      <span className="text-current">{icon}</span>
    </a>
  );
}

function SocialIconLink({ href, icon, label, external }: { href: string; icon: ReactNode; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10"
    >
      <span className="text-white">{icon}</span>
    </a>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4.5 7.5h15v9h-15v-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m5.5 8.5 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M6.5 9.2V18M6.5 6.7v.2M10.2 18v-4.6c0-1.5 1-2.7 2.5-2.7s2.4 1.1 2.4 2.7V18M10.2 13.6V9.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4.5" y="4.5" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 4.5a7.5 7.5 0 0 0-2.4 14.6c.4.1.6-.2.6-.4v-1.4c-2.3.5-2.8-1-2.8-1-.4-.9-.9-1.2-.9-1.2-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.7 1.2 1.8.8 2.2.6.1-.5.3-.8.6-1-1.8-.2-3.6-.9-3.6-4.1 0-.9.3-1.6.8-2.2-.1-.2-.4-1 .1-2 0 0 .7-.2 2.3.8a8 8 0 0 1 4.2 0c1.6-1 2.3-.8 2.3-.8.5 1 .2 1.8.1 2 .5.6.8 1.3.8 2.2 0 3.2-1.8 3.9-3.6 4.1.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A7.5 7.5 0 0 0 12 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function CategoryIcon({ category }: { category: Project['category'] | 'All' }) {
  const icons: Record<string, ReactNode> = {
    All: <DotsIcon />,
    Web: <GlobeIcon />,
    Database: <DatabaseIcon />,
    Desktop: <MonitorIcon />,
    Game: <GamepadIcon />,
    AI: <SparkIcon />
  };

  return <span className="text-white">{icons[category]}</span>;
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="6" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="18" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.8 12h14.4M12 4.5c2.2 2 3.5 4.5 3.5 7.5S14.2 17 12 19.5M12 4.5c-2.2 2-3.5 4.5-3.5 7.5S9.8 17 12 19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <ellipse cx="12" cy="5.5" rx="6.5" ry="2.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 5.5v7c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8v-7M5.5 12.5v6c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="4.5" y="5.5" width="15" height="10" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 18.5h6M12 15.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GamepadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M7.2 9.5h9.6c2 0 3.7 1.6 3.7 3.7 0 2.1-1.6 3.7-3.7 3.7H7.2c-2 0-3.7-1.6-3.7-3.7 0-2.1 1.6-3.7 3.7-3.7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 12.2h3M10 10.7v3M15.9 11.5h.01M17.8 13h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M18.5 14.5l.9 2.5 2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9.9-2.5Z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/80 shadow-soft transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      {Array.isArray(project.image) ? (
        <ImageCarousel images={project.image} />
      ) : project.image ? (
        <img src={project.image} alt={`${project.title} preview`} className="aspect-[1.65] w-full object-cover" />
      ) : (
        <div className="grid aspect-[1.65] place-items-center border-b border-white/10 bg-gradient-to-br from-white/5 to-black px-6 text-left">
          <div className="grid gap-3">
            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">{project.category}</span>
            <h3 className="max-w-[12ch] text-2xl font-semibold leading-9 text-white">{project.title}</h3>
            <p className="max-w-sm text-sm leading-7 text-neutral-400">{project.year} project</p>
          </div>
        </div>
      )}
      <div className="grid gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-400">
          <strong className="text-white">{project.title}</strong>
          <span>•</span>
          <span>{project.year}</span>
          <span>•</span>
          <span>{project.category}</span>
        </div>
        <p className="text-sm leading-7 text-neutral-400">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white">
              {item}
            </span>
          ))}
        </div>
        <div className="text-sm text-neutral-400">
          <span className="font-semibold text-white">Role:</span> {project.role}
        </div>
      </div>
    </article>
  );
}

function ImageCarousel({ images, interval = 3500 }: { images: string[]; interval?: number }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => setActiveIndex((current) => (current + 1) % images.length), interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="relative aspect-[1.65] w-full overflow-hidden">
      {images.map((src, slideIndex) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${slideIndex === activeIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
}

function ContactForm({ submitLabel }: { submitLabel: string }) {
  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const checkbox = event.currentTarget.querySelector<HTMLInputElement>('#captcha-check');
        if (!checkbox?.checked) {
          alert('Please confirm the anti-bot check.');
          return;
        }
        alert('Message ready to send. Connect this form to your backend or email service.');
        event.currentTarget.reset();
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-white/10 bg-neutral-950/90 px-4 py-3 text-white outline-none placeholder:text-neutral-500" type="text" placeholder="Your name" required />
        <input className="rounded-2xl border border-white/10 bg-neutral-950/90 px-4 py-3 text-white outline-none placeholder:text-neutral-500" type="email" placeholder="Your email" required />
      </div>
      <input className="rounded-2xl border border-white/10 bg-neutral-950/90 px-4 py-3 text-white outline-none placeholder:text-neutral-500" type="text" placeholder="Subject" required />
      <textarea className="min-h-40 rounded-[1.5rem] border border-white/10 bg-neutral-950/90 px-4 py-3 text-white outline-none placeholder:text-neutral-500" placeholder="Write your message" required />
      <label className="flex items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-neutral-400">
        <input id="captcha-check" type="checkbox" className="h-4 w-4 accent-white" required />
        I am not a bot
      </label>
      <button type="submit" className="w-fit rounded-2xl bg-white px-5 py-3 font-medium text-black shadow-soft transition hover:bg-neutral-200">
        {submitLabel}
      </button>
    </form>
  );
}
