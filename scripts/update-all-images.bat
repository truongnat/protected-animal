@echo off
echo Updating all pages to use ImageWithFallback component...

echo 1. Updating species detail page...
copy ..\app\species\[id]\page.tsx.fixed ..\app\species\[id]\page.tsx

echo 2. Updating about page...
copy ..\app\about\page.tsx.updated ..\app\about\page.tsx

echo Done! All pages have been updated to use the ImageWithFallback component.
echo.
echo Make sure your next.config.mjs includes 'placehold.co' in the domains list:
echo domains: ['files.worldwildlife.org', 'images.unsplash.com', 'via.placeholder.com', 'placehold.co']
echo.
echo The fallback system now uses placehold.co to generate placeholders automatically.
echo.
pause
