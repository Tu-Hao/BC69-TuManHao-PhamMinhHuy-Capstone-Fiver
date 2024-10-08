import { Outlet } from "react-router-dom";
import { Footer, Header } from "../UI";

export const DSCVLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
