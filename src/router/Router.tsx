import {
  Navigate,
  Outlet,
  Route,
  useNavigate,
  useRoutes,
} from "react-router-dom";

import path from "../utils/path/path";

import { Store } from "../pages/store/store/store";

import Manager from "../pages/store/manager/manager";
import Drink from "../pages/store/drink/drink";
import Food from "../pages/store/food/food";

import { MainLayout } from "../layout/mainLayout";
import { AppMainLayout } from "../layout/appMainLayout";
import Test from "../component/test/Test";
import listDrink from "./../pages/store/drink/listDrink";
import ListDrink from "./../pages/store/drink/listDrink";
import { Premissions } from "../pages/premission/premissions";
import Notfail from "../pages/premission/notfail";

import { Layout } from "../../src/layout/index";
import { Login } from "../pages/auth/Login/index";
import { Resgister } from "../pages/auth/Register/index";

export default function useRouteElements() {
  const navigate = useNavigate();
  const routes = useRoutes([
    {
      path: "",
      children: [
        {
          path: path.login,
          element: (
            <Layout.LayoutAuth>
              <Login.Login2 />
            </Layout.LayoutAuth>
          ),
        },
        {
          path: path.register,
          element: (
            <Layout.LayoutAuth>
              <Resgister.Resgister2 />
            </Layout.LayoutAuth>
          ),
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
          path: path.managerListDrink,
          element: (
            <MainLayout>
              <ListDrink />
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
          path: path.premissions,
          element: <Premissions />,
        },
        {
          path: path.notfial,
          element: <Notfail />,
        },
        {
          path: "t",
          element: <Test />,
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
