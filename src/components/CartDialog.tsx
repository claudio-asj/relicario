
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext"; // 👈 Importamos o nosso hook

export function CartDialog() {
  // 👇 Usamos o hook para obter tudo o que precisamos do contexto central
  const { cart, removeProduct, cartCount, total } = useCart();

  // Toda a lógica de `useState` e `useEffect` para o carrinho foi removida daqui.
  // A lógica de `removeItem` e cálculo de `total` também foi removida.

  const generateWhatsAppLink = () => {
    const message = cart.map(item => `🛍️ ${item.name} - ${item.price}`).join("\n");
    const totalMsg = `\n💰 Total: R$ ${total.toFixed(2).replace(".", ",")}`;
    const fullMsg = encodeURIComponent(`Olá! Quero comprar:\n${message}${totalMsg}`);
    return `https://api.whatsapp.com/send?phone=5521979317341&text=${fullMsg}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Ícone do carrinho flutuante */}
        <Button variant="default" className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full">
          <ShoppingBag size={24} />
          {cartCount > 0 && 
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Seu Carrinho</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {cart.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Seu carrinho está vazio.
            </p>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                className="flex gap-4 border p-2 rounded"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded-md"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.price}</p>
                </div>
                {/* O botão de remover agora usa a função `removeProduct` do contexto */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeProduct(item.id)}
                  aria-label={`Remover ${item.name} do carrinho`}
                >
                  ✕
                </Button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-4 space-y-4 border-t pt-4">
            {/* O total agora vem diretamente do contexto */}
            <p className="text-right font-semibold text-lg">
              Total: R$ {total.toFixed(2).replace(".", ",")}
            </p>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block"
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