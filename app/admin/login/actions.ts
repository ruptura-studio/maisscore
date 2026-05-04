'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_COOKIE_NAME = 'admin_session'
const ADMIN_COOKIE_VALUE = 'authenticated'

export async function loginAdmin(formData: FormData) {
  const password = formData.get('password')
  const adminPassword = process.env.ADMIN_PASSWORD

  if (typeof password === 'string' && adminPassword && password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set({
      name: ADMIN_COOKIE_NAME,
      value: ADMIN_COOKIE_VALUE,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/admin',
    })

    redirect('/admin')
  }

  redirect('/admin/login?error=1')
}
