import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

function Spinner({ size, label = 'Carregando...', className, ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    >
      <span className={spinnerVariants({ size })} />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export { Spinner, spinnerVariants }
