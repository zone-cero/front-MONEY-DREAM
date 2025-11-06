"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
// Componentes de UI
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Redux/Auth
import { useAppDispatch } from "@/lib/hooks"
import { setUser, type UserState } from "@/lib/features/auth/authSlice" // Asegúrate de que 'UserState' se exporta

// --- Configuración de Pruebas ---
const TEST_CREDENTIALS: Record<string, Omit<UserState, 'status'>> = {
  "admin@moneydream.com": { id: "1", email: "admin@moneydream.com", name: "Administrador", role: "admin" },
  "cliente@moneydream.com": { id: "2", email: "cliente@moneydream.com", name: "Cliente", role: "client" },
}

// Interfaz para el estado del formulario
interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  // Estados para manejo de UI y errores
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Estado profesional para el formulario (Controlado)
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  })

  // Manejo de cambios tipado y genérico
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    // Limpiar el error cuando el usuario empieza a escribir
    if (error) setError(null); 
  }, [error])


  const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { email, password } = formState

    // 1. Validación Básica en el Cliente
    if (!email || !password) {
      setError("Por favor, introduce tu correo electrónico y contraseña.")
      setIsLoading(false)
      return
    }

    try {
        // En un entorno de producción, aquí iría la **llamada a la API real**
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Simulación de respuesta API
        const userProfile = TEST_CREDENTIALS[email]

        if (userProfile && password === "123456") {
            // Autenticación exitosa
            dispatch(setUser(userProfile))
            const redirectTo = userProfile.role === "admin" ? "/admin" : "/dashboard"
            router.push(redirectTo)
        } else {
            // Error de credenciales
            setError("Credenciales no válidas. Por favor, verifica tu email y contraseña.")
        }

    } catch (apiError) {
        // Manejo de errores de red o servidor real
        console.error("Error de autenticación:", apiError)
        setError("Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo.")
    } finally {
        setIsLoading(false)
    }
  }, [formState, dispatch, router])


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        
        {/* Encabezado */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-4xl text-cyan-900 dark:text-white tracking-tight">
              MONEY DREAM
            </h1>
          </Link>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">
            Bienvenido de vuelta
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Accede a tu plataforma de gestión financiera.
          </p>
        </div>
        
        {/* Tarjeta de Inicio de Sesión */}
        <Card className="shadow-lg p-10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Inicio de Sesión</CardTitle>
            <CardDescription>Introduce tus credenciales.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-6">
              
              {/* Campo Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="ejemplo@dominio.com" 
                  autoComplete="email" 
                  value={formState.email}
                  onChange={handleChange}
                  required 
                  disabled={isLoading}
                />
              </div>
              
              {/* Campo Contraseña */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link 
                    href="/recuperar-contrasena" 
                    className="ml-auto inline-block text-sm underline text-primary hover:opacity-80 transition-opacity"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  autoComplete="current-password" 
                  value={formState.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              
              {/* Mensaje de Error */}
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 rounded-md text-sm text-red-700 dark:text-red-400 font-medium">
                  {error}
                </div>
              )}
              
              {/* Botón de Envío */}
              <Button
                type="submit"
                className="w-full h-10 transition-transform transform hover:scale-[1.01] active:scale-[0.99] font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Validando acceso..." : "Acceder de Forma Segura"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Enlace de Registro */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿No tienes una cuenta de **Money Dream**?{" "}
          <Link href="/registro" className="font-medium text-primary hover:underline">
            Crea una cuenta ahora
          </Link>
        </p>
      </div>
    </div>
  )
}