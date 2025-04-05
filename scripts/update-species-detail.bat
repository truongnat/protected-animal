@echo off
echo Updating species detail page with fallback image support...
copy ..\app\species\[id]\page.tsx.updated ..\app\species\[id]\page.tsx
echo Done! The species detail page has been updated.
echo.
echo Make sure your next.config.mjs includes 'placehold.co' in the domains list:
echo domains: ['files.worldwildlife.org', 'images.unsplash.com', 'via.placeholder.com', 'placehold.co']
echo.
echo The fallback system now uses placehold.co to generate placeholders automatically.
echo.
pause
