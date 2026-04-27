import { cn } from '@/lib/utils'

type AlertType = 'info' | 'warning' | 'success' | 'danger'

type Props = {
  type?: AlertType
  title?: string
  children: React.ReactNode
}

const styles: Record<AlertType, string> = {
  info: 'bg-blue-50 border-blue-300 text-blue-900',
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-900',
  success: 'bg-green-50 border-green-400 text-green-900',
  danger: 'bg-red-50 border-red-400 text-red-900',
}

const icons: Record<AlertType, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  success: '✅',
  danger: '🚫',
}

export function AlertBox({ type = 'info', title, children }: Props) {
  return (
    <div className={cn('border-l-4 rounded-r-xl px-5 py-4 my-6', styles[type])}>
      <div className="flex items-start gap-3">
        <span className="text-lg leading-none mt-0.5">{icons[type]}</span>
        <div className="flex flex-col gap-1">
          {title && <p className="font-semibold text-sm">{title}</p>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
