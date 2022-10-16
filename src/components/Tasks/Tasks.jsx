import { useContext, useEffect, useState } from "react";
import NewTaskModal from "../Modal/NewTaskModal";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

import { Outlet, useOutletContext } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import { TasksContext } from "../../context/TaskContext";
import { getTasksByProject, getAllTasks, getTasksByUser } from "../../api";

export default function Tasks() {
  const { user } = useContext(AuthContext);
  const { selectedProject } = useContext(ProjectContext);
  const { tasks, dispatch } = useContext(TasksContext);

  const handleChange = useOutletContext();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleChange("Tasks");
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      if (user.isAdmin && !tasks) {
        if (selectedProject) {
          const res = await getTasksByProject(selectedProject._id);
          dispatch({ type: "FETCH_TASKS", payload: res.data });
        } else if (!selectedProject) {
          const res = await getAllTasks();
          dispatch({ type: "FETCH_TASKS", payload: res.data });
        } else {
          const { data } = await getTasksByUser(user._id);
          dispatch({ type: "FETCH_TASKS", payload: data });
        }
      }
      setLoading(false);
    };
    fetchTasks();
  }, [selectedProject, tasks, dispatch]);

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" color="inherit">
            Tasks
          </Typography>
          {user.isAdmin && selectedProject && (
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              Create Task
            </Button>
          )}
        </Box>
        {loading ? <LinearProgress /> : <Outlet />}
      </Box>
      {user.isAdmin && openModal && (
        <NewTaskModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
}
