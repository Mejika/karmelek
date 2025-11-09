@echo off

REM Sprawdzenie, czy Node.js jest zainstalowany
where node >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js nie jest zainstalowany. Przejdź na https://nodejs.org i zainstaluj go.
    pause
    exit /b
)

REM Uruchomienie bota
echo Uruchamianie bota...
cd karmelek
npm run dev

pause
