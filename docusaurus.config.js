// @ts-check
import { themes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Notes 3M5 – Intro Mobile",
  tagline: "Notes de cours détaillées : Kotlin, Jetpack Compose et Android",
  favicon: "img/logo.svg",
  url: "http://localhost",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: { defaultLocale: "fr", locales: ["fr"] },

  markdown: { mermaid: true },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
        },
        blog: false,
        theme: { customCss: "./src/css/custom.css" },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: { sidebar: { hideable: true } },
      navbar: {
        title: "3M5 Intro Mobile",
        logo: { alt: "Logo", src: "img/logo.svg" },
        items: [
          { type: "docSidebar", sidebarId: "cours", position: "left", label: "Cours 🧑‍🏫" },
          { to: "/aide-memoire", position: "left", label: "Aide-mémoire 📋" },
          { to: "/travaux-pratiques", position: "left", label: "Travaux pratiques 🛠️" },
          {
            href: "https://info.cegepmontpetit.ca/3M5-Intro-Mobile/",
            label: "Site officiel du cours",
            position: "right",
          },
          {
            href: "https://github.com/departement-info-cem/3M5-Intro-Mobile",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright:
          "Notes personnelles basées sur le cours 3M5 – Intro Mobile du Cégep Édouard-Montpetit (contenu sous licence du dépôt d'origine).",
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ["kotlin", "java", "groovy", "toml", "bash", "powershell", "diff", "ini"],
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    }),
};

export default config;
