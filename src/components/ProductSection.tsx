import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProducts, getCategories, type Product } from "@/utils/products";
import {
  FiShoppingBag,
  FiLayers,
  FiSliders,
  FiArchive,
  FiCheck,
  FiTrash2,
  FiX,
} from "react-icons/fi";

const baseCategories = ["Vestidos", "Blazers", "Calças", "Camisas"];

const categoryIcons: Record<string, JSX.Element> = {
  Vestidos: <FiSliders size={18} />,
  Blazers: <FiLayers size={18} />,
  Calças: <FiSliders size={18} />,
  Camisas: <FiShoppingBag size={18} />,
  Outros: <FiArchive size={18} />,
};

export function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null); // controla a imagem em tela cheia

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      } catch {
        console.warn("Erro ao carregar o carrinho do localStorage.");
      }
    }
    setIsCartLoaded(true);
  }, []);

  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isCartLoaded]);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      const foundCategories = getCategories(data, baseCategories);
      setCategories(foundCategories);
      setSelectedCategory(foundCategories[0]);
    });
  }, []);

  function handleAddToCart(product: Product) {
    if (!cart.find((p) => p.id === product.id)) {
      setCart((prev) => [...prev, product]);
    }
  }

  function handleRemoveFromCart(productId: number) {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  }

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "Outros") {
      return !baseCategories.includes(p.category?.trim() || "");
    }
    return p.category?.trim() === selectedCategory;
  });

  // Função para fechar modal ao clicar fora da imagem
  function handleModalClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      setModalImage(null);
    }
  }

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === selectedCategory ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className="flex items-center gap-2"
          >
            {categoryIcons[cat]}
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const inCart = cart.some((p) => p.id === product.id);

          return (
            <Card key={product.id} className="overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => setModalImage(product.image)} // abrir modal na imagem clicada
              />

              <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
                {product.available ? (
                  <span className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    Disponível
                  </span>
                ) : (
                  <span className="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    Indisponível
                  </span>
                )}

                {product.onSale && (
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded shadow">
                    Promoção
                  </span>
                )}
              </div>

              <CardContent className="p-4 flex flex-col gap-2">
                <h3
                  className="text-lg font-semibold"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={product.name}
                >
                  {product.name}
                </h3>

                <p
                  className="text-muted-foreground"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={product.description}
                >
                  {product.description}
                </p>

                <p className="text-primary font-bold mt-2">{product.price}</p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    variant={inCart ? "secondary" : "default"}
                    size="sm"
                    className="flex items-center gap-2 justify-center flex-grow"
                    disabled={inCart}
                    title={
                      inCart ? "Produto já adicionado" : "Adicionar ao carrinho"
                    }
                  >
                    {inCart ? (
                      <>
                        <FiCheck size={16} />
                        Adicionado
                      </>
                    ) : (
                      "Adicionar ao carrinho"
                    )}
                  </Button>

                  {inCart && (
                    <Button
                      onClick={() => handleRemoveFromCart(product.id)}
                      variant="destructive"
                      size="sm"
                      className="flex items-center justify-center"
                      title="Remover do carrinho"
                    >
                      <FiTrash2 size={16} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal para mostrar imagem em tela cheia */}
      {modalImage && (
        <div
          onClick={handleModalClick}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 cursor-pointer"
          aria-modal="true"
          role="dialog"
        >
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 focus:outline-none"
              aria-label="Fechar"
            >
              <FiX size={24} />
            </button>
            <img
              src={modalImage}
              alt="Imagem em tela cheia"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()} // evitar fechar ao clicar na imagem
            />
          </div>
        </div>
      )}
    </section>
  );
}
