@echo off
echo Fixing authentication redirect issues...

echo 1. Updating callback route...
copy ..\app\admin\auth\callback\route.ts.new ..\app\admin\auth\callback\route.ts

echo Done! The authentication system has been updated.
echo.
echo You can now test the login functionality:
echo 1. Navigate to /admin/auth/login
echo 2. Sign in with your admin credentials
echo 3. You should be redirected to the dashboard
echo.
echo If you encounter any issues, visit /admin/auth/debug to see your current authentication state.
echo.
pause
