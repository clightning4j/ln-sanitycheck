import type { APIRequest } from "aleph/types.ts";
import { useDeno } from "https://deno.land/x/aleph/mod.ts";

export default async function handler(req: APIRequest) {
  const getInfoNode = useDeno(async () => {
    return await (await fetch("http://localhost:7000/utility/getinfo")).json();
  }, true);
  req.status(200).json(getInfoNode);
}
