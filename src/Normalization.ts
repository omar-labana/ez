import { pascalCase } from 'scule';

const useRepository = 'useRepository';

class Normalize {
  nameRepository(url: string) {
    const normalized = url.replace(/\s+/g, '-').trim();
    return useRepository + pascalCase(normalized);
  }

  nameRequest(method: string, path: string) {
    const normalizedMethod = method.toLowerCase().replace(/\s+/g, '-').trim();
    const normalizedPath = path.replace(/\s+/g, '-').trim();
    return `${normalizedMethod}${pascalCase(normalizedPath)}`;
  }
}

export default Normalize;
