import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import theme from "../Styles/theme";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useFetch from "../hooks/useFetch";
import { ProjectContext } from "../context/ProjectContext";
import { TasksContext } from "../context/TaskContext";

const AdminPanel = () => {
  const { projects, setProjects } = useContext(ProjectContext);
  const [tasks, setTasks] = useContext(TasksContext);

  const list = [
    {
      dueDate: "20/2/22",
      taskId: "tx-23",
      taskTitle: "write a function to categorize tasks",
    },
    {
      dueDate: "20/2/22",
      taskId: "tx-23",
      taskTitle: "write a function to categorize tasks",
    },
    {
      dueDate: "20/2/22",
      taskId: "tx-23",
      taskTitle: "write a function to categorize tasks",
    },
    {
      dueDate: "20/2/22",
      taskId: "tx-23",
      taskTitle: "write a function to categorize tasks",
    },
    {
      dueDate: "20/2/22",
      taskId: "tx-23",
      taskTitle: "write a function to categorize tasks",
    },
  ];

  return (
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
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {list.map((item, index) => {
                  return (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={`Due on ${item.dueDate}`}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {item.taskId}
                              </Typography>
                              {item.taskTitle}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </>
                  );
                })}
              </List>
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
                  {tasks.filter((task) => task.status === "pending").length}
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
                  {tasks.filter((task) => task.status === "completed").length}
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
                  {tasks.filter((task) => task.status === "review").length}
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <BasicTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPanel;

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "Frozen yoghurt",
    "202020",
    "202020",
    "this is a test for the task, what if it is longass and it does not fit the sjkldfjslkdfjslkfjaslkjfklsfjlsk fjlask fhslfjh skjhf "
  ),
  createData(
    "Frozen yoghurt",
    "202020",
    "202020",
    "this is a test for the task, what if it is longass and it does not fit the sjkldfjslkdfjslkfjaslkjfklsfjlsk fjlask fhslfjh skjhf "
  ),
  createData(
    "Frozen yoghurt",
    "202020",
    "202020",
    "this is a test for the task, what if it is longass and it does not fit the sjkldfjslkdfjslkfjaslkjfklsfjlsk fjlask fhslfjh skjhf "
  ),
  createData(
    "Frozen yoghurt",
    "202020",
    "202020",
    "this is a test for the task, what if it is longass and it does not fit the sjkldfjslkdfjslkfjaslkjfklsfjlsk fjlask fhslfjh skjhf "
  ),
];

export function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Assigned Date</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Task</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
