"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Breadcrumbs from "@/components/breadcrumbs"

export default function AdminOrdersPage() {
  const router = useRouter()
  const orders = [
    { id: "ORD001", customer: "Juan Pérez", date: "2024-07-30", total: 59.98, status: "Pendiente" },
    { id: "ORD002", customer: "María García", date: "2024-07-29", total: 34.99, status: "Enviado" },
    { id: "ORD003", customer: "Carlos López", date: "2024-07-28", total: 99.5, status: "Entregado" },
    { id: "ORD004", customer: "Ana Martínez", date: "2024-07-28", total: 24.99, status: "Cancelado" },
  ]

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Pendiente":
        return "secondary"
      case "Enviado":
        return "default"
      case "Entregado":
        return "outline"
      case "Cancelado":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          aria-label="Regresar"
          className="transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Breadcrumbs
          links={[
            { href: "/admin/dashboard", label: "Panel de Administración" },
            { href: "/admin/orders", label: "Pedidos" },
          ]}
        />
      </div>
      <h1 className="text-4xl font-bold mb-8">Gestión de Pedidos</h1>

      <Card>
        <CardHeader>
          <CardTitle>Todos los Pedidos</CardTitle>
          <CardDescription>Gestiona y actualiza el estado de los pedidos de tus clientes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID de Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 transition-colors">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                        <DropdownMenuItem>Actualizar Estado</DropdownMenuItem>
                        <DropdownMenuItem>Enviar Mensaje</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
