const directory = 'repositories';

class FileSystemInteraction {
  async prepare() {
    try {
      await Deno.stat(directory);
      for await (const entry of Deno.readDir(directory)) {
        const entryPath = `${directory}/${entry.name}`;
        if (entry.isDirectory) {
          await Deno.remove(entryPath, { recursive: true });
        } else {
          await Deno.remove(entryPath);
        }
      }
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        await Deno.mkdir(directory);
      } else {
        throw new Error(`Error checking directory: ${error}`);
      }
    }
  }

  async writeRepository(repositoryName: string, content: string) {
    const filePath = `${directory}/${repositoryName}.ts`;
    await Deno.writeTextFile(filePath, content);
  }
}

export default FileSystemInteraction;
