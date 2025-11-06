"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  stock: number
}

export function ProductCard({ id, name, price, image, category, stock }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="block h-full">
      {/* Tarjeta general */}
      <Card className="group flex flex-col h-full border overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-lg">

        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges de stock */}
          {stock < 10 && stock > 0 && (
            <Badge
              className="absolute top-[6px] right-[6px] bg-destructive text-destructive-foreground z-10 shadow-sm"
              style={{
                borderTopRightRadius: "0.5rem", // coincide con el radio del Card
              }}
            >
              Últimas unidades
            </Badge>
          )}
          {stock === 0 && (
            <Badge
              className="absolute top-[6px] right-[6px] bg-muted text-muted-foreground z-10 shadow-sm"
              style={{
                borderTopRightRadius: "0.5rem",
              }}
            >
              Agotado
            </Badge>
          )}
        </div>

        {/* Contenido */}
        <CardContent className="p-4 flex-grow">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{category}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>
          <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="mb-5">
          <Button
            className="w-full sm:w-auto sm:px-4" // Cambia el ancho en sm y añade padding para icono
            disabled={stock === 0}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-0 sm:mr-2" />
            <span className="sr-only sm:not-sr-only sm:inline">
              Agregar al carrito
            </span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
