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

  static getListNodesFromApi(): Promise<ListFounds> {
    return new Promise<Record<string, Object>>((resolve, reject) =>
      fetch("/api/lnnode/listnodes")
        .then((resp) => resolve(resp.json()))
        .catch((err) => reject(err))
    );
  }
}

export default NodeAPIController;
