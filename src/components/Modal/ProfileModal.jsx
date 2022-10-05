import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import placeholder from "../../images/placeholder.png";
// web.cjs is required for IE11 support
import { useSpring, animated } from "@react-spring/web";
import ImageCropper from "./ImageCropper";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { dataURLtoFile } from "../../utils/dataURLtoFile";

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
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 2,
};

const ProfileModal = ({ openModal, setOpenModal }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [image, setImage] = useState(placeholder);
  const [openCropper, setOpenCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const formData = new FormData();

  const handleImageSelected = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setOpenCropper(true);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleClose = () => setOpenModal(false);
  const handleUpload = () => {
    const canvasDataURL = croppedImage.toDataURL("image/jpeg");
    const convertedFile = dataURLtoFile(canvasDataURL, "image.jpeg");
    formData.append("image", convertedFile);
    axios
      .post(`${process.env.REACT_APP_API_URL}/profile/${user._id}`, formData, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        console.log(res.data);
        console.log(res);
        dispatch({
          type: "UPDATE_USER",
          payload: res.data.user,
        });
        handleClose();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Upload your Profile Picture
            </Typography>

            <Box
              sx={{
                backgroundImage: `url(${
                  (croppedImage &&
                    croppedImage.toBlob((file) => {
                      URL.createObjectURL(file);
                    }, "image/jpeg")) ||
                  image
                })`,
                height: 300,
                borderRadius: 2,
                position: "relative",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <Button
                component="label"
                variant="outlined"
                color="info"
                size="large"
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translate(-50%,0%)",
                  width: "200px",
                }}
              >
                Tap to change
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageSelected}
                />
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ width: "100%" }}
                onClick={handleUpload}
              >
                Upload Picture
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <ImageCropper
        openCropper={openCropper}
        setOpenCropper={setOpenCropper}
        image={image}
        setImage={setImage}
        setCroppedImage={setCroppedImage}
      />
    </>
  );
};

export default ProfileModal;
