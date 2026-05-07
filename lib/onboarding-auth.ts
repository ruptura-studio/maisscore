import 'server-only'

const REQUIRED_ENV_VARS = ['ONBOARDING_WEBHOOK_TOKEN'] as const

function readEnv(name: (typeof REQUIRED_ENV_VARS)[number]): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`[config] Missing required environment variable: ${name}`)
  }
  return value
}

// Validacao de boot para impedir deploy em producao sem o token obrigatorio.
if (process.env.NODE_ENV === 'production') {
  for (const envName of REQUIRED_ENV_VARS) {
    readEnv(envName)
  }
}

export function getOnboardingWebhookToken(): string | null {
  return process.env.ONBOARDING_WEBHOOK_TOKEN?.trim() || null
}
