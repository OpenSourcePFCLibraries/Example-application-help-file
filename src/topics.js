// The content of the PFC Examples help: the general topics, the categories and the examples.
// build.js turns this into the HTML Help project and the PDF.
//
// Example topics: id is the example_id in examples/exam.txt; the topic's help context number
// is 1000 + id (the exhelp column of exam.txt).  A category's is 100 + its category_id
// (the category_id in examples/examcat.txt).  In the text, `name` is code, and a PFC object
// name in objects[] links to its page in the docs repository when it has one.

exports.title = 'PFC Examples';

exports.general = [
  {
    file: 'welcome', title: 'The PFC Examples Application', context: 1,
    body: `
<p>The PFC Examples Application shows the PowerBuilder Foundation Classes at work.  Each example is a small window that uses one PFC service or object: open it, try it, then open the window in the PowerBuilder IDE to see how it's done.  The windows are short, and their code can be copied into your own PFC applications.</p>
<p>The main window lists the examples in a tree, by category:</p>
<ul>
{{categories}}
</ul>
<p>Select an example and press F1, or press F1 in an example's window, to read about that example.</p>
<h2>In this help</h2>
<ul>
<li><a href="setup.htm">Setting up the Examples Application</a>: the database, the INI file and the images</li>
<li><a href="mainwindow.htm">The main window</a></li>
<li><a href="files.htm">The application's files</a></li>
<li><a href="addexample.htm">Adding an example</a></li>
</ul>
<p>The PFC documentation, the User's Guide and the Object Reference, is in the <a href="https://github.com/OpenSourcePFCLibraries/docs">docs repository</a>.</p>`
  },
  {
    file: 'setup', title: 'Setting up the Examples Application', context: 2,
    body: `
<p>The project is <code>pfc examples</code>: <code>pfc examples.pbproj</code> in the PFC 2025 Solution, or the <code>pfc examples</code> target in the PFC 2025 Workspace.  It builds <code>pfcexamp.exe</code>.</p>
<h2>The database</h2>
<p>Most examples read and update the EASDEMO sample database, from the <a href="https://github.com/OpenSourcePFCLibraries/Database-scripts-and-files">Database-scripts-and-files</a> repository:</p>
<ul>
<li><b>SQL Server:</b> restore <code>EASDEMO.sql_server.bak</code> as the database EASDEMO.</li>
<li><b>SQL Anywhere:</b> use <code>easdemo17.db</code> with SQL Anywhere 17, through an ODBC data source.  PowerBuilder's own demo database (the PB Demo DB data source) has the same tables and works too.</li>
</ul>
<p>Point the <code>[Database]</code> section of <code>examples.ini</code>, in the <code>examples</code> folder, at it: <code>DBMS</code>, <code>DbParm</code>, and for SQL Server <code>ServerName</code>, <code>LogId</code> and <code>LogPassword</code>.  Keep <code>AutoCommit=False</code>.  The Security Service example also needs a <code>[Security]</code> section for the PFC security database (<code>PFC.sql_server.bak</code> or <code>pfc17.db</code>); it says so when it opens without one.</p>
<h2>The images</h2>
<p>The examples' pictures are in the <a href="https://github.com/OpenSourcePFCLibraries/PFC-Example-App-Image-Files">PFC-Example-App-Image-Files</a> repository.  Add its folder to the system path or to PowerBuilder's application path, so that both the IDE and <code>pfcexamp.exe</code> find them.</p>
<h2>This help file</h2>
<p>Put <code>PFCEXAMP.chm</code> beside <code>pfcexamp.exe</code>.  It is published, with a PDF version, in the <a href="https://github.com/OpenSourcePFCLibraries/Example-application-help-file/releases/latest">Example-application-help-file</a> repository.</p>`
  },
  {
    file: 'mainwindow', title: 'The main window', context: 3,
    body: `
<p>The main window, <code>w_examplemain</code>, is itself a PFC example.  It uses:</p>
<ul>
<li>the TreeView level source service (<code>u_tvs</code>, <code>n_cst_tvsrv_levelsource</code>) for the tree of categories and examples, and the ListView data source service (<code>u_lvs</code>, <code>n_cst_lvsrv_datasource</code>) for the list beside it;</li>
<li>the example catalog, <code>n_cst_examplecatalog</code>, which reads the tree and the list from <code>exam.txt</code> and <code>examcat.txt</code> (see <a href="addexample.htm">Adding an example</a>);</li>
<li>the debug and SQL Spy services, from the Utilities menu;</li>
<li>the most recently used (MRU) service;</li>
<li>the window resize service, with a split bar between the tree and the list.</li>
</ul>
<p>Double-click an example, or select it and press Enter, to open it.  Each example window takes its title from the catalog.  Press F1 to read about the selected example.</p>`
  },
  {
    file: 'files', title: "The application's files", context: 4,
    body: `
<h2>Libraries</h2>
<p>The examples are in the <code>examples</code> folder:</p>
<table>
<tr><th>Library</th><th>Contents</th></tr>
<tr><td><code>appexamp.pbl</code></td><td>The application object (<code>pfcexamp</code>) and the example windows</td></tr>
<tr><td><code>appexmdw.pbl</code></td><td>The examples' DataWindow objects</td></tr>
<tr><td><code>appexmfe.pbl</code></td><td>The main window, its menu and the example catalog</td></tr>
<tr><td><code>exmmain.pbl</code>, <code>exmutil.pbl</code>, <code>exmwnsrv.pbl</code></td><td>The application's extension layer: its own <code>w_master</code>, <code>w_frame</code>, <code>n_tr</code> and other objects that inherit from PFC's</td></tr>
</table>
<p>The application also uses the PFC libraries (<code>pfcapsrv</code>, <code>pfcdwsrv</code>, <code>pfcmain</code>, <code>pfcutil</code>, <code>pfcwnsrv</code>) and their extension layers (<code>pfeapsrv</code>, <code>pfedwsrv</code>, <code>pfemain</code>, <code>pfeutil</code>, <code>pfewnsrv</code>).</p>
<h2>Other files</h2>
<table>
<tr><th>File</th><th>Contents</th></tr>
<tr><td><code>examples.ini</code></td><td>The application's INI file: the database connection and the application's settings</td></tr>
<tr><td><code>exam.txt</code>, <code>examcat.txt</code></td><td>The example catalog</td></tr>
<tr><td><code>README.md</code></td><td>Setting up, the catalog files and the list of examples</td></tr>
</table>`
  },
  {
    file: 'addexample', title: 'Adding an example', context: 5,
    body: `
<p>The main window's tree and list come from two tab-delimited files in the <code>examples</code> folder, without a header line, with CR LF line ends.</p>
<p><code>exam.txt</code> has a line for each example: <code>example_id</code> (a unique number), <code>title</code> (the name in the list, and the window's title), <code>exhelp</code> (the help context number of its topic in this file, 1000 + example_id; a category's topic is 100 + category_id) and <code>window</code> (the window that the example opens).</p>
<p><code>examcat.txt</code> has a line for each item in the tree: <code>category_id</code> (a unique number), <code>category_name</code>, <code>category_parent_id</code> (the category it's in), <code>example_id</code> (0 for a category), the picture indexes (5 and 6 for an example, 3 and 4 for a category), the state picture (0) and the overlay picture (1 marks an example as new).</p>
<p>To add an example:</p>
<ol>
<li>Write its window.  Most examples inherit from <code>w_main</code>, with a short introduction at the top and a Close button that triggers <code>pfc_close</code>.</li>
<li>Add a line to <code>exam.txt</code>, and a line to <code>examcat.txt</code> under its category.</li>
<li>Add its topic to this help file (in <code>src/topics.js</code> in the Example-application-help-file repository), with the same help context number.</li>
</ol>`
  },
];

exports.categories = [
  { id: 1, file: 'cat_appservices', title: 'Application Services', context: 101,
    intro: 'Services that the application manager starts, and the utility objects that any object can use.' },
  { id: 6, file: 'cat_dwservices', title: 'DataWindow Services', context: 106,
    intro: "The services of PFC's DataWindow control, u_dw, and of its DataStore, n_ds.  Each is started with an of_Set function, such as of_SetSort(TRUE)." },
  { id: 7, file: 'cat_linkage', title: 'Linkage Services', context: 107,
    intro: 'The linkage service (n_cst_dwsrv_linkage) links DataWindows in master-detail relationships: by retrieving the details with retrieval arguments, by filtering them, or by scrolling to them.' },
  { id: 27, file: 'cat_treeview', title: 'TreeView and Listview', context: 127,
    intro: "PFC's TreeView and ListView controls with services (u_tvs and u_lvs) fill themselves from DataWindow objects, DataStores or SQL, one level at a time." },
  { id: 34, file: 'cat_window', title: 'Window Services', context: 134,
    intro: 'The services of PFC windows: the save process, resizing, the status bar, the sheet manager, and a frame with a ribbon bar.' },
  { id: 44, file: 'cat_objects', title: 'Objects', context: 144,
    intro: "PFC's visual user objects: split bars, the progress bar, type-ahead list boxes, the Rich Text Edit control, and a gallery of the newer controls." },
];

// The examples.  cat is the category's id; try[] are the things to try in the window.
exports.examples = [
  // Application Services
  { id: 2, title: "Metaclass Service", window: 'w_metaclass', cat: 1,
    summary: "The metaclass service (n_cst_metaclass) reads a class's definition at run time: its ancestors, its events, functions and instance variables, and the classes nested in it, and whether it defines or scripts an event.",
    try: ['Type a class name, such as w_metaclass, u_dw or n_cst_string, choose what to list, and click Show.',
      'Clear Skip the system-defined events, functions and variables to see the ones PowerBuilder defines too (of_SetSkipSystemMode).',
      'Type an event name and click Check to see whether the class defines it (of_IsEventDefined) and whether it or an ancestor scripts it (of_IsEventImplemented).'],
    objects: ['n_cst_metaclass'] },
  { id: 3, title: "Error Service Example", window: 'w_errormsgservice', cat: 1,
    summary: "The error service (n_cst_error) displays messages, either with PowerBuilder's MessageBox or in PFC's own message window (w_message), which can also print the message and take input from the user.",
    try: ['Type a title and a message, choose the icon, the buttons, the default button and the severity, and click Run; the return code shows which button was clicked.',
      "Choose the PFC style (of_SetStyle) and check Print and User Input to see w_message's extra buttons."],
    objects: ['n_cst_error', 'w_message'] },
  { id: 20, title: "File Services Example", window: 'w_fileserv', cat: 1,
    summary: 'The file service (n_cst_filesrv) works with files and directories: it lists a directory, with sizes, dates and attributes, and creates, renames, copies and deletes files and directories.',
    try: ['Change the directory and the file specification, and list the files; sort them by name, extension, date or size.',
      'Use the buttons to create and remove a directory, rename, copy or delete a file, and set its date and attributes.  Try them in a folder of your own.'],
    objects: ['n_cst_filesrv'] },
  { id: 48, title: "Logical Unit of Work", window: 'w_luw', cat: 1,
    summary: 'The logical unit of work service (n_cst_luw) saves several DataWindows and DataStores in one transaction: it accepts the text, validates, updates each one and commits, or rolls back all of them if one fails.  Every PFC window\'s save process (pfc_save) uses it.',
    try: ['Edit some employee names, and change the department names (they are in a DataStore, shown with ShareData).',
      'Click Which Have Changes? (of_UpdatesPending), then Save Both (of_Save).',
      'Click Save with an Error: the departments\' update fails after the employees\', and the whole transaction is rolled back.'],
    objects: ['n_cst_luw'] },
  { id: 55, title: "Date / Time Service", window: 'w_dateserv', cat: 1,
    summary: 'The date and time service (n_cst_datetime) calculates with dates and times: the first and last day of a month, leap years, weekdays and weekends, Julian day numbers, week numbers, relative months and years, and the months, weeks and years between two dates.',
    try: ['Choose a date to see what the service says about it.', 'Choose an ending date to see the months, weeks and years after the first date.', 'Try Relative Month, Relative Year and Wait.'],
    objects: ['n_cst_datetime'] },
  { id: 56, title: "Language Service", window: 'w_languageserv', cat: 1,
    summary: "The language service (n_cst_language) shows PFC's messages, and the captions of its windows, menus and DataWindow objects, in the language of a language file (pfc.lng).",
    try: ['Choose one of the translated language files (the localization repository has eight), then show a PFC message or open a PFC dialog box.'],
    objects: ['n_cst_language'] },
  { id: 57, title: "Security Service", window: 'w_securityserv', cat: 1,
    summary: "The security service (n_cst_security) enables, disables or hides a window's controls by the settings for the user, and for the user's groups, in the PFC security database.",
    try: ['Choose who signs in, then open the order window to see its buttons change.', 'The sample users, groups and settings exist only while the example is open; they are rolled back when it closes.'],
    objects: ['n_cst_security'] },
  { id: 62, title: "Timing Service", window: 'w_timingserv', cat: 1,
    summary: "PFC's timing object, n_tmg, triggers or posts an event in the objects registered with it: in one object, with the single-object service (n_cst_tmgsingle), or in several, each at its own interval, with the multiple-object service (n_cst_tmgmultiple).",
    try: ['Watch the clock (one event, every second) and the three counters (every 2, 4 and 8 seconds, on one timer).', 'Stop and start each timer, and unregister the 2-second counter to see the shared timer\'s interval change.'],
    objects: ['n_tmg', 'n_cst_tmgsingle', 'n_cst_tmgmultiple'] },
  { id: 63, title: "Transaction Registration", window: 'w_trregserv', cat: 1,
    summary: "The transaction registration service (n_cst_trregistration, started with the application manager's of_SetTrRegistration) keeps track of an application's transaction objects: code anywhere can find one by name, and the service can destroy them all when the application closes.",
    try: ['Register SQLCA, and connect and register a second transaction named Reports.', 'Find a transaction by name (of_GetByName), and destroy all the registered ones (of_Destroy; SQLCA is kept with of_SetAllowSQLCADestroy).'],
    objects: ['n_cst_trregistration', 'n_tr'] },
  { id: 65, title: "Utility Services", window: 'w_utilityserv', cat: 1,
    summary: "PFC's utility objects, with a tab for each group: strings (n_cst_string), numbers (n_cst_numerical), conversions (n_cst_conversion, n_cst_measureconversion, n_cst_pbunitconversion), colors (n_cst_color, n_cst_colorconv), the platform (n_cst_platform, n_cst_environment) and the collections (n_cst_list, n_cst_stack, n_cst_queue, n_cst_tree).",
    try: ['On each tab, change the input and click the button to see the results of the functions.'],
    objects: ['n_cst_string', 'n_cst_numerical', 'n_cst_conversion', 'n_cst_color', 'n_cst_platform', 'n_cst_environment', 'n_cst_list', 'n_cst_tree'] },

  // DataWindow Services
  { id: 6, title: "Drop-down Search Service", window: 'w_dropdownsearchdw', cat: 6,
    summary: 'The drop-down search service (n_cst_dwsrv_dropdownsearch) completes what the user types in a drop-down DataWindow column with the first matching value of its list.',
    try: ['Type the first letters of a value in the drop-down columns.'],
    objects: ['n_cst_dwsrv_dropdownsearch'] },
  { id: 7, title: "Find and Replace Service", window: 'w_findreplacedw', cat: 6,
    summary: 'The find service (n_cst_dwsrv_find) adds Find and Replace dialog boxes to a DataWindow.',
    try: ['Click Find, or Replace, and search the DataWindow.'],
    objects: ['n_cst_dwsrv_find'] },
  { id: 12, title: "Filter Service Dialogs", window: 'w_filterdialogs', cat: 6,
    summary: 'The filter service (n_cst_dwsrv_filter) shows one of three filter dialog boxes: PowerBuilder\'s, PFC\'s simple one (column, operator and value) or PFC\'s extended one, which builds an expression from the functions, columns, operators and values.',
    try: ['Choose a dialog style, click Set Filter, and filter the DataWindow; Reset Filter shows all the rows again.'],
    objects: ['n_cst_dwsrv_filter'] },
  { id: 13, title: "Sort Service", window: 'w_sort', cat: 6,
    summary: "The sort service (n_cst_dwsrv_sort) shows one of four sort dialog boxes, and can sort a DataWindow when the user clicks a column header.",
    try: ['Choose a dialog style (PowerBuilder\'s, drag and drop, drop-down list or a single column) and click Set Sort.', 'Check Sort by Clicking Column Headers, then click the headers.'],
    objects: ['n_cst_dwsrv_sort'] },
  { id: 14, title: "Multiple Table Update", window: 'w_multiupdate', cat: 6,
    summary: 'The multiple table update service (n_cst_dwsrv_multitable) updates several tables from one DataWindow: here one that joins customer, sales_order and sales_order_items, with a color for each table.',
    try: ['Retrieve, change values from each table, and click Update.'],
    objects: ['n_cst_dwsrv_multitable'] },
  { id: 15, title: "Print Preview Service", window: 'w_dwprintpreview', cat: 6,
    summary: 'The print preview service (n_cst_dwsrv_printpreview) previews a DataWindow as it will print, with a ruler and a zoom dialog box.',
    try: ['Click Print Preview, check Show Ruler, and click Set Zoom.'],
    objects: ['n_cst_dwsrv_printpreview'] },
  { id: 17, title: "Row Manager Service", window: 'w_rowmanager', cat: 6,
    summary: 'The row manager service (n_cst_dwsrv_rowmanager) adds, inserts and deletes rows, asks before deleting, and lets the user restore deleted rows.',
    try: ['Add a row at the end, insert one before the current row, and delete the current or the selected rows.', 'Check Allow Restore, delete some rows, and click Restore Rows to bring them back.'],
    objects: ['n_cst_dwsrv_rowmanager', 'w_restorerow'] },
  { id: 18, title: "Row Selection Service", window: 'w_rowselection', cat: 6,
    summary: 'The row selection service (n_cst_dwsrv_rowselection) highlights the rows the user clicks: one row at a time (single), each click adding a row (multi), or extended selection with Shift and Ctrl.',
    try: ['Choose Single Select, Multi-Select or Extended Select, and click the rows.', 'Click Invert to invert the selection.'],
    objects: ['n_cst_dwsrv_rowselection'] },
  { id: 19, title: "Required Columns Service", window: 'w_requiredfields', cat: 6,
    summary: 'The required columns service (n_cst_dwsrv_reqcolumn) leaves the check of required columns until the save, instead of when the user leaves a column, so the user can move about freely.',
    try: ['Delete some values in the editable columns, move to other columns, then save.'],
    objects: ['n_cst_dwsrv_reqcolumn'] },
  { id: 31, title: "Filter Service Settings", window: 'w_filtersettings', cat: 6,
    summary: 'The filter service can show only the visible columns in its dialog boxes, or leave out the columns you choose (of_SetVisibleOnly, of_SetExclude).',
    try: ['Check List Visible Columns, or select columns to exclude, then click Filter.'],
    objects: ['n_cst_dwsrv_filter'] },
  { id: 32, title: "Refresh Drop-down DataWindows", window: 'w_refreshdddws', cat: 6,
    summary: "The base DataWindow service's of_RefreshDDDWs retrieves a DataWindow's drop-down DataWindows again, so they show the data's changes.",
    try: ['Edit a state, click Update, then Refresh DDDWs: the city and state drop-down DataWindows below show the change.'],
    objects: ['n_cst_dwsrv'] },
  { id: 33, title: "Dynamic Filter Expressions", window: 'w_buildfilter', cat: 6,
    summary: "The base DataWindow service builds filter expressions around the data (of_BuildExpression): from a row and a column the user selects, or from a value.",
    try: ['Select a row, a column and an operator, and build the filter.', 'Type a value and build an expression around it.'],
    objects: ['n_cst_dwsrv'] },
  { id: 44, title: "Resize Freeform DataWindow", window: 'w_dwresizeff', cat: 6,
    summary: "The DataWindow resize service (n_cst_dwsrv_resize) moves and resizes a DataWindow's columns when the DataWindow is resized; here a freeform DataWindow.",
    try: ['Resize the window.'],
    objects: ['n_cst_dwsrv_resize'] },
  { id: 45, title: "Resize Grid DataWindow", window: 'w_dwresizegrid', cat: 6,
    summary: 'The DataWindow resize service with a grid DataWindow: the columns grow and shrink with the window.',
    try: ['Resize the window.'],
    objects: ['n_cst_dwsrv_resize'] },
  { id: 46, title: "DDDW Calculator and Calendar", window: 'w_ddcalsamp', cat: 6,
    summary: 'The drop-down calculator and calendar (u_calculator, u_calendar) for DataWindow columns, started with of_SetDropDownCalculator and of_SetDropDownCalendar.',
    try: ['Click the drop-down arrows of the number and date columns.'],
    objects: ['u_calculator', 'u_calendar'] },
  { id: 58, title: "Query Mode Service", window: 'w_querymode', cat: 6,
    summary: 'The query mode service (n_cst_dwsrv_querymode) lets users search a DataWindow by typing criteria in its columns, such as >S or CA; criteria on one line are combined with AND, and each line is an OR.  Queries can be saved and loaded.',
    try: ['Turn query mode on, type criteria, and retrieve.', 'In query mode, right-click a column for its operators and values; save the query and load it again.'],
    objects: ['n_cst_dwsrv_querymode'] },
  { id: 59, title: "Report Service", window: 'w_reportserv', cat: 6,
    summary: 'The report service (n_cst_dwsrv_report) changes a DataWindow at run time to make a report of it: it adds text, computed fields, lines and pictures, changes colors, fonts and borders, zooms and prints.  Each change can be undone.',
    try: ['Try the changes one at a time, and undo them.'],
    objects: ['n_cst_dwsrv_report'] },
  { id: 60, title: "Grid Service", window: 'w_gridserv', cat: 6,
    summary: 'The grid service (n_cst_dwsrv_grid) lets users choose which columns a grid DataWindow shows, in which order and how wide, in the Grid Layout dialog box.  The layout is saved for each user.',
    try: ['Click Grid Layout, or right-click the list, hide and move some columns, and close the window: the layout comes back the next time.'],
    objects: ['n_cst_dwsrv_grid', 'w_grid'] },
  { id: 61, title: "DataStore Services", window: 'w_dsserv', cat: 6,
    summary: "PFC's DataStore, n_ds, has services of its own, like u_dw's: the base service (n_cst_dssrv) reads values as they are displayed and builds expressions, and the report and print preview services (n_cst_dssrv_report, n_cst_dssrv_printpreview) change and print a DataStore that is never shown.",
    try: ['Try each button, and see the DataStore\'s data in the DataWindow that shares it.'],
    objects: ['n_ds', 'n_cst_dssrv', 'n_cst_dssrv_report', 'n_cst_dssrv_printpreview'] },

  // Linkage Services
  { id: 9, title: "Basic Retrieval Arguments", window: 'w_linkageretrieve', cat: 7,
    summary: "The retrieve style: when the master's row changes, the details are retrieved with the master row's values as retrieval arguments.",
    try: ['Scroll through the master DataWindow.'],
    objects: ['n_cst_dwsrv_linkage'] },
  { id: 10, title: "Basic Scrolling", window: 'w_linkagescroll', cat: 7,
    summary: 'The scroll style: all the rows are retrieved at once, and the details scroll to the rows of the master\'s current row.',
    try: ['Retrieve, then scroll through the master DataWindow.'],
    objects: ['n_cst_dwsrv_linkage'] },
  { id: 11, title: "Basic Filters", window: 'w_linkagefilter', cat: 7,
    summary: "The filter style: all the rows are retrieved at once, and the details are filtered to the rows of the master's current row.",
    try: ['Retrieve, then scroll through the master DataWindow; add and delete detail rows, and update.'],
    objects: ['n_cst_dwsrv_linkage', 'n_cst_dwsrv_rowmanager'] },
  { id: 28, title: "Across Tab Pages", window: 'w_tablink', cat: 7,
    summary: 'The three linkage styles in one window: a master linked to three details, on tab pages, each with a different style.',
    try: ['Retrieve, change the master row, and look at each tab page.'],
    objects: ['n_cst_dwsrv_linkage', 'u_tab'] },
  { id: 38, title: "Retrieval with Auto-updates", window: 'w_linkautoupdate', cat: 7,
    summary: 'The linkage service can save the details when the master row changes (of_SetUpdateOnRowChange), and ask first (of_SetConfirmOnRowChange).',
    try: ['Change a detail, then move to another master row.', 'Check Confirmation on Row Change, and open the SQL Spy to see the updates.'],
    objects: ['n_cst_dwsrv_linkage'] },
  { id: 39, title: "Filter with Cascading Keys", window: 'w_linkcascadekeys', cat: 7,
    summary: "When a master's key changes, the linkage service changes it in the details too (of_SetSyncOnKeyChange).",
    try: ['Change a key column (in bold) in the master, and see the details follow.'],
    objects: ['n_cst_dwsrv_linkage'] },
  { id: 41, title: "Filter with Cascading Deletes", window: 'w_linkcascadedeletes', cat: 7,
    summary: "Deleting a master row deletes its details too (of_SetDeleteStyle), and the update runs in the right order (of_SetUpdateStyle).",
    try: ['Delete a master row, and save.'],
    objects: ['n_cst_dwsrv_linkage'] },

  // TreeView and Listview
  { id: 49, title: "Basic Treeview", window: 'w_treeview6', cat: 27,
    summary: 'A TreeView with six levels, from sales regions down to the items of an order, each from its own DataWindow object (the level source service, n_cst_tvsrv_levelsource), linked to a DataWindow that shows the selected item.',
    try: ['Expand the levels, and select items to see them in the DataWindow; change one and save.'],
    objects: ['u_tvs', 'n_cst_tvsrv_levelsource'] },
  { id: 50, title: "Treeview Linked to a Listview", window: 'w_treeviewlistview6', cat: 27,
    summary: 'A TreeView linked to a ListView: the ListView (u_lvs, with its data source service) shows the items under the selected TreeView item.',
    try: ['Select items in the TreeView, and change the ListView\'s view.'],
    objects: ['u_tvs', 'u_lvs', 'n_cst_lvsrv_datasource'] },
  { id: 51, title: "Update a Treeview", window: 'w_treeviewupdate6', cat: 27,
    summary: 'The level source service updates the database from the TreeView: here employees are moved to another department by dragging them.',
    try: ['Drag an employee onto another department.'],
    objects: ['u_tvs', 'n_cst_tvsrv_levelsource'] },
  { id: 52, title: "Recursive Tree View", window: 'w_treeviewrecursive6', cat: 27,
    summary: 'A recursive level (of_SetRecursive) repeats under each of its items, as deep as the data goes, as folders do in Windows Explorer: here the employees are shown under their managers.',
    try: ['Expand an employee to see the people who report to them, or click Expand All.'],
    objects: ['u_tvs', 'n_cst_tvsrv_levelsource'] },
  { id: 53, title: "Basic Listview", window: 'w_listview6', cat: 27,
    summary: 'A ListView filled from a DataWindow object by its data source service, with report columns, pictures and sorting.',
    try: ['Change the view, and click a column header in the report view to sort.'],
    objects: ['u_lvs', 'n_cst_lvsrv_datasource'] },

  // Window Services
  { id: 1, title: "Save Process: All DW Scenarios", window: 'w_dw3types', cat: 34,
    summary: "The window save process (pfc_save, through n_cst_luw) with three kinds of DataWindows in one window: linked PFC DataWindows, an unlinked PFC DataWindow and a native PowerBuilder DataWindow.  The SQL Spy shows the updates.",
    try: ['Change data in each DataWindow and click Update.'],
    objects: ['w_master', 'n_cst_luw', 'n_cst_dwsrv_linkage'] },
  { id: 26, title: "Window Resize Service", window: 'w_resizefind', cat: 34,
    summary: "The window resize service (n_cst_resize) moves and resizes a window's controls when the window is resized, here in a window like Windows' Find dialog box, with a minimum size.",
    try: ['Resize the window.'],
    objects: ['n_cst_resize'] },
  { id: 27, title: "Status Bar", window: 'w_statusbarframe', cat: 34,
    summary: "The status bar service (n_cst_winsrv_statusbar) adds a status bar to a frame, with text, pictures, a progress bar, the time and the free memory.",
    try: ['Change the text and the pictures, and start the progress bar.'],
    objects: ['n_cst_winsrv_statusbar'] },
  { id: 30, title: "Resize Dynamic Tab Pages", window: 'w_tabresize', cat: 34,
    summary: 'The resize service on tab pages that are created when they are first selected.',
    try: ['Resize the window, and select the tab pages.'],
    objects: ['n_cst_resize', 'u_tab'] },
  { id: 47, title: "Weighted Resize of a Window", window: 'w_resizedwsyntax', cat: 34,
    summary: "Weighted resizing: the resize service shares a window's new size between its controls in the proportions you register.",
    try: ['Resize the window.'],
    objects: ['n_cst_resize'] },
  { id: 64, title: "Sheet Manager", window: 'w_sheetframe', cat: 34,
    summary: "The sheet manager (n_cst_winsrv_sheetmanager) arranges a frame's sheets (cascade, tile, layer, minimize all, undo arrange), and lists and finds them.  The frame also keeps its size, position and toolbars.",
    try: ['Arrange the sheets with the Window menu, open more with File > New, and list and find them on a sheet.'],
    objects: ['n_cst_winsrv_sheetmanager', 'w_frame'] },
  { id: 67, title: "Ribbon Bar", window: 'w_ribbonframe', cat: 34,
    summary: "A frame with a ribbon bar (u_rbb): w_frame lays out its client area under the ribbon bar, and again when u_rbb's of_SetHidePanelText or of_SetHideTabHeader changes the ribbon bar's height.",
    try: ['Open, close and arrange the sheets from the Home tab.', 'On the View tab, hide the panel text or the tab header.'],
    objects: ['u_rbb', 'w_frame'] },

  // Objects
  { id: 4, title: "Split Bar 3 Pane Style", window: 'w_splitbar3panestyle', cat: 44,
    summary: 'Split bars (u_st_splitbar) between three panes, one horizontal and one vertical, with the resize service.',
    try: ['Drag the split bars, and resize the window.'],
    objects: ['u_st_splitbar'] },
  { id: 29, title: "Split Bar Explorer Style", window: 'w_splitbarexplorerstyle', cat: 44,
    summary: "A split bar between two panes, as in Windows Explorer, with the resize service.",
    try: ['Drag the split bar, and resize the window.'],
    objects: ['u_st_splitbar'] },
  { id: 43, title: "Split Bar Settings", window: 'w_splitbarwin', cat: 44,
    summary: "Split bars on tab pages, and their settings: live resize (of_SetLiveResize), the bars' colors (of_SetBarColor, of_SetBarMoveColor) and the smallest size of a pane (of_SetMinObjectSize).",
    try: ['Drag the bars on both tab pages, then change the settings and drag them again.'],
    objects: ['u_st_splitbar'] },
  { id: 5, title: "Type Ahead in the DDLB & DDPLB", window: 'w_dropdownsearchlb', cat: 44,
    summary: "Type-ahead in PFC's drop-down list boxes (u_ddlb, u_ddplb): what the user types is completed with the first matching item.",
    try: ['Type the first letters of a US state.'],
    objects: ['u_ddlb', 'u_ddplb'] },
  { id: 8, title: "Find and Replace in a RTE", window: 'w_findreplacerte', cat: 44,
    summary: "The find service on PFC's Rich Text Edit control (u_rte).",
    try: ['Click Find, or Replace, and search the text.'],
    objects: ['u_rte'] },
  { id: 37, title: "Progress Bar Sampler", window: 'w_progbarsampler', cat: 44,
    summary: "PFC's progress bar (u_progressbar) in its different styles: fill styles and colors, the text it displays, fonts, and resetting automatically.",
    try: ['Click Start to run all the progress bars, and Stop.'],
    objects: ['u_progressbar'] },
  { id: 66, title: "Controls Gallery", window: 'w_controlgallery', cat: 44,
    summary: "PFC's newer visual controls, a tab each: the date picker and month calendar (u_dp, u_mc), the trackbars (u_htb, u_vtb), the web browser and picture hyperlink (u_wb, u_phl) and the OLE control (u_oc).",
    try: ['On each tab, use the controls; on the OLE Control tab, insert an object and right-click it.'],
    objects: ['u_dp', 'u_mc', 'u_htb', 'u_vtb', 'u_wb', 'u_phl', 'u_oc'] },
];
