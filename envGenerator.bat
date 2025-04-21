@echo off
setlocal enabledelayedexpansion

:: Save the starting directory
set "startDir=%cd%"

:: Check if eshop.db folder exists and create it if not
if not exist "eshop.db" (
    echo Creating eshop.db folder
    mkdir "eshop.db"
    
    echo Creating .env file in eshop.db
    echo POSTGRES_USER=postgres > eshop.db\.env
    echo POSTGRES_PASSWORD=VERY_SECURED_PASSWORD >> eshop.db\.env
    echo POSTGRES_DB=eshop >> eshop.db\.env
    
    echo Creating .env.order file in eshop.db
    echo POSTGRES_USER=postgres > eshop.db\.env.order
    echo POSTGRES_PASSWORD=VERY_SECURED_PASSWORD >> eshop.db\.env.order
    echo POSTGRES_DB=eshop.orders >> eshop.db\.env.order
    
    echo eshop.db folder and environment files created successfully
) else (
    echo eshop.db folder already exists, checking for required files
    
    if not exist "eshop.db\.env" (
        echo Creating .env file in eshop.db
        echo POSTGRES_USER=postgres > eshop.db\.env
        echo POSTGRES_PASSWORD=VERY_SECURED_PASSWORD >> eshop.db\.env
        echo POSTGRES_DB=eshop >> eshop.db\.env
    ) else (
        echo .env file already exists in eshop.db
    )
    
    if not exist "eshop.db\.env.order" (
        echo Creating .env.order file in eshop.db
        echo POSTGRES_USER=postgres > eshop.db\.env.order
        echo POSTGRES_PASSWORD=VERY_SECURED_PASSWORD >> eshop.db\.env.order
        echo POSTGRES_DB=eshop.orders >> eshop.db\.env.order
    ) else (
        echo .env.order file already exists in eshop.db
    )
)

:: Create root .env file with Postgres volume paths
echo Creating root .env file with Postgres volume paths
echo POSTGRES_VOLUME_PATH_1=C:/POSTGRES_VOLUME_PATH_1 > .env
echo POSTGRES_VOLUME_PATH_2=C:/POSTGRES_VOLUME_PATH_2 >> .env
echo Root .env file created successfully

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