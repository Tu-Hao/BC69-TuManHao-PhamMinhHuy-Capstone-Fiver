// app.tsx
import React from "react";
import { useRoutes } from "react-router-dom";
import Header from "./components/Header";
import SearchResults from "./Pages/SearchResults";
import { Footer } from "../src/components/UI";
import "./App.css";
import { routers } from "./Router/Router";
import Profile from "./Pages/Profile";
import AdminUserManagement from "./Pages/AdminUserManagement";
import Dashboard from "./components/Dashboard";
import JobManagement from "./Pages/JobManagement";

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
          <Footer />
        </MainLayout>
      ),
    },
    {
      path: "/search/notfound",
      element: (
        <MainLayout>
          <SearchResults />
          <Footer />
        </MainLayout>
      ),
    },
    {
      path: "/Profile/:id",
      element: (
        <MainLayout>
          <Profile />
          <Footer />
        </MainLayout>
      ),
    },
    {
      path: "/admin/QuanLyNguoiDung",
      element: (
        <div  className="flex flex-col h-screen">
          <div>
          <Header />
          </div>

          <div className="flex mt-16">
            <Dashboard />
            <AdminUserManagement />
          </div>
        </div>
      ),
    },
    {
      path: "/admin/QuanLyCongViec",
      element: (
        <div  className="flex flex-col h-screen">
          <div>
          <Header />
          </div>

          <div className="flex mt-16">
            <Dashboard />
            <JobManagement/>
          </div>
        </div>
      ),
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
