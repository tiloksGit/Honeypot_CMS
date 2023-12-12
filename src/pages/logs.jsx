import React from "react";

const logs = ({ socket, data }) => {
  const usersLog = data;

  const handleDeleteUser = (e, key) => {
    console.log(key);
  };

  const handleChangeRole = (e, key) => {};

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
                    onClick={(e, i) => handleDeleteUser(i)}
                    className="hover:text-bubble-gum bg-metal rounded-lg text-white p-1 cursor-pointer"
                  >
                    Delete User
                  </span>
                  <span
                    onClick={(e, i) => handleChangeRole(i)}
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
