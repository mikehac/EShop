@echo off
setlocal enabledelayedexpansion

:: Save the starting directory
set "startDir=%cd%"

:: Loop through all first-level subfolders
for /d %%d in (*) do (
    set "folder=%%~fd"
    if exist "%%d\package.json" (
        echo Processing folder: %%d
        pushd %%d
        
        echo Updating npm packages...
        npx npm-check-updates -u
        npm install

        echo Running build...
        npm run build

        echo Done with folder: %%d
        popd
    )
)

:: Return to the starting directory
cd /d "%startDir%"

echo All first-level subfolders have been processed.
pause