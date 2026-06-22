import { cookies, headers } from 'next/headers'
import AdminShell from '@/components/admin-shell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const cookieStore = await cookies()
  const pin = cookieStore.get('mz-admin')?.value
  if (pin !== process.env.ADMIN_PIN) {
    return <>{children}</>
  }

  return (
    <AdminShell>
      {children}
    </AdminShell>
  )
}
