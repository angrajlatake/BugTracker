import React, { useState } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Slider } from "@mui/material";

// web.cjs is required for IE11 support
import { useSpring, animated } from "@react-spring/web";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const ImageCropper = ({
  openCropper,
  setOpenCropper,
  image,
  setImage,
  setCroppedImage,
}) => {
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (cropAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleCompleteBtn = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedArea, 0);
      setCroppedImage(croppedImage);

      handleClose();
    } catch (e) {
      console.error(e);
    }
  };
  const handleClose = () => setOpenCropper(false);
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={openCropper}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openCropper}>
        <Box sx={style}>
          <Box sx={{ position: "relative", height: "85%" }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
            sx={{ width: "100%", flexGrow: 1 }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography id="input-slider" gutterBottom>
                Zoom
              </Typography>
              <Slider
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
                step={0.1}
                min={1}
                max={3}
              />
            </Box>
            <Button
              sx={{ width: "50%" }}
              variant="contained"
              color="primary"
              onClick={handleCompleteBtn}
            >
              Set Image
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ImageCropper;
