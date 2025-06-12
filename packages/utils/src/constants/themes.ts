export type Theme = {
  id: number;
  theme_data: {
    foreground: string;
    background: string;
    primary: string;
    card: string;
    border: string;
    secondary: string;
  };
  theme_type: 'light' | 'dark' | 'default';
};

export const Themes: Theme[] = [
  {
    id: 0,
    theme_data: {
      foreground: '#ebe4d6',
      background: '#2a2522',
      primary: '#c2a180',
      card: '#3b3129',
      border: '#ac8053',
      secondary: '#4b4038',
    },
    theme_type: 'default',
  },
  {
    id: 1,
    theme_data: {
      foreground: '#112D4E',
      background: '#F9F7F7',
      primary: '#3F72AF',
      card: '#DBE2EF',
      border: '#b9c6df',
      secondary: '#b9c6df',
    },
    theme_type: 'light',
  },
  {
    id: 2,
    theme_data: {
      foreground: '#5c685a',
      background: '#F8EDE3',
      primary: '#849181',
      card: '#BDD2B6',
      border: '#9bbb90',
      secondary: '#a9c5a0',
    },
    theme_type: 'light',
  },
  {
    id: 3,
    theme_data: {
      foreground: '#0a0a0a',
      background: '#ffffff',
      primary: '#737373',
      card: '#e6e6e6',
      border: '#a6a6a6',
      secondary: '#d9d9d9',
    },
    theme_type: 'light',
  },
  {
    id: 4,
    theme_data: {
      foreground: '#576F72',
      background: '#F0EBE3',
      primary: '#7D9D9C',
      card: '#E4DCCF',
      border: '#d1c3ad',
      secondary: '#d1c3ad',
    },
    theme_type: 'light',
  },
  {
    id: 5,
    theme_data: {
      foreground: '#495464',
      background: '#F4F4F2',
      primary: '#BBBFCA',
      card: '#E8E8E8',
      border: '#cccccc',
      secondary: '#d9d9d9',
    },
    theme_type: 'light',
  },
  {
    id: 6,
    theme_data: {
      foreground: '#DDE6ED',
      background: '#27374D',
      primary: '#9DB2BF',
      card: '#526D82',
      border: '#7290a7',
      secondary: '#455c6e',
    },
    theme_type: 'dark',
  },
  {
    id: 7,
    theme_data: {
      foreground: '#FFD369',
      background: '#222831',
      primary: '#b99f64',
      card: '#393E46',
      border: '#505762',
      secondary: '#393e47',
    },
    theme_type: 'dark',
  },
  {
    id: 8,
    theme_data: {
      foreground: '#E7F6F2',
      background: '#2C3333',
      primary: '#A5C9CA',
      card: '#395B64',
      border: '#4a7682',
      secondary: '#2f4a51',
    },
    theme_type: 'dark',
  },
  {
    id: 9,
    theme_data: {
      foreground: '#e0ddef',
      background: '#1a1823',
      primary: '#a995c9',
      card: '#232030',
      border: '#302c40',
      secondary: '#5a5370',
    },
    theme_type: 'dark',
  },
  {
    id: 10,
    theme_data: {
      foreground: '#ffffff',
      background: '#000000',
      primary: '#ffffff',
      card: '#090909',
      border: '#242424',
      secondary: '#222222',
    },
    theme_type: 'dark',
  },
];
