import { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import AddSharpIcon from "@mui/icons-material/AddSharp";

import Avatar from "@mui/material/Avatar";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import NewProjectModal from "./Modal/NewProjectModal";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";
import { getProjects, getTasksByProject } from "../api/index";
import { TasksContext } from "../context/TaskContext";

const drawerWidth2 = 240;

const openedMixin = (theme) => ({
  width: drawerWidth2,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth2,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ProjectDrawer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { projects, selectedProject, dispatch } = useContext(ProjectContext);
  const { dispatch: taskDispatch } = useContext(TasksContext);
  useEffect(() => {
    const fetchProjects = async () => {
      if (!projects) {
        const { data } = await getProjects();
        dispatch({ type: "FETCH_PROJECTS", payload: data });
      }
    };
    fetchProjects();
  }, []);

  const handleProjectSelect = async (item) => {
    const res = await getTasksByProject(item._id);
    taskDispatch({ type: "FETCH_TASKS", payload: res.data });
    dispatch({ type: "SELECT_PROJECT", payload: item });
    navigate(`/project/${item._id}`);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.light,
          }}
        >
          <List>
            <ListItem
              sx={{
                width: "100%",
              }}
              disablePadding
              selected
            >
              <ListItemButton
                sx={{
                  width: "100%",
                  py: 3,
                }}
                onClick={() => setOpenModal(true)}
              >
                <ListItemIcon>
                  <AddSharpIcon fontSize="large" color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Add new project" />
              </ListItemButton>
            </ListItem>
            {projects &&
              projects.map((item, index) => (
                <ListItem
                  key={item.title}
                  sx={{
                    width: "100%",
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.info.main,
                    },
                  }}
                  disablePadding
                  selected={
                    selectedProject && item.title === selectedProject.title
                  }
                >
                  <ListItemButton
                    sx={{
                      width: "100%",
                      py: 3,
                    }}
                    onClick={() => {
                      handleProjectSelect(item);
                    }}
                  >
                    <ListItemIcon>
                      <Avatar
                        variant="square"
                        sx={{ borderRadius: 1, height: 30, width: 30 }}
                      >{`${item.title.split("")[0][0]}`}</Avatar>
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>
      )
      {openModal && (
        <NewProjectModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
}
