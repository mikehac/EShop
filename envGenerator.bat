@echo off
setlocal enabledelayedexpansion

:: Save the starting directory
set "startDir=%cd%"

:: Create the eshop.db folder
if not exist "eshop.db" (
    mkdir "eshop.db"
    echo Created folder: eshop.db
)

:: Create .env file in eshop.db
(
    echo POSTGRES_USER=postgress
    echo POSTGRES_PASSWORD=VERY_SECURED_PASSWORD
    echo POSTGRES_DB=eshop
) > "eshop.db\.env"
echo Created file: eshop.db\.env

:: Create .env.order file in eshop.db
(
    echo POSTGRES_USER=postgress
    echo POSTGRES_PASSWORD=VERY_SECURED_PASSWORD
    echo POSTGRES_DB=eshop
) > "eshop.db\.env.order"
echo Created file: eshop.db\.env.order

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