'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@supabase/auth-helpers-react'
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit'
import { supabase } from '../../lib/supabase'

interface Preferences {
  language: string
  font_size: string
  contrast_mode: boolean
}

export default function Dashboard() {
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
      return
    }

    const fetchPreferences = async () => {
      const { data, error } = await supabase
        .from('preferences')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      if (data) {
        setPreferences(data)
      }
    }

    fetchPreferences()
  }, [session, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Kamva Elihle Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/settings')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Welcome back, {session.user.email}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your preferences: Language - {preferences?.language || 'Not set'}, Font Size - {preferences?.font_size || 'Not set'}, High Contrast - {preferences?.contrast_mode ? 'Yes' : 'No'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Learning Modules
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access educational content tailored for you.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Voice Commands
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Use voice to navigate and interact.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Accessibility Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Customize your experience for better accessibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
