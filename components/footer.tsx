import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    // Usa un fondo secundario (claro en modo claro, oscuro en modo oscuro) para distinguirlo del cuerpo principal
    <footer className="bg-muted/40 border-t border-border mt-12">
      <div className="container mx-auto px-4 py-16  md:pl-20 md:pr-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-10 md:gap-8 mb-10">
          
          {/* Brand & Social Section */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              {/* Logo con diseño minimalista */}
              <span className="text-2xl font-extrabold tracking-wider text-foreground transition-colors group-hover:text-primary">
                MONEY DREAM
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Estilo atemporal y calidad superior. Descubre tu próxima pieza esencial con nosotros.
            </p>
            
            {/* Social Media Icons - Minimalista y centrado */}
            <div className="flex gap-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links de Tienda */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-foreground uppercase tracking-wider">Tienda</h3>
            <ul className="space-y-3">
              <li><FooterLink href="/productos">Todos los productos</FooterLink></li>
              <li><FooterLink href="/categorias/tenis">Tenis</FooterLink></li>
              <li><FooterLink href="/categorias/playeras">Playeras</FooterLink></li>
              <li><FooterLink href="/ofertas">Ofertas & Outlet</FooterLink></li>
            </ul>
          </div>

          {/* Servicio al Cliente */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-foreground uppercase tracking-wider">Ayuda</h3>
            <ul className="space-y-3">
              <li><FooterLink href="/ayuda">Centro de ayuda</FooterLink></li>
              <li><FooterLink href="/envios">Envíos y Devoluciones</FooterLink></li>
              <li><FooterLink href="/tallas">Guía de tallas</FooterLink></li>
              <li><FooterLink href="/terminos">Términos Legales</FooterLink></li>
            </ul>
          </div>

          {/* Newsletter Section - Más prominente y moderno */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h3 className="font-bold text-lg mb-5 text-foreground uppercase tracking-wider">
              Recibe las últimas noticias
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sé el primero en saber sobre nuevos lanzamientos y ofertas exclusivas.
            </p>
            
            <form className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="flex-grow border-input bg-background focus-visible:ring-primary"
              />
              <Button type="submit" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>

            {/* Información de Contacto - Sutil */}
            <ul className="space-y-3 mt-8 text-sm">
                <li className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>hola@fashionstore.com</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Ciudad de México, México</span>
                </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Bar - Copyright y Enlaces Legales --- */}
        <div className="pt-8 border-t border-border/70 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground/80">
              © 2025 MONEY DREAM. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <FooterLink href="/privacidad" className="text-muted-foreground/80 hover:text-foreground">
                Privacidad
              </FooterLink>
              <FooterLink href="/cookies" className="text-muted-foreground/80 hover:text-foreground">
                Cookies
              </FooterLink>
              <FooterLink href="/mapa-sitio" className="text-muted-foreground/80 hover:text-foreground">
                Mapa del sitio
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Componente auxiliar para estilos de enlaces consistentes
const FooterLink: React.FC<React.PropsWithChildren<{ href: string, className?: string }>> = ({ href, children, className }) => (
  <Link
    href={href}
    className={`text-base text-muted-foreground hover:text-foreground transition-colors ${className}`}
  >
    {children}
  </Link>
)