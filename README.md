# Abayomi Akinruli

Portfolio and digital-solutions website for **Abayomi Akinruli**. It's plain HTML, CSS and JavaScript, so it needs no build step and runs on GitHub Pages for free.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Homepage: hero, services, process and navigation |
| `about.html` | About page: introduction, capabilities and interests |
| `pricing.html` | Pricing: bundles, website packages, care plans and additional services |
| `projects.html` | Project portfolio carousel and project details |
| `styles.css` | All styling, including the light/dark theme tokens at the top |
| `script.js` | **All JavaScript**: project data, navigation, theme switch, gallery, scroll reveal and inquiry form |
| `Assets/` | Favicon, world map, Open Graph image |
| `robots.txt`, `sitemap.xml` | Search-engine discovery and crawler instructions |

## Run locally

Open `index.html` in a browser, or run a local server (recommended, so all paths behave like the live site):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

The homepage, Projects, About and Pricing pages are separate HTML files.

1. Push the repository root to the `main` branch.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**, then `main` and `/ (root)`.
4. Open the URL GitHub gives you under **Pages**.


## Adding a project

Add an entry to the `PROJECTS` array in `script.js`:

```js
{
  title: "My New Project",
  category: "professional",          // "professional" | "brand"
  status: "Professional work",       // label on the card
  sector: "Education",
  description: "What it is.",
  contribution: "What you did.",
  liveUrl: "https://…",              // leave "" to hide the button
  sourceUrl: "https://github.com/…", // leave "" to hide the button
  image: "Assets/projects/my-project.jpg", // 16:9 cover; "" shows a plain green cover
},
```

Put cover images in `Assets/projects/`; project data should use `Assets/projects/...`. A 960×540 JPG works well.

Only add links that really exist. Empty links are hidden automatically.

## Contact form

GitHub Pages has no server, so the inquiry form validates the input, then opens the visitor's email app with the message pre-filled to `abayomiakinruli@gmail.com`. Nothing is sent until the visitor presses send in their email app, and the page says so.

To receive submissions directly instead, connect a form service such as Formspree:
1. Create a free form at formspree.io. It gives you a public endpoint like `https://formspree.io/f/xxxxxxx`. That ID is safe to expose; it is not a secret.
2. In `script.js`, replace the `mailto:` step in the submit handler with a `fetch` POST to that endpoint, and show success only when the response is OK.
3. Turn on Formspree's spam protection (reCAPTCHA or honeypot).

Never put API keys, exchange keys or email-service passwords in these files. Everything here is public.
