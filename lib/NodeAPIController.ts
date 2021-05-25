/**
 * .catch((e) => {
                callback({});
                console.error(e);
            })
            )
            .then((nodeInfo) => {
                console.info("Success with info: ", nodeInfo);
                callback(nodeInfo);
            })
            .catch((e) => {
                console.info("Failure with error: ", e);
                callback({});
 */

class NodeAPIController {
  static getNodeInfoFromApi(): Promise<Record<string, Object>> {
    return new Promise<Record<string, Object>>((resolve, reject) =>
      fetch("/api/lnnode")
        .then((resp) => resolve(resp.json()))
        .catch((err) => reject(err))
    );
  }
}

export default NodeAPIController;
