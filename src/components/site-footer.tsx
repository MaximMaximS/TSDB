import { Logo } from "@/components/icons";
import siteConfig from "@/config/site";

export default function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo className="hidden h-6 w-6 md:inline-block" />
          <p className="text-center font-mono text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4">
              {siteConfig.author.name}
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4">
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
