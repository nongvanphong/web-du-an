import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/auth/Login/Login";
import { Layout } from "./pages/auth/Layout/Layout";
import useRouteElements from "./router/Router";
import { Sussecc } from "./component/modal/sussecc/sussecc";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const routeElements = useRouteElements();
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {routeElements}
        {/* <Sussecc isHidden={false} /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
