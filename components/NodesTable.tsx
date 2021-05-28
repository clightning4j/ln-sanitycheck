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
} from "@material-ui/core";
import Loading from "Loading.tsx";

interface NodesTableProps {
  nodes: Array<Object>;
  ping: () => void;
}

class NodesTable extends React.Component<NodesTableProps> {
  constructor(props: PropsType) {
    super(props);
    this.endLoad = this.endLoad.bind(this);
  }

  endLoad(setVisible, sendMessage) {
    if (!this.props.isLoading) {
      return;
    }
    setVisible(false);
    sendMessage({ "visible": true, "message": "Channels loaded" });
  }

  pingNode(id: string) { }

  render() {
    const { channels, nodes, comunicate } = this.props;
    console.log(channels);
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
                      label="TODO"
                      //style={{ background: "#" + node["color"] }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {channel["peerId"]}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {channel["channelSat"] + " sats"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {channel["state"]}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      onClick={() => fetch("/lnnode/ping/" + channel["peerId"])}
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
