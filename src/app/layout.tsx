import { cn } from "@/lib/utils";
import "./globals.css";
// eslint-disable-next-line camelcase
import { Roboto_Mono, Roboto_Serif, Rubik } from "next/font/google";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";

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
    default: "Next.js Blob",
    template: "%s | Next.js Blob",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  description: "Doin' some next-gen things...",
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
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
