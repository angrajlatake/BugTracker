import React, { useContext, useState } from "react";
import Modal from "@mui/material/Modal";

import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";

import { AuthContext } from "../../context/AuthContext";
import { updateUser } from "../../api";

const EditUserModal = ({ open, setOpen, setSnackMessage }) => {
  const { user, dispatch } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateUser(user._id, formData);

      setSnackMessage(data.message);
      setTimeout(() => {
        dispatch({
          type: "UPDATE_USER",
          payload: data.user,
        });
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
          <TextField
            margin="normal"
            required
            fullWidth
            defaultValue={formData.name}
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            defaultValue={formData.email}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            onChange={handleChange}
            autoFocus
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default EditUserModal;
