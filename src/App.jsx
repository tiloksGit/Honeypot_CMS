import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import layouts from "./assets/routes";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" Component={Register} />
          {!localStorage.getItem("accessKeyToken") ? (
            <Route path="/" Component={Login} />
          ) : (
            <Route path="/" Component={Layout}>
              <Route index Component={Dashboard} />
              {layouts.map((route, i) => (
                <Route key={i} path={route.path} Component={route.element} />
              ))}
            </Route>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
