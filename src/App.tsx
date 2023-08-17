import React, { createContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/auth/Login/Login";
import { Layout } from "./pages/auth/Layout/Layout";
import useRouteElements from "./router/Router";
import { Modal_1 } from "./component/modal/modal_1";
import { Modal } from "./utils/types/modal.types";

type appType = {
  setIsHidden: (
    isHidden: boolean,
    taile?: string,
    bnt1?: string,
    bnt2?: string
  ) => void;
};

export const AppContext = createContext<appType>({
  setIsHidden: () => {}, // Hàm mặc định hoặc các giá trị khác tùy theo tình huống
});

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const routeElements = useRouteElements();
  const [modalState, setModalState] = useState<Modal>({
    isHidden: false,
    bnt1: "",
    bnt2: "",
    taile: "",
  });

  const hanldModal = (
    isHidden: boolean,
    taile?: string,
    bnt1?: string,
    bnt2?: string
  ) => {
    setModalState({
      isHidden: isHidden,
      taile: taile || "",
      bnt1: bnt1 || "",
      bnt2: bnt2 || "",
    });
    console.log("=>", modalState);
  };

  return (
    <AppContext.Provider value={{ setIsHidden: hanldModal }}>
      <QueryClientProvider client={queryClient}>
        <div>
          {routeElements}
          <Modal_1
            isHidden={modalState.isHidden}
            taile={modalState.taile || ""}
            bnt1={modalState.bnt1 || ""}
          />
        </div>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
