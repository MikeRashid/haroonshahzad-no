// server.js
// Enkel Express-backend for haroonshahzad.no
// - Serverer den statiske frontend-en (public/)
// - GET  /api/status   -> "systemstatus" data brukt i hero-stripen
// - POST /api/contact  -> tar imot kontaktskjema, logger til contact-log.json

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Tidspunkt serveren startet, brukes til å regne ut "uptime" i statusstripen
const startedAt = Date.now();

// --- GET /api/status ---
// Returnerer litt "levende" data til hero-stripen øverst på siden.
// Dette er det som gjør stripen ekte (ikke bare hardkodet tekst i HTML).
app.get("/api/status", (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startedAt) / 1000);

  res.json({
    status: "OPERATIONAL",
    domain: "haroonshahzad.no",
    uptimeSeconds,
    lastDeploy: new Date().toISOString().slice(0, 10),
    yearsInIT: 8,
    yearsAtNorfund: new Date().getFullYear() - 2022,
  });
});

// --- POST /api/contact ---
// Tar imot { name, email, message } fra kontaktskjemaet.
// Validerer enkelt, og logger meldingen til en lokal fil.
// I produksjon: bytt ut fs-loggingen med en e-posttjeneste
// (f.eks. Resend, SendGrid, eller SMTP via nodemailer).
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "Name, email, and message are required.",
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({
      ok: false,
      error: "Invalid email address.",
    });
  }

  const entry = {
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  };

  const logPath = path.join(__dirname, "contact-log.json");
  let log = [];
  if (fs.existsSync(logPath)) {
    try {
      log = JSON.parse(fs.readFileSync(logPath, "utf-8"));
    } catch {
      log = [];
    }
  }
  log.push(entry);
  fs.writeFileSync(logPath, JSON.stringify(log, null, 2));

  console.log(`New inquiry from ${name} <${email}>`);

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`haroonshahzad.no kjører på http://localhost:${PORT}`);
});
