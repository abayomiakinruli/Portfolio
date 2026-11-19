// ---------------------------------------------------------
// Portfolio projects — add, edit or reorder entries here.
//
// category:  "professional" | "brand"
// status:    short label shown under the project number
// sector:    what kind of project it is
// liveUrl / sourceUrl: leave "" when there is no real link — the link is hidden.
// image:     cover picture (16:9 works best). Leave "" for a plain branded cover.
// ---------------------------------------------------------
const PROJECTS = [
  {
    title: "AcademiaHub Africa Platform",
    category: "professional",
    status: "Professional work",
    sector: "Education & research",
    description: "A student-focused education and research platform.",
    contribution:
      "Front-end development, reusable components, responsive UI improvements, navigation, metadata and collaborative GitHub pull requests.",
    liveUrl: "https://academiahubafrica.org",
    sourceUrl: "",
    image: "Assets/projects/academiahub.jpg",
  },
  {
    title: "ORBITAL — Digital Asset Trading",
    category: "brand",
    status: "My brand",
    sector: "Digital assets",
    description: "My cryptocurrency trading brand and digital asset trading project.",
    contribution:
      "Scope covers website development, trading workflows, Telegram bot planning and development, rate displays, transaction tracking and customer support flows.",
    liveUrl: "https://orbitaldex.com",
    sourceUrl: "",
    image: "Assets/projects/orbital.jpg",
  },
];

// ---------------------------------------------------------
// Settings
// ---------------------------------------------------------
const CONTACT_EMAIL = "abayomiakinruli@gmail.com";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------
// Hero world map: size and shift the background so Lagos
// sits exactly under the pin next to "Lagos, Nigeria"
// ---------------------------------------------------------
// Lagos is 6.52°N, 3.38°E; in world-map-fine.svg (360×140) x = lon + 180, y = 80 - lat
const LAGOS = { x: 183.38 / 360, y: 73.48 / 140 };

function placeMap() {
  const hero = document.querySelector(".hero");
  const img = document.querySelector(".hero__map-img");
  const pin = document.querySelector(".hero__pin");
  if (!hero || !img || !pin) return;

  const hr = hero.getBoundingClientRect();
  const pr = pin.getBoundingClientRect();
  const px = pr.left + pr.width / 2 - hr.left;
  const py = pr.top + pr.height / 2 - hr.top;

  // Wide enough that the map still reaches both edges of the hero
  const w = Math.max(hr.width * 1.35, (hr.width - px) / (1 - LAGOS.x), px / LAGOS.x, 900);
  img.style.width = `${w}px`;
  img.style.left = `${px - LAGOS.x * w}px`;
  img.style.top = `${py - LAGOS.y * (w * 140 / 360)}px`;
  // Centre the map's fade-out spotlight on the pin
  img.parentElement.style.setProperty("--pin-x", `${px}px`);
  img.parentElement.style.setProperty("--pin-y", `${py}px`);
}

placeMap();
window.addEventListener("resize", placeMap);
document.fonts?.ready.then(placeMap);

// ---------------------------------------------------------
// Sticky nav shadow
// ---------------------------------------------------------
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function setMenu(open) {
  navLinks.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
    setMenu(false);
    navToggle.focus();
  }
});
document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("is-open") && !nav.contains(e.target)) setMenu(false);
});

// ---------------------------------------------------------
// Light / dark theme
// ---------------------------------------------------------
const themeBtn = document.querySelector(".theme-toggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = () => document.documentElement.dataset.theme || (systemDark.matches ? "dark" : "light");

function syncThemeButton() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  themeBtn.setAttribute("aria-label", `Switch to ${next} theme`);
}

themeBtn.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
  syncThemeButton();
});
systemDark.addEventListener("change", syncThemeButton);
syncThemeButton();

// ---------------------------------------------------------
// Projects
// ---------------------------------------------------------
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const pad = (n) => String(n).padStart(2, "0");

// One carousel card per project: cover image, label, title, summary, button
function projectCard(p, i) {
  const cover = p.image
    ? `<img src="${escapeHtml(p.image)}" alt="" loading="lazy">`
    : `<span class="pcard__blank"><span>${escapeHtml(p.title.split(" — ")[0])}</span></span>`;
  const external = /^https?:/.test(p.liveUrl);
  const host = external ? new URL(p.liveUrl).hostname.replace(/^www\./, "") : "";
  // Address shown in the browser frame
  const address = external ? host : p.liveUrl ? `abayomiakinruli.github.io/${p.liveUrl}` : "";
  const link = p.liveUrl
    ? external
      ? `<a class="btn btn--outline btn--sm" href="${escapeHtml(p.liveUrl)}" target="_blank" rel="noopener">Visit ${escapeHtml(host)}</a>`
      : `<a class="btn btn--outline btn--sm" href="${escapeHtml(p.liveUrl)}">Open project</a>`
    : p.sourceUrl
      ? `<a class="btn btn--outline btn--sm" href="${escapeHtml(p.sourceUrl)}" target="_blank" rel="noopener">Source code</a>`
      : `<span class="pcard__soon">Public link coming soon</span>`;

  return `
    <li class="pcard" aria-roledescription="slide" aria-label="${i + 1} of ${projects.length}: ${escapeHtml(p.title)}">
      <div class="pcard__frame">
        <div class="pcard__browser">
          <div class="pcard__bar" aria-hidden="true"><i></i><i></i><i></i>${address ? `<span>${escapeHtml(address)}</span>` : ""}</div>
          <div class="pcard__cover">${cover}</div>
        </div>
      </div>
      <div class="pcard__body">
        <span class="pcard__label">${escapeHtml(p.status)}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        ${link}
      </div>
    </li>`;
}

// Only the home page has the projects carousel
const projects = PROJECTS;
const carousel = document.getElementById("projectCarousel");
if (carousel) {
  carousel.innerHTML = projects.length
    ? `<div class="carousel__viewport">
         <button type="button" class="carousel__arrow carousel__arrow--prev" aria-label="Previous project"><svg class="icon"><use href="#i-arrow"/></svg></button>
         <ul class="carousel__track" tabindex="0" aria-label="Projects">${projects.map(projectCard).join("")}</ul>
         <button type="button" class="carousel__arrow carousel__arrow--next" aria-label="Next project"><svg class="icon"><use href="#i-arrow"/></svg></button>
       </div>
       <div class="carousel__dots"></div>`
    : `<p class="empty">Projects will be added here soon.</p>`;
}

// ---------------------------------------------------------
// Pricing currency switch (USD / GBP), remembered per visitor
// ---------------------------------------------------------
const currencyBtns = document.querySelectorAll("[data-currency]");

function setCurrency(code) {
  document.documentElement.dataset.currency = code;
  currencyBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.currency === code)));
  try { localStorage.setItem("currency", code); } catch (e) { /* storage unavailable */ }
}

if (currencyBtns.length) {
  let saved = "usd";
  try { saved = localStorage.getItem("currency") === "gbp" ? "gbp" : "usd"; } catch (e) { /* storage unavailable */ }
  setCurrency(saved);
  currencyBtns.forEach((b) => b.addEventListener("click", () => setCurrency(b.dataset.currency)));
}

// ---------------------------------------------------------
// Floating tabs (services, pricing)
// Click, or use arrow keys / Home / End, to switch panels.
// ---------------------------------------------------------
document.querySelectorAll("[data-tabs]").forEach((group) => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];

  const list = group.querySelector('[role="tablist"]');

  function select(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
    // On phones the tab bar scrolls sideways: keep the selected tab in view
    if (list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - 8, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  }
  group.selectTab = select;

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      const keys = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      select(tabs[(keys[e.key] + tabs.length) % tabs.length], true);
    });
  });
});

// ---------------------------------------------------------
// Projects carousel: arrows, dots, swipe (native scroll-snap)
// and autoplay every 5s. Autoplay pauses on hover, keyboard
// focus, when off-screen, or via the button, and is skipped
// for visitors who prefer reduced motion.
// ---------------------------------------------------------
const track = carousel?.querySelector(".carousel__track");

if (track) {
  const cards = [...track.children];
  const dotsBox = carousel.querySelector(".carousel__dots");
  const prevBtn = carousel.querySelector(".carousel__arrow--prev");
  const nextBtn = carousel.querySelector(".carousel__arrow--next");
  const step = () => cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
  // Positions = cards that can sit at the left edge (2 visible on desktop → 5 positions for 6 cards)
  const positions = () => Math.max(1, cards.length - Math.round(track.clientWidth / step()) + 1);
  const current = () => Math.min(positions() - 1, Math.round(track.scrollLeft / step()));
  const goTo = (i) => track.scrollTo({ left: i * step(), behavior: prefersReducedMotion ? "auto" : "smooth" });

  function buildDots() {
    dotsBox.innerHTML = Array.from({ length: positions() }, (_, i) =>
      `<button type="button" class="carousel__dot" aria-label="Show project ${i + 1}"></button>`).join("");
    dotsBox.querySelectorAll("button").forEach((d, i) => d.addEventListener("click", () => goTo(i)));
    syncCarousel();
  }

  function syncCarousel() {
    const i = current(), last = positions() - 1;
    dotsBox.querySelectorAll("button").forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === last;
    dotsBox.hidden = prevBtn.hidden = nextBtn.hidden = last === 0;
  }

  prevBtn.addEventListener("click", () => goTo(current() - 1));
  nextBtn.addEventListener("click", () => goTo(current() + 1));
  track.addEventListener("scroll", () => requestAnimationFrame(syncCarousel), { passive: true });
  window.addEventListener("resize", buildDots);
  buildDots();

  if (!prefersReducedMotion && cards.length > 1) {
    let hovered = false, offscreen = false;
    carousel.addEventListener("mouseenter", () => (hovered = true));
    carousel.addEventListener("mouseleave", () => (hovered = false));
    new IntersectionObserver(([entry]) => (offscreen = !entry.isIntersecting)).observe(carousel);

    setInterval(() => {
      if (hovered || offscreen || carousel.contains(document.activeElement)) return;
      const i = current();
      goTo(i >= positions() - 1 ? 0 : i + 1);
    }, 5000);
  }
}


// ---------------------------------------------------------
// Scroll reveal
// ---------------------------------------------------------
const revealEls = document.querySelectorAll(".reveal:not(.is-visible)");
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// ---------------------------------------------------------
// Inquiry form — validates, then opens the visitor's email app
// with the message pre-filled (no backend on GitHub Pages).
// ---------------------------------------------------------
// Only the contact page has the form
const form = document.getElementById("inquiryForm");
const statusEl = document.getElementById("formStatus");
if (form) {

const RULES = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
  description: (v) => (v.trim().length >= 20 ? "" : "Please describe your project in at least 20 characters."),
};

function validateField(field) {
  const rule = RULES[field.name];
  if (!rule) return true;
  const message = rule(field.value);
  const errorEl = document.getElementById(field.getAttribute("aria-describedby"));
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (errorEl) errorEl.textContent = message;
  return !message;
}

form.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("blur", () => field.value && validateField(field));
  field.addEventListener("input", () => field.getAttribute("aria-invalid") === "true" && validateField(field));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll("[name]")].filter((f) => RULES[f.name]);
  const invalid = fields.filter((f) => !validateField(f));

  if (invalid.length) {
    statusEl.className = "form__status is-error";
    statusEl.textContent = `Please fix ${invalid.length === 1 ? "the highlighted field" : "the highlighted fields"} and try again.`;
    invalid[0].focus();
    return;
  }

  const d = Object.fromEntries(new FormData(form));
  const subject = `Project brief: ${d.type} — ${d.name.trim()}`;
  const body = [
    `Name: ${d.name.trim()}`,
    `Email: ${d.email.trim()}`,
    `Company: ${d.company.trim() || "Not specified"}`,
    `What I need: ${d.type}`,
    `Budget: ${d.budget}`,
    "",
    d.description.trim(),
  ].join("\n");

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  statusEl.className = "form__status is-info";
  statusEl.innerHTML = `Your email app should now open with your project brief ready. Press <strong>send</strong> there to deliver it. If nothing opened, email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> or call <a href="tel:+2348153978826">+234 815 397 8826</a>.`;
});
}

// ---------------------------------------------------------
// Phone-only sticky "Start a project" button.
// Appears after the first screen; hides near the contact form and footer.
// ---------------------------------------------------------
{
  const onPricing = !!document.getElementById("contact");
  const mcta = document.createElement("a");
  mcta.className = "mcta";
  mcta.href = onPricing ? "#contact" : "pricing.html#contact";
  mcta.innerHTML = `<span>Start a project</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg>`;
  document.body.appendChild(mcta);

  const blockers = new Set();
  const update = () => {
    const show = window.scrollY > window.innerHeight * 0.6 && blockers.size === 0;
    mcta.classList.toggle("is-shown", show);
    mcta.tabIndex = show ? 0 : -1;
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? blockers.add(e.target) : blockers.delete(e.target)));
      update();
    });
    document.querySelectorAll("#contact, .footer").forEach((el) => io.observe(el));
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
}

// ---------------------------------------------------------
// Footer year
// ---------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();
