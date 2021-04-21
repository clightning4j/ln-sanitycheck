import React from "react";

import {Grid} from '@material-ui/core'

export default function Loading({ size = 75 }: { size?: number }) {
  return (
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
>

  <Grid item xs={3}>
  <img src="/loading.gif" height={size} title="Loading icon" />
  </Grid>   

</Grid> 
    
  );
}
