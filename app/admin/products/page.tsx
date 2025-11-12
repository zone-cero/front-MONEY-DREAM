// app/admin/products/page.tsx
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Grid3x3, 
  Table as TableIcon, 
  Plus, 
  Download, 
  Search, 
  MoreVertical,
  TrendingDown,
  Edit3,
  Trash2,
  Filter,
  ChevronLeft,
  Package,
  Tag,
  Star,
  Eye,
  Copy,
  Archive,
  RefreshCw,
  BarChart3
} from "lucide-react"
import Breadcrumbs from "@/components/breadcrumbs"
import { cn } from "@/lib/utils"

// CONFIGURACIÓN CENTRALIZADA
const productsConfig = {
  pageTitle: "Inventario",
  pageDescription: "Gestión de productos y stock",
  buttons: {
    add: "Nuevo Producto",
    export: "Exportar",
    refresh: "Actualizar",
    bulkActions: "Acciones en lote"
  },
  views: {
    table: "Tabla",
    card: "Cards"
  },
  filters: {
    all: "Todos",
    lowStock: "Stock bajo",
    outOfStock: "Sin stock",
    active: "Activos",
    inactive: "Inactivos",
    featured: "Destacados"
  },
  tableHeaders: {
    id: "ID",
    image: "Imagen",
    name: "Producto",
    category: "Categoría",
    price: "Precio",
    stock: "Stock",
    status: "Estado",
    sales: "Ventas",
    date: "Fecha",
    actions: "Acciones"
  },
  stockLabels: {
    low: "Bajo",
    out: "Agotado",
    ok: "Disponible"
  },
  categories: {
    all: "Todas las categorías",
    ropa: "Ropa",
    calzado: "Calzado",
    accesorios: "Accesorios",
    deporte: "Deporte",
    formal: "Formal",
    casual: "Casual"
  },
  status: {
    active: "Activo",
    inactive: "Inactivo",
    draft: "Borrador"
  }
}

// TIPOS
type ProductStatus = "active" | "inactive" | "draft"
type ProductCategory = "ropa" | "calzado" | "accesorios" | "deporte" | "formal" | "casual"

interface Product {
  id: string
  image?: string
  name: string
  description: string
  price: number
  comparePrice?: number
  cost: number
  stock: number
  sku: string
  category: ProductCategory
  tags: string[]
  status: ProductStatus
  featured: boolean
  sales: number
  createdAt: string
  updatedAt: string
}

interface BulkAction {
  id: string
  label: string
  icon: React.ComponentType<any>
  action: (ids: string[]) => void
  variant?: "default" | "destructive"
}

export default function AdminProductsPage() {
  const router = useRouter()
  const [view, setView] = useState<"table" | "card">("table")
  const [search, setSearch] = useState("")
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "out">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  const [products, setProducts] = useState<Product[]>([
    { 
      id: "MD001", 
      name: "Zapatillas Urban Pro", 
      description: "Zapatillas urbanas con diseño moderno y comfort superior",
      price: 125.00, 
      comparePrice: 149.99,
      cost: 75.00,
      stock: 12, 
      sku: "ZAP-URB-PRO-001",
      category: "calzado",
      tags: ["deporte", "urbano", "nuevo"],
      status: "active",
      featured: true,
      sales: 45,
      createdAt: "2024-01-15",
      updatedAt: "2024-03-20"
    },
    { 
      id: "MD002", 
      name: "Jeans Slim Fit", 
      description: "Jeans ajustados de alta calidad",
      price: 89.50, 
      cost: 45.00,
      stock: 45, 
      sku: "JEA-SLF-FIT-002",
      category: "ropa",
      tags: ["denim", "slim", "basico"],
      status: "active",
      featured: false,
      sales: 23,
      createdAt: "2024-02-10",
      updatedAt: "2024-03-18"
    },
    { 
      id: "MD003", 
      name: "Camiseta Premium Cotton", 
      description: "Camiseta 100% algodón premium",
      price: 29.99, 
      cost: 15.00,
      stock: 0, 
      sku: "CAM-PRM-COT-003",
      category: "ropa",
      tags: ["algodon", "basico", "verano"],
      status: "inactive",
      featured: false,
      sales: 67,
      createdAt: "2024-01-05",
      updatedAt: "2024-03-22"
    },
    { 
      id: "MD004", 
      name: "Sweater Minimal Black", 
      description: "Sweater minimalista color negro",
      price: 65.00, 
      cost: 35.00,
      stock: 3, 
      sku: "SWE-MIN-BLK-004",
      category: "ropa",
      tags: ["invierno", "minimal", "lana"],
      status: "active",
      featured: true,
      sales: 12,
      createdAt: "2024-03-01",
      updatedAt: "2024-03-25"
    },
    { 
      id: "MD005", 
      name: "Playera Abstract Lines", 
      description: "Playera con diseño abstracto moderno",
      price: 34.99, 
      cost: 18.00,
      stock: 67, 
      sku: "PLA-ABS-LIN-005",
      category: "ropa",
      tags: ["abstracto", "arte", "algodon"],
      status: "active",
      featured: false,
      sales: 89,
      createdAt: "2024-02-15",
      updatedAt: "2024-03-19"
    },
    { 
      id: "MD006", 
      name: "Chaqueta Denim Classic", 
      description: "Chaqueta denim clásica",
      price: 110.00, 
      comparePrice: 129.99,
      cost: 65.00,
      stock: 0, 
      sku: "CHA-DEN-CLS-006",
      category: "ropa",
      tags: ["denim", "chaqueta", "vintage"],
      status: "draft",
      featured: false,
      sales: 0,
      createdAt: "2024-03-10",
      updatedAt: "2024-03-24"
    },
    { 
      id: "MD007", 
      name: "Reloj Deportivo Elite", 
      description: "Reloj deportivo con GPS y monitor cardiaco",
      price: 199.99, 
      cost: 120.00,
      stock: 25, 
      sku: "REL-DEP-ELT-007",
      category: "accesorios",
      tags: ["deporte", "tecnologia", "smart"],
      status: "active",
      featured: true,
      sales: 34,
      createdAt: "2024-02-28",
      updatedAt: "2024-03-23"
    },
    { 
      id: "MD008", 
      name: "Mochila Trekking Pro", 
      description: "Mochila para trekking con capacidad 30L",
      price: 79.99, 
      cost: 45.00,
      stock: 18, 
      sku: "MOC-TRK-PRO-008",
      category: "accesorios",
      tags: ["outdoor", "trekking", "resistente"],
      status: "active",
      featured: false,
      sales: 21,
      createdAt: "2024-03-05",
      updatedAt: "2024-03-21"
    }
  ])

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                           product.id.toLowerCase().includes(search.toLowerCase()) ||
                           product.sku.toLowerCase().includes(search.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      
      const matchesStock = stockFilter === "all" ? true :
                           stockFilter === "low" ? product.stock > 0 && product.stock <= 10 :
                           stockFilter === "out" ? product.stock === 0 : true

      const matchesCategory = categoryFilter === "all" ? true : product.category === categoryFilter
      
      const matchesStatus = statusFilter === "all" ? true : product.status === statusFilter
      
      return matchesSearch && matchesStock && matchesCategory && matchesStatus
    })
  }, [products, search, stockFilter, categoryFilter, statusFilter])

  // Estadísticas
  const stats = useMemo(() => {
    const totalProducts = products.length
    const activeProducts = products.filter(p => p.status === "active").length
    const outOfStock = products.filter(p => p.stock === 0).length
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length
    const totalSales = products.reduce((sum, p) => sum + p.sales, 0)
    const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0)

    return {
      totalProducts,
      activeProducts,
      outOfStock,
      lowStock,
      totalSales,
      totalRevenue: `$${totalRevenue.toLocaleString()}`
    }
  }, [products])

  // Acciones en lote
  const bulkActions: BulkAction[] = [
    {
      id: "activate",
      label: "Activar productos",
      icon: Eye,
      action: (ids: string[]) => {
        setProducts(prev => prev.map(p => 
          ids.includes(p.id) ? { ...p, status: "active" } : p
        ))
        setSelectedProducts([])
        // toast.success(`${ids.length} productos activados`)
      }
    },
    {
      id: "deactivate",
      label: "Desactivar productos",
      icon: Archive,
      action: (ids: string[]) => {
        setProducts(prev => prev.map(p => 
          ids.includes(p.id) ? { ...p, status: "inactive" } : p
        ))
        setSelectedProducts([])
        // toast.success(`${ids.length} productos desactivados`)
      }
    },
    {
      id: "duplicate",
      label: "Duplicar productos",
      icon: Copy,
      action: (ids: string[]) => {
        const productsToDuplicate = products.filter(p => ids.includes(p.id))
        const duplicatedProducts = productsToDuplicate.map(p => ({
          ...p,
          id: `${p.id}-COPY-${Date.now()}`,
          sku: `${p.sku}-COPY`,
          name: `${p.name} (Copia)`,
          stock: 0,
          sales: 0,
          createdAt: new Date().toISOString().split('T')[0],
          featured: false
        }))
        setProducts(prev => [...prev, ...duplicatedProducts])
        setSelectedProducts([])
        // toast.success(`${ids.length} productos duplicados`)
      }
    },
    {
      id: "delete",
      label: "Eliminar productos",
      icon: Trash2,
      action: (ids: string[]) => {
        if (confirm(`¿Eliminar ${ids.length} productos? Esta acción no se puede deshacer.`)) {
          setProducts(prev => prev.filter(p => !ids.includes(p.id)))
          setSelectedProducts([])
          // toast.success(`${ids.length} productos eliminados`)
        }
      },
      variant: "destructive"
    }
  ]

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar producto? Esta acción no se puede deshacer.")) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    )
  }

  const selectAllProducts = () => {
    setSelectedProducts(
      selectedProducts.length === filteredProducts.length 
        ? [] 
        : filteredProducts.map(p => p.id)
    )
  }

  const refreshData = () => {
    setIsLoading(true)
    // Simular refresh de datos
    setTimeout(() => {
      setIsLoading(false)
      // toast.success("Datos actualizados")
    }, 1000)
  }

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">{productsConfig.stockLabels.out}</Badge>
    }
    if (stock <= 10) {
      return <Badge variant="warning">{productsConfig.stockLabels.low}</Badge>
    }
    return <Badge variant="success">{stock} {productsConfig.stockLabels.ok}</Badge>
  }

  const getStatusBadge = (status: ProductStatus) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      draft: "outline"
    } as const

    return (
      <Badge variant={variants[status]}>
        {productsConfig.status[status]}
      </Badge>
    )
  }

  const getCategoryBadge = (category: ProductCategory) => {
    return (
      <Badge variant="outline" className="text-xs">
        {productsConfig.categories[category]}
      </Badge>
    )
  }

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group border-0 shadow-none hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400&text=Product"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.featured && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-amber-500 hover:bg-amber-600">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Destacado
              </Badge>
            </div>
          )}
          {product.comparePrice && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="line-through text-gray-500">
                ${product.comparePrice}
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <p className="text-xs text-gray-400 tracking-wider uppercase">{product.sku}</p>
                <h3 className="font-medium text-neutral-900 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-light text-neutral-900">${product.price.toFixed(2)}</span>
                {product.comparePrice && (
                  <span className="text-sm text-gray-400 line-through">${product.comparePrice}</span>
                )}
              </div>
              {getStockBadge(product.stock)}
            </div>

            <div className="flex flex-wrap gap-1">
              {getCategoryBadge(product.category)}
              {getStatusBadge(product.status)}
            </div>

            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.tags.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{product.sales} ventas</span>
              <span>Actualizado: {new Date(product.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 h-8 text-xs"
              asChild
            >
              <Link href={`/admin/products/edit/${product.id}`}>
                <Edit3 className="h-3 w-3 mr-1" /> Editar
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0"
              asChild
            >
              <Link href={`/products/${product.id}`} target="_blank">
                <Eye className="h-3 w-3" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => handleDelete(product.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* HEADER */}
        <header className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-gray-400 hover:text-neutral-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Breadcrumbs
              links={[
                { href: "/admin/dashboard", label: "Panel" },
                { href: "/admin/products", label: "Productos" },
              ]}
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-light tracking-tight text-neutral-900">
                {productsConfig.pageTitle}
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                {productsConfig.pageDescription}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center rounded-lg border border-gray-100 p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setView("table")}
                  className={cn(
                    "h-8 px-2",
                    view === "table" ? "bg-neutral-900 text-white" : "text-gray-400"
                  )}
                >
                  <TableIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setView("card")}
                  className={cn(
                    "h-8 px-2",
                    view === "card" ? "bg-neutral-900 text-white" : "text-gray-400"
                  )}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-gray-100"
                onClick={refreshData}
                disabled={isLoading}
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                <span className="hidden sm:inline">{productsConfig.buttons.refresh}</span>
              </Button>

              <Button variant="outline" size="sm" className="gap-2 border-gray-100">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">{productsConfig.buttons.export}</span>
              </Button>

              <Button size="sm" className="gap-2 bg-neutral-900 hover:bg-neutral-800" asChild>
                <Link href="/admin/products/add">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">{productsConfig.buttons.add}</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* ESTADÍSTICAS */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-light text-neutral-900">{stats.totalProducts}</p>
                    <p className="text-xs text-gray-400">Total</p>
                  </div>
                  <Package className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-light text-neutral-900">{stats.activeProducts}</p>
                    <p className="text-xs text-gray-400">Activos</p>
                  </div>
                  <Eye className="h-4 w-4 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-light text-neutral-900">{stats.lowStock}</p>
                    <p className="text-xs text-gray-400">Stock Bajo</p>
                  </div>
                  <TrendingDown className="h-4 w-4 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-light text-neutral-900">{stats.outOfStock}</p>
                    <p className="text-xs text-gray-400">Sin Stock</p>
                  </div>
                  <Archive className="h-4 w-4 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-light text-neutral-900">{stats.totalSales}</p>
                    <p className="text-xs text-gray-400">Ventas</p>
                  </div>
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-light text-neutral-900">{stats.totalRevenue}</p>
                    <p className="text-xs text-gray-400">Ingresos</p>
                  </div>
                  <Download className="h-4 w-4 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FILTROS & SEARCH */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por SKU, nombre, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-gray-50 border-0 focus:bg-white transition-colors"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-gray-100">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {stockFilter === "all" ? productsConfig.filters.all :
                     stockFilter === "low" ? productsConfig.filters.lowStock :
                     productsConfig.filters.outOfStock}
                  </span>
                  <ChevronLeft className="h-4 w-4 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setStockFilter("all")}>
                  {productsConfig.filters.all}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStockFilter("low")}>
                  {productsConfig.filters.lowStock}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStockFilter("out")}>
                  {productsConfig.filters.outOfStock}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-gray-100">
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {categoryFilter === "all" ? productsConfig.categories.all :
                     productsConfig.categories[categoryFilter as keyof typeof productsConfig.categories]}
                  </span>
                  <ChevronLeft className="h-4 w-4 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setCategoryFilter("all")}>
                  {productsConfig.categories.all}
                </DropdownMenuItem>
                {Object.entries(productsConfig.categories).map(([key, label]) => {
                  if (key === "all") return null
                  return (
                    <DropdownMenuItem key={key} onClick={() => setCategoryFilter(key)}>
                      {label}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-gray-100">
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {statusFilter === "all" ? "Todos los estados" :
                     productsConfig.status[statusFilter as ProductStatus]}
                  </span>
                  <ChevronLeft className="h-4 w-4 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  Todos los estados
                </DropdownMenuItem>
                {Object.entries(productsConfig.status).map(([key, label]) => (
                  <DropdownMenuItem key={key} onClick={() => setStatusFilter(key)}>
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* ACCIONES EN LOTE */}
          {selectedProducts.length > 0 && (
            <Card className="border-0 shadow-none bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-blue-700">
                      {selectedProducts.length} productos seleccionados
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2 border-blue-200 text-blue-700">
                          {productsConfig.buttons.bulkActions}
                          <ChevronLeft className="h-4 w-4 rotate-90" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        {bulkActions.map(action => {
                          const Icon = action.icon
                          return (
                            <DropdownMenuItem 
                              key={action.id}
                              onClick={() => action.action(selectedProducts)}
                              className={cn(
                                "flex items-center gap-2",
                                action.variant === "destructive" && "text-red-600"
                              )}
                            >
                              <Icon className="h-4 w-4" />
                              {action.label}
                            </DropdownMenuItem>
                          )
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProducts([])}
                    className="text-blue-700 hover:text-blue-800 hover:bg-blue-100"
                  >
                    Limpiar selección
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </header>

        {/* CONTENT */}
        {view === "table" ? (
          <Card className="border-0 shadow-none">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-100">
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={selectAllProducts}
                        className="rounded border-gray-300"
                      />
                    </TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">{productsConfig.tableHeaders.image}</TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">{productsConfig.tableHeaders.name}</TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">{productsConfig.tableHeaders.category}</TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">{productsConfig.tableHeaders.price}</TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">{productsConfig.tableHeaders.stock}</TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">{productsConfig.tableHeaders.status}</TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">{productsConfig.tableHeaders.sales}</TableHead>
                    <TableHead className="text-right font-medium text-gray-400 text-xs uppercase tracking-wider">{productsConfig.tableHeaders.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="w-12 h-12 bg-gray-50 rounded overflow-hidden relative">
                          <Image
                            src={product.image || "/placeholder.svg?height=50&width=50&text=IMG"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          {product.featured && (
                            <div className="absolute -top-1 -right-1">
                              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-neutral-900">{product.name}</div>
                          <div className="text-xs text-gray-400 font-mono">{product.sku}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-1 rounded">
                                {tag}
                              </span>
                            ))}
                            {product.tags.length > 2 && (
                              <span className="text-xs text-gray-400">
                                +{product.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(product.category)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-light text-neutral-900">${product.price.toFixed(2)}</div>
                          {product.comparePrice && (
                            <div className="text-xs text-gray-400 line-through">
                              ${product.comparePrice}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStockBadge(product.stock)}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm text-neutral-900">{product.sales}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/edit/${product.id}`} className="flex items-center gap-2">
                                <Edit3 className="h-3 w-3" /> Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/products/${product.id}`} target="_blank" className="flex items-center gap-2">
                                <Eye className="h-3 w-3" /> Ver en tienda
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Copy className="h-3 w-3" /> Duplicar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 flex items-center gap-2"
                            >
                              <Trash2 className="h-3 w-3" /> Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-gray-400">No se encontraron productos</p>
            <Button asChild>
              <Link href="/admin/products/add">
                <Plus className="h-4 w-4 mr-2" />
                Crear primer producto
              </Link>
            </Button>
          </div>
        )}

        {/* PAGINATION */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Mostrando {filteredProducts.length} de {products.length} productos
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}