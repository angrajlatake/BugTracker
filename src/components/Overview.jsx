import { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AdminPanel from "./AdminPanel";

import Typography from "@mui/material/Typography";
import useFetch from "../hooks/useFetch";
import { TasksContext } from "../context/TaskContext";

const Overview = () => {
  const handleChange = useOutletContext();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    handleChange(0);
  }, []);

  return (
    <div>
      <Typography variant="h4" color="initial">
        Overview
      </Typography>
      {user.isAdmin ? <AdminPanel /> : null}
    </div>
  );
};

export default Overview;
