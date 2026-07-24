// script.js
// 1) Henter live status fra /api/status og fyller statusstripen + hero-tall
// 2) Sender kontaktskjemaet til /api/contact uten å laste siden på nytt

document.getElementById("year").textContent = new Date().getFullYear();

async function loadStatus() {
  const statusText = document.getElementById("status-text");
  try {
    const res = await fetch("/api/status");
    if (!res.ok) throw new Error("Status-kall feilet");
    const data = await res.json();

    const minutes = Math.floor(data.uptimeSeconds / 60);
    statusText.textContent =
      `${data.status} — ${data.domain} — oppe i ${minutes} min — siste deploy ${data.lastDeploy}`;

    const yearsIt = document.getElementById("stat-years-it");
    const yearsNorfund = document.getElementById("stat-years-norfund");
    if (yearsIt) yearsIt.textContent = `${data.yearsInIT}+`;
    if (yearsNorfund) yearsNorfund.textContent = `${data.yearsAtNorfund}+`;
  } catch (err) {
    // Faller tilbake til statisk tekst hvis backend ikke er tilgjengelig
    statusText.textContent = "STATISK MODUS — backend ikke tilkoblet";
  }
}

loadStatus();

const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Sender…";

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.ok) {
      formStatus.textContent = "Sendt! Takk for meldingen.";
      formStatus.classList.add("ok");
      form.reset();
    } else {
      formStatus.textContent = data.error || "Noe gikk galt.";
      formStatus.classList.add("error");
    }
  } catch (err) {
    formStatus.textContent = "Kunne ikke nå serveren. Prøv igjen senere.";
    formStatus.classList.add("error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send melding";
  }
});
