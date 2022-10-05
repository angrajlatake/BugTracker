import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const SearchList = ({ searchResults, setQuery }) => {
  const navigate = useNavigate();
  return (
    <>
      {searchResults && (
        <Paper
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "absolute",
            bottom: "200",
          }}
        >
          <List>
            {searchResults.map((result, index) => {
              return (
                <ListItemButton
                  key={index}
                  onClick={() => {
                    navigate(`tasks/${result._id}`);
                    setQuery("");
                  }}
                >
                  <ListItemText
                    primary={result.title}
                    secondary={result.desc}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Paper>
      )}
    </>
  );
};

export default SearchList;
