// lib/skills.ts
export type Skill = {
  label: string;
  value: string;
  logo: string; // URL or local path
  category: 'Language' | 'Framework' | 'Tool' | 'Database' | 'Design';
};

export const skills: Skill[] = [
  // LANGUAGES
  {
    label: 'JavaScript',
    value: 'javascript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    category: 'Language',
  },
  {
    label: 'TypeScript',
    value: 'typescript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    category: 'Language',
  },
  {
    label: 'Python',
    value: 'python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    category: 'Language',
  },
  {
    label: 'Java',
    value: 'java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    category: 'Language',
  },
  {
    label: 'C++',
    value: 'cpp',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    category: 'Language',
  },
  {
    label: 'C#',
    value: 'csharp',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    category: 'Language',
  },
  {
    label: 'Go',
    value: 'go',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    category: 'Language',
  },
  {
    label: 'Rust',
    value: 'rust',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg',
    category: 'Language',
  },
  {
    label: 'Ruby',
    value: 'ruby',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    category: 'Language',
  },

  // FRAMEWORKS
  {
    label: 'React',
    value: 'react',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    category: 'Framework',
  },
  {
    label: 'Next.js',
    value: 'nextjs',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg',
    category: 'Framework',
  },
  {
    label: 'Vue.js',
    value: 'vuejs',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    category: 'Framework',
  },
  {
    label: 'Angular',
    value: 'angular',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    category: 'Framework',
  },
  {
    label: 'Svelte',
    value: 'svelte',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
    category: 'Framework',
  },

  // TOOLS
  {
    label: 'Git',
    value: 'git',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    category: 'Tool',
  },
  {
    label: 'GitHub',
    value: 'github',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    category: 'Tool',
  },
  {
    label: 'Docker',
    value: 'docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    category: 'Tool',
  },
  {
    label: 'Kubernetes',
    value: 'kubernetes',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    category: 'Tool',
  },

  // Add to the `skills` array

  // DATABASES
  {
    label: 'PostgreSQL',
    value: 'postgresql',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    category: 'Database',
  },
  {
    label: 'MySQL',
    value: 'mysql',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    category: 'Database',
  },
  {
    label: 'MongoDB',
    value: 'mongodb',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    category: 'Database',
  },
  {
    label: 'SQLite',
    value: 'sqlite',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
    category: 'Database',
  },
  {
    label: 'Redis',
    value: 'redis',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    category: 'Database',
  },
  {
    label: 'Supabase',
    value: 'supabase',
    logo: 'https://avatars.githubusercontent.com/u/54469796?s=200&v=4',
    category: 'Database',
  },

  // DESIGN TOOLS
  {
    label: 'Figma',
    value: 'figma',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    category: 'Design',
  },
  {
    label: 'Adobe XD',
    value: 'adobexd',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',
    category: 'Design',
  },
  {
    label: 'Sketch',
    value: 'sketch',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg',
    category: 'Design',
  },
  {
    label: 'Canva',
    value: 'canva',
    logo: 'https://cdn.worldvectorlogo.com/logos/canva-1.svg',
    category: 'Design',
  },
];
