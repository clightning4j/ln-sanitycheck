import React, { useState } from "react";
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
} from "@material-ui/core";
import { Add, Menu, Sync } from "@material-ui/icons";
import { QRCode } from "react-qr-svg";
import useNode from "../lib/useNode.ts";
import NodesTable from "../components/NodesTable.tsx";

export default function Home() {
  let [infoNode, listNodes, isOnline, ping, autoping, getListNodes] = useNode();
  const [alerVisible, setAlertVisible] = useState(false);

  const aliasNode = infoNode != undefined ? infoNode["alias"] : "";

  // this need to be dinamic
  const addressesNode = infoNode != undefined ? infoNode["address"][0] : "";
  let nodeAddress = addressesNode !== ""
    ? `${infoNode["id"]}@${addressesNode["address"]}:${addressesNode["port"]}`
    : "";

  return (
    <Container maxWidth="xl">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={autoping}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flex: 1 }}>
            {aliasNode}
          </Typography>
          <Chip
            label={infoNode === "" ? "Offline" : "Online"}
            style={{ background: infoNode === "" ? "#f78c6c" : "#009688" }}
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
          {aliasNode !== "" &&
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
                      label={infoNode["alias"]}
                      style={{ background: "#" + infoNode["color"] }}
                    />
                  </Grid>
                  <Grid item xs={3} />
                </Grid>
                <Grid>
                  <QRCode
                    value={nodeAddress}
                    level="M"
                    style={{ width: 256 }}
                  />
                </Grid>
                <Grid container>
                  <Grid item xs={3} />
                  <Grid item xs={3} space="3">
                    <IconButton
                      onClick={autoping}
                      color="inherit"
                      aria-label="reload"
                    >
                      <Sync />
                    </IconButton>
                  </Grid>
                  <Grid item xs={6} space={3}>
                    <IconButton
                      onClick={getListNodes}
                      color="inherit"
                      aria-label="reload"
                    >
                      <Add />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>}
        </Grid>
        <NodesTable
          nodes={listNodes}
          ping={ping}
        />
      </Box>
      {alerVisible &&
        <Snackbar
          open={alerVisible}
          autoHideDuration={6000}
          onClose={() => setAlertVisible(false)}
          message={`Main node ${isOnline === true ? "Online" : "Offiline"}`}
        />}
    </Container>
  );
}
