// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeFlexoki from "starlight-theme-flexoki";
import starlightKbd from "starlight-kbd";
import starlightSidebarTopics from "starlight-sidebar-topics";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      components: {
        ThemeSelect: "./src/components/ThemeSelect.astro",
        Header: "./src/components/Header.astro",
        Sidebar: "./src/components/Sidebar.astro",
      },
      plugins: [
        starlightThemeFlexoki(),
        starlightKbd({
          globalPicker: false,
          types: [
            { id: "mac", label: "macOS" },
            { id: "windows", label: "Windows" },
            { id: "linux", label: "Linux", default: true },
          ],
        }),
        starlightSidebarTopics([
          {
            label: "Neovim",
            link: "/neovim/motions",
            icon: "open-book",
            items: ["neovim/motions", "neovim/modes"],
          },
        ]),
      ],
      title: "Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
    }),
  ],
});
