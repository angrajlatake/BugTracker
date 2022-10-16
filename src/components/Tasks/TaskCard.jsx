import * as React from "react";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import Typography from "@mui/material/Typography";

export default function TaskCard({ title, due, status }) {
  const chipColor = (status) => {
    switch (status) {
      case "pending":
        return "error";
      case "progress":
        return "warning";
      case "review":
        return "primary";
      case "completed":
        return "success";
      default:
        return "info";
    }
  };
  return (
    <Card sx={{ minWidth: 270, maxWidth: 270, height: 170 }} raised>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography component="span" variant="caption" color="inherit">
              Due
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {new Date(due).toLocaleDateString("en-US")}
            </Typography>
          </Box>
          <Chip label={status} color={chipColor(status)} variant="outlined" />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "normal",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            fontSize: 18,
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
