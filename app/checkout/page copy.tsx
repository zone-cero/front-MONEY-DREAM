       <Alert className="mb-6 border-primary/50 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Integración de Mercado Pago</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2 text-sm">
                <p className="font-semibold">Para configurar Mercado Pago en producción:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>
                    Crea una cuenta en{" "}
                    <a
                      href="https://www.mercadopago.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium"
                    >
                      mercadopago.com
                    </a>
                  </li>
                  <li>
                    Ve a <strong>Tu negocio → Configuración → Credenciales</strong>
                  </li>
                  <li>
                    Copia tu <strong>Public Key</strong> y <strong>Access Token</strong>
                  </li>
                  <li>
                    Agrega las credenciales como variables de entorno:
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY</code>
                      </li>
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">MERCADOPAGO_ACCESS_TOKEN</code>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Instala el SDK: <code className="bg-muted px-1 py-0.5 rounded">npm install mercadopago</code>
                  </li>
                </ol>
              </div>
            </AlertDescription>
          </Alert>
