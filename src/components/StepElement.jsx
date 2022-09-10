import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PropTypes from "prop-types";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import { styled } from "@mui/material/styles";
import { StepConnector, StepContent } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";

const steps = [
  {
    label: "Start Date",
    description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Due Date",
    date: "An ad group contains one or more ads which target a shared set of keywords.",
  },
];
const StepElement = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const StyledConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.lineVertical}`]: {
      height: "100%",
      width: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
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
        {completed ? (
          <div className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
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
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel StepIconComponent={QontoStepIcon}>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepElement;
