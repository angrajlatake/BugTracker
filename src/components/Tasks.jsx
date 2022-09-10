import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NewTaskModal from "./Modal/NewTaskModal";

import { Outlet, useOutletContext, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
export default function Tasks() {
  const handleTabs = useOutletContext();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    handleTabs(1);
  }, []);
  const params = useParams();

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" color="initial">
            Tasks
          </Typography>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Create Task
          </Button>
        </Box>
        <Outlet />
      </Box>
      <NewTaskModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
