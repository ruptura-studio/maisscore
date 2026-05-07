import type { ReactNode } from 'react'
import { Sidebar } from './_components/sidebar'
import { Topbar } from './_components/topbar'

type AdminLayoutProps = {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex overflow-hidden bg-white">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto bg-neutral-50 p-6">{children}</main>
        </div>
      </div>
    </>
  )
}
