import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store.ts";
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import App from './App';
// import './index.css'

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import App from "./App";
import { Provider } from "react-redux";
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
