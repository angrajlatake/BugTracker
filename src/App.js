import "./App.scss";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { AnimatePresence } from "framer-motion";
import theme from "./Styles/theme";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Overview from "./components/Overview";
import Tasks from "./components/Tasks";
import Settings from "./components/Settings";
import TaskDetails from "./components/TaskDetails";
import TasksTabs from "./components/TasksTabs";
import AdminPanel from "./components/AdminPanel";
function App() {
  const { user, error } = useContext(AuthContext);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackClose = (e) => {
    setSnackMessage("");
    setSnackOpen(false);
  };
  const handleSnackOpen = () => {
    if (error) {
      setSnackOpen(true);
      setSnackMessage(error.message);
    }
  };
  useEffect(() => {
    handleSnackOpen();
  }, [error]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <AnimatePresence>
            <Routes>
              <Route path="login" element={<Login key="comp" />} />
              <Route path="register" element={<SignUp key="comp" />} />

              {/* user */}
              <Route
                exact
                path="/"
                element={
                  user && user._id ? <Home key="comp" /> : <Login key="comp" />
                }
              >
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
                <Route path="tasks" element={<Tasks />}>
                  <Route index element={<TasksTabs />} />
                  <Route path=":id" element={<TaskDetails />} />
                </Route>
                <Route path="settings" element={<Settings />} />
              </Route>
              {user && user.isAdmin && (
                <Route path="project/:id" element={<Home />}>
                  <Route index element={<Overview />} />
                  <Route path="overview" element={<Overview />} />
                  <Route path="tasks" element={<Tasks />}>
                    <Route index element={<TasksTabs />} />
                  </Route>
                </Route>
              )}
            </Routes>
          </AnimatePresence>
        </Router>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={snackOpen}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackMessage}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default App;
