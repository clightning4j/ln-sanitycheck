import React, { PropsType } from "react";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar
} from "@material-ui/core";
import NodeAPIController from "../lib/NodeAPIController.ts";


interface NodesTableProps {
  nodes: Array<Object>;
  ping: () => void;
}

class NodesTable extends React.Component<NodesTableProps> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      snackbar: {
        visible: false,
        message: "",
      }
    }

    this.endLoad = this.endLoad.bind(this);
    this.pingNode = this.pingNode.bind(this);
  }

  endLoad(setVisible: boolean, sendMessage: string) {
    if (!this.props.isLoading) {
      return;
    }
    setVisible(false);
    sendMessage({ "visible": true, "message": "Channels loaded" });
  }

  async pingNode(id: string, snackbarCallback) {
    NodeAPIController.pingNodeWithId(id).then(res => {
      console.debug(`Result ping for the node ${res}`);
      snackbarCallback({visible: true, message: `Node ${id} is up`});
    })
    .catch(error => {
      console.error("Error received in ping operation is ", error);
      snackbarCallback({visible: true, message: `Node ${id} ping throws a exception: \n${error.toString()}`});
    });
  }

  render() {
    const { channels, comunicate } = this.props;
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Node Name</TableCell>
                <TableCell>Node Id</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {channels.map((channel) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Chip
                      label={channel.nodeInfo["alias"]}
                      style={{ background: "#" + channel.nodeInfo["color"] }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {channel["peerId"]}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {channel["channelTotalSat"] + " sats"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {channel["state"]}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      onClick={() => this.pingNode(channel["peerId"], comunicate)}
                    >
                      Ping
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}

/**
 * 
        {isLoading && <Loading />}
        {nodes.length > 0 && this.endLoad(endLoading, comunicate)}
 */

export default NodesTable;
