import React from "react";
import { Typography } from "@mui/material";

const Main = ({ userName }) => (
  <>
    <Typography variant="h4" gutterBottom>
      Welcome back, {userName}
    </Typography>
    <Typography variant="h5">
      Welcome to your dashboard!
    </Typography>
  </>
);

export default Main;
