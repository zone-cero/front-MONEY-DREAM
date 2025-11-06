"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cart/cartSlice"
import { useParams, useRouter } from "next/navigation"

// Mock product data - in real app, fetch from API
const getProductById = (id: string) => {
  const products = {
    "1": {
      id: "1",
      name: "Nike Air Max 2024",
      price: 129.99,
      image: "/nike-air-max-sneakers-white-blue.jpg",
      images: [
        "/nike-air-max-sneakers-white-blue.jpg",
        "/adidas-ultraboost-running-shoes.jpg",
        "/premium-white-cotton-t-shirt.jpg",
        "/black-athletic-pants.jpg",
      ],
      category: "Tenis",
      stock: 15,
      description:
        "Los Nike Air Max 2024 combinan estilo y comodidad con tecnología de amortiguación Air visible. Perfectos para uso diario o deportivo.",
      sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
      colors: ["Blanco/Azul", "Negro/Rojo", "Gris/Verde"],
      rating: 4.5,
      reviews: 128,
    },
    "2": {
      id: "2",
      name: "Playera Premium Cotton",
      price: 29.99,
      image: "/premium-white-cotton-t-shirt.jpg",
      images: [
        "/premium-white-cotton-t-shirt.jpg",
        "/black-oversized-t-shirt.jpg",
        "/nike-air-max-sneakers-white-blue.jpg",
        "/black-athletic-pants.jpg",
      ],
      category: "Playeras",
      stock: 8,
      description:
        "Playera de algodón 100% premium con corte moderno. Suave, transpirable y perfecta para cualquier ocasión.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Blanco", "Negro", "Gris", "Azul Marino"],
      rating: 4.8,
      reviews: 256,
    },
  }
  return products[id as keyof typeof products] || products["1"]
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const product = getProductById(params.id as string)

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const images = product.images || [product.image, product.image, product.image, product.image]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla")
      return
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        size: selectedSize,
        color: selectedColor,
        image: product.image,
      }),
    )

    router.push("/cart")
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-52 pb-20 px-4  md:pl-20 md:pr-20">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <span className="hover:text-foreground cursor-pointer">Inicio</span>
            <span>/</span>
            <span className="hover:text-foreground cursor-pointer">{product.category}</span>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group">
                <Image
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 cursor-pointer hover:scale-105"
                  onClick={() => setIsModalOpen(true)}
                />
                {product.stock < 10 && product.stock > 0 && (
                  <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground z-10">
                    Solo {product.stock} disponibles
                  </Badge>
                )}

                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <ZoomIn className="h-5 w-5" />
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background cursor-pointer p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background cursor-pointer p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium z-10">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer border-2 transition-all duration-300 ${
                      currentImageIndex === i
                        ? "border-primary scale-95"
                        : "border-transparent hover:border-primary/50 hover:scale-95"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{product.category}</p>
                  <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reseñas)
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="font-semibold mb-3">Color: {selectedColor}</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md border-2 transition-colors ${
                        selectedColor === color
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <p className="font-semibold mb-3">Talla</p>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-md border-2 transition-colors ${
                        selectedSize === size ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="font-semibold mb-3">Cantidad</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 mb-8">
                <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Agregar al carrito
                </Button>
                <Button size="lg" variant="outline">
                  Comprar ahora
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Envío gratis</p>
                    <p className="text-xs text-muted-foreground">En compras +$50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Compra segura</p>
                    <p className="text-xs text-muted-foreground">100% protegida</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Devoluciones</p>
                    <p className="text-xs text-muted-foreground">30 días gratis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mb-20">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="specs">Especificaciones</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Descripción del producto</h3>
                <p className="text-muted-foreground">{product.description}</p>
                <p className="text-muted-foreground mt-4">
                  Este producto ha sido diseñado con los más altos estándares de calidad. Cada detalle ha sido
                  cuidadosamente pensado para ofrecerte la mejor experiencia posible.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Especificaciones técnicas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Material</p>
                    <p className="font-medium">100% Premium</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Cuidado</p>
                    <p className="font-medium">Lavar a máquina</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Origen</p>
                    <p className="font-medium">Importado</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Garantía</p>
                    <p className="font-medium">1 año</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Reseñas de clientes</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-semibold text-primary">U{i}</span>
                          </div>
                          <div>
                            <p className="font-medium">Usuario {i}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Hace {i} semana{i > 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        Excelente producto, muy buena calidad y el envío fue rápido. Totalmente recomendado.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-xl">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full p-2 transition-all z-20"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Main image with zoom */}
            <div
              className={`relative w-full h-full flex items-center justify-center cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? "scale-150 cursor-zoom-out" : ""
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            </div>

            {/* Navigation arrows in modal */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background  p-4 transition-all duration-300 hover:scale-110 z-20"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background  p-4 transition-all duration-300 hover:scale-110 z-20"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            {/* Image counter in modal */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-6 py-3 text-lg font-medium z-20">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Thumbnail navigation in modal */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(i)
                  }}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentImageIndex === i ? "border-primary scale-110" : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <Image src={img || "/placeholder.svg"} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
