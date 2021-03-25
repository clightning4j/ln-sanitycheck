import { useDeno } from "aleph/react.ts";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu, Sync } from "@material-ui/icons";
import { QRCode } from "react-qr-svg";

import useCounter from "../lib/useCounter.ts";

export default function Home() {
  //const [infoNode, ping, autoping] = useCounter();
  const [alerVisible, setAlertVisible] = useState(false);

  const infoNode = useDeno(async () => {
    return await (await fetch("http://localhost:7000/utility/getinfo")).json();
  }, true);

  const addressNode = infoNode["address"][0];
  let nodeAddress = `${infoNode["id"]}@${addressNode["address"]}:${
    addressNode["port"]
  }`;

  return (
    <Container maxWidth="xl">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={() => setAlertVisible(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">
            {infoNode["alias"]}
          </Typography>
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
          <Card>
            <CardContent>
              <Grid direction="row" justify="center" alignItems="center">
                <QRCode
                  value={nodeAddress}
                  level="M"
                  style={{ width: 256 }}
                />
              </Grid>
              <Grid direction="row" justify="center" alignItems="center">
                <IconButton
                  justify="center"
                  onClick={() => setAlertVisible(true)}
                  color="inherit"
                  aria-label="reload"
                >
                  <Sync />
                </IconButton>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Box>
      {alerVisible &&
        <Snackbar
          open={alerVisible}
          autoHideDuration={6000}
          onClose={() => setAlertVisible(false)}
          message="Main node online"
        />}
    </Container>
  );
}
