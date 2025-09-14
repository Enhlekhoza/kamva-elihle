# Kamva Elihle

Kamva Elihle is an accessible web application designed to provide an inclusive experience for users with disabilities. It features voice commands, text-to-speech (TTS), multi-language support, and customizable accessibility settings including font sizes and high contrast modes.

## Features

- **Voice Commands**: Navigate and interact with the app using voice input
- **Text-to-Speech**: Audio feedback and responses
- **Multi-Language Support**: Choose from English, Zulu, and Afrikaans
- **Accessibility Settings**: Adjustable font sizes and high contrast mode
- **User Authentication**: Secure login and signup with Supabase
- **Onboarding Flow**: Guided setup for user preferences
- **Dashboard**: Main interface with accessible UI components

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with ShadCN UI components
- **Authentication & Database**: Supabase
- **Voice Features**: react-speech-kit
- **Internationalization**: next-intl

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kamva-elihle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Set up Supabase database:
   - Create a new Supabase project
   - Run the SQL schema from `src/sql/schema.sql` in your Supabase SQL editor
   - Configure authentication providers as needed

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### First Time Setup

1. **Landing Page**: Start by clicking "Start with Voice" or navigating to signup
2. **Sign Up**: Create an account with email and password
3. **Email Confirmation**: Check your email and confirm your account
4. **Login**: Sign in with your credentials
5. **Onboarding**: Set up your preferences:
   - Choose your language (English, Zulu, Afrikaans)
   - Select font size (small, medium, large)
   - Enable high contrast mode if needed
6. **Dashboard**: Access the main app interface

### Navigation

- Use the navigation menu or voice commands to move between sections
- Dashboard: Main app area
- Settings: Update your preferences
- Voice Commands: Say commands like "go to dashboard" or "open settings"

### Accessibility Features

- **Font Size**: Adjust text size in settings
- **High Contrast**: Toggle for better visibility
- **Voice Input**: Use speech recognition for hands-free navigation
- **TTS**: Audio feedback for important actions

### Settings

Update your preferences anytime in the Settings page:
- Language selection
- Font size adjustment
- Contrast mode toggle

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   ├── onboarding/
│   ├── settings/
│   └── layout.tsx
├── lib/
│   └── supabase.ts
├── middleware.ts
└── sql/
    └── schema.sql
```

## Deployment

1. Deploy to Vercel:
   ```bash
   npm run build
   ```
   Then connect your repository to Vercel and deploy.

2. Set production environment variables in Vercel dashboard.

3. Ensure Supabase is configured for production.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test accessibility features
5. Submit a pull request

## License

This project is licensed under the MIT License.
