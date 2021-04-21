import { useCallback, useEffect, useState } from "react";

export default function useNode(): [
  string,
  Array<Object>,
  boolean,
  () => void,
  () => void,
  () => void,
] {
  let [nodeInfo, setNodeInfo] = useState(undefined);
  let [listChannels, setListChannels] = useState([]);
  let [listNodes, setListNodes] = useState([]);
  let [isOnline, setPigNode] = useState(false);
  console;
  const ping = useCallback(() => {
    fetch("/api/lnnode/ping")
      .then(() => setPigNode(true))
      .catch(() => setPigNode(false));
  }, []);

  const autoping = useCallback(() => {
    console.debug("Colling autoping");
    fetch("/api/lnnode/autoping").then((resp) =>
      resp.json().catch(() => (setPigNode(false)))
    )
      .then((nodeInfo) => {
        setPigNode(true);
        console.debug(`Autoping call with result: ${JSON.stringify(nodeInfo)}`);
        setNodeInfo(nodeInfo);
      })
      .catch((e) => console.error(e))
      .finally(() => {});
  }, []);

  const getListChannels = useCallback(() => {
    fetch("/api/lnnode/listchannels").then((resp) =>
      resp.json()
        .catch((e) => (console.log(e)))
    )
      .then((listNodes) => {
        console.debug(
          `listnodes call with result: ${JSON.stringify(listNodes)}`,
        );
        setListChannels(listNodes["channels"]);
      })
      .catch((e) => console.error(e));
  }, []);

  const getListNodes = useCallback(() => {
    fetch("/api/lnnode/listnodes").then((resp) =>
      resp.json()
        .catch((e) => (console.log(e)))
    )
      .then((listNodes) => {
        console.debug(
          `listnodes call with result: ${JSON.stringify(listNodes)}`,
        );
        setListNodes(listNodes["nodes"]);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    fetch("/api/lnnode").then((resp) =>
      resp.json().catch(() => (setPigNode(false)))
    )
      .then((nodeInfo) => {
        setNodeInfo(nodeInfo);
        setPigNode(true);
      })
      .catch((e) => console.error(e))
      .finally(() => {});
  }, []);

  return [nodeInfo, listChannels, listNodes, isOnline, ping, autoping, getListChannels, getListNodes];
}
