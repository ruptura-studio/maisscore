import { loginAdmin } from './actions'

type SearchParams = Record<string, string | string[] | undefined>

type AdminLoginPageProps = {
  searchParams?: Promise<SearchParams>
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {}
  const errorParam = Array.isArray(resolvedSearchParams.error)
    ? resolvedSearchParams.error[0]
    : resolvedSearchParams.error
  const hasError = errorParam === '1'

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-100 px-4">
        <div className="w-full max-w-[420px] rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-center font-dm text-h2 text-brand-navy">Painel Admin</h1>

          <form action={loginAdmin} className="mt-6 space-y-4">
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-brand-navy">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm text-brand-navy outline-none transition focus:border-brand-navy"
              />
            </div>

            {hasError && (
              <p className="text-sm text-red-600">
                Credencial invalida. Verifique a senha e tente novamente.
              </p>
            )}

            <button type="submit" className="btn-primary w-full justify-center">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
