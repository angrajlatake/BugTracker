import { useContext, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, Box, Toolbar, Slide, Tabs, Tab } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import ProjectDrawer from "./ProjectsDrawer";
import { AuthContext } from "../context/AuthContext";

const drawerWidth = 240;

const Sidebar = ({ handleChange, value }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
          {user.isAdmin && <ProjectDrawer />}
          <Box
            sx={{
              overflow: "auto",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <List sx={{ width: "100%" }}>
              {[
                { icon: <AutoAwesomeMotionRoundedIcon />, title: "Overview" },
                { icon: <PlaylistAddRoundedIcon />, title: "Tasks" },
                { icon: <SettingsRoundedIcon />, title: "Settings" },
              ].map((item, index) => (
                <ListItem
                  key={item.title}
                  sx={{
                    width: "100%",
                  }}
                  disablePadding
                  selected={index === value}
                  onClick={() => {
                    navigate(`${item.title.toLowerCase()}`);
                  }}
                >
                  <ListItemButton
                    sx={{
                      width: "100%",
                      py: 3,
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
