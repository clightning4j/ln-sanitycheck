import type { APIRequest } from "aleph/types.ts";

export default async function handler(req: APIRequest) {
  let restUrl = Deno.env.get("REST_URL");
  if (restUrl == null) {
    restUrl = "localhost:7000";
    console.log("ENV variable not found");
  }
  const getInfoNode =
    await (await fetch(`http://${restUrl}/utility/getinfo`)).json();
  console.error(getInfoNode);
  if (getInfoNode === undefined) {
    req.status(500);
    return;
  }
  req.status(200).json(getInfoNode);
}
