import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#ffffff", p: 2, boxShadow: 2 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © 2025 Your Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
