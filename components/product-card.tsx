"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  stock: number
}

// Define categorías relevantes para mostrar
const RELEVANT_CATEGORIES = ["Nuevo", "Oferta", "Exclusivo", "Limitado", "Popular"]

export function ProductCard({ id, name, price, image, category, stock }: ProductCardProps) {
  const showCategory = RELEVANT_CATEGORIES.includes(category)
  const isOutOfStock = stock === 0
  const isLowStock = stock < 10 && stock > 0

  return (
    <Link href={`/products/${id}`} className="block h-full">
      <Card className="group flex flex-col h-full border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-none bg-white">
        
        {/* Contenedor de imagen */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges de stock - esquinas cuadradas y posición superior derecha */}
          {isLowStock && (
            <Badge className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-medium rounded-none z-10 shadow-sm">
              Últimas unidades
            </Badge>
          )}
          {isOutOfStock && (
            <Badge className="absolute top-0 right-0 bg-gray-200 text-gray-700 px-3 py-1 text-xs font-medium rounded-none z-10 shadow-sm">
              Agotado
            </Badge>
          )}
        </div>

        {/* Contenido principal */}
        <CardContent className="p-5 flex-grow">
          {/* Categoría condicional */}
          {showCategory && (
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">
              {category}
            </p>
          )}
          
          {/* Nombre del producto */}
          <h3 className="font-semibold text-lg mb-3 text-gray-900 leading-snug line-clamp-2">
            {name}
          </h3>
          
          {/* Precio */}
          <p className="text-2xl font-bold text-black tracking-tight">
            ${price.toFixed(2)}
          </p>
        </CardContent>

        {/* Footer con botón */}
        <CardFooter className="p-5 pt-0 pb-6"> {/* Padding extra abajo para la sombra */}
          <Button
            className={cn(
              "relative w-full h-12 bg-black text-white hover:bg-black font-medium",
              "transition-all duration-300 ease-in-out rounded-none cursor-pointer",
              "hover:shadow-[0_3px_0_0_#84ff00] hover:-translate-y-0.5", // Efecto de línea inferior lime
              isOutOfStock && "opacity-50 cursor-not-allowed hover:shadow-none hover:translate-y-0"
            )}
            disabled={isOutOfStock}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log("Añadir al carrito:", id)
            }}
          >
            <span className="flex items-center justify-center w-full h-full">
              <ShoppingCart className="h-5 w-5 flex-shrink-0" />
              <span className="ml-2 text-sm font-medium hidden sm:inline">
                Agregar al carrito
              </span>
            </span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}