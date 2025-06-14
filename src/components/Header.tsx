import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        {/* Logo */}
        <img src="/logo.svg" alt="logo marca" className='h-full py-3' />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {/* <a href="#" className="hover:text-foreground transition-colors">Home</a> */}
          <a href="#produtos" className="hover:text-foreground transition-colors">Catalogo de Produtos</a>
          {/* <a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a>
          <a href="#contato" className="hover:text-foreground transition-colors">Contato</a> */}
        </nav>

        {/* CTA WhatsApp */}
        <div className="hidden md:block">
          <Button onClick={() => window.open('https://wa.me/5521980084054', '_blank')} variant="default">
            Fale Conosco
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col gap-4 p-4 text-sm font-medium text-muted-foreground">
            {/* <a href="#" className="hover:text-foreground">Home</a>
            <a href="#produtos" className="hover:text-foreground">Produtos</a>
            <a href="#sobre" className="hover:text-foreground">Sobre</a>
            <a href="#contato" className="hover:text-foreground">Contato</a> */}
            <Button
              onClick={() => window.open('https://wa.me/5521980084054', '_blank')}
              className="w-full"
            >
              WhatsApp
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}