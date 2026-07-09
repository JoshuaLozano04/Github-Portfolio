'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrainCircuit, ChevronLeft, ChevronRight, GraduationCap, Sparkles } from 'lucide-react';
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
    title: 'Programming Languages',
    items: [
      { label: 'Java', iconKey: 'java' },
      { label: 'Python', iconKey: 'python' },
      { label: 'TypeScript', iconKey: 'typescript' },
      { label: 'Kotlin', iconKey: 'kotlin' },
      { label: 'PHP', iconKey: 'php' },
      { label: 'HTML', iconKey: 'html' },
      { label: 'CSS', iconKey: 'css' }
    ]
  },
  {
    title: 'Frameworks & Technologies',
    items: [
      { label: 'Flutter', iconKey: 'flutter' },
      { label: 'Node.js', iconKey: 'node' },
      { label: 'Django', iconKey: 'django' },
      { label: 'Laravel', iconKey: 'laravel' },
      { label: 'PostgreSQL', iconKey: 'postgresql' },
      { label: 'MySQL', iconKey: 'mysql' },
      { label: 'MongoDB', iconKey: 'mongodb' }
    ]
  },
  {
    title: 'Tools & Platforms',
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

function getAboutSkillCardLayout(title: string) {
  if (title === 'Programming Languages') {
    return 'col-span-full';
  }

  if (title === 'Frameworks & Technologies') {
    return 'col-span-full md:col-span-4';
  }

  if (title === 'Tools & Platforms') {
    return 'col-span-full';
  }

  return 'col-span-full';
}

export function HomePage() {
  const { copy, theme } = usePortfolio();
  const featuredProjects = copy.projects.slice(0, 3);

  return (
    <motion.main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-10 py-12" initial="hidden" animate="visible" variants={pageFadeUp}>
      <motion.section data-scroll-section="true" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <motion.article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/80 p-8 shadow-soft" variants={staggerReveal}>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
            <motion.div variants={itemReveal}>
              <h1 className="mt-4 max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl">{copy.hero.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300 md:text-lg">{copy.hero.summary}</p>
              <p className="mt-5 text-sm text-neutral-400">
                Based in <span className={theme === 'ink' ? 'text-black' : 'text-neutral-100'}>{copy.hero.location}</span>
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <SocialIconLink href="mailto:melchizedek.lozano@gmail.com" label="Email" icon={<EmailIcon />} />
                <SocialIconLink href="https://www.linkedin.com/in/joshua-lozano" label="LinkedIn" icon={<LinkedInIcon />} external />
                <SocialIconLink href="https://github.com/JoshuaLozano04" label="GitHub" icon={<GitHubIcon />} external />
              </div>
            </motion.div>

            <motion.div className="hidden lg:block" variants={itemReveal}>
              <img src="/images/profile.jpg" alt="Portrait of Melchizedek Joshua Lozano" className="aspect-[0.92] w-full rounded-[1.25rem] object-cover" />
              <div className="mt-4 text-center">
                <div className="mx-auto max-w-[22ch] text-base font-semibold leading-tight text-white xl:text-lg">Melchizedek Joshua Lozano</div>
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
          <ActionLink href="mailto:melchizedek.lozano@gmail.com" icon={<ArrowRightIcon />} label={copy.hero.ctaButton} variant="primary" />
        </div>
      </motion.section>
    </motion.main>
  );
}

function HomeSkillsPreview() {
  return (
    <motion.section className="grid gap-5" variants={staggerReveal}>
      {homeSkillGroups.map((group, index) => (
        <motion.article
          key={group.title}
          className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/80 px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.32)]"
          variants={itemReveal}
          whileHover={{ y: -2, transition: { duration: 0.25, ease: premiumEase } }}
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">{group.title}</h3>
          </div>

          <MarqueeRow items={group.items} />
        </motion.article>
      ))}
    </motion.section>
  );
}

function MarqueeRow({ items }: { items: HomeSkillItem[] }) {
  const repeatedItems = [...items, ...items];
  const duration = Math.max(14, items.length * 3.5);

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track flex w-max items-center gap-3" style={{ ['--marquee-duration' as string]: `${duration}s` }}>
        {repeatedItems.map((item, index) => {
          const Icon = getSkillIcon(item.iconKey);

          return (
            <div
              key={`${item.label}-${index}`}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-neutral-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/40 text-neutral-200">
                <Icon aria-hidden="true" className="h-4.5 w-4.5" />
              </span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
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

  const coreSkills = copy.skills.find((skill) => skill.title === 'Core Work Skills');
  const education = copy.skills.find((skill) => skill.title === 'Education');

  const strengths = [
  {
    title: 'Leadership',
    description:
      'Experienced in coordinating teams, organizing tasks, and helping projects stay on track.'
  },
  {
    title: 'Problem Solving',
    description:
      'Comfortable breaking down challenges and finding practical, efficient solutions.'
  },
  {
    title: 'Adaptability',
    description:
      'Quick to learn new technologies, workflows, and tools when projects require them.'
  },
  {
    title: 'Communication',
    description:
      'Able to collaborate effectively, share ideas clearly, and work well within a team.'
  },
];

  return (
    <motion.main className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-20 py-14 md:gap-24 md:py-16" initial="hidden" animate="visible" variants={pageFadeUp}>
      {/* About Page hero section */}
      <motion.section data-scroll-section="true"  className="relative overflow-hidden rounded-[2rem] bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10 lg:p-12" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.08),transparent_28%)]" />
        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div className="max-w-[72ch]">
            <h1 className="mt-2 max-w-[20ch] text-4xl font-semibold leading-[1.06] tracking-[-0.05em] text-white md:text-5xl lg:text-6xl">
              Building modern and scalable digital experiences.
            </h1>
            <p className="mt-6 max-w-[62ch] text-base leading-8 text-neutral-300 md:text-lg md:leading-9">
            I’m a full stack developer who enjoys building web applications, backend systems, and AI-powered projects. I focus on writing clean code, solving practical problems, and creating experiences that are simple to use, maintain, and scale.              
            </p>
            <p className="mt-5 max-w-[62ch] text-base leading-8 text-neutral-400 md:text-lg md:leading-9">
                Outside development, I also work with video editing and digital content, which has helped me develop a stronger eye for presentation and communication.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-[1.5rem] border border-white/[0.08] bg-black/15 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Quick Overview
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    Full Stack Development
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">
                    Building complete web applications from frontend to backend.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    AI Applications
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">
                    Exploring practical AI solutions and intelligent systems.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Video Editing
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">
                    Creating digital content with a focus on presentation and storytelling.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Student Developer
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">
                    BS Information Technology majoring in Systems Development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Programming Languages and Tools */}     
      <motion.section data-scroll-section="true" className="grid gap-6" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <SectionHeading title="Programming Languages and Tools" description="Technologies I use across web, backend, mobile, and AI projects." />

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerReveal}
        >
        {homeSkillGroups.map((group) => (
          <motion.article
            key={group.title}
            className="group relative overflow-hidden rounded-[1.5rem] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.05]"
            variants={itemReveal}
            whileHover={{
              y: -4,
              transition: { duration: 0.24, ease: premiumEase }
            }}
          >
            <div className="relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-neutral-400">
                  {group.title}
                </h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const Icon = getSkillIcon(item.iconKey);

                  return (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-2 text-sm text-neutral-300"
                    >
                      <Icon
                        className="h-3.5 w-3.5 text-neutral-400"
                        aria-hidden="true"
                      />
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
      </motion.section>
      
      {/* GitHub stats and contributions */}
      <motion.section data-scroll-section="true" className="grid gap-6" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal}>
        <motion.article className="rounded-[1.75rem] bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-7" variants={itemReveal} whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}>
          <div className="flex items-center gap-3">
            <SectionIcon icon={<FaGithub className="h-4 w-4" aria-hidden="true" />} />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">GitHub Activity</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">Contributions and stats</h2>
            </div>
          </div>

          <GitHubStatsPanel username="JoshuaLozano04" />
        </motion.article>
      </motion.section>

       {/* Core work skills and strengths */}
      <motion.section
        data-scroll-section="true"
        className="grid gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionReveal}
>
        <motion.article
          className="group relative overflow-hidden rounded-[1.75rem] bg-white/[0.03] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-7"
          variants={itemReveal}
          whileHover={{ y: -3, transition: { duration: 0.24, ease: premiumEase } }}
          style={{ willChange: 'transform' }}>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_36%)] opacity-60 transition duration-300 group-hover:opacity-100" />

          <div className="relative flex items-start gap-3">
            <SectionIcon
              icon={<BrainCircuit className="h-4 w-4" aria-hidden="true" />}
            />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Strengths
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">
                How I work
              </h2>
              <p className="mt-2 text-sm leading-7 text-neutral-400">
                The qualities I bring to projects, collaboration, and continuous learning.
              </p>
            </div>
          </div>

          <div className="relative mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {strengths.map((strength) => (
              <motion.div
                key={strength.title}
                className="rounded-[1.35rem] border border-white/[0.08] bg-black/15 p-5 min-h-[190px]"
                variants={itemReveal}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2, ease: premiumEase }
                }}
              >
                <h3 className="text-base font-semibold text-white">
                  {strength.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-neutral-400">
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.article>
      </motion.section>
    
      {/*academic background*/}
      <motion.section data-scroll-section="true" className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerReveal}>
        <motion.article className="rounded-[1.75rem] bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-7" variants={itemReveal} whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}>
          <div className="flex items-center gap-3">
            <SectionIcon icon={<GraduationCap className="h-4 w-4" aria-hidden="true" />} />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                Academic Background
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">
                Education
              </h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {education?.items.map((item) => (
              <motion.div key={item} className="rounded-2xl bg-black/20 px-4 py-3 text-sm leading-6 text-neutral-300" variants={itemReveal} whileHover={{ y: -2, transition: { duration: 0.2, ease: premiumEase } }}>
                {item}
              </motion.div>
            ))}
          </div>
        </motion.article>
      </motion.section>
      
    </motion.main>
  );
}

function SectionIcon({ icon }: { icon: ReactNode }) {
  return <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/[0.05] text-neutral-200">{icon}</span>;
}

type GitHubProfile = {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
};

type GitHubRepo = {
  language: string | null;
  stargazers_count: number;
};

function GitHubStatsPanel({ username }: { username: string }) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [topLanguages, setTopLanguages] = useState<Array<{ name: string; count: number }>>([]);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [graphFailed, setGraphFailed] = useState(false);
  const [langsFailed, setLangsFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadStats = async () => {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' }
          }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' }
          })
        ]);

        if (!profileResponse.ok) {
          throw new Error('Unable to load GitHub profile stats.');
        }

        const profileData = (await profileResponse.json()) as GitHubProfile;
        setProfile(profileData);

        if (!reposResponse.ok) {
          throw new Error('Unable to load GitHub repository data.');
        }

        const repos = (await reposResponse.json()) as GitHubRepo[];
        const languageCounts = new Map<string, number>();

        repos.forEach((repo) => {
          if (!repo.language) {
            return;
          }

          languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
        });

        setTopLanguages(
          Array.from(languageCounts.entries())
            .sort((first, second) => second[1] - first[1])
            .slice(0, 4)
            .map(([name, count]) => ({ name, count }))
        );
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setProfileError(error instanceof Error ? error.message : 'Unable to load GitHub stats.');
      }
    };

    void loadStats();

    return () => controller.abort();
  }, [username]);

  const totalRepos = profile?.public_repos ?? 0;
  const followers = profile?.followers ?? 0;
  const following = profile?.following ?? 0;
  const graphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-compact&hide_border=true&area=true`;
  const languagesUrl = `/api/github-top-langs?username=${username}`;

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:items-start">
      <div className="rounded-[1.5rem] bg-black/20 p-2.5 sm:p-3">
        {!graphFailed ? (
          <img
            src={graphUrl}
            alt="GitHub contribution graph"
            className="mx-auto block h-auto w-full max-w-none rounded-[1rem] object-contain"
            loading="lazy"
            onError={() => setGraphFailed(true)}
          />
        ) : (
          <div className="rounded-[1.25rem] bg-white/[0.03] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Contribution graph unavailable</p>
            <p className="mt-2 text-sm leading-7 text-neutral-300">
              The live graph service did not load, so the fallback stats below are shown instead.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <GitHubMetric label="Public repos" value={totalRepos} />
              <GitHubMetric label="Followers" value={followers} />
              <GitHubMetric label="Following" value={following} />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-[1.5rem] bg-black/20 p-2.5 sm:p-3">
        {!langsFailed ? (
          <img
            src={languagesUrl}
            alt="Top programming languages card"
            className="mx-auto block h-auto w-full max-w-none rounded-[1rem] object-contain"
            loading="eager"
            onError={() => setLangsFailed(true)}
          />
        ) : topLanguages.length ? (
          <div className="rounded-[1.25rem] bg-white/[0.03] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Top languages fallback</p>
            <div className="mt-4 grid gap-3">
              {topLanguages.map((item) => (
                <div key={item.name} className="rounded-[1.25rem] bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center justify-between gap-4 text-sm text-neutral-200">
                    <span>{item.name}</span>
                    <span className="text-neutral-400">{item.count} repos</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-sky-500" style={{ width: `${Math.max(18, (item.count / Math.max(1, topLanguages[0]?.count ?? 1)) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-[1.25rem] bg-white/[0.03] p-5 text-sm leading-7 text-neutral-300">
            Loading top language data...
          </div>
        )}
      </div>
    </div>
  );
}

function GitHubMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.25rem] bg-white/[0.03] p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">{value}</div>
    </div>
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
      {description ? <p className="max-w-4xl text-sm leading-7 text-neutral-400 md:text-base">{description}</p> : null}
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
    <motion.article
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-white/[0.03] p-3 shadow-[0_22px_52px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.12] md:p-4"
      variants={itemReveal}
      whileHover={{ y: -3, transition: { duration: 0.24, ease: premiumEase } }}
      style={{ willChange: 'transform' }}
    >
      <div className="overflow-hidden rounded-[1.15rem] border border-white/[0.08] bg-black/25">
        {Array.isArray(project.image) ? (
          <ImageCarousel images={project.image} title={project.title} />
        ) : project.image ? (
          <img src={project.image} alt={`${project.title} preview`} className="aspect-[16/9] w-full object-cover" />
        ) : (
          <div className="grid aspect-[16/9] place-items-center bg-gradient-to-br from-white/5 via-white/[0.03] to-black/55 px-5 text-left">
            <div className="grid gap-2">
              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-300">{project.category}</span>
              <h3 className="max-w-[16ch] text-xl font-semibold leading-tight tracking-[-0.01em] text-white">{project.title}</h3>
              <p className="text-xs text-neutral-400">{project.year} project</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-3 px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight tracking-[-0.015em] text-white md:text-[1.15rem]">{project.title}</h3>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">{project.category}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-neutral-500">
          <span>{project.year}</span>
          <span className="h-1 w-1 rounded-full bg-neutral-600" />
          <span className="truncate">{project.role}</span>
        </div>

        <p className="overflow-hidden text-sm leading-6 text-neutral-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {project.tech.map((item) => (
            <motion.span
              key={item}
              className="rounded-full border border-white/[0.09] bg-white/[0.025] px-2.5 py-1 text-[11px] font-medium text-neutral-300 transition-colors duration-200 hover:border-white/[0.16] hover:bg-white/[0.055] hover:text-white"
              whileHover={{ y: -1, transition: { duration: 0.18, ease: premiumEase } }}
              style={{ willChange: 'transform' }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ImageCarousel({ images, title, interval = 5200 }: { images: string[]; title: string; interval?: number }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const transitionDuration = 0.62;
  const animationLockMs = Math.round(transitionDuration * 1000);
  const minGapMs = 220;
  const lastActionAt = useRef(0);

  const imageCount = images.length;

  const goToSlide = useCallback((nextIndex: number) => {
    if (imageCount <= 1) {
      return;
    }

    const now = Date.now();
    if (isAnimating || now - lastActionAt.current < minGapMs) {
      return;
    }

    const normalizedIndex = (nextIndex + imageCount) % imageCount;

    if (normalizedIndex === activeIndex) {
      return;
    }

    const movingForward =
      (activeIndex === imageCount - 1 && normalizedIndex === 0) ||
      (normalizedIndex > activeIndex && !(activeIndex === 0 && normalizedIndex === imageCount - 1));

    lastActionAt.current = now;
    setIsAnimating(true);
    setDirection(movingForward ? 1 : -1);
    setActiveIndex(normalizedIndex);
  }, [activeIndex, imageCount, isAnimating]);

  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (!isAnimating) {
      return;
    }

    const unlock = setTimeout(() => {
      setIsAnimating(false);
    }, animationLockMs);

    return () => clearTimeout(unlock);
  }, [animationLockMs, isAnimating]);

  useEffect(() => {
    if (!images || imageCount <= 1 || isPaused || isAnimating) {
      return;
    }

    const timer = setInterval(() => {
      const now = Date.now();
      if (now - lastActionAt.current < minGapMs) {
        return;
      }

      lastActionAt.current = now;
      setDirection(1);
      setIsAnimating(true);
      setActiveIndex((current) => (current + 1) % imageCount);
    }, interval);

    return () => clearInterval(timer);
  }, [images, imageCount, interval, isPaused, isAnimating]);

  return (
    <div
      className="group relative aspect-[16/9] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`${images[activeIndex]}-${activeIndex}`}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 44 : -44 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -44 : 44 }}
          transition={{ duration: transitionDuration, ease: premiumEase }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.06}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (isAnimating) {
              return;
            }

            const swipe = Math.abs(info.offset.x) + Math.abs(info.velocity.x) * 0.24;
            if (swipe < 110) {
              return;
            }

            if (info.offset.x < 0) {
              goToNext();
              return;
            }

            goToPrevious();
          }}
          className="absolute inset-0"
          style={{ touchAction: 'pan-y' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[activeIndex]} alt={`${title} preview ${activeIndex + 1}`} className="h-full w-full object-cover" draggable={false} />
        </motion.div>
      </AnimatePresence>

      {imageCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/35 p-1.5 text-white/80 opacity-0 transition duration-300 hover:border-white/25 hover:text-white group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/20"
            disabled={isAnimating}
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/35 p-1.5 text-white/80 opacity-0 transition duration-300 hover:border-white/25 hover:text-white group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/20"
            disabled={isAnimating}
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>

          <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3">
            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/35 px-2 py-1">
              {images.map((src, slideIndex) => {
                const isActive = slideIndex === activeIndex;
                return (
                  <button
                    key={`${src}-${slideIndex}`}
                    type="button"
                    aria-label={`Go to slide ${slideIndex + 1}`}
                    onClick={() => goToSlide(slideIndex)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/65'}`}
                    disabled={isAnimating}
                  />
                );
              })}
            </div>

            <div className="hidden rounded-full border border-white/10 bg-black/35 px-2 py-1 text-[10px] font-medium tracking-[0.14em] text-neutral-300 sm:block">
              {activeIndex + 1}/{imageCount}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <motion.div
              className="h-full bg-white/70"
              animate={{ width: `${((activeIndex + 1) / imageCount) * 100}%` }}
              transition={{ duration: 0.35, ease: premiumEase }}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.5)_100%)]" />
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
