import React, { useState, useEffect } from "react";
import axios from "axios";

const dashboard = ({ socket }) => {
  const [data, setData] = useState("");
  if (localStorage.getItem("flag") == 1) {
    axios.defaults.baseURL = import.meta.env.VITE_HONEYPOT_SERVER_API;
  } else {
    axios.defaults.baseURL = import.meta.env.VITE_ACTUAL_SERVER_API;
  }
  useEffect(() => {
    axios
      .get("api/v1/user/cms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessKeyToken")}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="text-2xl p-2 text-gray-100">Dashboard</div>
      <div className="flex justify-around">
        <div className="flex-column justify-center item-center h-60 text-text1 m-4 w-[20rem] text-center font-medium text-lg shadow-md p-4 rounded-xl">
          <section>Users Count</section>
          <section>Total: {data.count}</section>
          <section>+2</section>
        </div>
        <div className="flex-column justify-center item-center h-60 text-text1 m-4 w-[20rem] text-center font-medium text-lg shadow-md p-4 rounded-xl">
          <section>Login acitvity</section>
          <section>medium</section>
          <section>---</section>
        </div>
        <div className="flex-column justify-center item-center h-60 text-text1 m-4 w-[20rem] text-center font-medium text-lg shadow-md p-4 rounded-xl">
          <section>User activity</section>
          <section>medium</section>
          <section>---</section>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default dashboard;
