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

interface NodesTableProps {
  nodes: Array<Object>;
  ping: () => void;
}

class NodesTable extends React.Component<NodesTableProps> {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    const { nodes, ping } = this.props;
    return (
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
    );
  }
}

export default NodesTable;
