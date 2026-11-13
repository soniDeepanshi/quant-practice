/* Separate detailed BOI syllabus tracker. Progress is isolated from all existing app trackers. */
(() => {
  const KEY = 'finalBoiSyllabusProgressV1';
  const statuses = ['Not started', 'Learning', 'Practising', 'Revision required', 'Completed'];
  const sections = [
    ['Priority 1 — Core Java', [
      ['Java fundamentals', 'Java features and platform independence|JDK, JRE and JVM|Compilation and execution process|Primitive and non-primitive data types|Variables, scope and type casting|Operators and expressions|Conditional statements and loops|Arrays and multidimensional arrays|Methods, parameters, return types and overloading|Static and instance members|Constructors and constructor overloading|Packages and access modifiers'],
      ['Object-oriented programming', 'Classes and objects|Encapsulation|Inheritance and its types|Polymorphism|Overloading vs overriding|Abstraction|Abstract classes vs interfaces|this and super|Association, aggregation and composition|Compile-time vs runtime polymorphism'],
      ['Strings and arrays', 'String, StringBuilder and StringBuffer|String immutability and pool|Common String methods|Array traversal and manipulation|Sorting and searching arrays|Duplicates and frequency counting|Common Java string and array coding problems'],
      ['Collections framework', 'Collection hierarchy|List, Set, Queue and Map|ArrayList vs LinkedList|HashSet vs TreeSet|HashMap vs Hashtable|HashMap internals and hashing|Iterator and ListIterator|Comparable vs Comparator|Generics|Fail-fast vs fail-safe iterators'],
      ['Exception handling', 'Checked vs unchecked exceptions|try, catch and finally|throw vs throws|Multiple catch blocks|Custom exceptions|Exception propagation|Common automation exceptions'],
      ['Advanced Core Java', 'JVM architecture|Stack vs heap|Garbage collection and object lifecycle|Multithreading fundamentals|Thread lifecycle and synchronization|Runnable vs Thread|Lambda expressions|Functional interfaces|Streams API basics|Annotations|Serialization basics']
    ]],
    ['Priority 2 — Selenium WebDriver', [
      ['Selenium fundamentals', 'Selenium components and architecture|WebDriver architecture and interface|Browser drivers|Selenium 3 vs Selenium 4|WebDriver setup and configuration|Browser launch and termination'],
      ['Locators', 'ID, name and class name|Tag name, link text and partial link text|XPath: absolute vs relative|XPath axes|XPath text(), contains() and starts-with()|CSS selectors|CSS vs XPath|Dynamic elements and locators|Multiple matching elements'],
      ['WebDriver methods', 'get(), getTitle() and getCurrentUrl()|findElement() vs findElements()|click(), sendKeys() and clear()|getText() and getAttribute()|isDisplayed(), isEnabled() and isSelected()|close() vs quit()|Navigation methods'],
      ['Waits and synchronisation', 'Implicit, explicit and fluent waits|ExpectedConditions and polling interval|TimeoutException|StaleElementReferenceException|NoSuchElementException|ElementNotInteractableException|Synchronisation problems and solutions|Why Thread.sleep is discouraged'],
      ['Browser interactions', 'Select dropdowns|Checkboxes and radio buttons|Alerts and pop-ups|Frames and iframes|Multiple windows and tabs|File upload and download|Screenshots|JavaScriptExecutor|Actions class|Mouse hover, drag/drop, right/double click|Keyboard actions'],
      ['Selenium Grid 4', 'Grid architecture|Hub and Node concepts|Standalone mode|Distributed execution|RemoteWebDriver|Parallel browser execution|Grid configuration'],
      ['Selenium advanced concepts', 'Dynamic web elements|Shadow DOM|AJAX elements|Browser compatibility|Headless execution|WebDriver exceptions|Selenium troubleshooting']
    ]],
    ['Priority 3 — TestNG', [
      ['TestNG fundamentals', 'TestNG purpose and TestNG vs JUnit|Installation and configuration|testng.xml|Test classes and test methods'],
      ['Annotations', '@Test|@BeforeSuite and @AfterSuite|@BeforeTest and @AfterTest|@BeforeClass and @AfterClass|@BeforeMethod and @AfterMethod|@BeforeGroups and @AfterGroups|Annotation execution order'],
      ['Test execution', 'Priority and dependencies|Enabled and disabled tests|Groups, include and exclude|Invocation count and timeout|Expected exceptions|Hard and soft assertions|Parameterisation and DataProvider|Parallel execution|Listeners and retry analyser|Test reports']
    ]],
    ['Priority 4 — Maven', [
      ['Maven fundamentals', 'Maven purpose and Maven vs Gradle|Project structure and convention over configuration|Installation|Common Maven commands'],
      ['POM and dependencies', 'pom.xml|Group ID, Artifact ID and Version|Dependencies and scopes|Transitive dependencies|Dependency conflicts and exclusions|Repositories|Plugins'],
      ['Build lifecycle', 'Validate, compile, test, package, verify, install and deploy|Goals vs phases|Maven Surefire plugin|Running TestNG with Maven|Build troubleshooting']
    ]],
    ['Priority 5 — API Testing and Postman', [
      ['API fundamentals', 'Client-server and REST architecture|REST vs SOAP|HTTP vs HTTPS|Endpoints, requests and responses|Headers and body|Path and query parameters|Authentication and authorisation|Statelessness'],
      ['HTTP methods', 'GET|POST|PUT|PATCH|DELETE|OPTIONS and HEAD|Idempotency|Safe methods|CRUD mapping'],
      ['HTTP status codes', '1xx, 2xx, 3xx, 4xx and 5xx|200, 201, 202, 204|301, 302, 304|400, 401, 403, 404, 405, 409, 415, 422, 429|500, 501, 502, 503, 504'],
      ['JSON and API validation', 'JSON syntax, objects, arrays and nested values|Data types and parsing|Schema validation|Response, status, header and response-time validation|Negative and boundary testing|Authentication testing'],
      ['Postman', 'Collections and requests|Environments and variable scopes|Pre-request scripts and Tests tab|JavaScript assertions|Collection runner|CSV and JSON data-driven tests|Newman basics|Import and export|Chaining requests|Token handling and API workflows'],
      ['API security and advanced testing', 'Basic auth, bearer tokens and API keys|OAuth 2.0 fundamentals|JWT structure|Rate limiting and CORS|Input validation|SQL injection and API security basics|Contract testing|Mocking and stubbing|API integration testing']
    ]],
    ['Priority 6 — SQL and Database Testing', [
      ['Database fundamentals', 'DBMS vs RDBMS|Tables, rows and columns|Primary, foreign, candidate, composite and unique keys|Constraints and relationships|Referential integrity'],
      ['SQL commands', 'DDL: CREATE, ALTER, DROP, TRUNCATE|DML: INSERT, UPDATE, DELETE|DQL: SELECT|DCL: GRANT, REVOKE|TCL: COMMIT, ROLLBACK, SAVEPOINT'],
      ['Query writing', 'SELECT and DISTINCT|WHERE and ORDER BY|GROUP BY and HAVING|COUNT, SUM, AVG, MIN and MAX|LIKE, IN and BETWEEN|NULL handling|CASE statements and aliases'],
      ['Joins and advanced SQL', 'INNER, LEFT, RIGHT, FULL OUTER, CROSS and SELF JOIN|UNION vs UNION ALL|Subqueries and correlated subqueries|EXISTS and NOT EXISTS|CTE basics|Views and indexes|Stored procedures and triggers basics'],
      ['Database testing', 'CRUD validation|Data integrity and consistency|Referential integrity|Backend validation after API calls|Transactions, ACID, commit and rollback|Duplicate and NULL values|Database test scenarios']
    ]],
    ['Priority 7 — SDLC, STLC and Software Testing', [
      ['SDLC', 'Requirements and feasibility|Design, development, testing, deployment and maintenance|Waterfall and V-model|Iterative and incremental|Spiral|Agile, Scrum and Kanban'],
      ['STLC', 'Requirement analysis|Test planning|Test case design|Test environment setup|Test execution|Defect reporting|Test closure|Entry and exit criteria'],
      ['Testing fundamentals', 'Verification vs validation|Static vs dynamic|Manual vs automation|Black-box, white-box and grey-box|Functional vs non-functional|Positive vs negative|Smoke and sanity|Regression and retesting|Integration, system and acceptance|Alpha and beta'],
      ['Test design techniques', 'Equivalence partitioning|Boundary value analysis|Decision tables|State transitions|Use-case testing|Error guessing|Exploratory testing|Pairwise testing basics'],
      ['Defect management', 'Defect lifecycle|Severity vs priority|Bug reporting|Root cause analysis|Defect leakage and density|Defect prevention|Retesting vs regression'],
      ['Automation testing concepts', 'What to automate and what not to automate|Automation feasibility and ROI|Test automation pyramid|Test suite design|Test data management|Flaky tests|Maintainability and reusability|Parallel execution|Continuous testing']
    ]],
    ['Priority 8 — Web Application Testing', [
      ['Web fundamentals', 'Client-server architecture|Browser architecture basics|HTTP request and response|Cookies, sessions and cache|DOM|HTML, CSS and JavaScript basics|localStorage and sessionStorage'],
      ['Web application testing', 'Functional and UI testing|Navigation and form validation|Input validation|Cross-browser and responsive testing|Compatibility|Session management|Authentication and authorisation|Error handling|File upload and download|Security and performance basics|Accessibility basics'],
      ['HTML5', 'Document structure|Elements and attributes|Headings, paragraphs and links|Lists and tables|Forms, input types, labels and validation|Semantic elements|Audio and video|DOM structure|Attributes used in Selenium locators'],
      ['JavaScript', 'var, let and const|Data types and operators|Conditions and loops|Functions|Arrays and objects|String and array methods|DOM manipulation and events|JSON|Promises and async basics|JavaScriptExecutor in Selenium']
    ]],
    ['Priority 9 — Mobile Application Testing', [
      ['Mobile fundamentals', 'Native, hybrid and mobile web applications|Android and iOS basics|Mobile application architecture|APK and IPA basics'],
      ['Mobile testing types', 'Functional testing|Install and uninstall|Compatibility and device fragmentation|Screen resolution and orientation|Network testing|Interrupt testing|Battery and resource testing|Permissions and push notifications|Background and foreground|Upgrade and usability testing'],
      ['Mobile automation concepts', 'Appium fundamentals and architecture|Appium vs Selenium|Desired capabilities|Emulators and real devices|UIAutomator and XCUITest basics|Mobile locators and gestures|Swipe, tap and long press|App lifecycle|Hybrid context switching|Mobile automation framework concepts']
    ]],
    ['Priority 10 — Automation Framework Design', [
      ['Framework architecture', 'Linear, modular, data-driven, keyword-driven and hybrid frameworks|Behaviour-driven development|Page Object Model and Page Factory|Repository pattern basics'],
      ['Framework components', 'Driver and configuration management|Test data management|Page, utility and base test classes|Logging and reporting|Screenshot capture|Exception handling|Reusable functions and assertions|Test execution management'],
      ['Build and execution', 'Maven, TestNG and Selenium integration|Configuration and properties files|External test data|Parallel and cross-browser execution|Reports and logging frameworks|Framework debugging'],
      ['BDD', 'BDD fundamentals and Gherkin|Feature files and Given/When/Then|Scenarios and Scenario Outline|Step definitions and hooks|Data tables and Background|Cucumber with Selenium and TestNG']
    ]],
    ['Priority 11 — Git, CI/CD and Testing Integration', [
      ['Git and collaboration', 'Repository, commit, branch and merge|Clone, pull, push and fetch|Merge conflicts|GitHub and GitLab basics'],
      ['CI/CD and test integration', 'Continuous Integration|Continuous Delivery and Deployment|Jenkins fundamentals|GitLab CI basics|Pipeline stages and triggers|Automated test execution|Pipeline reports|Failure analysis']
    ]],
    ['Priority 12 — Additional Supporting Technical Knowledge', [
      ['Networking', 'TCP/IP, DNS, IP and ports|HTTP, HTTPS and SSL/TLS'],
      ['Operating systems', 'Processes and threads|Memory and scheduling|Deadlocks'],
      ['DBMS theory', 'Normalisation|Transactions|Indexing|ACID'],
      ['Software engineering', 'Requirements|Design and architecture|Quality'],
      ['Security basics', 'Authentication and authorisation|Encryption|Common vulnerabilities'],
      ['Performance testing', 'Load, stress, spike and endurance testing|Response time and throughput']
    ]]
  ];
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } };
  const all = sections.flatMap(([section, groups], si) => groups.flatMap(([group, items], gi) => items.split('|').map((label, ii) => ({ id: `${si}.${gi}.${ii}`, section, group, label }))));
  const host = () => document.getElementById('finalBoiContent');
  function render() {
    if (!host()) return;
    const progress = read();
    const complete = all.filter(x => progress[x.id]?.status === 'Completed').length;
    document.getElementById('finalBoiOverall').textContent = `${complete} of ${all.length} subtopics completed`;
    document.getElementById('finalBoiBar').style.width = `${Math.round(complete / all.length * 100)}%`;
    host().innerHTML = sections.map(([section, groups], si) => {
      const sectionItems = all.filter(x => x.section === section);
      const done = sectionItems.filter(x => progress[x.id]?.status === 'Completed').length;
      return `<details class="boi-area final-boi-area" ${si === 0 ? 'open' : ''}><summary><span><strong>${section}</strong><em class="boi-inferred">Preparation syllabus</em></span><small>${done} / ${sectionItems.length} complete</small></summary><div class="boi-area-body">${groups.map(([group]) => {
        const items = sectionItems.filter(x => x.group === group);
        const groupDone = items.filter(x => progress[x.id]?.status === 'Completed').length;
        return `<details class="boi-topic" open><summary><span>${group}</span><small>${groupDone} / ${items.length}</small></summary><div class="final-boi-items">${items.map(item => `<label class="final-boi-item"><span>${item.label}</span><select aria-label="Status for ${item.label.replaceAll('"', '&quot;')}" data-final-boi="${item.id}">${statuses.map(status => `<option${(progress[item.id]?.status || statuses[0]) === status ? ' selected' : ''}>${status}</option>`).join('')}</select></label>`).join('')}</div></details>`;
      }).join('')}</div></details>`;
    }).join('');
  }
  document.addEventListener('change', event => {
    const control = event.target.closest('[data-final-boi]');
    if (!control) return;
    const progress = read();
    progress[control.dataset.finalBoi] = { status: control.value, updatedAt: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(progress));
    render();
  });
  window.renderFinalBoiTracker = render;
  render();
})();
