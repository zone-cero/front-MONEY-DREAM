"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAppSelector } from "@/lib/hooks"
import { CreditCard, Package, MapPin, AlertCircle, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 10
  const total = subtotal + shipping

  useEffect(() => {
    // Simula carga inicial para skeletons
    setTimeout(() => setIsLoading(false), 600)
  }, [])

  const handleMercadoPagoCheckout = async () => {
    setIsProcessing(true)

    try {
      // Prepare items for MercadoPago
      const mpItems = items.map((item) => ({
        id: item.id,
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      }))

      // Call API to create preference
      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: mpItems }),
      })

      if (!response.ok) {
        throw new Error("Error al crear la preferencia de pago")
      }

      const data = await response.json()

      // Check if we have a valid init_point
      if (data.init_point) {
        // Redirect to MercadoPago checkout
        window.location.href = data.init_point
      } else {
        // Show message if using mock response
        alert(
          data.message ||
          "Configura tus credenciales de Mercado Pago en las variables de entorno para usar pagos reales"
        )
        setIsProcessing(false)
      }
    } catch (error) {
      console.error("Error en checkout:", error)
      alert("Error al procesar el pago. Por favor intenta nuevamente.")
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <Header />
        <main className="container mx-auto px-4 pt-32 md:pt-48 pb-12">
          <div className="max-w-sm mx-auto text-center">
            <Card className="border-neutral-200 dark:border-neutral-800 rounded-none">
              <CardContent className="py-12">
                <Package className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
                <h2 className="text-lg font-medium mb-2">Tu carrito está vacío</h2>
                <p className="text-sm text-neutral-500 mb-6">Agrega productos para continuar</p>
                <Link href="/productos">
                  <Button className="rounded-none bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-black">
                    VER PRODUCTOS
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-12">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              CHECKOUT
            </h1>
            <div className="h-px w-16 bg-neutral-900 dark:bg-white mt-2"></div>
          </div>

          {/* Alerta minimalista - Ocultable en prod */}
          <Alert className="mb-8 border-lime-400/30 bg-lime-50/40 dark:bg-lime-950/10 rounded-none border-0 border-l-2">
            <AlertCircle className="h-4 w-4 text-lime-500" />
            <AlertDescription className="text-xs text-neutral-600 dark:text-neutral-400">
              Mercado Pago: Configura tus credenciales para producción
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2 space-y-6">

              {/* Envío */}
              <Card className="border-neutral-200 dark:border-neutral-800 rounded-none shadow-none">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Dirección de envío
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName" className="text-xs text-neutral-600 dark:text-neutral-400">
                        Nombre
                      </Label>
                      {isLoading ? <Skeleton className="h-10 w-full rounded-none" /> : (
                        <Input id="firstName" placeholder="Juan" className="rounded-none border-neutral-300 dark:border-neutral-700 h-10 text-sm focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white" />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName" className="text-xs text-neutral-600 dark:text-neutral-400">
                        Apellido
                      </Label>
                      {isLoading ? <Skeleton className="h-10 w-full rounded-none" /> : (
                        <Input id="lastName" placeholder="Pérez" className="rounded-none border-neutral-300 dark:border-neutral-700 h-10 text-sm focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="address" className="text-xs text-neutral-600 dark:text-neutral-400">
                      Dirección
                    </Label>
                    {isLoading ? <Skeleton className="h-10 w-full rounded-none" /> : (
                      <Input id="address" placeholder="Calle Principal 123" className="rounded-none border-neutral-300 dark:border-neutral-700 h-10 text-sm focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white" />
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-xs text-neutral-600 dark:text-neutral-400">
                        Ciudad
                      </Label>
                      {isLoading ? <Skeleton className="h-10 w-full rounded-none" /> : (
                        <Input id="city" placeholder="Ciudad" className="rounded-none border-neutral-300 dark:border-neutral-700 h-10 text-sm focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white" />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="state" className="text-xs text-neutral-600 dark:text-neutral-400">
                        Estado
                      </Label>
                      {isLoading ? <Skeleton className="h-10 w-full rounded-none" /> : (
                        <Input id="state" placeholder="Estado" className="rounded-none border-neutral-300 dark:border-neutral-700 h-10 text-sm focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white" />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="zip" className="text-xs text-neutral-600 dark:text-neutral-400">
                        C.P.
                      </Label>
                      {isLoading ? <Skeleton className="h-10 w-full rounded-none" /> : (
                        <Input id="zip" placeholder="12345" className="rounded-none border-neutral-300 dark:border-neutral-700 h-10 text-sm focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pago */}
              <Card className="border-neutral-200 dark:border-neutral-800 rounded-none shadow-none">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Método de pago
                  </CardTitle>
                  <CardDescription className="text-xs text-neutral-500 dark:text-neutral-400">
                    Transacción segura con Mercado Pago
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <button
                    onClick={handleMercadoPagoCheckout}
                    disabled={isProcessing}
                    className="w-full h-12 border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white transition-colors flex items-center justify-center gap-3 group"
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 border-2 border-neutral-300 border-t-black dark:border-neutral-700 dark:border-t-white rounded-full animate-spin"></div>
                        <span className="text-xs uppercase tracking-wider">PROCESANDO...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wider">PAGAR CON MERCADO PAGO</span>
                      </>
                    )}
                  </button>
                </CardContent>
              </Card>

            </div>

            {/* Resumen */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-neutral-200 dark:border-neutral-800 rounded-none shadow-none">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Resumen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-4 w-full rounded-none" />
                      <Skeleton className="h-4 w-full rounded-none" />
                      <Skeleton className="h-4 w-full rounded-none" />
                    </>
                  ) : (
                    <>
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm py-2 border-b border-neutral-100 dark:border-neutral-800">
                          <span className="text-neutral-600 dark:text-neutral-400">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium text-neutral-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}

                      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

                      <div className="flex justify-between text-sm py-2">
                        <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-sm py-2">
                        <span className="text-neutral-600 dark:text-neutral-400">Envío</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>

                      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

                      <div className="flex justify-between text-base font-semibold py-3">
                        <span className="text-neutral-900 dark:text-white">Total</span>
                        <span className="text-lime-500">${total.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}