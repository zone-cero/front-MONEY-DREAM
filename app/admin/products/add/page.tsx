// app/admin/products/add/page.tsx
"use client"

import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Breadcrumbs } from "@/components/breadcrumbs"
import { 
  ChevronLeft, 
  Upload, 
  X, 
  Plus, 
  Tag,
  CheckCircle2,
  AlertCircle,
  Package,
  Shapes,
  FileImage,
  DollarSign,
  Save,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// ==========================================
// CONFIGURACIÓN CENTRALIZADA POR TIPO
// ==========================================
const PRODUCT_TYPES = {
  ropa: {
    label: "Ropa",
    icon: Package,
    fields: ["material", "careInstructions"],
    sizeOptions: ["XS", "S", "M", "L", "XL", "XXL"],
    colorRequired: true,
  },
  calzado: {
    label: "Calzado",
    icon: Shapes,
    fields: ["materialUpper", "materialSole", "heelHeight"],
    sizeOptions: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colorRequired: true,
  },
  accesorios: {
    label: "Accesorios",
    icon: Tag,
    fields: ["material", "dimensions"],
    sizeOptions: ["Único"],
    colorRequired: false,
  }
}

// ==========================================
// CONFIGURACIÓN DE TEXTO
// ==========================================
const productConfig = {
  pageTitle: "Nuevo Producto",
  pageDescription: "Completa la información para agregar un nuevo producto al catálogo.",
  form: {
    basic: "Información Básica",
    name: "Nombre del Producto",
    namePlaceholder: "Ej: Camiseta Básica",
    description: "Descripción",
    descriptionPlaceholder: "Describe el producto...",
    pricing: "Precio & Inventario",
    price: "Precio Base",
    pricePlaceholder: "0.00",
    stock: "Stock",
    stockPlaceholder: "0",
    sku: "SKU",
    skuPlaceholder: "Código único",
    active: "Activo",
  },
  categories: [
    { value: "ropa", label: "Ropa" },
    { value: "calzado", label: "Calzado" },
    { value: "accesorios", label: "Accesorios" },
  ],
  buttons: {
    addImage: "Agregar Imágenes",
    save: "Guardar Producto",
  },
}

// ==========================================
// ESTADO INICIAL
// ==========================================
type Variant = {
  id: string
  color: string
  colorName: string
  size: string
  stock: number
  price?: number
  image?: File | null
}

const initialState = {
  name: "",
  description: "",
  category: "",
  type: "" as keyof typeof PRODUCT_TYPES,
  brand: "",
  sku: "",
  basePrice: "",
  stock: 0,
  isActive: true,
  hasVariants: false,
  variants: [] as Variant[],
  mainImages: [] as File[],
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function AddProductPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const colorImageRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState(initialState)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTab, setCurrentTab] = useState("basic")

  // Manejo de cambios en inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // Validaciones
  const stockWarning = formData.hasVariants 
    ? formData.variants.some(v => v.stock > 0 && v.stock <= 3)
    : (formData.stock > 0 && formData.stock <= 3)

  useEffect(() => {
    if (stockWarning) {
      toast.warning("Algunas variantes tienen stock bajo (≤3 unidades)", {
        description: "Considera aumentar el inventario",
      })
    }
  }, [stockWarning])

  // Manejo de imágenes principales
  const handleMainImages = (files: FileList | null) => {
    if (!files) return
    const newImages = Array.from(files).filter(f => f.type.startsWith("image/"))
    setFormData(prev => ({
      ...prev,
      mainImages: [...prev.mainImages, ...newImages]
    }))
    toast.success(`${newImages.length} imágenes agregadas`)
  }

  const removeMainImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mainImages: prev.mainImages.filter((_, i) => i !== index)
    }))
    toast.info("Imagen eliminada")
  }

  // Manejo de variantes
  const addVariant = () => {
    if (!formData.type) {
      toast.error("Primero selecciona un tipo de producto")
      return
    }
    
    const typeConfig = PRODUCT_TYPES[formData.type]
    const newVariant: Variant = {
      id: `var-${Date.now()}`,
      color: "",
      colorName: "",
      size: typeConfig.sizeOptions[0],
      stock: 0,
      image: null
    }
    
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant]
    }))
    
    toast.info("Variante creada. Configúrala ahora.")
  }

  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((v, i) => 
        i === index ? { ...v, [field]: value } : v
      )
    }))
  }

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }))
    toast.info("Variante eliminada")
  }

  const handleColorImage = (files: FileList | null, index: number) => {
    if (!files || files.length === 0) return
    const image = files[0]
    updateVariant(index, 'image', image)
    toast.success("Imagen de color asignada")
  }

  // Submit con modal de confirmación
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validaciones
    if (!formData.name || !formData.category || !formData.type) {
      toast.error("Completa los campos obligatorios")
      return
    }

    if (formData.hasVariants && formData.variants.length === 0) {
      toast.error("Agrega al menos una variante")
      return
    }

    setShowConfirmModal(true)
  }

  const confirmSave = async (action: "continue" | "exit") => {
    setShowConfirmModal(false)
    setIsSubmitting(true)
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const payload = {
      ...formData,
      mainImages: formData.mainImages.length,
      variants: formData.variants.map(v => ({ ...v, image: v.image ? v.image.name : null }))
    }
    console.log("Producto guardado:", payload)
    
    toast.success("Producto creado correctamente", {
      description: action === "continue" ? "Puedes seguir editando" : "Redirigiendo..."
    })
    
    if (action === "exit") {
      router.push("/admin/products")
    } else {
      // Resetear form pero mantener algunos datos
      setFormData(prev => ({ ...initialState, type: prev.type, category: prev.category }))
    }
    
    setIsSubmitting(false)
  }

  const typeConfig = formData.type ? PRODUCT_TYPES[formData.type] : null

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
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
            {/* <Breadcrumbs
              links={[
                { href: "/admin/dashboard", label: "Panel" },
                { href: "/admin/products", label: "Productos" },
                { href: "/admin/products/add", label: "Nuevo" },
              ]}
            /> */}
          </div>

          <div>
            <h1 className="text-4xl font-light tracking-tight text-neutral-900">
              {productConfig.pageTitle}
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              {productConfig.pageDescription}
            </p>
          </div>
        </header>

        {/* ALERTA DE STOCK BAJO */}
        {stockWarning && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Stock bajo detectado</AlertTitle>
            <AlertDescription>
              Algunas variantes tienen 3 unidades o menos. Revisa el inventario antes de publicar.
            </AlertDescription>
          </Alert>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit}>
          {/* TABS */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
            <TabsList className="flex gap-2 bg-gray-50 p-1 rounded-lg">
              <TabsTrigger value="basic" className="flex-1">Información</TabsTrigger>
              <TabsTrigger value="variants" className="flex-1" disabled={!formData.type}>Variaciones</TabsTrigger>
              <TabsTrigger value="media" className="flex-1">Imágenes</TabsTrigger>
            </TabsList>

            {/* TAB 1: BÁSICO */}
            <TabsContent value="basic" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  {/* Información Básica */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                      {productConfig.form.basic}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{productConfig.form.name}</Label>
                        <Input 
                          id="name"
                          placeholder={productConfig.form.namePlaceholder}
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Tipo de Producto</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as keyof typeof PRODUCT_TYPES }))} value={formData.type}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(PRODUCT_TYPES).map(([key, config]) => {
                              const Icon = config.icon
                              return (
                                <SelectItem key={key} value={key}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    {config.label}
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">{productConfig.form.description}</Label>
                      <Textarea
                        id="description"
                        placeholder={productConfig.form.descriptionPlaceholder}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="min-h-[150px] resize-none"
                      />
                    </div>
                  </section>

                  {/* Precio & Stock */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                      {productConfig.form.pricing}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="basePrice">{productConfig.form.price}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="basePrice"
                            type="number"
                            step="0.01"
                            placeholder={productConfig.form.pricePlaceholder}
                            value={formData.basePrice}
                            onChange={handleInputChange}
                            required
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">{productConfig.form.stock}</Label>
                        <Input
                          id="stock"
                          type="number"
                          placeholder={productConfig.form.stockPlaceholder}
                          value={formData.stock}
                          onChange={handleInputChange}
                          disabled={formData.hasVariants}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sku">{productConfig.form.sku}</Label>
                        <Input
                          id="sku"
                          placeholder={productConfig.form.skuPlaceholder}
                          value={formData.sku}
                          onChange={handleInputChange}
                          className="font-mono"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-4 border-t border-gray-100">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">¿Tiene variaciones?</Label>
                        <p className="text-xs text-gray-400">Tallas, colores, etc.</p>
                      </div>
                      <Switch
                        checked={formData.hasVariants}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasVariants: checked }))}
                      />
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  <Card className="border-0 shadow-none bg-gray-50">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-medium">Categoría</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))} value={formData.category}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {productConfig.categories.map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-none bg-gray-50">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-medium">Estado</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{productConfig.form.active}</p>
                        <p className="text-xs text-gray-400">Visible en tienda</p>
                      </div>
                      <Switch
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: VARIANTES */}
            <TabsContent value="variants" className="space-y-8">
              {!formData.hasVariants ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-300" />
                  </div>
                  <p className="text-gray-400">Activa "Tiene variaciones" en la pestaña anterior</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Variaciones de {typeConfig?.label}
                    </h2>
                    <Button type="button" size="sm" variant="outline" onClick={addVariant}>
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Variante
                    </Button>
                  </div>

                  <div className="grid gap-6">
                    {formData.variants.map((variant, index) => (
                      <Card key={variant.id} className="border-0 shadow-none bg-gray-50">
                        <CardContent className="p-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-neutral-900">Variante #{index + 1}</h3>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeVariant(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Color */}
                            <div className="space-y-2">
                              <Label>Color</Label>
                              <Input
                                placeholder="Ej: Negro"
                                value={variant.colorName}
                                onChange={(e) => updateVariant(index, 'colorName', e.target.value)}
                                required
                              />
                            </div>

                            {/* Talla */}
                            <div className="space-y-2">
                              <Label>Talla</Label>
                              <Select value={variant.size} onValueChange={(value) => updateVariant(index, 'size', value)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {typeConfig?.sizeOptions.map(size => (
                                    <SelectItem key={size} value={size}>{size}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Stock */}
                            <div className="space-y-2">
                              <Label>Stock</Label>
                              <Input
                                type="number"
                                value={variant.stock}
                                onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                                required
                              />
                              {variant.stock <= 3 && variant.stock > 0 && (
                                <p className="text-xs text-amber-600 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" /> Stock bajo
                                </p>
                              )}
                              {variant.stock === 0 && (
                                <p className="text-xs text-red-600">Sin stock</p>
                              )}
                            </div>
                          </div>

                          {/* Imagen por color */}
                          <div className="space-y-2">
                            <Label>Imagen específica para este color</Label>
                            <div 
                              className="border border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer bg-white hover:border-gray-400 transition-colors"
                              onClick={() => {
                                setSelectedVariantIndex(index)
                                colorImageRef.current?.click()
                              }}
                            >
                              <input
                                ref={colorImageRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleColorImage(e.target.files, index)}
                              />
                              {variant.image ? (
                                <div className="relative w-24 h-24 mx-auto">
                                  <Image
                                    src={URL.createObjectURL(variant.image)}
                                    alt={variant.colorName}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <FileImage className="h-8 w-8 mx-auto text-gray-300" />
                                  <p className="text-sm text-gray-400">Subir imagen</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* TAB 3: IMÁGENES */}
            <TabsContent value="media" className="space-y-8">
              <section className="space-y-6">
                <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Galería Principal
                </h2>
                <Alert>
                  <FileImage className="h-4 w-4" />
                  <AlertTitle>Recomendación</AlertTitle>
                  <AlertDescription>Sube al menos 3 imágenes para mejor presentación del producto</AlertDescription>
                </Alert>
                
                <div
                  className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors bg-white",
                    "border-gray-200 hover:border-gray-400"
                  )}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    handleMainImages(e.dataTransfer.files)
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleMainImages(e.target.files)}
                  />
                  <Upload className="h-8 w-8 mx-auto text-gray-300" />
                  <p className="text-sm text-gray-400 mt-2">{productConfig.buttons.addImage}</p>
                  <p className="text-xs text-gray-300">Arrastra o haz click para seleccionar múltiples</p>
                </div>

                {formData.mainImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-4">
                    {formData.mainImages.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`Main ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeMainImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </TabsContent>
          </Tabs>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                className="text-gray-400 hover:text-neutral-900"
              >
                Cancelar
              </Button>
            </div>
            
            <Button 
              type="submit" 
              size="lg"
              className="bg-neutral-900 hover:bg-neutral-800 text-white px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {productConfig.buttons.save}
                </>
              )}
            </Button>
          </div>
        </form>

        {/* MODAL DE CONFIRMACIÓN */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-light">¿Qué deseas hacer?</DialogTitle>
              <DialogDescription>
                El producto {formData.name} está listo para ser guardado
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1"
              >
                Seguir editando
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => confirmSave("continue")}
                className="flex-1"
              >
                Guardar y crear otro
              </Button>
              <Button
                type="button"
                onClick={() => confirmSave("exit")}
                className="flex-1 bg-neutral-900 hover:bg-neutral-800"
              >
                Guardar y salir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}