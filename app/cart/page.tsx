
"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { updateQuantity, removeFromCart } from "@/lib/features/cart/cartSlice"
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function CartPage() {
  const { items, total } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const shipping = total > 50 ? 0 : 10
  const tax = total * 0.16
  const finalTotal = total + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <Header />
        <main className="container mx-auto px-4 pt-32 md:pt-48 pb-12">
          <div className="max-w-sm mx-auto">
            <Card className="border-neutral-200 dark:border-neutral-800 rounded-none shadow-none">
              <CardContent className="py-12 text-center">
                <ShoppingBag className="h-10 w-10 mx-auto mb-4 text-neutral-400" />
                <h2 className="text-base font-medium mb-2 text-neutral-900 dark:text-white">
                  CARRITO VACÍO
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
                  No hay productos en tu carrito
                </p>
                <Link href="/productos">
                  <Button className="rounded-none bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-black text-white text-xs uppercase tracking-wider h-10 px-6">
                    Explorar
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              CARRITO
            </h1>
            <div className="h-px w-12 bg-neutral-900 dark:bg-white mt-2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Items */}
            <div className="lg:col-span-2 space-y-0">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
                      <div className="flex gap-4">
                        <Skeleton className="h-24 w-24 rounded-none" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-40 rounded-none" />
                          <Skeleton className="h-3 w-24 rounded-none" />
                          <Skeleton className="h-3 w-32 rounded-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="py-6 group">
                      <div className="flex gap-4 md:gap-6">
                        {/* Imagen */}
                        <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                          <Image 
                            src={item.image || "/placeholder.svg"} 
                            alt={item.name} 
                            fill 
                            className="object-cover transition-transform duration-300 group-hover:scale-105" 
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-4">
                            <div className="min-w-0">
                              <h3 className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                                {item.name}
                              </h3>
                              <div className="flex gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                {item.size && <span className="truncate">Talla: {item.size}</span>}
                                {item.color && <span className="truncate">Color: {item.color}</span>}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemove(item.id)}
                              className="h-8 w-8 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Controles */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 rounded-none border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 rounded-none border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-base font-semibold text-neutral-900 dark:text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                <CardContent className="space-y-0">
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full rounded-none" />
                      <Skeleton className="h-4 w-full rounded-none" />
                      <Skeleton className="h-4 w-full rounded-none" />
                      <Separator className="my-4 bg-neutral-200 dark:bg-neutral-800" />
                      <Skeleton className="h-6 w-full rounded-none" />
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between py-3 text-sm border-b border-neutral-200 dark:border-neutral-800">
                        <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                        <span className="text-neutral-900 dark:text-white">${total.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between py-3 text-sm border-b border-neutral-200 dark:border-neutral-800">
                        <span className="text-neutral-600 dark:text-neutral-400">Envío</span>
                        <span className="text-neutral-900 dark:text-white">
                          {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between py-3 text-sm border-b border-neutral-200 dark:border-neutral-800">
                        <span className="text-neutral-600 dark:text-neutral-400">IVA (16%)</span>
                        <span className="text-neutral-900 dark:text-white">${tax.toFixed(2)}</span>
                      </div>

                      {total < 50 && (
                        <div className="py-3">
                          <div className="p-2 bg-lime-50 dark:bg-lime-950/10 border border-lime-200 dark:border-lime-900/30">
                            <p className="text-xs text-lime-700 dark:text-lime-400">
                              Agrega ${(50 - total).toFixed(2)} más para envío gratis
                            </p>
                          </div>
                        </div>
                      )}

                      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

                      <div className="flex justify-between py-4 text-base font-semibold">
                        <span className="text-neutral-900 dark:text-white">Total a pagar:</span>
                        <span className="text-lime-500">${finalTotal.toFixed(2)}</span>
                      </div>

                      <div className="space-y-3 pt-4">
                        <Link href="/checkout">
                          <Button className="w-full rounded-none bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-black text-white text-xs uppercase tracking-wider h-10">
                            Finalizar compra
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </Link>
                        
                        <Link href="/productos">
                          <Button variant="outline" className="w-full rounded-none border-neutral-300 dark:border-neutral-700 h-10 text-xs uppercase tracking-wider text-neutral-900 dark:text-white hover:border-black dark:hover:border-white">
                            Seguir comprando
                          </Button>
                        </Link>
                      </div>

                      <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                          Aceptamos todos los métodos de pago
                        </p>
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