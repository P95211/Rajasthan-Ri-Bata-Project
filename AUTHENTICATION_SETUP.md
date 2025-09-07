# Authentication Setup for Published Apps

## Current Status
Your app has authentication functionality built-in, but for it to work on published/deployed versions, you need to configure Supabase URLs.

## Required Steps

### 1. Configure Supabase URLs
Go to your Supabase Dashboard:
- **Authentication** → **URL Configuration**
- Set **Site URL** to your published app URL (e.g., `https://yourapp.lovable.app`)
- Add **Redirect URLs** including:
  - Your published app URL: `https://yourapp.lovable.app`
  - Your preview URL (if different)
  - Any custom domains you plan to use

### 2. Test Authentication
Once URLs are configured:
1. Visit your published app
2. Click "Sign In" in the navigation
3. Try creating a new account or logging in

### 3. Features Available
- **Public users**: Can view videos, blog, and contact pages
- **Admin users**: Can access admin panel, sync YouTube videos, manage content

## Troubleshooting
If sign-in still doesn't work:
1. Check browser console for errors
2. Verify Supabase URL configuration
3. Ensure your published app URL matches the configured URLs exactly

## Admin Access
To become an admin user:
1. Sign up normally first
2. Contact the developer to assign admin role in the database
3. Or use the admin panel if you already have access