import { Document, HttpMethod, Normalized, Paths } from '@/interfaces.ts';
import Normalize from '@/Normalization.ts';

class Generator {
  normalize: Normalize;
  map = new Map<string, Paths[]>([['miscellaneous', []]]);

  constructor() {
    this.normalize = new Normalize();
  }

  prepare(document: Document) {
    for (const [path, pathItem] of Object.entries(document.paths)) {
      for (const operation of Object.values(pathItem)) {
        if (!operation.tags || operation.tags.length === 0) {
          this.map.get('miscellaneous')?.push({ [path]: pathItem });
        } else {
          if (this.map.has(operation.tags[0])) {
            this.map.get(operation.tags[0])?.push({ [path]: pathItem });
          } else {
            this.map.set(operation.tags[0], [{ [path]: pathItem }]);
          }
        }
      }
    }

    for (const [tag, paths] of this.map) {
      paths.sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]));
      this.map.set(tag, paths);
    }
  }

  conserve(tag: string): Normalized {
    const nameRepository = this.normalize.nameRepository(tag);
    const normalized: Normalized = {
      repository: nameRepository,
      operations: [],
    };

    const paths = this.map.get(tag) || [];
    for (const pathObj of paths) {
      const [key, value] = Object.entries(pathObj)[0];
      for (const [operationKey, operationValue] of Object.entries(value)) {
        normalized.operations.push({
          method: operationKey as HttpMethod,
          path: key,
          summary: operationValue.summary || '',
          description: operationValue.description || '',
          function: this.normalize.nameRequest(operationKey, key),
          operationId: operationValue.operationId || '',
          payload: (operationValue.operationId || '') + 'Request',
          returns: '',
        });
      }
    }

    return normalized;
  }

  generate() {
    for (const tag of this.map.keys()) {
      const normalized = this.conserve(tag);
      console.log(normalized);

      return;
    }
  }
}

export default Generator;
