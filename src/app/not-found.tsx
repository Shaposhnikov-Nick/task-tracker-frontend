"use client";
import React, { FC } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";

const NotFound: FC = () => {
  // const navigate = useNavigate();

  const handleGoBack = () => {
    // navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 320,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Страница не найдена
        </Typography>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          onClick={handleGoBack}
        >
          На главную
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;
