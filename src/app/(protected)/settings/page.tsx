'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@supabase/auth-helpers-react'
import { supabase } from '../../lib/supabase'

interface Preferences {
  id: string
  language: string
  font_size: string
  contrast_mode: boolean
}

export default function Settings() {
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!preferences || !session?.user?.id) return

    setLoading(true)
    setError('')
    setSuccess('')

    const { error } = await supabase
      .from('preferences')
      .update({
        language: preferences.language,
        font_size: preferences.font_size,
        contrast_mode: preferences.contrast_mode,
      })
      .eq('id', preferences.id)

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Preferences updated successfully!')
    }

    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!session || !preferences) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to Dashboard
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
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Accessibility Preferences
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Language
                </label>
                <select
                  id="language"
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="en">English</option>
                  <option value="zu">Zulu</option>
                  <option value="af">Afrikaans</option>
                </select>
              </div>

              <div>
                <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Font Size
                </legend>
                <div className="mt-2 space-y-2">
                  {['small', 'medium', 'large'].map((size) => (
                    <div key={size} className="flex items-center">
                      <input
                        id={`font-${size}`}
                        name="fontSize"
                        type="radio"
                        value={size}
                        checked={preferences.font_size === size}
                        onChange={(e) => setPreferences({ ...preferences, font_size: e.target.value })}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor={`font-${size}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="contrast"
                  name="contrast"
                  type="checkbox"
                  checked={preferences.contrast_mode}
                  onChange={(e) => setPreferences({ ...preferences, contrast_mode: e.target.checked })}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="contrast" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  High Contrast Mode
                </label>
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              {success && (
                <div className="text-green-600 text-sm">{success}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
