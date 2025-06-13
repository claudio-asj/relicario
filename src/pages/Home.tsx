import { Button } from "@/components/ui/button";

import { ProductSection } from "@/components/ProductSection";

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        {/* Camada de escurecimento com blur para destacar o conteúdo */}
        <div className="absolute inset-0 bg-slate-800/40 backdrop-blur-sm" />

        <div className="relative z-10 text-center px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl font-black text-white md:text-5xl lg:text-6xl leading-tight text-foreground tracking-tight drop-shadow-md">
            A Elegância está nos detalhes
          </h1>

          <p className="text-white/70 text-base md:text-lg lg:text-xl leading-relaxed drop-shadow-sm">
            Descubra peças exclusivas que elevam seu estilo. Design atemporal,
            sofisticação e qualidade impecável.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-5 text-base rounded-xl"
              onClick={() => (window.location.href = "#produtos")}
            >
              Ver Catalogo
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 py-5 text-base rounded-xl border-foreground/20 hover:border-foreground"
              onClick={() => window.open("https://wa.me/SEUNUMERO", "_blank")}
            >
              Fale com a gente
            </Button>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <ProductSection />
    </div>
  );
}
