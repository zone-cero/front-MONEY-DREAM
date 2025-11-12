"use client"

import { ShoppingCart, User, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/lib/hooks"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { items } = useAppSelector((state) => state.cart)
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-b from-white to-transparent backdrop-blur-none"
          : "bg-gradient-to-b from-background/90 via-background/60 to-transparent backdrop-blur-lg"
      }`}
    >
      {/* Top bar - Se oculta al hacer scroll */}
      <div
        className={`border-b border-border/30 transition-all duration-500 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0 border-transparent" : "max-h-10 opacity-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-10 gap-4">
            <Link
              href={isAuthenticated ? (user?.role === "admin" ? "/admin" : "/dashboard") : "/login"}
              className="text-xs uppercase tracking-wide hover:text-primary transition-colors"
            >
              MI CUENTA
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                  <ShoppingCart className="h-4 w-4" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {items.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href={isAuthenticated ? (user?.role === "admin" ? "/admin" : "/dashboard") : "/login"}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Logo section - Con botón de hamburguesa a la derecha en móvil */}
      <div
        className={`transition-all duration-500 ${
          scrolled ? "py-3" : "py-6 border-b border-border/30"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between lg:justify-center">
            {/* Logo - centrado en desktop, a la izquierda en móvil */}
            <Link href="/" className="text-center transition-transform duration-500 hover:scale-105 lg:flex lg:justify-center">
              <h1
                className={`font-normal tracking-[0.2em] transition-all duration-500 ${
                  scrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
                }`}
                style={{ color: '#354C6E' }}
              >
                MONEY DREAM
              </h1>
            </Link>

            {/* Mobile menu button - Solo visible en móvil */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full">
                  <nav className="flex flex-col gap-2 mt-8">
                    <NavLink href="/sobre-nosotros">Sobre nosotros</NavLink>
                    <NavLink href="/tienda">Tienda</NavLink>
                    <NavLink href="/contacto">Contacto</NavLink>
                    <NavLink href="/blog">Blog</NavLink>
                    <NavLink href="/catalogo">Catalogo</NavLink>
                    <div className="relative mt-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar..."
                        className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 rounded-[10px] transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Se oculta al hacer scroll y en móvil */}
      <div
        className={`hidden lg:block container mx-auto px-4 md:pl-20 md:pr-20 transition-all duration-500 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-14 opacity-100 border-b border-border/30"
        }`}
      >
        <div className="flex items-center justify-between h-14">
          {/* Navigation - Left */}
          <nav className="hidden lg:flex items-center">
            <DesktopNavLink href="/sobre-nosotros">Sobre nosotros</DesktopNavLink>
            <DesktopNavLink href="/tienda">Tienda</DesktopNavLink>
            <DesktopNavLink href="/contacto">Contacto</DesktopNavLink>
            <DesktopNavLink href="/blog">Blog</DesktopNavLink>
          </nav>

          {/* Navigation - Right */}
          <div className="hidden lg:flex items-center">
            <DesktopNavLink href="/catalogo">CATALOGO</DesktopNavLink>
            <div className="relative ml-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="RECHERCHE"
                className="pl-9 pr-4 h-9 w-48 bg-transparent border-border/50 rounded-[10px] text-xs uppercase tracking-wide placeholder:text-muted-foreground/60 transition-all duration-300 focus:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating icons - Solo se muestran al hacer scroll en desktop */}
      <div
        className={`hidden lg:flex fixed top-4 right-4 z-50 transition-all duration-500 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xl rounded-lg p-2 border border-white/10">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="h-8 w-8 relative text-white hover:bg-white/20">
              <ShoppingCart className="h-4 w-4" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
          <Link href={isAuthenticated ? (user?.role === "admin" ? "/admin" : "/dashboard") : "/login"}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
              <User className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

// Componente para enlaces de navegación desktop con efecto hover lime
const DesktopNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="px-4 py-2 text-xs uppercase tracking-wide text-foreground transition-all duration-200 hover:bg-black hover:text-lime-400"
  >
    {children}
  </Link>
)

// Componente para enlaces de navegación móvil con efecto hover lime
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="px-4 py-3 text-sm uppercase tracking-wide text-foreground border-b border-border/20 transition-all duration-200 hover:bg-black hover:text-lime-400"
  >
    {children}
  </Link>
)