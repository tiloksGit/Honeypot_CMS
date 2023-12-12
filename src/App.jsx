import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import layouts from "./assets/routes";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import { io } from "socket.io-client";

function App() {
  if (localStorage.getItem("flag") === "1") {
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
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" Component={Register} />
          {!localStorage.getItem("accessKeyToken") ? (
            <Route path="/" Component={Login} />
          ) : (
            <Route path="/" Component={Layout}>
              <Route index Component={Dashboard} />
              {layouts.map((route, i) => (
                <Route key={i} path={route.path} Component={route.element} />
              ))}
            </Route>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
