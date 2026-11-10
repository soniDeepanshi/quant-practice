/* Focused BOI Manager – IT (Automation Testing), Scale II tracker.
   The notice has no topic-wise syllabus; this is role-focused preparation guidance. */
const BOI_TRACKER_KEY = 'boiTrackerProgressV2';
const BOI_TRACKER = [
  {area:'Automation Testing · reference image focus',confirmed:true,topics:[
    ['Core Java for Automation','OOP: classes, inheritance, polymorphism, abstraction and interfaces; strings and immutability','Collections and generics: List, Set, Map; iteration and common use cases','Exceptions, JVM stack vs heap, garbage collection; basic threads and synchronization','Lambdas and streams; annotations and common automation coding patterns'],
    ['Selenium WebDriver 4.x','WebDriver setup and architecture; CSS/XPath locators and dynamic elements','Explicit waits, synchronization, stale elements and common failures','Forms, dropdowns, alerts, frames, windows/tabs and Actions API','Selenium Grid 4 purpose, remote execution and parallel testing basics'],
    ['Test Runners & Frameworks','TestNG annotations, assertions, groups, DataProvider and listeners','Page Object Model, reusable components and test organization','Data-driven tests and Apache POI workbook/sheet/cell basics','Cucumber: Gherkin, feature files, step definitions, hooks and runners'],
    ['API Automation','HTTP methods, status codes, headers, parameters; REST and JSON basics','REST Assured Given-When-Then, request setup and response validation','JSONPath, schema checks, authentication and negative cases'],
    ['SQL & CI/CD','SELECT, filtering, aggregates, joins and database assertions with JDBC','Maven POM, dependencies, lifecycle and test plugins','Git basics and Jenkins pipeline stages, test reports and CI triggers']
  ]},
  {area:'Programming foundations',topics:[
    ['Programming essentials','C/C++/Python basics: types, control flow, functions, arrays and strings','Pointers and references; memory basics; debugging and edge cases','JavaScript essentials: variables, functions, objects and async basics']
  ]},
  {area:'Data structures & algorithms',topics:[
    ['Core structures','Arrays and strings; searching and sorting; Big O time/space basics','Linked lists, stacks and queues; common operations and use cases','Hash maps/sets, trees and graphs: core vocabulary, traversal basics']
  ]},
  {area:'DBMS & databases',topics:[
    ['Relational foundations','Keys, ER model, constraints and normalization through 3NF','SQL joins, subqueries, grouping, NULL handling and indexes','Transactions, ACID, isolation, concurrency and recovery basics']
  ]},
  {area:'Operating systems',topics:[
    ['OS essentials','Processes vs threads, states, context switch and synchronization','CPU scheduling; deadlocks and their four conditions','Paging, virtual memory, page faults and file-system basics']
  ]},
  {area:'Computer networks',topics:[
    ['Networking essentials','OSI/TCP-IP layers; IP, MAC, DNS, DHCP and subnetting concepts','TCP vs UDP, ports, HTTP/HTTPS, TLS and common protocols','Routing, firewalls, proxies, latency and basic troubleshooting']
  ]},
  {area:'Software engineering & testing',topics:[
    ['Development and quality','SDLC, Agile/Scrum roles and ceremonies; requirements and change control','Testing levels/types, test cases, defect lifecycle and traceability','Black-box techniques: equivalence, boundary, decision tables and state transitions','Regression, smoke, integration, API, performance and exploratory testing; test pyramid']
  ]},
  {area:'Web technologies',topics:[
    ['Web essentials','HTML forms/DOM and CSS layout basics; browser events and storage','Client-server, HTTP, cookies/sessions, JSON and REST','CORS, caching and browser security basics']
  ]},
  {area:'Computer architecture',topics:[
    ['Architecture essentials','Binary/hex, signed numbers and two’s complement','CPU, ALU, registers, instruction cycle and interrupts','Cache, RAM, storage and memory hierarchy; pipelining basics']
  ]},
  {area:'Cybersecurity',topics:[
    ['Security essentials','CIA triad, least privilege, authentication vs authorization and MFA','Encryption vs hashing, digital signatures and certificates','SQL injection, XSS, phishing and credential attacks; secure testing basics']
  ]},
  {area:'Cloud, DevOps & delivery',topics:[
    ['Delivery essentials','IaaS/PaaS/SaaS, regions/zones and shared responsibility','Git workflow, CI/CD stages, build artifacts and rollback','Docker/container basics; monitoring, logs, secrets and deployment health']
  ]},
  {area:'Banking IT & digital payments',topics:[
    ['Banking systems','Core banking and channel integrations: branch, ATM, internet/mobile','NEFT, RTGS, IMPS and UPI purpose; settlement/reconciliation basics','Payment test cases: balances, limits, reversals, duplicate requests and audit trail','Availability, access control, fraud controls, backup and disaster recovery basics']
  ]}
];
const BOI_15_DAY_PLAN = [
  ['Day 1','Core Java: OOP, strings, collections and exceptions'],
  ['Day 2','Selenium: locators, waits and dynamic elements'],
  ['Day 3','Selenium: interactions, windows, Grid; TestNG basics'],
  ['Day 4','Frameworks: POM, data-driven tests, Apache POI and Cucumber'],
  ['Day 5','API automation: HTTP, REST Assured, JSONPath and validation'],
  ['Day 6','SQL/JDBC, joins, DBMS keys and normalization'],
  ['Day 7','DBMS transactions, indexes; DSA arrays, strings and complexity'],
  ['Day 8','DSA linked lists, stacks, queues, hashing and trees'],
  ['Day 9','Operating systems: processes, scheduling, deadlocks and memory'],
  ['Day 10','Networks: layers, IP/DNS, TCP/UDP, HTTP and TLS'],
  ['Day 11','Software engineering, testing techniques and web essentials'],
  ['Day 12','Cybersecurity and computer architecture essentials'],
  ['Day 13','Maven, Git, Jenkins, CI/CD, cloud and containers'],
  ['Day 14','Banking IT/payments; revise weak automation and CS topics'],
  ['Day 15','Full Professional Knowledge mock; review errors and key notes']
];
function boiReadProgress(){try{const value=JSON.parse(localStorage.getItem(BOI_TRACKER_KEY)||'{}');return value&&typeof value==='object'?value:{}}catch{return {}}}
function boiAllLeaves(){return BOI_TRACKER.flatMap((area,ai)=>area.topics.flatMap((topic,ti)=>topic.slice(1).flatMap((text,li)=>text.split(';').map((label,si)=>({id:`${ai}.${ti}.${li}.${si}`,area:area.area,topic:topic[0],label:label.trim()})))))}
function renderBoiTracker(){const host=document.getElementById('boiTrackerContent');if(!host)return;const openAreas=new Set([...host.querySelectorAll('.boi-area[open]')].map(el=>el.dataset.boiArea)),openTopics=new Set([...host.querySelectorAll('.boi-topic[open]')].map(el=>el.dataset.boiTopic));const progress=boiReadProgress(),leaves=boiAllLeaves(),completed=leaves.filter(item=>progress[item.id]?.done).length;document.getElementById('boiOverallCount').textContent=`${completed} of ${leaves.length} complete`;document.getElementById('boiOverallBar').style.width=`${completed/leaves.length*100}%`;
 const plan=document.getElementById('boiStudyPlan');if(plan&&!plan.children.length)plan.innerHTML=BOI_15_DAY_PLAN.map(([day,focus])=>`<li><strong>${day}</strong><span>${focus}</span></li>`).join('');
 host.innerHTML=BOI_TRACKER.map((area,ai)=>{const areaLeaves=leaves.filter(x=>x.area===area.area),areaDone=areaLeaves.filter(x=>progress[x.id]?.done).length;return `<details class="boi-area" data-boi-area="${ai}" ${openAreas.size?openAreas.has(String(ai))?'open':'':ai===0?'open':''}><summary><span><strong>${area.area}</strong>${area.confirmed?'<em class="boi-confirmed">From your image</em>':'<em class="boi-inferred">Core preparation</em>'}</span><small>${areaDone} / ${areaLeaves.length}</small></summary><div class="boi-area-body">${area.topics.map((topic,ti)=>{const start=leaves.filter(x=>x.area===area.area&&x.topic===topic[0]);const nDone=start.filter(x=>progress[x.id]?.done).length;return `<details class="boi-topic" data-boi-topic="${ai}.${ti}" ${openTopics.has(`${ai}.${ti}`)?'open':''}><summary><span>${topic[0]}</span><small>${nDone} / ${start.length}</small></summary><div class="boi-leaves">${start.map(item=>`<label class="boi-leaf"><input type="checkbox" data-boi-leaf="${item.id}" ${progress[item.id]?.done?'checked':''}><span>${item.label}</span></label>`).join('')}</div></details>`}).join('')}</div></details>`}).join('')}
document.addEventListener('change',event=>{const input=event.target.closest('[data-boi-leaf]');if(!input)return;const progress=boiReadProgress();progress[input.dataset.boiLeaf]={done:input.checked,updatedAt:Date.now()};localStorage.setItem(BOI_TRACKER_KEY,JSON.stringify(progress));renderBoiTracker()});
window.renderBoiTracker=renderBoiTracker;
renderBoiTracker();
