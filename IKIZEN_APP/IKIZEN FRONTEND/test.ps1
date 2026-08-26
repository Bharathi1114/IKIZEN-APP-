$supabaseUrl = "https://wdlxvaoqxdzujwismcao.supabase.co/rest/v1"
$supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbHh2YW9xeGR6dWp3aXNtY2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDY3NzAsImV4cCI6MjEwMTc4Mjc3MH0.jQ9H3jvn-nT_4R4RcZ4RPwQFCprT5_bc5OcBz8hLpnI"

$headers = @{
    "apikey" = $supabaseKey
    "Authorization" = "Bearer $supabaseKey"
    "Content-Type" = "application/json"
    "Prefer" = "return=minimal"
}

$body = '[{"name":"Test Food","calories":100,"protein":1,"carbs":2,"fat":3,"serving_size":"10g"}]'

try {
    Invoke-RestMethod -Uri "$supabaseUrl/veg_foods" -Method Post -Headers $headers -Body $body
} catch {
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $responseBody = $reader.ReadToEnd()
    Write-Host "Error: $responseBody"
}
