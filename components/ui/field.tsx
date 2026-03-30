import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ label, hint, error, required, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props}>
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}
        {children}
        {hint && !error && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  },
)
Field.displayName = 'Field'

export { Field }
