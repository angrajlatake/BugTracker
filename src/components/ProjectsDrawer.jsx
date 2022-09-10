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
import CircularProgress from "@mui/material/CircularProgress";

import useFetch from "../hooks/useFetch";
import SnackError from "./SnackError";
import NewProjectModal from "./Modal/NewProjectModal";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";
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
  const { projects, setProjects, selectedProject, setSelectedProject } =
    useContext(ProjectContext);
  const params = useParams();
  const { data, loading, error, reFetch } = useFetch(`projects`);
  useEffect(() => {
    reFetch();
    setProjects(data);
  }, [openModal]);

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
            {loading ? (
              <CircularProgress />
            ) : (
              projects.map((item, index) => (
                <ListItem
                  key={item.title}
                  sx={{
                    width: "100%",
                  }}
                  disablePadding
                >
                  <ListItemButton
                    sx={{
                      width: "100%",
                      py: 3,
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.info.main,
                      },
                    }}
                    selected={item.title === selectedProject}
                    onClick={() => {
                      setSelectedProject(item.title);
                      navigate(`/project/${item._id}`);
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
              ))
            )}
          </List>
        </Box>
      </Drawer>
      {error && <SnackError error={error.response.data} />}
      <NewProjectModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
