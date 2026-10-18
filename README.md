# CreatorDesk V2 — AI YouTube Shorts Studio

> A fast, zero-dependency, responsive web studio for planning, drafting, and producing viral YouTube Shorts. Features a 100% client-side, offline local generation engine with multi-language support (English, Hindi, Hinglish), scene-by-scene script timing, psychological title angles, description & tags generator, thumbnail prompts, and a visual content calendar.

![Version](https://img.shields.io/badge/version-2.0.0-red.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-success.svg)
![Hosting](https://img.shields.io/badge/hosting-GitHub%20Pages%20Ready-brightgreen.svg)

---

## 🌟 Features at a Glance

- 📊 **Creator Dashboard**: Live metrics for Total Ideas, Ready to Produce, In Editing, Ready to Publish, and Published videos. Includes an upcoming schedule with automatic **Overdue** alerts.
- 💡 **Creator Idea Lab**: Brainstorm Short concepts across 8 niches (Gaming, Free Fire/BGMI, AI & Tech, Finance, Education, Entertainment, Fitness, Custom). Supports **English**, **Hindi (हिंदी)**, and **Hinglish**.
- 🔤 **YouTube Title Studio**: Crafts high-CTR titles broken down by psychological angle (Curiosity, Authority, Hype, Humor, Suspense) with 1-click clipboard copy and idea attachment.
- 📝 **Description & SEO Generator**: High-retention opening hooks, full descriptions, curated hashtags (`#Shorts`), YouTube Studio tags box, and pinned comment drafts.
- ⏱️ **Hook & Short Script Studio**: Generates realistic spoken-paced scene scripts for **15s (~40 words)**, **30s (~80 words)**, and **60s (~145 words)** Shorts with visual directions and on-screen text overlays.
- 🎨 **Thumbnail Concept Studio**: Visual composition, lighting/color schemes, and ready-to-copy prompts formatted for Midjourney, Stable Diffusion, DALL-E, and Flux.
- 🛠️ **Idea Production Workspace**: Track each Short through the production workflow pipeline:
  $$\text{Idea} \longrightarrow \text{Script Ready} \longrightarrow \text{Editing} \longrightarrow \text{Thumbnail Ready} \longrightarrow \text{Ready to Publish} \longrightarrow \text{Published}$$
- 📅 **Content Calendar**: Interactive monthly calendar grid mapping scheduled Shorts with overdue warnings.
- 💾 **100% Client-Side & JSON Backup**: Saved in browser `localStorage`. Includes 1-click JSON backup export and restore.
- 🆓 **Zero Paid APIs**: Uses a built-in, offline, client-side template generator. No billing, no accounts, no subscriptions.

---

## 🚀 Quick Start (Local)

Because CreatorDesk is built with pure web technologies, no build tools, Node.js, or package installations are required:

```bash
# Clone the repository
git clone https://github.com/<your-username>/creatordesk.git
cd creatordesk

# Start any local HTTP server (e.g. Python)
python3 -m http.server 3000
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🌐 Free 1-Click Deployment (GitHub Pages)

You can host CreatorDesk for free with GitHub Pages:

1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**.
5. Your live app will be published instantly at:  
   `https://<your-username>.github.io/creatordesk/`

---

## 🧪 Testing

Open the built-in test runner at:  
`http://localhost:3000/test-runner.html`

Or execute the automated CLI test suite:
```bash
python3 test_app.py
```

---

## 📁 Project Structure

```
creatordesk/
├── index.html            # Main Studio layout & views
├── styles.css            # Dark-theme creator design system & responsive rules
├── app.js                # Core state, workflow pipeline, calendar, and storage logic
├── generator-engine.js   # Local multi-language generation engine (EN, HI, Hinglish)
├── test-runner.html      # In-browser test runner interface
├── test-suite.js         # In-browser test assertions (17 tests)
└── test_app.py           # Python CLI automated test suite
```

---

## 📄 License

MIT License. Free to use, modify, and distribute.
