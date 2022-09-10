import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const SnackError = ({ error }) => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackClose = (e) => {
    setSnackMessage("");
    setSnackOpen(false);
  };
  const handleSnackOpen = () => {
    if (error) {
      setSnackOpen(true);
      setSnackMessage(error.message);
    }
  };
  useEffect(() => {
    handleSnackOpen();
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={snackOpen}
      onClose={handleSnackClose}
    >
      <Alert onClose={handleSnackClose} severity="error" sx={{ width: "100%" }}>
        {snackMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackError;
