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
        borderRadius: 1,
      }}
    >
      {unassignedTasks.map((item, index) => {
        return (
          <Box key={item._id}>
            {index !== 0 && <Divider component="li" />}
            <ListItem
              alignItems="flex-start"
              onClick={() => navigate(`/tasks/${item._id}`)}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: 18,
                  fontWeight: "medium",
                  letterSpacing: 0,
                  mb: 1,
                }}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ mb: 1 }}
                      variant="body2"
                      color="text.primary"
                    >
                      {item.desc}
                    </Typography>
                    {`Due on ${new Date(item.targetDate).toLocaleDateString(
                      undefined,
                      { year: "numeric", month: "long", day: "numeric" }
                    )}`}
                  </React.Fragment>
                }
                secondaryTypographyProps={{
                  fontSize: 18,
                  fontWeight: "medium",
                  mt: 1,
                }}
              />
            </ListItem>
          </Box>
        );
      })}
    </List>
  );
};

export default UnAssignedList;
