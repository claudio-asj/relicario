import { useEffect } from "react";
import { CartDialog } from "./components/CartDialog";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CartProvider } from "./contexts/CartContext";
import AppRoutes from "./Routes";
import ReactGA from 'react-ga4';
const TRACKING_ID = "G-KF3CNYBZMD"; // your Measurement ID

export default function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: "/", title: "Charme e Desapego - Kelly" });
}, [])
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
