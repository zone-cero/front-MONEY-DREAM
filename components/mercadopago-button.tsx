"use client"

import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"
import { useState } from "react"

interface MercadoPagoButtonProps {
  items: Array<{
    id: string
    title: string
    quantity: number
    unit_price: number
  }>
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function MercadoPagoButton({ items, onSuccess, onError }: MercadoPagoButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      // Llamar a tu API route para crear la preferencia de pago
      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) {
        throw new Error("Error al crear la preferencia de pago")
      }

      const { id } = await response.json()

      // Redirigir a Mercado Pago
      const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
      window.location.href = `https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=${id}`

      onSuccess?.()
    } catch (error) {
      console.error("Error en checkout:", error)
      onError?.(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={isLoading} className="w-full" size="lg">
      <CreditCard className="mr-2 h-5 w-5" />
      {isLoading ? "Procesando..." : "Pagar con Mercado Pago"}
    </Button>
  )
}
