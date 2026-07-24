// script.js
// Shared by index.html (English) and no.html (Norwegian).
// Text shown to the user is picked based on <html lang>, so one file serves both.

const isNorwegian = document.documentElement.lang === "no";

const t = isNorwegian
  ? {
      statusFallback: "haroonshahzad.no",
      live: "i drift",
      lastDeploy: "sist oppdatert",
      sending: "Sender…",
      sendLabel: "Send melding",
      sent: "Sendt! Takk for meldingen.",
      genericError: "Noe gikk galt.",
      networkError: "Kunne ikke nå serveren. Prøv igjen senere.",
    }
  : {
      statusFallback: "haroonshahzad.no",
      live: "live",
      lastDeploy: "last deploy",
      sending: "Sending…",
      sendLabel: "Send message",
      sent: "Sent! Thanks for your message.",
      genericError: "Something went wrong.",
      networkError: "Couldn't reach the server. Try again later.",
    };

document.getElementById("year").textContent = new Date().getFullYear();

async function loadStatus() {
  const statusText = document.getElementById("status-text");
  try {
    const res = await fetch("/api/status");
    if (!res.ok) throw new Error("Status request failed");
    const data = await res.json();

    statusText.textContent =
      `${data.domain} · ${t.live} · ${t.lastDeploy} ${data.lastDeploy}`;
  } catch (err) {
    // Falls back to a plain label if the backend isn't reachable
    statusText.textContent = t.statusFallback;
  }
}

loadStatus();

// ---- Read more toggles on project entries ----
// Each toggle sits next to a hidden .entry-more block inside the same card.
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
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
