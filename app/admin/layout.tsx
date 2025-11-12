"use client" // Se mantiene para usar hooks y efectos

import { useAppSelector } from "@/lib/hooks"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import AdminHeader from "@/components/admin-header"

// Importa cualquier otro componente de UI que necesites,
// aunque para el layout actual solo se necesita AdminHeader
// para el envoltorio de la ruta.

// NOTA: El componente de Layout DEBE recibir y renderizar 'children'
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Lógica de autenticación/montaje
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Aplica la protección de ruta aquí, en el Layout
  if (!isAuthenticated || user?.role !== "admin") {
    redirect("/")
  }

  // Estructura del "Padre" (Header + Contenido hijo)
  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.16))]">
      <AdminHeader /> {/* Vista Padre: El Header superior para el admin */}
      <main className="flex-1 p-4 md:p-6">{children}</main> {/* Aquí se renderiza la Vista Hija (page.tsx) */}
    </div>
  )
}