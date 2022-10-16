import React, { useEffect } from "react";
import oops from "../images/oops.webp";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} sx={{ width: "100vw", height: "100vh" }}>
        <Grid item xs={8} sx={{ width: "100", height: "100%" }}>
          <Box
            sx={{
              backgroundImage: `url(${oops})`,
              width: "100%",
              height: "100%",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></Box>
        </Grid>
        <Grid item xs={4} sx={{ width: "100%", height: "100%" }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            sx={{ width: "100%", height: "100%" }}
          >
            <Typography variant="h2" color="error" sx={{ fontWeight: "bold" }}>
              404
            </Typography>
            <Typography variant="h3" color="inherit">
              Ooops! You weren't
            </Typography>
            <Typography variant="h3" color="inherit">
              suppose to see this
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Redirecting now...
            </Typography>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotFound;
