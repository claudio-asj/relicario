import { Menu, Codesandbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Codesandbox className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight text-foreground">
            Relicário
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Home</a>
          <a href="#produtos" className="hover:text-foreground transition-colors">Produtos</a>
          <a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a>
          <a href="#contato" className="hover:text-foreground transition-colors">Contato</a>
        </nav>

        {/* CTA WhatsApp */}
        <div className="hidden md:block">
          <Button onClick={() => window.open('https://wa.me/SEUNUMERO', '_blank')} variant="default">
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
            <a href="#" className="hover:text-foreground">Home</a>
            <a href="#produtos" className="hover:text-foreground">Produtos</a>
            <a href="#sobre" className="hover:text-foreground">Sobre</a>
            <a href="#contato" className="hover:text-foreground">Contato</a>
            <Button
              onClick={() => window.open('https://wa.me/SEUNUMERO', '_blank')}
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