# Script de renommage des images Pre-wedding
# Convention : prewedding.jpg, prewedding1.jpg, prewedding2.jpg, patricia.jpg, philip.jpg

$folder = Join-Path $PSScriptRoot "..\public\img\Pre-wedding"
$count = 0
if (-not (Test-Path $folder)) {
    Write-Host "Le dossier $folder n'existe pas." -ForegroundColor Red
    exit 1
}

# D'abord renommer prewedding-X.jpg -> preweddingX.jpg (sans tiret)
$removeHyphens = @(
    @{ Old = "prewedding-1.jpg"; New = "prewedding1.jpg" },
    @{ Old = "prewedding-2.jpg"; New = "prewedding2.jpg" },
    @{ Old = "prewedding-3.jpg"; New = "prewedding3.jpg" },
    @{ Old = "prewedding-4.jpg"; New = "prewedding4.jpg" },
    @{ Old = "prewedding-5.jpg"; New = "prewedding5.jpg" },
    @{ Old = "prewedding-6.jpg"; New = "prewedding6.jpg" },
    @{ Old = "prewedding-7.jpg"; New = "prewedding7.jpg" },
    @{ Old = "prewedding-8.jpg"; New = "prewedding8.jpg" },
    @{ Old = "prewedding-9.jpg"; New = "prewedding9.jpg" },
    @{ Old = "prewedding-10.jpg"; New = "prewedding10.jpg" },
    @{ Old = "prewedding-11.jpg"; New = "prewedding11.jpg" },
    @{ Old = "prewedding-12.jpg"; New = "prewedding12.jpg" },
    @{ Old = "prewedding-13.jpg"; New = "prewedding13.jpg" },
    @{ Old = "prewedding-14.jpg"; New = "prewedding14.jpg" },
    @{ Old = "prewedding-15.jpg"; New = "prewedding15.jpg" },
    @{ Old = "prewedding-16.jpg"; New = "prewedding16.jpg" },
    @{ Old = "prewedding-17.jpg"; New = "prewedding17.jpg" },
    @{ Old = "prewedding-18.jpg"; New = "prewedding18.jpg" }
)

foreach ($r in $removeHyphens) {
    $oldPath = Join-Path $folder $r.Old
    $newPath = Join-Path $folder $r.New
    if ((Test-Path $oldPath) -and $oldPath -ne $newPath) {
        Rename-Item -Path $oldPath -NewName $r.New -Force
        Write-Host "Renommé: $($r.Old) -> $($r.New)" -ForegroundColor Green
        $count++
    }
}

$renames = @(
    @{ Old = "Pre-wedding Philip & Patricia.jpg"; New = "prewedding.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_1.jpg"; New = "prewedding1.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_2.jpg"; New = "prewedding2.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_3.jpg"; New = "prewedding3.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_4.jpg"; New = "prewedding4.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_5.jpg"; New = "prewedding5.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_6.jpg"; New = "prewedding6.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_7.jpg"; New = "prewedding7.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_8.jpg"; New = "prewedding8.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_9.jpg"; New = "prewedding9.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_10.jpg"; New = "prewedding10.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_11.jpg"; New = "prewedding11.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_12.jpg"; New = "prewedding12.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_13.jpg"; New = "prewedding13.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_14.jpg"; New = "prewedding14.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_15.jpg"; New = "prewedding15.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_16.jpg"; New = "prewedding16.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_17.jpg"; New = "prewedding17.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_18.jpg"; New = "prewedding18.jpg" },
    @{ Old = "Patricia.jpeg"; New = "patricia.jpg" },
    @{ Old = "Philip.jpeg"; New = "philip.jpg" }
)

foreach ($r in $renames) {
    $oldPath = Join-Path $folder $r.Old
    $newPath = Join-Path $folder $r.New
    
    if ((Test-Path $oldPath) -and $oldPath -ne $newPath) {
        Rename-Item -Path $oldPath -NewName $r.New -Force
        Write-Host "Renommé: $($r.Old) -> $($r.New)" -ForegroundColor Green
        $count++
    }
}

Write-Host "`n$count fichier(s) renommé(s)." -ForegroundColor Cyan
