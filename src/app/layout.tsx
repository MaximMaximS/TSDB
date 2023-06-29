import SiteHeader from "@/components/header/site-header";
import Providers from "@/components/providers/providers";
import SiteFooter from "@/components/site-footer";
import { Toaster } from "@/components/ui/toaster";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
// eslint-disable-next-line camelcase
import { Roboto_Mono, Rubik } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const sans = Rubik({
  display: "swap",
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "variable",
});

const mono = Roboto_Mono({
  display: "swap",
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "variable",
});

const simpsons = localFont({
  src: "./../../public/assets/fonts/simpsons.ttf",
  display: "swap",
  variable: "--font-simpsons",
});

export const metadata = {
  title: {
    default: "TSDB",
    template: "%s | TSDB",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  description:
    "Simple app to keep track of your watched episodes of The Simpsons.",
  authors: siteConfig.author,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(sans.variable, mono.variable, simpsons.variable)}
      suppressHydrationWarning>
      <body>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex grow">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
