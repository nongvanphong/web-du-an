import { Navigate, Outlet, Route, useRoutes } from "react-router-dom";
import { Layout } from "../pages/auth/Layout/Layout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import path from "../utils/path/path";
export default function useRouteElements() {
  const routes = useRoutes([
    {
      path: "",
      children: [
        {
          path: path.login,
          element: (
            <Layout>
              <Login />
            </Layout>
          ),
        },
        {
          path: path.register,
          element: (
            <Layout>
              <Register />
            </Layout>
          ),
        },
        {
          // Tuyến đường mặc định cho trang chính
          path: "*",
          element: <Navigate to={path.login} />,
        },
        {
          path: "",
          element: <Navigate to={path.login} />,
        },
      ],
    },
  ]);
  return routes;
}
