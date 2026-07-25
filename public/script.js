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

function refineExperience() {
  const section = document.querySelector(isNorwegian ? "#erfaring" : "#experience");
  if (!section) return;

  const rows = Array.from(section.querySelectorAll(":scope > .cv-row"));
  if (rows.length < 2) return;

  const first = rows[0];
  const second = rows[1];
  const date = first.querySelector(".cv-date");
  const content = first.querySelector(".cv-content");

  if (date) date.textContent = isNorwegian ? "Des 2023 —" : "Dec 2023 —";
  if (content) {
    content.innerHTML = isNorwegian
      ? `<h3>IT Systems Engineer</h3>
         <p class="cv-org">Norfund</p>
         <p>Ansvarsområdet ble utvidet i 2026 til å omfatte mer automatisering, AI-integrasjoner og intern utvikling.</p>
         <ul class="cv-list">
           <li>Azure-, Entra ID- og Intune-forvaltning, tilgangsstyring, onboarding og offboarding</li>
           <li>PowerShell-automatisering og standardisering av gjentakende driftsoppgaver</li>
           <li>Utvikling av CODEC, MCP-integrasjoner og andre interne støtteverktøy</li>
           <li>Forvaltning av AI-lisenser, tilgang og teknisk oppfølging</li>
           <li>Bidrag til Azure DevOps-, Power Apps- og CI/CD-arbeid</li>
           <li>Hentet tekniske oppgaver inn i teamet og reduserte avhengigheten av eksterne leverandører</li>
         </ul>`
      : `<h3>IT Systems Engineer</h3>
         <p class="cv-org">Norfund</p>
         <p>Scope expanded in 2026 to include more automation, AI integrations and internal development.</p>
         <ul class="cv-list">
           <li>Azure, Entra ID and Intune administration, access management, onboarding and offboarding</li>
           <li>PowerShell automation and standardisation of recurring operations work</li>
           <li>Development of CODEC, MCP integrations and other internal support tools</li>
           <li>Management of AI licensing, access and technical follow-up</li>
           <li>Contributions to Azure DevOps, Power Apps and CI/CD work</li>
           <li>Brought technical work in-house and reduced reliance on external vendors</li>
         </ul>`;
  }

  second.remove();
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

    if (intro) {
      intro.textContent = isNorwegian
        ? "En samling MCP-integrasjoner som lar godkjente AI-verktøy hente relevant informasjon fra forretningssystemer og reduserer manuelle oppslag og systembytter."
        : "A suite of MCP integrations that lets approved AI tools retrieve relevant information from business systems, reducing manual lookups and context switching.";
    }

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

    if (more) {
      more.innerHTML = isNorwegian
        ? `<h4>Utfordringen</h4><p>Saksbehandling krevde flere manuelle steg og bytte mellom ulike systemer.</p><h4>Løsningen</h4><p>CODEC samler relevant sakshistorikk, kommunikasjon og AI-funksjoner i én arbeidsflate. Jeg designet og utviklet løsningen, integrasjonene og Fox-agenten.</p><h4>Effekt</h4><p>Raskere oversikt, bedre utkast og mindre manuelt arbeid i den daglige saksbehandlingen.</p>`
        : `<h4>Challenge</h4><p>Case handling required several manual steps and switching between different systems.</p><h4>Solution</h4><p>CODEC brings relevant case history, communication and AI capabilities into one workspace. I designed and developed the solution, its integrations and the Fox agent.</p><h4>Impact</h4><p>Faster case overview, stronger drafts and less manual work in day-to-day support.</p>`;
    }
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
    ? `<div><h4>Kjernekompetanse</h4><ul><li>Microsoft 365</li><li>Azure og Entra ID</li><li>Intune</li><li>PowerShell</li><li>Microsoft Graph</li><li>IT-drift og automatisering</li></ul></div><div><h4>Utvikling og integrasjoner</h4><ul><li>Python og Flask</li><li>Node.js og Express</li><li>REST API-er</li><li>MCP-integrasjoner</li><li>SQL</li><li>Docker</li></ul></div><div><h4>Plattform og arbeidsmåte</h4><ul><li>Azure DevOps og CI/CD</li><li>Power Platform</li><li>PIM og RBAC</li><li>Confluence og teknisk dokumentasjon</li><li>Prosessforbedring</li></ul></div>`
    : `<div><h4>Core expertise</h4><ul><li>Microsoft 365</li><li>Azure and Entra ID</li><li>Intune</li><li>PowerShell</li><li>Microsoft Graph</li><li>IT operations and automation</li></ul></div><div><h4>Development and integrations</h4><ul><li>Python and Flask</li><li>Node.js and Express</li><li>REST APIs</li><li>MCP integrations</li><li>SQL</li><li>Docker</li></ul></div><div><h4>Platforms and delivery</h4><ul><li>Azure DevOps and CI/CD</li><li>Power Platform</li><li>PIM and RBAC</li><li>Confluence and technical documentation</li><li>Process improvement</li></ul></div>`;
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
