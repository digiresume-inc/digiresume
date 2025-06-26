// lib/skills.ts
export type Skill = {
  label: string;
  value: string;
  logo: string; // URL or local path
  category: string;
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
    label: 'C',
    value: 'c',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg',
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
  {
    label: 'Kotlin',
    value: 'kotlin',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
    category: 'Language',
  },
  {
    label: 'Swift',
    value: 'swift',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
    category: 'Language',
  },
  {
    label: 'Dart',
    value: 'dart',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
    category: 'Language',
  },
  {
    label: 'Objective-C',
    value: 'objective-c',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg',
    category: 'Language',
  },
  {
    label: 'Scala',
    value: 'scala',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg',
    category: 'Language',
  },
  {
    label: 'Elixir',
    value: 'elixir',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg',
    category: 'Language',
  },
  {
    label: 'Haskell',
    value: 'haskell',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg',
    category: 'Language',
  },
  {
    label: 'Perl',
    value: 'perl',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg',
    category: 'Language',
  },
  {
    label: 'Lua',
    value: 'lua',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg',
    category: 'Language',
  },
  {
    label: 'Shell',
    value: 'shell',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
    category: 'Language',
  },
  {
    label: 'GraphQL',
    value: 'graphql',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
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
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    category: 'Framework',
  },
  {
    label: 'Vue.js',
    value: 'vuejs',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    category: 'Framework',
  },
  {
    label: 'Nuxt.js',
    value: 'nuxtjs',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
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
  {
    label: 'Astro',
    value: 'astro',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Astro.svg/800px-Astro.svg.png',
    category: 'Framework',
  },

  // Mobile
  {
    label: 'React Native',
    value: 'react-native',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    category: 'Framework',
  },
  {
    label: 'Flutter',
    value: 'flutter',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    category: 'Framework',
  },
  {
    label: 'Ionic',
    value: 'ionic',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg',
    category: 'Framework',
  },
  {
    label: 'Tailwind CSS',
    value: 'tailwindcss',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/deviCon/icons/tailwindcss/tailwindcss-original.svg',
    category: 'Framework',
  },

  // Backend
  {
    label: 'Express.js',
    value: 'express',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    category: 'Framework',
  },
  {
    label: 'NestJS',
    value: 'nestjs',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
    category: 'Framework',
  },
  {
    label: 'Django',
    value: 'django',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    category: 'Framework',
  },
  {
    label: 'Flask',
    value: 'flask',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    category: 'Framework',
  },
  {
    label: 'Spring Boot',
    value: 'springboot',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    category: 'Framework',
  },
  {
    label: 'Ruby on Rails',
    value: 'rails',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg',
    category: 'Framework',
  },
  {
    label: 'Laravel',
    value: 'laravel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg',
    category: 'Framework',
  },
  {
    label: 'FastAPI',
    value: 'fastapi',
    logo: 'https://fastapi.tiangolo.com/img/icon-white.svg',
    category: 'Framework',
  },

  // Desktop
  {
    label: 'Electron',
    value: 'electron',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg',
    category: 'Framework',
  },

  // Game & Cross-platform
  {
    label: 'Unity',
    value: 'unity',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
    category: 'Framework',
  },
  {
    label: 'Godot',
    value: 'godot',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg',
    category: 'Framework',
  },

  // CLOUD

  {
    label: 'AWS',
    value: 'aws',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    category: 'Cloud',
  },
  {
    label: 'Google Cloud',
    value: 'gcp',
    logo: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg',
    category: 'Cloud',
  },
  {
    label: 'Azure',
    value: 'azure',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
    category: 'Cloud',
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
    label: 'GitLab',
    value: 'gitlab',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
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
  {
    label: 'Terraform',
    value: 'terraform',
    logo: 'https://www.svgrepo.com/show/376353/terraform.svg',
    category: 'Tool',
  },
  {
    label: 'Vite',
    value: 'vite',
    logo: 'https://vitejs.dev/logo.svg',
    category: 'Tool',
  },
  {
    label: 'Webpack',
    value: 'webpack',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
    category: 'Tool',
  },
  {
    label: 'ESLint',
    value: 'eslint',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
    category: 'Tool',
  },
  {
    label: 'Jest',
    value: 'jest',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
    category: 'Tool',
  },
  {
    label: 'Cypress',
    value: 'cypress',
    logo: 'https://avatars.githubusercontent.com/u/8908513?s=200&v=4',
    category: 'Tool',
  },
  {
    label: 'Playwright',
    value: 'playwright',
    logo: 'https://playwright.dev/img/playwright-logo.svg',
    category: 'Tool',
  },
  {
    label: 'Postman',
    value: 'postman',
    logo: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
    category: 'Tool',
  },
  {
    label: 'Firebase',
    value: 'firebase',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    category: 'Tool',
  },
  {
    label: 'Vercel',
    value: 'vercel',
    logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
    category: 'Tool',
  },
  {
    label: 'Netlify',
    value: 'netlify',
    logo: 'https://www.netlify.com/v3/img/components/netlify-color-accent.svg',
    category: 'Tool',
  },
  {
    label: 'Railway',
    value: 'railway',
    logo: 'https://avatars.githubusercontent.com/u/56325436?s=200&v=4',
    category: 'Tool',
  },
  {
    label: 'Prisma',
    value: 'prisma',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
    category: 'Tool',
  },
  {
    label: 'Socket IO',
    value: 'socketio',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
    category: 'Tool',
  },

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
    label: 'MariaDB',
    value: 'mariadb',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg',
    category: 'Database',
  },
  {
    label: 'MongoDB',
    value: 'mongodb',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    category: 'Database',
  },
  {
    label: 'Cassandra',
    value: 'cassandra',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cassandra/cassandra-original.svg',
    category: 'Database',
  },
  {
    label: 'DynamoDB',
    value: 'dynamodb',
    logo: 'https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg',
    category: 'Database',
  },
  {
    label: 'PlanetScale',
    value: 'planetscale',
    logo: 'https://erqkxzwrpahhrddhnwjh.supabase.co/storage/v1/object/public/assets//planetscale.svg',
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
  {
    label: 'Neon',
    value: 'neon',
    logo: 'https://erqkxzwrpahhrddhnwjh.supabase.co/storage/v1/object/public/assets//neon.png',
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

  // cybersecurity

  {
    label: 'Metasploit',
    value: 'metasploit',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Logo_metasploit.png',
    category: 'Cybersecurity',
  },
  {
    label: 'Wireshark',
    value: 'wireshark',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Wireshark_icon_new.png',
    category: 'Cybersecurity',
  },
  {
    label: 'Nmap',
    value: 'nmap',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Logo_nmap.png',
    category: 'Cybersecurity',
  },
  {
    label: 'Burp Suite',
    value: 'burpsuite',
    logo: 'https://www.kali.org/tools/burpsuite/images/burpsuite-logo.svg',
    category: 'Cybersecurity',
  },
  {
    label: 'OWASP ZAP',
    value: 'owasp-zap',
    logo: 'https://logos.bugcrowdusercontent.com/logos/2376/fdfa/651b17be/051e0245d787d1f71246d515e88a8564_zap256x256-oversize.png',
    category: 'Cybersecurity',
  },
  {
    label: 'Kali Linux',
    value: 'kali-linux',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg',
    category: 'Cybersecurity',
  },
  {
    label: 'Snort',
    value: 'snort',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Logo_snort.jpg',
    category: 'Cybersecurity',
  },
  {
    label: 'Suricata',
    value: 'suricata',
    logo: 'https://suricata.io/wp-content/uploads/2021/01/cropped-favicon.png',
    category: 'Cybersecurity',
  },
  {
    label: 'OpenVAS',
    value: 'openvas',
    logo: 'https://forum.greenbone.net/uploads/default/original/1X/45982934a730d1824bc403f78875b77a8dfc1ae0.png',
    category: 'Cybersecurity',
  },
  {
    label: 'Maltego',
    value: 'maltego',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Maltego-Logo.jpg',
    category: 'Cybersecurity',
  },
  {
    label: 'Autopsy',
    value: 'autopsy',
    logo: 'https://avatars.githubusercontent.com/u/866922?v=4',
    category: 'Cybersecurity',
  },
  {
    label: 'Hashcat',
    value: 'hashcat',
    logo: 'https://www.kali.org/tools/hashcat/images/hashcat-logo.svg',
    category: 'Cybersecurity',
  },
  {
    label: 'Aircrack-ng',
    value: 'aircrack-ng',
    logo: 'https://cdn.prod.website-files.com/64c2362fbaf5db5f0fbefd68/655758f4a0cc090fa19e5847_aircrack-ng-logo.svg',
    category: 'Cybersecurity',
  },
  {
    label: 'ClamAV',
    value: 'clamav',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/ClamAV_Logo.png',
    category: 'Cybersecurity',
  },

  //jetha

  {
    label: 'Excuse Expert',
    value: 'excuse-expert',
    logo: 'https://emojiapi.dev/api/v1/eyes/64.png', // or a placeholder emoji or image
    category: 'Comedy',
  },
  {
    label: 'TV Seller (Confused)',
    value: 'tv-seller-confused',
    logo: 'https://emojiapi.dev/api/v1/television/64.png',
    category: 'Comedy',
  },
  {
    label: 'Crisis Magnet',
    value: 'crisis-magnet',
    logo: 'https://emojiapi.dev/api/v1/fire/64.png',
    category: 'Comedy',
  },
  {
    label: 'Daya Devotee',
    value: 'daya-devotee',
    logo: 'https://emojiapi.dev/api/v1/smiling_face_with_hearteyes/64.png',
    category: 'Comedy',
  },
  {
    label: 'Chappal Dodger',
    value: 'chappal-dodger',
    logo: 'https://emojiapi.dev/api/v1/thong_sandal/64.png',
    category: 'Comedy',
  },

  // daya

  {
    label: 'Microwave Whisperer',
    value: 'microwave-whisperer',
    logo: '🌀',
    category: 'Misunderstood Electronics',
  },
  {
    label: 'Blame Manage',
    value: 'blame-management',
    logo: 'https://emojiapi.dev/api/v1/yawning_face/64.png',
    category: 'Leadership',
  },
  {
    label: 'Babita Ji',
    value: 'babita-ji-enthusiasm',
    logo: 'https://emojiapi.dev/api/v1/heart_with_arrow/64.png',
    category: 'Core Passion',
  },
  {
    label: 'Tea Drinking',
    value: 'tea-drinking',
    logo: 'https://emojiapi.dev/api/v1/teacup_without_handle/64.png',
    category: 'Productivity Booster',
  },
  {
    label: 'Phone Misdialing',
    value: 'phone-misdialing',
    logo: 'https://emojiapi.dev/api/v1/yawning_face/64.png',
    category: 'Communication',
  },
  {
    label: 'Nattu Kaka Delegation',
    value: 'nattu-delegation',
    logo: 'https://emojiapi.dev/api/v1/face_with_headbandage/64.png',
    category: 'Human Resources',
  },

  // champak lal

  {
    label: 'Slipper Accuracy',
    value: 'slipper-accuracy',
    logo: 'https://emojiapi.dev/api/v1/thong_sandal/64.png',
    category: 'Discipline',
  },
  {
    label: 'Moral Lectures',
    value: 'moral-lectures',
    logo: 'https://emojiapi.dev/api/v1/prayer_beads/64.png',
    category: 'Wisdom',
  },
  {
    label: 'Tapu Sena Tracker',
    value: 'tapu-tracker',
    logo: 'https://emojiapi.dev/api/v1/magnifying_glass_tilted_left/64.png',
    category: 'Surveillance',
  },
  {
    label: 'Jetha Manager',
    value: 'jetha-manager',
    logo: 'https://emojiapi.dev/api/v1/brain/64.png',
    category: 'Patience',
  },
];
