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
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { QRCode } from "react-qr-svg";
import NodeAPIController from "../lib/NodeAPIController.ts";
import {NodeAddress, ListFounds} from "../lib/model/NodeAPI.ts";
import NodesTable from "../components/NodesTable.tsx";
import Offline from "../components/Offline.tsx";
import theme from "../themes/oceanic.ts";

interface State {
  ready: boolean;
  loadingChannels: boolean;
  nodeOnline: boolean;
  aliasNode: string;
  addressNode: string;
  infoNode: Record<string, Object>;
  alerInfo: Record<string, Object>;
  nodeAddresses: Array<NodeAddress>;
  selectedAddress: NodeAddress;
  nodeChannels: ListFounds;
}

class Home extends React.Component<unknown, State> {
  state: State = {
    ready: false,
    loadingChannels: false,
    nodeOnline: false,
    aliasNode: "",
    addressNode: "",
    infoNode: {},
    nodeAddresses: [],
    nodeChannels: {},
    selectedAddress: {},
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
  async getInfoNode() {
    let result = await NodeAPIController.getNodeInfoFromApi();
    this.setNodeInfo(result);
    //TODO catch the error
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
      this.setState({
        infoNode: nodeInfo,
        nodeOnline: isOnline,
        addressNode: address,
        selectedAddress: nodeInfo["address"][0],
        aliasNode: nodeInfo["alias"],
        nodeAddresses: nodeInfo["address"],
      });
    } else {
      console.error("Node offline ", nodeInfo, " size key are ", Object.keys(nodeInfo).length);
      this.setState({ infoNode: {}, nodeOnline: isOnline });
    }
  }

  /**
   * Get node channels from listFunds. 
   */
  async getOpenedChannels() {
    let result = await NodeAPIController.getListFoundsFromApi()
    this.setChannelsOpened(result);
    //TODO catch the error
  }

  setChannelsOpened(channels: ListFounds) {
    console.debug("ListFounds: ", channels);
    this.setState({nodeChannels: channels});
  }

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

  changeAddressWithType(type: string) {
    for (var addr of this.state.nodeAddresses) {
      console.debug("Analysis of address: ", addr);
      if (addr.type === type) {
        console.debug("Found address with protocol: ", addr["type"]);
        let address = this.parseAddress(addr);
        this.setState({ addressNode: address, selectedAddress: addr });
        return;
      }
    }
    this.changeAlertState({ visible: true, message: "Address not available" });
  }


  parseAddress(address: NodeAddress, nodeId: string = "") {
    if (nodeId !== "") {
      return `${nodeId}@${address.address}:${address.port}`;
    }
    return `${this.state.infoNode["id"]}@${address.address}:${address.port}`;
  }

  async componentDidMount() {
    await this.getInfoNode();
    await this.getOpenedChannels();
    this.loadDom();
  }

  loadDom() {
    new Promise((resolve) => setTimeout(() => resolve(), 1000))
      .then(() => {
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
                  <Grid container 
                        direction="row"
                        justify="center"
                        alignItems="center">
                    <FormControl variant="outlined" style={{
                            margin: theme.spacing(2),
                            minWidth: 230,
                            textAlign: "center",
                            }}>
                      <InputLabel id="address-select-outlined-label">Address</InputLabel>
                      <Select
                        labelId="address-select-outlined-label"
                        id="address-outlined-select"
                        value={this.state.selectedAddress.type == undefined ? "Unkown" : this.state.selectedAddress.type}
                        onChange={(event) => this.changeAddressWithType(event.target.value)}
                        label="Address"
                      >
                        {this.state.nodeAddresses.map((address, index) => {
                          return <MenuItem key={index} value={address.type}>{address.type}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </CardContent>
              </Card>}
          </Grid>
          {this.state.nodeChannels?.channels?.length > 0 && <NodesTable
                channels={this.state.nodeChannels.channels}
                //nodes={this.state.peers}
                comunicate={this.changeAlertState}
            />}
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
