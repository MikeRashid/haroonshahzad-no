// Shared by index.html (English) and no.html (Norwegian).
const isNorwegian = document.documentElement.lang === "no";

const copy = isNorwegian
  ? {
      statusFallback: "haroonshahzad.no · i drift",
      live: "i drift",
      started: "tjenesten startet",
      all: "Alle",
      aiData: "AI og data",
      web: "Web",
      themeLight: "Bytt til lyst tema",
      themeDark: "Bytt til mørkt tema",
      top: "Til toppen",
    }
  : {
      statusFallback: "haroonshahzad.no · live",
      live: "live",
      started: "service started",
      all: "All",
      aiData: "AI & data",
      web: "Web",
      themeLight: "Switch to light theme",
      themeDark: "Switch to dark theme",
      top: "Back to top",
    };

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

function formatServiceStart(isoDate) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(isNorwegian ? "nb-NO" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

async function loadStatus() {
  const statusText = document.getElementById("status-text");
  if (!statusText) return;

  try {
    const response = await fetch("/api/status", { cache: "no-store" });
    if (!response.ok) throw new Error("Status request failed");

    const data = await response.json();
    const serviceStart = formatServiceStart(data.startedAt);
    statusText.textContent = serviceStart
      ? `${data.domain} · ${copy.live} · ${copy.started} ${serviceStart}`
      : `${data.domain} · ${copy.live}`;
  } catch {
    statusText.textContent = copy.statusFallback;
  }
}

function setList(list, items) {
  if (list) list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function removeOldEducation() {
  document.querySelectorAll(".cv-row").forEach((row) => {
    const text = row.textContent || "";
    if (text.includes("ICT Service Trade Certificate") || text.includes("Fagbrev IKT-servicefag")) {
      row.remove();
    }
  });
}

function refineAbout() {
  const section = document.querySelector(isNorwegian ? "#om" : "#about");
  const prose = section?.querySelector(".prose");
  if (!prose) return;

  prose.innerHTML = isNorwegian
    ? `<p class="prose-lead">Jeg kombinerer solid erfaring fra IT-drift og brukerstøtte med automatisering, skyplattformer og intern utvikling.</p>
       <p>Jeg har arbeidet i miljøer med høye krav til stabilitet, sikkerhet, konfidensialitet og dokumentasjon, blant annet i Politiets IKT-tjenester, Forsvarets forskningsinstitutt og Norfund.</p>
       <p>I dag jobber jeg i skjæringspunktet mellom drift, identitets- og tilgangsstyring, klientforvaltning, automatisering og dataplattformer. Jeg motiveres av å gjøre manuelle prosesser mer stabile, skalerbare og effektive, og dokumentere løsningene slik at de kan brukes og videreutvikles av andre.</p>`
    : `<p class="prose-lead">I combine a strong background in IT operations and support with automation, cloud platforms and internal development.</p>
       <p>I have worked in environments with high requirements for stability, security, confidentiality and documentation, including the Norwegian Police IT Services, the Norwegian Defence Research Establishment and Norfund.</p>
       <p>Today I work across operations, identity and access management, endpoint management, automation and data platforms. I am motivated by turning manual processes into stable, scalable and efficient solutions, then documenting them so others can use and develop them further.</p>`;
}

function refineExperience() {
  const section = document.querySelector(isNorwegian ? "#erfaring" : "#experience");
  if (!section) return;

  const label = section.querySelector(".section-label");
  section.innerHTML = "";
  if (label) section.appendChild(label);

  section.insertAdjacentHTML(
    "beforeend",
    isNorwegian
      ? `<div class="cv-row">
           <div class="cv-date">Sep 2025 —</div>
           <div class="cv-content">
             <h3>IT Associate</h3>
             <p class="cv-org">Norfund</p>
             <p>Jobber med IT-drift, sikkerhet og kontinuerlig forbedring i et moderne Microsoft-miljø, kombinert med teknisk implementasjon og automatisering.</p>
             <ul class="cv-list">
               <li>Microsoft 365, Entra ID, Intune, Admin Center og tilgangsstyring</li>
               <li>Klientforvaltning, policyarbeid, applikasjonshåndtering og enhetssikkerhet</li>
               <li>Teknisk brukerstøtte, feilsøking og hendelseshåndtering</li>
               <li>Dokumentasjon, rutiner og kunnskapsartikler i Confluence og supportsystemer</li>
               <li>Automatisering, CODEC, MCP-integrasjoner og forbedring av interne IT-prosesser</li>
             </ul>
           </div>
         </div>
         <div class="cv-row">
           <div class="cv-date">Des 2023 — Sep 2025</div>
           <div class="cv-content">
             <h3>Konsulent</h3>
             <p class="cv-org">Norfund · Temp-Team</p>
             <p>Innleid konsulent med ansvar for 1. og 2. linje brukerstøtte, teknisk saksbehandling og daglig IT-drift.</p>
             <ul class="cv-list">
               <li>Microsoft 365, klientutstyr, tilgangsstyring og interne systemer</li>
               <li>ITIL-basert hendelseshåndtering, prioritering og oppfølging</li>
               <li>Samarbeid med interne brukere, leverandører og tekniske ressurser</li>
             </ul>
           </div>
         </div>
         <div class="cv-row"><div class="cv-date">Apr 2019 — Sep 2022</div><div class="cv-content"><h3>Rådgiver</h3><p class="cv-org">Politiets IKT-tjenester</p><p>2. linje brukerstøtte, sakshåndtering og koordinering i et miljø med høye krav til sikkerhet, kvalitet og stabilitet.</p></div></div>
         <div class="cv-row"><div class="cv-date">Jun 2016 — Apr 2019</div><div class="cv-content"><h3>Brukerstøtte og administrasjon</h3><p class="cv-org">Forsvarets forskningsinstitutt (FFI)</p><p>Brukeradministrasjon, klientutstyr, teknisk drift og sikker håndtering av utstyr i et forsknings- og sikkerhetsmiljø.</p></div></div>`
      : `<div class="cv-row">
           <div class="cv-date">Sep 2025 —</div>
           <div class="cv-content">
             <h3>IT Associate</h3>
             <p class="cv-org">Norfund</p>
             <p>IT operations, security and continuous improvement in a modern Microsoft environment, combined with technical implementation and automation.</p>
             <ul class="cv-list">
               <li>Microsoft 365, Entra ID, Intune, Admin Center and access management</li>
               <li>Endpoint management, policies, application deployment and device security</li>
               <li>Technical support, troubleshooting and incident handling</li>
               <li>Documentation, procedures and knowledge articles in Confluence and support systems</li>
               <li>Automation, CODEC, MCP integrations and improvement of internal IT processes</li>
             </ul>
           </div>
         </div>
         <div class="cv-row">
           <div class="cv-date">Dec 2023 — Sep 2025</div>
           <div class="cv-content">
             <h3>IT Consultant</h3>
             <p class="cv-org">Norfund · Temp-Team</p>
             <p>Contracted consultant responsible for first- and second-line support, technical case handling and daily IT operations.</p>
             <ul class="cv-list">
               <li>Microsoft 365, endpoint equipment, access management and internal systems</li>
               <li>ITIL-based incident handling, prioritisation and follow-up</li>
               <li>Collaboration with internal users, vendors and technical resources</li>
             </ul>
           </div>
         </div>
         <div class="cv-row"><div class="cv-date">Apr 2019 — Sep 2022</div><div class="cv-content"><h3>IT Advisor</h3><p class="cv-org">Norwegian Police IT Services</p><p>Second-line support, case handling and coordination in an environment with high requirements for security, quality and stability.</p></div></div>
         <div class="cv-row"><div class="cv-date">Jun 2016 — Apr 2019</div><div class="cv-content"><h3>IT Support and Administration</h3><p class="cv-org">Norwegian Defence Research Establishment (FFI)</p><p>User administration, endpoint equipment, technical operations and secure equipment handling in a research and security environment.</p></div></div>`
  );
}

function refineEducation() {
  const section = document.querySelector(isNorwegian ? "#utdanning" : "#education");
  const row = section?.querySelector(".cv-row");
  const heading = row?.querySelector("h3");
  const description = row?.querySelector(".cv-content > p:not(.cv-org)");

  if (heading && !isNorwegian) heading.textContent = "BEng in Computer Science";
  if (description) {
    description.textContent = isNorwegian
      ? "Fullfører en bachelor i ingeniørfag – data, med forventet fullføring i 2027. Fagområder inkluderer programmering, algoritmer og datastrukturer, databaser, nettverk, skytjenester og webutvikling."
      : "Completing a BEng in Computer Science, with expected graduation in 2027. Coursework includes programming, algorithms and data structures, databases, networks, cloud services and web development.";
  }
}

function refineProjects() {
  const entries = Array.from(document.querySelectorAll(".entry"));

  const mcpEntry = entries.find((entry) => entry.querySelector("h3")?.textContent.toLowerCase().includes("mcp"));
  if (mcpEntry) {
    const intro = mcpEntry.querySelector(".entry-body > p");
    const list = mcpEntry.querySelector(".entry-body > ul.cv-list");
    const more = mcpEntry.querySelector(".entry-more");

    if (intro) {
      intro.textContent = isNorwegian
        ? "En samling MCP-integrasjoner som lar godkjente AI-verktøy hente relevant informasjon fra forretningssystemer og reduserer manuelle oppslag og systembytter."
        : "A suite of MCP integrations that lets approved AI tools retrieve relevant information from business systems, reducing manual lookups and context switching.";
    }

    setList(
      list,
      isNorwegian
        ? [
            "Microsoft Graph MCP — brukere, grupper, enheter og tilgang",
            "Power BI MCP — henting og analyse av rapportdata",
            "M-Files MCP — søk i dokumenter og metadata",
            "E-postsikkerhet MCP — støtte ved undersøkelser av spam og phishing",
          ]
        : [
            "Microsoft Graph MCP — users, groups, devices and access",
            "Power BI MCP — retrieval and analysis of report data",
            "M-Files MCP — search across documents and metadata",
            "Email Security MCP — support for spam and phishing investigations",
          ]
    );

    if (more) {
      more.innerHTML = isNorwegian
        ? `<h4>Resultat</h4><p>Integrasjonene samler informasjon som tidligere krevde flere portaler og manuelle oppslag. Jeg bygget oppsett, installasjon og dokumentasjon slik at løsningene kunne tas i bruk av resten av teamet.</p><h4>Min rolle</h4><p>Utvikling, feilsøking, utrulling og dokumentasjon, med fokus på kontrollert tilgang og enkel bruk for kollegaer.</p>`
        : `<h4>Outcome</h4><p>The integrations bring together information that previously required several portals and manual lookups. I built the setup, installation and documentation so the rest of the team could adopt them.</p><h4>My role</h4><p>Development, troubleshooting, rollout and documentation, with a focus on controlled access and straightforward use for colleagues.</p>`;
    }
  }

  const codecEntry = entries.find((entry) => {
    const heading = entry.querySelector("h3")?.textContent.toLowerCase() || "";
    return heading.includes("support tool") || heading.includes("støtteverktøy") || heading.includes("codec");
  });

  if (codecEntry) {
    const heading = codecEntry.querySelector("h3");
    const intro = codecEntry.querySelector(".entry-body > p");
    const list = codecEntry.querySelector(".entry-body > ul.cv-list");
    const more = codecEntry.querySelector(".entry-more");

    if (heading) heading.textContent = isNorwegian ? "CODEC — AI-plattform for IT-support" : "CODEC — AI Platform for IT Support";
    if (intro) {
      intro.textContent = isNorwegian
        ? "En intern arbeidsflate jeg utviklet for å samle saksbehandling, kommunikasjon og AI-assistanse på ett sted, med Fox som innebygd AI-agent."
        : "An internal workspace I developed to bring case handling, communication and AI assistance into one place, with Fox as the embedded AI agent.";
    }

    setList(
      list,
      isNorwegian
        ? [
            "Fox lager utkast til svar i riktig tone og språk",
            "Sakshistorikk og kommunikasjon samlet i én visning",
            "Automatiske oppsummeringer, kategorisering og støtte ved prioritering",
          ]
        : [
            "Fox drafts replies in the appropriate tone and language",
            "Case history and communication brought together in one view",
            "Automatic summaries, categorisation and prioritisation support",
          ]
    );

    if (more) {
      more.innerHTML = isNorwegian
        ? `<h4>Utfordringen</h4><p>Saksbehandling krevde flere manuelle steg og bytte mellom ulike systemer.</p><h4>Løsningen</h4><p>CODEC samler relevant sakshistorikk, kommunikasjon og AI-funksjoner i én arbeidsflate. Jeg designet og utviklet løsningen, integrasjonene og Fox-agenten.</p><h4>Effekt</h4><p>Raskere oversikt, bedre utkast og mindre manuelt arbeid i den daglige saksbehandlingen.</p>`
        : `<h4>Challenge</h4><p>Case handling required several manual steps and switching between different systems.</p><h4>Solution</h4><p>CODEC brings relevant case history, communication and AI capabilities into one workspace. I designed and developed the solution, its integrations and the Fox agent.</p><h4>Impact</h4><p>Faster case overview, stronger drafts and less manual work in day-to-day support.</p>`;
    }
  }

  const covenantEntry = entries.find((entry) => entry.querySelector("h3")?.textContent.toLowerCase().includes("covenant"));
  if (covenantEntry) {
    const intro = covenantEntry.querySelector(".entry-body > p");
    const more = covenantEntry.querySelector(".entry-more");

    if (intro) {
      intro.textContent = isNorwegian
        ? "Bidrag til en AI-drevet ende-til-ende datapipeline for dokumentprosessering med M-Files, Azure Data Factory, Databricks, Azure OpenAI, Power Apps og Power BI."
        : "Contributions to an AI-driven end-to-end data pipeline for document processing using M-Files, Azure Data Factory, Databricks, Azure OpenAI, Power Apps and Power BI.";
    }

    if (more) {
      more.innerHTML = isNorwegian
        ? `<h4>Mitt bidrag</h4><ul class="cv-list"><li>Automatisert dokumentflyt og AI-basert dataekstraksjon</li><li>Validering og strukturering av data før lagring i datavarehus</li><li>Dataflyt fra dokumentinntak til visualisering i Power BI</li><li>Forbedret datakvalitet, sporbarhet og effektivitet ved å erstatte manuelle steg</li></ul>`
        : `<h4>My contribution</h4><ul class="cv-list"><li>Automated document flow and AI-based data extraction</li><li>Validation and structuring of data before storage in the data warehouse</li><li>Data flow from document intake through to Power BI visualisation</li><li>Improved data quality, traceability and efficiency by replacing manual steps</li></ul>`;
    }
  }

  entries.forEach((entry) => {
    const status = entry.querySelector(".entry-status");
    const heading = entry.querySelector("h3")?.textContent.toLowerCase() || "";
    if (status && (heading.includes("site") || heading.includes("siden"))) status.textContent = "Live";
  });
}

function addAcademicProject() {
  const section = document.querySelector(isNorwegian ? "#prosjekter" : "#projects");
  if (!section || section.querySelector("[data-project='data1200']")) return;

  section.insertAdjacentHTML(
    "beforeend",
    isNorwegian
      ? `<article class="entry" data-project="data1200">
           <div class="entry-meta"><span class="entry-status">Gruppeprosjekt · 2024</span></div>
           <div class="entry-body">
             <h3>DATA1200 webprosjekt</h3>
             <p>Akademisk gruppeprosjekt ved OsloMet der vi utviklet en responsiv nettside med HTML og CSS.</p>
             <ul class="cv-list">
               <li>Bygget og stylet tabelløsningen for studieprogram, semestre, emner, emnekoder og studiepoeng</li>
               <li>Brukte semantiske tabeller med caption, thead, tbody og tydelige kolonneoverskrifter</li>
               <li>Arbeidet med responsiv presentasjon, lesbarhet og universell utforming</li>
               <li>Samarbeidet med gruppen gjennom Git og GitHub</li>
             </ul>
             <p><a href="https://github.com/heinesel/DATA1200-Exam" target="_blank" rel="noopener" class="link-plain">Se prosjektet på GitHub</a></p>
             <p class="entry-tech">HTML · CSS · Semantisk HTML · Universell utforming · Git · GitHub</p>
           </div>
         </article>`
      : `<article class="entry" data-project="data1200">
           <div class="entry-meta"><span class="entry-status">Group project · 2024</span></div>
           <div class="entry-body">
             <h3>DATA1200 Web Project</h3>
             <p>Academic group project at OsloMet where we developed a responsive website using HTML and CSS.</p>
             <ul class="cv-list">
               <li>Developed and styled the table system for study programmes, semesters, courses, course codes and credits</li>
               <li>Used semantic tables with captions, table headers, table bodies and clear column headings</li>
               <li>Worked on responsive presentation, readability and accessibility</li>
               <li>Collaborated with the group through Git and GitHub</li>
             </ul>
             <p><a href="https://github.com/heinesel/DATA1200-Exam" target="_blank" rel="noopener" class="link-plain">View project on GitHub</a></p>
             <p class="entry-tech">HTML · CSS · Semantic HTML · Accessibility · Git · GitHub</p>
           </div>
         </article>`
  );
}

function refineSkills() {
  const section = document.querySelector(isNorwegian ? "#ferdigheter" : "#skills");
  const container = section?.querySelector(".skills-columns");
  if (!container) return;

  container.innerHTML = isNorwegian
    ? `<div><h4>Kjernekompetanse</h4><ul><li>Microsoft 365</li><li>Azure og Entra ID</li><li>Intune og endpoint management</li><li>Identitets- og tilgangsstyring</li><li>ITIL og hendelseshåndtering</li><li>IT-drift og brukerstøtte</li></ul></div><div><h4>Automatisering og data</h4><ul><li>PowerShell</li><li>Python og Flask</li><li>Microsoft Graph og REST API-er</li><li>MCP-integrasjoner</li><li>Azure Data Factory</li><li>Databricks og Power BI</li></ul></div><div><h4>Plattform og leveranse</h4><ul><li>Azure DevOps og CI/CD</li><li>Power Apps og Power Platform</li><li>Confluence og teknisk dokumentasjon</li><li>Prosessforbedring</li><li>Docker og Node.js</li></ul></div>`
    : `<div><h4>Core expertise</h4><ul><li>Microsoft 365</li><li>Azure and Entra ID</li><li>Intune and endpoint management</li><li>Identity and access management</li><li>ITIL and incident handling</li><li>IT operations and support</li></ul></div><div><h4>Automation and data</h4><ul><li>PowerShell</li><li>Python and Flask</li><li>Microsoft Graph and REST APIs</li><li>MCP integrations</li><li>Azure Data Factory</li><li>Databricks and Power BI</li></ul></div><div><h4>Platforms and delivery</h4><ul><li>Azure DevOps and CI/CD</li><li>Power Apps and Power Platform</li><li>Confluence and technical documentation</li><li>Process improvement</li><li>Docker and Node.js</li></ul></div>`;
}

function refineContact() {
  const section = document.querySelector(isNorwegian ? "#kontakt" : "#contact");
  const grid = section?.querySelector(".contact-grid");
  if (!grid) return;

  grid.innerHTML = isNorwegian
    ? `<div class="prose"><p>Den sikreste måten å kontakte meg på er via LinkedIn. Du kan også se kildekode og personlige prosjekter på GitHub.</p><div class="intro-links"><a href="https://www.linkedin.com/in/haroon-shahzad-b22596b4/" target="_blank" rel="noopener" class="btn">Kontakt på LinkedIn</a><a href="https://github.com/MikeRashid" target="_blank" rel="noopener" class="link-plain">Se GitHub</a></div></div>`
    : `<div class="prose"><p>The most reliable way to contact me is through LinkedIn. You can also view source code and personal projects on GitHub.</p><div class="intro-links"><a href="https://www.linkedin.com/in/haroon-shahzad-b22596b4/" target="_blank" rel="noopener" class="btn">Contact on LinkedIn</a><a href="https://github.com/MikeRashid" target="_blank" rel="noopener" class="link-plain">View GitHub</a></div></div>`;
}

function injectInteractionStyles() {
  const style = document.createElement("style");
  style.dataset.interactions = "true";
  style.textContent = `
    :root { --interactive-shadow: 0 16px 45px rgba(0, 0, 0, .22); }

    html[data-theme="light"] {
      --bg: #f5f7fb;
      --surface: #ffffff;
      --border: #dce2eb;
      --border-strong: #b8c2d1;
      --text: #17202c;
      --text-soft: #3e4b5d;
      --muted: #68758a;
      --accent: #315fd5;
      --amber: #d88400;
      --green: #178a5b;
      --interactive-shadow: 0 16px 45px rgba(29, 45, 70, .12);
    }

    html[data-theme="light"] .statusbar { background: #e9edf4; }
    html[data-theme="light"] .site-header { background: rgba(245, 247, 251, .92); }
    html[data-theme="light"] .portrait { filter: grayscale(.25); }

    body, .site-header, .statusbar, .entry, .cv-row, .skills-columns > div {
      transition: background-color .25s ease, color .25s ease, border-color .25s ease, box-shadow .25s ease, transform .25s ease;
    }

    .scroll-progress { position: fixed; inset: 0 auto auto 0; width: 100%; height: 3px; z-index: 100; pointer-events: none; }
    .scroll-progress__bar { width: 100%; height: 100%; background: linear-gradient(90deg, var(--accent), var(--amber)); transform: scaleX(0); transform-origin: left center; will-change: transform; }

    .theme-toggle { display: inline-grid; place-items: center; width: 31px; height: 31px; padding: 0; border: 1px solid var(--border-strong); border-radius: 50%; background: transparent; color: var(--text-soft); font: inherit; cursor: pointer; }
    .theme-toggle:hover { color: var(--amber); border-color: var(--amber); transform: rotate(8deg); }

    .nav a.is-active { color: var(--text); position: relative; }
    .nav a.is-active::after { content: ""; position: absolute; left: 0; right: 0; bottom: -7px; height: 2px; background: var(--amber); border-radius: 99px; }

    .project-filters { display: flex; flex-wrap: wrap; gap: 8px; margin: -14px 0 30px; }
    .project-filter { border: 1px solid var(--border-strong); border-radius: 999px; background: transparent; color: var(--muted); padding: 7px 13px; font-family: var(--font-mono); font-size: 12px; cursor: pointer; }
    .project-filter:hover, .project-filter[aria-pressed="true"] { border-color: var(--accent); color: var(--text); background: color-mix(in srgb, var(--accent) 12%, transparent); }

    .entry { border-radius: 8px; padding-inline: 14px; margin-inline: -14px; }
    .entry:hover { background: color-mix(in srgb, var(--surface) 70%, transparent); transform: translateY(-2px); box-shadow: var(--interactive-shadow); border-color: transparent; }

    .skills-columns > div { border: 1px solid transparent; border-radius: 8px; padding: 16px; margin: -16px; }
    .skills-columns > div:hover { background: var(--surface); border-color: var(--border); transform: translateY(-3px); box-shadow: var(--interactive-shadow); }

    .reveal { opacity: 0; transform: translateY(18px); }
    .reveal.is-visible { opacity: 1; transform: none; transition: opacity .55s ease, transform .55s ease; }

    .back-to-top { position: fixed; right: 22px; bottom: 22px; width: 42px; height: 42px; border: 1px solid var(--border-strong); border-radius: 50%; background: var(--surface); color: var(--text); box-shadow: var(--interactive-shadow); cursor: pointer; z-index: 20; opacity: 0; transform: translateY(12px); pointer-events: none; }
    .back-to-top.is-visible { opacity: 1; transform: none; pointer-events: auto; }
    .back-to-top:hover { border-color: var(--amber); color: var(--amber); transform: translateY(-2px); }

    .entry[hidden] { display: none !important; }

    @media (max-width: 720px) {
      .theme-toggle { width: 29px; height: 29px; }
      .project-filters { margin-top: -8px; }
      .entry { margin-inline: -8px; padding-inline: 8px; }
      .back-to-top { right: 14px; bottom: 14px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; }
      .entry:hover, .skills-columns > div:hover, .theme-toggle:hover, .back-to-top:hover { transform: none; }
    }
  `;
  document.head.appendChild(style);
}

function initThemeToggle() {
  const nav = document.querySelector(".nav");
  if (!nav || nav.querySelector(".theme-toggle")) return;

  const savedTheme = localStorage.getItem("hs-theme");
  document.documentElement.dataset.theme = savedTheme === "light" ? "light" : "dark";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";

  const updateButton = () => {
    const isLight = document.documentElement.dataset.theme === "light";
    button.textContent = isLight ? "☾" : "☀";
    button.setAttribute("aria-label", isLight ? copy.themeDark : copy.themeLight);
    button.title = isLight ? copy.themeDark : copy.themeLight;
  };

  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("hs-theme", nextTheme);
    updateButton();
  });

  const languageSwitch = nav.querySelector(".lang-switch");
  nav.insertBefore(button, languageSwitch || null);
  updateButton();
}

function initScrollProgress() {
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  progress.innerHTML = `<div class="scroll-progress__bar"></div>`;
  document.body.prepend(progress);

  const bar = progress.firstElementChild;
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    bar.style.transform = `scaleX(${ratio})`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initScrollSpy() {
  if (!("IntersectionObserver" in window)) return;

  const links = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if (!sections.length) return;

  const activate = (id) => {
    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activate(visible.target.id);
    },
    { rootMargin: "-28% 0px -60% 0px", threshold: [0.05, 0.25, 0.6] }
  );

  sections.forEach((section) => observer.observe(section));
}

function initProjectFilters() {
  const section = document.querySelector(isNorwegian ? "#prosjekter" : "#projects");
  const label = section?.querySelector(".section-label");
  const entries = Array.from(section?.querySelectorAll(".entry") || []);
  if (!section || !label || !entries.length || section.querySelector(".project-filters")) return;

  entries.forEach((entry) => {
    const heading = entry.querySelector("h3")?.textContent.toLowerCase() || "";
    entry.dataset.category = heading.includes("site") || heading.includes("siden") || heading.includes("data1200") ? "web" : "ai";
  });

  const controls = document.createElement("div");
  controls.className = "project-filters";
  controls.setAttribute("aria-label", isNorwegian ? "Filtrer prosjekter" : "Filter projects");

  [["all", copy.all], ["ai", copy.aiData], ["web", copy.web]].forEach(([value, labelText], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-filter";
    button.dataset.filter = value;
    button.textContent = labelText;
    button.setAttribute("aria-pressed", String(index === 0));

    button.addEventListener("click", () => {
      controls.querySelectorAll(".project-filter").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      entries.forEach((entry) => {
        entry.hidden = value !== "all" && entry.dataset.category !== value;
      });
    });

    controls.appendChild(button);
  });

  label.insertAdjacentElement("afterend", controls);
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(".intro-grid, .band .section-label, .band .prose, .cv-row, .entry, .skills-columns > div, .contact-grid > *");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );

  elements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 45}ms`;
    observer.observe(element);
  });
}

function initBackToTop() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "back-to-top";
  button.innerHTML = "↑";
  button.setAttribute("aria-label", copy.top);
  button.title = copy.top;

  button.addEventListener("click", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  const update = () => button.classList.toggle("is-visible", window.scrollY > 650);
  update();
  window.addEventListener("scroll", update, { passive: true });
  document.body.appendChild(button);
}

function initReadMore() {
  document.querySelectorAll(".read-more").forEach((button) => {
    const panel = button.parentElement?.querySelector(".entry-more");
    if (!panel) return;

    button.addEventListener("click", () => {
      const willOpen = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(willOpen));
      panel.hidden = !willOpen;
      button.textContent = willOpen ? button.dataset.less : button.dataset.more;

      if (willOpen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        panel.animate(
          [{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 180, easing: "ease-out" }
        );
      }
    });
  });
}

removeOldEducation();
refineAbout();
refineExperience();
refineEducation();
refineProjects();
addAcademicProject();
refineSkills();
refineContact();

injectInteractionStyles();
initThemeToggle();
initScrollProgress();
initProjectFilters();
initScrollSpy();
initRevealAnimations();
initBackToTop();
initReadMore();
loadStatus();
