import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Overview from "./components/Overview";
import Tasks from "./components/Tasks/Tasks";
import Settings from "./components/Settings";
import TaskDetails from "./components/TaskDetailCard/TaskDetails";
import TasksTabs from "./components/Tasks/TasksTabs";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AdminHome from "./pages/AdminHome";
import NotFound from "./components/NotFound";
import SnackError from "./components/SnackBar/SnackError";

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

  const UserRoutes = ({ children }) => {
    return user && !user.isAdmin ? <Outlet /> : <Navigate to="login" />;
  };
  const AdminRoutes = ({ children }) => {
    return user && user.isAdmin ? <Outlet /> : <Navigate to="login" />;
  };

  return (
    <div className="App">
      <Router>
        <AnimatePresence>
          <Routes>
            <Route path="login" element={<Login key="comp" />} />
            <Route path="register" element={<SignUp key="comp" />} />
            {user && user.isAdmin && (
              <Route element={<AdminRoutes />}>
                <Route path="/" exact element={<AdminHome />}>
                  <Route index element={<AdminPanel />} />
                  <Route path="overview" element={<AdminPanel />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="tasks" element={<Tasks />}>
                    <Route index element={<TasksTabs />} />
                    <Route path=":id" element={<TaskDetails />} />
                  </Route>
                </Route>
                <Route path="project/:id" element={<AdminHome />}>
                  <Route index element={<AdminPanel />} />
                  <Route path="overview" element={<AdminPanel />} />
                  <Route path="tasks" element={<Tasks />}>
                    <Route index element={<TasksTabs />} />
                  </Route>
                </Route>
              </Route>
            )}
            <Route element={<UserRoutes />}>
              <Route path="/" exact element={<Home />}>
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
                <Route path="tasks" element={<Tasks />}>
                  <Route index element={<TasksTabs />} />
                  <Route path=":id" element={<TaskDetails />} />
                </Route>
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
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
      <SnackError />
    </div>
  );
}

export default App;
