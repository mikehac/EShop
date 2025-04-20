@echo off
setlocal enabledelayedexpansion

:: Save the starting directory
set "startDir=%cd%"

:: Loop through all subfolders and find .env.example files
for /r %%f in (*.env.example) do (
    echo Found: %%f
    set "sourceFile=%%f"
    set "targetFile=%%~dpf.env.local"

    echo Copying !sourceFile! to !targetFile!
    copy "!sourceFile!" "!targetFile!" >nul

    if %errorlevel% equ 0 (
        echo Successfully copied to !targetFile!
    ) else (
        echo Failed to copy !sourceFile!
    )
)

:: Return to the starting directory
cd /d "%startDir%"
echo Done.
pause