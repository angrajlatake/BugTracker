import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import CloseIcon from "@mui/icons-material/Close";
import { createToDo, deleteToDo, getToDo, updateToDo } from "../api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Todo = () => {
  const { user } = useContext(AuthContext);
  const [todo, setTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({
    todo: "",
  });
  useEffect(() => {
    const fetchTodo = async (user) => {
      const { data } = await getToDo(user._id);

      setTodo(data);
    };
    fetchTodo(user);
  }, []);

  const handleChange = (e) => {
    setNewTodo({ todo: e.target.value });
  };

  const handleToggle = async (id, checked) => {
    const { data } = await updateToDo(id, { checked: !checked });
    setTodo(data);
  };

  const handleAdd = async (e) => {
    const { data } = await createToDo(user._id, newTodo);
    setTodo(data);
    setNewTodo({
      todo: "",
    });
  };
  const handleDelete = async (id) => {
    const { data } = await deleteToDo(id);
    setTodo(data);
  };
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {todo &&
          todo.map((value, index) => {
            return (
              <ListItem
                key={value._id}
                disablePadding
                secondaryAction={
                  value.checked && (
                    <IconButton
                      edge="end"
                      onClick={() => handleDelete(value._id)}
                      aria-label="delete"
                    >
                      <CloseIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => handleToggle(value._id, value.checked)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.checked}
                      disableRipple
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<RadioButtonCheckedIcon />}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={value.todo}
                    primary={value.todo}
                    sx={{
                      textDecoration: value.checked ? "line-through" : "none",
                    }}
                  />
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
          size="small"
          id="todo"
          name="todo"
          placeholder="New To do"
          value={newTodo.todo}
          sx={{ width: "100%" }}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
              e.preventDefault();
            }
          }}
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
