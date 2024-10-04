import { Outlet } from "react-router-dom";
import { Footer, Header } from "../UI";

export const MainLayout = () => {
  return (
    <div>
        <Header />
        <main>
          <Outlet />
        </main>
      <Footer />
    </div>
  );
};
