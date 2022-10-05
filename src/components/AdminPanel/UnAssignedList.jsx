import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

const UnAssignedList = ({ unassignedTasks }) => {
  const navigate = useNavigate();
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {unassignedTasks.map((item, index) => {
        return (
          <Box key={index}>
            <ListItem
              alignItems="flex-start"
              onClick={() => navigate(`/tasks/${item._id}`)}
            >
              <ListItemText
                primary={`Due on ${new Date(item.targetDate).toLocaleDateString(
                  undefined,
                  { year: "numeric", month: "long", day: "numeric" }
                )}`}
                secondary={
                  <React.Fragment>
                    <Typography variant="body2" color="text.primary">
                      {item.title}
                    </Typography>
                    {item.desc}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
          </Box>
        );
      })}
    </List>
  );
};

export default UnAssignedList;
