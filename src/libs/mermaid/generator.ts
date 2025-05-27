import path from "path";
import fs from "fs";
import crypto from "crypto";
import renderer from "./renderer";

type SvgFile = { lightPath: string; darkPath: string };

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

const generate = async (filePath: string, code: string): Promise<SvgFile> => {
  filePath = path.normalize(filePath);
  const dir = path.join(publicPath, prefixPath, filePath.replaceAll("/", "_"));
  const svgName = crypto.createHash("md5").update(code, "utf8").digest("hex");
  cleaner.set(dir, svgName);
  const svgDir = path.join(dir, svgName);
  fs.mkdirSync(svgDir, { recursive: true });

  const lightPath = path.join(svgDir, "light.svg");
  const darkPath = path.join(svgDir, "dark.svg");

  if (fs.existsSync(darkPath) && fs.existsSync(lightPath)) {
    console.log(`\nno need to rebuild, file: ${filePath}-${svgName}`);
  } else {
    try {
      const lightId = `mermaid-${svgName}-light`;
      const lightSvgContent = await renderer.render(lightId, code, "default");
      const darkId = `mermaid-${svgName}-dark`;
      const darkSvgContent = await renderer.render(darkId, code, "dark");
      fs.writeFileSync(lightPath, lightSvgContent);
      console.log(`\ngenerate light svg file: ${lightPath}`);
      fs.writeFileSync(darkPath, darkSvgContent);
      console.log(`\ngenerate dark svg file: ${darkPath}`);
    } catch (e) {
      console.error(`render mermaid svg error: ${e}`);
    }
  }
  return { lightPath, darkPath };
};

process.on("exit", () => {
  cleaner.clean();
  renderer.deinit();
});

export default generate;
