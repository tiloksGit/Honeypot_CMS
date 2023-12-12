import Dashboard from "../pages/dashboard";
import UsersLog from "../pages/activeUser";
import Logs from "../pages/logs";
import Security from "../pages/security";
import Login from "../pages/login"
// import Layout from "../pages/layout"

const layouts = [{
    path : "/",
    element : Dashboard,
    icon: "",
    name : "Dashboard"
},
{
    path: "users_log",
    element: UsersLog,
    icon: "",
    name: "User Log"
},
{
    path: "activity_log",
    element: Logs,
    icon: "",
    name: "Activity Log"
},
{
    path: "security",
    element: Security,
    icon: "",
    name: "Security"
},
// {
//     path: "/login",
//     element: Login,
//     icon: "",
//     name: "Login"
// }
]

export default layouts