const directory = 'repositories';

class FileSystemInteraction {
  async prepare() {
    try {
      await Deno.stat(directory);
      // Directory exists, remove its contents
      for await (const entry of Deno.readDir(directory)) {
        const entryPath = `${directory}/${entry.name}`;
        if (entry.isDirectory) {
          await Deno.remove(entryPath, { recursive: true });
        } else {
          await Deno.remove(entryPath);
        }
      }
      console.log(`Directory '${directory}' already exists. Contents deleted.`);
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        await Deno.mkdir(directory);
        console.log(`Directory '${directory}' created successfully.`);
      } else {
        console.error(`Error checking directory: ${error}`);
      }
    }
  }
}

export default FileSystemInteraction;
