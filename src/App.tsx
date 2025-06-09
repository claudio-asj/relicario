import { HashRouter } from "react-router-dom";
import { CartDialog } from "./components/CartDialog";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import AppRoutes from "./Routes";

export default function App() {
  return (
    <HashRouter>
      <Header />
      <AppRoutes />
      <Footer />
      <CartDialog />
    </HashRouter>
  );
}
