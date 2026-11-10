/* BOI Manager – IT (Automation Testing), Scale II preparation tracker.
   Topic coverage is preparation guidance, not an official topic-wise syllabus. */
const BOI_TRACKER_KEY = 'boiTrackerProgress';
const BOI_TRACKER = [
  {area:'Automation Testing · image focus areas',confirmed:true,topics:[
    ['Core Java for Automation','Java syntax, types, operators; control flow; methods, overloading, varargs','Classes, objects, constructors; encapsulation, inheritance, polymorphism, abstraction; interfaces, abstract classes','Strings, StringBuilder, immutability; arrays; collections: List, Set, Map, Queue; generics','Checked/unchecked exceptions; try-with-resources; custom exceptions; JVM memory, stack vs heap, garbage collection','Threads, synchronization, executors, futures; lambdas, streams, Optional; annotations, reflection'],
    ['Selenium WebDriver 4.x','WebDriver architecture, W3C protocol, browser drivers; setup and browser options','Locators: id, name, CSS, XPath; relative locators; robust and dynamic element strategies','Waits: implicit, explicit, fluent; polling, ignored exceptions; stale elements and synchronization','WebElement interactions, dropdowns, alerts, frames, windows and tabs; screenshots, actions API, JavaScript executor','Selenium Grid 4: hub/node model, sessions, slots, Docker, parallel runs; remote WebDriver; common failures'],
    ['Test Runners & Frameworks','TestNG annotations, lifecycle, priorities, dependencies, groups, assertions','Parameters, DataProvider, listeners, retries, parallel execution, reports','Page Object Model, Page Factory tradeoffs, component objects, reusable utilities','Data-driven testing; Apache POI workbook/sheet/row/cell read and write; test data design','Cucumber, Gherkin feature files, scenarios, outlines, step definitions, hooks, tags, runners'],
    ['API Automation','HTTP request/response, methods, headers, query/path parameters, status codes','REST principles, resource design, CRUD, idempotency, content negotiation, authentication','REST Assured Given-When-Then; request/response specifications; serialization and deserialization','JSON and JSONPath; nested values, arrays, schema validation; response assertions','Negative testing, boundary cases, chaining, tokens, cookies, logging, test data and environment config'],
    ['SQL & CI/CD','Database assertions; JDBC connection, prepared statements, result sets, cleanup','SQL SELECT, filtering, sorting, aggregates, GROUP BY, HAVING, NULL handling','Joins: inner/outer/self/cross; subqueries, CTEs, set operators; DML and DDL','Maven POM, dependency scopes, plugins, profiles, lifecycle and Surefire/Failsafe','Git workflow; Jenkins jobs and declarative pipelines; stages, agents, artifacts, reports, secrets and CI triggers']
  ]},
  {area:'Programming foundations',topics:[
    ['C and C++','Types, operators, branching, loops, functions, recursion','Pointers, arrays, strings, structures, unions, dynamic memory','Classes, constructors, inheritance, polymorphism, templates, STL basics'],
    ['Python','Core syntax, collections, functions, modules, exceptions','Comprehensions, iterators, generators, decorators, context managers','OOP, packages, virtual environments, file and JSON handling'],
    ['JavaScript and general programming','Variables, scope, types, coercion, operators, control flow','Functions, closures, arrays, objects, prototypes, modules','Promises, async/await, event loop; debugging, complexity and clean code']
  ]},
  {area:'Data structures & algorithms',topics:[
    ['Complexity and problem solving','Big O, time and space; best, average, worst case','Recursion, iteration, invariants, edge cases','Searching: linear, binary; hashing and collision basics'],
    ['Linear structures','Arrays, strings, two pointers, sliding window','Linked lists: singly, doubly, cycle detection','Stacks, queues, deque, circular queue; applications'],
    ['Trees, graphs and algorithms','Trees, BST, traversals, heap, priority queue, trie basics','Graphs: representations, BFS, DFS, cycles, shortest path basics','Sorting, stable sorts, merge/quick sort; greedy and dynamic programming fundamentals']
  ]},
  {area:'DBMS & database systems',topics:[
    ['Relational model','Relations, tuples, attributes, keys: primary, candidate, foreign, composite','ER diagrams, entities, relationships, cardinality, mapping','Relational algebra, constraints, referential integrity'],
    ['Design and transactions','Functional dependencies, 1NF, 2NF, 3NF, BCNF; normalization tradeoffs','ACID, transaction states, schedules, serializability','Concurrency control, locks, deadlocks, isolation levels, anomalies, recovery'],
    ['Storage and database types','Indexes: B-tree/B+ tree, clustered vs nonclustered, selectivity','Views, procedures, triggers, query plans and optimization','Relational vs NoSQL; document, key-value, column-family and graph databases']
  ]},
  {area:'Operating systems',topics:[
    ['Processes and threads','Process states, PCB, context switch, system calls','Threads, user vs kernel threads, concurrency and synchronization','IPC: pipes, shared memory, message queues, sockets'],
    ['Scheduling and deadlocks','FCFS, SJF, priority, round robin; metrics and tradeoffs','Critical sections, mutexes, semaphores, monitors, race conditions','Deadlock conditions, prevention, avoidance, detection and recovery'],
    ['Memory and files','Paging, segmentation, virtual memory, page faults, replacement','Allocation, fragmentation, swapping, thrashing','File systems, directories, permissions, disk scheduling and I/O']
  ]},
  {area:'Computer networks',topics:[
    ['Models and addressing','OSI and TCP/IP layers; encapsulation and devices','IPv4/IPv6, subnetting, MAC, ARP, ICMP, routing basics','TCP vs UDP, ports, handshake, flow and congestion control'],
    ['Protocols and services','DNS, DHCP, NAT, HTTP/HTTPS, TLS, SSH, FTP/SFTP','Email protocols: SMTP, IMAP, POP3; proxies and load balancers','Sockets, REST communication, WebSocket basics, status and error handling'],
    ['Network security and operations','Firewalls, VPNs, segmentation, IDS/IPS','Latency, bandwidth, packet loss, throughput, QoS','Troubleshooting with logs, ping/traceroute concepts, certificates']
  ]},
  {area:'Software engineering & testing',topics:[
    ['Development lifecycle','SDLC models: waterfall, iterative, spiral, Agile','Requirements, traceability, design, implementation, maintenance','Estimation, risk, configuration and change management'],
    ['Testing foundations','Verification vs validation; QA vs QC; test levels and types','Test plan, scenarios, cases, data, traceability, defect lifecycle','Black-box and white-box techniques; equivalence, boundary, decision table, state transition'],
    ['Modern delivery and quality','Agile/Scrum roles, events, artifacts; Kanban basics','Unit, integration, system, acceptance, regression, smoke, sanity, exploratory','Performance, reliability, usability, accessibility; test pyramid, mocks and stubs']
  ]},
  {area:'Web technologies',topics:[
    ['HTML and browser platform','HTML document structure, semantic elements, forms and validation','DOM, events, selectors, browser storage, cookies and sessions','Accessibility basics, client/server rendering, browser security boundaries'],
    ['CSS and frontend','Selectors, box model, layout, flexbox, grid, responsive design','Specificity, cascade, media queries, pseudo classes','Frontend testing concepts, cross-browser behavior, viewport and rendering'],
    ['Web application concepts','Client-server architecture, URLs, query strings, MIME types','HTTP methods, headers, cookies, caching, CORS','JSON, XML, REST, authentication sessions and tokens']
  ]},
  {area:'Computer architecture',topics:[
    ['Digital representation','Binary, decimal, octal, hexadecimal conversions','Signed numbers, two’s complement, overflow, fixed/floating point basics','Boolean algebra, logic gates, combinational and sequential circuits'],
    ['Processor and memory','CPU components, ALU, control unit, registers, instruction cycle','Cache levels, locality, RAM, ROM, secondary storage','Memory hierarchy, virtual address translation, buses and I/O'],
    ['Performance and organization','Instruction sets, pipelining, hazards, interrupts','RISC vs CISC; multiprocessor and multicore basics','Clock rate, CPI, throughput, bottlenecks and performance measures']
  ]},
  {area:'Cybersecurity',topics:[
    ['Security principles','Confidentiality, integrity, availability; least privilege, defense in depth','Threat, vulnerability, exploit, risk, attack surface','Security policies, access control, audit and incident response'],
    ['Cryptography and identity','Symmetric and asymmetric encryption; key exchange','Hashing, salting, digital signatures, certificates, PKI','Authentication vs authorization; MFA, OAuth concepts, RBAC, session security'],
    ['Common attacks and safeguards','SQL injection, XSS, CSRF, SSRF, command injection','Phishing, malware, ransomware, brute force, credential stuffing','Secure coding, input validation, patching, encryption at rest/in transit, backups']
  ]},
  {area:'Cloud, DevOps & delivery',topics:[
    ['Cloud foundations','IaaS, PaaS, SaaS; public, private, hybrid cloud','Regions, availability zones, elasticity, scalability, shared responsibility','Compute, storage, networking, managed databases, identity basics'],
    ['Containers and orchestration','Images, containers, registries, volumes, networks; Dockerfile','Kubernetes pods, deployments, services, config maps, secrets, probes','Virtual machines vs containers; health, scaling and deployment strategies'],
    ['DevOps and CI/CD','Git branching, merge/rebase, pull requests, tags and conflict resolution','Continuous integration, delivery and deployment; pipeline gates','Build artifacts, environment promotion, observability, rollback, secrets management']
  ]},
  {area:'Banking IT & digital payments',topics:[
    ['Banking systems','Core banking system concepts, branches, centralized processing','CBS integration, channels, ATM, internet and mobile banking','Payment rails: NEFT, RTGS, IMPS, UPI; settlement and reconciliation concepts'],
    ['Payment security and operations','Card lifecycle, POS, tokenization, authentication and fraud controls','Availability, resilience, backup, disaster recovery, RTO/RPO','Audit trails, maker-checker, access control, logging and change management'],
    ['Financial technology context','NPCI and payment ecosystem roles; clearing and settlement','Digital onboarding, KYC concepts, customer data protection','Banking application testing: balances, transfers, limits, reversals, idempotency and audit']
  ]}
];

function boiReadProgress(){try{const value=JSON.parse(localStorage.getItem(BOI_TRACKER_KEY)||'{}');return value&&typeof value==='object'?value:{}}catch{return {}}}
function boiAllLeaves(){return BOI_TRACKER.flatMap((area,ai)=>area.topics.flatMap((topic,ti)=>topic.slice(1).flatMap((text,li)=>text.split(';').map((label,si)=>({id:`${ai}.${ti}.${li}.${si}`,area:area.area,topic:topic[0],label:label.trim()})))))}
function renderBoiTracker(){const host=document.getElementById('boiTrackerContent');if(!host)return;const openAreas=new Set([...host.querySelectorAll('.boi-area[open]')].map(el=>el.dataset.boiArea)),openTopics=new Set([...host.querySelectorAll('.boi-topic[open]')].map(el=>el.dataset.boiTopic));const progress=boiReadProgress(),leaves=boiAllLeaves(),completed=leaves.filter(item=>progress[item.id]?.done).length;document.getElementById('boiOverallCount').textContent=`${completed} of ${leaves.length} complete`;document.getElementById('boiOverallBar').style.width=`${completed/leaves.length*100}%`;
 host.innerHTML=BOI_TRACKER.map((area,ai)=>{const areaLeaves=leaves.filter(x=>x.area===area.area),areaDone=areaLeaves.filter(x=>progress[x.id]?.done).length;return `<details class="boi-area" data-boi-area="${ai}" ${openAreas.size?openAreas.has(String(ai))?'open':'':ai===0?'open':''}><summary><span><strong>${area.area}</strong>${area.confirmed?'<em class="boi-confirmed">Image focus areas</em>':'<em class="boi-inferred">Preparation coverage</em>'}</span><small>${areaDone} / ${areaLeaves.length}</small></summary><div class="boi-area-body">${area.topics.map((topic,ti)=>{const start=leaves.filter(x=>x.area===area.area&&x.topic===topic[0]);const nDone=start.filter(x=>progress[x.id]?.done).length;return `<details class="boi-topic" data-boi-topic="${ai}.${ti}" ${openTopics.has(`${ai}.${ti}`)?'open':''}><summary><span>${topic[0]}</span><small>${nDone} / ${start.length}</small></summary><div class="boi-leaves">${start.map(item=>`<label class="boi-leaf"><input type="checkbox" data-boi-leaf="${item.id}" ${progress[item.id]?.done?'checked':''}><span>${item.label}</span></label>`).join('')}</div></details>`}).join('')}</div></details>`}).join('');}
document.addEventListener('change',event=>{const input=event.target.closest('[data-boi-leaf]');if(!input)return;const progress=boiReadProgress();progress[input.dataset.boiLeaf]={done:input.checked,updatedAt:Date.now()};localStorage.setItem(BOI_TRACKER_KEY,JSON.stringify(progress));renderBoiTracker()});
window.renderBoiTracker=renderBoiTracker;
renderBoiTracker();
