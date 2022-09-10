import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import Typography from "@mui/material/Typography";

export default function TaskCard({ title, desc, status }) {
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
    <Card sx={{ minWidth: 244, maxWidth: 248, height: 170 }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body" color="initial">
            {title}
          </Typography>
          <Chip label={status} color={chipColor(status)} variant="outlined" />
        </Box>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "normal",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );
}
