import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
const socket = io(server, connectionOptions);

const App = () => {
  const location1 = useLocation();
  const params = new URLSearchParams(location1.search);
  const navigate = useNavigate();
  const [loadData, setLoadData] = useState("");
  useEffect(() => {
    socket.emit("join_room", {});
    const data = {
      first: 0,
      email: params.get("email") || localStorage.getItem("email"),
      action: "LOGGED_IN",
    };
    socket.emit("track_action", data);
  }, []);
  if (localStorage.getItem("flag") == "1") {
    axios.defaults.baseURL = import.meta.env.VITE_HONEYPOT_SERVER_API;
  } else if (localStorage.getItem("flag") == "0") {
    axios.defaults.baseURL = import.meta.env.VITE_ACTUAL_SERVER_API;
  }

  useEffect(() => {
    if (params.get("token") && params.get("flag")?.length) {
      localStorage.setItem("accessKeyToken", params.get("token"));
      localStorage.setItem("flag", params.get("flag"));
      localStorage.setItem("email", params.get("email"));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessKeyToken");
    localStorage.removeItem("flag");
    localStorage.removeItem("email");
    location.replace("https://main--honeypot-user.netlify.app/");
  };

  return (
    <>
      <div className="flex h-screen">
        <ToastContainer />
        <div className="xl:min-w-[20rem] p-2 bg-navigation h-screen text-white">
          <Navigation />
          <button
            onClick={() => logout()}
            className="relative w-full text-red list-none text-left text-lg p-3 hover:bg-navigation1"
          >
            logout
          </button>
        </div>
        <div className="w-full text-red p-2 h-full overflow-auto">
          <Routes>
            <Route path="/register" Component={Register} />
            {!localStorage.getItem("accessKeyToken") ? (
              <Route path="/" Component={Login} />
            ) : (
              <>
                <Route
                  index
                  element={
                    <Dashboard socket={socket} setLoadData={setLoadData} />
                  }
                />
                <Route path="/users_log" element={<Logs socket={socket} />} />
                {localStorage.getItem("flag") == 1 ? (
                  ""
                ) : (
                  <Route
                    path="/activity_logs"
                    element={<ActivityLog socket={socket} />}
                  />
                )}
                <Route
                  path="/security"
                  element={<Security socket={socket} />}
                />
              </>
            )}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
