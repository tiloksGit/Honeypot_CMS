import React from "react";

const dashboard = ({ socket, data }) => {
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
