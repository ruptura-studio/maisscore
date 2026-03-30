import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'connected' | 'spaced'
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', variant = 'spaced', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'flex',
          orientation === 'vertical' && 'flex-col',
          variant === 'connected' && [
            orientation === 'horizontal'
              ? '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-px'
              : '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:-mt-px',
          ],
          variant === 'spaced' && [
            orientation === 'horizontal' ? 'gap-2' : 'gap-2 flex-col',
          ],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
ButtonGroup.displayName = 'ButtonGroup'

export { ButtonGroup }
