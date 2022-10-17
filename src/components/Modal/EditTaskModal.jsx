import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import add from "date-fns/add";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import SnackError from "../SnackBar/SnackError";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditTaskModal = ({ openModal, setOpenModal, task, reFetch }) => {
  const params = useParams();

  const { data, error } = useFetch(`user`);
  const [formData, setFormData] = useState({
    title: task.title,
    desc: task.desc,
    startDate: new Date(task.startingDate),
    targetDate: task.targetDate || add(new Date(), { months: 1 }),
    assignedTo: data && task.assignedTo,
  });
  const [postLoading, setPostLoading] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleStartChange = (newValue) => {
    setFormData((prev) => ({ ...prev, startDate: newValue }));
  };
  const handleTargetChange = (newValue) => {
    setFormData((prev) => ({ ...prev, targetDate: newValue }));
  };
  const handleSelectChange = (event) => {
    setFormData((prev) => ({ ...prev, assignedTo: event.target.value }));
  };
  const handleClose = () => setOpenModal(false);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setPostLoading(true);

    axios
      .put(`${process.env.REACT_APP_API_URL}/task/${params.id}`, formData, {
        withCredentials: true,
        credentials: "include",
      })
      .then(function (response) {
        setPostLoading(false);
        handleClose();
        reFetch();
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <>
      {data && (
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                initial="hidden"
                animate="show"
                onSubmit={handleCreateProject}
              >
                <Stack spacing={3}>
                  <Typography variant="subtitle1" color="text.primary">
                    Edit Task
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    value={task.title}
                    autoComplete="title"
                    onChange={handleChange}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="desc"
                    label="Description"
                    name="desc"
                    value={task.desc}
                    autoComplete="desc"
                    onChange={handleChange}
                    autoFocus
                    multiline
                  />

                  <Stack direction="row" spacing={2}>
                    <MobileDatePicker
                      label="Start Date"
                      inputFormat="MM/dd/yyyy"
                      value={formData.startDate}
                      onChange={handleStartChange}
                      renderInput={(params) => (
                        <TextField {...params} id="startDate" />
                      )}
                    />
                    <MobileDatePicker
                      label="Target Date"
                      value={formData.targetDate}
                      onChange={handleTargetChange}
                      inputFormat="MM/dd/yyyy"
                      renderInput={(params) => (
                        <TextField {...params} id="targetDate" />
                      )}
                    />
                  </Stack>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Assigned To
                    </InputLabel>

                    {data && (
                      <Select
                        labelId="demo-simple-select-label"
                        id="assignedTo"
                        value={formData.assignedTo}
                        label="Assigned To"
                        onChange={handleSelectChange}
                      >
                        {data &&
                          data.map((item) => (
                            <MenuItem value={item._id} key={item._id}>
                              <Grid
                                container
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                              >
                                <Grid item>
                                  <Avatar alt={item.name} src={item.image} />
                                </Grid>
                                <Grid item>
                                  <Stack>
                                    <Typography
                                      variant="subtitle1"
                                      color="inherit"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography variant="body" color="inherit">
                                      {item.email}
                                    </Typography>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  </FormControl>
                </Stack>
                <Box sx={{ position: "relative" }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={postLoading}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update Task
                  </Button>
                  {postLoading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        mt: "-7px",
                      }}
                    />
                  )}
                </Box>
              </Box>
            </LocalizationProvider>
          </Box>
        </Modal>
      )}
      {error && <SnackError error={error.response.data} />}
    </>
  );
};

export default EditTaskModal;
