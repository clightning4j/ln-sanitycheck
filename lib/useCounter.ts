import { useCallback, useEffect, useState } from "react";

export default function useCounter(): [
  string,
  () => void,
  () => void,
] {
  const [infoNode, setInfoNode] = useState({});

  const ping = useCallback(() => {
    fetch("/api/lnnode/ping").catch((e) => console.error(e));
  }, []);

  const autoping = useCallback(() => {
    fetch("/api/lnnode/autoping").catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    fetch("/api/lnnode").then((resp) => resp.json().catch(() => ({})))
      .then(({ getInfoNode }) => {
        if (!Number.isNaN(getInfoNode)) {
          setInfoNode(getInfoNod);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {});
  }, []);

  return [infoNode, ping, autoping];
}
