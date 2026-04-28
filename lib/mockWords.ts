import { WordInfo } from '@/types';

export const mockWords: WordInfo[] = [
  { word: 'Barcelona', category: 'Ciudad' },
  { word: 'Ecuador', category: 'Paises' },
  { word: 'Mongolia', category: 'Paises' },
  { word: 'Pajaro', category: 'Animal' },
  { word: 'Halcon', category: 'Animal' },
  { word: 'Ballena', category: 'Animal' },
  { word: 'Violin', category: 'Instrumento Musical' },
  { word: 'Piano', category: 'Instrumento Musical' },
  { word: 'Rosa', category: 'Planta' },
  { word: 'Tulipan', category: 'Planta' },
  { word: 'Girasol', category: 'Planta' },
  { word: 'Nike', category: 'Marca' },
  { word: 'Nasa', category: 'Marca' },
  { word: 'Pringles', category: 'Marca' },
  { word: 'Apple', category: 'Marca' }
];

export const getRandomWord = (): WordInfo => {
  const randomIndex = Math.floor(Math.random() * mockWords.length);
  return mockWords[randomIndex];
};
