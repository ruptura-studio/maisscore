import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix'> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ prefix, suffix, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center w-full rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2', className)}
        {...props}
      >
        {prefix && (
          <div className="flex items-center pl-3 text-muted-foreground shrink-0 select-none">
            {prefix}
          </div>
        )}
        <div className="flex-1 [&>input]:border-0 [&>input]:bg-transparent [&>input]:shadow-none [&>input]:focus-visible:ring-0 [&>input]:focus-visible:ring-offset-0">
          {children}
        </div>
        {suffix && (
          <div className="flex items-center pr-3 text-muted-foreground shrink-0 select-none">
            {suffix}
          </div>
        )}
      </div>
    )
  },
)
InputGroup.displayName = 'InputGroup'

export { InputGroup }
