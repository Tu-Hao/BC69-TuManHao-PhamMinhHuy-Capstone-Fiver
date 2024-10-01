import React from "react";
import { useRoutes } from "react-router-dom";
import Banner from "./components/Banner";
import Header from "./components/Header";
import SearchResults from "./Pages/SearchResults";

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
          <Banner />
        </MainLayout>
      ),
    },
    {
      path: "/search/:searchTerm",
      element: (
        <MainLayout>
          <SearchResults />
        </MainLayout>
      ),
    },
    {
      path: "/search/notfound",
      element: (
        <MainLayout>
          <SearchResults />
        </MainLayout>
      ),
    },
  ]);

  return (
    <div>
      {/* Bạn có thể thêm tiêu đề trang như bạn đã làm */}
      <h1 className=" text-lime-500 font-bold text-center text-5xl p-5">
        Khởi tạo dự án capstone fiver
      </h1>
      {routes}
    </div>
  );
}

export default App;
