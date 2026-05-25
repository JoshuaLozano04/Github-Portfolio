'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrainCircuit, ChevronLeft, ChevronRight, Database, GraduationCap, MonitorSmartphone, ServerCog, Sparkles } from 'lucide-react';
import { FaAws, FaJava } from 'react-icons/fa6';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { HiArrowRight, HiDevicePhoneMobile, HiOutlineComputerDesktop, HiOutlineEllipsisHorizontal, HiOutlineEnvelope, HiOutlineGlobeAlt, HiOutlineSquares2X2, HiOutlineSparkles } from 'react-icons/hi2';
import { IoGameControllerOutline } from 'react-icons/io5';
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
  SiPhp,
  SiPostgresql,
  SiPython,
  SiTypescript,
  SiVercel
} from 'react-icons/si';
import { usePortfolio } from '@/components/portfolio-shell';
import type { Project } from '@/data/portfolio';
import { itemReveal, pageFadeUp, premiumEase, sectionReveal, staggerReveal, viewportOnce } from '@/lib/motion';

const categories: Array<Project['category'] | 'All'> = ['All', 'Web', 'Mobile', 'Desktop', 'Game', 'AI'];

const skillIcons = {
  java: FaJava,
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
    <motion.main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-10 py-12" initial="hidden" animate="visible" variants={pageFadeUp}>
      <motion.section data-scroll-section="true" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <motion.article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 shadow-soft" variants={staggerReveal}>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
            <motion.div variants={itemReveal}>
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
            </motion.div>

            <motion.div className="hidden lg:block" variants={itemReveal}>
              <img src="/images/profile.jpg" alt="Portrait of Joshua S. Lozano" className="aspect-[0.92] w-full rounded-[1.25rem] object-cover" />
              <div className="mt-4 text-center">
                <div className="text-lg font-semibold text-white">Joshua S. Lozano</div>
                <div className="text-sm text-neutral-400">Full Stack Developer</div>
              </div>
            </motion.div>
          </div>
        </motion.article>
      </motion.section>

      <motion.section data-scroll-section="true" className="grid gap-6" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <SectionHeading title={copy.featured} description={copy.hero.featuredDescription} />
        <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" variants={staggerReveal}>
        {featuredProjects.map((project) => (
          <ProjectCard key={`${project.title}-${project.year}`} project={project} />
        ))}
        </motion.div>
        <motion.div className="flex justify-center" variants={itemReveal}>
          <ActionLink href="/projects" icon={<ArrowRightIcon />} label="See more" variant="primary" />
        </motion.div>
      </motion.section>

      <motion.section data-scroll-section="true" className="grid gap-5" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <SectionHeading title={copy.hero.toolsTitle} description={copy.hero.toolsDescription} />
        <HomeSkillsPreview />
      </motion.section>

      <motion.section data-scroll-section="true" className="rounded-[2rem] border border-white/10 bg-neutral-950/80 p-7 shadow-soft" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">{copy.hero.ctaTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-400">{copy.hero.ctaDescription}</p>
          </div>
          <ActionLink href="/contacts" icon={<ArrowRightIcon />} label={copy.hero.ctaButton} variant="primary" />
        </div>
      </motion.section>
    </motion.main>
  );
}

function HomeSkillsPreview() {
  return (
    <motion.section className="grid gap-5 xl:grid-cols-2" variants={staggerReveal}>
      {homeSkillGroups.map((group) => (
        <motion.article
          key={group.title}
          className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition duration-300 hover:border-white/20 hover:shadow-[0_35px_100px_rgba(0,0,0,0.55)]"
          variants={itemReveal}
          whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_36%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500"></p>
              <h3 className="mt-2 text-xl font-semibold text-white">{group.title}</h3>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">{group.items.length} items</span>
          </div>

          <motion.div className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3" variants={staggerReveal}>
            {group.items.map((item) => {
              const Icon = getSkillIcon(item.iconKey);

              return (
                <motion.div
                  key={item.label}
                  className="group/item flex min-h-[108px] flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_0_24px_rgba(255,255,255,0.08)]"
                  variants={itemReveal}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: premiumEase } }}
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-black/40 text-neutral-200 transition duration-300 group-hover/item:border-white/20 group-hover/item:bg-black/55 group-hover/item:text-white group-hover/item:shadow-[0_0_24px_rgba(255,255,255,0.07)]">
                    <Icon aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <span className="text-sm font-medium leading-5 text-neutral-200 transition duration-300 group-hover/item:text-white">{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.article>
      ))}
    </motion.section>
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
    <motion.main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-10 py-12" initial="hidden" animate="visible" variants={pageFadeUp}>
      <motion.section data-scroll-section="true" className="grid gap-5" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <SectionHeading title={copy.hero.projectsTitle} description={copy.hero.projectsDescription} />
        <motion.div className="flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-neutral-950/80 p-5 shadow-soft lg:flex-row lg:items-center lg:justify-between" variants={staggerReveal}>
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
            <motion.button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-white/10 ${activeCategory === category ? 'border-white bg-white text-black' : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'}`}
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: premiumEase }}
            >
              <CategoryIcon category={category} active={activeCategory === category} />
              <span>{category}</span>
            </motion.button>
          ))}
        </div>
        </motion.div>
      </motion.section>
      <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" variants={staggerReveal}>
        {filteredProjects.map((project) => (
          <ProjectCard key={`${project.title}-${project.year}`} project={project} />
        ))}
      </motion.div>
    </motion.main>
  );
}

export function AboutPage() {
  const { copy } = usePortfolio();

  const frontendSkills = copy.skills.find((skill) => skill.title === 'Frontend and Interface');
  const backendSkills = copy.skills.find((skill) => skill.title === 'Backend and Systems');
  const databaseSkills = copy.skills.find((skill) => skill.title === 'Database and Cloud');
  const coreSkills = copy.skills.find((skill) => skill.title === 'Core Work Skills');
  const education = copy.skills.find((skill) => skill.title === 'Education');

  const focusAreas = ['AI Applications', 'Full Stack Development', 'Backend Systems', 'Cross-platform Development'];

  return (
    <motion.main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-12 py-12 md:gap-14 md:py-16" initial="hidden" animate="visible" variants={pageFadeUp}>
      <motion.section data-scroll-section="true" className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10 lg:p-12" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.08),transparent_28%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
              About Me
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl lg:text-6xl">
              Building modern and scalable digital experiences.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg md:leading-9">
              I’m a full stack developer focused on creating fast, reliable, and maintainable applications across web, backend, and AI-powered systems. I enjoy turning complex ideas into clean, practical solutions that balance performance, usability, and long-term scalability.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-400 md:text-lg md:leading-9">
                Beyond development, I also work with video editing, combining technical problem-solving with creative presentation.
            </p>
          </div>

          <motion.div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-black/25 p-5 backdrop-blur-md" variants={staggerReveal}>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-neutral-200">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">Approach</p>
                <p className="mt-1 text-sm text-neutral-200">Minimal, practical, polished</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {focusAreas.map((area) => (
                <motion.div key={area} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-300" variants={itemReveal} whileHover={{ y: -2, transition: { duration: 0.2, ease: premiumEase } }}>
                  {area}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section data-scroll-section="true" className="grid gap-6" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <SectionHeading title="Programming Languages and Tools" description="The same core languages and tools highlighted on the home tab, organized for easier scanning." />
        <motion.div className="grid gap-5 xl:grid-cols-2" variants={staggerReveal}>
          {homeSkillGroups.map((group) => (
            <motion.article key={group.title} className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 hover:border-white/20 hover:shadow-[0_35px_100px_rgba(0,0,0,0.45)] md:p-7" variants={itemReveal} whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_32%)] opacity-60 transition duration-300 group-hover:opacity-100" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">{group.title}</p>
                  <p className="mt-2 text-sm leading-7 text-neutral-400">
                    {group.title === 'Programming'
                      ? 'Primary languages I use to build application logic, services, and interactive experiences.'
                      : group.title === 'Frontend'
                        ? 'Client-side building blocks for responsive interfaces and cross-platform presentation.'
                        : group.title === 'Backend'
                          ? 'Server-side frameworks and runtime tools for APIs, workflows, and application logic.'
                          : group.title === 'Databases'
                            ? 'Storage systems and data layers used to keep applications structured and reliable.'
                            : 'Supporting tools I use for cloud deployment, version control, and design collaboration.'}
                  </p>
                </div>
              </div>
              <div className="relative mt-5 flex flex-wrap gap-2.5">
                {group.items.map((item) => {
                  const Icon = getSkillIcon(item.iconKey);

                  return (
                    <motion.span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-neutral-300"
                      whileHover={{ y: -1, transition: { duration: 0.2, ease: premiumEase } }}
                    >
                      <Icon aria-hidden="true" className="h-3.5 w-3.5 text-neutral-400" />
                      {item.label}
                    </motion.span>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section data-scroll-section="true" className="grid gap-6 lg:grid-cols-2 lg:items-start" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerReveal}>
        <AboutPanel title="Frontend" description="Interfaces, interaction polish, and responsive design." icon={<MonitorSmartphone className="h-4 w-4" aria-hidden="true" />}>
          {frontendSkills?.items.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </AboutPanel>

        <AboutPanel title="Backend" description="APIs, business logic, authentication, and system reliability." icon={<ServerCog className="h-4 w-4" aria-hidden="true" />}>
          {backendSkills?.items.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </AboutPanel>
      </motion.section>

      <motion.section data-scroll-section="true" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerReveal}>
        <AboutPanel title="Database" description="Data modeling, persistence, and cloud-aware storage design." icon={<Database className="h-4 w-4" aria-hidden="true" />}>
          {databaseSkills?.items.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </AboutPanel>

        <AboutPanel title="Skills" description="Core strengths that support shipping dependable products." icon={<BrainCircuit className="h-4 w-4" aria-hidden="true" />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {coreSkills?.items.map((item) => (
              <motion.div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-300" variants={itemReveal} whileHover={{ y: -2, transition: { duration: 0.2, ease: premiumEase } }}>
                {item}
              </motion.div>
            ))}
          </div>
        </AboutPanel>
      </motion.section>

      <motion.section data-scroll-section="true" className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerReveal}>
        <motion.article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-7" variants={itemReveal} whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}>
          <div className="flex items-center gap-3">
            <SectionIcon icon={<GraduationCap className="h-4 w-4" aria-hidden="true" />} />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">Education</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">Academic foundation</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {education?.items.map((item) => (
              <motion.div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-neutral-300" variants={itemReveal} whileHover={{ y: -2, transition: { duration: 0.2, ease: premiumEase } }}>
                {item}
              </motion.div>
            ))}
          </div>
        </motion.article>

        <motion.article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-7" variants={itemReveal} whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Focus Areas</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <motion.div key={area} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-medium tracking-[0.01em] text-neutral-200 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]" whileHover={{ y: -2, transition: { duration: 0.2, ease: premiumEase } }}>
                {area}
              </motion.div>
            ))}
          </div>
        </motion.article>
      </motion.section>
    </motion.main>
  );
}

function AboutPanel({ title, description, icon, children }: { title: string; description: string; icon: ReactNode; children: ReactNode }) {
  return (
    <motion.article className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 hover:border-white/20 hover:shadow-[0_35px_100px_rgba(0,0,0,0.45)] md:p-7" variants={itemReveal} whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_32%)] opacity-60 transition duration-300 group-hover:opacity-100" />
      <div className="relative flex items-start gap-3">
        <SectionIcon icon={icon} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">{title}</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-neutral-400">{description}</p>
        </div>
      </div>
      <div className="relative mt-5 flex flex-wrap gap-2.5">{children}</div>
    </motion.article>
  );
}

function SectionIcon({ icon }: { icon: ReactNode }) {
  return <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-neutral-200">{icon}</span>;
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <motion.span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium tracking-[0.01em] text-neutral-300" whileHover={{ y: -1, transition: { duration: 0.2, ease: premiumEase } }}>
      {children}
    </motion.span>
  );
}

export function ContactsPage() {
  const { copy } = usePortfolio();

  return (
    <motion.main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-10 py-12" initial="hidden" animate="visible" variants={pageFadeUp}>
      <motion.section data-scroll-section="true" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <SectionHeading title={copy.hero.contactsTitle} description={copy.hero.contactsDescription} />
      </motion.section>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.article className="rounded-[2rem] border border-white/10 bg-neutral-950/80 p-7 shadow-soft" variants={itemReveal} whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}>
          <ContactForm submitLabel={copy.hero.submitButton} />
        </motion.article>
        <motion.article className="rounded-[2rem] border border-white/10 bg-neutral-950/80 p-7 shadow-soft" variants={itemReveal} whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}>
          <h3 className="text-xl font-semibold text-white">{copy.hero.contactSideTitle}</h3>
          <p className="mt-4 text-sm leading-7 text-neutral-400">{copy.hero.contactSideCopy}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <SocialIconLink href="mailto:melchizedek.lozano@gmail.com" label="Email" icon={<EmailIcon />} />
            <SocialIconLink href="https://www.linkedin.com/in/joshua-lozano" label="LinkedIn" icon={<LinkedInIcon />} external />
            <SocialIconLink href="https://github.com/JoshuaLozano04" label="GitHub" icon={<GitHubIcon />} external />
          </div>
          <p className="mt-6 text-sm leading-7 text-neutral-400">{copy.hero.contactNote}</p>
        </motion.article>
      </div>
    </motion.main>
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
  return (
    <motion.span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-neutral-300" whileHover={{ y: -1, transition: { duration: 0.2, ease: premiumEase } }}>
      {children}
    </motion.span>
  );
}

function ActionLink({ href, icon, label, variant }: { href: string; icon: ReactNode; label: string; variant: 'primary' | 'secondary' }) {
  const base = 'inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 font-medium shadow-soft transition';
  const styles =
    variant === 'primary'
      ? 'bg-white text-black hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white/20'
      : 'border border-white/10 bg-white/6 text-white hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10';

  return (
    <motion.a href={href} className={`${base} ${styles}`} whileHover={{ y: -2, scale: 1.01, transition: { duration: 0.2, ease: premiumEase } }} whileTap={{ scale: 0.985 }}>
      <span>{label}</span>
      <span className="text-current">{icon}</span>
    </motion.a>
  );
}

function SocialIconLink({ href, icon, label, external }: { href: string; icon: ReactNode; label: string; external?: boolean }) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10"
      whileHover={{ y: -1, scale: 1.02, transition: { duration: 0.2, ease: premiumEase } }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-white">{icon}</span>
    </motion.a>
  );
}

function ArrowRightIcon() {
  return <HiArrowRight aria-hidden="true" className="h-5 w-5" />;
}

function EmailIcon() {
  return <HiOutlineEnvelope aria-hidden="true" className="h-5 w-5" />;
}

function LinkedInIcon() {
  return <FaLinkedinIn aria-hidden="true" className="h-5 w-5" />;
}

function GitHubIcon() {
  return <FaGithub aria-hidden="true" className="h-5 w-5" />;
}

function GridIcon() {
  return <HiOutlineSquares2X2 aria-hidden="true" className="h-5 w-5" />;
}

function CategoryIcon({ category, active }: { category: Project['category'] | 'All'; active?: boolean }) {
  const icons: Record<string, ReactNode> = {
    All: <HiOutlineEllipsisHorizontal aria-hidden="true" className="h-5 w-5" />,
    Web: <HiOutlineGlobeAlt aria-hidden="true" className="h-5 w-5" />,
    Mobile: <HiDevicePhoneMobile aria-hidden="true" className="h-5 w-5" />,
    Desktop: <HiOutlineComputerDesktop aria-hidden="true" className="h-5 w-5" />,
    Game: <IoGameControllerOutline aria-hidden="true" className="h-5 w-5" />,
    AI: <HiOutlineSparkles aria-hidden="true" className="h-5 w-5" />
  };

  return <span className={active ? 'text-black' : 'text-white'}>{icons[category]}</span>;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/80 shadow-soft transition-transform duration-200 hover:shadow-lg" variants={itemReveal} whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}>
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
            <motion.span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white" whileHover={{ y: -1, transition: { duration: 0.2, ease: premiumEase } }}>
              {item}
            </motion.span>
          ))}
        </div>
        <div className="text-sm text-neutral-400">
          <span className="font-semibold text-white">Role:</span> {project.role}
        </div>
      </div>
    </motion.article>
  );
}

function ImageCarousel({ images, interval = 4800 }: { images: string[]; interval?: number }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const imageCount = images.length;

  const goToSlide = (nextIndex: number) => {
    if (imageCount <= 1) {
      return;
    }

    const normalizedIndex = (nextIndex + imageCount) % imageCount;

    if (normalizedIndex === activeIndex) {
      return;
    }

    const movingForward =
      (activeIndex === imageCount - 1 && normalizedIndex === 0) ||
      (normalizedIndex > activeIndex && !(activeIndex === 0 && normalizedIndex === imageCount - 1));

    setDirection(movingForward ? 1 : -1);
    setActiveIndex(normalizedIndex);
  };

  const goToNext = () => {
    goToSlide(activeIndex + 1);
  };

  const goToPrevious = () => {
    goToSlide(activeIndex - 1);
  };

  useEffect(() => {
    if (!images || imageCount <= 1 || isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % imageCount);
    }, interval);

    return () => clearInterval(timer);
  }, [images, imageCount, interval, isPaused]);

  return (
    <div
      className="group relative aspect-[1.65] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={`${images[activeIndex]}-${activeIndex}`}
          custom={direction}
          initial={{ opacity: 0.85, x: direction > 0 ? 24 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0.82, x: direction > 0 ? -20 : 20 }}
          transition={{ duration: 0.65, ease: premiumEase }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          dragMomentum
          onDragEnd={(_, info) => {
            const swipe = Math.abs(info.offset.x) + Math.abs(info.velocity.x) * 0.2;
            if (swipe < 90) {
              return;
            }

            if (info.offset.x < 0) {
              goToNext();
              return;
            }

            goToPrevious();
          }}
          className="absolute inset-0 will-change-transform"
          style={{ touchAction: 'pan-y' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[activeIndex]} alt="" className="h-full w-full object-cover will-change-transform" draggable={false} />
        </motion.div>
      </AnimatePresence>

      {imageCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/35 p-2 text-white/90 opacity-0 backdrop-blur-sm transition duration-300 hover:bg-black/55 hover:text-white group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/25"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/35 p-2 text-white/90 opacity-0 backdrop-blur-sm transition duration-300 hover:bg-black/55 hover:text-white group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/25"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-sm">
            {images.map((src, slideIndex) => {
              const isActive = slideIndex === activeIndex;
              return (
                <button
                  key={`${src}-${slideIndex}`}
                  type="button"
                  aria-label={`Go to slide ${slideIndex + 1}`}
                  onClick={() => goToSlide(slideIndex)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'}`}
                />
              );
            })}
          </div>
        </>
      )}
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
      <motion.button type="submit" className="w-fit rounded-2xl bg-white px-5 py-3 font-medium text-black shadow-soft transition hover:bg-neutral-200" whileHover={{ y: -2, scale: 1.01, transition: { duration: 0.2, ease: premiumEase } }} whileTap={{ scale: 0.985 }}>
        {submitLabel}
      </motion.button>
    </form>
  );
}
