"use client";

import { useMemo, useState } from "react";
import type { LocaleCopy, Project } from "@/data/portfolio";
import { useTheme } from '@/components/theme-provider';

type PortfolioAppProps = {
  copy: LocaleCopy;
};

const categories: Array<Project['category'] | 'All'> = ['All', 'Web', 'Mobile', 'Desktop', 'Game', 'AI'];

export function PortfolioApp({ copy }: PortfolioAppProps) {
  const { theme, toggleTheme } = useTheme();
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

  const featuredProjects = copy.projects.slice(0, 3);

  return (
    <div className="relative z-10">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-wrap items-center justify-between gap-4 py-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-black text-white shadow-soft">JS</div>
            <div>
              <div className="max-w-[170px] text-xs font-semibold leading-tight tracking-[0.015em] sm:max-w-none sm:text-sm">Melchizedek Joshua Lozano</div>
              <div className="text-sm text-neutral-400">Full Stack Developer</div>
            </div>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-400">
            <a href="/" className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white">{copy.nav.home}</a>
            <a href="/projects" className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white">{copy.nav.projects}</a>
            <a href="/about" className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white">{copy.nav.about}</a>
          </nav>

          <div className="flex items-center gap-3">
            <button type="button" onClick={toggleTheme} className="rounded-2xl border border-white/10 bg-neutral-900/80 px-4 py-2 text-sm text-white transition hover:border-white/20">
              {theme === 'midnight' ? copy.theme.night : copy.theme.dark}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-8 py-10">
        <section id="home" className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 shadow-soft">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white">{copy.hero.eyebrow}</span>
            <h1 className="mt-4 max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl">{copy.hero.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">{copy.hero.summary}</p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <InfoCard label="Location" value={copy.hero.location} />
              <InfoCard label="Email" value="melchizedek.lozano@gmail.com" href="mailto:melchizedek.lozano@gmail.com" />
              <InfoCard label={copy.hero.contactTitle} value="LinkedIn / GitHub" href="https://www.linkedin.com/in/joshua-lozano" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/projects" className="rounded-2xl bg-white px-5 py-3 font-medium text-black shadow-soft transition hover:bg-neutral-200">{copy.featured}</a>
            </div>
          </article>

          <aside className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/80 p-4 shadow-soft">
            <img src="/images/profile.jpg" alt="Portrait of Melchizedek Joshua Lozano" className="aspect-[0.92] w-full rounded-[1.5rem] object-cover" />
            <div className="grid gap-1 p-3 text-center">
              <div className="mx-auto max-w-[22ch] text-base font-semibold leading-tight text-white xl:text-lg">Melchizedek Joshua Lozano</div>
              <div className="text-sm text-neutral-400">Full Stack Developer</div>
            </div>
          </aside>
        </section>

        <SectionHeading title={copy.featured} description={copy.hero.featuredDescription} />
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={`${project.title}-${project.year}`} project={project} />
          ))}
        </section>

        <section className="grid gap-8" id="projects">
          <SectionHeading title={copy.hero.projectsTitle} description={copy.hero.projectsDescription} />
          <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-neutral-950/80 p-4 shadow-soft lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects, stacks, roles" className="w-full rounded-2xl border border-white/10 bg-neutral-950/90 px-4 py-3 pl-11 text-white outline-none placeholder:text-neutral-500" />
              <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.7" />
                <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`rounded-full border px-4 py-2 text-sm transition ${activeCategory === category ? 'border-white bg-white text-black' : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={`${project.title}-${project.year}`} project={project} />
            ))}
          </div>
        </section>

        <section id="about" className="grid gap-8">
          <SectionHeading title={copy.hero.aboutTitle} description={copy.hero.aboutDescription} />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {copy.skills.map((skill) => (
              <article key={skill.title} className="rounded-[1.5rem] border border-white/10 bg-neutral-950/80 p-5 shadow-soft">
                <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300">{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contacts" className="grid gap-8">
          <SectionHeading title={copy.hero.contactsTitle} description={copy.hero.contactsDescription} />
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[2rem] border border-white/10 bg-neutral-950/80 p-6 shadow-soft">
              <ContactForm submitLabel={copy.hero.submitButton} />
            </article>
            <article className="rounded-[2rem] border border-white/10 bg-neutral-950/80 p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-white">{copy.hero.contactSideTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-400">{copy.hero.contactSideCopy}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Chip>melchizedek.lozano@gmail.com</Chip>
                <Chip>LinkedIn</Chip>
                <Chip>GitHub</Chip>
                <Chip>reCAPTCHA ready</Chip>
              </div>
              <p className="mt-5 text-sm leading-7 text-neutral-400">{copy.hero.contactNote}</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="mx-auto w-[min(1200px,calc(100%-32px))] pb-10 text-center text-sm text-neutral-500">{copy.hero.footer}</footer>
    </div>
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

function InfoCard({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-300">{label}</div>
      {href ? <a href={href} className="break-words text-sm text-neutral-300 hover:text-white">{value}</a> : <div className="break-words text-sm text-neutral-300">{value}</div>}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300">{children}</span>;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/80 shadow-soft">
      {project.image ? (
        <img
          src={Array.isArray(project.image)
            ? project.image[0]
            : project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="aspect-[1.65] w-full object-contain"
        />
      ) : (
        <div className="grid aspect-[1.65] place-items-center border-b border-white/10 bg-gradient-to-br from-white/5 to-black px-6 text-left">
          <div className="grid gap-3">
            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">{project.category}</span>
            <h3 className="max-w-[12ch] text-2xl font-semibold leading-9 text-white">{project.title}</h3>
            <p className="max-w-sm text-sm leading-7 text-neutral-400">{project.year} project</p>
          </div>
        </div>
      )}
      <div className="grid gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-400">
          <strong className="text-white">{project.title}</strong>
          <span>•</span>
          <span>{project.year}</span>
          <span>•</span>
          <span>{project.category}</span>
        </div>
            <p className="line-clamp-1 text-sm leading-8 text-neutral-400">
              {project.summary}
            </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white">{item}</span>
          ))}
        </div>
        <div className="text-sm text-neutral-400">
          <span className="font-semibold text-white">Role:</span> {project.role}
        </div>
      </div>
    </article>
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