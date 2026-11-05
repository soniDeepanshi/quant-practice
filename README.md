# Quant Practice

A static, mobile-friendly practice site for quantitative aptitude. Practice works without an account and saves progress in the browser. Supabase sign-in optionally syncs bookmarks, practice statistics, and learning review schedules across devices.

## Publish with GitHub Pages

1. Create a **public** GitHub repository named `quant-practice` and push the files in this folder to its `main` branch.
2. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **GitHub Actions**.
3. The included workflow deploys the site. When it finishes, GitHub shows the public URL under **Settings → Pages** (usually `https://YOUR-NAME.github.io/quant-practice/`).
4. In Supabase, open **Authentication → URL Configuration**. Set **Site URL** to the published URL and add that same URL (with `/**` at the end) to **Redirect URLs**. Save.

The publishable Supabase key in `auth-config.js` is intended for browser use. Never add a database password, `service_role` key, or other secret to this repository. Progress rows are protected by the row-level security policies below.

## Supabase setup

The project is already configured in `auth-config.js`. If setting up a new Supabase project, run `supabase-setup.sql` once in its SQL Editor and replace the URL and publishable key in that config. To allow sign-in immediately without email confirmation, turn off **Authentication → Sign In / Providers → Email → Confirm email** in Supabase.

## Local preview

Open `index.html` in a browser. Account redirects and cloud sync work best when served from a local web server or the published GitHub Pages URL.
