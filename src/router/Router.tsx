import { Navigate, Outlet, Route, useRoutes } from "react-router-dom";
import { Layout } from "../pages/auth/Layout/Layout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";

export default function useRouteElements() {
  const routes = useRoutes([
    {
      path: "",
      children: [
        {
          path: "auth/login",
          element: (
            <Layout>
              <Login />
            </Layout>
          ),
        },
        {
          path: "auth/register",
          element: (
            <Layout>
              <Register />
            </Layout>
          ),
        },
        {
          // Tuyến đường mặc định cho trang chính
          path: "*",
          element: <Navigate to="auth/login" />,
        },
        {
          path: "",
          element: <Navigate to="auth/login" />,
        },
      ],
    },
  ]);
  return routes;
}
