import type { APIRequest } from "aleph/types.ts";

export default async function handler(req: APIRequest) {
  const getInfoNode =
    await (await fetch("http://localhost:7000/utility/getinfo")).json();
  console.error(getInfoNode);
  if (getInfoNode === undefined) {
    req.status(500);
    return;
  }
  req.status(200).json(getInfoNode);
}
