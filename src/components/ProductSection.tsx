import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProducts, getCategories, type Product } from "@/utils/products";
import { useCart } from "@/contexts/CartContext"; // 👈 1. Importar o hook do contexto
import {
  FiShoppingBag,
  FiLayers,
  FiSliders,
  FiArchive,
  FiCheck,
  FiTrash2,
} from "react-icons/fi";

// A lógica de categorias e ícones permanece a mesma, pois é local a este componente.
const baseCategories = ["Vestidos", "Blazers", "Calças", "Camisas"];
const categoryIcons: Record<string, JSX.Element> = {
  Vestidos: <FiSliders size={18} />,
  Blazers: <FiLayers size={18} />,
  Calças: <FiSliders size={18} />,
  Camisas: <FiShoppingBag size={18} />,
  Outros: <FiArchive size={18} />,
};

export function ProductSection() {
  // Estados que pertencem APENAS a este componente (produtos e filtros)
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // 2. Obter tudo relacionado ao carrinho a partir do nosso contexto central.
  const { cart, addProduct, removeProduct } = useCart();

  // Este useEffect continua aqui, pois é responsável por carregar os produtos.
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      const foundCategories = getCategories(data, baseCategories);
      setCategories(foundCategories);
      if (foundCategories.length > 0) {
        setSelectedCategory(foundCategories[0]);
      }
    });
  }, []);
  
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "Outros") {
      return !baseCategories.includes(p.category?.trim() || "");
    }
    return p.category?.trim() === selectedCategory;
  });

  // Lógica do modal permanece a mesma
  function handleModalClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      setModalImage(null);
    }
  }

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      {/* Filtros de Categoria (sem alteração) */}
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

      {/* Grelha de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          // 3. A verificação `inCart` agora usa o `cart` do contexto, garantindo que está sempre atualizada.
          const inCart = cart.some((p) => p.id === product.id);

          return (
            <Card key={product.id} className="overflow-hidden relative flex flex-col">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => setModalImage(product.image)}
              />

              {/* ... (tags de disponível/promoção sem alteração) ... */}

              <CardContent className="p-4 flex flex-col gap-2 flex-grow">
                <h3 className="text-lg font-semibold h-14" /* ... (estilos de truncar texto) ... */>
                  {product.name}
                </h3>
                <p className="text-muted-foreground h-20" /* ... (estilos de truncar texto) ... */>
                  {product.description}
                </p>
                <p className="text-primary font-bold mt-auto pt-2">{product.price}</p>
                
                <div className="flex gap-2 mt-2">
                  <Button
                    // 4. Ação de adicionar agora chama a função `addProduct` do contexto.
                    onClick={() => addProduct(product)}
                    variant={inCart ? "secondary" : "default"}
                    size="sm"
                    className="flex items-center gap-2 justify-center flex-grow"
                    disabled={inCart || !product.available}
                    title={
                      !product.available ? "Produto indisponível" :
                      inCart ? "Produto já adicionado" : "Adicionar ao carrinho"
                    }
                  >
                    {inCart ? (
                      <><FiCheck size={16} /> Adicionado</>
                    ) : (
                      "Adicionar ao carrinho"
                    )}
                  </Button>

                  {inCart && (
                    <Button
                      // 5. Ação de remover agora chama a função `removeProduct` do contexto.
                      onClick={() => removeProduct(product.id)}
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

      {/* Modal de Imagem (sem alteração) */}
      {modalImage && (
        <div onClick={handleModalClick} /* ... */ >
          {/* ... (conteúdo do modal) ... */}
        </div>
      )}
    </section>
  );
}