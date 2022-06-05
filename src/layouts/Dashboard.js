import React, { useState } from "react";
import styled from "styled-components/macro";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { Box, CssBaseline, Paper as MuiPaper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { spacing } from "@mui/system";

import GlobalStyle from "../components/GlobalStyle";
import Navbar from "../components/navbar/Navbar";
import dashboardItems from "../components/sidebar/dashboardItems";
import Sidebar from "../components/sidebar/Sidebar";
import Settings from "../components/Settings";
import UserSidebar from "../components/userSidebar/Sidebar";
import UserDashboardItems from "../components/userSidebar/dashboardItems";
const drawerWidth = 258;
const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;
const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;
const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;
const Paper = styled(MuiPaper)(spacing);
const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;
const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  console.log("user role", user?.role);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
          {user && user?.role && user?.role === "company-admin" ? (
            <UserSidebar
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              items={UserDashboardItems}
            />
          ) : (
            <Sidebar
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              items={dashboardItems}
            />
          )}
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {user && user?.role && user?.role === "company-admin" ? (
            <UserSidebar
              PaperProps={{ style: { width: drawerWidth } }}
              items={UserDashboardItems}
            />
          ) : (
            <Sidebar
              PaperProps={{ style: { width: drawerWidth } }}
              items={dashboardItems}
            />
          )}
        </Box>
      </Drawer>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isLgUp ? 12 : 5}>
          {children}
          <Outlet />
        </MainContent>
      </AppContent>
      {/* <Settings /> */}
    </Root>
  );
};

export default Dashboard;
