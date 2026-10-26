# PFC Examples help

The help file for the PFC Examples Application (the `pfc examples` project in [2025-Solution](https://github.com/OpenSourcePFCLibraries/2025-Solution) and [2025-Workspace](https://github.com/OpenSourcePFCLibraries/2025-Workspace)): `PFCEXAMP.chm`, which the application opens, and the same content as `PFCEXAMP.pdf`.  This repository contains the source; the help file itself, in CHM or PDF format, can be downloaded from the [latest release](https://github.com/OpenSourcePFCLibraries/Example-application-help-file/releases/latest).  Put `PFCEXAMP.chm` beside `pfcexamp.exe`.

Both are built from the sources in `src`:

| File | Contents |
|---|---|
| `src/topics.js` | The topics: the general ones, a topic for each category, and a topic for each example |
| `src/build.js` | Generates the HTML Help project and the document for the PDF from the topics |
| `src/style.css` | The topics' style |
| `src/images/` | A picture of each example's window, `<window>.png` |
| `src/docpages.json` | The pages of the [docs](https://github.com/OpenSourcePFCLibraries/docs) repository that the PFC object names link to |

## Building

```
pwsh -File build.ps1
```

This needs Node.js, [HTML Help Workshop](https://learn.microsoft.com/previous-versions/windows/desktop/htmlhelp/microsoft-html-help-downloads) (for `hhc.exe`) and Microsoft Word (for the PDF).  `-NoPdf` builds only the CHM.  The generated project is in `build`, which isn't kept in the repository.

## Help context numbers

The Examples Application opens a topic by its help context number (`ShowHelp(..., Topic!, n)`):

| Topic | Number |
|---|---|
| An example | 1000 + its `example_id` (the `exhelp` column of `examples/exam.txt`) |
| A category | 100 + its `category_id` (in `examples/examcat.txt`) |
| The general topics | 1 to 5 |

F1 in an example's window opens its topic, and F1 in the main window opens the topic of the selected example or category.

## Adding an example's topic

Add an entry to `exports.examples` in `src/topics.js`, with the example's `id`, `title` and `window` as in `exam.txt`, its category, a summary, what to try, and the PFC objects it shows; add a picture of its window to `src/images`; and build.
