// app/(frontend)/about/page.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { Breadcrumbs } from "@/components/breadcrumbs"
import { cn } from "@/lib/utils"
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  TrendingUp,
  ChevronRight,
  Mail
} from "lucide-react"
import { Header } from "@/components/header"

const aboutConfig = {
  title: "Nuestra Historia",
  subtitle: "Más de una década definiendo estilo",
  hero: {
    image: "/elegant-fashion-store-interior-with-modern-minimal.jpg",
    text: "Desde 2013, creamos espacios donde la moda encuentra la individualidad",
  },
  values: [
    { icon: Target, title: "Misión", desc: "Empoderar a través del diseño atemporal" },
    { icon: Eye, title: "Visión", desc: "Ser referente de estilo consciente" },
    { icon: Heart, title: "Valores", desc: "Calidad, minimalismo, sostenibilidad" },
  ],
  team: [
    { name: "Ana García", role: "Directora Creativa", image: "/team-ana.jpg" },
    { name: "Carlos Ruiz", role: "Curador de Estilo", image: "/team-carlos.jpg" },
    { name: "María López", role: "Diseñadora Principal", image: "/team-maria.jpg" },
  ],
  stats: [
    { number: "10K+", label: "Clientes Satisfechos" },
    { number: "50+", label: "Marcas Exclusivas" },
    { number: "99%", label: "Calificación" },
  ]
}

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <Header/>
      <section className="relative h-[70vh] md:h-[90vh] overflow-hidden">
        <Image
          src={aboutConfig.hero.image}
          alt="Nuestra tienda"
          fill
          className="object-cover scale-105 transition-transform duration-1000"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/30 to-transparent" />
        
        <div className="absolute bottom-16 md:bottom-24 left-6 md:left-24 max-w-2xl space-y-4">
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-neutral-900">
            {aboutConfig.title}
          </h1>
          <p className="text-sm text-gray-400 tracking-wider uppercase">
            {aboutConfig.subtitle}
          </p>
          <p className="text-base md:text-lg text-neutral-700">
            {aboutConfig.hero.text}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      {/* <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumbs links={[{ href: "/", label: "Inicio" }, { label: "Sobre Nosotros" }]} />
      </div> */}

      {/* Valores */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="grid md:grid-cols-3 gap-12">
          {aboutConfig.values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group space-y-4">
              <Icon className="h-8 w-8 text-neutral-400 group-hover:text-lime-400 transition-colors" />
              <h2 className="text-2xl font-light tracking-tight">{title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {aboutConfig.stats.map(stat => (
              <div key={stat.label} className="space-y-2">
                <h3 className="text-4xl md:text-6xl font-light tracking-tighter text-neutral-900">
                  {stat.number}
                </h3>
                <p className="text-xs text-gray-400 tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-light tracking-tighter">El Equipo</h2>
          <p className="text-sm text-gray-400 max-w-md">
            El talento detrás de cada selección
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {aboutConfig.team.map(member => (
            <Card key={member.name} className="border-0 shadow-none group">
              <CardContent className="p-0 space-y-4">
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={500}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-xs text-gray-400">{member.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}