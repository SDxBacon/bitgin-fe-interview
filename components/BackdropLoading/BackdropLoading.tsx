import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const BackdropLoading = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" size={60} />
    </Backdrop>
  );
};

export default BackdropLoading;
