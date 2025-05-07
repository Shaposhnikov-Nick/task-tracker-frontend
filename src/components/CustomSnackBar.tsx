import React, { FC } from "react";
import { Alert, Button, Snackbar } from "@mui/material";

interface TProps {
  message: string | null;
  isError: boolean;
  open: boolean;
  handleClose: () => void;
}

const CustomSnackBar: FC<TProps> = ({
  message,
  isError,
  open,
  handleClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={8000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={isError ? "error" : "success"}
        sx={{ width: "100%" }}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={handleClose}
            sx={{ border: "2px solid black" }}
          >
            ОК
          </Button>
        }
      >
        {message && message.toString()}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
