/**
 * Mercado Pago Integration
 *
 * INSTRUCCIONES PARA CONFIGURAR MERCADO PAGO:
 *
 * 1. Crear cuenta en Mercado Pago:
 *    - Ve a https://www.mercadopago.com
 *    - Crea una cuenta de vendedor
 *
 * 2. Obtener credenciales:
 *    - Inicia sesión en tu cuenta de Mercado Pago
 *    - Ve a: Tu negocio → Configuración → Credenciales
 *    - Copia tu Public Key y Access Token
 *
 * 3. Configurar variables de entorno:
 *    Agrega estas variables en tu proyecto Vercel o archivo .env.local:
 *    - NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=tu_public_key_aqui
 *    - MERCADOPAGO_ACCESS_TOKEN=tu_access_token_aqui
 *
 * 4. Instalar SDK:
 *    npm install mercadopago
 *
 * 5. Modo de prueba vs Producción:
 *    - Usa las credenciales de TEST para desarrollo
 *    - Usa las credenciales de PRODUCCIÓN cuando estés listo para vender
 *
 * 6. Documentación oficial:
 *    https://www.mercadopago.com.mx/developers/es/docs
 */

// Configuración del cliente de Mercado Pago
export const mercadoPagoConfig = {
  publicKey: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "",
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
}

// Tipos para Mercado Pago
export interface MercadoPagoItem {
  id: string
  title: string
  description?: string
  picture_url?: string
  category_id?: string
  quantity: number
  unit_price: number
}

export interface MercadoPagoPreference {
  items: MercadoPagoItem[]
  payer?: {
    name?: string
    surname?: string
    email?: string
    phone?: {
      area_code?: string
      number?: string
    }
    address?: {
      zip_code?: string
      street_name?: string
      street_number?: string
    }
  }
  back_urls?: {
    success?: string
    failure?: string
    pending?: string
  }
  auto_return?: "approved" | "all"
  notification_url?: string
  statement_descriptor?: string
  external_reference?: string
}

/**
 * Ejemplo de uso en un API Route:
 *
 * // app/api/create-preference/route.ts
 * import { NextResponse } from "next/server"
 * import mercadopago from "mercadopago"
 * import { mercadoPagoConfig } from "@/lib/mercadopago"
 *
 * mercadopago.configure({
 *   access_token: mercadoPagoConfig.accessToken,
 * })
 *
 * export async function POST(request: Request) {
 *   const body = await request.json()
 *
 *   const preference = {
 *     items: body.items,
 *     back_urls: {
 *       success: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
 *       failure: `${process.env.NEXT_PUBLIC_URL}/checkout/failure`,
 *       pending: `${process.env.NEXT_PUBLIC_URL}/checkout/pending`,
 *     },
 *     auto_return: "approved",
 *   }
 *
 *   const response = await mercadopago.preferences.create(preference)
 *   return NextResponse.json({ id: response.body.id })
 * }
 */

export default mercadoPagoConfig
