<#
.SYNOPSIS
    Builds PFCEXAMP.chm and PFCEXAMP.pdf from the sources in src.

.DESCRIPTION
    1. node src\build.js writes the HTML Help project to build\html and one HTML document
       with every topic to build\book.
    2. HTML Help Workshop's hhc.exe compiles build\html\pfcexamp.hhp to PFCEXAMP.chm.
    3. Word opens build\book\pfcexamp.htm, adds the table of contents, and saves it as a PDF,
       with the headings as bookmarks.
    4. node src\pdfnames.js gives that PDF a named destination for each topic, topic_<its help
       context number> (from build\book\destinations.json), and saves it as PFCEXAMP.pdf.

    Needs Node.js, HTML Help Workshop (https://learn.microsoft.com/previous-versions/windows/desktop/htmlhelp/microsoft-html-help-downloads)
    and Microsoft Word.

.PARAMETER NoPdf
    Only builds the CHM.
#>
param([switch]$NoPdf)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

node (Join-Path $root 'src\build.js')
if ($LASTEXITCODE -ne 0) { throw 'build.js failed' }

# The CHM.  hhc.exe returns 1 when it succeeds.
$hhc = Join-Path ${env:ProgramFiles(x86)} 'HTML Help Workshop\hhc.exe'
if (-not (Test-Path $hhc)) { throw "HTML Help Workshop isn't installed ($hhc)" }
$html = Join-Path $root 'build\html'
& $hhc (Join-Path $html 'pfcexamp.hhp') | Out-Host
if ($LASTEXITCODE -ne 1) { throw 'hhc.exe failed' }
Copy-Item (Join-Path $html 'PFCEXAMP.chm') (Join-Path $root 'PFCEXAMP.chm') -Force
Write-Host "PFCEXAMP.chm"

if ($NoPdf) { return }

# The PDF
$book = Join-Path $root 'build\book\pfcexamp.htm'
$pdf = Join-Path $root 'build\book\pfcexamp.pdf'
$word = New-Object -ComObject Word.Application
try {
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $doc = $word.Documents.Open($book, $false, $true)
    $doc.ActiveWindow.View.Type = 3          # print layout
    $doc.PageSetup.TopMargin = 54; $doc.PageSetup.BottomMargin = 54
    $doc.PageSetup.LeftMargin = 60; $doc.PageSetup.RightMargin = 60

    # The table of contents, where the document says [[TOC]]
    $range = $doc.Content
    if ($range.Find.Execute('[[TOC]]')) {
        $range.Text = ''
        $toc = $doc.TablesOfContents.Add($range, $true, 1, 2)
        $toc.Update()
    }

    # 17 = PDF; CreateBookmarks 1 = from the headings
    $doc.ExportAsFixedFormat($pdf, 17, $false, 0, 0, 1, 1, 0, $true, $true, 1, $true, $true, $false)
    $doc.Close(0)
}
finally {
    $word.Quit()
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($word)
}

# The named destinations
node (Join-Path $root 'src\pdfnames.js') $pdf (Join-Path $root 'PFCEXAMP.pdf') (Join-Path $root 'build\book\destinations.json')
if ($LASTEXITCODE -ne 0) { throw 'pdfnames.js failed' }
Write-Host "PFCEXAMP.pdf"
