// app/admin/admin-header.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Shirt, 
  Package, 
  Settings, 
  Menu,
  User,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AdminSidebar from "./admin-sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// OBJETO DE CONFIGURACIÓN CENTRALIZADO
const navigationConfig = {
  brand: {
    name: "MONEY DREAM",
    href: "/admin"
  },
  navItems: [
    { 
      href: "/admin/products", 
      icon: Shirt, 
      label: "Productos",
      description: "Gestión de inventario"
    },
    { 
      href: "/admin/orders", 
      icon: Package, 
      label: "Pedidos",
      description: "Órdenes de clientes"
    },
    { 
      href: "/admin/settings", 
      icon: Settings, 
      label: "Configuración",
      description: "Ajustes del sistema"
    },
  ],
  userMenu: {
    profile: "Perfil",
    logout: "Cerrar sesión"
  }
}

export default function AdminHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LEFT: Brand + Desktop Nav */}
        <div className="flex items-center gap-12">
          {/* Brand Logo */}
          <Link 
            href={navigationConfig.brand.href}
            className="group"
          >
            <h2 className="text-xl font-light tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors">
              {navigationConfig.brand.name}
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigationConfig.navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                    isActive 
                      ? "bg-neutral-900 text-white" 
                      : "text-gray-500 hover:text-neutral-900 hover:bg-gray-50"
                  )}
                  prefetch={false}
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">{item.label}</span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-900 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* RIGHT: User Menu + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 px-3 hover:bg-gray-50 hidden md:flex"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-neutral-900">Admin</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{navigationConfig.userMenu.profile}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <span className="mr-2">→</span>
                <span>{navigationConfig.userMenu.logout}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-gray-50">
                <Menu className="h-5 w-5 text-neutral-900" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <AdminSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}