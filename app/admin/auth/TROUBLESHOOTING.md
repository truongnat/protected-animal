# Authentication Troubleshooting Guide

If you're experiencing issues with the admin authentication system, follow this guide to diagnose and fix common problems.

## Login Success Not Redirecting

If you can successfully log in but aren't redirected to the dashboard, try these steps:

1. **Check Authentication State**
   - Visit `/admin/auth/debug` to see your current authentication state
   - Verify that you're authenticated and have admin privileges

2. **Clear Browser Cache and Cookies**
   - Sometimes cached data can interfere with authentication
   - Try logging in using an incognito/private browsing window

3. **Check Console for Errors**
   - Open your browser's developer tools (F12)
   - Look for any errors in the Console tab
   - Pay attention to any Supabase or authentication-related errors

4. **Verify Admin Status**
   - Make sure your user is in the `admin_users` table
   - Check that your role is not set to 'pending'

## Manual Authentication Fix

If you're still having issues, you can manually fix your admin status:

1. **Check User ID**
   - Visit `/admin/auth/debug` to get your user ID
   - Or find it in the Supabase dashboard under Authentication > Users

2. **Update Admin Status**
   - Go to the Supabase dashboard
   - Open the SQL Editor
   - Run the following query, replacing `YOUR_USER_ID` with your actual user ID:

   ```sql
   -- Check if user exists in admin_users
   SELECT * FROM admin_users WHERE user_id = 'YOUR_USER_ID';
   
   -- If no results, insert the user
   INSERT INTO admin_users (user_id, email, role)
   VALUES ('YOUR_USER_ID', 'your-email@example.com', 'superadmin');
   
   -- If user exists but is pending, update the role
   UPDATE admin_users 
   SET role = 'superadmin' 
   WHERE user_id = 'YOUR_USER_ID';
   ```

3. **Try Logging In Again**
   - Sign out completely
   - Clear browser cache and cookies
   - Sign in again at `/admin/auth/login`

## Common Error Messages

### "Database error creating new user"
- The user might already exist in Auth but not in the admin_users table
- Check the Supabase Authentication > Users section
- Manually add the user to the admin_users table using SQL

### "User not found"
- The email address might be incorrect
- Try resetting your password

### "Invalid login credentials"
- Double-check your password
- Try resetting your password through the login page

## Still Having Issues?

If you're still experiencing problems:

1. **Check Server Logs**
   - Look for any errors in your server logs
   - Pay attention to authentication-related errors

2. **Verify Environment Variables**
   - Make sure your `.env.local` file has the correct Supabase credentials
   - Check that you're using the service role key for admin operations

3. **Rebuild the Project**
   - Stop the development server
   - Run `pnpm build`
   - Start the server again with `pnpm start`

4. **Contact Support**
   - If all else fails, contact the development team for assistance
