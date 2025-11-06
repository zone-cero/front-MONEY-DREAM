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
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-gradient-to-b from-background/90 via-background/60 to-transparent backdrop-blur-lg"
        }`}
    >
      <div className="border-b border-border/30">
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

      <div className="border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-6">
            <Link href="/" className="text-center">
              <h1
                className="text-3xl md:text-4xl font-normal tracking-[0.2em]"
                style={{ color: '#354C6E' }} // <-- Añade esto
              >
                MONEY DREAM
              </h1>   </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Navigation - Left */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/productos" className="text-xs uppercase tracking-wide hover:text-primary transition-colors">
              Tenis
            </Link>
            <Link href="/productos" className="text-xs uppercase tracking-wide hover:text-primary transition-colors">
              Playeras
            </Link>
            <Link href="/productos" className="text-xs uppercase tracking-wide hover:text-primary transition-colors">
              Pantalones
            </Link>
            <Link href="/productos" className="text-xs uppercase tracking-wide hover:text-primary transition-colors">
              Accesorios
            </Link>
          </nav>

          {/* Navigation - Right */}
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            <Link href="/ofertas" className="text-xs uppercase tracking-wide hover:text-primary transition-colors">
              Ofertas
            </Link>
            <Link href="/nosotros" className="text-xs uppercase tracking-wide hover:text-primary transition-colors">
              La Marca
            </Link>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="RECHERCHE"
                className="pl-9 pr-4 h-9 w-48 bg-transparent border-border/50 rounded-[10px] text-xs uppercase tracking-wide placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden ml-auto">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-6 mt-8">
                <Link
                  href="/productos"
                  className="text-sm uppercase tracking-wide hover:text-primary transition-colors"
                >
                  Tenis
                </Link>
                <Link
                  href="/productos"
                  className="text-sm uppercase tracking-wide hover:text-primary transition-colors"
                >
                  Playeras
                </Link>
                <Link
                  href="/productos"
                  className="text-sm uppercase tracking-wide hover:text-primary transition-colors"
                >
                  Pantalones
                </Link>
                <Link
                  href="/productos"
                  className="text-sm uppercase tracking-wide hover:text-primary transition-colors"
                >
                  Accesorios
                </Link>
                <Link href="/ofertas" className="text-sm uppercase tracking-wide hover:text-primary transition-colors">
                  Ofertas
                </Link>
                <Link href="/nosotros" className="text-sm uppercase tracking-wide hover:text-primary transition-colors">
                  La Marca
                </Link>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar..."
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 rounded-[10px]"
                  />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
