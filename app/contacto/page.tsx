// app/(frontend)/contact/page.tsx
"use client"

import { useState, FormEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { toast } from "sonner"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Loader2
} from "lucide-react"
import { Header } from "@/components/header"

const contactConfig = {
  title: "Contacto",
  subtitle: "Hablemos de tu próxima pieza favorita",
  info: [
    { icon: MapPin, title: "Ubicación", detail: "Av. Reforma 250, CDMX" },
    { icon: Phone, title: "Teléfono", detail: "+52 55 1234 5678" },
    { icon: Mail, title: "Email", detail: "hola@moneydream.com" },
    { icon: Clock, title: "Horario", detail: "Lun-Sab 10:00-19:00" },
  ],
  form: {
    name: "Nombre completo",
    email: "Correo electrónico",
    subject: "Asunto",
    message: "Mensaje",
    submit: "Enviar mensaje",
    success: "Mensaje enviado correctamente",
  }
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(r => setTimeout(r, 1500))
    toast.success(contactConfig.form.success)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <Header/>
      <section className="bg-gray-50 mt-40 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter">
            {contactConfig.title}
          </h1>
          <p className="text-sm text-gray-400 tracking-wider uppercase">
            {contactConfig.subtitle}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      {/* <div className="max-w-7xl mx-auto px-6 py-6">
        <Breadcrumb links={[{ href: "/", label: "Inicio" }, { label: "Contacto" }]} />
      </div> */}

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-3 gap-12">
        
        {/* Info */}
        <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
          {contactConfig.info.map(({ icon: Icon, title, detail }) => (
            <Card key={title} className="border-0 shadow-none bg-gray-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-neutral-400" />
                <Badge variant="outline" className="border-neutral-200 px-3 py-1">
                  {detail}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </aside>

        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-none bg-gray-50">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-light tracking-tight">
                Envíanos un mensaje
              </CardTitle>
              <CardTitle className="text-sm text-gray-400">
                Responderemos en menos de 24 horas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-neutral-900">
                      {contactConfig.form.name}
                    </Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="border-gray-200 bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-neutral-900">
                      {contactConfig.form.email}
                    </Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="border-gray-200 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-neutral-900">
                    {contactConfig.form.subject}
                  </Label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                    className="border-gray-200 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-neutral-900">
                    {contactConfig.form.message}
                  </Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="min-h-[180px] border-gray-200 bg-white resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {contactConfig.form.submit}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}