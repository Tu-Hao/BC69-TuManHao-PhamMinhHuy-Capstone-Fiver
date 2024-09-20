import "./App.css";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

function App() {
  return (
    <>
      <h1 className="bg-stone-500 text-lime-500 font-bold text-center text-5xl p-5">
        Khởi tạo dự án capstone fiver
      </h1>
      <div className="flex place-content-center mt-2">
        <LoginModal />
        <RegisterModal />
      </div>
    </>
  );
}

export default App;
