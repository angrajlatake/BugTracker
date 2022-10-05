import { Box, Button } from "@mui/material";

import TaskDetailCard from "./TaskDetailCard";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LinearProgress from "@mui/material/LinearProgress";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const TaskDetails = () => {
  const taskId = useParams();
  const navigate = useNavigate();
  const { data, loading, error, reFetch } = useFetch(`task/${taskId.id}`);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", p: 2, gap: 4 }}>
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          sx={{ width: "fit-content" }}
        >
          <ArrowBackIosNewRoundedIcon />
        </Button>

        {loading ? (
          <LinearProgress />
        ) : (
          data.length > 0 && <TaskDetailCard task={data[0]} reFetch={reFetch} />
        )}
      </Box>
    </>
  );
};

export default TaskDetails;
