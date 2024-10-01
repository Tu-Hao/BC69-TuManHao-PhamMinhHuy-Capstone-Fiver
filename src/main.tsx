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
