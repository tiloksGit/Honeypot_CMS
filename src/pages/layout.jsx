import React, { useState } from "react";
import Navigation from "../components/navigation";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const layout = ({ socket }) => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState("");

  const logout = () => {
    localStorage.removeItem("accessKeyToken");
    localStorage.removeItem("flag");
    navigate("/");
    location.reload();
  };

  return (
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
        <Outlet/>
      </div>
    </div>
  );
};

export default layout;
