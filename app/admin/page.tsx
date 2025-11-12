// app/admin/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  AlertCircle,
  Package,
  Users,
  ArrowUpRight,
  Eye
} from "lucide-react"

// OBJETO DE CONFIGURACIÓN ÚNICO
const dashboardConfig = {
  brand: {
    name: "MONEY DREAM",
    tagline: "Gestión de Inventario Premium"
  },
  kpis: [
    {
      id: "revenue",
      title: "Ingresos del Mes",
      value: "$127,450.00",
      change: "+18.7%",
      trend: "positive",
      icon: DollarSign,
      accent: "from-neutral-900 to-neutral-700"
    },
    {
      id: "orders",
      title: "Órdenes esta Semana",
      value: "2,847",
      change: "+12.3%",
      trend: "positive",
      icon: ShoppingCart,
      accent: "from-zinc-800 to-zinc-600"
    },
    {
      id: "stock",
      title: "Alertas de Stock",
      value: "23 productos",
      change: "Ver ahora",
      trend: "warning",
      icon: AlertCircle,
      accent: "from-amber-600 to-amber-500"
    },
    {
      id: "customers",
      title: "Clientes Nuevos",
      value: "1,392",
      change: "+8.1%",
      trend: "positive",
      icon: Users,
      accent: "from-slate-700 to-slate-600"
    }
  ],
  products: [
    { rank: 1, name: "Zapatillas Urban Pro", units: 342, revenue: 8540 },
    { rank: 2, name: "Jeans Slim Fit", units: 289, revenue: 7225 },
    { rank: 3, name: "Camiseta Premium", units: 198, revenue: 2970 },
    { rank: 4, name: "Sneakers Limited", units: 156, revenue: 6240 }
  ]
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER EDITORIAL */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-light tracking-tight text-neutral-900">
                {dashboardConfig.brand.name}
              </h1>
              <p className="mt-2 text-sm text-gray-500 tracking-wide uppercase">
                {dashboardConfig.brand.tagline}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="tracking-wider">SISTEMA ACTIVO</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        
        {/* SECCIÓN DE MÉTRICAS */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {dashboardConfig.kpis.map((kpi) => {
              const Icon = kpi.icon
              return (
                <Card 
                  key={kpi.id} 
                  className="group border-0 shadow-none hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {kpi.title}
                      </CardTitle>
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.accent}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-light text-neutral-900">
                        {kpi.value}
                      </span>
                      <span className={`text-xs font-medium flex items-center gap-1 ${
                        kpi.trend === 'positive' ? 'text-green-600' : 
                        'text-amber-600'
                      }`}>
                        {kpi.change}
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* SECCIÓN INFERIOR */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* GRÁFICO DE RENDIMIENTO */}
          <Card className="lg:col-span-2 border border-gray-100 shadow-none">
            <CardHeader className="border-b border-gray-100 pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-normal text-neutral-900">
                  Rendimiento de Ventas
                </CardTitle>
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Últimos 30 días
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-neutral-900 rounded-full flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Integra tu gráfico de ventas aquí
                  </p>
                  <p className="text-xs text-gray-400">
                    Recharts • Chart.js • D3.js
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TOP PRODUCTOS */}
          <Card className="border border-gray-100 shadow-none">
            <CardHeader className="border-b border-gray-100 pb-6">
              <CardTitle className="text-lg font-normal text-neutral-900">
                Top Productos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="divide-y divide-gray-100">
                {dashboardConfig.products.map((product) => (
                  <li 
                    key={product.rank} 
                    className="py-4 flex items-center justify-between group hover:bg-gray-50 px-2 -mx-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-light text-gray-300">
                        {product.rank}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {product.units} unidades
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-neutral-900">
                      ${product.revenue.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}