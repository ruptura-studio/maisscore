import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      sm: '390px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        foreground: '#0a0a0a',
        'foreground-alt': '#404040',
        muted: '#737373',
        border: '#e5e5e5',
        'border-light': '#d4d4d4',
        card: '#ffffff',
        secondary: '#f5f5f5',
        accent: '#42A4FF',
        'accent-dark': '#1E4ED8',
        grafite: '#2E2E2E',
        primary: '#171717',
        input: '#ffffff',
        'neutral-400': '#a3a3a3',
        'neutral-50': '#fafafa',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        // heading-1: 48px / 48px line-height / -1.5px tracking / Semibold
        'heading-1': ['48px', { lineHeight: '48px', letterSpacing: '-1.5px', fontWeight: '600' }],
        // heading-3: 24px / 28.8px line-height / -1px tracking / Semibold
        'heading-3': ['24px', { lineHeight: '28.8px', letterSpacing: '-1px', fontWeight: '600' }],
        // heading-4: 20px / 24px line-height / 0 tracking / Semibold
        'heading-4': ['20px', { lineHeight: '24px', letterSpacing: '0', fontWeight: '600' }],
        // paragraph large: 18px / 27px
        'para-lg': ['18px', { lineHeight: '27px' }],
        // paragraph regular: 16px / 24px
        'para-md': ['16px', { lineHeight: '24px' }],
        // paragraph small: 14px / 20px
        'para-sm': ['14px', { lineHeight: '20px' }],
        // paragraph mini: 12px / 16px
        'para-xs': ['12px', { lineHeight: '16px' }],
        // caption: 14px / 21px / 1.5px tracking
        caption: ['14px', { lineHeight: '21px', letterSpacing: '1.5px' }],
      },
      borderRadius: {
        sm: '4px',
        lg: '8px',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0,0,0,0.05)',
      },
      spacing: {
        // design tokens mapeados
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '24': '96px',
      },
      maxWidth: {
        container: '1088px',
      },
    },
  },
  plugins: [],
}

export default config
