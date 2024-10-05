import { Outlet } from "react-router-dom";
import { Footer } from "../UI";

export const MainLayout = () => {
  return (
    <div>
        <main>
          <Outlet />
        </main>
      <Footer />
    </div>
  );
};
