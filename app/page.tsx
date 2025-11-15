"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { SkeletonProductGrid } from "@/components/skeleton-card"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/hooks"
import { ArrowRight, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image" // Asegúrate de tener esta importación


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


// Configuración centralizada de marcas
const BRANDS = [
  { name: "Nike", logo: "/logo-nike.svg", width: 80, height: 30 },
  { name: "Adidas", logo: "/logo-adidas.svg", width: 80, height: 30 },
  { name: "Puma", logo: "/logo-puma.svg", width: 80, height: 30 },
  { name: "Zara", logo: "/logo-zara.svg", width: 80, height: 30 },
  { name: "H&M", logo: "/logo-hm.svg", width: 80, height: 30 },
  { name: "Levi's", logo: "/logo-levis.svg", width: 80, height: 30 },
  { name: "Converse", logo: "/logo-converse.svg", width: 80, height: 30 },
  { name: "Vans", logo: "/logo-vans.svg", width: 80, height: 30 },
]

// Variante de animación infinita
const carouselVariants = {
  animate: {
    x: [0, -BRANDS.reduce((acc, b) => acc + b.width + 80, 0)],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
}

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
      <section className="relative min-h-screen flex items-center justify-start px-4 md:px-16 lg:px-24 bg-white overflow-hidden">
        {/* Background image - máxima visibilidad, overlay mínimo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/elegant-fashion-store-interior-with-modern-minimal.jpg"
            alt="Hero background"
            fill
            className="object-cover opacity-45 scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/50 to-transparent" />
        </div>

        {/* Línea vertical lime - elemento decorativo único */}
        <div className="absolute left-0 top-0 h-full w-1 bg-lime-400 transform -translate-x-full animate-[slideIn_0.8s_ease-out_forwards]" />

        {/* Contenido - alineado a la izquierda, ultra espaciado */}
        <div className="relative z-10 w-full max-w-4xl ml-0 md:ml-16 lg:ml-24">
          {/* Título - tamaño gigante, tracking mínimo, sin negrita */}
          <h1 className="text-6xl md:text-9xl font-light mb-4 text-gray-900 tracking-tighter leading-none">
            Define tu estilo
          </h1>

          {/* Eslógan - 3 palabras, uppercase, micro tipografía */}
          <p className="text-[10px] md:text-xs text-gray-500 mb-16 tracking-[0.6em] uppercase pl-1">
            Diseño Calidad Estilo
          </p>

          {/* CTA - ghost button con lime hover, ultra minimalista */}
          <Button
            variant="outline"
            className="rounded-none border border-gray-900 text-gray-900 hover:bg-lime-400 hover:border-lime-400 hover:text-gray-900 transition-all duration-300 px-10 py-4 text-[11px] font-medium tracking-widest flex items-center gap-4 group"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="h-px w-8 bg-gray-900 group-hover:w-12 transition-all duration-300" />
            Explorar
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">
              <ChevronRight className="h-4 w-4" />
            </span>
          </Button>
        </div>


        {/* Scroll indicator minimalista - posición fija, micro */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
          <span className="text-[9px] text-gray-500 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gray-300" />
        </div>
      </section>

      {/* Animación CSS para carrusel */}
      <style jsx>{`
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`}</style>

      <style jsx>{`
  @keyframes slideIn {
    to {
      transform: translateX(0);
    }
  }
`}</style>
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
      <section className="py-20 px-4 lg:px-12"> {/* Padding consistente: px-4 para móvil, lg:px-12 para laptop */}
        <div className="container mx-auto">

          {/* Título de la Sección */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-2">Explora por categoría</h2>
            <p className="text-muted-foreground text-sm">Encuentra exactamente lo que buscas</p>
          </div>

          {/* Grid de Categorías */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Tarjeta de Tenis (Banner 1) */}
            <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-muted cursor-pointer">
              {/* Imagen del Banner */}
              <Image
                src="/banner1.png"
                alt="Categoría Tenis"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay de Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              {/* Contenido */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-serif font-light text-white mb-2">Tenis</h3>
                <p className="text-white/80 text-sm mb-4">Estilo y comodidad</p>
                <Button variant="secondary" size="sm" className="text-xs uppercase tracking-wide">
                  Ver más
                </Button>
              </div>
            </div>

            {/* Tarjeta de Playeras (Banner 2) */}
            <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-muted cursor-pointer">
              {/* Imagen del Banner */}
              <Image
                src="/banner2.png"
                alt="Categoría Playeras"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay de Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              {/* Contenido */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-serif font-light text-white mb-2">Playeras</h3>
                <p className="text-white/80 text-sm mb-4">Diseños únicos</p>
                <Button variant="secondary" size="sm" className="text-xs uppercase tracking-wide">
                  Ver más
                </Button>
              </div>
            </div>

            {/* Tarjeta de Pantalones (Banner 3) */}
            <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-muted cursor-pointer">
              {/* Imagen del Banner */}
              <Image
                src="/banner3.png"
                alt="Categoría Pantalones"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay de Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              {/* Contenido */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-serif font-light text-white mb-2">Pantalones</h3>
                <p className="text-white/80 text-sm mb-4">Calidad</p>
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
