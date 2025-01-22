import { Box, Button } from "@mui/material";
import { JSX } from "react";

const MainMenu = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 240,
        bgcolor: "#ffffff",
        boxShadow: 2,
        p: 2,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Button variant="contained" color="primary" fullWidth>
          3:20:00
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {["Time tracker", "Boards", "Projects", "Analytics", "Settings"].map(
          (item, index) => (
            <Button
              key={index}
              variant="text"
              sx={{
                justifyContent: "flex-start",
                color: index === 1 ? "primary.main" : "text.secondary",
                fontWeight: index === 1 ? "bold" : "normal",
              }}
            >
              {item}
            </Button>
          ),
        )}
      </Box>
    </Box>
  );
};

export default MainMenu;
