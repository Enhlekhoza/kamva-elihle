'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'

export default function Onboarding() {
  const [language, setLanguage] = useState('en')
  const [fontSize, setFontSize] = useState('medium')
  const [contrastMode, setContrastMode] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [sessionLoading, setSessionLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setSessionLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setSessionLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push('/auth/login')
    }
  }, [session, sessionLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return

    setSubmitLoading(true)
    setError('')

    // Check if preferences already exist
    const { data: existingPrefs } = await supabase
      .from('preferences')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (existingPrefs) {
      // Preferences already exist, go to dashboard
      router.push('/dashboard')
      setSubmitLoading(false)
      return
    }

    const { error } = await supabase
      .from('preferences')
      .insert({
        user_id: session.user.id,
        language,
        font_size: fontSize,
        contrast_mode: contrastMode,
      })

    if (error) {
      setError(error.message)
    } else {
      // After successful insert, poll for preferences to ensure they are available
      let attempts = 0
      const maxAttempts = 5
      const delay = 1000 // 1 second

      const pollForPreferences = async () => {
        const { data: newPrefs } = await supabase
          .from('preferences')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        if (newPrefs) {
          router.push('/dashboard')
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(pollForPreferences, delay)
        } else {
          setError('Failed to retrieve preferences after saving. Please try again.')
        }
      }
      pollForPreferences()
    }

    setSubmitLoading(false)
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Set up your preferences
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Customize your experience for better accessibility
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
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
                    id={size}
                    name="fontSize"
                    type="radio"
                    value={size}
                    checked={fontSize === size}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor={size} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
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
              checked={contrastMode}
              onChange={(e) => setContrastMode(e.target.checked)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="contrast" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              High Contrast Mode
            </label>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={submitLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {submitLoading ? 'Saving...' : 'Continue to Dashboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
