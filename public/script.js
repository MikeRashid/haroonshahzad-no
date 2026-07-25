// Shared by index.html (English) and no.html (Norwegian).
const isNorwegian = document.documentElement.lang === "no";

const t = isNorwegian
  ? { statusFallback: "haroonshahzad.no · i drift", live: "i drift", started: "tjenesten startet" }
  : { statusFallback: "haroonshahzad.no · live", live: "live", started: "service started" };

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
    const res = await fetch("/api/status", { cache: "no-store" });
    if (!res.ok) throw new Error("Status request failed");
    const data = await res.json();
    const serviceStart = formatServiceStart(data.startedAt);

    statusText.textContent = serviceStart
      ? `${data.domain} · ${t.live} · ${t.started} ${serviceStart}`
      : `${data.domain} · ${t.live}`;
  } catch {
    statusText.textContent = t.statusFallback;
  }
}

function setList(list, items) {
  if (!list) return;
  list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function removeOldEducation() {
  document.querySelectorAll(".cv-row").forEach((row) => {
    const text = row.textContent;
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

  section.insertAdjacentHTML("beforeend", isNorwegian
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
       <div class="cv-row">
         <div class="cv-date">Apr 2019 — Sep 2022</div>
         <div class="cv-content">
           <h3>Rådgiver</h3>
           <p class="cv-org">Politiets IKT-tjenester</p>
           <p>2. linje brukerstøtte, sakshåndtering og koordinering i et miljø med høye krav til sikkerhet, kvalitet og stabilitet.</p>
         </div>
       </div>
       <div class="cv-row">
         <div class="cv-date">Jun 2016 — Apr 2019</div>
         <div class="cv-content">
           <h3>Brukerstøtte og administrasjon</h3>
           <p class="cv-org">Forsvarets forskningsinstitutt (FFI)</p>
           <p>Brukeradministrasjon, klientutstyr, teknisk drift og sikker håndtering av utstyr i et forsknings- og sikkerhetsmiljø.</p>
         </div>
       </div>`
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
       <div class="cv-row">
         <div class="cv-date">Apr 2019 — Sep 2022</div>
         <div class="cv-content">
           <h3>IT Advisor</h3>
           <p class="cv-org">Norwegian Police IT Services</p>
           <p>Second-line support, case handling and coordination in an environment with high requirements for security, quality and stability.</p>
         </div>
       </div>
       <div class="cv-row">
         <div class="cv-date">Jun 2016 — Apr 2019</div>
         <div class="cv-content">
           <h3>IT Support and Administration</h3>
           <p class="cv-org">Norwegian Defence Research Establishment (FFI)</p>
           <p>User administration, endpoint equipment, technical operations and secure equipment handling in a research and security environment.</p>
         </div>
       </div>`);
}

function refineEducation() {
  const section = document.querySelector(isNorwegian ? "#utdanning" : "#education");
  const row = section?.querySelector(".cv-row");
  const description = row?.querySelector(".cv-content > p:not(.cv-org)");

  if (description) {
    description.textContent = isNorwegian
      ? "Fullfører en bachelor i ingeniørfag – data, med forventet fullføring i 2027. Fagområder inkluderer programmering, algoritmer og datastrukturer, databaser, nettverk, skytjenester og webutvikling."
      : "Completing a BEng in Computer Engineering, with expected graduation in 2027. Coursework includes programming, algorithms and data structures, databases, networks, cloud services and web development.";
  }
}

function refineProjects() {
  const entries = Array.from(document.querySelectorAll(".entry"));

  const mcpEntry = entries.find((entry) => entry.querySelector("h3")?.textContent.toLowerCase().includes("mcp"));
  if (mcpEntry) {
    const intro = mcpEntry.querySelector(".entry-body > p");
    const list = mcpEntry.querySelector(".entry-body > ul.cv-list");
    const more = mcpEntry.querySelector(".entry-more");

    if (intro) intro.textContent = isNorwegian
      ? "En samling MCP-integrasjoner som lar godkjente AI-verktøy hente relevant informasjon fra forretningssystemer og reduserer manuelle oppslag og systembytter."
      : "A suite of MCP integrations that lets approved AI tools retrieve relevant information from business systems, reducing manual lookups and context switching.";

    setList(list, isNorwegian
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
        ]);

    if (more) more.innerHTML = isNorwegian
      ? `<h4>Resultat</h4><p>Integrasjonene samler informasjon som tidligere krevde flere portaler og manuelle oppslag. Jeg bygget oppsett, installasjon og dokumentasjon slik at løsningene kunne tas i bruk av resten av teamet.</p><h4>Min rolle</h4><p>Utvikling, feilsøking, utrulling og dokumentasjon, med fokus på kontrollert tilgang og enkel bruk for kollegaer.</p>`
      : `<h4>Outcome</h4><p>The integrations bring together information that previously required several portals and manual lookups. I built the setup, installation and documentation so the rest of the team could adopt them.</p><h4>My role</h4><p>Development, troubleshooting, rollout and documentation, with a focus on controlled access and straightforward use for colleagues.</p>`;
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
    if (intro) intro.textContent = isNorwegian
      ? "En intern arbeidsflate jeg utviklet for å samle saksbehandling, kommunikasjon og AI-assistanse på ett sted, med Fox som innebygd AI-agent."
      : "An internal workspace I developed to bring case handling, communication and AI assistance into one place, with Fox as the embedded AI agent.";

    setList(list, isNorwegian
      ? [
          "Fox lager utkast til svar i riktig tone og språk",
          "Sakshistorikk og kommunikasjon samlet i én visning",
          "Automatiske oppsummeringer, kategorisering og støtte ved prioritering",
        ]
      : [
          "Fox drafts replies in the appropriate tone and language",
          "Case history and communication brought together in one view",
          "Automatic summaries, categorisation and prioritisation support",
        ]);

    if (more) more.innerHTML = isNorwegian
      ? `<h4>Utfordringen</h4><p>Saksbehandling krevde flere manuelle steg og bytte mellom ulike systemer.</p><h4>Løsningen</h4><p>CODEC samler relevant sakshistorikk, kommunikasjon og AI-funksjoner i én arbeidsflate. Jeg designet og utviklet løsningen, integrasjonene og Fox-agenten.</p><h4>Effekt</h4><p>Raskere oversikt, bedre utkast og mindre manuelt arbeid i den daglige saksbehandlingen.</p>`
      : `<h4>Challenge</h4><p>Case handling required several manual steps and switching between different systems.</p><h4>Solution</h4><p>CODEC brings relevant case history, communication and AI capabilities into one workspace. I designed and developed the solution, its integrations and the Fox agent.</p><h4>Impact</h4><p>Faster case overview, stronger drafts and less manual work in day-to-day support.</p>`;
  }

  const covenantEntry = entries.find((entry) => entry.querySelector("h3")?.textContent.toLowerCase().includes("covenant"));
  if (covenantEntry) {
    const intro = covenantEntry.querySelector(".entry-body > p");
    const more = covenantEntry.querySelector(".entry-more");
    if (intro) intro.textContent = isNorwegian
      ? "Bidrag til en AI-drevet ende-til-ende datapipeline for dokumentprosessering med M-Files, Azure Data Factory, Databricks, Azure OpenAI, Power Apps og Power BI."
      : "Contributions to an AI-driven end-to-end data pipeline for document processing using M-Files, Azure Data Factory, Databricks, Azure OpenAI, Power Apps and Power BI.";

    if (more) more.innerHTML = isNorwegian
      ? `<h4>Mitt bidrag</h4><ul class="cv-list"><li>Automatisert dokumentflyt og AI-basert dataekstraksjon</li><li>Validering og strukturering av data før lagring i datavarehus</li><li>Dataflyt fra dokumentinntak til visualisering i Power BI</li><li>Forbedret datakvalitet, sporbarhet og effektivitet ved å erstatte manuelle steg</li></ul>`
      : `<h4>My contribution</h4><ul class="cv-list"><li>Automated document flow and AI-based data extraction</li><li>Validation and structuring of data before storage in the data warehouse</li><li>Data flow from document intake through to Power BI visualisation</li><li>Improved data quality, traceability and efficiency by replacing manual steps</li></ul>`;
  }

  entries.forEach((entry) => {
    const status = entry.querySelector(".entry-status");
    const heading = entry.querySelector("h3")?.textContent.toLowerCase() || "";
    if (status && (heading.includes("site") || heading.includes("siden"))) status.textContent = "Live";
  });
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

removeOldEducation();
refineAbout();
refineExperience();
refineEducation();
refineProjects();
refineSkills();
refineContact();
loadStatus();

document.querySelectorAll(".read-more").forEach((btn) => {
  const panel = btn.parentElement.querySelector(".entry-more");
  if (!panel) return;

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
    btn.textContent = isOpen ? btn.dataset.more : btn.dataset.less;
  });
});
