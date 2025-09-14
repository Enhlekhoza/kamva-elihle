'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit'

// Icons
const BookOpenIcon = () => <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.5M8.25 6.253h7.5M8.25 17.753h7.5M3.75 6.253h.008v.008H3.75v-.008zm0 5.5h.008v.008H3.75v-.008zm0 5.5h.008v.008H3.75v-.008z" /></svg>;
const ZapIcon = () => <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const AccessibilityIcon = () => <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 15a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 15V3M5.5 3v12m5-12h5.5a2.5 2.5 0 010 5h-5.5" /></svg>;
const MicIcon = () => <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 7v3m0 0h-2m2 0h2" /></svg>;


interface Preferences {
  language: string
  font_size: string
  contrast_mode: boolean
}

export default function Dashboard() {
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient()
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => handleVoiceCommand(result),
  })
  const { speak } = useSpeechSynthesis()

  useEffect(() => {
    if (session) {
      const fetchPreferences = async () => {
        const { data } = await supabase
          .from('preferences')
          .select('*')
          .eq('user_id', session.user.id)
          .single()
        if (data) {
          setPreferences(data)
        } else {
          router.push('/onboarding')
        }
      }
      fetchPreferences()
    }
  }, [session, router, supabase])

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()
    if (lowerCommand.includes('settings')) {
      speak({ text: 'Navigating to settings' })
      router.push('/settings')
    } else if (lowerCommand.includes('logout')) {
      speak({ text: 'Logging out' })
      supabase.auth.signOut().then(() => router.push('/'))
    } else {
      speak({ text: 'Command not recognized.' })
    }
  }

  return (
    <div className="p-6 sm:p-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Welcome back, {session?.user?.email}! Let's make technology accessible for everyone.
        </p>
      </header>

      {/* Overview Section */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Modules Completed</h3>
          <p className="text-5xl font-bold text-gray-800 dark:text-white mt-2">5</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Next Module</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">Intro to Voice Control</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Daily Goal</h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-4">
            <div className="bg-indigo-600 h-4 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">60% Complete</p>
        </div>
      </section>

      {/* Action Cards */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-lg shadow-lg text-white">
          <BookOpenIcon />
          <h3 className="text-2xl font-bold mt-4">Learning Modules</h3>
          <p className="mt-2">Access educational content tailored for you.</p>
          <button className="mt-6 bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100">
            Start Learning
          </button>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-lg shadow-lg text-white">
          <ZapIcon />
          <h3 className="text-2xl font-bold mt-4">Practice Zone</h3>
          <p className="mt-2">Hone your skills with interactive exercises.</p>
          <button className="mt-6 bg-white text-teal-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100">
            Enter Practice
          </button>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-6 rounded-lg shadow-lg text-white">
          <AccessibilityIcon />
          <h3 className="text-2xl font-bold mt-4">Accessibility Tools</h3>
          <p className="mt-2">Customize your experience for better accessibility.</p>
          <button onClick={() => router.push('/settings')} className="mt-6 bg-white text-rose-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100">
            Customize
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <ul>
            <li className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-300">You completed the 'Intro to Screen Readers' module.</p>
              <span className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
            </li>
            <li className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-300">You earned a new badge: 'Voice Commander'.</p>
              <span className="text-sm text-gray-500 dark:text-gray-400">1 day ago</span>
            </li>
            <li className="flex items-center justify-between py-3">
              <p className="text-gray-800 dark:text-gray-300">Welcome to Kamva Elihle!</p>
              <span className="text-sm text-gray-500 dark:text-gray-400">3 days ago</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Floating Action Button for Voice */}
      <div className="fixed bottom-10 right-10">
        <button
          onClick={listening ? stop : listen}
          className={`bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${listening ? 'animate-pulse' : ''}`}
          aria-label={listening ? 'Stop listening' : 'Start voice command'}
        >
          <MicIcon />
        </button>
      </div>
    </div>
  )
}