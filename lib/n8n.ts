const N8N_BASE_URL = process.env.N8N_WEBHOOK_BASE_URL
// Configure em .env.local:
// N8N_WEBHOOK_BASE_URL=https://auto.maisscore.com.br/webhook

export async function triggerN8nWebhook(path: string, payload: Record<string, unknown>): Promise<void> {
  if (!N8N_BASE_URL) {
    console.warn('[n8n] N8N_WEBHOOK_BASE_URL não definido. Webhook não disparado.')
    return
  }

  const normalizedPath = path.replace(/^\/+/, '')
  const webhookUrl = `${N8N_BASE_URL.replace(/\/+$/, '')}/${normalizedPath}`

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.error(`[n8n] Falha ao disparar webhook (${normalizedPath})`, error)
  }
}
