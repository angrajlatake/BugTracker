import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Card,
  Box,
  Typography,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";

import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "../App.scss";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Todo from "./Todo";
import ProfileModal from "./Modal/ProfileModal";
const Rightbar = () => {
  const [date, setDate] = useState(new Date());
  const [calenderSelected, setCalenderSelected] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);

  const { user } = useContext(AuthContext);
  return (
    <>
      <Box sx={{ height: "100vh", position: "relative" }}>
        <Card
          sx={{
            mt: 10,
            mr: 1.5,
            width: 320,
            height: "85vh",
          }}
          raised
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Avatar
              alt={user.username}
              src={user.image}
              sx={{
                width: 56,
                height: 56,
                borderRadius: 1,
                //   backgroundColor: "black",
              }}
              variant="square"
            />
            <Typography variant="h6" color="inherit">
              {user.username}
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              {user.email}
            </Typography>
            <Button
              variant="contained"
              onClick={handleOpenModal}
              sx={{ mb: 1 }}
            >
              My profile
            </Button>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              sx={{ mb: 1 }}
            >
              <Button onClick={() => setCalenderSelected(true)}>
                Calender
              </Button>
              <Button onClick={() => setCalenderSelected(false)}>
                Todo List
              </Button>
            </ButtonGroup>
            {calenderSelected && (
              <Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <CalendarPicker
                    id="calender"
                    date={date}
                    onChange={(newDate) => {
                      setDate(newDate);
                    }}
                  />
                </LocalizationProvider>
              </Box>
            )}
            {!calenderSelected && <Todo />}
          </CardContent>
        </Card>
      </Box>
      <ProfileModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Rightbar;
