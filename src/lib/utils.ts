import { NEXT_PUBLIC_BASE_URL } from './config';

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const BASE_URL = 'http://localhost:3000';

export function getApiUrl(path: string) {
  // return `${NEXT_PUBWLIC_BASE_URL}${path}`;
  return `${BASE_URL}${path}`;
}
