"use client";
import { FC, JSX, ReactNode } from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ru } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        {children}
      </LocalizationProvider>
    </Box>
  );
};

export default AppProvider;
