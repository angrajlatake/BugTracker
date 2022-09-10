import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TasksPanel from "./TasksPanel";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { TasksContext } from "../context/TaskContext";

const TasksTabs = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useContext(TasksContext);

  const params = useParams();

  return (
    <>
      {!tasks ? (
        <CircularProgress />
      ) : (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All Tasks" value="1" />
              <Tab label="Pending" value="2" />
              <Tab label="In Progress" value="3" />
              <Tab label="In Review" value="4" />
              <Tab label="Completed" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TasksPanel tasks={tasks} />
          </TabPanel>
          <TabPanel value="2">
            <TasksPanel
              tasks={tasks.filter((task) => task.status === "pending")}
            />
          </TabPanel>
          <TabPanel value="3">
            <TasksPanel
              tasks={tasks.filter((task) => task.status === "progress")}
            />
          </TabPanel>
        </TabContext>
      )}
    </>
  );
};

export default TasksTabs;
