import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

const Todo = () => {
  const [todo, setTodo] = useState([
    { item: "List item1", checked: true },
    { item: "List item2", checked: false },
    { item: "List item3", checked: false },
    { item: "List item3", checked: false },
  ]);
  const [newTodo, setNewTodo] = useState(null);
  const handleToggle = (value) => () => {
    setTodo([...todo, { item: value.item, checked: true }]);
  };
  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setTodo([...todo, { item: newTodo, checked: false }]);
  };
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {todo.map((value) => {
          return (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.checked}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText id={value.item} primary={value.item} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box
        component="form"
        sx={{ display: "flex", width: "100%", alignItems: "center" }}
      >
        <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          sx={{ width: "100%" }}
          onChange={handleChange}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={handleAdd}
        >
          <ControlPointRoundedIcon fontSize="large" />
        </IconButton>
      </Box>
    </>
  );
};

export default Todo;
