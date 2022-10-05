import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import TaskCard from "./Tasks/TaskCard";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";

import { getTasksByUser } from "../api";
import { AuthContext } from "../context/AuthContext";
import { TasksContext } from "../context/TaskContext";

const UserPanel = () => {
  const { user } = useContext(AuthContext);
  const { tasks, dispatch } = useContext(TasksContext);

  useEffect(() => {
    const fetchTasksByUser = async () => {
      const res = await getTasksByUser(user._id);
      dispatch({ type: "FETCH_TASKS", payload: res.data });
    };
    fetchTasksByUser();
  }, [user._id, dispatch]);

  const filteredTasks =
    tasks && tasks.filter((task) => task.status === "progress");
  const pendingTasks =
    tasks && tasks.filter((task) => task.status === "pending");
  return (
    <Box>
      <Stack spacing={2} sx={{ p: 5 }}>
        <Typography variant="h4" color="primary">
          Hi {user.name},
        </Typography>
        <Typography variant="subtitle1" color="initial">
          Welcome to Tasky! Your personal Task Management tool.
        </Typography>
        <Typography
          variant="h5"
          color="initial"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Current Tasks <DoubleArrowRoundedIcon />
        </Typography>
        {tasks && filteredTasks.length > 0 ? (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filteredTasks.map((filteredTask, index) => (
              <Link
                to={`/tasks/${filteredTask._id}`}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <TaskCard
                  title={filteredTask.title}
                  desc={filteredTask.desc}
                  status={filteredTask.status}
                />
              </Link>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="initial">
            None
          </Typography>
        )}
        <Typography
          variant="h5"
          color="initial"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Pending Tasks <DoubleArrowRoundedIcon />
        </Typography>
        {tasks && pendingTasks.length > 0 ? (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {pendingTasks.map((filteredTask, index) => (
              <Link
                to={`/tasks/${filteredTask._id}`}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <TaskCard
                  title={filteredTask.title}
                  desc={filteredTask.desc}
                  status={filteredTask.status}
                />
              </Link>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="initial">
            None
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default UserPanel;
