import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import TaskDetailCard from "./TaskDetailCard";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
const TaskDetails = () => {
  const taskId = useParams();

  const { data, loading, error } = useFetch(`task/${taskId.id}`);
  console.log(data);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2, gap: 4 }}>
      <Link to="/tasks">
        <Button variant="outlined" sx={{ width: "fit-content" }}>
          <ArrowBackIosNewRoundedIcon />
        </Button>
      </Link>
      {loading ? <CircularProgress /> : <TaskDetailCard />}
    </Box>
  );
};

export default TaskDetails;
