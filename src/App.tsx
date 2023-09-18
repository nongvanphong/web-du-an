import React, { createContext, useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/auth/Login/Login";
import { Layout } from "./pages/auth/Layout/Layout";
import useRouteElements from "./router/Router";
import { Modal_1 } from "./component/modal/modal_1";
import { Modal } from "./utils/types/modal.types";
import { boolean } from "yup";
import ModalOtp from "./component/modal/modalOtp";
import path from "./utils/path/path";

export const AppContext = createContext<any>(null);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const routeElements = useRouteElements();
  const [isShowMoadalOtp, setIsShowMoadalOtp] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [isShowMoadal1, setIsShowMoadal1] = useState<Modal>({
    isHidden: false,
    taile: "",
    bnt1: false,
    tailebnt1: "",
    bnt2: false,
    tailebnt2: "",
    showBotton: 0,
    type: "",
  });

  const hanldeContext = {
    isShowMoadalOtp,
    setIsShowMoadalOtp,
    isShowMoadal1,
    setIsShowMoadal1,
    email,
    setEmail,
  };

  return (
    <AppContext.Provider value={hanldeContext}>
      <QueryClientProvider client={queryClient}>
        <div>
          {routeElements}
          <Modal_1 />
          <ModalOtp />
        </div>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
