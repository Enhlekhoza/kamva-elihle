'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleVoiceStart = () => {
    // TODO: Implement voice recognition
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="text-center px-6 py-12 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to Kamva Elihle
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          An accessible learning and utility app designed for everyone. Start your journey with voice commands or explore our features.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleVoiceStart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Start using the app with voice commands"
          >
            Start with Voice
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Or use the keyboard to navigate
          </p>
        </div>
      </main>
    </div>
  )
}
