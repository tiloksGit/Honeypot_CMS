import React from "react";
import { Link } from "react-router-dom";

const navigation = () => {
  return (
    <>
      <Link to="/">
        <li className="w-full text-red list-none text-lg p-3 hover:bg-navigation1">
          Dashboard
        </li>
      </Link>
      <Link to="/users_log">
        <li className="w-full text-red list-none text-lg p-3 hover:bg-navigation1">
          User logs
        </li>
      </Link>
      {localStorage.getItem("flag") == 1 ? (
        ""
      ) : (
        <Link to="activity_logs">
          <li className="w-full text-red list-none text-lg p-3 hover:bg-navigation1">
            Activity Logs
          </li>
        </Link>
      )}
      <Link to="/security">
        <li className="w-full text-red list-none text-lg p-3 hover:bg-navigation1">
          Security
        </li>
      </Link>
    </>
  );
};

export default navigation;
