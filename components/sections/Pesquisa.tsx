import Image from 'next/image'

const STATS = [
  {
    icon: '/icons/icon-negativados.svg',
    title: '76 mi de negativados',
    description:
      'Quase metade das pessoas adultas brasileiras tem o nome restrito nos sistemas de crédito.',
  },
  {
    icon: '/icons/icon-card-slash.svg',
    title: 'Financiamento negado',
    description:
      'CPF com negativação é o principal motivo de reprovação de financiamento imobiliário no Brasil.',
  },
  {
    icon: '/icons/icon-visibilidade.svg',
    title: 'Invisíveis ao crédito',
    description:
      '57 milhões de pessoas nem sabem que estão negativadas. A dívida cresce enquanto elas esperam.',
  },
  {
    icon: '/icons/icon-justice.svg',
    title: 'Existe solução legal',
    description:
      'O artigo 42 do Código de Defesa do Consumidor garante o direito de remover restrições por ação judicial.',
  },
]

// Chart: inadimplência no Brasil 2021–Mar/2026 (Serasa Experian)
// viewBox 500×260 | chart area: x 52→480, y 20→220
const Y_MIN = 60
const Y_MAX = 85
const Y_RANGE = Y_MAX - Y_MIN
const CHART_TOP = 20
const CHART_BOTTOM = 220
const CHART_HEIGHT = CHART_BOTTOM - CHART_TOP
const CHART_LEFT = 52
const CHART_RIGHT = 480
const CHART_WIDTH = CHART_RIGHT - CHART_LEFT

const DATA: { label: string; value: number }[] = [
  { label: '2021',     value: 66.1 },
  { label: '2022',     value: 70.1 },
  { label: '2023',     value: 74.2 },
  { label: '2024',     value: 74.7 },
  { label: '2025',     value: 82.6 },
  { label: 'Mar/2026', value: 74.7 },
]

const Y_LABELS = [85, 80, 75, 70, 65, 60]

function toX(i: number) {
  return CHART_LEFT + (i / (DATA.length - 1)) * CHART_WIDTH
}

function toY(value: number) {
  return CHART_BOTTOM - ((value - Y_MIN) / Y_RANGE) * CHART_HEIGHT
}

const linePath = DATA.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)},${toY(d.value)}`).join(' ')
const areaPath = [
  linePath,
  `L ${toX(DATA.length - 1)},${CHART_BOTTOM}`,
  `L ${toX(0)},${CHART_BOTTOM}`,
  'Z',
].join(' ')

export function Pesquisa() {
  return (
    <section className="w-full bg-white py-20">
      <div className="container-ms flex flex-col gap-16">

        {/* ── Top: chart + text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Chart card */}
          <div className="rounded-sm border border-border-light bg-neutral-50 p-6">
            {/* Card header */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-dm font-normal text-brand-navy text-subtitle">
                Inadimplência no Brasil
              </span>
              <span className="font-sans text-brand-orange text-lable">
                Fonte: Serasa Experian
              </span>
            </div>

            {/* SVG chart */}
            <svg
              viewBox="0 0 500 260"
              className="w-full"
              aria-label="Gráfico de inadimplência no Brasil de 2021 a março de 2026"
            >
              {/* Grid lines + y-axis labels */}
              {Y_LABELS.map((label) => {
                const y = toY(label)
                return (
                  <g key={label}>
                    <line
                      x1={CHART_LEFT}
                      y1={y}
                      x2={CHART_RIGHT}
                      y2={y}
                      stroke="#e5e5e5"
                      strokeWidth="1"
                    />
                    <text
                      x={CHART_LEFT - 6}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="10"
                      fill="#a3a3a3"
                      fontFamily="sans-serif"
                    >
                      {label} mi
                    </text>
                  </g>
                )
              })}

              {/* Area fill */}
              <path d={areaPath} fill="rgba(255,64,0,0.07)" />

              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke="#ff4000"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Data points */}
              {DATA.map((d, i) => (
                <circle
                  key={i}
                  cx={toX(i)}
                  cy={toY(d.value)}
                  r="4"
                  fill="white"
                  stroke="#ff4000"
                  strokeWidth="2"
                />
              ))}

              {/* X-axis labels */}
              {DATA.map((d, i) => (
                <text
                  key={i}
                  x={toX(i)}
                  y={CHART_BOTTOM + 18}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#a3a3a3"
                  fontFamily="sans-serif"
                >
                  {d.label}
                </text>
              ))}
            </svg>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-6">
            <h2 className="font-dm font-normal text-brand-navy text-h1">
              76 milhões de Brasileiros travados pelo nome sujo
            </h2>
            <div className="flex flex-col gap-4 text-p text-grafite">
              <p>
                O nome sujo não para no banco. Ele aparece na hora de alugar um imóvel, contratar
                um plano de celular, conseguir um emprego. Cada dia negativado é mais uma porta
                fechada.
              </p>
              <p className="font-dm text-brand-navy">
                57 milhões de brasileiros não sabem que estão negativados. O nome sujo age em
                silêncio, e quem tenta resolver sozinho raramente consegue sair do ciclo.
              </p>
              <p>
                Nome negativado bloqueia financiamentos, empréstimos e cartão de crédito. Você não
                está sozinho.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom: 4 stat cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x divide-border-light">
          {STATS.map((stat) => (
            <div key={stat.title} className="flex flex-col gap-3 py-8 lg:py-0 lg:px-8 first:pl-0 last:pr-0">
              <div className="relative w-8 h-8">
                <Image src={stat.icon} alt="" fill className="object-contain" />
              </div>
              <span className="font-dm font-normal text-brand-navy text-subtitle">
                {stat.title}
              </span>
              <p className="font-sans text-grafite text-p-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
