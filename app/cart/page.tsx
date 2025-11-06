"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { removeFromCart, updateQuantity } from "@/lib/features/cart/cartSlice"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, total } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.16
  const finalTotal = total + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
              <p className="text-muted-foreground mb-8">
                Parece que aún no has agregado productos a tu carrito. ¡Explora nuestra colección!
              </p>
              <Link href="/">
                <Button size="lg">
                  Explorar productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">Carrito de compras</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={`${item.id}-${item.size}`} className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                            {item.size && <span>Talla: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xl font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Resumen del pedido</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({items.length} productos)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envío</span>
                    <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>IVA (16%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  {total < 50 && (
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm text-primary">Agrega ${(50 - total).toFixed(2)} más para envío gratis</p>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full mb-4">
                    Proceder al pago
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/">
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    Continuar comprando
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    Aceptamos todos los métodos de pago a través de Mercado Pago
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
