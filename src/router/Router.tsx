import {
  Navigate,
  Outlet,
  Route,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { Layout } from "../pages/auth/Layout/Layout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";

import path from "../utils/path/path";
import { Home } from "../pages/home/Home";
import { Store } from "../pages/store/store/store";
import { MainLayout } from "../layout/mainLayout";
import Manager from "../pages/store/manager/manager";
import Drink from "../pages/store/drink/drink";
import Food from "../pages/store/food/food";
export default function useRouteElements() {
  const navigate = useNavigate();
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
          path: path.home,
          element: <Home />,
        },
        {
          path: path.store,
          element: (
            <MainLayout>
              <Store></Store>
            </MainLayout>
          ),
        },
        {
          path: path.manager,
          element: (
            <MainLayout>
              <Manager />
            </MainLayout>
          ),
        },
        {
          path: path.managerDrink,
          element: (
            <MainLayout>
              <Drink />
            </MainLayout>
          ),
        },
        {
          path: path.managerfood,
          element: (
            <MainLayout>
              <Food />
            </MainLayout>
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
