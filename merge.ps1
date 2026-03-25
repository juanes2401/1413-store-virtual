$ErrorActionPreference = "Stop"
try {
    $base = "C:\Users\juane\OneDrive\Escritorio\proyecto 2"
    $htmlPath = "$base\proyecto Papa\index.html"
    $cssPath = "$base\proyecto Papa\css\styles.css"
    $jsPath = "$base\proyecto Papa\js\script.js"
    $outPath = "$base\index.html"

    # Read contents ensuring UTF-8
    $html = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)
    $css = [System.IO.File]::ReadAllText($cssPath, [System.Text.Encoding]::UTF8)
    $js = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)

    # Replaces
    $cssBlock = "<style>`n$css`n</style>"
    $jsBlock = "<script>`n$js`n</script>"

    $html = $html.Replace('<link rel="stylesheet" href="css/styles.css" />', $cssBlock)
    $html = $html.Replace('<script src="js/script.js"></script>', $jsBlock)
    $html = $html.Replace('img/logo_tienda.jpeg', 'logo.png')

    # Write carefully with UTF8 encoding (no BOM)
    $utf8NoBom = New-Object System.Text.UTF8Encoding $False
    [System.IO.File]::WriteAllText($outPath, $html, $utf8NoBom)
    
    Write-Output "SUCCESS"
} catch {
    Write-Error $_
    exit 1
}
