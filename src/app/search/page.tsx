import { search } from "@/app/search/actions";
import Site from "@/components/site";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <Site>
      <Card>
        <CardHeader>
          <CardTitle>Search Episode</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="search" action={search} autoComplete="off">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input name="title" id="title" placeholder="Title" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Cancel</Button>
          <Button type="submit" form="search">
            Search
          </Button>
        </CardFooter>
      </Card>
    </Site>
  );
}
