import path from "path";
import fs from "fs";
import crypto from "crypto";
import renderer from "./renderer";

export interface SvgFile {
  lightPath: string;
  darkPath: string;
  width: string | undefined;
}

class MermaidSvgCleaner {
  #cache: Map<string, Array<string>>;

  constructor() {
    this.#cache = new Map();
  }

  set(dir: string, svgName: string) {
    if (this.#cache.has(dir)) {
      const svgNames = this.#cache.get(dir) as Array<string>;
      svgNames.push(svgName);
    } else {
      const svgNames = new Array();
      svgNames.push(svgName);
      this.#cache.set(dir, svgNames);
    }
  }

  clean() {
    this.#cache.forEach((svgNames, dir) => {
      try {
        const files = fs.readdirSync(dir, {});
        const unusedFiles = files.filter(
          (f) => !svgNames.includes(f.toString()),
        );
        if (unusedFiles.length > 0) {
          unusedFiles.forEach((f) => {
            const unusedSvg = path.join(dir, f.toString());
            console.log(`\nremove unused mermaid svg: ${unusedSvg}`);
            fs.rmSync(unusedSvg, { recursive: true });
          });
        }
      } catch (e) {
        console.error(`\ncannot clean dir: ${dir}, error: ${e}`);
      }
    });
  }
}

const publicPath = "public";
const prefixPath = "mermaid-svg";
const cleaner = new MermaidSvgCleaner();

const findWdithFromContent = (
  content: Buffer<ArrayBufferLike>,
): string | undefined => {
  const searchKey = "max-width: ";
  const widthStart = content.indexOf(searchKey) + searchKey.length;
  let widthEnd = widthStart;
  for (; ; widthEnd++) {
    const b = content.at(widthEnd) as number;
    const c = String.fromCharCode(b);

    if (c === "." || c === "p" || c === ";") {
      break;
    }
    if (widthEnd - widthStart > 5) break;
  }

  return content.subarray(widthStart, widthEnd).toString();
};

const generate = async (filePath: string, code: string): Promise<SvgFile> => {
  filePath = path.normalize(filePath);
  const dir = path.join(publicPath, prefixPath, filePath);
  const svgName = crypto.createHash("md5").update(code, "utf8").digest("hex");
  cleaner.set(dir, svgName);
  const svgDir = path.join(dir, svgName);
  fs.mkdirSync(svgDir, { recursive: true });

  const lightPath = path.join(svgDir, "light.svg");
  const darkPath = path.join(svgDir, "dark.svg");

  if (!fs.existsSync(lightPath)) {
    const content = await renderer.render(
      `mermaid-${svgName}-light`,
      code,
      "default",
    );
    fs.writeFileSync(lightPath, content);
  }
  if (!fs.existsSync(darkPath)) {
    const content = await renderer.render(
      `mermaid-${svgName}-dark`,
      code,
      "dark",
    );
    fs.writeFileSync(darkPath, content);
  }

  const svgContent = fs.readFileSync(lightPath);
  const width = findWdithFromContent(svgContent);
  return {
    lightPath: lightPath.slice(publicPath.length),
    darkPath: darkPath.slice(publicPath.length),
    width,
  };
};

process.on("exit", () => {
  cleaner.clean();
  renderer.deinit();
});

export default generate;
