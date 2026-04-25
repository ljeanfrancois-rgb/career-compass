# Supabase Setup

Use this file after the app is already running locally.

## 1. Add your environment variables

Create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

If your project still shows the older naming in the dashboard, `NEXT_PUBLIC_SUPABASE_ANON_KEY` is also supported by the codebase.

## 2. Create the database tables

Open the Supabase SQL editor and run:

`supabase/schema.sql`

This creates:

- `profiles`
- `quiz_runs`
- `career_paths`

It also sets up row-level security and the trigger that creates a profile when a new auth user is created.

## 3. Configure auth redirects

In Supabase Auth settings, add your local callback URL:

`http://localhost:3000/auth/callback`

If Next chooses another port during development, add that too. For example:

`http://localhost:3002/auth/callback`

## 4. Install and run

```powershell
npm install
npm run dev
```

## 5. What happens in each mode

- No Supabase env vars: app works in local mode with browser storage.
- Supabase env vars but not signed in: public pages load and auth screens are available.
- Supabase env vars plus sign-in: profile, quiz history, saved path, and admin-created paths sync to the cloud.
