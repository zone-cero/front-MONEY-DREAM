import { NextResponse } from "next/server"

/**
 * API Route para crear preferencia de pago en Mercado Pago
 *
 * CONFIGURACIÓN:
 * 1. Crea una cuenta en https://www.mercadopago.com
 * 2. Ve a Tu negocio → Configuración → Credenciales
 * 3. Copia tu Public Key y Access Token
 * 4. Agrega las variables de entorno en Vercel:
 *    - NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
 *    - MERCADOPAGO_ACCESS_TOKEN
 * 5. Instala el SDK: npm install mercadopago
 */

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

    if (!accessToken) {
      console.warn("MERCADOPAGO_ACCESS_TOKEN not configured")
      return NextResponse.json({
        id: "mock-preference-id",
        init_point: null,
        message:
          "Configura tu MERCADOPAGO_ACCESS_TOKEN en las variables de entorno para usar pagos reales. Ver MERCADOPAGO_SETUP.md para instrucciones.",
      })
    }

    const preference = {
      items: body.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: parseFloat(item.unit_price),
        currency_id: "USD", // Cambia según tu país: MXN, ARS, BRL, etc.
      })),
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/failure`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/pending`,
      },
      auto_return: "approved",
      notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`,
    }

    // Call MercadoPago API
    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preference),
    })

    if (!mpResponse.ok) {
      const errorData = await mpResponse.json()
      console.error("MercadoPago API error:", errorData)
      throw new Error("Error al crear la preferencia en MercadoPago")
    }

    const data = await mpResponse.json()

    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
    })
  } catch (error) {
    console.error("Error creating preference:", error)
    return NextResponse.json({ error: "Error al crear la preferencia de pago" }, { status: 500 })
  }
}
