import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import Typography from "@mui/material/Typography";

import UserPanel from "./UserPanel";

const Overview = () => {
  const handleChange = useOutletContext();

  useEffect(() => {
    handleChange(0);
  }, []);

  return (
    <div>
      <Typography variant="h4" color="initial">
        Overview
      </Typography>
      <UserPanel />
    </div>
  );
};

export default Overview;
