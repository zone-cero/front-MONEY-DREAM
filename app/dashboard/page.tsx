"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppSelector } from "@/lib/hooks"
import { Package, Heart, UserIcon, MapPin } from "lucide-react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ClientDashboard() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!isAuthenticated || user?.role !== "client") {
    redirect("/")
  }

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: "$129.99",
      status: "delivered",
      items: 2,
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      total: "$89.99",
      status: "processing",
      items: 1,
      trackingNumber: "TRK987654321",
    },
  ]

  const favorites = [
    { id: "1", name: "Nike Air Max 2024", price: "$129.99", image: "/nike-sneakers.jpg" },
    { id: "2", name: "Playera Premium Cotton", price: "$29.99", image: "/premium-tshirt.png" },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mi Cuenta</h1>
          <p className="text-muted-foreground">Gestiona tus pedidos y preferencias</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{user?.name}</CardTitle>
                  <CardDescription className="text-sm">{user?.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Mis Órdenes
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4" />
                Favoritos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Direcciones
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <UserIcon className="mr-2 h-4 w-4" />
                Perfil
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList>
                <TabsTrigger value="orders">Mis Órdenes</TabsTrigger>
                <TabsTrigger value="favorites">Favoritos</TabsTrigger>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Orden {order.id}</CardTitle>
                          <CardDescription>Realizada el {order.date}</CardDescription>
                        </div>
                        <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                          {order.status === "delivered" ? "Entregada" : "En proceso"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total</span>
                          <span className="font-semibold">{order.total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Artículos</span>
                          <span>{order.items}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Número de rastreo</span>
                          <span className="font-mono text-xs">{order.trackingNumber}</span>
                        </div>
                        <Separator />
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Ver detalles
                          </Button>
                          {order.status === "processing" && (
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              Rastrear pedido
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                            <Package className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.name}</h3>
                            <p className="text-lg font-bold text-primary mb-2">{item.price}</p>
                            <Button size="sm" className="w-full">
                              Agregar al carrito
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tu información de perfil</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Nombre</label>
                        <p className="text-muted-foreground">{user?.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <p className="text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Separator />
                    <Button>Editar Perfil</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
