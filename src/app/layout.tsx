import { cn } from "@/lib/utils";
import "./globals.css";
// eslint-disable-next-line camelcase
import { Roboto_Mono, Rubik } from "next/font/google";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import SiteHeader from "@/components/header/site-header";
import siteConfig from "@/config/site";
import SiteFooter from "@/components/site-footer";

const sans = Rubik({
  display: "swap",
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Roboto_Mono({
  display: "swap",
  variable: "--font-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(sans.variable, mono.variable)}
      suppressHydrationWarning>
      <body>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex flex-1 items-stretch justify-center">
              {children}
            </main>
            <SiteFooter />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
