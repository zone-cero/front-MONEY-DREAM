"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Shirt, Package, Settings } from "lucide-react"
import Image from "next/image"

export default function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Shirt, label: "Productos" },
    { href: "/admin/orders", icon: Package, label: "Pedidos" },
    { href: "/admin/settings", icon: Settings, label: "Configuración" },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center h-16 border-b border-border px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-lg" prefetch={false}>
          <Image src="/placeholder.svg" alt="Logo de Tu Playera" width={32} height={32} className="text-foreground" />
          <span>Admin Panel</span>
        </Link>
      </div>
      <nav className="flex-1 grid gap-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-muted",
              pathname.startsWith(item.href) && "bg-muted font-semibold",
            )}
            prefetch={false}
          >
            {item.icon({ className: "h-5 w-5" })}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
