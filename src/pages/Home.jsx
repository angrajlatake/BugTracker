import { useState } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import theme from "../Styles/theme";

const Home = () => {
  const [value, setValue] = useState(0);
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper
        component={motion.div}
        sx={{
          display: "flex",
          backgroundColor: theme.palette.primary.light,
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <Sidebar handleChange={handleChange} value={value} />
        <Box
          component="main"
          sx={{
            mt: 10,
            flex: 1,
            px: 3,
            // maxWidth: user.isAdmin ? "none" : 880,
            mx: "auto",
            height: "100%",
          }}
        >
          <Outlet context={handleChange} />
        </Box>
        <Rightbar />
      </Paper>
    </>
  );
};

export default Home;
