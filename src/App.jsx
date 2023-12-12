import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import layouts from "./assets/routes";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Logs from "./pages/logs";
import Security from "./pages/security";
import ActivityLog from "./pages/activeUser";
import { io } from "socket.io-client";
import axios from "axios";

function App() {
  const [usersData, setUsersData] = useState("");
  const server = import.meta.env.VITE_ACTUAL_SERVER_API;
  const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  const socket = io(server, connectionOptions);
  socket.emit("join_room", {});
  const data = {
    first: 0,
    email: "test",
    password: "da",
    action: "LOGGED_IN",
  };
  socket.emit("track_action", data);

  useEffect(() => {
    if (localStorage.getItem("flag") == 1) {
      axios.defaults.baseURL = import.meta.env.VITE_HONEYPOT_SERVER_API;
    } else {
      axios.defaults.baseURL = import.meta.env.VITE_ACTUAL_SERVER_API;
    }
    axios
      .get("api/v1/user/cms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessKeyToken")}`,
        },
      })
      .then((response) => {
        setUsersData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" Component={Register} />
          {!localStorage.getItem("accessKeyToken") ? (
            <Route path="/" Component={Login} />
          ) : (
            <Route path="/" element={<Layout socket={socket} />}>
              <Route
                index
                element={<Dashboard socket={socket} data={usersData} />}
              />
              <Route
                path="/users_log"
                element={<Logs socket={socket} data={usersData} />}
              />
              <Route
                path="/activity_log"
                element={<ActivityLog socket={socket} data={usersData} />}
              />
              <Route
                path="/security"
                element={<Security socket={socket} data={usersData} />}
              />
            </Route>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
