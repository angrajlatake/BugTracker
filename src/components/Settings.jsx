import { useState, useEffect, useContext } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
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

const Settings = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [openProfile, setOpenProfile] = useState(false);

  const handleOpenProfileModal = () => setOpenProfile(true);

  const handleTabs = useOutletContext();
  const { user, dispatch } = useContext(AuthContext);
  useEffect(() => {
    handleTabs(2);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <>
      <Typography variant="h4" color="initial">
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
        <Typography variant="body1" color="initial">
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
                <Typography variant="body2" color="initial">
                  Name
                </Typography>
                <Typography variant="h6" color="initial">
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
                <Typography variant="body2" color="initial">
                  Email
                </Typography>
                <Typography variant="h6" color="initial">
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
                <Typography variant="body2" color="initial">
                  Password
                </Typography>
                <Typography
                  variant="body"
                  sx={{ fontSize: 30, letterSpacing: 3 }}
                  color="initial"
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
        <Typography variant="body1" color="initial">
          Notifications Settings
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
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <Typography variant="subtitle1" color="initial">
                Allow Desktop Notification
              </Typography>
              <Switch defaultChecked />
            </Box>
            <Box
              sx={{
                display: "flex",
                border: "1px solid lightgrey",
                borderRadius: 1,
                px: 2,
                py: 1,
                gap: 2,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <Typography variant="subtitle1" color="initial">
                Send critical notifications to my email
              </Typography>
              <Switch defaultChecked />
            </Box>
          </Stack>
        </Card>
        <Typography variant="body1" color="initial">
          Accessibility Settings
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
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <Typography variant="subtitle1" color="initial">
                Allow Desktop Notification
              </Typography>
              <Switch />
            </Box>
          </Stack>
        </Card>
      </Stack>
      <EditUserModal open={open} setOpen={setOpen} />
      <ProfileModal openModal={openProfile} setOpenModal={setOpenProfile} />
    </>
  );
};

export default Settings;
