// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',
  themes: [ '@docusaurus/theme-mermaid' ],
  // In order for Mermaid code blocks in Markdown to work,
  // you also need to enable the Remark plugin with this option
  markdown: {
    mermaid: true,
  },
  // Set the production url of your site here
  url: 'https://follow1123.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'follow1123', // Usually your GitHub org/user name.
  projectName: 'doc', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans']
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'java',
        path: 'java',
        routeBasePath: '/java',
        sidebarPath: './sidebarsJava.js',
      })
    ],
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: "/",
        language: ["en", "zh"],
        searchBarShortcutHint: false,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 侧边栏底部点击隐藏
      docs: { sidebar: { hideable: true } },
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        logo: {
          alt: 'Doc Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/java/',
            position: 'left',
            label: 'Java',
            activeBaseRegex: `/java/`,
          },
          {
            href: 'https://github.com/follow1123/docs',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/',
              },
              {
                label: 'Java',
                to: '/java/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub Repository',
                href: 'https://github.com/follow1123/docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: {
          plain: { color: '#D4D4D4', backgroundColor: '#212121' },
          styles: [
            ...prismThemes.vsDark.styles,
            { types: ['title'], style: { color: '#569CD6', fontWeight: 'bold', }, },
            { types: ['property', 'parameter'], style: { color: '#9CDCFE', }, },
            { types: ['script'], style: { color: '#D4D4D4', }, },
            { types: ['boolean', 'arrow', 'atrule', 'tag'], style: { color: '#569CD6', }, },
            { types: ['number', 'color', 'unit'], style: { color: '#B5CEA8', }, },
            { types: ['font-matter'], style: { color: '#CE9178', }, },
            { types: ['keyword', 'rule'], style: { color: '#C586C0', }, },
            { types: ['regex'], style: { color: '#D16969', }, },
            { types: ['maybe-class-name'], style: { color: '#4EC9B0', }, },
            { types: ['constant'], style: { color: '#4FC1FF', }, },
          ],
      },
      additionalLanguages: ["lua", "batch", "bash", "powershell", "java", "mermaid", "sql", "nginx", "properties", "ini"],
      magicComments: [ 
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        { className: 'code-block-error-line', line: 'error line', }
      ]
    },
  }),
};

export default config;
