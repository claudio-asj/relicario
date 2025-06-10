import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProducts, getCategories, type Product } from "@/utils/products";
import { useCart } from "@/contexts/CartContext";
import {
  FiShoppingBag,
  FiLayers,
  FiSliders,
  FiArchive,
  FiCheck,
  FiTrash2,
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
  const [modalImage, setModalImage] = useState<string | null>(null);

  const { cart, addProduct, removeProduct } = useCart();

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

  // Filtra os produtos pela categoria selecionada
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "Outros") {
      return !baseCategories.includes(p.category?.trim() || "");
    }
    return p.category?.trim() === selectedCategory;
  });

  // Função para fechar o modal ao clicar fora da imagem
  function handleModalClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      setModalImage(null);
    }
  }

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      {/* Filtros de Categoria */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === selectedCategory ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className="flex items-center gap-2"
          >
            {categoryIcons[cat] || categoryIcons["Outros"]}
            {cat}
          </Button>
        ))}
      </div>

      {/* Grade de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const inCart = cart.some((p) => p.id === product.id);
          const isAvailable = product.available;

          return (
            <Card key={product.id} className="overflow-hidden relative flex flex-col">
              {/* Imagem do produto, ao clicar abre o modal */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => setModalImage(product.image)}
              />

              {/* Tags de Disponibilidade e Promoção */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {!isAvailable && (
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Indisponível
                  </span>
                )}
                {product.onSale && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    Promoção
                  </span>
                )}
              </div>

              <CardContent className="p-4 flex flex-col gap-2 flex-grow">
                <h3
                  className="text-lg font-semibold h-14 overflow-hidden"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <p
                  className="text-muted-foreground h-20 overflow-hidden"
                  title={product.description}
                >
                  {product.description}
                </p>
                <p className="text-primary font-bold mt-auto pt-2">{product.price}</p>

                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => addProduct(product)}
                    variant={inCart ? "secondary" : "default"}
                    size="sm"
                    className="flex items-center gap-2 justify-center flex-grow"
                    disabled={!isAvailable || inCart}
                    title={
                      !isAvailable
                        ? "Produto indisponível"
                        : inCart
                        ? "Produto já adicionado"
                        : "Adicionar ao carrinho"
                    }
                  >
                    {inCart ? (
                      <>
                        <FiCheck size={16} /> Adicionado
                      </>
                    ) : (
                      "Adicionar ao carrinho"
                    )}
                  </Button>

                  {inCart && (
                    <Button
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

      {/* Modal de Imagem */}
      {modalImage && (
        <div
          onClick={handleModalClick}
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 cursor-pointer"
        >
          <img
            src={modalImage}
            alt="Imagem ampliada do produto"
            className="max-w-full max-h-full rounded shadow-lg"
          />
        </div>
      )}
    </section>
  );
}
