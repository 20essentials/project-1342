import { cacheTag } from 'next/cache';
import { CONST_CACHE_TAG } from './config';

export async function generateCardNumber(): Promise<string> {
  'use cache';
  cacheTag(CONST_CACHE_TAG);
  const bloques = Array.from({ length: 4 }, () =>
    Math.floor(1000 + Math.random() * 9000).toString()
  );
  return bloques.join(' ');
}
