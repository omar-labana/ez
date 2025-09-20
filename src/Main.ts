import { defineCommand } from "citty";
import Sequence from "@/Sequence.ts";

class Main {
  cli() {
    return defineCommand({
      meta: {
        name: "easy",
        version: "0.1.0",
        description: "Easy Swagger Parser",
      },
      args: {
        url: {
          type: "positional",
          description: "The complete URL for the JSON Swagger file to parse",
          required: true,
        },
      },
      run({ args }) {
        const sequence = new Sequence(args.url);

        sequence.start();
      },
    });
  }
}

export default Main;
