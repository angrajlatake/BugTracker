import { useMemo, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PropTypes from "prop-types";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import { styled } from "@mui/material/styles";
import { StepConnector, StepContent, Typography } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";

const StepElement = ({ startDate, targetDate }) => {
  startDate = new Date(startDate);
  targetDate = new Date(targetDate);

  const getTimeUsed = (startDate, targetDate) => {
    const totalDays = parseInt(
      (targetDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000)
    );
    const daysPassed = parseInt(
      (new Date() - startDate.getTime()) / (24 * 3600 * 1000)
    );
    return Math.floor((daysPassed / totalDays) * 100);
  };
  const timeUsed = getTimeUsed(startDate, targetDate);

  const steps = [
    {
      label: "Start Date",
      date: startDate.toDateString(),
    },
    {
      label: "Due Date",
      date: targetDate.toDateString(),
    },
  ];

  const StyledConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.lineVertical}`]: {
      height: "100%",
      width: 10,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 16,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: `linear-gradient( rgb(55, 84, 219) ${timeUsed}%,rgb(246, 248, 253) ${
          timeUsed + 10
        }%,rgb(189, 189, 189))`,
      },
    },
  }));

  const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 30,
    width: 30,
    borderRadius: "50%",
    border: `3px solid ${theme.palette.primary.main}`,
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      color: theme.palette.primary.main,
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {active ? (
          <div className="QontoStepIcon-circle" />
        ) : (
          <div className="QontoStepIcon-completedIcon" />
        )}
      </QontoStepIconRoot>
    );
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };
  return (
    <Stepper
      orientation="vertical"
      sx={{ height: "100%" }}
      connector={<StyledConnector />}
      activeStep={1}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel
            StepIconComponent={QontoStepIcon}
            optional={
              <Typography component="span" variant="subtitle1" color="initial">
                {step.date}
              </Typography>
            }
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepElement;
