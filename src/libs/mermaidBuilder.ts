import { execSync } from "child_process";
import path from "path";
import fs from "fs";

console.log("init mermaid builder");

const chromePath = import.meta.env.CHROME_PATH;
const publicPath = "public";
const baseUrl = import.meta.env.BASE_URL;
const prefixPath = "mermaid_svg";

class MermaidBuilder {
  #cache: Map<string, string>;

  constructor() {
    this.#cache = new Map();
  }

  #genSvg(file: string, code: string, darkTheme: boolean) {
    try {
      const result = execSync(
        `mmdc -o ${file} -t ${darkTheme ? "dark" : "default"} -b transparent --input - <<EOF${code}EOF`,
        {
          env: { ...process.env, PUPPETEER_EXECUTABLE_PATH: chromePath },
        },
      );
      console.log(`generate mermaid svg: ${file}\n${result.toString()}`);
    } catch (error) {
      console.error(`generate mermaid svg: ${file}\nerror: ${error}`);
    }
  }

  getBuildOutPath(file: string): {
    dir: string;
    lightPath: string;
    darkPath: string;
  } {
    const svgDir = path.join(publicPath, prefixPath, file);
    const darkPath = path.join(svgDir, "dark.svg");
    const lightPath = path.join(svgDir, "light.svg");

    return {
      dir: svgDir,
      lightPath: lightPath,
      darkPath: darkPath,
    };
  }

  build(file: string, code: string) {
    if (this.#cache.has(file)) {
      const c = this.#cache.get(file);
      if (!c) throw new Error(`file: ${file} code error`);
      if (code === c) {
        console.log(`no need to rebuild, file: ${file}`);
        return;
      }
      console.log(`rebuilding mermaid svg, file: ${file}`);
      const { darkPath, lightPath } = this.getBuildOutPath(file);
      this.#genSvg(lightPath, code, false);
      this.#genSvg(darkPath, code, true);
      this.#cache.set(file, code);
    } else {
      const { dir, darkPath, lightPath } = this.getBuildOutPath(file);
      if (fs.existsSync(lightPath) && fs.existsSync(darkPath)) {
        console.log(`file: ${file}, mermaid svg already exists`);
      } else {
        console.log(`building mermaid svg, file: ${file}`);
        fs.mkdirSync(dir, { recursive: true });
        this.#genSvg(lightPath, code, false);
        this.#genSvg(darkPath, code, true);
      }
      this.#cache.set(file, code);
    }
  }

  getLightUrl(file: string): string {
    return path.join(baseUrl, prefixPath, file, "light.svg");
  }

  getDarkUrl(file: string): string {
    return path.join(baseUrl, prefixPath, file, "dark.svg");
  }
}

const mermaidBuilder = new MermaidBuilder();

export default mermaidBuilder;
