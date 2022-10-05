import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { TasksContext } from "../context/TaskContext";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Paper,
  InputBase,
} from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";

import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";
import StyledSwitch from "./Switch";

import { ThemeContext } from "../context/ThemeContext";
import SearchList from "./SearchList";

const Navbar = () => {
  const { mode, toggleMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const { tasks } = useContext(TasksContext);
  const { dispatch: projectDispatch } = useContext(ProjectContext);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [query, setQuery] = useState("");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    setAnchorElUser(null);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const searchResults = (data) => {
    const keys = ["title", "desc", "status"];

    if (query.length > 2) {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(query))
      );
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              projectDispatch({ type: "SELECT_PROJECT", payload: null });
              navigate("/");
            }}
          >
            <AddSharpIcon fontSize="large" />
            <Typography variant="h4">Tasky</Typography>
          </Box>
          <Box sx={{ position: "relative" }}>
            <Paper
              component="form"
              sx={{
                p: "0 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                position: "relative",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "Search" }}
                value={query}
                onChange={(e) => {
                  setQuery((prevQuery) => {
                    return e.target.value;
                  });
                }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <SearchList
              searchResults={searchResults(tasks)}
              setQuery={setQuery}
            />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <StyledSwitch onChange={toggleMode} checked={mode === "dark"} />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.name} src={user.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/settings");
                }}
              >
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
