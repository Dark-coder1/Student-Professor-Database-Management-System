@echo off
SETLOCAL EnableDelayedExpansion

:: Set the project root relative to script location
SET "PROJECT_ROOT=%~dp0scholar-suite"

echo Starting Scholar Suite Backend...
cd /d "%PROJECT_ROOT%"

:: Check for node_modules
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

:: Start backend in a new minimized window
start /min "Scholar Suite Backend" cmd /c "npm start"

echo Waiting for server to start...
:: Simple wait loop (5 seconds)
timeout /t 5 /nobreak > nul

echo Opening Scholar Suite in browser...
start http://localhost:3000

echo Done! You can minimize this window.
pause
