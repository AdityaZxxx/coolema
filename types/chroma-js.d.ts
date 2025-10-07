import { Chroma } from 'chroma-js';

declare global {
  interface Window {
    chroma: Chroma;
  }
}
