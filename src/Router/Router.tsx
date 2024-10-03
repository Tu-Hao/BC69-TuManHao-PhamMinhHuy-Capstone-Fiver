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
  ]);
