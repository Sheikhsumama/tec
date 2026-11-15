# TEC Level 1 — Stage 1 and Stage 2 report

## Stage 1: foundation repair

**Inspected:** the single-file prototype (`index.html`), its images, the Cloudflare voice function (`functions/api/speak.js`), the voice configuration (`config/anis-voice.json`), and the earlier onboarding spec.

**Repaired**
- The selected-world chip referenced a property that no longer existed, so tapping a chosen world could fail. It now makes Anis speak the matching line.
- The theme choice and student state now load safely: a blocked or private browser no longer breaks the page.
- The dashboard was fixed to the screen height and hid content on small screens. Pages now scroll when they need to.
- The student could not change their name, age or interests after onboarding. The new **Edit my details** page changes all three and saves immediately.
- Screen-reader and keyboard support: buttons and inputs have labels, focus is visible, and motion is reduced when the device asks for it.
- The weekly calendar was checked: Monday to Friday are learning days, Saturday is Game Day and Sunday is Explore Day. Today is highlighted from the device clock.

**Restructured** (the single file is now separate modules):
- `css/app.css` — styles and theme tokens
- `js/data.js` — teachers, interests, week, placeholders
- `js/store.js` — student state (same storage key as before, so saved students still enter)
- `js/anis.js` — Anis voice, typing and the interaction panel
- `js/views/` — onboarding, School Home, teacher page, Edit my details
- `js/router.js` — one-page navigation through `#/` routes
- `js/app.js` — theme and start-up

## Stage 2: School Home and Anis

**Completed**
- **Onboarding:** Anis introduces himself, asks for the name, the age (2, 3 or 4) and the interests, with no maximum on interests. It resumes where the child left off.
- **School Home:** a greeting with the child's name, today's day type, the weekly routine, the five teachers, My worlds, and the two special days.
- **Anis interaction:** tap Anis to hear him, or pick a suggestion, or type a question. A microphone button appears only if the browser supports speech recognition. Every reply is marked as **demo mode**.
- **Teacher pages:** each teacher has a page with a photo, name, subject and an introduction that Anis speaks. There are listen-again, previous and next controls.
- **Navigation:** every destination is a view in one page. Back, home and teacher-to-teacher navigation all work without reloading. Unknown or out-of-order routes redirect to a sensible page.
- **Persistence:** name, age, interests and theme survive a reload. A new student is sent to onboarding.

**Not in this stage (by design)**
- The Classroom District, with its six rooms and "visit classroom" buttons (Stage 3).
- The 24 worlds (Stage 4). Interests are the four options from the prototype.
- Game Garden and Exploration Day are listed as **opening in a later update**. They are not clickable.

## Known limitations
- Anis's replies are scripted. There is no AI conversation, and no AI key is in the code.
- Speech uses the browser's voice. The ElevenLabs voice needs a server function on the host, which is not connected yet.
- Student data lives in each browser only. Nothing is sent to a server.
- Teacher personalities are not written yet, because the spec's descriptions are not confirmed. Only names, subjects and intro lines are shown.
- Mr. Jensen's portrait is a placeholder.
- Phone layout was tested at 390 pixels wide; tablets were not tested separately.

## Testing performed (automated, headless Chromium)
- New student: redirected to onboarding, then name, age and interest steps, then School Home. Passed.
- School Home shows the greeting, interests and five teachers. Passed.
- Anis's suggestion gives the scripted teacher reply and is labelled demo. Passed.
- Teacher page opens without reloading, keeps the page state, and its Next teacher link works. Passed.
- Back to School Home works. Passed.
- Edit my details: name change is shown on School Home. Passed.
- Light/dark toggle works and persists. Passed.
- Reload keeps name and theme. Passed.
- Phone width (390 pixels): no horizontal scrolling. Passed.
- No JavaScript errors in the console during the run. Passed.

## Running the project
Open `index.html` in a browser (double-click it). No server or install is needed. To reset, clear this site's stored data in the browser, or use a private window.
