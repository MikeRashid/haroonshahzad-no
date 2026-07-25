// server.js
// Express backend for haroonshahzad.no
// - Serves the static frontend in public/
// - GET  /api/status   -> live service data for the status bar
// - POST /api/contact  -> validates and stores contact-form submissions

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const startedAt = new Date();

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json({ limit: "20kb" }));

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  next();
});

app.use(express.static(path.join(__dirname, "public")));

// Friendly, extension-free route for the Norwegian page.
app.get(["/no", "/no/"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", "no.html"));
});

const itStartDate = new Date("2013-08-01");
const norfundStartDate = new Date("2023-12-11");

function yearsSince(date) {
  const now = new Date();
  let years = now.getFullYear() - date.getFullYear();
  const hasHadAnniversaryThisYear =
    now.getMonth() > date.getMonth() ||
    (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());

  if (!hasHadAnniversaryThisYear) years -= 1;
  return years;
}

// --- GET /api/status ---
app.get("/api/status", (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startedAt.getTime()) / 1000);

  res.setHeader("Cache-Control", "no-store");
  res.json({
    status: "OPERATIONAL",
    domain: "haroonshahzad.no",
    uptimeSeconds,
    startedAt: startedAt.toISOString(),
    yearsInIT: yearsSince(itStartDate),
    yearsAtNorfund: yearsSince(norfundStartDate),
  });
});

// Lightweight in-memory rate limiting for the contact form.
const contactAttempts = new Map();
const CONTACT_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_LIMIT = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (contactAttempts.get(ip) || []).filter(
    (timestamp) => now - timestamp < CONTACT_WINDOW_MS
  );

  recent.push(now);
  contactAttempts.set(ip, recent);
  return recent.length > CONTACT_LIMIT;
}

// --- POST /api/contact ---
app.post("/api/contact", (req, res) => {
  const { name, email, message, lang, company } = req.body || {};
  const norwegian = lang === "no";

  // Honeypot field: real users never fill this in.
  if (company) {
    return res.json({ ok: true });
  }

  if (isRateLimited(req.ip)) {
    return res.status(429).json({
      ok: false,
      error: norwegian
        ? "For mange forsøk. Prøv igjen om noen minutter."
        : "Too many attempts. Try again in a few minutes.",
    });
  }

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({
      ok: false,
      error: norwegian
        ? "Navn, e-post og melding må fylles ut."
        : "Name, email, and message are required.",
    });
  }

  if (cleanName.length > 100 || cleanEmail.length > 254 || cleanMessage.length > 4000) {
    return res.status(400).json({
      ok: false,
      error: norwegian
        ? "Meldingen eller kontaktinformasjonen er for lang."
        : "The message or contact information is too long.",
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(cleanEmail)) {
    return res.status(400).json({
      ok: false,
      error: norwegian ? "Ugyldig e-postadresse." : "Invalid email address.",
    });
  }

  const entry = {
    name: cleanName,
    email: cleanEmail,
    message: cleanMessage,
    receivedAt: new Date().toISOString(),
  };

  const logPath = path.join(__dirname, "contact-log.jsonl");

  try {
    fs.appendFileSync(logPath, `${JSON.stringify(entry)}\n`, "utf-8");
    console.log(`New inquiry from ${cleanName} <${cleanEmail}>`);
    return res.json({ ok: true, delivery: "local-log" });
  } catch (error) {
    console.error("Could not store contact submission", error);
    return res.status(500).json({
      ok: false,
      error: norwegian
        ? "Meldingen kunne ikke lagres. Kontakt meg via LinkedIn."
        : "The message could not be stored. Please contact me on LinkedIn.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`haroonshahzad.no is running on port ${PORT}`);
});
