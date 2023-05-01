import { cn } from "@/lib/utils";
import "./globals.css";
// eslint-disable-next-line camelcase
import { Roboto_Mono, Roboto_Serif, Rubik } from "next/font/google";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import SiteHeader from "@/components/header/site-header";

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

const serif = Roboto_Serif({
  display: "swap",
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "variable",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(sans.variable, mono.variable, serif.variable)}
      suppressHydrationWarning>
      <body className={cn("font-sans", "bg-background", "text-foreground")}>
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
