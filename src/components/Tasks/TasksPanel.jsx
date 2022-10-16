import React from "react";
import TaskCard from "./TaskCard";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
const TasksPanel = ({ tasks }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      {tasks.map((task, index) => {
        return (
          <Link
            to={`/tasks/${task._id}`}
            style={{ textDecoration: "none" }}
            key={task._id}
          >
            <TaskCard
              title={task.title}
              due={task.targetDate}
              status={task.status}
            />
          </Link>
        );
      })}
    </Box>
  );
};

export default TasksPanel;
