import React from "react";

const activeUser = ({ socket, data }) => {
  socket.on("track_item", (msg) => {
    console.log(msg);
  });
  return <div className="text-2xl p-2 text-gray-100">Active User</div>;
};

export default activeUser;
