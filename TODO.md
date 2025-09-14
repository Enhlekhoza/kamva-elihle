# Kamva Elihle App Development TODO

## 1. Install Dependencies
- [x] Install react-speech-kit for voice commands and TTS
- [x] Install next-intl for multi-language
- [ ] Install ShadCN UI components and dependencies

## 2. Supabase Setup
- [x] Set up Supabase client in the app (create lib/supabase.ts)
- [x] Create database tables: users and preferences (run src/sql/schema.sql in Supabase)
- [x] Set up authentication providers

## 3. App Structure Updates
- [x] Update layout.tsx with app metadata, theme provider, and language provider
- Create global CSS for accessibility (font sizes, contrast modes)

## 4. Landing Page
- [x] Replace default page.tsx with landing page featuring voice start option
- [x] Add accessibility features (ARIA roles, semantic HTML)

## 5. Authentication
- [x] Implement login/signup pages
- [x] Integrate Supabase Auth
- [x] Handle user sessions

## 6. Onboarding Flow
- Create onboarding pages for language selection and accessibility settings
- Save initial preferences to database

## 7. Dashboard
- Build main dashboard with accessible UI
- Integrate voice commands for navigation

## 8. Voice Commands and TTS
- Implement voice recognition for commands
- Add text-to-speech for responses and feedback

## 9. Settings Page
- Create settings page to update and save user preferences
- Sync with database

## 10. Accessibility Enhancements
- Ensure ARIA roles and semantic HTML throughout
- Test with screen readers and accessibility tools

## 11. Testing
- Test all features, especially accessibility
- Cross-browser and device testing

## 12. Deployment
- Deploy frontend to Vercel
- Ensure Supabase backend is configured
- Set up production environment variables
