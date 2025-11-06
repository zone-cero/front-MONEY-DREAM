"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAppSelector } from "@/lib/hooks"
import { CreditCard, Package, MapPin, AlertCircle } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart)
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 10
  const total = subtotal + shipping

  const handleMercadoPagoCheckout = async () => {
    setIsProcessing(true)

    // Aquí se integraría con Mercado Pago SDK
    // Por ahora es una simulación
    setTimeout(() => {
      alert("Redirigiendo a Mercado Pago...")
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <Alert className="mb-6 border-primary/50 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Integración de Mercado Pago</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2 text-sm">
                <p className="font-semibold">Para configurar Mercado Pago en producción:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>
                    Crea una cuenta en{" "}
                    <a
                      href="https://www.mercadopago.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium"
                    >
                      mercadopago.com
                    </a>
                  </li>
                  <li>
                    Ve a <strong>Tu negocio → Configuración → Credenciales</strong>
                  </li>
                  <li>
                    Copia tu <strong>Public Key</strong> y <strong>Access Token</strong>
                  </li>
                  <li>
                    Agrega las credenciales como variables de entorno:
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY</code>
                      </li>
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">MERCADOPAGO_ACCESS_TOKEN</code>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Instala el SDK: <code className="bg-muted px-1 py-0.5 rounded">npm install mercadopago</code>
                  </li>
                </ol>
              </div>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Información de Envío
                  </CardTitle>
                  <CardDescription>Ingresa tu dirección de entrega</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Juan" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Pérez" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" placeholder="Calle Principal 123" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" placeholder="Ciudad" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input id="state" placeholder="Estado" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Código Postal</Label>
                      <Input id="zip" placeholder="12345" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Método de Pago
                  </CardTitle>
                  <CardDescription>Paga de forma segura con Mercado Pago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Mercado Pago</h3>
                      <p className="text-sm text-muted-foreground mb-4">Acepta tarjetas de crédito, débito y más</p>
                      <Button onClick={handleMercadoPagoCheckout} disabled={isProcessing} className="w-full max-w-xs">
                        {isProcessing ? "Procesando..." : "Pagar con Mercado Pago"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Resumen del Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
