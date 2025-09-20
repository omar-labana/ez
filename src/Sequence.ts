import type { Document } from '@/interfaces.ts';

class Sequence {
  url: string;
  document?: Document;

  constructor(url: string) {
    this.url = url;
  }

  async start() {
  }
}

export default Sequence;
