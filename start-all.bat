@echo off
echo ===================================================
echo Starting All Made4Ever Services...
echo ===================================================

echo [1/4] Starting Backend (Port 5000)...
pushd "%~dp0made4ever-backend"
start "Made4Ever Backend (5000)" cmd /k npm start
popd

echo [2/4] Starting Admin Panel (Port 3000)...
pushd "%~dp0made4ever Admin Panel"
start "Made4Ever Admin Panel (3000)" cmd /k "set PORT=3000 && npm start"
popd

echo [3/4] Starting Bureau Panel (Port 3001)...
pushd "%~dp0made4ever Bureau Panel"
start "Made4Ever Bureau Panel (3001)" cmd /k "set PORT=3001 && npm start"
popd

echo [4/4] Starting Main Website (Port 3002)...
pushd "%~dp0made4ever-main"
start "Made4Ever Main (3002)" cmd /k "npm run dev -- -p 3002"
popd

echo ===================================================
echo All services launched in separate terminal windows!
echo - Backend:      http://localhost:5000
echo - Admin Panel:  http://localhost:3000
echo - Bureau Panel: http://localhost:3001
echo - Main Website: http://localhost:3002
echo ===================================================
