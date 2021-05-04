import React, { useEffect, useState } from "react";
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
import Offline from "../components/Offline.tsx"

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

  if (render) {
    return null;
  }
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
            label={addressesNode === "" ? "Offline" : "Online"}
            style={{ background: addressesNode === "" ? "#f78c6c" : "#009688" }}
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
          {addressesNode === "" && <Offline />}
          {addressesNode !== "" &&
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
                      onClick={
                        autoping
                      }
                      disabled={addressesNode === ""}
                      color="inherit"
                      aria-label="reload"
                    >
                      <Sync />
                    </IconButton>
                  </Grid>
                  <Grid item xs={6} space={3}>
                    <IconButton
                      onClick={() => {
                        setLoading(true);
                        getListNodes();
                      }}
                      disabled={addressesNode === ""}
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
        {addressesNode !== ""&& <NodesTable
          channels={listChannels}
          nodes={listNodes}
          ping={ping}
          isLoading={loading}
          endLoading={setLoading}
          comunicate={setAlertVisible}
        />}
        
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={alerVisible["visible"]}
        autoHideDuration={6000}
        onClose={() => setAlertVisible({"visible": false, "message": ""})}
        message={alerVisible["message"]}
      />
    </Container>
  );
}
