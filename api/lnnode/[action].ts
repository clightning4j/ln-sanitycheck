import type { APIRequest } from "aleph/types.ts";
import { useDeno } from "https://deno.land/x/aleph/mod.ts";

const store = globalThis as any;

export default async function handler(req: APIRequest) {
  switch (req.params.action) {
    case "ping":
      // TODO ping node with id
      const pingNode = useDeno(async () => {
        return await (await fetch(
          "http://localhost:7000/network/ping/" + req.params[0],
        )).json();
      }, true);
      req.status(200).json(pingNode);
      break;
    case "autoping":
      //TODO call getinfo
      const getInfoNode = useDeno(async () => {
        return await (await fetch("http://localhost:7000/utility/getinfo"))
          .json();
      }, true);
      req.status(200).json(getInfoNode);
      break;
    default:
      req.status(400).json({
        error: "UnknownAction",
        status: 400,
        message: `undefined action '${req.params.action}'`,
      });
      break;
  }
}
