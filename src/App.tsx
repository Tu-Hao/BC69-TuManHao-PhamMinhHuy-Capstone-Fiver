// app.tsx
import React from "react";
import { useRoutes } from "react-router-dom";
import Banner from "./components/Banner";
import Header from "./components/Header";
import SearchResults from "./Pages/SearchResults";
import {Footer} from "../src/components/UI"
import "./App.css";
import { routers } from "./Router/Router";
import Profile from './Pages/Profile';
import { HomeTemplate } from "./components";

// Tạo layout chứa Header và nội dung động
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}

    </>
  );
};


function App() {
  // Sử dụng useRoutes để điều hướng giữa các trang
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <></>
        </MainLayout>
      ),
    },
    {
      path: "/search/:searchTerm",
      element: (
        <MainLayout>
          <SearchResults />
          <Footer/>
        </MainLayout>
      ),
    },
    {
      path: "/search/notfound",
      element: (
        <MainLayout>
          <SearchResults />
          <Footer/>
        </MainLayout>
      ),
    },
    {
      path: "/Profile/:id",
      element: (
        <MainLayout>
          <Profile />
          <Footer/>
        </MainLayout>
      )
      
    },
  ]);

  return (
    <div>
      {routes}
      {routers()}
    </div>
  );
}

export default App;
