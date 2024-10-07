import { useRoutes } from "react-router-dom";
import { MainLayout } from "../components";
import { Home } from "../Pages/Home";
import { PATH } from "../constants";
import { DSCV } from "../Pages/DSCV";

export const routers = () =>
  useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path:PATH.DSCV,
          element:<DSCV/>
        }
      ],
    },
  ]);
