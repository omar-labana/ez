import { runMain } from 'citty';
import Main from '@/Main.ts';
// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const main = new Main();

  runMain(main.cli());
}
