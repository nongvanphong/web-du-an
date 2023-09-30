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

import Test from "../component/test/Test";
import listDrink from "./../pages/store/drink/listDrink";
import ListDrink from "./../pages/store/drink/listDrink";
import { Premissions } from "../pages/premission/premissions";
import Notfail from "../pages/premission/notfail";

import { Layout } from "../../src/layout/index";
import { Login } from "../pages/auth/Login/index";
import { Resgister } from "../pages/auth/Register/index";
import { Home } from "../pages/home";
import { Product } from "../pages/product/indext";
import { Pay } from "../pages/Pay";
import { Chart } from "../pages/Chart";
import { Bill } from "../pages/bill/Index";
import ServerError from "../pages/premission/ServerError";
import { useEffect, useState } from "react";

export default function useRouteElements() {
  const navigate = useNavigate();
  const [tokenExists, setTokenExists] = useState(0); // 0 là chưa đăng nhập 1 là đăng nhập
  useEffect(() => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem("rf");
    if (token) {
      return setTokenExists(1);
    }
    return setTokenExists(0);
  }, []);
  const CheckPremissions = (type: string) => {
    if (tokenExists) {
      // Đã đăng nhập
      return checkType(type);
    } else {
      // chưa đăng nhặp
      return (
        <Layout.LayoutAuth>
          <Login.Login2 />
        </Layout.LayoutAuth>
      );
    }
  };

  const checkType = (type: string): any => {
    switch (type) {
      case "home":
        return (
          <Layout.LayoutMain taitle="Đơn hàng" classname="bg-white ">
            <Home.Home1 />
          </Layout.LayoutMain>
        );
      case "product":
        return (
          <Layout.LayoutMain taitle="Sản phẩm" classname="bg-white ">
            <Product.Product1 />
          </Layout.LayoutMain>
        );
      case "update_product":
        return (
          <Layout.LayoutMain taitle="Sản phẩm/ Cập nhập">
            <Product.UpdateProduct />
          </Layout.LayoutMain>
        );
      case "create_product":
        return (
          <Layout.LayoutMain taitle="Sản phẩm/ Thêm">
            <Product.AddProduct />
          </Layout.LayoutMain>
        );
      case "bill":
        return (
          <Layout.LayoutMain taitle="Hóa đơn">
            <Bill.BillSceen />
          </Layout.LayoutMain>
        );
      case "pay":
        return (
          <Layout.LayoutMain taitle="Thống kê">
            <Pay.PayScreen />
          </Layout.LayoutMain>
        );
    }
  };

  const routes = useRoutes([
    {
      path: "",
      children: [
        {
          path: path.login,
          element: CheckPremissions("home"),
        },
        {
          path: path.loginEmail,
          element: (
            <Layout.LayoutAuth>
              <Login.LoginEmail />
            </Layout.LayoutAuth>
          ),
        },
        {
          path: path.loginPhoneNumber,
          element: (
            <Layout.LayoutAuth>
              <Login.LoginPhone />
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
          path: path.home,
          element: CheckPremissions("home"),
        },
        {
          path: path.product,
          element: CheckPremissions("product"),
        },
        {
          path: path.AddProduct,
          element: CheckPremissions("create_product"),
        },
        {
          path: path.updateProduct,
          element: CheckPremissions("update_product"),
        },
        {
          path: path.chart,
          element: CheckPremissions("bill"),
        },
        {
          path: path.pay,
          element: CheckPremissions("pay"),
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
          path: path.serverError,
          element: <ServerError />,
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
