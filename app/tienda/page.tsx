// app/(frontend)/shop/page.tsx
"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
// import { Breadcrumbs } from "@/components/breadcrumbs"
import { cn } from "@/lib/utils"
import { 
  Search, 
  Filter, 
  Grid3x3, 
  List,
  ChevronRight,
  X,
  ShoppingBag
} from "lucide-react"
import { toast } from "sonner"

const shopConfig = {
  title: "Colección",
  filters: {
    all: "Todos",
    ropa: "Ropa",
    calzado: "Calzado",
    accesorios: "Accesorios",
  },
  sortOptions: [
    { value: "featured", label: "Destacados" },
    { value: "price-low", label: "Precio: Menor" },
    { value: "price-high", label: "Precio: Mayor" },
    { value: "newest", label: "Más Nuevos" },
  ]
}

const PRODUCTS = [
  { id: "1", name: "Playera Minimal", price: 890, image: "/product-1.jpg", category: "ropa", badge: "Nuevo" },
  { id: "2", name: "Zapatillas Urban", price: 3200, image: "/product-2.jpg", category: "calzado" },
  { id: "3", name: "Bolso Crossbody", price: 1500, image: "/product-3.jpg", category: "accesorios", badge: "Limited" },
]

export default function ShopPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [view, setView] = useState<"grid" | "list">("grid")

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero mini */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter">
            {shopConfig.title}
          </h1>
          <p className="text-sm text-gray-400 tracking-wider uppercase">
            Seleción curada de piezas atemporales
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      {/* <div className="max-w-7xl mx-auto px-6 py-6">
        <Breadcrumbs links={[{ href: "/", label: "Inicio" }, { label: "Tienda" }]} />
      </div> */}

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-24 flex gap-12">
        
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-fit">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 border-gray-100"
              />
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Categoría
              </h3>
              {Object.entries(shopConfig.filters).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={cn(
                    "w-full text-left py-2 text-sm transition-colors",
                    selectedCategory === key ? "text-neutral-900 font-medium" : "text-gray-400 hover:text-neutral-900"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 space-y-8">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              {filteredProducts.length} productos
            </p>
            
            <div className="flex items-center gap-3">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {shopConfig.sortOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border border-gray-100 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setView("grid")}
                  className={cn(view === "grid" && "bg-neutral-900 text-white")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setView("list")}
                  className={cn(view === "list" && "bg-neutral-900 text-white")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-76 p-6">
                  <h3 className="text-sm font-medium mb-4">Filtros</h3>
                  {/* Mismos filtros que desktop */}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Products Grid */}
          <div className={cn(
            "grid gap-6",
            view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}>
            {filteredProducts.map(product => (
              <Card key={product.id} className="group border-0 shadow-none hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className={`${view === "grid" ? "aspect-square" : "aspect-[16/10]"} relative overflow-hidden`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-lime-400 text-neutral-900 text-[10px] tracking-wider">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className={cn(
                      "font-light tracking-tight",
                      view === "grid" ? "text-lg" : "text-2xl"
                    )}>
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium text-neutral-900">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" className="w-full rounded-none" asChild>
                      <Link href={`/product/${product.id}`}>
                        Ver detalle <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}