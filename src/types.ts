// Define a estrutura de um único produto, conforme pediste.
export type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  available: string;
  onSale: string;
};

// Define a estrutura do nosso contexto do carrinho.
// Ele irá fornecer a lista de produtos e as funções para manipulá-la.
export type CartContextType = {
  cart: Product[]; // O array de produtos no carrinho
  addProduct: (product: Product) => void; // Função para adicionar um produto
  removeProduct: (productId: number) => void; // Função para remover um produto
  cartCount: number; // A quantidade de itens no carrinho
};