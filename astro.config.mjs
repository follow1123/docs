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
            label: "Windows",
            link: "/windows",
            items: [
              "windows",
              {
                label: "基础",
                autogenerate: { directory: "windows/basics" },
              },
              "windows/wsl",
              {
                label: "命令提示符",
                autogenerate: { directory: "windows/command-prompt" },
              },
              {
                label: "PowerShell",
                autogenerate: { directory: "windows/powershell" },
              },
              "windows/troubleshooting",
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
          {
            label: "其他/HTTP",
            link: "/http",
            items: [
              "http",
              "http/components",
              "http/methods",
              "http/status-code",
              "http/headers",
              "http/version",
            ],
          },
          {
            label: "其他/Docker",
            link: "/docker",
            items: [
              "docker",
              "docker/commands",
              "docker/dockerfile",
              "docker/network",
              "docker/compose",
              "docker/others",
            ],
          },
          {
            label: "其他/MySQL",
            link: "/mysql",
            items: [
              "mysql",
              "mysql/installation",
              {
                label: "SQL",
                autogenerate: { directory: "mysql/sql" },
              },
              "mysql/functions",
              "mysql/constraint",
              "mysql/multi-table-query",
              "mysql/transaction",
              "mysql/view",
              "mysql/procedure",
              "mysql/function",
              "mysql/trigger",
              {
                label: "索引",
                autogenerate: { directory: "mysql/index" },
              },
              {
                label: "锁",
                autogenerate: { directory: "mysql/lock" },
              },
              {
                label: "InnoDB 存储引擎",
                autogenerate: { directory: "mysql/innodb" },
              },
              "mysql/management",
              "mysql/specification",
              "mysql/others",
            ],
          },
          {
            label: "其他/Tomcat",
            link: "/tomcat",
            items: [
              "tomcat",
              "tomcat/commands",
              "tomcat/config-file",
              "tomcat/troubleshooting",
            ],
          },
          {
            label: "其他/UML类图",
            link: "/uml-class-diagram",
            items: ["uml-class-diagram"],
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
