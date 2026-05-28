@echo off
echo ====================================================
echo Starting Voyager Authentication Server
echo ====================================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting server on http://localhost:3000
echo.
echo IMPORTANT: Make sure you've configured EMAIL_PASS in server.js
echo See SETUP-EMAIL.md for instructions
echo.
echo Press Ctrl+C to stop the server
echo ====================================================
echo.

node server.js
