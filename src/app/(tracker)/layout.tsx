import React from "react";
import { Box } from "@mui/material";
import MainMenu from "@/components/MainMenu";
import AppProvider from "@/components/AppProvider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Task tracker",
  description: "Task tracker",
};

export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#f9f9fc",
      }}
    >
      {/* Верхний контент */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Левое меню */}
        <MainMenu />

        {/* Контент */}
        <AppProvider>{children}</AppProvider>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
