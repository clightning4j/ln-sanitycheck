import React from "react";

import { Grid, Typography } from "@material-ui/core";

export default function Offline({ size = 90 }: { size?: number }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={3}>
         <Typography variant="h6" style={{ flex: 1 }}>
           The node is offline for the moment. I'm sorry
        </Typography>
      </Grid>
    </Grid>
  );
}
