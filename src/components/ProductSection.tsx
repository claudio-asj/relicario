import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { fetchProducts, getCategories, type Product } from "@/utils/products";
import { useCart } from "@/contexts/CartContext";
import { FiCheck, FiTrash2 } from "react-icons/fi";
import {
  GiLargeDress,
  GiPearlNecklace,
  GiShirt,
  GiUnderwearShorts,
} from "react-icons/gi";
import { PiPantsFill, PiSneakerFill } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";

const baseCategories = ["Camisas", "Vestidos", "Blazers", "Calças"];
const categoryIcons: Record<string, JSX.Element> = {
  Casacos: <GiShirt size={18} />,
  Vestidos: <GiLargeDress size={18} />,
  Acessórios: <GiPearlNecklace size={18} />,
  Calças: <PiPantsFill size={18} />,
  Shorts: <GiUnderwearShorts size={18} />,
  Calçados: <PiSneakerFill size={18} />,
  Outros: <IoIosMore size={18} />,
};

export function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "Outros") {
      return !baseCategories.includes(p.category?.trim() || "");
    }
    return p.category?.trim() === selectedCategory;
  });

  function openProductModal(product: Product) {
    setSelectedProduct(product);
    setSelectedImage(product.image);
  }

  return (
    <section className="px-4 py-20 max-w-7xl mx-auto" id="produtos">
      {/* Filtros */}
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
              {/* Imagem do produto */}
              <img
                src={(product.image)}
                alt={product.name}
                loading="lazy"
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => openProductModal(product)}
              />

              {/* Tags */}
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
                  className="text-lg font-semibold line-clamp-2 overflow-hidden"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <p
                  className="text-muted-foreground line-clamp-3 overflow-hidden"
                  title={product.description}
                >
                  {product.description}
                </p>
                <p className="text-primary text-lg font-bold mt-auto pt-2">
                  {product.price}
                </p>

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

      {/* Modal com Galeria */}
      {selectedProduct && (
        <Dialog
          open={!!selectedProduct}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedProduct(null);
              setSelectedImage(null);
            }
          }}
        >
          <DialogContent className="max-w-3xl w-full">
            <div className="flex flex-col items-center">
              {/* Imagem principal */}
              <img
                src={selectedImage ?? selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full max-h-[500px] object-contain rounded-lg"
              />

              {/* Miniaturas */}
              <div className="flex gap-3 mt-4">
                {[selectedProduct.image, selectedProduct.image2, selectedProduct.image3]
                  .filter(Boolean)
                  .map((img, i) => (
                    <img
                      key={i}
                      src={img!}
                      alt={`Miniatura ${i + 1}`}
                      onClick={() => setSelectedImage(img!)}
                      className={`h-20 w-20 object-cover rounded-md cursor-pointer border-2 ${
                        selectedImage === img
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    />
                  ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
