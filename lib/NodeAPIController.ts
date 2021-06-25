import {ListFounds} from "./model/NodeAPI.ts";

class NodeAPIController {
  static getNodeInfoFromApi(): Promise<Record<string, Object>> {
    return new Promise<Record<string, Object>>((resolve, reject) =>
      fetch("/api/lnnode")
        .then((resp) => resolve(resp.json()))
        .catch((err) => reject(err))
    );
  }

  static getListFoundsFromApi(): Promise<ListFounds> {
    return new Promise<ListFounds>((resolve, reject) =>
      fetch("/api/lnnode/listfounds")
        .then((resp) => resolve(resp.json()))
        .catch((err) => reject(err))
    );
  }

  static getListNodesFromApi(): Promise<Array<Object>> {
    return new Promise<Array<Object>>((resolve, reject) =>
      fetch("/api/lnnode/listnodes")
        .then((resp) => resolve(resp.json()))
        .catch((err) => reject(err))
    );
  }

  static pingNodeWithId(id: string): Promise<Object> {
    return new Promise<Array<Object>>((resolve, reject) =>
      fetch("/api/lnnode/ping/" + id)
        .then((resp) => resolve(resp.json()))
        .catch((err) => reject(err))
    );
  }

  static getListFoundsFromApiWithNodeInfo(): Promise<ListFounds> {
    return new Promise<ListFounds>(async (resolve, reject) => {
        try {
          let funds = await NodeAPIController.getListFoundsFromApi();
          let nodes = await NodeAPIController.getListNodesFromApi();
          // FIXME: The opposit operation is better, because the list funds can be smaller than
          // all the node in the network.
          let resp = []
          nodes.nodes.forEach((node) => {
            let channel = funds.channels.filter(channel => node["nodeId"] === channel["peerId"]);
            if (channel) {
              channel["nodeInfo"] = node; // For sure there peer is the same here
              resp.push(channel);
            }
          });
          console.log("List funds with info");
          console.log(resp);
          resolve(resp);
        } catch (error) {
          reject(error);
        }
      }
    );
  }

}

export default NodeAPIController;
