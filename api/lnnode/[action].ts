import type { APIRequest } from "aleph/types.ts";

const store = globalThis as any;

export default async function handler(req: APIRequest) {
  let restUrl = Deno.env.get("REST_URL");
  if (restUrl == null) {
    restUrl = "localhost:7000";
    console.log("ENV variable not found");
  }
  switch (req.params.action) {
    case "ping":
      console.debug("Ping node " + req.params[0]);
      const pingNode = await (await fetch(
        `http://${restUrl}/network/ping/${req.params[0]}`,
      )).json();
      req.status(200).json(pingNode);
      break;
    case "autoping":
      console.debug("Calling autoping");
      const resultRequest = await fetch(
        `http://${restUrl}/utility/getinfo`,
      );
      const getInfoNode = await resultRequest.json();
      console.debug(JSON.stringify(getInfoNode));
      req.status(200).json(getInfoNode);
      break;
    case "listchannels":
      const listChannelsRps = await fetch(
        `http://${restUrl}/channel/listchannels`,
      );
      const listChannels = await listChannelsRps.json();
      console.debug(JSON.stringify(listChannels));
      req.status(200).json(listChannels);
      break;
    case "listnodes":
      const listNodesResp = await fetch(`http://${restUrl}/network/listnodes`);
      const listNodes = await listNodesResp.json();
      console.debug(JSON.stringify(listNodes));
      req.status(200).json(listNodes);
      break;
    case "listfounds":
      // /utility/listfounds
      const listFoundsResp = await fetch(`http://${restUrl}/utility/listfounds`);
      const listFounds = await listFoundsResp.json();
      console.debug(JSON.stringify(listFounds));
      req.status(200).json(listFounds);
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
