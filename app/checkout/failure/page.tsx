"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { XCircle } from 'lucide-react'
import Link from "next/link"

export default function FailurePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Pago rechazado</h1>
            <p className="text-muted-foreground mb-8">
              Hubo un problema al procesar tu pago. Por favor, intenta nuevamente o usa otro método de pago.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/checkout">
                <Button>Intentar nuevamente</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Volver al inicio</Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
