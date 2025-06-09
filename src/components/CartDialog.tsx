import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  category: string;
  price: string; // "R$ 120,00"
  image: string;
  description: string;
  available: boolean;
  onSale: boolean;
};

function parsePrice(price: string): number {
  return parseFloat(price.replace("R$", "").replace(",", ".").trim());
}

export function CartDialog() {
  const [cart, setCart] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
  }, []);

  // Função para remover item do carrinho
  const removeItem = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + parsePrice(item.price), 0);

  const generateWhatsAppLink = () => {
    const message = cart.map(item => `🛍️ ${item.name} - ${item.price}`).join("\n");
    const totalMsg = `\n💰 Total: R$ ${total.toFixed(2).replace(".", ",")}`;
    const fullMsg = encodeURIComponent(`Olá! Quero comprar:\n${message}${totalMsg}`);
    return `https://wa.me/5521979317341?text=${fullMsg}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"  className="fixed bottom-4 right-4 z-50">
          <ShoppingBag size={56} /> {cart.length > 0 && `($({cart.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Seu Carrinho</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Seu carrinho está vazio.
            </p>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-4 border p-2 rounded"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.price}</p>
                </div>
                {/* Botão para remover item */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remover ${item.name} do carrinho`}
                >
                  ✕
                </Button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-right font-semibold">
              Total: R$ {total.toFixed(2).replace(".", ",")}
            </p>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Enviar pedido pelo WhatsApp
              </Button>
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
