export type Theme = {
  id: number;
  theme_data: {
    border: string;
    primary_bg: string;
    accent_text: string;
    primary_text: string;
    secondary_bg: string;
    strongerborder: string;
  };
  theme_type: 'light' | 'dark';
}




export const Themes: Theme[] = [
  {
    id: 1,
    theme_data: {
      border: '#b9c6df',
      primary_bg: '#F9F7F7',
      accent_text: '#3F72AF',
      primary_text: '#112D4E',
      secondary_bg: '#DBE2EF',
      strongerborder: '#a7b8d7',
    },
    theme_type: 'light',
  },
  {
    id: 3,
    theme_data: {
      border: '#b6aaee',
      primary_bg: '#F4EEFF',
      accent_text: '#A6B1E1',
      primary_text: '#424874',
      secondary_bg: '#DCD6F7',
      strongerborder: '#927fe6',
    },
    theme_type: 'light',
  },
  {
    id: 5,
    theme_data: {
      border: '#9bbb90',
      primary_bg: '#F8EDE3',
      accent_text: '#849181',
      primary_text: '#5c685a',
      secondary_bg: '#BDD2B6',
      strongerborder: '#7ea871',
    },
    theme_type: 'light',
  },
  {
    id: 8,
    theme_data: {
      border: '#7290a7',
      primary_bg: '#27374D',
      accent_text: '#9DB2BF',
      primary_text: '#DDE6ED',
      secondary_bg: '#526D82',
      strongerborder: '#91a8ba',
    },
    theme_type: 'dark',
  },
  {
    id: 9,
    theme_data: {
      border: '#505762',
      primary_bg: '#222831',
      accent_text: '#b99f64',
      primary_text: '#FFD369',
      secondary_bg: '#393E46',
      strongerborder: '#67707e',
    },
    theme_type: 'dark',
  },
  {
    id: 10,
    theme_data: {
      border: '#4a7682',
      primary_bg: '#2C3333',
      accent_text: '#A5C9CA',
      primary_text: '#E7F6F2',
      secondary_bg: '#395B64',
      strongerborder: '#5d93a2',
    },
    theme_type: 'dark',
  },
  {
    id: 11,
    theme_data: {
      border: '#774f3c',
      primary_bg: '#2D2424',
      accent_text: '#d8724a',
      primary_text: '#E0C097',
      secondary_bg: '#5C3D2E',
      strongerborder: '#99664d',
    },
    theme_type: 'dark',
  },
  {
    id: 12,
    theme_data: {
      border: '#4f6263',
      primary_bg: '#2C3639',
      accent_text: '#AEBDCA',
      primary_text: '#DCD7C9',
      secondary_bg: '#3F4E4F',
      strongerborder: '#667e7f',
    },
    theme_type: 'dark',
  },
  {
    id: 13,
    theme_data: {
      border: '#6c6383',
      primary_bg: '#352F44',
      accent_text: '#B9B4C7',
      primary_text: '#FAF0E6',
      secondary_bg: '#5C5470',
      strongerborder: '#857c9c',
    },
    theme_type: 'dark',
  },
  {
    id: 2,
    theme_data: {
      border: '#ffb8b3',
      primary_bg: '#FFF5E4',
      accent_text: '#ff8080',
      primary_text: '#ff4d4d',
      secondary_bg: '#FFE3E1',
      strongerborder: '#ff8880',
    },
    theme_type: 'light',
  },
  {
    id: 14,
    theme_data: {
      border: '#d1c3ad',
      primary_bg: '#F0EBE3',
      accent_text: '#7D9D9C',
      primary_text: '#576F72',
      secondary_bg: '#E4DCCF',
      strongerborder: '#bfac8d',
    },
    theme_type: 'light',
  },
  {
    id: 17,
    theme_data: {
      border: '#bcb78f',
      primary_bg: '#F1EFEF',
      accent_text: '#7D7C7C',
      primary_text: '#191717',
      secondary_bg: '#CCC8AA',
      strongerborder: '#a9a270',
    },
    theme_type: 'light',
  },
  {
    id: 16,
    theme_data: {
      border: '#cccccc',
      primary_bg: '#F4F4F2',
      accent_text: '#BBBFCA',
      primary_text: '#495464',
      secondary_bg: '#E8E8E8',
      strongerborder: '#b3b3b3',
    },
    theme_type: 'light',
  },
  {
    id: 18,
    theme_data: {
      border: '#585f8d',
      primary_bg: '#2D3250',
      accent_text: '#7077A1',
      primary_text: '#F6B17A',
      secondary_bg: '#424769',
      strongerborder: '#7279a7',
    },
    theme_type: 'dark',
  },
];
