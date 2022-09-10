import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Card,
  Box,
  Typography,
  CardContent,
  Avatar,
  Button,
  Drawer,
} from "@mui/material";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "../App.scss";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Rightbar = () => {
  const [date, setDate] = useState(new Date());
  const { user, loading, error, dispatch } = useContext(AuthContext);
  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Card
        sx={{
          mt: 10,
          mr: 1.5,
          maxWidth: 260,
          height: "85vh",
        }}
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
          <Typography variant="h6" color="initial">
            {user.username}
          </Typography>
          <Typography variant="subtitle1" color="initial">
            {user.email}
          </Typography>
          <Button variant="contained">My profile</Button>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            sx={{ width: 200 }}
          >
            <CalendarPicker
              id="calender"
              date={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
            />
          </LocalizationProvider>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Rightbar;
