const siteConfig = {
  name: "TSDB",
  description:
    "Simple app to keep track of your watched episodes of The Simpsons.",
  links: {
    github: "https://github.com/MaximMaximS/tsdb",
  },
  author: {
    name: "MaximMaximS",
    url: "https://github.com/MaximMaximS",
  },
  paths: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Search",
      href: "/search",
    },
  ],
} as const;

export default siteConfig;

export type SiteConfig = typeof siteConfig;
