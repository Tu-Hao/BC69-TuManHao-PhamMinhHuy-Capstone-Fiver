import { useRoutes } from "react-router-dom";
import { MainLayout } from "../components";
import { Home } from "../Pages/Home";

export const routers = () =>
  useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      element: <></>, // gom cái mainlayout thành 1 file riêng rồi truyền vào trong <></>
      children: [
        {
          path: "/", // cái này chắc nên có thêm admin đằng sau để phân biệt với trang user
          element: <></>,//phần hiển thị của của đường dẫn
        },
        //copy paste 
      ],
    },
  ]);