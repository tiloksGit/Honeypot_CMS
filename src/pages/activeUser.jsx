import React, { useEffect, useState } from "react";
import axios from "axios";

const activeUser = ({ socket, data }) => {
  const [logDetails, setLogDetails] = useState("");
  const [activities, setActivities] = useState([]);
  const dateObject = new Date();

  useEffect(() => {
    axios
      .get("api/v1/log", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessKeyToken")}`,
        },
      })
      .then((response) => {
        setLogDetails(response.data.data.reverse());
      });
  }, []);

  console.log("socket in", socket.connected);
  socket.on("track_action", (msg) => {
    setActivities([msg, ...activities]);
  });
  return (
    <>
      <div className="text-2xl p-2 text-gray-100">Intruder Activities</div>
      <div>
        <div className="text-2xl p-2 text-gray-100">
          Live Intrusion activity
        </div>
        <div>
          <section className="flex gap-1">
            <h3 className="w-[8rem] border p-2">Timestamp</h3>
            <h3 className="w-[20rem] border p-2">Activity</h3>
            <h3 className="w-[10rem] border p-2">email</h3>
          </section>
          {activities?.length
            ? activities.map((activity, i) => (
                <section key={i} className="flex gap-1">
                  <h1 className="w-[8rem] border p-2">{`${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`}</h1>
                  <h1 className="w-[20rem] border p-2">{activity.action}</h1>
                  <h1 className="w-[10rem] border p-2">
                    {activity.email ? activity.email : ""}
                  </h1>
                </section>
              ))
            : ""}
        </div>
      </div>
      <div className="flex-col justify-content items-center w-full">
        <div className="text-2xl p-2 text-gray-100">Past Intrusions</div>
        <section className="flex text-xl font-medium gap-1">
          <h3 className="w-[6rem] border p-2">Sl. no.</h3>
          <h3 className="w-[15rem] border p-2">_id</h3>
          <h3 className="w-[18rem] border p-2">Action performed</h3>
          <h3 className="w-[14rem] border p-2">Timestamp</h3>
          <h3 className="w-[14rem] border p-2">Ip address</h3>
        </section>
        {logDetails.length
          ? logDetails.map((log, i) => (
              <section className="flex gap-1" key={i}>
                <h3 className="w-[6rem] border p-2">{i + 1}</h3>
                <h3 className="w-[15rem] border p-2">{log._id}</h3>
                <h3 className="w-[18rem] border p-2">{log.action}</h3>
                <h3 className="w-[14rem] border p-2">{log.timestamp}</h3>
                <h3 className="w-[14rem] border p-2">{log.ip_address}</h3>
                <section>
                  {/* <h3>{log.tried_Ac.password}</h3> */}
                  {/* <h3>{log.tried_Ac}</h3> */}
                </section>
              </section>
            ))
          : ""}
      </div>
    </>
  );
};

export default activeUser;
