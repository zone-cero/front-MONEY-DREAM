"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { 
  MoreHorizontal, 
  ChevronLeft, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Plus,
  BarChart3,
  DollarSign,
  Package,
  Users
} from "lucide-react"
import { useRouter } from "next/navigation"
import Breadcrumbs from "@/components/breadcrumbs"
import { cn } from "@/lib/utils"

// CONFIGURACIÓN CENTRALIZADA
const ordersConfig = {
  pageTitle: "Gestión de Pedidos",
  pageDescription: "Administra y realiza seguimiento de todos los pedidos",
  buttons: {
    add: "Nuevo Pedido",
    export: "Exportar",
    refresh: "Actualizar"
  },
  filters: {
    all: "Todos los pedidos",
    pending: "Pendientes",
    processing: "Procesando",
    shipped: "Enviados",
    delivered: "Entregados",
    cancelled: "Cancelados"
  },
  tableHeaders: {
    id: "ID Pedido",
    customer: "Cliente",
    date: "Fecha",
    items: "Productos",
    total: "Total",
    status: "Estado",
    payment: "Pago",
    actions: "Acciones"
  },
  status: {
    pending: "Pendiente",
    processing: "Procesando",
    shipped: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado"
  },
  paymentStatus: {
    paid: "Pagado",
    pending: "Pendiente",
    failed: "Fallido",
    refunded: "Reembolsado"
  }
}

// TIPOS
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"
type PaymentStatus = "paid" | "pending" | "failed" | "refunded"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image?: string
}

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone?: string
  }
  date: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  notes?: string
}

export default function AdminOrdersPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: "ORD-001", 
      customer: {
        name: "Juan Pérez",
        email: "juan.perez@email.com",
        phone: "+1234567890"
      },
      date: "2024-03-30", 
      items: [
        { id: "MD001", name: "Zapatillas Urban Pro", quantity: 1, price: 125.00 },
        { id: "MD005", name: "Playera Abstract Lines", quantity: 2, price: 34.99 }
      ],
      total: 194.98, 
      status: "pending",
      paymentStatus: "paid",
      shippingAddress: {
        street: "Av. Principal 123",
        city: "Ciudad de México",
        state: "CDMX",
        zipCode: "12345",
        country: "México"
      },
      notes: "Entregar antes de las 6pm"
    },
    { 
      id: "ORD-002", 
      customer: {
        name: "María García",
        email: "maria.garcia@email.com"
      },
      date: "2024-03-29", 
      items: [
        { id: "MD002", name: "Jeans Slim Fit", quantity: 1, price: 89.50 }
      ],
      total: 89.50, 
      status: "processing",
      paymentStatus: "paid",
      shippingAddress: {
        street: "Calle Secundaria 456",
        city: "Guadalajara",
        state: "Jalisco",
        zipCode: "67890",
        country: "México"
      }
    },
    { 
      id: "ORD-003", 
      customer: {
        name: "Carlos López",
        email: "carlos.lopez@email.com",
        phone: "+0987654321"
      },
      date: "2024-03-28", 
      items: [
        { id: "MD004", name: "Sweater Minimal Black", quantity: 1, price: 65.00 },
        { id: "MD007", name: "Reloj Deportivo Elite", quantity: 1, price: 199.99 }
      ],
      total: 264.99, 
      status: "shipped",
      paymentStatus: "paid",
      shippingAddress: {
        street: "Boulevard Norte 789",
        city: "Monterrey",
        state: "Nuevo León",
        zipCode: "54321",
        country: "México"
      }
    },
    { 
      id: "ORD-004", 
      customer: {
        name: "Ana Martínez",
        email: "ana.martinez@email.com"
      },
      date: "2024-03-28", 
      items: [
        { id: "MD003", name: "Camiseta Premium Cotton", quantity: 3, price: 29.99 }
      ],
      total: 89.97, 
      status: "delivered",
      paymentStatus: "paid",
      shippingAddress: {
        street: "Privada Este 321",
        city: "Puebla",
        state: "Puebla",
        zipCode: "98765",
        country: "México"
      }
    },
    { 
      id: "ORD-005", 
      customer: {
        name: "Roberto Sánchez",
        email: "roberto.sanchez@email.com"
      },
      date: "2024-03-27", 
      items: [
        { id: "MD006", name: "Chaqueta Denim Classic", quantity: 1, price: 110.00 }
      ],
      total: 110.00, 
      status: "cancelled",
      paymentStatus: "refunded",
      shippingAddress: {
        street: "Plaza Central 654",
        city: "Tijuana",
        state: "Baja California",
        zipCode: "23456",
        country: "México"
      },
      notes: "Cliente canceló por cambio de dirección"
    },
    { 
      id: "ORD-006", 
      customer: {
        name: "Laura Hernández",
        email: "laura.hernandez@email.com"
      },
      date: "2024-03-26", 
      items: [
        { id: "MD008", name: "Mochila Trekking Pro", quantity: 1, price: 79.99 },
        { id: "MD005", name: "Playera Abstract Lines", quantity: 1, price: 34.99 }
      ],
      total: 114.98, 
      status: "pending",
      paymentStatus: "pending",
      shippingAddress: {
        street: "Camino Real 987",
        city: "Cancún",
        state: "Quintana Roo",
        zipCode: "34567",
        country: "México"
      }
    }
  ])

  // Filtrado de pedidos
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
                           order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
                           order.customer.email.toLowerCase().includes(search.toLowerCase())
      
      const matchesStatus = statusFilter === "all" ? true : order.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [orders, search, statusFilter])

  // Estadísticas
  const stats = useMemo(() => {
    const totalOrders = orders.length
    const pendingOrders = orders.filter(o => o.status === "pending").length
    const processingOrders = orders.filter(o => o.status === "processing").length
    const totalRevenue = orders
      .filter(o => o.status !== "cancelled")
      .reduce((sum, order) => sum + order.total, 0)

    return {
      totalOrders,
      pendingOrders,
      processingOrders,
      totalRevenue: `$${totalRevenue.toLocaleString()}`
    }
  }, [orders])

  const getStatusBadge = (status: OrderStatus) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock },
      processing: { variant: "default" as const, icon: RefreshCw },
      shipped: { variant: "default" as const, icon: Truck },
      delivered: { variant: "outline" as const, icon: CheckCircle },
      cancelled: { variant: "destructive" as const, icon: XCircle }
    }

    const { variant, icon: Icon } = variants[status]
    
    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {ordersConfig.status[status]}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (paymentStatus: PaymentStatus) => {
    const variants = {
      paid: "default" as const,
      pending: "secondary" as const,
      failed: "destructive" as const,
      refunded: "outline" as const
    }

    return (
      <Badge variant={variants[paymentStatus]} className="text-xs">
        {ordersConfig.paymentStatus[paymentStatus]}
      </Badge>
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

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    // toast.success(`Estado actualizado a ${ordersConfig.status[newStatus]}`)
  }

  const getStatusActions = (currentStatus: OrderStatus) => {
    const actions: { label: string; status: OrderStatus; icon: React.ComponentType<any> }[] = []
    
    switch (currentStatus) {
      case "pending":
        actions.push(
          { label: "Marcar como Procesando", status: "processing", icon: RefreshCw },
          { label: "Cancelar Pedido", status: "cancelled", icon: XCircle }
        )
        break
      case "processing":
        actions.push(
          { label: "Marcar como Enviado", status: "shipped", icon: Truck },
          { label: "Cancelar Pedido", status: "cancelled", icon: XCircle }
        )
        break
      case "shipped":
        actions.push(
          { label: "Marcar como Entregado", status: "delivered", icon: CheckCircle }
        )
        break
    }
    
    return actions
  }

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
                { href: "/admin/orders", label: "Pedidos" },
              ]}
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-light tracking-tight text-neutral-900">
                {ordersConfig.pageTitle}
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                {ordersConfig.pageDescription}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-gray-100"
                onClick={refreshData}
                disabled={isLoading}
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                <span className="hidden sm:inline">{ordersConfig.buttons.refresh}</span>
              </Button>

              <Button variant="outline" size="sm" className="gap-2 border-gray-100">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">{ordersConfig.buttons.export}</span>
              </Button>

              <Button size="sm" className="gap-2 bg-neutral-900 hover:bg-neutral-800">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">{ordersConfig.buttons.add}</span>
              </Button>
            </div>
          </div>

          {/* ESTADÍSTICAS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-light text-neutral-900">{stats.totalOrders}</p>
                    <p className="text-xs text-gray-400">Total Pedidos</p>
                  </div>
                  <Package className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-light text-neutral-900">{stats.pendingOrders}</p>
                    <p className="text-xs text-gray-400">Pendientes</p>
                  </div>
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-light text-neutral-900">{stats.processingOrders}</p>
                    <p className="text-xs text-gray-400">Procesando</p>
                  </div>
                  <RefreshCw className="h-4 w-4 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-light text-neutral-900">{stats.totalRevenue}</p>
                    <p className="text-xs text-gray-400">Ingresos Totales</p>
                  </div>
                  <DollarSign className="h-4 w-4 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FILTROS & SEARCH */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por ID, cliente o email..."
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
                    {statusFilter === "all" ? ordersConfig.filters.all :
                     ordersConfig.filters[statusFilter as keyof typeof ordersConfig.filters]}
                  </span>
                  <ChevronLeft className="h-4 w-4 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  {ordersConfig.filters.all}
                </DropdownMenuItem>
                {Object.entries(ordersConfig.filters).map(([key, label]) => {
                  if (key === "all") return null
                  return (
                    <DropdownMenuItem key={key} onClick={() => setStatusFilter(key)}>
                      {label}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* CONTENT */}
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <CardTitle>Todos los Pedidos</CardTitle>
            <CardDescription>Gestiona y actualiza el estado de los pedidos de tus clientes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-100">
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">
                      {ordersConfig.tableHeaders.id}
                    </TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">
                      {ordersConfig.tableHeaders.customer}
                    </TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">
                      {ordersConfig.tableHeaders.date}
                    </TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">
                      {ordersConfig.tableHeaders.items}
                    </TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">
                      {ordersConfig.tableHeaders.total}
                    </TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">
                      {ordersConfig.tableHeaders.status}
                    </TableHead>
                    <TableHead className="font-medium text-gray-400 text-xs uppercase tracking-wider">
                      {ordersConfig.tableHeaders.payment}
                    </TableHead>
                    <TableHead className="text-right font-medium text-gray-400 text-xs uppercase tracking-wider">
                      {ordersConfig.tableHeaders.actions}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <TableCell className="font-mono text-sm font-medium text-neutral-900">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-neutral-900">{order.customer.name}</div>
                          <div className="text-xs text-gray-400">{order.customer.email}</div>
                          {order.customer.phone && (
                            <div className="text-xs text-gray-400">{order.customer.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-neutral-900">
                        {new Date(order.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="text-sm text-neutral-900">
                              {item.quantity}x {item.name}
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="text-xs text-gray-400">
                              +{order.items.length - 2} más
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-neutral-900">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 transition-colors">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Editar Pedido
                            </DropdownMenuItem>
                            
                            {/* Acciones de estado dinámicas */}
                            {getStatusActions(order.status).map((action, index) => {
                              const Icon = action.icon
                              return (
                                <DropdownMenuItem 
                                  key={index}
                                  onClick={() => updateOrderStatus(order.id, action.status)}
                                  className="flex items-center gap-2"
                                >
                                  <Icon className="h-4 w-4" />
                                  {action.label}
                                </DropdownMenuItem>
                              )
                            })}

                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <XCircle className="h-4 w-4" />
                              Cancelar Pedido
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* EMPTY STATE */}
            {filteredOrders.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-300" />
                </div>
                <p className="text-gray-400">No se encontraron pedidos</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* PAGINATION */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Mostrando {filteredOrders.length} de {orders.length} pedidos
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