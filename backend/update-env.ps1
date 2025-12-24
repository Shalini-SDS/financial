# Script to update .env file with Neon and MongoDB URLs
param(
    [string]$NeonUrl = "",
    [string]$MongoUrl = ""
)

$envFile = ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "Creating .env file..."
    Copy-Item ".env.example" $envFile -ErrorAction SilentlyContinue
}

if ($NeonUrl -ne "") {
    Write-Host "Updating DATABASE_URL with Neon connection string..."
    $content = Get-Content $envFile
    $content = $content -replace 'DATABASE_URL=".*"', "DATABASE_URL=`"$NeonUrl`""
    $content | Set-Content $envFile
    Write-Host "✅ DATABASE_URL updated"
}

if ($MongoUrl -ne "") {
    Write-Host "Updating MONGO_URL..."
    $content = Get-Content $envFile
    $content = $content -replace 'MONGO_URL=".*"', "MONGO_URL=`"$MongoUrl`""
    $content | Set-Content $envFile
    Write-Host "✅ MONGO_URL updated"
}

Write-Host "`nUpdated .env file:"
Get-Content $envFile | Select-String -Pattern "DATABASE_URL|MONGO_URL"


