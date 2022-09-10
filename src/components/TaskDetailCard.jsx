import React from "react";
import StepElement from "./StepElement";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

const TaskDetailCard = () => {
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
    <Card sx={{ width: 700, height: 320 }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          height: "100%",
          p: 3,
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "relative",
          }}
        >
          <Typography variant="h5" color="initial">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </Typography>
          <Chip
            label="pending"
            color="warning"
            variant="outlined"
            sx={{ width: "fit-content" }}
          />
          <Typography variant="body1" color="initial">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
            reprehenderit doloribus quaerat dolore error repudiandae voluptas
            voluptate, velit autem illo laborum quo. Vero, similique
            accusantium.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              position: "absolute",
              bottom: 5,
            }}
          >
            <Button variant="contained">Work on it now</Button>
            <Button variant="outlined" color="warning">
              <ReviewsIcon />
            </Button>
            <Button variant="outlined" color="success">
              <ModeEditRoundedIcon />
            </Button>
          </Box>
        </Box>
        <Box direction="column" sx={{ height: "100%", width: 270 }}>
          <StepElement />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskDetailCard;
