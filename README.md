# FIN 295 Final Study Studio

An interactive, source-disciplined finance final-exam study website for Chapters 7-11.

## Run

Open `index.html` in a browser. No build step is required.

Math typesetting uses MathJax from a CDN, so formulas render best with an internet connection. The app itself is static HTML, CSS, and JavaScript.

## Stack Rationale

I used a dependency-free static web app because Node/npm is not installed in this workspace. Plain HTML/CSS/JS keeps the project fast, portable, and easy to run by opening one file, while MathJax provides proper formula rendering. State such as dark mode, quiz progress, generated tests, timer settings, and flashcard position is persisted in `localStorage`.

## Features

- Persistent navigation: Home, Sample Test, Generate New Test, Formula Sheet, Study Tools.
- Interactive original sample final with one-question-at-a-time flow.
- Incorrect selections are marked wrong while the question remains open.
- Correct selections reveal worked solutions with formula links and source tags.
- Generated practice test mirrors the sample final's topic mix and difficulty.
- Formula sheet with typeset formulas, variable definitions, use cases, and worked examples.
- BAII Plus-style calculator with TVM storage keys, `CPT`, `CE/C`, `2nd CLR TVM`, arithmetic, and sign change.
- Configurable Pomodoro timer with local persistence and audio cue.
- Dark mode, flashcards, and progress dashboard.

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
