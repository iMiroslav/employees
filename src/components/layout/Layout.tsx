import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "../../components/layout/AppBar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <Container maxWidth="xl">
      <AppBar />
      <Box sx={{ ml: 3, mt: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          SNA UI New Hire Test
        </Typography>
        {props.children}
      </Box>
    </Container>
  );
};

export default Layout;
