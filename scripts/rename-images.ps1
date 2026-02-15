# Script de renommage des images Pre-wedding
# Convention : prewedding.jpg, prewedding-1.jpg, patricia.jpg, philip.jpg

$folder = Join-Path $PSScriptRoot "..\public\img\Pre-wedding"
if (-not (Test-Path $folder)) {
    Write-Host "Le dossier $folder n'existe pas." -ForegroundColor Red
    exit 1
}

$renames = @(
    @{ Old = "Pre-wedding Philip & Patricia.jpg"; New = "prewedding.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_1.jpg"; New = "prewedding-1.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_2.jpg"; New = "prewedding-2.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_3.jpg"; New = "prewedding-3.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_4.jpg"; New = "prewedding-4.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_5.jpg"; New = "prewedding-5.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_6.jpg"; New = "prewedding-6.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_7.jpg"; New = "prewedding-7.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_8.jpg"; New = "prewedding-8.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_9.jpg"; New = "prewedding-9.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_10.jpg"; New = "prewedding-10.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_11.jpg"; New = "prewedding-11.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_12.jpg"; New = "prewedding-12.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_13.jpg"; New = "prewedding-13.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_14.jpg"; New = "prewedding-14.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_15.jpg"; New = "prewedding-15.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_16.jpg"; New = "prewedding-16.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_17.jpg"; New = "prewedding-17.jpg" },
    @{ Old = "Pre-wedding Philip & Patricia_18.jpg"; New = "prewedding-18.jpg" },
    @{ Old = "Patricia.jpeg"; New = "patricia.jpg" },
    @{ Old = "Philip.jpeg"; New = "philip.jpg" }
)

$count = 0
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
