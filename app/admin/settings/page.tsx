"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ChevronLeft, 
  Store, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  MessageCircle,
  Star,
  Palette,
  Type,
  ShoppingCart,
  Settings,
  Globe,
  CreditCard,
  Truck,
  Shield
} from "lucide-react"
import { useRouter } from "next/navigation"
import Breadcrumbs from "@/components/breadcrumbs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  
  const [formData, setFormData] = useState({
    // Información general
    storeName: "Variedades El Buen Precio",
    storeDescription: "Tu tienda de confianza para todo lo que necesitas",
    storeEmail: "info@variedadeselbuenprecio.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Calle Principal, Ciudad, Estado, CP 12345",
    
    // Redes sociales y contacto
    whatsapp: "https://wa.me/15551234567",
    facebook: "https://facebook.com/variedadeselbuenprecio",
    instagram: "https://instagram.com/variedadeselbuenprecio",
    
    // Horarios
    businessHours: "Lunes - Viernes: 9:00 AM - 8:00 PM\nSábado: 9:00 AM - 6:00 PM\nDomingo: 10:00 AM - 4:00 PM",
    
    // Configuración de tienda
    currency: "MXN",
    taxRate: "16",
    freeShippingThreshold: "500",
    maxTextLength: "50",
    allowedFonts: "Arial, Helvetica, Times New Roman, Georgia",
    allowedColors: "#000000, #FFFFFF, #FF0000, #00FF00, #0000FF, #FFFF00, #FF00FF, #00FFFF",
    
    // Configuración de funciones
    enableReviews: true,
    enableWishlist: true,
    enableCompare: true,
    enableGiftWrapping: false,
    enableCustomization: true,
  })

  const [selectedFeaturedProducts, setSelectedFeaturedProducts] = useState<string[]>(["prod001", "prod003"])

  // Datos de productos de ejemplo para una tienda de variedades
  const allProducts = useMemo(
    () => [
      { id: "prod001", name: "Juego de Utensilios de Cocina", category: "Hogar" },
      { id: "prod002", name: "Set de Maquillaje Profesional", category: "Belleza" },
      { id: "prod003", name: "Juguete Educativo para Niños", category: "Juguetes" },
      { id: "prod004", name: "Lámpara LED Moderna", category: "Hogar" },
      { id: "prod005", name: "Reloj Deportivo Inteligente", category: "Tecnología" },
      { id: "prod006", name: "Set de Herramientas Básicas", category: "Herramientas" },
      { id: "prod007", name: "Mochila Impermeable", category: "Accesorios" },
      { id: "prod008", name: "Difusor de Aromas", category: "Hogar" },
    ],
    [],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFeaturedProductChange = (productId: string, checked: boolean) => {
    setSelectedFeaturedProducts((prev) => 
      checked ? [...prev, productId] : prev.filter((id) => id !== productId)
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const settingsData = {
      ...formData,
      featuredProducts: selectedFeaturedProducts
    }
    console.log("Configuración guardada:", settingsData)
    // Aquí iría la llamada a la API para guardar la configuración
    alert("Configuración guardada exitosamente")
  }

  const SettingSection = ({ 
    title, 
    description, 
    icon: Icon, 
    children 
  }: { 
    title: string
    description: string
    icon: React.ComponentType<any>
    children: React.ReactNode
  }) => (
    <Card className="border-0 shadow-none bg-gray-50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neutral-900 rounded-lg">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        
        {/* HEADER */}
        <header className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-gray-400 hover:text-neutral-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Breadcrumbs
              links={[
                { href: "/admin/dashboard", label: "Panel" },
                { href: "/admin/settings", label: "Configuración" },
              ]}
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-light tracking-tight text-neutral-900">
                Configuración de la Tienda
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Gestiona la configuración general de tu tienda de variedades
              </p>
            </div>

            <Button 
              type="submit" 
              form="settings-form"
              className="bg-neutral-900 hover:bg-neutral-800"
            >
              <Settings className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </header>

        {/* CONTENT */}
        <form id="settings-form" onSubmit={handleSubmit} className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="flex gap-2 bg-gray-50 p-1 rounded-lg">
              <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
              <TabsTrigger value="products" className="flex-1">Productos</TabsTrigger>
              <TabsTrigger value="customization" className="flex-1">Personalización</TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">Envíos & Pagos</TabsTrigger>
            </TabsList>

            {/* TAB GENERAL */}
            <TabsContent value="general" className="space-y-6">
              <SettingSection 
                title="Información Básica" 
                description="Configura la información fundamental de tu tienda"
                icon={Store}
              >
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="storeName">Nombre de la Tienda</Label>
                    <Input 
                      id="storeName" 
                      value={formData.storeName} 
                      onChange={handleChange}
                      placeholder="Ej: Variedades El Buen Precio"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="storeDescription">Descripción de la Tienda</Label>
                    <Textarea 
                      id="storeDescription" 
                      value={formData.storeDescription} 
                      onChange={handleChange}
                      placeholder="Describe los productos y servicios de tu tienda..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="storeEmail" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Correo Electrónico
                      </Label>
                      <Input 
                        id="storeEmail" 
                        type="email" 
                        value={formData.storeEmail} 
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="storePhone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Teléfono
                      </Label>
                      <Input 
                        id="storePhone" 
                        value={formData.storePhone} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </SettingSection>

              <SettingSection 
                title="Ubicación y Contacto" 
                description="Información de ubicación y redes sociales"
                icon={MapPin}
              >
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="storeAddress">Dirección Completa</Label>
                    <Textarea 
                      id="storeAddress" 
                      value={formData.storeAddress} 
                      onChange={handleChange}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="whatsapp" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </Label>
                      <Input 
                        id="whatsapp" 
                        value={formData.whatsapp} 
                        onChange={handleChange}
                        placeholder="https://wa.me/..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input 
                        id="facebook" 
                        value={formData.facebook} 
                        onChange={handleChange}
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input 
                        id="instagram" 
                        value={formData.instagram} 
                        onChange={handleChange}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="businessHours" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Horario de Atención
                    </Label>
                    <Textarea 
                      id="businessHours" 
                      value={formData.businessHours} 
                      onChange={handleChange}
                      className="min-h-[100px]"
                      placeholder="Especifica los horarios de atención..."
                    />
                  </div>
                </div>
              </SettingSection>
            </TabsContent>

            {/* TAB PRODUCTOS */}
            <TabsContent value="products" className="space-y-6">
              <SettingSection 
                title="Productos Destacados" 
                description="Selecciona los productos que quieres mostrar en la sección destacada"
                icon={Star}
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Productos Seleccionados ({selectedFeaturedProducts.length})</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between bg-white">
                          {selectedFeaturedProducts.length > 0
                            ? `${selectedFeaturedProducts.length} producto(s) seleccionado(s)`
                            : "Seleccionar productos destacados"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-3">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label>Productos Disponibles</Label>
                            <Badge variant="secondary">
                              {allProducts.length} total
                            </Badge>
                          </div>
                          <div className="max-h-60 overflow-y-auto space-y-2">
                            {allProducts.map((product) => (
                              <div key={product.id} className="flex items-center space-x-3 p-2 rounded-lg border">
                                <Checkbox
                                  id={`product-${product.id}`}
                                  checked={selectedFeaturedProducts.includes(product.id)}
                                  onCheckedChange={(checked) => 
                                    handleFeaturedProductChange(product.id, checked as boolean)
                                  }
                                />
                                <div className="flex-1 min-w-0">
                                  <Label htmlFor={`product-${product.id}`} className="font-medium text-sm block truncate">
                                    {product.name}
                                  </Label>
                                  <span className="text-xs text-gray-500">{product.category}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {selectedFeaturedProducts.length > 0 && (
                    <div className="space-y-2">
                      <Label>Productos Seleccionados:</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedFeaturedProducts.map(productId => {
                          const product = allProducts.find(p => p.id === productId)
                          return product ? (
                            <Badge key={productId} variant="secondary" className="flex items-center gap-1">
                              {product.name}
                              <button
                                type="button"
                                onClick={() => handleFeaturedProductChange(productId, false)}
                                className="ml-1 hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </SettingSection>

              <SettingSection 
                title="Funcionalidades de Productos" 
                description="Activa o desactiva funciones relacionadas con productos"
                icon={ShoppingCart}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Reseñas de Productos</Label>
                      <p className="text-xs text-gray-500">Permitir que los clientes dejen reseñas</p>
                    </div>
                    <Switch
                      checked={formData.enableReviews}
                      onCheckedChange={(checked) => handleSwitchChange("enableReviews", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Lista de Deseos</Label>
                      <p className="text-xs text-gray-500">Permitir guardar productos en lista de deseos</p>
                    </div>
                    <Switch
                      checked={formData.enableWishlist}
                      onCheckedChange={(checked) => handleSwitchChange("enableWishlist", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Comparar Productos</Label>
                      <p className="text-xs text-gray-500">Permitir comparar productos entre sí</p>
                    </div>
                    <Switch
                      checked={formData.enableCompare}
                      onCheckedChange={(checked) => handleSwitchChange("enableCompare", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Envoltura para Regalo</Label>
                      <p className="text-xs text-gray-500">Ofrecer servicio de envoltura para regalo</p>
                    </div>
                    <Switch
                      checked={formData.enableGiftWrapping}
                      onCheckedChange={(checked) => handleSwitchChange("enableGiftWrapping", checked)}
                    />
                  </div>
                </div>
              </SettingSection>
            </TabsContent>

            {/* TAB PERSONALIZACIÓN */}
            <TabsContent value="customization" className="space-y-6">
              <SettingSection 
                title="Opciones de Personalización" 
                description="Configura las opciones disponibles para productos personalizables"
                icon={Palette}
              >
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Personalización de Productos</Label>
                      <p className="text-xs text-gray-500">Permitir personalización en productos compatibles</p>
                    </div>
                    <Switch
                      checked={formData.enableCustomization}
                      onCheckedChange={(checked) => handleSwitchChange("enableCustomization", checked)}
                    />
                  </div>

                  {formData.enableCustomization && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="maxTextLength" className="flex items-center gap-2">
                          <Type className="h-4 w-4" />
                          Longitud Máxima de Texto
                        </Label>
                        <Input 
                          id="maxTextLength" 
                          type="number" 
                          value={formData.maxTextLength} 
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="allowedFonts">Fuentes Permitidas</Label>
                        <Textarea 
                          id="allowedFonts" 
                          value={formData.allowedFonts} 
                          onChange={handleChange}
                          placeholder="Separa las fuentes con comas"
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="allowedColors">Colores Permitidos (códigos HEX)</Label>
                        <Textarea 
                          id="allowedColors" 
                          value={formData.allowedColors} 
                          onChange={handleChange}
                          placeholder="Separa los colores con comas. Ej: #000000, #FFFFFF"
                          className="min-h-[80px]"
                        />
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.allowedColors.split(',').map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: color.trim() }}
                              title={color.trim()}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SettingSection>
            </TabsContent>

            {/* TAB ENVÍOS & PAGOS */}
            <TabsContent value="shipping" className="space-y-6">
              <SettingSection 
                title="Configuración de Envíos" 
                description="Gestiona las opciones de envío y entrega"
                icon={Truck}
              >
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="freeShippingThreshold">Umbral para Envío Gratis</Label>
                    <div className="flex gap-2">
                      <Select 
                        value={formData.currency} 
                        onValueChange={(value) => handleSelectChange("currency", value)}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MXN">MXN</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input 
                        id="freeShippingThreshold" 
                        type="number" 
                        value={formData.freeShippingThreshold} 
                        onChange={handleChange}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </SettingSection>

              <SettingSection 
                title="Configuración de Pagos" 
                description="Gestiona las opciones de pago e impuestos"
                icon={CreditCard}
              >
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="taxRate">Tasa de Impuesto (%)</Label>
                    <Input 
                      id="taxRate" 
                      type="number" 
                      step="0.01"
                      value={formData.taxRate} 
                      onChange={handleChange}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </SettingSection>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  )
}