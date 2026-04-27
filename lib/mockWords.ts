import { WordInfo } from '@/types';

export const mockWords: WordInfo[] = [
  { word: 'NEXTJS', category: 'Frameworks' },
  { word: 'REACT', category: 'Libraries' },
  { word: 'TYPESCRIPT', category: 'Languages' },
  { word: 'TAILWIND', category: 'Styling' },
  { word: 'ZUSTAND', category: 'State Management' },
  { word: 'FIREBASE', category: 'Backend as a Service' },
  { word: 'VERCEL', category: 'Hosting' },
  { word: 'JAVASCRIPT', category: 'Languages' },
  { word: 'HTML', category: 'Web Technologies' },
  { word: 'CSS', category: 'Web Technologies' }
];

export const getRandomWord = (): WordInfo => {
  const randomIndex = Math.floor(Math.random() * mockWords.length);
  return mockWords[randomIndex];
};
