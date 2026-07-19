Add-Type -AssemblyName System.Drawing
$imgPath = "e:\Ghazal Wedding Website\public\assets\bg.png"
$outPath = "e:\Ghazal Wedding Website\public\assets\bg-og.jpg"

try {
    $img = [System.Drawing.Image]::FromFile($imgPath)
    $bmp = new-object System.Drawing.Bitmap 1200, 630
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::White)
    
    $ratioX = 1200.0 / $img.Width
    $ratioY = 630.0 / $img.Height
    $ratio = if ($ratioY -lt $ratioX) { $ratioY } else { $ratioX }
    
    $newW = [int]($img.Width * $ratio)
    $newH = [int]($img.Height * $ratio)
    $posX = [int]((1200 - $newW) / 2)
    $posY = [int]((630 - $newH) / 2)
    
    $g.DrawImage($img, $posX, $posY, $newW, $newH)
    $g.Dispose()
    $img.Dispose()
    
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
    Write-Host "Image successfully resized and saved to $outPath"
} catch {
    Write-Host "Error: $_"
}
