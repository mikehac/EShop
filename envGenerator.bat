@echo off
setlocal enabledelayedexpansion

:: Save the starting directory
set "startDir=%cd%"

:: Loop through all subfolders and find .env.example files
for /r %%f in (*.env.example) do (
    echo Found: %%f
    set "sourceFile=%%f"
    set "folderName=%%~dpf"
    
    :: Check if the folder is eshop.client or eshop.admin
    echo !folderName! | findstr /i "\\eshop.client\\" >nul
    if !errorlevel! equ 0 (
        echo Renaming .env.example to .env in eshop.client
        ren "%%f" ".env"
    ) else (
        echo !folderName! | findstr /i "\\eshop.admin\\" >nul
        if !errorlevel! equ 0 (
            echo Renaming .env.example to .env in eshop.admin
            ren "%%f" ".env"
        ) else (
            :: For all other folders, copy .env.example to .env.local
            set "targetFile=%%~dpf.env.local"
            echo Copying !sourceFile! to !targetFile!
            copy "!sourceFile!" "!targetFile!" >nul

            if !errorlevel! equ 0 (
                echo Successfully copied to !targetFile!
            ) else (
                echo Failed to copy !sourceFile!
            )
        )
    )
)

:: Return to the starting directory
cd /d "%startDir%"
echo Done.
pause