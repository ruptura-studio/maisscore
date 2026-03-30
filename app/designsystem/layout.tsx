import { DesignSystemSidebar } from '@/components/dev/DesignSystemSidebar'

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <DesignSystemSidebar />
      <div className="flex-1 min-w-0 p-10">
        {children}
      </div>
    </div>
  )
}
