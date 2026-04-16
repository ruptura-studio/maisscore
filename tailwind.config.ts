import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    'text-display',
    'text-h2', 'text-h3',
    'text-subtitle',
    'text-cap',
    'text-lg', 'text-p', 'text-sm',
    'text-label',
    'text-txt-sm', 'text-txt-xs',
  ],
  theme: {
  	screens: {
  		sm: '390px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px',
  		'3xl': '1920px'
  	},
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			disabled: '#a0a0a0',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				foreground: 'hsl(var(--success-foreground))'
  			},
  			warning: {
  				DEFAULT: 'hsl(var(--warning))',
  				foreground: 'hsl(var(--warning-foreground))'
  			},
  			info: {
  				DEFAULT: 'hsl(var(--info))',
  				foreground: 'hsl(var(--info-foreground))'
  			},
  			brand: {
  				orange: '#ff4000',
  				navy: '#101c2e',
  				border: '#d4d4d4',
  				star: '#EE9E16',
  			},
  			grafite: '#2E2E2E',
  			'neutral-50': '#fafafa',
  			'neutral-100': '#f2f2f2',
  			'neutral-200': '#e9e9e9',
  			'neutral-400': '#a3a3a3',
  			'foreground-alt': '#404040',
  			'border-light': '#d4d4d4'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-geist-mono)',
  				'monospace'
  			],
  			dm: [
  				'var(--font-dm-sans)',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'display': ['40px', { lineHeight: '44px', fontWeight: '400' }],
  			'price': ['48px', { lineHeight: '50px', fontWeight: '700' }],
  			'price-sm': ['16px', { lineHeight: '18px', fontWeight: '700' }],
  			'h2': ['24px', { lineHeight: '24px', fontWeight: '400' }],
  			'h3': ['18px', { lineHeight: '18px', fontWeight: '600' }],
  			'subtitle': ['16px', { lineHeight: '20px', fontWeight: '600' }],
  			'cap': ['14px', { lineHeight: '18px', fontWeight: '400', letterSpacing: '6px' }],
  			'sm': ['14px', { lineHeight: '16px', fontWeight: '400' }],
  			'p': ['12px', { lineHeight: '14px', fontWeight: '400' }],
  			'lg': ['16px', { lineHeight: '20px', fontWeight: '400' }],
  			'label': ['12px', { lineHeight: '14px', fontWeight: '400' }],
  			'txt-sm': ['12px', { lineHeight: '14px', fontWeight: '400' }],
  			'txt-xs': ['10px', { lineHeight: '12px', fontWeight: '400' }],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			full: '9999px'
  		},
  		boxShadow: {
  			sm: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
  			md: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)',
  			lg: '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)',
  			card: '0 8px 40px rgba(0,0,0,0.10)'
  		},
  		spacing: {
  			'1': '4px',
  			'2': '8px',
  			'3': '12px',
  			'4': '16px',
  			'6': '24px',
  			'8': '32px',
  			'24': '96px',
  		},
  		letterSpacing: {
  			'price': '-4px',
  		},
  		maxWidth: {
  			container: '1200px',
  			display: '17rem',
  			'content-sm': '363px',
  			'content-md': '520px',
  			'content-lg': '560px',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    plugin(({ addVariant }) => {
      // touch: aplica em dispositivos touch-first (smartphones/tablets)
      addVariant('touch', '@media (pointer: coarse) and (hover: none)')
      // no-touch: aplica em dispositivos com mouse/trackpad
      addVariant('no-touch', '@media (pointer: fine) and (hover: hover)')
    }),
  ],
}

export default config
