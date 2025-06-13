export type Product = {
  id: number
  name: string
  category: string
  price: string
  image: string
  image2?: string
  image3?: string
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
  image2?: string
  image3?: string
  description: string
  available: string
  onSale: string
}
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "https://opensheet.elk.sh/1aw8u9OI_wXvCWpiP2Q4GZu21Aieh4CySpwwDRhHx8DA/produtos"
    );
    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data: RawProduct[] = await res.json();

    return data
      .map((item): Product | null => {
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
          return null;
        }

        return {
          id: Number(item.id),
          name: item.name.trim(),
          category: item.category.trim(),
          price: item.price.trim(),
          image: item.image.trim(),
          image2: item.image2?.trim() || "",
          image3: item.image3?.trim() || "",
          description: item.description.trim(),
          available: item.available.toLowerCase() === "true",
          onSale: item.onSale.toLowerCase() === "true",
        };
      })
      .filter((prod): prod is Product => prod !== null);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}


export function getCategories(
  products: { category?: string | null }[],
  baseCategories: string[]
): string[] {
  const trimmedCategories = products
    .map((p) => p.category?.trim())
    .filter((c): c is string => !!c);

  const uniqueCategories = Array.from(new Set(trimmedCategories));

  const foundBaseCategories = baseCategories.filter((cat) =>
    uniqueCategories.includes(cat)
  );

  const hasOthers = uniqueCategories.some(
    (cat) => !baseCategories.includes(cat)
  );

  return hasOthers ? [...foundBaseCategories, "Outros"] : foundBaseCategories;
}
