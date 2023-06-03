import { apiAuth } from "@/lib/api";

export async function GET() {
  const uid = await apiAuth();
  if (uid instanceof Response) {
    return uid;
  }
  return new Response(undefined, { status: 204 });
}
