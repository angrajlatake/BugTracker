import { useState, useEffect, useContext } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import Switch from "@mui/material/Switch";
import theme from "../Styles/theme";

import { useNavigate, useOutletContext } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import EditUserModal from "./Modal/EditUserModal";
import ProfileModal from "./Modal/ProfileModal";
import SnackSuccess from "./SnackBar/SnackSuccess";

const Settings = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleOpenProfileModal = () => setOpenProfile(true);

  const handleChange = useOutletContext();
  const { user, dispatch } = useContext(AuthContext);
  useEffect(() => {
    handleChange("Settings");
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <>
      <Typography variant="h4" color="inherit">
        Settings
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Stack spacing={3}>
        <Typography variant="body1" color="inherit">
          Accounts Settings
        </Typography>
        <Card>
          <Stack spacing={2} sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                border: "1px solid lightgrey",
                borderRadius: 1,
                px: 2,
                py: 1,
                gap: 2,
              }}
            >
              <PersonRoundedIcon sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="body2" color="inherit">
                  Name
                </Typography>
                <Typography variant="h6" color="inherit">
                  {user.name}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                border: "1px solid lightgrey",
                borderRadius: 1,
                px: 2,
                py: 1,
                gap: 2,
              }}
            >
              <MailRoundedIcon sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="body2" color="inherit">
                  Email
                </Typography>
                <Typography variant="h6" color="inherit">
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                border: "1px solid lightgrey",
                borderRadius: 1,
                px: 2,
                py: 1,
                gap: 2,
              }}
            >
              <KeyRoundedIcon sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="body2" color="inherit">
                  Password
                </Typography>
                <Typography
                  variant="body"
                  sx={{ fontSize: 30, letterSpacing: 3 }}
                  color="inherit"
                >
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="submit" variant="contained" onClick={handleOpen}>
                Edit
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={handleOpenProfileModal}
              >
                Profile
              </Button>
            </Box>
          </Stack>
        </Card>
        <Typography variant="body1" color="inherit">
          Notifications Settings
        </Typography>
        <Card>
          <Stack spacing={2} sx={{ p: 4 }}>
            <Paper
              sx={{
                display: "flex",
                border: "1px solid lightgrey",
                borderRadius: 1,
                px: 2,
                py: 1,
                gap: 2,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" color="inherit">
                Allow Desktop Notification
              </Typography>
              <Switch defaultChecked />
            </Paper>
            <Paper
              sx={{
                display: "flex",
                border: "1px solid lightgrey",
                borderRadius: 1,
                px: 2,
                py: 1,
                gap: 2,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" color="inherit">
                Send critical notifications to my email
              </Typography>
              <Switch defaultChecked />
            </Paper>
          </Stack>
        </Card>
        <Typography variant="body1" color="inherit">
          Accessibility Settings
        </Typography>
        <Card>
          <Stack spacing={2} sx={{ p: 4 }}>
            <Paper
              sx={{
                display: "flex",
                border: "1px solid lightgrey",
                borderRadius: 1,
                px: 2,
                py: 1,
                gap: 2,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" color="inherit">
                Allow Desktop Notification
              </Typography>
              <Switch />
            </Paper>
          </Stack>
        </Card>
      </Stack>
      {snackMessage && (
        <SnackSuccess
          snackMessage={snackMessage}
          openSnack={snackMessage ? true : false}
        />
      )}
      <EditUserModal
        open={open}
        setOpen={setOpen}
        setSnackMessage={setSnackMessage}
      />
      <ProfileModal openModal={openProfile} setOpenModal={setOpenProfile} />
    </>
  );
};

export default Settings;
