import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@radix-ui/react-label'
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'

/* ─── Color Swatch ─── */
function Swatch({ variable, label, textClass = 'text-foreground' }: { variable: string; label: string; textClass?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-lg border border-border/50 shadow-xs"
        style={{ background: `hsl(var(${variable}))` }}
      />
      <div>
        <p className="text-para-xs font-medium text-foreground">{label}</p>
        <p className="text-para-xs text-muted-foreground font-mono">{variable}</p>
      </div>
    </div>
  )
}

/* ─── Section Wrapper ─── */
function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id ?? title.toLowerCase().replace(/\s+/g, '-')} className="flex flex-col gap-6">
      <div className="border-b border-border pb-3">
        <h2 className="text-heading-3 text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  )
}

/* ─── Token Row ─── */
function TokenRow({ name, value, description }: { name: string; value: string; description: string }) {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-border/50 last:border-0">
      <code className="text-para-sm font-mono text-primary bg-muted px-2 py-0.5 rounded w-52 shrink-0">{name}</code>
      <span className="text-para-sm text-muted-foreground w-32 shrink-0">{value}</span>
      <span className="text-para-sm text-foreground">{description}</span>
    </div>
  )
}

export default function StyleguidePage() {
  return (
    <div className="p-10 flex flex-col gap-16 max-w-4xl">

      {/* Header */}
      <div>
        <h1 className="text-heading-1 text-foreground">Design System</h1>
        <p className="text-para-lg text-muted-foreground mt-2">
          Mais Score — tokens, typography, and components extracted from the Figma design.
        </p>
      </div>

      {/* ═══ LOGOS ═══ */}
      <Section title="Logomarcas" id="logomarcas">

        {/* Horizontal */}
        <div>
          <p className="text-para-sm text-muted-foreground mb-3 font-medium">Horizontal</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Light — sobre fundo escuro */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center bg-primary rounded-lg p-8 h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/logo-horizontal-light.svg"
                  alt="Mais Score — Logo Horizontal Light"
                  className="object-contain max-h-12 max-w-[200px]"
                />
              </div>
              <p className="text-para-xs text-muted-foreground text-center">
                Horizontal Light · sobre fundo escuro
              </p>
              <p className="text-para-xs font-mono text-muted-foreground/60 text-center">
                /logos/logo-horizontal-light.svg
              </p>
            </div>

            {/* Dark — sobre fundo claro */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center bg-secondary border border-border rounded-lg p-8 h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/logo-horizontal-dark.svg"
                  alt="Mais Score — Logo Horizontal Dark"
                  className="object-contain max-h-12 max-w-[200px]"
                />
              </div>
              <p className="text-para-xs text-muted-foreground text-center">
                Horizontal Dark · sobre fundo claro
              </p>
              <p className="text-para-xs font-mono text-muted-foreground/60 text-center">
                /logos/logo-horizontal-dark.svg
              </p>
            </div>
          </div>
        </div>

        {/* Vertical */}
        <div>
          <p className="text-para-sm text-muted-foreground mb-3 font-medium">Vertical</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Light — sobre fundo escuro */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center bg-primary rounded-lg p-8 h-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/logo-vertical-light.svg"
                  alt="Mais Score — Logo Vertical Light"
                  className="object-contain max-h-28 max-w-[120px]"
                />
              </div>
              <p className="text-para-xs text-muted-foreground text-center">
                Vertical Light · sobre fundo escuro
              </p>
              <p className="text-para-xs font-mono text-muted-foreground/60 text-center">
                /logos/logo-vertical-light.svg
              </p>
            </div>

            {/* Dark — sobre fundo claro */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center bg-secondary border border-border rounded-lg p-8 h-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/logo-vertical-dark.svg"
                  alt="Mais Score — Logo Vertical Dark"
                  className="object-contain max-h-28 max-w-[120px]"
                />
              </div>
              <p className="text-para-xs text-muted-foreground text-center">
                Vertical Dark · sobre fundo claro
              </p>
              <p className="text-para-xs font-mono text-muted-foreground/60 text-center">
                /logos/logo-vertical-dark.svg
              </p>
            </div>
          </div>
        </div>

        {/* Perfil Social */}
        <div>
          <p className="text-para-sm text-muted-foreground mb-3 font-medium">Perfil Social</p>
          <div className="flex gap-4 items-start">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center bg-primary rounded-2xl overflow-hidden w-24 h-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/perfil-social-mais-score.png"
                  alt="Mais Score — Perfil Social"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-para-xs text-muted-foreground text-center">96×96</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center bg-primary rounded-full overflow-hidden w-24 h-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/perfil-social-mais-score.png"
                  alt="Mais Score — Perfil Social"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-para-xs text-muted-foreground text-center">circular</p>
            </div>
            <div className="flex flex-col justify-center ml-4 gap-1">
              <p className="text-para-xs font-mono text-muted-foreground/60">
                /logos/perfil-social-mais-score.png
              </p>
              <p className="text-para-xs text-muted-foreground">Ícone para redes sociais e favicon</p>
            </div>
          </div>
        </div>

      </Section>

      {/* ═══ COLORS ═══ */}
      <Section title="Colors — Base">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch variable="--background" label="Background" />
          <Swatch variable="--foreground" label="Foreground" />
          <Swatch variable="--card" label="Card" />
          <Swatch variable="--muted" label="Muted" />
          <Swatch variable="--border" label="Border" />
          <Swatch variable="--input" label="Input" />
          <Swatch variable="--ring" label="Ring" />
        </div>
      </Section>

      <Section title="Colors — Brand">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch variable="--primary" label="Primary (Navy)" />
          <Swatch variable="--primary-foreground" label="Primary FG" />
          <Swatch variable="--accent" label="Accent (Blue)" />
          <Swatch variable="--accent-foreground" label="Accent FG" />
          <Swatch variable="--secondary" label="Secondary" />
          <Swatch variable="--secondary-foreground" label="Secondary FG" />
        </div>
      </Section>

      <Section title="Colors — Semantic">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch variable="--success" label="Success" />
          <Swatch variable="--warning" label="Warning" />
          <Swatch variable="--info" label="Info" />
          <Swatch variable="--destructive" label="Destructive" />
        </div>
      </Section>

      <Section title="Colors — Chart">
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <Swatch key={n} variable={`--chart-${n}`} label={`Chart ${n}`} />
          ))}
        </div>
      </Section>

      {/* ═══ TYPOGRAPHY ═══ */}
      <Section title="Typography">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-para-xs text-muted-foreground mb-1 font-mono">text-heading-1 · 48px/48px · -1.5px · 600</p>
            <p className="text-heading-1 text-foreground leading-none">Mais Score</p>
          </div>
          <div>
            <p className="text-para-xs text-muted-foreground mb-1 font-mono">text-heading-2 · 36px/40px · -1px · 600</p>
            <p className="text-heading-2 text-foreground">Regularize seu CPF</p>
          </div>
          <div>
            <p className="text-para-xs text-muted-foreground mb-1 font-mono">text-heading-3 · 24px/28.8px · -1px · 600</p>
            <p className="text-heading-3 text-foreground">Como funciona o processo</p>
          </div>
          <div>
            <p className="text-para-xs text-muted-foreground mb-1 font-mono">text-heading-4 · 20px/24px · 600</p>
            <p className="text-heading-4 text-foreground">97% de taxa de sucesso</p>
          </div>
          <div className="border-t border-border pt-4 flex flex-col gap-3">
            <div>
              <p className="text-para-xs text-muted-foreground mb-0.5 font-mono">text-para-lg · 18px/27px</p>
              <p className="text-para-lg text-foreground">Já recuperamos a liberdade financeira de 1.142 famílias endividadas.</p>
            </div>
            <div>
              <p className="text-para-xs text-muted-foreground mb-0.5 font-mono">text-para-md · 16px/24px</p>
              <p className="text-para-md text-foreground">Remova restrições no Serasa e SPC via processo jurídico próprio.</p>
            </div>
            <div>
              <p className="text-para-xs text-muted-foreground mb-0.5 font-mono">text-para-sm · 14px/20px</p>
              <p className="text-para-sm text-muted-foreground">Taxa de sucesso comprovada em até 15 dias úteis.</p>
            </div>
            <div>
              <p className="text-para-xs text-muted-foreground mb-0.5 font-mono">text-para-xs · 12px/16px</p>
              <p className="text-para-xs text-muted-foreground">*Sujeito a análise de elegibilidade.</p>
            </div>
            <div>
              <p className="text-para-xs text-muted-foreground mb-0.5 font-mono">text-caption · 14px · tracking 1.5px</p>
              <p className="text-caption text-muted-foreground uppercase">Consultar CPF ou CNPJ</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ BORDER RADIUS ═══ */}
      <Section title="Border Radius">
        <div className="flex flex-wrap gap-6 items-end">
          {[
            { label: 'sm · 4px', cls: 'rounded-sm' },
            { label: 'md · 6px', cls: 'rounded-md' },
            { label: 'lg · 8px (--radius)', cls: 'rounded-lg' },
            { label: 'xl · 12px', cls: 'rounded-xl' },
            { label: '2xl · 16px', cls: 'rounded-2xl' },
            { label: 'full', cls: 'rounded-full' },
          ].map(({ label, cls }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 bg-primary ${cls}`} />
              <p className="text-para-xs text-muted-foreground text-center">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SHADOWS ═══ */}
      <Section title="Shadows">
        <div className="flex flex-wrap gap-6">
          {[
            { label: 'shadow-xs', cls: 'shadow-xs' },
            { label: 'shadow-sm', cls: 'shadow-sm' },
            { label: 'shadow-md', cls: 'shadow-md' },
            { label: 'shadow-lg', cls: 'shadow-lg' },
          ].map(({ label, cls }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 bg-card rounded-lg ${cls} border border-border/30`} />
              <p className="text-para-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SPACING TOKENS ═══ */}
      <Section title="Spacing Tokens">
        <div className="flex flex-col gap-1">
          <TokenRow name="--spacing-1" value="4px" description="Extra tight — icon gaps, tag padding" />
          <TokenRow name="--spacing-2" value="8px" description="Tight — inline element gaps" />
          <TokenRow name="--spacing-3" value="12px" description="Compact — button padding Y" />
          <TokenRow name="--spacing-4" value="16px" description="Default — card padding, row gaps" />
          <TokenRow name="--spacing-6" value="24px" description="Comfortable — section inner padding" />
          <TokenRow name="--spacing-8" value="32px" description="Relaxed — component vertical rhythm" />
          <TokenRow name="--spacing-24" value="96px" description="Layout — section horizontal padding (xl+)" />
        </div>
      </Section>

      {/* ═══ BUTTONS ═══ */}
      <Section title="Buttons">
        <div className="flex flex-wrap gap-3 items-center">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <Button size="lg">Large</Button>
          <Button size="default">Default</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      {/* ═══ BADGES ═══ */}
      <Section title="Badges">
        <div className="flex flex-wrap gap-3 items-center">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </Section>

      {/* ═══ CARDS ═══ */}
      <Section title="Cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Financiar Imóveis</CardTitle>
              <CardDescription>Após limpar seu nome, acesse crédito imobiliário.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-para-sm text-muted-foreground">
                Com CPF regularizado, você pode solicitar financiamento habitacional em qualquer banco.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Financiar Veículos</CardTitle>
              <CardDescription>Taxas competitivas para quem tem score alto.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-para-sm text-muted-foreground">
                Recupere sua liberdade de locomoção com financiamento veicular acessível.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ═══ ALERTS ═══ */}
      <Section title="Alerts">
        <div className="flex flex-col gap-3">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Informação</AlertTitle>
            <AlertDescription>O processo leva em média 15 dias úteis.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>Verifique se seu CPF está elegível antes de prosseguir.</AlertDescription>
          </Alert>
          <Alert className="border-success/50 bg-success/5 text-success [&>svg]:text-success">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription className="text-success/80">Nome regularizado com sucesso!</AlertDescription>
          </Alert>
          <Alert className="border-warning/50 bg-warning/5 text-warning [&>svg]:text-warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Aviso</AlertTitle>
            <AlertDescription className="text-warning/80">Documentação pendente de envio.</AlertDescription>
          </Alert>
        </div>
      </Section>

      {/* ═══ RADIO GROUP ═══ */}
      <Section title="Radio Group">
        <RadioGroup defaultValue="option-1" className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-1" id="r1" />
            <Label htmlFor="r1" className="text-para-md cursor-pointer">Consultar CPF — R$ 29,99</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-2" id="r2" />
            <Label htmlFor="r2" className="text-para-md cursor-pointer">Consultar CNPJ — R$ 49,99</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="option-3" id="r3" disabled />
            <Label htmlFor="r3" className="text-para-md text-muted-foreground cursor-not-allowed">Indisponível no momento</Label>
          </div>
        </RadioGroup>
      </Section>

    </div>
  )
}
