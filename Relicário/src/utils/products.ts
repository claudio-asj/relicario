// src/utils/fetchProducts.ts

export type Product = {
  id: number
  name: string
  category: string
  price: string
  image: string
  description: string
  available: boolean
  onSale: boolean
}

type RawProduct = {
  id: string
  name: string
  category: string
  price: string
  image: string
  description: string
  available: string
  onSale: string
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://opensheet.elk.sh/1aw8u9OI_wXvCWpiP2Q4GZu21Aieh4CySpwwDRhHx8DA/produtos");
    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data: RawProduct[] = await res.json();

    return data
      .map((item): Product | null => {
        // Validação básica para evitar dados malformados
        if (
          !item.id ||
          !item.name ||
          !item.category ||
          !item.price ||
          !item.image ||
          !item.description ||
          !item.available ||
          !item.onSale
        ) {
          return null; // descarta produto incompleto
        }

        return {
          id: Number(item.id),
          name: item.name.trim(),
          category: item.category.trim(),
          price: item.price.trim(),
          image: item.image.trim(),
          description: item.description.trim(),
          available: item.available.toLowerCase() === "true",
          onSale: item.onSale.toLowerCase() === "true",
        };
      })
      .filter((prod): prod is Product => prod !== null); // filtra nulls
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

export function getCategories(products: Product[], baseCategories: string[]): string[] {
  // Normaliza as baseCategories para facilitar a comparação (minusculo e trim)
  const normalizedBaseCategories = baseCategories.map(c => c.trim().toLowerCase());
  const allCategories = new Set<string>();

  products.forEach((product) => {
    const categoryOriginal = product.category?.trim() || "";
    const categoryNormalized = categoryOriginal.toLowerCase();

    // Adiciona somente categorias válidas que estão em baseCategories (comparação normalizada)
    if (categoryOriginal && normalizedBaseCategories.includes(categoryNormalized)) {
      allCategories.add(categoryOriginal); // mantém a forma original para exibição
    }
  });

  // Verifica se existe alguma categoria que NÃO está nas baseCategories e que seja válida
  const hasOthers = products.some((product) => {
    const categoryNormalized = (product.category?.trim() || "").toLowerCase();
    return categoryNormalized !== "" && !normalizedBaseCategories.includes(categoryNormalized);
  });

  // Retorna as categorias base + "Outros" caso necessário
  return [...allCategories, ...(hasOthers ? ["Outros"] : [])];
}
