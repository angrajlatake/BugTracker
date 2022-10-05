import React, { useContext, useEffect } from "react";

import UnAssignedList from "./UnAssignedList";
import { BasicTable } from "./BasicTable";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import theme from "../../Styles/theme";

import { ProjectContext } from "../../context/ProjectContext";
import { TasksContext } from "../../context/TaskContext";
import { getAllTasks, getTasksByProject } from "../../api";

const AdminPanel = () => {
  const { projects, selectedProject } = useContext(ProjectContext);
  const { tasks, dispatch: taskDispatch } = useContext(TasksContext);

  useEffect(() => {
    const fetchTasks = async () => {
      if (selectedProject) {
        const res = await getTasksByProject(selectedProject._id);
        taskDispatch({ type: "FETCH_TASKS", payload: res.data });
      } else if (!selectedProject) {
        const res = await getAllTasks();
        taskDispatch({ type: "FETCH_TASKS", payload: res.data });
      }
    };
    fetchTasks();
  }, [selectedProject, taskDispatch]);

  const unassignedTasks =
    tasks && tasks.filter((task) => task.assignedTo === null);
  const overdueTasks =
    tasks && tasks.filter((task) => new Date(task.targetDate) < new Date());

  return (
    <>
      <Typography variant="h4" color="initial">
        Overview
      </Typography>
      <Box sx={{ flexGrow: 1, width: "100%", mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Card
                raised
                sx={{
                  padding: 4,
                  color: theme.palette.primary.light,
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                <Typography variant="h6">Total Projects</Typography>
                <Typography variant="h2">
                  {projects && projects.length !== 0 && projects.length}
                </Typography>
              </Card>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="initial">
                  Unassigned Tasks
                </Typography>
                {tasks && <UnAssignedList unassignedTasks={unassignedTasks} />}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card
                  raised
                  sx={{
                    padding: 4,
                    color: theme.palette.warning.main,
                  }}
                >
                  <Typography variant="h6">Pending</Typography>
                  <Typography variant="h2">
                    {tasks &&
                      tasks.filter((task) => task.status === "pending").length}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card
                  raised
                  sx={{
                    padding: 4,
                    color: theme.palette.success.main,
                  }}
                >
                  <Typography variant="h6">Completed</Typography>
                  <Typography variant="h2">
                    {tasks &&
                      tasks.filter((task) => task.status === "completed")
                        .length}
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={4}>
                <Card
                  raised
                  sx={{
                    padding: 4,
                    color: theme.palette.info.main,
                  }}
                >
                  <Typography variant="h6">In Review</Typography>
                  <Typography variant="h2">
                    {tasks &&
                      tasks.filter((task) => task.status === "review").length}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <BasicTable overdueTasks={overdueTasks} />
          </Grid>
        </Grid>
      </Box>
      )
    </>
  );
};

export default AdminPanel;
