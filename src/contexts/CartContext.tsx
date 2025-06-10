import  { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';

// Definimos o tipo para um item do carrinho
export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  available: boolean;
  onSale: boolean;
};

// Função utilitária para calcular o preço
function parsePrice(price: string): number {
  return parseFloat(price.replace("R$", "").replace(".", "").replace(",", ".").trim());
}

// O "contrato" do nosso contexto
export type CartContextType = {
  cart: CartItem[];
  addProduct: (product: CartItem) => void;
  removeProduct: (productId: number) => void;
  cartCount: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carrega o carrinho do localStorage ao iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Falha ao carregar o carrinho.", e);
        setCart([]);
      }
    }
  }, []);

  // Salva o carrinho no localStorage sempre que ele muda
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product: CartItem) => {
    setCart(prev => prev.find(item => item.id === product.id) ? prev : [...prev, product]);
  };

  const removeProduct = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };
  
  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + parsePrice(item.price), 0);
  }, [cart]);

  const contextValue = useMemo(() => ({
    cart,
    addProduct,
    removeProduct,
    cartCount: cart.length,
    total,
  }), [cart, total]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para facilitar o uso
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};