import { CartDialog } from "./components/CartDialog";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CartProvider } from "./contexts/CartContext";
import AppRoutes from "./Routes";

export default function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <AppRoutes />
        <Footer />
        <CartDialog />
      </CartProvider>
    </>
  );
}
