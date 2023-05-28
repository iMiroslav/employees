import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TitleProps {
  children?: React.ReactNode;
  ml?: number;
  mt?: number;
}

export default function Title(props: TitleProps) {
  const { children, ml, mt } = props;
  return (
    <Box sx={{ ml, mt }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {children}
      </Typography>
    </Box>
  );
}
