# FIN 295 Final Study Studio

An interactive, source-disciplined finance final-exam study website for Chapters 7-11.

## Run

Open `index.html` in a browser. No build step is required.

Math typesetting uses MathJax from a CDN, so formulas render best with an internet connection. The app itself is static HTML, CSS, and JavaScript.

## Host for peers (GitHub, Vercel, Netlify)

The project is a **static site** (no server). Push the repo to GitHub, then:

- **GitHub Pages**: Repository Settings → Pages → Build from branch `main`, folder `/` (root), or publish the `main` branch and set the Pages source to the root. Share the `*.github.io` URL.
- **Vercel / Netlify**: Import the GitHub repo, leave defaults (no framework; publish directory `.`). You get an HTTPS URL you can share with classmates.

Do not embed secret API keys; generated exams are assembled in the browser from local question data.

## Stack Rationale

This is a dependency-free static web app (HTML, CSS, vanilla JavaScript) instead of React + Vite + Tailwind so it runs anywhere with zero install: open one file locally or deploy the folder as-is. MathJax provides formula rendering comparable to KaTeX for this use case. State such as dark mode, quiz progress, wrong-answer markers, chapter filter, generated tests, timer settings, and flashcard position is persisted in `localStorage`.

## Features

- Persistent navigation: Home, Sample Test, Generate New Test, Formula Sheet, Study Tools.
- Interactive original sample final with one-question-at-a-time flow.
- Incorrect selections are marked wrong while the question remains open.
- Correct selections reveal worked solutions with formula links and source tags.
- Generated practice test mirrors the sample final's topic mix and difficulty.
- Formula sheet with typeset formulas, variable definitions, use cases, and worked examples.
- BAII Plus-style calculator with TVM storage keys, `CPT`, `CE/C`, `2nd CLR TVM`, arithmetic, and sign change.
- Configurable Pomodoro timer with local persistence and audio cue.
- Dark mode, flashcards, chapter-filtered drills (sample final), and a per-chapter progress dashboard.

## Source Mapping

- Chapter 7 PowerPoint: bond features, bond pricing, semiannual bonds, callable bonds, YTC.
- Chapter 8 PowerPoint: expected return, standard deviation, market/diversifiable risk, beta, CAPM/SML.
- Chapter 9 PowerPoint and Chapter 9 notes: classified stock, constant growth model, dividend yield, capital gains yield, preferred stock.
- Chapter 10 PowerPoint and notes: WACC, component costs, CAPM cost of equity, preferred stock cost.
- Chapter 11 PowerPoint: NPV, IRR, payback, capital budgeting accept/reject rules.
- FIN 295 Final Formula document: formulas for TVM, TATO, stock returns, CAPM, WACC, preferred stock, and capital budgeting.
- FIN 295 Sample Final: original 22-question quiz structure, answer choices, and difficulty.

## Assumptions

- The sample final includes a few review items from earlier formula-sheet chapters, so those are included only where they appear in the sample final.
- Generated questions keep the same exam structure and use formulas/examples from the supplied materials; conceptual questions are mirrored from the original sample final rather than expanded beyond the course sources.
- Because this is a static app, generated questions are produced in the browser and saved locally.
