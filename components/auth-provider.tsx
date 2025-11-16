"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setUser, setLoading } from "@/lib/features/auth/authSlice"
import { getUserFromDB } from "@/lib/indexdb"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const restoreSession = async () => {
      try {
        console.log('[v0] Checking for existing session in IndexedDB...')
        const user = await getUserFromDB()
        
        if (user) {
          console.log('[v0] Session restored for user:', user.email)
          dispatch(setUser(user))
        } else {
          console.log('[v0] No existing session found')
          dispatch(setLoading(false))
        }
      } catch (error) {
        console.error('[v0] Error restoring session:', error)
        dispatch(setLoading(false))
      }
    }

    restoreSession()
  }, [dispatch])

  // Optional: Show loading screen while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
