# PowerShell script to kill process using port 5000
$port = 5000
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($process) {
    $processId = $process.OwningProcess
    $processInfo = Get-Process -Id $processId -ErrorAction SilentlyContinue
    
    if ($processInfo) {
        Write-Host "Found process using port $port :"
        Write-Host "PID: $processId"
        Write-Host "Name: $($processInfo.ProcessName)"
        Write-Host ""
        Write-Host "Killing process..."
        Stop-Process -Id $processId -Force
        Write-Host "✅ Process killed successfully!"
    } else {
        Write-Host "Could not find process details"
    }
} else {
    Write-Host "No process found using port $port"
}

