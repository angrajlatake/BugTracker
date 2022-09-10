import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";

import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import StyledSwitch from "./Switch";
import theme from "../Styles/theme";
import BootstrapInput from "./BootstrapInput";
import { useOutletContext } from "react-router-dom";

const Settings = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabs = useOutletContext();

  useEffect(() => {
    handleTabs(2);
  }, []);
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
                  Rami Sharp
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
                  test@test.com
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
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" onClick={handleOpen}>
                Edit
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          noValidate
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <FormControl variant="standard" fullWidth sx={{ width: "100%" }}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Name
            </InputLabel>
            <BootstrapInput defaultValue="Remi Sharp" id="bootstrap-input" />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ width: "100%" }}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Email
            </InputLabel>
            <BootstrapInput defaultValue="test@test.com" id="bootstrap-input" />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ width: "100%" }}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Password
            </InputLabel>
            <BootstrapInput defaultValue="•••••••" id="bootstrap-input" />
          </FormControl>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Settings;
