import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";

import { motion } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Box, Typography } from "@mui/material";

import theme from "../Styles/theme";
import { Outlet, useLocation, useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import {
  ProjectContext,
  ProjectContextProvider,
} from "../context/ProjectContext";
import { TasksContext, TasksContextProvider } from "../context/TaskContext";
import { set } from "date-fns/esm";

const Home = () => {
  const [value, setValue] = useState(0);
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const { user } = useContext(AuthContext);
  const params = useParams();
  const location = useLocation();
  const [tasks, setTasks] = useContext(TasksContext);
  const { projects, setProjects, selectedProject } = useContext(ProjectContext);

  const { data: tasksData, reFetch: reFetchTasks } = useFetch(
    `task/${params.id ? `byproject/${params.id}` : ""}`
  );

  setTasks(tasksData);
  const { data: projectsData, reFetch: reFetchProjects } = useFetch(`projects`);
  setProjects(projectsData);

  useEffect(() => {
    reFetchTasks();
    setTasks(tasksData);
    reFetchProjects();
    setProjects(projectsData);
  }, [location]);

  return (
    <>
      {tasks && projects && (
        <Box
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
              maxWidth: user.isAdmin ? "none" : 880,
              mx: "auto",
              height: "100%",
            }}
          >
            {" "}
            <Typography variant="h5" color="initial">
              {selectedProject}
            </Typography>
            <Outlet context={handleChange} />
          </Box>
          {!user.isAdmin && <Rightbar />}
        </Box>
      )}
    </>
  );
};

export default Home;
