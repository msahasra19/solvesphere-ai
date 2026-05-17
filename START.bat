@echo off
echo ========================================
echo   SolveSphere AI - Starting Server
echo ========================================
echo.
echo Checking environment setup...
echo.

if not exist .env (
    echo [ERROR] .env file not found!
    echo.
    echo Please follow these steps:
    echo 1. Copy .env.example to .env
    echo 2. Get your FREE Gemini API key from: https://makersuite.google.com/app/apikey
    echo 3. Edit .env and add your API key
    echo.
    pause
    exit /b 1
)

echo [OK] .env file found
echo.
echo Starting development server...
echo.
echo The application will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

npm run dev

pause

@REM Made with Bob
