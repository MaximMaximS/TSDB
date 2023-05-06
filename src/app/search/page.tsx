import Site from "@/components/site";
import { h1ClassName } from "@/components/typography";

export default function Page() {
  return (
    <Site>
      <h1 className={h1ClassName}>Search</h1>
    </Site>
  );
}
