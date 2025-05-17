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
            label: "Linux",
            link: "/linux/",
            items: [
              "linux",
              {
                label: "Linux 基础",
                autogenerate: { directory: "linux/basics" },
              },
              {
                label: "常用命令",
                autogenerate: { directory: "linux/commands" },
              },
              {
                label: "Shell",
                autogenerate: { directory: "linux/shell" },
              },
              {
                label: "Systemd",
                autogenerate: { directory: "linux/systemd" },
              },
              {
                label: "桌面环境",
                autogenerate: { directory: "linux/desktop-environment" },
              },
              {
                label: "进程通信",
                autogenerate: { directory: "linux/process-communication" },
              },
              {
                label: "常见问题",
                autogenerate: { directory: "linux/troubleshooting" },
              },
            ],
          },
          {
            label: "Git",
            link: "/git/",
            items: [
              "git",
              {
                label: "初始化",
                autogenerate: { directory: "git/initialization" },
              },
              {
                label: "操作仓库",
                autogenerate: { directory: "git/operation" },
              },
              {
                label: "仓库信息",
                autogenerate: { directory: "git/information" },
              },
              {
                label: "还原操作",
                autogenerate: { directory: "git/restore-operations" },
              },
              {
                label: "分支",
                autogenerate: { directory: "git/branch" },
              },
              {
                label: "重写历史",
                autogenerate: { directory: "git/rewrite-history" },
              },
              {
                label: "其他",
                autogenerate: { directory: "git/others" },
              },
              {
                label: "搭建 Git 服务",
                autogenerate: { directory: "git/git-server" },
              },
              "git/specification",
              "git/github",
            ],
          },
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
          {
            label: "其他/Nginx",
            link: "/nginx",
            items: ["nginx", "nginx/configuration", "nginx/commands"],
          },
          {
            label: "其他/Redis",
            link: "/redis",
            items: ["redis"],
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
