Add-Type -AssemblyName System.Drawing

$imgPath = "e:\Ghazal Wedding Website\public\assets\bg.png"
$outPath = "e:\Ghazal Wedding Website\public\assets\bg-og.jpg"

try {
    $img = [System.Drawing.Image]::FromFile($imgPath)
    $bmp = new-object System.Drawing.Bitmap 1200, 630
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    # 1. Create a blurred background by downscaling heavily then upscaling
    $tinyBmp = new-object System.Drawing.Bitmap 24, 12
    $gTiny = [System.Drawing.Graphics]::FromImage($tinyBmp)
    $gTiny.DrawImage($img, 0, 0, 24, 12)
    $gTiny.Dispose()
    
    # Draw tiny bitmap scaled up to 1200x630 to create a blur effect
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($tinyBmp, 0, 0, 1200, 630)
    $tinyBmp.Dispose()
    
    # Optionally, draw a semi-transparent dark overlay so the main image pops
    $overlay = new-object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(100, 0, 0, 0))
    $g.FillRectangle($overlay, 0, 0, 1200, 630)
    $overlay.Dispose()

    # 2. Draw the main image in the center, keeping aspect ratio
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
