import puppeteer from "puppeteer-core";
import type { Browser, Page } from "puppeteer-core";
import type { Mermaid } from "mermaid";
const chromePath = import.meta.env.CHROME_PATH;

class Renderer {
  #browser: Browser | undefined;
  #page: Page | undefined;
  constructor() {}

  async init() {
    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
    });
    this.#browser = browser;

    const page = await browser.newPage();
    await page.addScriptTag({
      path: new URL(import.meta.resolve("mermaid/dist/mermaid.min.js"))
        .pathname,
    });
    this.#page = page;
  }

  deinit() {
    if (this.#browser) {
      const process = this.#browser.process();
      if (process) {
        console.log("kill headless browser: ", process.pid);
        process.kill();
      }
    }
  }

  async render(
    id: string,
    code: string,
    theme: "default" | "dark",
  ): Promise<string> {
    if (!this.#page) await this.init();
    const page = this.#page as Page;
    return page.evaluate(
      (id, code, theme) => {
        // @ts-ignore
        const mmd = mermaid as Mermaid;
        mmd.initialize({ startOnLoad: true, theme });
        return new Promise<string>((resolve, reject) => {
          mmd
            .render(id, code)
            .then((result) => {
              resolve(result.svg);
            })
            .catch((e) => reject(e));
        });
      },
      id,
      code,
      theme,
    );
  }
}

const renderer = new Renderer();

export default renderer;
