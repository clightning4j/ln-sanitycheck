import React from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel
} from "@material-ui/core";
import { Add, Menu, Sync } from "@material-ui/icons";
import { QRCode } from "react-qr-svg";
import NodeAPIController from "../lib/NodeAPIController.ts";
import NodeAddress from "../lib/model/NodeAddress.ts";
import NodesTable from "../components/NodesTable.tsx";
import Offline from "../components/Offline.tsx";

interface State {
  ready: boolean;
  loadingChannels: boolean;
  nodeOnline: boolean;
  torAddress: boolean;
  aliasNode: string;
  addressNode: string;
  infoNode: Record<string, Object>;
  alerInfo: Record<string, Object>;
  listFunds: Array<Object>;
  nodeAddresses: Array<NodeAddress>;
}

class Home extends React.Component<unknown, State> {
  state: State = {
    ready: false,
    loadingChannels: false,
    nodeOnline: false,
    torAddress: false,
    aliasNode: "",
    addressNode: "",
    infoNode: {},
    nodeAddresses: [],
    listFunds: [],
    alerInfo: {
      "visible": false,
      "message": "",
    },
  };

  /**
   * This function make the ping to the node to shows if
   * it is ready.
   */
  autoPing() {}

  /**
   * This function call getInfo RPC method
   * to update the UI with the last information.
   */
  getInfoNode() {
    NodeAPIController.getNodeInfoFromApi()
      .then((result) => this.setNodeInfo(result))
      .catch((err) =>
        this.changeAlertState({
          visible: true,
          message: `Error from node: ${err}`,
        })
      );
  }

  setNodeInfo(nodeInfo: Record<string, Object>) {
    console.info(
      "Node info called with the following informations: ",
      nodeInfo,
    );
    let isOnline = Object.keys(nodeInfo).length !== 0;
    if (isOnline) {
      //assert(nodeInfo["address"].length > 0);
      let address = this.parseAddress(nodeInfo["address"][0], nodeInfo["id"]);
      console.error("Address: ", address);
      let protocol = nodeInfo["address"][0].type;
      this.setState({
        infoNode: nodeInfo,
        nodeOnline: isOnline,
        torAddress: protocol.includes("tor"),
        addressNode: address,
        aliasNode: nodeInfo["alias"],
        nodeAddresses: nodeInfo["address"],
      });
    } else {
      this.setState({ infoNode: {}, nodeOnline: isOnline });
    }
  }

  /**
   * Get node channels from listFunds. 
   */
  getOpenChannel() {}

  /**
   * Setter method to change the value of the
   */
  setLoadingChannelView(value: boolean) {
    this.setState({ loadingChannels: value });
  }

  setDomeReady(value: boolean) {
    this.setState({ ready: value });
  }

  changeAlertState(newInfo: Record<string, Object>) {
    this.setState({ alerInfo: newInfo });
  }

  changeAddress(tor: boolean) {
      for (var addr of this.state.nodeAddresses) {
        console.debug("Analysis of address: ", addr);
        if (addr.type.includes("tor") === tor) {
          console.error("Found address with protocol: ", addr["type"]);
          let address = this.parseAddress(addr);
          this.setState({addressNode: address, torAddress: tor});
          return;
        }
      }
      this.changeAlertState({visible: true, message: "Address not available"});
    }
  
    parseAddress(address: NodeAddress, nodeId: string = "") {
      if (nodeId !== "")
      return `${nodeId}@${address.address}:${address.port}`;
      return `${this.state.infoNode["id"]}@${address.address}:${address.port}`;
    }

  componentDidMount() {
    this.loadDom();
    this.getInfoNode();
  }

  loadDom() {
    new Promise((resolve) => setTimeout(() => resolve(), 100)).then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove(); // removing the spinner element
        this.setDomeReady(true); // showing the app
        console.debug("Virtual Dom Ready Ready");
      }
    });
  }

  render() {
    if (!this.state.ready) {
      return <div />;
    }
    return (
      <Container maxWidth="xl">
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              onClick={this.autoPing}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" style={{ flex: 1 }}>
              {this.state.aliasNode}
            </Typography>
            <Chip
              label={this.state.nodeOnline === false ? "Offline" : "Online"}
              style={{
                background: this.state.addressNode === ""
                  ? "#f78c6c"
                  : "#009688",
              }}
            />
          </Toolbar>
        </AppBar>
        <Box>
          <Grid
            container
            style={{ marginTop: "5em" }}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {this.state.addressNode === "" && <Offline />}
            {this.state.addressNode !== "" &&
              <Card>
                <CardContent>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={3} />
                    <Grid item xs={6} style={{ marginBottom: "1em" }}>
                      <Chip
                        label={this.state.infoNode["alias"]}
                        style={{
                          background: "#" + this.state.infoNode["color"],
                        }}
                      />
                    </Grid>
                    <Grid item xs={3} />
                  </Grid>
                  <Grid>
                    <QRCode
                      value={this.state.addressNode}
                      level="M"
                      style={{ width: 256 }}
                    />
                  </Grid>
                  <Grid container>
                    <Grid item xs={5} />
                    <Grid item xs={2} space={3}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch disabled={this.state.nodeAddresses.length <= 1} checked={this.state.torAddress} onChange={() => this.changeAddress(!this.state.torAddress)} />}
                        label={this.state.torAddress ? "Tor" : "Ip"}
                      />
                    </FormGroup>
                    </Grid>
                    <Grid item xs={5} />
                  </Grid>
                </CardContent>
              </Card>}
          </Grid>
          {this.state.addressNode !== "" && <div />}
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={this.state.alerInfo["visible"]}
          autoHideDuration={6000}
          onClose={() =>
            this.changeAlertState({ "visible": false, "message": "" })}
          message={this.state.alerInfo["message"]}
        />
      </Container>
    );
  }
}

export default Home;
/*

<NodesTable
                channels={listChannels}
                nodes={listNodes}
                ping={ping}
                isLoading={loading}
                endLoading={setLoading}
                comunicate={setAlertVisible}
            />


export default function Home() {
  let [
    infoNode,
    listChannels,
    listNodes,
    isOnline,
    ping,
    autoping,
    getListChannels,
    getListNodes,
  ] = useNode();

  const [alerVisible, setAlertVisible] = useState({"visible": false, "message": ""});
  const [loading, setLoading] = useState(false);
  const [render, setReander] = useState(true);

  const aliasNode = infoNode !== undefined ? infoNode["alias"] : "";
  // this need to be dinamic
  console.debug(`Info node: ${infoNode}`);
  const addressesNode = (infoNode !== undefined && infoNode["address"] !== undefined) ? infoNode["address"][0] : "";
  let nodeAddress = addressesNode !== ""
    ? `${infoNode["id"]}@${addressesNode["address"]}:${addressesNode["port"]}`
    : "";

  useEffect(() => {
    new Promise((resolve) => setTimeout(() => resolve(), 100)).then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove(); // removing the spinner element
        setReander(false); // showing the app
      }
    });
  });


  return (

  );
}
*/
