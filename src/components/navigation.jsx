import React from "react";
import routes from "../assets/routes";
import { Link } from "react-router-dom";

const navigation = () => {
  return (
    <>
      {routes.map((route, i) => (
        <Link to={route.path}  key={i}>
          <li
           
            className="w-full text-red list-none text-lg p-3 hover:bg-navigation1"
          >
            {route.name}
          </li>
        </Link>
      ))}
    </>
  );
};

export default navigation;
