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
import Loading from 'Loading.tsx'

interface NodesTableProps {
  nodes: Array<Object>;
  ping: () => void;
}

class NodesTable extends React.Component<NodesTableProps> {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    const { channels, nodes, ping, isLoading, endLoading} = this.props;
    return (
      <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Color Node</TableCell>
              <TableCell>Node id</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((node) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  <Chip
                    label={node["alias"]}
                    style={{ background: "#" + node["color"] }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {node["nodeId"]}
                </TableCell>
                <TableCell component="th" scope="row">
                  {new Date(node["lastTimestamp"]).toLocaleDateString()}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => fetch("/lnnode/ping/" + node["nodeId"])}
                  >
                    Ping
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && <Loading />}
      {nodes.length > 0 && endLoading(false)}
      </React.Fragment>
    );
  }
}

export default NodesTable;