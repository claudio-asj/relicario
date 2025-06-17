import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Dialog } from "./ui/dialog";

const whatsappNumber = "5521979317341"; // formato internacional sem + para whatsapp link

export const Footer = () => {
  return (
    <footer className="bg-purple-950 text-white py-8">
      <img src="/logo.svg" alt="logo" className="mx-auto w-40 my-12" />
      <div className="container mx-auto text-center max-w-xl px-4">
        <h2 className="text-2xl font-semibold mb-2">Charme e Desapego</h2>
        <p className="mb-4">
          Bazar/brechó organizado pela Kelly com o objetivo de vender peças para
          pessoas pelo melhor preço possível.
        </p>

        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.instagram.com/seuInstagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/seuFacebook"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com/seuTwitter"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:underline"
          >
            Twitter
          </a>
        </div>

        {/* Botão para abrir modal */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="text-sm underline hover:text-purple-300 mb-8"
              aria-label="Sobre o desenvolvedor"
            >
              Desenvolvido por <strong>CLDev</strong>
            </button>
          </DialogTrigger>

          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
            <DialogContent
              className="fixed top-1/2 left-1/2 max-w-md w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none"
              aria-describedby="developer-description"
            >
              <DialogTitle className="text-xl font-bold mb-4 flex items-center space-x-4">
                <img
                  src="/sua-foto.jpg"
                  alt="Foto de Claudio Junior"
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-950"
                />
                <span>Claudio Junior - Desenvolvedor</span>
              </DialogTitle>

              <DialogDescription
                id="developer-description"
                className="mb-6 text-gray-700"
              >
                Sou desenvolvedor de sistemas web e posso fazer sites como este
                para você. Basta entrar em contato!
              </DialogDescription>

              <div className="flex space-x-4 mb-6">
                {/* Links redes sociais */}
                <a
                  href="https://github.com/claudio-asj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 hover:text-purple-900 underline"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/claudio-junior-537319162"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 hover:text-purple-900 underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/seuTwitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 hover:text-purple-900 underline"
                >
                  Twitter
                </a>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-purple-950 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition"
              >
                Fale comigo
              </a>

              <DialogClose asChild>
                <button
                  aria-label="Fechar modal"
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
                >
                  ✕
                </button>
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </footer>
  );
};
