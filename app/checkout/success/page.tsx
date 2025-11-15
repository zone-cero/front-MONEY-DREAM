"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'
import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { clearCart } from "@/lib/features/cart/cartSlice"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const paymentId = searchParams.get("payment_id")
  const status = searchParams.get("status")

  useEffect(() => {
    // Clear cart on successful payment
    if (status === "approved") {
      dispatch(clearCart())
    }
  }, [status, dispatch])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">¡Pago exitoso!</h1>
            <p className="text-muted-foreground mb-6">
              Tu pedido ha sido procesado correctamente. Recibirás un correo de confirmación pronto.
            </p>
            {paymentId && (
              <p className="text-sm text-muted-foreground mb-8">ID de pago: {paymentId}</p>
            )}
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard">
                <Button>Ver mis pedidos</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Seguir comprando</Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
