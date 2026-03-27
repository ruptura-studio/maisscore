import { StyleguideSidebar } from '@/components/dev/StyleguideSidebar'

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <StyleguideSidebar />
      <div className="flex-1 min-w-0 p-10 max-w-4xl">
        {children}
      </div>
    </div>
  )
}
