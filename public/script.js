// script.js
// Shared by index.html (English) and no.html (Norwegian).

const isNorwegian = document.documentElement.lang === "no";

const t = isNorwegian
  ? {
      statusFallback: "haroonshahzad.no · i drift",
      live: "i drift",
      started: "tjenesten startet",
      sending: "Sender…",
      sendLabel: "Send melding",
      sent: "Sendt! Takk for meldingen.",
      genericError: "Noe gikk galt.",
      networkError: "Kunne ikke nå serveren. Prøv igjen senere.",
    }
  : {
      statusFallback: "haroonshahzad.no · live",
      live: "live",
      started: "service started",
      sending: "Sending…",
      sendLabel: "Send message",
      sent: "Sent! Thanks for your message.",
      genericError: "Something went wrong.",
      networkError: "Couldn't reach the server. Try again later.",
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
    const res = await fetch("/api/status", { cache: "no-store" });
    if (!res.ok) throw new Error("Status request failed");
    const data = await res.json();
    const serviceStart = formatServiceStart(data.startedAt);

    statusText.textContent = serviceStart
      ? `${data.domain} · ${t.live} · ${t.started} ${serviceStart}`
      : `${data.domain} · ${t.live}`;
  } catch (err) {
    statusText.textContent = t.statusFallback;
  }
}

loadStatus();

// Remove details that should not be shown in the public portfolio.
function removePublicDetails() {
  document.querySelectorAll(".cv-row").forEach((row) => {
    const text = row.textContent;
    if (
      text.includes("ICT Service Trade Certificate") ||
      text.includes("Fagbrev IKT-servicefag")
    ) {
      row.remove();
    }
  });

  document.querySelectorAll(".entry-more h4").forEach((heading) => {
    const label = heading.textContent.trim();
    if (
      label === "Problems worth mentioning" ||
      label === "Problemer verdt å nevne"
    ) {
      const details = heading.nextElementSibling;
      heading.remove();
      if (details?.tagName === "UL") details.remove();
    }
  });
}

removePublicDetails();

// Give the internal projects memorable, public-safe names and clearer scope.
function improveProjectCopy() {
  const entries = Array.from(document.querySelectorAll(".entry"));
  const mcpEntry = entries.find((entry) =>
    entry.querySelector("h3")?.textContent.toLowerCase().includes("mcp")
  );
  const supportEntry = entries.find((entry) => {
    const heading = entry.querySelector("h3")?.textContent.toLowerCase() || "";
    return heading.includes("support tool") || heading.includes("støtteverktøy");
  });

  if (mcpEntry) {
    const intro = mcpEntry.querySelector(".entry-body > p");
    const listItems = mcpEntry.querySelectorAll(".entry-body > ul.cv-list > li");

    if (intro) {
      intro.textContent = isNorwegian
        ? "En samling interne MCP-servere som gir AI-verktøy sikker og kontrollert tilgang til systemene IT-teamet bruker i arbeidshverdagen."
        : "A suite of internal MCP servers that gives AI tools secure, controlled access to the systems used by the IT team.";
    }

    const descriptions = isNorwegian
      ? [
          "Microsoft Graph MCP — brukere, grupper, enheter, PIM og tilgangsstyring",
          "Power BI MCP — henting og analyse av data fra rapporter",
          "M-Files MCP — søk i dokumenter, metadata og hvelv",
          "E-postsikkerhet MCP — undersøkelser av karantene, spam og phishing",
        ]
      : [
          "Microsoft Graph MCP — users, groups, devices, PIM and access management",
          "Power BI MCP — retrieving and analysing report data",
          "M-Files MCP — searching documents, metadata and vaults",
          "Email Security MCP — investigating quarantine, spam and phishing",
        ];

    listItems.forEach((item, index) => {
      if (descriptions[index]) item.textContent = descriptions[index];
    });
  }

  if (supportEntry) {
    const heading = supportEntry.querySelector("h3");
    const intro = supportEntry.querySelector(".entry-body > p");
    const listItems = supportEntry.querySelectorAll(".entry-body > ul.cv-list > li");

    if (heading) {
      heading.textContent = isNorwegian
        ? "CODEC — AI-plattform for IT-support"
        : "CODEC — AI Platform for IT Support";
    }

    if (intro) {
      intro.textContent = isNorwegian
        ? "En Flask-basert arbeidsflate jeg utviklet for IT-support. Plattformen samler saksbehandling, kommunikasjon og AI-funksjoner, med Fox som den innebygde AI-agenten."
        : "A Flask-based workspace I built for IT support. It brings case handling, communication and AI capabilities together, with Fox as the embedded AI agent.";
    }

    const descriptions = isNorwegian
      ? [
          "Fox lager utkast til svar i riktig tone og språk",
          "Kommunikasjon og sakshistorikk samlet i én visning",
          "Automatiske oppsummeringer, kategorisering og støtte ved prioritering",
        ]
      : [
          "Fox drafts replies in the appropriate tone and language",
          "Communication and case history brought together in one view",
          "Automatic summaries, categorisation and prioritisation support",
        ];

    listItems.forEach((item, index) => {
      if (descriptions[index]) item.textContent = descriptions[index];
    });
  }
}

improveProjectCopy();

// Read-more toggles on project entries.
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

const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

if (form && submitBtn && formStatus) {
  // Invisible honeypot used by the backend to discard automated spam.
  const honeypot = document.createElement("input");
  honeypot.type = "text";
  honeypot.name = "company";
  honeypot.id = "company";
  honeypot.tabIndex = -1;
  honeypot.autocomplete = "off";
  honeypot.setAttribute("aria-hidden", "true");
  honeypot.style.position = "absolute";
  honeypot.style.left = "-9999px";
  form.appendChild(honeypot);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    formStatus.textContent = "";
    formStatus.className = "form-status";

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
      company: honeypot.value.trim(),
      lang: isNorwegian ? "no" : "en",
    };

    submitBtn.disabled = true;
    submitBtn.textContent = t.sending;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.ok) {
        formStatus.textContent = t.sent;
        formStatus.classList.add("ok");
        form.reset();
      } else {
        formStatus.textContent = data.error || t.genericError;
        formStatus.classList.add("error");
      }
    } catch (err) {
      formStatus.textContent = t.networkError;
      formStatus.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = t.sendLabel;
    }
  });
}
