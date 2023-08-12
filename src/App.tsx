import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/auth/Login/Login";
import { Layout } from "./pages/auth/Layout/Layout";
import useRouteElements from "./router/Router";

function App() {
  const routeElements = useRouteElements();
  return <div>{routeElements}</div>;
}

export default App;
