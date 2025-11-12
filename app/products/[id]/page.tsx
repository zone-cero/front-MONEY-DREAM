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
  Check,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cart/cartSlice"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  price: number
  image: string
  images: string[]
  category: string
  stock: number
  description: string
  sizes: string[]
  colors: string[]
  rating: number
  reviews: number
}

const mockProducts: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Nike Air Max 2024",
    price: 129.99,
    image: "/nike-air-max-sneakers-white-blue.jpg",
    images: [
      "/nike-air-max-sneakers-white-blue.jpg",
      "/nike-air-max-sneakers-white-blue2.png",
      "/nike-air-max-sneakers-white-blue3.png",
      "/nike-air-max-sneakers-white-blue4.png",
      "/nike-air-max-sneakers-white-blue5.png",
    ],
    category: "Tenis",
    stock: 3,
    description: "Los Nike Air Max 2024 combinan estilo y comodidad con tecnología de amortiguación Air visible. Perfectos para uso diario o deportivo.",
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
    images: ["/premium-white-cotton-t-shirt.jpg"],
    category: "Playeras",
    stock: 8,
    description: "Playera de algodón 100% premium con corte moderno. Suave, transpirable y perfecta para cualquier ocasión.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Blanco", "Negro", "Gris", "Azul Marino"],
    rating: 4.8,
    reviews: 256,
  },
}

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 px-4">
      <div className="space-y-4">
        <div className="aspect-square bg-gray-100 animate-pulse rounded-none relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lime-400/10 to-transparent animate-shimmer" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-none" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-20 bg-gray-100 animate-pulse rounded-none" />
        <div className="h-8 w-3/4 bg-gray-100 animate-pulse rounded-none" />
        <div className="h-6 w-24 bg-gray-100 animate-pulse rounded-none" />
        <div className="h-20 w-full bg-gray-100 animate-pulse rounded-none" />
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      const found = mockProducts[params.id as string] || mockProducts["1"]
      setProduct(found)
      setSelectedColor(found.colors[0])
      setLoading(false)
    }, 600)
  }, [params.id])

  const images = product?.images || [product?.image || "/placeholder.svg"]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (images?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (images?.length || 1)) % (images?.length || 1))
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Por favor selecciona una talla")
      return
    }

    if (!product) return

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
    }))

    setIsAdded(true)
    toast.success("Producto añadido al carrito")
    
    setTimeout(() => {
      router.push("/cart")
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 md:pt-32 lg:pt-52 pb-8 md:pb-20 px-4 max-w-7xl mx-auto">
          <ProductSkeleton />
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Header />
        <div className="text-center space-y-4 px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Producto no encontrado</h1>
          <Button onClick={() => router.push("/")} className="rounded-none">
            Volver al inicio
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
      
      <Header />

      <main className="pt-24 md:pt-32 lg:pt-52 pb-8 md:pb-20 px-4 max-w-7xl mx-auto">
        {/* Breadcrumb - Reducido en móvil */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-6 md:mb-12">
          <button onClick={() => router.push("/")} className="hover:text-gray-900 transition-colors">
            Inicio
          </button>
          <span className="text-gray-400">/</span>
          <button onClick={() => router.push(`/${product.category.toLowerCase()}`)} className="hover:text-gray-900 transition-colors">
            {product.category}
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        {/* Grid principal - Menos gap en móvil */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-24">
          {/* Product Images */}
          <section className="space-y-4 md:space-y-6">
            <div className="relative aspect-square overflow-hidden bg-gray-50 group rounded-none">
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-300 cursor-zoom-in hover:scale-105"
                onClick={() => setIsModalOpen(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Stock Badge */}
              {product.stock < 10 && product.stock > 0 && (
                <Badge className="absolute top-3 md:top-4 right-3 md:right-4 border-2 border-lime-400 text-lime-500 bg-lime-50 px-2 md:px-3 py-1 text-xs md:text-sm font-semibold rounded-none z-10 animate-pulse">
                  Solo {product.stock} disponibles
                </Badge>
              )}

              {/* Zoom Icon - Oculto en móvil */}
              <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-white/90 backdrop-blur p-2 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                <ZoomIn className="h-4 w-4 text-gray-900" />
              </div>

              {/* Navigation - Siempre visibles en móvil */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-lime-400 p-2 md:p-3 rounded-none opacity-100 md:opacity-0 group-hover:md:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-900" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-lime-400 p-2 md:p-3 rounded-none opacity-100 md:opacity-0 group-hover:md:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-900" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 bg-lime-50 px-2 md:px-3 py-1 text-xs font-semibold text-lime-600 rounded-none border border-lime-200">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-2 md:gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={cn(
                    "relative aspect-square overflow-hidden bg-gray-50 rounded-none border-2 transition-all duration-300",
                    currentImageIndex === i 
                      ? "border-lime-400 opacity-100 shadow-sm shadow-lime-400/20" 
                      : "border-transparent opacity-70 hover:opacity-100 hover:border-lime-400 hover:scale-95"
                  )}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Product Info - Menos espacio entre elementos en móvil */}
          <section className="space-y-6 md:space-y-8">
            {/* Header */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-2 md:mb-3 font-medium">
                {product.category}
              </p>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3 md:mb-4 leading-tight tracking-tight">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        i < Math.floor(product.rating) 
                          ? "fill-lime-400 text-lime-400" 
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {product.rating.toFixed(1)} · {product.reviews} reseñas
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                ${product.price.toFixed(2)}
              </span>
              {product.stock < 10 && (
                <span className="text-sm text-lime-600 font-semibold animate-pulse">
                  · Stock bajo
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 md:mb-3 tracking-wide">
                Color: <span className="font-normal text-gray-600">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-none border transition-all duration-200",
                      selectedColor === color
                        ? "border-lime-400 text-lime-600 bg-lime-50"
                        : "border-gray-300 hover:border-lime-400 text-gray-700"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 md:mb-3 tracking-wide">
                Talla
              </label>
              <div className="grid grid-cols-5 gap-1 md:gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-2 md:py-3 text-xs md:text-sm font-medium rounded-none border transition-all duration-200",
                      selectedSize === size
                        ? "border-lime-400 text-lime-600 bg-lime-50"
                        : "border-gray-300 hover:border-lime-400 text-gray-700"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 md:mb-3 tracking-wide">
                Cantidad
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="rounded-none border border-gray-300 hover:border-lime-400 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors"
                >
                  <span className="text-lg font-bold text-gray-900">−</span>
                </Button>
                <span className="text-lg md:text-xl font-bold w-8 md:w-12 text-center text-gray-900">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="rounded-none border border-gray-300 hover:border-lime-400 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors"
                >
                  <span className="text-lg font-bold text-gray-900">+</span>
                </Button>
                <span className="text-xs md:text-sm text-gray-500 ml-2">
                  {product.stock} disponibles
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 md:gap-3 pt-4">
              <Button
                size="lg"
                className={cn(
                  "flex-1 h-12 md:h-14 text-sm md:text-base font-medium rounded-none transition-all duration-300",
                  "bg-gray-900 text-white hover:bg-lime-400 hover:text-gray-900 hover:-translate-y-0.5",
                  isAdded && "bg-lime-400 text-gray-900"
                )}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {isAdded ? (
                  <Check className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                ) : (
                  <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                )}
                {isAdded ? "¡Añadido!" : "Agregar al carrito"}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-12 md:h-14 md:w-14 rounded-none border-2 border-gray-900 hover:border-lime-400 hover:text-lime-600 transition-all duration-200"
                aria-label="Añadir a favoritos"
              >
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-12 md:h-14 md:w-14 rounded-none border-2 border-gray-900 hover:border-lime-400 hover:text-lime-600 transition-all duration-200"
                aria-label="Compartir"
                onClick={() => {
                  navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href,
                  }).catch(() => toast.info("Copia el enlace para compartir"))
                }}
              >
                <Share2 className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>

            {/* Buy Now */}
            <Button
              variant="secondary"
              size="lg"
              className="w-full h-12 md:h-14 text-sm md:text-base font-medium rounded-none border border-gray-300 hover:border-lime-400 hover:text-lime-600 transition-all duration-200"
              onClick={() => {
                handleAddToCart()
                router.push("/checkout")
              }}
            >
              Comprar ahora
            </Button>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-none hover:bg-lime-50 transition-colors">
                <Truck className="h-4 w-4 md:h-5 md:w-5 text-lime-500 flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">Envío gratis</p>
                  <p className="text-xs text-gray-500">En compras +$50</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-none hover:bg-lime-50 transition-colors">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-lime-500 flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">Compra segura</p>
                  <p className="text-xs text-gray-500">100% protegida</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-none hover:bg-lime-50 transition-colors">
                <RotateCcw className="h-4 w-4 md:h-5 md:w-5 text-lime-500 flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">Devoluciones</p>
                  <p className="text-xs text-gray-500">30 días gratis</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Tabs - Mejor responsive */}
        <section className="mt-12 md:mt-24">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent">
              <TabsTrigger 
                value="description" 
                className="rounded-none border-b-2 border-gray-200 data-[state=active]:border-lime-400 data-[state=active]:bg-transparent text-xs md:text-sm"
              >
                Descripción
              </TabsTrigger>
              <TabsTrigger 
                value="specs" 
                className="rounded-none border-b-2 border-gray-200 data-[state=active]:border-lime-400 data-[state=active]:bg-transparent text-xs md:text-sm"
              >
                Especificaciones
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-gray-200 data-[state=active]:border-lime-400 data-[state=active]:bg-transparent text-xs md:text-sm"
              >
                Reseñas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6 md:mt-8">
              <div className="prose max-w-none">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900">Descripción del producto</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
                <p className="text-gray-600 leading-relaxed mt-3 md:mt-4 text-sm md:text-base">
                  Este producto ha sido diseñado con los más altos estándares de calidad. Cada detalle ha sido cuidadosamente pensado para ofrecerte la mejor experiencia posible. Disfruta de la combinación perfecta entre funcionalidad y estilo.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6 md:mt-8">
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900">Especificaciones técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-lime-50 rounded-none border-l-2 border-lime-400">
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Material</p>
                    <p className="font-medium text-gray-900 text-sm md:text-base">100% Premium</p>
                  </div>
                  <div className="p-3 md:p-4 bg-lime-50 rounded-none border-l-2 border-lime-400">
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Cuidado</p>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Lavar a máquina</p>
                  </div>
                  <div className="p-3 md:p-4 bg-lime-50 rounded-none border-l-2 border-lime-400">
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Origen</p>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Importado</p>
                  </div>
                  <div className="p-3 md:p-4 bg-lime-50 rounded-none border-l-2 border-lime-400">
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Garantía</p>
                    <p className="font-medium text-gray-900 text-sm md:text-base">1 año</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 md:mt-8">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">Reseñas de clientes</h3>
                <div className="space-y-3 md:space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 md:p-4 rounded-none border-l-2 border-lime-400 bg-lime-50">
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-none bg-lime-100 flex items-center justify-center text-xs md:text-sm font-bold text-gray-900">
                            U{i}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm md:text-base">Usuario {i}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className="h-3 w-3 fill-lime-400 text-lime-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          Hace {i} semana{i > 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm md:text-base">
                        Excelente producto, muy buena calidad y el envío fue rápido. Totalmente recomendado.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-white/95 backdrop-blur-xl rounded-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/90 hover:bg-lime-400 p-2 rounded-none z-20 transition-all"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 md:h-6 md:w-6 text-gray-900" />
            </button>

            <div
              className={cn(
                "relative w-full h-full flex items-center justify-center cursor-zoom-in transition-transform duration-300",
                isZoomed && "scale-150 cursor-zoom-out"
              )}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-contain p-4 md:p-8"
                sizes="90vw"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-lime-400 p-3 md:p-4 rounded-none transition-all duration-300 hover:scale-110 z-20"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5 md:h-8 md:w-8 text-gray-900" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-lime-400 p-3 md:p-4 rounded-none transition-all duration-300 hover:scale-110 z-20"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-5 w-5 md:h-8 md:w-8 text-gray-900" />
            </button>

            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-lime-50 px-4 md:px-6 py-1 md:py-2 text-xs md:text-sm font-semibold text-lime-600 rounded-none border border-lime-200 z-20">
              {currentImageIndex + 1} / {images.length}
            </div>

            <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(i)
                  }}
                  className={cn(
                    "relative w-12 h-12 md:w-16 md:h-16 overflow-hidden border-2 transition-all duration-300 rounded-none",
                    currentImageIndex === i 
                      ? "border-lime-400 scale-110 opacity-100 shadow-sm shadow-lime-400/20" 
                      : "border-transparent opacity-70 hover:opacity-100 hover:border-lime-400"
                  )}
                >
                  <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
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