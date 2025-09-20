import { parseURL } from 'ufo';
import { $fetch } from 'ofetch';
import type { Document } from '@/interfaces.ts';

class Fetcher {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  validateURL() {
    const parsed = parseURL(this.url);

    if (!parsed.host || !parsed.pathname.endsWith('.json')) {
      throw new Error('Invalid URL. Please provide a valid URL to a JSON Swagger file.');
    }
  }

  async fetchSwaggerDocument() {
    try {
      return await $fetch<Document>(this.url);
    } catch (error) {
      throw new Error(`Failed to fetch Swagger document: ${error}`);
    }
  }
}

export default Fetcher;
