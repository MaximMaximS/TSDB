export const siteConfig = {
  name: "TSDB",
  description:
    "Simple app to keep track of your watched episodes of The Simpsons.",
  links: {
    github: "https://github.com/MaximMaximS/tsdb",
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
};

export type SiteConfig = typeof siteConfig;
