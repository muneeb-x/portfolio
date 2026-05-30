import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "ABDUL MUNEEB | Data Science Portfolio",
  description: "Data Science & AI enthusiast | Web Engineering | Information Security. Building with Python, SQL, and intelligent systems.",
  keywords: [
    "data science",
    "ai",
    "machine learning",
    "python",
    "portfolio",
    "abdul muneeb",
    "data-driven",
    "analytics",
    "web engineering",
    "information security",
    "nextjs",
    "react",
    "typescript",
  ] as Array<string>,
  authors: {
    name: "ABDUL MUNEEB",
    url: "https://github.com/muneeb-x",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
} as const;
