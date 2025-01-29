import Box from "@mui/material/Box";
import { BoxProps } from "@mui/material/Box";
import React from "react";

const FlexBox: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
);

export default FlexBox;