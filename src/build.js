// Generates the PFC Examples help from topics.js:
//   build/html/        the HTML Help project (topics, pfcexamp.hhp, toc.hhc, index.hhk, context.h)
//   build/book/        one HTML document with every topic, for the PDF
// build.ps1 runs this, then compiles the CHM with hhc.exe and makes the PDF with Word.
//
// node build.js

const fs = require('fs');
const path = require('path');
const t = require('./topics.js');
const docpages = require('./docpages.json');

const SRC = __dirname;
const OUT = path.join(SRC, '..', 'build');
const HTML = path.join(OUT, 'html');
const BOOK = path.join(OUT, 'book');
const DOCS = 'https://github.com/OpenSourcePFCLibraries/docs/blob/main/object-reference/';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Plain text from topics.js: escaped, with object and function names in code
const prose = s => esc(s).replace(/\b((?:n|u|w|s|f|m|d)_[a-z0-9_]+|of_[A-Za-z0-9_]+|pfc_[A-Za-z0-9_]+|ShareData|SQLCA)\b/g, '<code>$1</code>');

const exFile = e => 'ex_' + e.window + '.htm';
const exContext = e => 1000 + e.id;
const catOf = id => t.categories.find(c => c.id === id);
const examplesIn = c => t.examples.filter(e => e.cat === c.id).sort((a, b) => a.title.localeCompare(b.title));
const picture = e => fs.existsSync(path.join(SRC, 'images', e.window + '.png')) ? e.window + '.png' : null;

function page(title, body) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${esc(title)}</title><link rel="stylesheet" href="style.css"></head>
<body><h1>${esc(title)}</h1>
${body}
</body></html>
`;
}

function categoryList() {
  return t.categories.map(c => `<li><a href="${c.file}.htm">${esc(c.title)}</a>: ${prose(c.intro)}</li>`).join('\n');
}

function generalBody(g) {
  return g.body.replace('{{categories}}', categoryList()).trim();
}

function categoryBody(c) {
  const rows = examplesIn(c).map(e => `<tr><td><a href="${exFile(e)}">${esc(e.title)}</a></td><td><code>${e.window}</code></td></tr>`).join('\n');
  return `<p>${prose(c.intro)}</p>
<table>
<tr><th>Example</th><th>Window</th></tr>
${rows}
</table>`;
}

function exampleBody(e) {
  const c = catOf(e.cat);
  const objects = e.objects.map(o => docpages[o] ? `<a href="${DOCS}${docpages[o]}">${o}</a>` : o);
  const pic = picture(e);
  return `<p class="crumb"><a href="${c.file}.htm">${esc(c.title)}</a></p>
<p>${prose(e.summary)}</p>
${pic ? `<p><img src="${pic}" alt="The ${esc(e.title)} window"></p>` : ''}
<h2>Try it</h2>
<ul>
${e.try.map(s => `<li>${prose(s)}</li>`).join('\n')}
</ul>
<h2>PFC objects</h2>
<p>${objects.map(o => `<code>${o}</code>`).join(', ')}</p>
<h2>The window</h2>
<p><code>${e.window}</code>, in <code>appexamp.pbl</code>.  Open it in the PowerBuilder IDE to see how the example is coded.</p>`;
}

// Every topic, in the order of the contents: [file, title, body, context]
function topics() {
  const list = [];
  const general = t.general.map(g => [g.file, g.title, generalBody(g), g.context]);
  list.push(general[0]);
  for (const g of general.slice(1)) list.push(g);
  for (const c of t.categories) {
    list.push([c.file, c.title, categoryBody(c), c.context]);
    for (const e of examplesIn(c)) list.push([exFile(e).replace('.htm', ''), e.title, exampleBody(e), exContext(e)]);
  }
  return list;
}

function writeHtmlHelp(all) {
  fs.rmSync(HTML, { recursive: true, force: true });
  fs.mkdirSync(HTML, { recursive: true });
  fs.copyFileSync(path.join(SRC, 'style.css'), path.join(HTML, 'style.css'));
  const pictures = t.examples.map(picture).filter(Boolean);
  for (const p of pictures) fs.copyFileSync(path.join(SRC, 'images', p), path.join(HTML, p));
  for (const [file, title, body] of all) fs.writeFileSync(path.join(HTML, file + '.htm'), page(title, body));

  // Contents: the general topics, then each category with its examples
  const item = (title, file) => `<LI><OBJECT type="text/sitemap"><param name="Name" value="${esc(title)}"><param name="Local" value="${file}.htm"></OBJECT>`;
  const toc = [];
  for (const g of t.general) toc.push(item(g.title, g.file));
  for (const c of t.categories) {
    toc.push(item(c.title, c.file));
    toc.push('<UL>');
    for (const e of examplesIn(c)) toc.push(item(e.title, exFile(e).replace('.htm', '')));
    toc.push('</UL>');
  }
  fs.writeFileSync(path.join(HTML, 'toc.hhc'), `<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<HTML><HEAD></HEAD><BODY>
<OBJECT type="text/site properties"><param name="Window Styles" value="0x800025"></OBJECT>
<UL>
${toc.join('\n')}
</UL>
</BODY></HTML>
`);

  // Index: every topic by its title, and the examples by their window and PFC objects too
  const keys = new Map();
  const add = (k, title, file) => { if (!keys.has(k)) keys.set(k, []); keys.get(k).push([title, file]); };
  for (const [file, title] of all) add(title, title, file);
  for (const e of t.examples) {
    add(e.window, e.title, exFile(e).replace('.htm', ''));
    for (const o of e.objects) add(o, e.title, exFile(e).replace('.htm', ''));
  }
  const idx = [...keys.keys()].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).map(k =>
    `<LI><OBJECT type="text/sitemap"><param name="Name" value="${esc(k)}">` +
    keys.get(k).map(([title, file]) => `<param name="Name" value="${esc(title)}"><param name="Local" value="${file}.htm">`).join('') + '</OBJECT>');
  fs.writeFileSync(path.join(HTML, 'index.hhk'), `<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<HTML><HEAD></HEAD><BODY>
<UL>
${idx.join('\n')}
</UL>
</BODY></HTML>
`);

  // Context numbers for ShowHelp(..., Topic!, n): the examples' are 1000 + example_id
  const idh = file => 'IDH_' + file.toUpperCase();
  fs.writeFileSync(path.join(HTML, 'context.h'), all.map(([file, , , ctx]) => `#define ${idh(file)} ${ctx}`).join('\r\n') + '\r\n');

  fs.writeFileSync(path.join(HTML, 'pfcexamp.hhp'), [
    '[OPTIONS]',
    'Compatibility=1.1 or later',
    'Compiled file=PFCEXAMP.chm',
    'Contents file=toc.hhc',
    'Index file=index.hhk',
    'Default topic=welcome.htm',
    'Default Window=main',
    'Display compile progress=No',
    'Full-text search=Yes',
    'Language=0x409 English (United States)',
    `Title=${t.title}`,
    '',
    '[WINDOWS]',
    `main="${t.title}","toc.hhc","index.hhk","welcome.htm","welcome.htm",,,,,0x63520,240,0x10384e,[80,60,1000,760],,,,,,,0`,
    '',
    '[FILES]',
    ...all.map(([file]) => file + '.htm'),
    'style.css',
    ...pictures,
    '',
    '[ALIAS]',
    ...all.map(([file]) => `${idh(file)}=${file}.htm`),
    '',
    '[MAP]',
    '#include context.h',
    '',
  ].join('\r\n'));
}

// One document for the PDF: the topics as chapters, with links between them turned into
// links to the chapters (Word makes the headings bookmarks and adds the table of contents)
function writeBook(all) {
  fs.rmSync(BOOK, { recursive: true, force: true });
  fs.mkdirSync(BOOK, { recursive: true });
  for (const p of t.examples.map(picture).filter(Boolean)) fs.copyFileSync(path.join(SRC, 'images', p), path.join(BOOK, p));
  const chapters = all.map(([file, title, body], i) => {
    const html = body.replace(/href="([a-z0-9_]+)\.htm"/g, 'href="#$1"').replace(/<h2>/g, '<h3>').replace(/<\/h2>/g, '</h3>');
    return `<h${file.startsWith('ex_') ? 2 : 1} id="${file}"${i ? ' class="newpage"' : ''}>${esc(title)}</h${file.startsWith('ex_') ? 2 : 1}>\n${html}`;
  });
  fs.writeFileSync(path.join(BOOK, 'pfcexamp.htm'), `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(t.title)}</title><style>
${fs.readFileSync(path.join(SRC, 'style.css'), 'utf8')}
h1.newpage, h2.newpage { page-break-before: always; }
p.crumb { display: none; }
</style></head><body>
<p class="cover">${esc(t.title)}</p>
<p>The PFC Examples Application: setting it up, and what each example shows.</p>
<p>[[TOC]]</p>
${chapters.join('\n')}
</body></html>
`);
}

const all = topics();
writeHtmlHelp(all);
writeBook(all);
console.log(`${all.length} topics, ${t.examples.filter(picture).length} pictures`);
