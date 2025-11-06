import { NextResponse } from "next/server"

/**
 * API Route para crear preferencia de pago en Mercado Pago
 *
 * NOTA: Para que esto funcione en producción, necesitas:
 * 1. Instalar el SDK: npm install mercadopago
 * 2. Configurar las variables de entorno (ver lib/mercadopago.ts)
 * 3. Descomentar el código de abajo y eliminar la respuesta mock
 */

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // MOCK RESPONSE - Reemplazar con código real cuando tengas las credenciales
    // Descomenta el código de abajo cuando tengas Mercado Pago configurado:

    /*
    import mercadopago from "mercadopago"
    
    mercadopago.configure({
      access_token: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    })

    const preference = {
      items: body.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "MXN", // Cambia según tu país
      })),
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_URL}/checkout/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/checkout/pending`,
      },
      auto_return: "approved" as const,
      notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhooks/mercadopago`,
    }

    const response = await mercadopago.preferences.create(preference)
    
    return NextResponse.json({ 
      id: response.body.id,
      init_point: response.body.init_point 
    })
    */

    // RESPUESTA MOCK (eliminar cuando configures Mercado Pago)
    return NextResponse.json({
      id: "mock-preference-id",
      init_point: "https://www.mercadopago.com/checkout/mock",
      message: "Configura tus credenciales de Mercado Pago para usar pagos reales",
    })
  } catch (error) {
    console.error("Error creating preference:", error)
    return NextResponse.json({ error: "Error al crear la preferencia de pago" }, { status: 500 })
  }
}
