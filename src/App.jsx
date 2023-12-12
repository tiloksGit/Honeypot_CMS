import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Logs from "./pages/logs";
import Security from "./pages/security";
import ActivityLog from "./pages/activeUser";
import Navigation from "./components/navigation";
import { io } from "socket.io-client";
import axios from "axios";

const server = import.meta.env.VITE_ACTUAL_SERVER_API;
const socket = io(server);

const App = () => {
  const [usersData, setUsersData] = useState("");

  useEffect(() => {
    socket.emit("join_room", {});

    const data = {
      first: 0,
      email: "test",
      password: "da",
      action: "LOGGED_IN",
    };
    socket.emit("track_action", data);
    console.log("laura");
  }, []);

  // console.log(socket.connected);
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
  }, [usersData]);

  return (
    <>
      <Router>
        <div className="flex">
          <ToastContainer />
          <div className="w-96 p-2 bg-navigation h-screen text-white">
            <Navigation />
            <button
              onClick={() => logout()}
              className="relative bottom-[-40rem] w-full text-red list-none text-left text-lg p-3 hover:bg-navigation1"
            >
              logout
            </button>
          </div>
          <div className="w-full text-red p-2">
            <Routes>
              <Route path="/register" Component={Register} />
              {!localStorage.getItem("accessKeyToken") ? (
                <Route path="/" Component={Login} />
              ) : (
                <>
                  <Route
                    index
                    element={<Dashboard socket={socket} data={usersData} />}
                  />
                  <Route
                    path="/users_log"
                    element={<Logs socket={socket} data={usersData} />}
                  />
                  {localStorage.getItem("flag") ? (
                    ""
                  ) : (
                    <Route
                      path="/activity_log"
                      element={<ActivityLog socket={socket} data={usersData} />}
                    />
                  )}
                  <Route
                    path="/security"
                    element={<Security socket={socket} data={usersData} />}
                  />
                </>
              )}
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
