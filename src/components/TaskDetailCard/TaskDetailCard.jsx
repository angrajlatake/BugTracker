import { useContext, useState, useEffect } from "react";
import axios from "axios";

import StepElement from "./StepElement";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import LinearProgress from "@mui/material/LinearProgress";
import EditTaskModal from "../Modal/EditTaskModal";

import { AuthContext } from "../../context/AuthContext";

import { TasksContext } from "../../context/TaskContext";

import { getUser } from "../../api";

const TaskDetailCard = ({ task, reFetch }) => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(TasksContext);

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
  const buttonText = (status) => {
    switch (status) {
      case "pending":
        return "Work on it now";
      case "progress":
        return "Send for review";
      case "review":
        return "Mark as completed";
      case "completed":
        return "Completed";
      default:
        return "info";
    }
  };
  const [openModal, setOpenModal] = useState(false);

  // const { data, loading, error } = useFetch(
  //   task.assignedTo ? `user/${task.assignedTo}` : null
  // );
  const [assignedUser, setAssignedUser] = useState(null);
  const statusList = ["pending", "progress", "review", "completed"];
  const handleStatusChange = (e) => {
    const newStatus = statusList[statusList.indexOf(task.status) + 1];
    const updatedTask = { ...task, status: newStatus };
    axios
      .put(`${process.env.REACT_APP_API_URL}/task/${task._id}`, updatedTask, {
        withCredentials: true,
        credentials: "include",
      })
      .then(function (response) {
        reFetch();
        axios
          .get(`${process.env.REACT_APP_API_URL}/task/user/${user._id}`, {
            withCredentials: true,
            credentials: "include",
          })
          .then((res) => {
            dispatch({ type: "FETCH_TASKS", payload: res.data });
          })
          .catch((err) => console.log(err));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    const fetchUser = async () => {
      if (user.isAdmin && task.assignedTo) {
        try {
          const { data } = await getUser(task.assignedTo);
          setAssignedUser(data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      {task === null ? (
        <LinearProgress />
      ) : (
        <Card sx={{ width: 700, height: 320 }}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              height: "100%",
              width: "100%",
              p: 3,
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                position: "relative",
              }}
            >
              <Typography variant="h5" color="initial">
                {task.title}
              </Typography>
              <Chip
                label={task.status}
                color={chipColor(task.status)}
                variant="outlined"
                sx={{ width: "fit-content" }}
              />
              <Typography
                variant="body1"
                color="initial"
                sx={{ minWidth: "180px" }}
              >
                {task.desc}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  position: "absolute",
                  bottom: 5,
                }}
              >
                <Button
                  variant="contained"
                  disabled={task.status === "completed"}
                  onClick={handleStatusChange}
                >
                  {buttonText(task.status)}
                </Button>

                {user.isAdmin && (
                  <>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => setOpenModal(true)}
                    >
                      <ModeEditRoundedIcon />
                    </Button>

                    {user.isAdmin && assignedUser && (
                      <Avatar alt={assignedUser.name} src={assignedUser.image}>
                        {assignedUser.name.charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                    {openModal && (
                      <EditTaskModal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        task={task}
                        reFetch={reFetch}
                      />
                    )}
                  </>
                )}
              </Box>
            </Box>
            <Box direction="column" sx={{ height: "100%", width: 270 }}>
              <StepElement
                startDate={task.startingDate}
                targetDate={task.targetDate}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TaskDetailCard;
