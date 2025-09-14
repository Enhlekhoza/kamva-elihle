'use client'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

// Icons for the sidebar
const DashboardIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-8 0h-2a2 2 0 01-2-2V7a2 2 0 012-2h2l2-4h4l2 4h2a2 2 0 012 2v10a2 2 0 01-2 2h-2m-4 0V9" /></svg>;
const SettingsIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
    }
  }, [session, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Kamva Elihle</h1>
        </div>
        <nav className="mt-6">
          <Link href="/dashboard" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <DashboardIcon />
            <span className="mx-4">Dashboard</span>
          </Link>
          <Link href="/settings" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <SettingsIcon />
            <span className="mx-4">Settings</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full">
            <button onClick={handleLogout} className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 w-full">
                <LogoutIcon />
                <span className="mx-4">Logout</span>
            </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
