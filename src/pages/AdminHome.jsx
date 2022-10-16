import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";

import { motion } from "framer-motion";
import { useState, useContext } from "react";

import { Box, Typography, Paper } from "@mui/material";

import theme from "../Styles/theme";
import { Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { ProjectContext } from "../context/ProjectContext";

const AdminHome = () => {
  const [currentView, setCurrentView] = useState(0);
  const handleChange = (newValue) => {
    setCurrentView(newValue);
  };

  const { user } = useContext(AuthContext);
  const { selectedProject } = useContext(ProjectContext);

  return (
    <>
      <Paper
        component={motion.div}
        sx={{
          display: "flex",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <Sidebar handleChange={handleChange} value={currentView} />
        <Box
          component="main"
          sx={{
            mt: 10,
            flex: 1,
            px: 3,
            maxWidth: user.isAdmin ? "none" : 880,
            mx: "auto",
            height: "100%",
          }}
        >
          <Typography variant="h5" color="inherit">
            {selectedProject && selectedProject.title}
          </Typography>
          <Outlet context={handleChange} />
        </Box>
        {!user.isAdmin && <Rightbar />}
      </Paper>
    </>
  );
};

export default AdminHome;
