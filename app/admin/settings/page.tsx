"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Breadcrumbs from "@/components/breadcrumbs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    address: "123 Calle Ficticia, Ciudad, País",
    phone: "+1 (555) 123-4567",
    email: "info@tuplayera.com",
    whatsapp: "https://wa.me/15551234567",
    hours: "Lunes - Viernes: 9:00 AM - 6:00 PM\nSábado: 10:00 AM - 2:00 PM\nDomingo: Cerrado",
    maxTextLength: 50,
    allowedFonts: "Arial, Helvetica, 'Morning Brew', Borney",
    allowedColors: "#000000, #FFFFFF",
  })
  const [selectedFeaturedProducts, setSelectedFeaturedProducts] = useState<string[]>([])

  // Simulated product data for selection
  const allProducts = useMemo(
    () => [
      { id: "prod001", name: "Playera Minimalista Blanca" },
      { id: "prod002", name: "Playera Geométrica Negra" },
      { id: "prod003", name: "Playera Abstracta" },
      { id: "prod004", name: "Playera con Frase Inspiradora" },
      { id: "prod005", name: "Playera de Montaña" },
      { id: "prod006", name: "Playera de Café" },
    ],
    [],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFeaturedProductChange = (productId: string, checked: boolean) => {
    setSelectedFeaturedProducts((prev) => (checked ? [...prev, productId] : prev.filter((id) => id !== productId)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Configuración guardada:", { ...formData, featuredProducts: selectedFeaturedProducts })
    alert("Configuración guardada (simulado). Revisa la consola.")
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          aria-label="Regresar"
          className="transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Breadcrumbs
          links={[
            { href: "/admin/dashboard", label: "Panel de Administración" },
            { href: "/admin/settings", label: "Configuración" },
          ]}
        />
      </div>
      <h1 className="text-4xl font-bold mb-8">Configuración del Sitio</h1>

      <div className="grid gap-8">
        {/* Contact Information Settings */}
        <Card className="rounded-none p-0 border-border shadow-sm">
          <CardHeader className="p-4 border-b border-border">
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>Actualiza los detalles de contacto de tu tienda.</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="address">Dirección de la Tienda</Label>
                <Input id="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whatsapp">Enlace de WhatsApp</Label>
                <Input id="whatsapp" value={formData.whatsapp} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hours">Horario de Atención</Label>
                <Textarea id="hours" value={formData.hours} onChange={handleChange} className="min-h-[120px]" />
              </div>
              <Button type="submit" className="transition-colors">
                Guardar Cambios
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recommendation Section Settings */}
        <Card className="rounded-none p-0 border-border shadow-sm">
          <CardHeader className="p-4 border-b border-border">
            <CardTitle>Sección de Recomendaciones</CardTitle>
            <CardDescription>
              Gestiona las playeras populares o recomendadas en la página de inicio.
              <span className="block text-sm text-primary font-semibold mt-2">
                ¡Selecciona tus productos más vendidos para atraer más miradas!
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="featured-products-select">Productos Destacados</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between bg-transparent">
                      {selectedFeaturedProducts.length > 0
                        ? `${selectedFeaturedProducts.length} producto(s) seleccionado(s)`
                        : "Seleccionar productos"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2">
                    <div className="grid gap-2">
                      {allProducts.map((product) => (
                        <div key={product.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`product-${product.id}`}
                            checked={selectedFeaturedProducts.includes(product.id)}
                            onCheckedChange={(checked) => handleFeaturedProductChange(product.id, checked as boolean)}
                          />
                          <Label htmlFor={`product-${product.id}`}>{product.name}</Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="submit" className="transition-colors">
                Actualizar Recomendaciones
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Customization Options Settings */}
        <Card className="rounded-none p-0 border-border shadow-sm">
          <CardHeader className="p-4 border-b border-border">
            <CardTitle>Opciones de Personalización</CardTitle>
            <CardDescription>Ajusta las opciones disponibles para la personalización de playeras.</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="max-text-length">Longitud Máxima de Texto</Label>
                <Input id="max-text-length" type="number" value={formData.maxTextLength} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="allowed-fonts">Fuentes Permitidas (separadas por coma)</Label>
                <Input id="allowed-fonts" value={formData.allowedFonts} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="allowed-colors">Colores de Texto Permitidos (hex, separados por coma)</Label>
                <Input id="allowed-colors" value={formData.allowedColors} onChange={handleChange} />
              </div>
              <Button type="submit" className="transition-colors">
                Actualizar Opciones de Personalización
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
