# Configuración de Mercado Pago

Esta guía te ayudará a configurar Mercado Pago en tu aplicación de ecommerce.

## Paso 1: Crear Cuenta en Mercado Pago

1. Ve a [https://www.mercadopago.com](https://www.mercadopago.com)
2. Haz clic en "Crear cuenta"
3. Completa el registro como vendedor
4. Verifica tu cuenta con tu información personal y bancaria

## Paso 2: Obtener Credenciales

1. Inicia sesión en tu cuenta de Mercado Pago
2. Ve a **Tu negocio → Configuración → Credenciales**
3. Encontrarás dos tipos de credenciales:
   - **Credenciales de prueba**: Para desarrollo y testing
   - **Credenciales de producción**: Para ventas reales

### Credenciales necesarias:
- **Public Key**: Se usa en el frontend (cliente)
- **Access Token**: Se usa en el backend (servidor)

## Paso 3: Configurar Variables de Entorno

Agrega estas variables en tu proyecto:

### En Vercel:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las siguientes variables:

\`\`\`
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=tu_public_key_aqui
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_aqui
NEXT_PUBLIC_URL=https://tu-dominio.vercel.app
\`\`\`

### En desarrollo local (.env.local):
\`\`\`env
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_URL=http://localhost:3000
\`\`\`

## Paso 4: Instalar SDK

\`\`\`bash
npm install mercadopago
\`\`\`

## Paso 5: Activar el Código Real

1. Abre el archivo `app/api/create-preference/route.ts`
2. Descomenta el código de integración real
3. Elimina la respuesta mock

## Paso 6: Probar la Integración

### Modo de Prueba:
Usa las credenciales de TEST y estas tarjetas de prueba:

**Tarjeta aprobada:**
- Número: 5031 7557 3453 0604
- CVV: 123
- Fecha: 11/25

**Tarjeta rechazada:**
- Número: 5031 4332 1540 6351
- CVV: 123
- Fecha: 11/25

### Modo Producción:
1. Cambia a las credenciales de producción
2. Completa el proceso de verificación de Mercado Pago
3. Configura tus métodos de cobro preferidos

## Paso 7: Configurar Webhooks (Opcional pero Recomendado)

Los webhooks te notifican cuando cambia el estado de un pago:

1. En Mercado Pago, ve a **Configuración → Webhooks**
2. Agrega la URL: `https://tu-dominio.vercel.app/api/webhooks/mercadopago`
3. Selecciona los eventos que quieres recibir

## Recursos Adicionales

- [Documentación oficial](https://www.mercadopago.com.mx/developers/es/docs)
- [SDK de Node.js](https://github.com/mercadopago/sdk-nodejs)
- [Tarjetas de prueba](https://www.mercadopago.com.mx/developers/es/docs/checkout-api/testing)

## Soporte

Si tienes problemas:
1. Revisa la [documentación oficial](https://www.mercadopago.com.mx/developers/es/support)
2. Contacta al soporte de Mercado Pago
3. Verifica que tus credenciales sean correctas
4. Asegúrate de estar usando las credenciales del ambiente correcto (test/producción)
