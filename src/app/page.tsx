import H1 from "@/components/static/text/h1";
import Site from "@/components/static/site";
import Box from "@/components/static/box";
import HoverSpinner from "./hover-spinner";

export default function Page() {
  return (
    <Site>
      <Box>
        <div className="flex items-center justify-center">
          <H1>TSDB</H1>
          <HoverSpinner />
        </div>
      </Box>
    </Site>
  );
}
