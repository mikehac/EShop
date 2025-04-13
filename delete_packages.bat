@echo off
:: This script will delete all "node_modules" directories and "package-lock.json" files in the current directory and its subdirectories.

echo Deleting all node_modules directories and package-lock.json files...

:: Delete node_modules directories
for /d /r %%i in (node_modules) do (
    if exist "%%i" (
        echo Deleting "%%i"
        rd /s /q "%%i"
    )
)

:: Delete package-lock.json files
for /r %%i in (package-lock.json) do (
    if exist "%%i" (
        echo Deleting "%%i"
        del /q "%%i"
    )
)

echo Done.
pause
