"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { SkeletonProductGrid } from "@/components/skeleton-card"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/hooks"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const mockProducts = [
  {
    id: "1",
    name: "Nike Air Max 2024",
    price: 129.99,
    image: "/nike-air-max-sneakers-white-blue.jpg",
    category: "Tenis",
    stock: 15,
  },
  {
    id: "2",
    name: "Playera Premium Cotton",
    price: 29.99,
    image: "/premium-white-cotton-t-shirt.jpg",
    category: "Playeras",
    stock: 8,
  },
  {
    id: "3",
    name: "Pantalón Deportivo Pro",
    price: 59.99,
    image: "/black-athletic-pants.jpg",
    category: "Pantalones",
    stock: 20,
  },
  {
    id: "4",
    name: "Adidas Ultraboost",
    price: 149.99,
    image: "/adidas-ultraboost-running-shoes.jpg",
    category: "Tenis",
    stock: 5,
  },
  {
    id: "5",
    name: "Playera Oversize Negra",
    price: 34.99,
    image: "/black-oversized-t-shirt.jpg",
    category: "Playeras",
    stock: 12,
  },
  {
    id: "6",
    name: "Jeans Slim Fit",
    price: 69.99,
    image: "/blue-slim-fit-jeans.jpg",
    category: "Pantalones",
    stock: 18,
  },
  {
    id: "7",
    name: "Puma RS-X",
    price: 119.99,
    image: "/puma-rs-x-sneakers-colorful.jpg",
    category: "Tenis",
    stock: 7,
  },
  {
    id: "8",
    name: "Playera Polo Clásica",
    price: 39.99,
    image: "/navy-blue-polo-shirt.jpg",
    category: "Playeras",
    stock: 25,
  },
  {
    id: "9",
    name: "Pantalón Cargo",
    price: 64.99,
    image: "/khaki-cargo-pants.jpg",
    category: "Pantalones",
    stock: 14,
  },
  {
    id: "10",
    name: "Converse Chuck Taylor",
    price: 79.99,
    image: "/converse-chuck-taylor-black.jpg",
    category: "Tenis",
    stock: 22,
  },
  {
    id: "11",
    name: "Playera Gráfica Vintage",
    price: 32.99,
    image: "/vintage-graphic-t-shirt.jpg",
    category: "Playeras",
    stock: 9,
  },
  {
    id: "12",
    name: "Pantalón Chino",
    price: 54.99,
    image: "/beige-chino-pants.png",
    category: "Pantalones",
    stock: 16,
  },
]

export default function HomePage() {
  const { isLoading } = useAppSelector((state) => state.products)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-50 pb-32 px-4 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/elegant-fashion-store-interior-with-modern-minimal.jpg"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-6 text-balance tracking-tight">
              Moda que define tu estilo
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Descubre nuestra colección exclusiva de tenis, playeras y pantalones. Calidad premium, diseños únicos.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 md:pl-20 md:pr-20 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-2">Productos destacados</h2>
              <p className="text-muted-foreground text-sm">Lo mejor de nuestra colección</p>
            </div>
            <Button variant="ghost" className="text-xs uppercase tracking-wide">
              Ver todos
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </div>

          {isLoading ? (
            <SkeletonProductGrid />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4  md:pl-20 md:pr-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-2">Explora por categoría</h2>
            <p className="text-muted-foreground text-sm">Encuentra exactamente lo que buscas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-muted cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-serif font-light text-white mb-2">Tenis</h3>
                <p className="text-white/80 text-sm mb-4">Estilo y comodidad</p>
                <Button variant="secondary" size="sm" className="text-xs uppercase tracking-wide">
                  Ver más
                </Button>
              </div>
            </div>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-muted cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-serif font-light text-white mb-2">Playeras</h3>
                <p className="text-white/80 text-sm mb-4">Diseños únicos</p>
                <Button variant="secondary" size="sm" className="text-xs uppercase tracking-wide">
                  Ver más
                </Button>
              </div>
            </div>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-muted cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-serif font-light text-white mb-2">Pantalones</h3>
                <p className="text-white/80 text-sm mb-4">Calidad premium</p>
                <Button variant="secondary" size="sm" className="text-xs uppercase tracking-wide">
                  Ver más
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-primary-foreground">
            Únete a nuestra comunidad
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Recibe ofertas exclusivas, nuevos lanzamientos y contenido especial
          </p>
          <Button size="lg" variant="secondary" className="uppercase tracking-wide">
            Crear cuenta gratis
          </Button>
        </div>
      </section> */}

      <Footer />
    </div>
  )
}
