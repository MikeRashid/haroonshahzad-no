// script.js
// 1) Fetches live status from /api/status and fills the status bar + hero stats
// 2) Submits the contact form to /api/contact without a page reload

document.getElementById("year").textContent = new Date().getFullYear();

async function loadStatus() {
  const statusText = document.getElementById("status-text");
  try {
    const res = await fetch("/api/status");
    if (!res.ok) throw new Error("Status request failed");
    const data = await res.json();

    const minutes = Math.floor(data.uptimeSeconds / 60);
    statusText.textContent =
      `${data.domain} · live · last deploy ${data.lastDeploy}`;

  } catch (err) {
    // Falls back to static text if the backend isn't reachable
    statusText.textContent = "haroonshahzad.no";
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
  submitBtn.textContent = "Sending…";

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.ok) {
      formStatus.textContent = "Sent! Thanks for your message.";
      formStatus.classList.add("ok");
      form.reset();
    } else {
      formStatus.textContent = data.error || "Something went wrong.";
      formStatus.classList.add("error");
    }
  } catch (err) {
    formStatus.textContent = "Couldn't reach the server. Try again later.";
    formStatus.classList.add("error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send message";
  }
});
