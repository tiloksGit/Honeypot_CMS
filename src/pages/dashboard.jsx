import React, { useEffect } from "react";
import activity from "../features/activityAnalysis";

const dashboard = ({ socket, data }) => {
  const usersLog = data;
  console.log(usersLog);

  return (
    <>
      <div className="text-2xl p-2 text-gray-100">Dashboard</div>
      <div className="flex justify-around">
        {activity.map((act, i) => (
          <div
            key={i}
            className="flex-column justify-center item-center h-60 text-text1 m-4 text-center font-medium text-lg shadow-md p-4 rounded-xl"
          >
            <section>Users Count</section>
            <section>Total: {usersLog.length}</section>
            <section>+2</section>
          </div>
        ))}
      </div>
      <div></div>
    </>
  );
};

export default dashboard;
