import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { StoreProvider } from "@/lib/providers"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MONEY DREAM - Tienda de Moda Online",
  // --- CAMBIO CLAVE AQUÍ ---
  icons: {
    icon: '/logoIniciales.png', // Reemplaza esto con la ruta real de tu archivo de icono
  },
  // -------------------------
  description: "Plataforma ecommerce profesional para productos de moda",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <StoreProvider>{children}</StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}