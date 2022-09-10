import React from "react";
import TaskCard from "./TaskCard";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
const TasksPanel = ({ tasks }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {tasks.map((task, index) => {
        return (
          <Link
            to={`/Tasks/${task._id}`}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <TaskCard
              title={task.title}
              desc={task.desc}
              status={task.status}
            />
          </Link>
        );
      })}
    </Box>
  );
};

export default TasksPanel;
