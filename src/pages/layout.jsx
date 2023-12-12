import React, { useEffect } from "react";
import Navigation from "../components/navigation";
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const layout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessKeyToken");
    localStorage.removeItem("flag");
    navigate("/");
    location.reload();
  };
  //Socket connection
  if (localStorage.getItem("flag") === "1") {
    console.log("hi into the socket connection");
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
    <div className="flex">
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
        <Outlet />
      </div>
    </div>
  );
};

export default layout;
