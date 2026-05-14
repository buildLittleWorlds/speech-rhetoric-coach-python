const sampleSpeech = `Our community has a problem that is easy to ignore because it does not always look urgent. Students who need speech coaching often wait weeks for help, and by the time they get it, the tournament, interview, or presentation has already passed. I believe we can close that gap with a tool that gives students fast, specific feedback when a human coach is not available.

This app is not meant to replace a mentor. It is meant to help students practice more often. A student can paste a speech, name the audience, and receive feedback on clarity, tone, evidence, and emotional connection. That means the next conversation with a real coach can start at a higher level.

If we want confident speakers, we have to make practice less intimidating and more frequent. AI can give students a first round of feedback, but the real goal is human growth: clearer ideas, stronger confidence, and better communication with the people they hope to reach.`;

const form = document.querySelector("#speech-form");
const speechText = document.querySelector("#speech-text");
const audience = document.querySelector("#audience");
const occasion = document.querySelector("#occasion");
const goal = document.querySelector("#goal");
const stats = document.querySelector("#draft-stats");
const button = document.querySelector("#submit-button");
const message = document.querySelector("#message");
const emptyState = document.querySelector("#empty-state");
const results = document.querySelector("#results");

speechText.value = sampleSpeech;
updateStats();

speechText.addEventListener("input", updateStats);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setLoading(true);
  showMessage("", "");
  results.classList.add("hidden");
  emptyState.classList.add("hidden");

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        speech_text: speechText.value,
        audience: audience.value,
        occasion: occasion.value,
        goal: goal.value,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      throw new Error(data.error || "The critique failed.");
    }

    if (data.warning) {
      showMessage(data.warning, "warning");
    }
    renderResults(data.analysis);
  } catch (error) {
    showMessage(error.message || "Something went wrong.", "error");
    emptyState.classList.remove("hidden");
  } finally {
    setLoading(false);
  }
});

function updateStats() {
  const words = speechText.value.trim()
    ? speechText.value.trim().split(/\s+/).length
    : 0;
  const paragraphs = speechText.value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean).length;
  stats.textContent = `${words} words · ${paragraphs} paragraph${paragraphs === 1 ? "" : "s"}`;
}

function setLoading(isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? "Analyzing..." : "Analyze speech";
}

function showMessage(text, kind) {
  message.textContent = text;
  message.className = text ? `message ${kind}` : "message hidden";
}

function renderResults(analysis) {
  const notes = analysis.rhetorical_notes || {};
  results.innerHTML = `
    <div class="score-row">
      <div>
        <p class="eyebrow">Audience fit</p>
        <h3>${escapeHtml(analysis.headline || "Speech critique")}</h3>
      </div>
      <div class="score">${escapeHtml(String(analysis.audience_fit_score ?? "?"))}<span>/10</span></div>
    </div>

    ${listSection("What will connect", analysis.connects)}
    ${listSection("What may weaken connection", analysis.risks)}

    <section class="critique-block">
      <h4>Rhetorical strategy</h4>
      <div class="note-grid">
        ${note("Ethos", notes.ethos)}
        ${note("Pathos", notes.pathos)}
        ${note("Logos", notes.logos)}
        ${note("Tone", notes.tone)}
        ${note("Structure", notes.structure)}
      </div>
    </section>

    ${listSection("Three revision moves", analysis.revision_moves)}

    <section class="sample-block">
      <h4>Optional sample revision</h4>
      <p>${escapeHtml(analysis.improved_sample || "No sample revision returned.")}</p>
    </section>
  `;
  results.classList.remove("hidden");
}

function listSection(title, items = []) {
  const listItems = items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  return `
    <section class="critique-block">
      <h4>${escapeHtml(title)}</h4>
      <ul>${listItems}</ul>
    </section>
  `;
}

function note(label, value = "") {
  return `
    <div class="note">
      <strong>${escapeHtml(label)}</strong>
      <p>${escapeHtml(value)}</p>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
