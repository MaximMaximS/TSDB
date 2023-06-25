const siteConfig = {
  name: "TSDB",
  description:
    "Simple app to keep track of your watched episodes of The Simpsons.",
  links: {
    github: "https://github.com/MaximMaximS/TSDB",
  },
  author: {
    name: "MaximMaximS",
    url: "https://github.com/MaximMaximS",
  },
  paths: [
    {
      label: "Home",
      href: "/",
      login: false,
    },
    {
      label: "Search",
      href: "/search",
      login: true,
    },
  ],
  security: {
    minPasswordLength: 8,
    minUsernameLength: 3,
    minSearchQueryLength: 3,
    sessionLength: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
} as const;

export default siteConfig;

export type SiteConfig = typeof siteConfig;
