import { useRoutes } from "react-router-dom";
import { DSCVLayout, MainLayout } from "../components";
import { Home } from "../Pages/Home";
import { PATH } from "../constants";
import { DSCV } from "../Pages/DSCV";
import { ListNType } from "../Pages/ListNType";

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
    },{
      element: <DSCVLayout />,
      children: [
        {
          path:PATH.DSCV,
          element:<DSCV/>
        },
        {
          path:PATH.LNTCV,
          element:<ListNType/>
        }
      ],
    }
  ]);
