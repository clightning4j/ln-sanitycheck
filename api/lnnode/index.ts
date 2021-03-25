import type { APIRequest } from "aleph/types.ts";

export default async function handler(req: APIRequest) {
  const getInfoNode =
    await (await fetch("http://localhost:7000/utility/getinfo")).json();
  //console.debug(getInfoNode);
  req.status(200).json(getInfoNode);
}
