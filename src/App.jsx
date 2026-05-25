import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Navbar />
      <main className={`flex-1 ${isHome ? "" : "pt-[76px]"}`}>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
