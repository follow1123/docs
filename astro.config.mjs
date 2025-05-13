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
            link: "/neovim",
            items: [
              "neovim",
              {
                label: "基础",
                autogenerate: { directory: "neovim/basics" },
              },
              {
                label: "搜索和替换",
                autogenerate: { directory: "neovim/search-replace" },
              },
              {
                label: "编辑环境",
                autogenerate: { directory: "neovim/editing-environment" },
              },
              {
                label: "定位和跳转",
                autogenerate: { directory: "neovim/positioning-jumping" },
              },
              {
                label: "其他",
                autogenerate: { directory: "neovim/others" },
              },
              {
                label: "内置插件",
                autogenerate: { directory: "neovim/builtin-plugins" },
              },
              "neovim/neovim-api",
            ],
          },
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
