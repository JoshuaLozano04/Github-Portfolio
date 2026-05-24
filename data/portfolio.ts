export type ProjectCategory = 'AI' | 'Web' | 'Database' | 'Desktop' | 'Game';

export type Project = {
  title: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  tech: string[];
  role: string;
  image?: string | null;
};

export type LocaleCopy = {
  nav: {
    home: string;
    projects: string;
    about: string;
    contacts: string;
  };
  theme: {
    night: string;
    dark: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    summary: string;
    location: string;
    contactTitle: string;
    featuredDescription: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    toolsTitle: string;
    toolsDescription: string;
    projectsTitle: string;
    projectsDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    contactsTitle: string;
    contactsDescription: string;
    submitButton: string;
    contactSideTitle: string;
    contactSideCopy: string;
    contactNote: string;
    footer: string;
  };
  featured: string;
  filters: string[];
  tools: string[];
  skills: {
    title: string;
    items: string[];
  }[];
  projects: Project[];
};

/* Export single-language copy (English) — translation feature removed */
export const portfolioCopy: LocaleCopy = {
  nav: { home: 'Home', projects: 'Projects', about: 'About', contacts: 'Contacts' },
  theme: { night: 'Night mode', dark: 'Dark mode' },
  hero: {
    eyebrow: 'Professional Portfolio',
    title: 'Joshua S. Lozano',
    summary: 'I build polished web and mobile systems with a focus on clean architecture, user experience, and practical delivery.',
    location: 'Pangasinan, Philippines',
    contactTitle: 'Contact Info',
    featuredDescription: 'Three selected projects from the CV, each card showing the stack and your role.',
    ctaTitle: 'Ready to work together?',
    ctaDescription: 'Use the contact section below to send a message or jump there instantly with the button.',
    ctaButton: 'Go to Contacts',
    toolsTitle: 'Programming Languages and Tools',
    toolsDescription: 'The stack and tools listed here are based on the CV and grouped for fast scanning.',
    projectsTitle: 'Projects',
    projectsDescription: 'Search and filter all projects from the CV. Cards update live as you type.',
    aboutTitle: 'About',
    aboutDescription: 'Skills and programming languages grouped into a simple, readable layout.',
    contactsTitle: 'Contacts',
    contactsDescription: 'A minimal contact form with an anti-bot step. Replace the placeholder with a real reCAPTCHA site key when you connect a backend.',
    submitButton: 'Send Message',
    contactSideTitle: 'Direct Contact',
    contactSideCopy: 'Reach me directly for project discussions, internships, or collaboration opportunities.',
    contactNote: 'This page is a complete visual reference and can be moved into Next.js later with the same content map and sections.',
    footer: 'Built from the CV reference and workspace assets.'
  },
  featured: 'Featured Projects',
  filters: ['All', 'Web', 'Database', 'Desktop', 'Game', 'AI'],
  tools: ['Node.js', 'Python', 'Java', 'Kotlin', 'PHP', 'TypeScript', 'Django', 'Laravel', 'Flutter', 'PostgreSQL', 'MySQL', 'MongoDB', 'AWS', 'HTML', 'CSS', 'Ren\'Py'],
  skills: [
    { title: 'Frontend and Interface', items: ['HTML & CSS', 'JavaScript', 'TypeScript', 'Responsive UI design', 'User-focused presentation'] },
    { title: 'Backend and Systems', items: ['Node.js', 'Python', 'Java', 'PHP', 'Laravel', 'Django', 'RESTful APIs'] },
    { title: 'Mobile and Cross Platform', items: ['Flutter', 'Kotlin', 'Android development'] },
    { title: 'Database and Cloud', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'AWS', 'Database management'] },
    { title: 'Core Work Skills', items: ['Leadership', 'Trainability', 'Computational thinking', 'Problem solving', 'Teamwork', 'Collaboration', 'AI development'] },
    { title: 'Education', items: ['PHINMA University of Pangasinan', 'Bachelor of Science in Information Technology', 'Major in Systems Development', '2023 - Present'] }
  ],
  projects: [
    { title: 'My Crew Manager', year: '2025', category: 'AI', summary: 'An intelligent project management suite that powers plan, task, role, and backlog generation from uploaded proposals.', tech: ['Flutter', 'Django', 'TypeScript'], role: 'Backend Developer', image: null },
    { title: 'Fitness Club Management System', year: '2024', category: 'Web', summary: 'A mobile and web-based gym management system for memberships, bookings, payments, authentication, and QR check-ins.', tech: ['Kotlin', 'PHP', 'JavaScript', 'MySQL', 'HTML', 'CSS'], role: 'Full Stack Developer', image: null },
    { title: 'Library Management System', year: '2024', category: 'Database', summary: 'A digital library management project focused on borrowing, tracking, and user management workflows.', tech: ['Java', 'Laravel', 'MySQL'], role: 'Full Stack Developer', image: null },
    { title: 'Flixrecos', year: '2023', category: 'Desktop', summary: 'A first-year project built with Java and CSS, with a lead developer role in the delivery of the system.', tech: ['Java', 'CSS', 'NetBeans'], role: 'Lead Developer / Full Stack Developer', image: null },
    { title: 'Chambers of Forsaken', year: '2023', category: 'Game', summary: 'A point-and-click visual novel RPG developed with Python and Ren\'Py.', tech: ['Python', 'Ren\'Py'], role: 'Full Stack Developer', image: null }
  ]
};