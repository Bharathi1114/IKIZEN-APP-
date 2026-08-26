$supabaseUrl = "https://wdlxvaoqxdzujwismcao.supabase.co/rest/v1"
$supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbHh2YW9xeGR6dWp3aXNtY2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDY3NzAsImV4cCI6MjEwMTc4Mjc3MH0.jQ9H3jvn-nT_4R4RcZ4RPwQFCprT5_bc5OcBz8hLpnI"

$headers = @{
    "apikey" = $supabaseKey
    "Authorization" = "Bearer $supabaseKey"
    "Content-Type" = "application/json"
    "Prefer" = "return=minimal"
}

$vegFoods = @(
    @{name="Paneer Tikka"; calories=350; protein=18; carbs=12; fat=25; serving_size="200g"}
    @{name="Palak Paneer"; calories=300; protein=15; carbs=10; fat=22; serving_size="250g"}
    @{name="Vegetable Biryani"; calories=450; protein=8; carbs=65; fat=15; serving_size="300g"}
    @{name="Margherita Pizza"; calories=280; protein=12; carbs=35; fat=10; serving_size="1 slice"}
    @{name="Lentil Soup (Dal)"; calories=220; protein=14; carbs=38; fat=2; serving_size="1 bowl"}
    @{name="Masala Dosa"; calories=320; protein=8; carbs=55; fat=10; serving_size="1 dosa"}
)

$nonVegFoods = @(
    @{name="Chicken Breast (Grilled)"; calories=165; protein=31; carbs=0; fat=3.6; serving_size="100g"}
    @{name="Salmon Fillet"; calories=208; protein=20; carbs=0; fat=13; serving_size="100g"}
    @{name="Beef Steak"; calories=271; protein=25; carbs=0; fat=19; serving_size="100g"}
    @{name="Chicken Biryani"; calories=550; protein=25; carbs=70; fat=18; serving_size="300g"}
    @{name="Egg Omelette"; calories=154; protein=13; carbs=1; fat=11; serving_size="2 eggs"}
    @{name="Tuna Salad"; calories=210; protein=25; carbs=5; fat=10; serving_size="1 bowl"}
)

$veganFoods = @(
    @{name="Tofu Stir Fry"; calories=250; protein=16; carbs=20; fat=12; serving_size="1 bowl"}
    @{name="Quinoa Salad"; calories=220; protein=8; carbs=39; fat=4; serving_size="1 bowl"}
    @{name="Hummus & Pita"; calories=330; protein=10; carbs=45; fat=12; serving_size="1 serving"}
    @{name="Avocado Toast"; calories=290; protein=5; carbs=20; fat=21; serving_size="1 slice"}
    @{name="Chickpea Curry"; calories=280; protein=11; carbs=40; fat=8; serving_size="1 bowl"}
    @{name="Oatmeal with Berries"; calories=180; protein=5; carbs=35; fat=3; serving_size="1 bowl"}
)

$ketoFoods = @(
    @{name="Bacon & Eggs"; calories=350; protein=25; carbs=2; fat=28; serving_size="1 serving"}
    @{name="Keto Chicken Salad"; calories=400; protein=30; carbs=4; fat=25; serving_size="1 bowl"}
    @{name="Pork Chops"; calories=250; protein=28; carbs=0; fat=14; serving_size="100g"}
    @{name="Keto Cheese Crisps"; calories=150; protein=10; carbs=1; fat=12; serving_size="30g"}
    @{name="Almond Butter"; calories=190; protein=7; carbs=6; fat=16; serving_size="2 tbsp"}
    @{name="Cauliflower Mac & Cheese"; calories=320; protein=15; carbs=8; fat=25; serving_size="1 bowl"}
)

function Insert-Data($table, $data) {
    foreach ($item in $data) {
        $item["id"] = [guid]::NewGuid().ToString()
    }
    $json = $data | ConvertTo-Json -Depth 5
    $url = "$supabaseUrl/$table"
    try {
        Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $json
        Write-Host "Inserted into $table"
    } catch {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $responseBody = $reader.ReadToEnd()
        Write-Host "Error inserting to $table : $responseBody"
    }
}

Insert-Data "veg_foods" $vegFoods
Insert-Data "non_veg_foods" $nonVegFoods
Insert-Data "vegan_foods" $veganFoods
Insert-Data "keto_foods" $ketoFoods

Write-Host "Done seeding database!"
