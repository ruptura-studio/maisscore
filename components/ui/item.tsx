import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  title?: string
  description?: string
  interactive?: boolean
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ leading, trailing, title, description, interactive = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5',
          interactive && 'cursor-pointer rounded-md hover:bg-accent transition-colors',
          className,
        )}
        {...props}
      >
        {leading && (
          <div className="shrink-0 text-muted-foreground">{leading}</div>
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-medium text-foreground truncate">{title}</p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground truncate">{description}</p>
          )}
          {children}
        </div>
        {trailing && (
          <div className="shrink-0 text-muted-foreground">{trailing}</div>
        )}
      </div>
    )
  },
)
Item.displayName = 'Item'

export { Item }
