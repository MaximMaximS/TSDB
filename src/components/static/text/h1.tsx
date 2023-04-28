const cn =
  "scroll-m-20 font-sans text-4xl font-extrabold tracking-tight lg:text-5xl";

export default function H1({ children }: { children: string }) {
  return <h1 className={cn}>{children}</h1>;
}

export const H1ClassName = cn;
