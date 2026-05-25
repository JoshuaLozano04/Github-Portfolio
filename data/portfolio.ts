export type ProjectCategory = 'AI' | 'Web' | 'Mobile' | 'Desktop' | 'Game';

export type Project = {
  title: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  tech: string[];
  role: string;
  image?: string | string[] | null;
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
    summary: 'A BSIT student at PHINMA University of Pangasinan, specializing in System Development, with strong proficiency in full-stack system development and database-driven systems. Passionate about building user-focused solutions and eager to apply technical skills to real-world projects through internships or entrylevel roles.',
    location: 'Pangasinan, Philippines',
    contactTitle: 'Contact Info',
    featuredDescription: '',
    ctaTitle: 'Ready to work together?',
    ctaDescription: 'Whether you have a project in mind, a collaboration opportunity, or simply want to connect, I’d be glad to hear from you. Feel free to reach out and let’s create something meaningful together.',
    ctaButton: 'Go to Contacts',
    toolsTitle: 'Programming Languages and Tools',
    toolsDescription: '',
    projectsTitle: 'Projects',
    projectsDescription: 'Search and filter all projects from the CV. Cards update live as you type.',
    aboutTitle: 'About',
    aboutDescription: '',
    contactsTitle: 'Contacts',
    contactsDescription: '',
    submitButton: 'Send Message',
    contactSideTitle: 'Direct Contact',
    contactSideCopy: 'Reach me directly for project discussions, internships, or collaboration opportunities.',
    contactNote: '',
    footer: ''
  },
  featured: 'Featured Projects',
  filters: ['All', 'Web', 'Mobile', 'Desktop', 'Game', 'AI'],
  tools: ['Node.js', 'Python', 'Java', 'Kotlin', 'PHP', 'TypeScript', 'Django', 'Laravel', 'Flutter', 'PostgreSQL', 'MySQL', 'MongoDB', 'AWS', 'HTML', 'CSS', 'Ren\'Py'],
  skills: [
    { title: 'Frontend and Interface', items: ['HTML & CSS', 'JavaScript', 'TypeScript'] },
    { title: 'Backend and Systems', items: ['Node.js', 'Python', 'Java', 'PHP', 'Laravel', 'Django', 'RESTful APIs'] },
    { title: 'Mobile and Cross Platform', items: ['Flutter', 'Kotlin'] },
    { title: 'Database and Cloud', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'AWS'] },
    { title: 'Core Work Skills', items: ['Leadership', 'Trainability', 'Computational thinking', 'Problem solving', 'Teamwork', 'Collaboration', 'AI development'] },
    { title: 'Education', items: ['PHINMA University of Pangasinan', 'Bachelor of Science in Information Technology', 'Major in Systems Development', '2023 - Present'] }
  ],
  projects: [
    { title: 'My Crew Manager', 
      year: '2025', 
      category: 'AI', 
      summary: 'An intelligent project management suite that powers plan, task, role, and backlog generation from uploaded proposals.', 
      tech: ['Flutter', 'Django', 'TypeScript'], 
      role: 'Backend Developer', 
      image: ['/images/projects/mycrewmanager/mycrewmanagerdesktop.png','/images/projects/mycrewmanager/mycrewmanagerphone.png'] },
    { title: 'Fitness Club Management System', 
      year: '2024', 
      category: 'Web', 
      summary: 'A mobile and web-based gym management system for memberships, bookings, payments, authentication, and QR check-ins.', 
      tech: ['Kotlin', 'PHP', 'JavaScript', 'MySQL', 'HTML', 'CSS'], 
      role: 'Full Stack Developer', 
      image: [
        '/images/projects/fitnessclubmanagementsystem/fitnessclubmanagementsystemmobile.png', 
        '/images/projects/fitnessclubmanagementsystem/fitnessclubmanagementsystemweb.png', 
        '/images/projects/fitnessclubmanagementsystem/fitnessclubmanagementsystemweb2.png'] },
    { title: 'Library Management System', 
      year: '2024', 
      category: 'Mobile', 
      summary: 'A digital library management project focused on borrowing, tracking, and user management workflows.', 
      tech: ['Java', 'Laravel', 'MySQL'], 
      role: 'Full Stack Developer', 
      image: [
        '/images/projects/upanglms/upanglms1.png',
        '/images/projects/upanglms/upanglms2.png']},
    { title: 'Flixrecos', 
      year: '2023', 
      category: 'Desktop', 
      summary: 'A first-year project built with Java and CSS, with a lead developer role in the delivery of the system.', 
      tech: ['Java', 'CSS', 'NetBeans'], 
      role: 'Lead Developer / Full Stack Developer', 
      image: null },
    { title: 'Chambers of Forsaken', 
      year: '2023', 
      category: 'Game', 
      summary: 'A point-and-click visual novel RPG developed with Python and Ren\'Py.', 
      tech: ['Python', 'Ren\'Py'], 
      role: 'Full Stack Developer', 
      image: null },
    { title: 'CarbonSense',
    year: '2025',
      category: 'AI',
      summary: 'CarbonSense is an AI-integrated web-based system that allows users to track, analyze, and reduce their carbon footprint. Built using the MERN stack, it calculates emissions from daily activities such as transport, diet, and energy use, while providing AI-based recommendations to help users live more sustainably.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Python', 'TensorFlow'],
      role: 'Backend Developer',
      image: [
        '/images/projects/carbonsense/carbonsense1.png',
        '/images/projects/carbonsense/carbonsense2.png',
        '/images/projects/carbonsense/carbonsense3.png',
        '/images/projects/carbonsense/carbonsense4.png',
        '/images/projects/carbonsense/carbonsense5.png'
      ]}  
  ]
};

// Ensure projects are sorted by year (newest first)
portfolioCopy.projects.sort((a, b) => {
  const ay = Number(a.year) || 0;
  const by = Number(b.year) || 0;
  return by - ay;
});