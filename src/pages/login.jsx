import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import avatar from "../assets/icons/avatar.png";
import { Link } from "react-router-dom";
import axios from "axios";
import loadingIcon from "../assets/icons/work-in-progress.gif";

// axios.defaults.baseURL = import.meta.env.VITE_ACTUAL_SERVER_API;

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location1 = useLocation();
  const params = new URLSearchParams(location1.search);

  useEffect(() => {
    if (params.get("token") && params.get("flag")?.length) {
      localStorage.setItem("accessKeyToken", params.get("token"));
      localStorage.setItem("flag", params.get("flag"));
      console.log(params.get("flag"));
      location.reload();
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/api/v1/user/login", {
        email: username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          localStorage.setItem("accessKeyToken", response.data.token);
          localStorage.setItem("flag", response.data.flag);
          location.reload();
          setLoginErr(false);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginErr(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    // <div className="flex justify-center items-center bg-fade text-xl h-screen">
    //   <form className="flex-col items-center w-128 bg-login-card p-4 text-lg px-6 border rounded-lg h-3/4">
    //     <div className="text-center text-3xl font-medium text-black">
    //       Hello Again!
    //     </div>
    //     <div className="text-center text-text1 p-2">
    //       Explore More by connecting with us
    //       {loginErr ? <p className="text-alert">Login Failed</p> : ""}
    //     </div>
    //     <div className="flex justify-center">
    //       <div className="w-2/4 text-center">
    //         <img src={avatar} alt="" className="" />
    //       </div>
    //     </div>
    //     <label htmlFor="username" className="p-2 text-lg">
    //       Username
    //     </label>
    //     <input
    //       type="text"
    //       id="username"
    //       value={username}
    //       placeholder="username or email"
    //       className="w-full h-15 p-2 rounded-lg border mb-4 focus:outline-none"
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <label htmlFor="password" className="p-2 text-lg">
    //       Password
    //     </label>
    //     <input
    //       type="password"
    //       id="password"
    //       value={password}
    //       placeholder="password"
    //       className="w-full h-15 p-2 rounded-lg border mb-4 focus:outline-none"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <div className="text-center">
    //       <button
    //         type="submit"
    //         onClick={(e) => handleLogin(e)}
    //         className="w-40 hover:bg-purple p-2 m-3 border rounded-lg"
    //         disabled={!Boolean(username && password)}
    //       >
    //         Login
    //       </button>
    //       <div className="text-sm">
    //         Not registered?{" "}
    //         <span className="text-text-link">
    //           <Link to="/register">Register here</Link>
    //         </span>
    //       </div>
    //     </div>
    //     {isLoading ? (
    //       <img
    //         src={loadingIcon}
    //         alt="loading..."
    //         className="opacity-40 absolute top-24 right-1/3 text-center"
    //       />
    //     ) : (
    //       ""
    //     )}
    //   </form>
    // </div>
    <></>
  );
};

export default login;
