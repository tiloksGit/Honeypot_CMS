import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const logs = ({ socket, data }) => {

  const handleDeleteUser = (key) => {
    console.log(key._id);
    axios
      .delete(`api/v1/user/cms/${key._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessKeyToken")}`,
        },
      })
      .then((response) => {
        toast("user Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
    if (connection_socket.connected) {
      socket.emit("track_action", {
        first: 1,
        action: `USER_DELETED_${key.email}`,
      });
    }
  };

  const handleChangeRole = (key) => {
    console.log(key._id);
    axios
      .put(
        `api/v1/user/cms/${key._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessKeyToken")}`,
          },
        }
      )
      .then((response) => {
        toast("Role Changed");
      })
      .catch((err) => {
        console.log(err);
      });
    socket.emit("track_action", {
      first: 1,
      action: `USER_DELETED_${key.email}`,
    });
  };

  console.log("hello");

  return (
    <>
      <div className="text-2xl p-2 text-gray-100">User Log</div>
      <div className="">
        <div className="flex gap-1">
          <section className="p-2 w-[20rem] border-2">Email</section>
          <section className="p-2 w-[20rem] border-2">Name</section>
          <section className="p-2 w-[20rem] border-2">Role</section>
          <section className="p-2 w-[20rem] border-2">Mobile</section>
          <section className="p-2 w-[20rem] border-2">Action</section>
        </div>
        {data.length
          ? data.map((user, i) => (
              <div key={i} className="flex gap-1">
                <section className="border p-2 w-[20rem]">{user.email}</section>
                <section className="border p-2 w-[20rem]">{user.email}</section>
                <section className="border p-2 w-[20rem]">{user.role}</section>
                <section className="border p-2 w-[20rem]">
                  {user.mobile}
                </section>
                <section className="border p-2 w-[20rem] flex justify-around ">
                  <span
                    onClick={() => handleDeleteUser(user)}
                    className="hover:text-bubble-gum bg-metal rounded-lg text-white p-1 cursor-pointer"
                  >
                    Delete User
                  </span>
                  <span
                    onClick={() => handleChangeRole(user)}
                    className="hover:text-bubble-gum bg-metal rounded-lg text-white p-1 cursor-pointer"
                  >
                    Change Role
                  </span>
                </section>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default logs;
