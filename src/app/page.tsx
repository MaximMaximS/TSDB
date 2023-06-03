import Site from "@/components/site";
import { h1ClassName } from "@/components/typography";

export default function Page() {
  return (
    <Site>
      <h1 className={h1ClassName}>TheSimpsonsDatabase</h1>
    </Site>
  );
}
