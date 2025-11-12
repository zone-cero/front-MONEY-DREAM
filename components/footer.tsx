import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, MapPin, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800">
      
      {/* Sección Superior con Fondo Limón */}
      <div className="bg-[#99ff5e] dark:bg-yellow-950/20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            
            {/* Brand & Social - Columna principal */}
            <div className="md:col-span-5">
              <Link href="/" className="inline-block mb-4">
                <div className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  MONEY DREAM
                </div>
                <div className="h-px w-12 bg-neutral-900 dark:bg-white mt-1"></div>
              </Link>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs mb-6">
                Estilo atemporal y calidad superior. Descubre tu próxima pieza esencial.
              </p>
              
              <div className="flex gap-3">
                <Link href="#" className="p-2 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white transition-colors">
                  <Facebook className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                </Link>
                <Link href="#" className="p-2 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white transition-colors">
                  <Instagram className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                </Link>
                <Link href="#" className="p-2 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white transition-colors">
                  <Twitter className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                </Link>
              </div>
            </div>

            {/* Links rápidos */}
            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                Tienda
              </h3>
              <ul className="space-y-2">
                <li><FooterLink href="/productos">Productos</FooterLink></li>
                <li><FooterLink href="/categorias/tenis">Tenis</FooterLink></li>
                <li><FooterLink href="/categorias/playeras">Playeras</FooterLink></li>
                <li><FooterLink href="/ofertas">Ofertas</FooterLink></li>
              </ul>
            </div>

            {/* Servicio */}
            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                Servicio
              </h3>
              <ul className="space-y-2">
                <li><FooterLink href="/ayuda">Ayuda</FooterLink></li>
                <li><FooterLink href="/envios">Envíos</FooterLink></li>
                <li><FooterLink href="/tallas">Tallas</FooterLink></li>
                <li><FooterLink href="/terminos">Legal</FooterLink></li>
              </ul>
            </div>

            {/* Newsletter - A la derecha */}
            <div className="md:col-span-3">
              <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                Newsletter
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Novedades y ofertas exclusivas
              </p>
              
              <form className="flex gap-2 mb-6" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-grow rounded-none border-neutral-300 dark:border-neutral-700 h-10 text-sm bg-transparent"
                />
                <Button type="submit" className="rounded-none h-10 w-10 p-0 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900">
                  <Send className="h-4 w-4" />
                </Button>
              </form>

              {/* Contacto */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Mail className="h-3.5 w-3.5" />
                  <span>hola@moneydream.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Ciudad de México</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Negro sólido */}
      <div className="bg-neutral-900 dark:bg-neutral-950">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-400">
              2025 MONEY DREAM. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <FooterLink href="/privacidad" className="text-xs text-neutral-400 hover:text-white">
                Privacidad
              </FooterLink>
              <FooterLink href="/cookies" className="text-xs text-neutral-400 hover:text-white">
                Cookies
              </FooterLink>
              <FooterLink href="/mapa-sitio" className="text-xs text-neutral-400 hover:text-white">
                Mapa
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link
    href={href}
    className={`text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors ${className}`}
  >
    {children}
  </Link>
)