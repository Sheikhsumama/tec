# Stage 3 report: Classroom District and English Studio

## What was built
- **Classroom District** (#/district): a corridor with six doors, each with its title, subject and assigned teacher. Only English Studio opens. The other five show "Opens in a later update" and do not open.
- **English Studio** (#/class/english), the reference classroom:
  - Drawn in perspective: ceiling, left and right walls, back wall with window and chalkboard, floor, desks, plant. Mr. David stands at the front.
  - **Functional board**: shows the current lesson (letter, picture, word). Tap the board to hear the sound and word. Next/previous lesson changes the board and the desk objects.
  - **Wall charts** (three hotspots): alphabet chart and vowel chart (left wall), picture word chart (right wall). Each opens a panel; tapping a picture speaks the word.
  - **Desk activity**: three lessons (A, B, C). Tapping the correct object confirms it and saves progress. Tapping a wrong object gives a gentle "try another" response. No marks, percentages, timers or exams.
  - **Ask Anis for a hint**: scripted hint for the current lesson.
  - **Navigation**: the top bar always shows the room name, "← Classroom District" and "School Home".
- **School Home**: new "My classrooms" card linking to the District.
- **Progress**: stored per room in the student's record (`progress.english`), so lesson and completed objects survive a reload.

## Tested (headless Chromium, desktop 1280px and phone 390px)
- District shows six doors; only English links out.
- English room: three hotspots, four desk tiles, wall-chart dialog opens and closes.
- A correct object is saved after tapping; the board advances with "next".
- Back to District works; School Home shows the classrooms card.
- No horizontal overflow at 390px. No console errors.
- Visual check of both screens by screenshot.

## Not done yet (honest status)
- Arabic Garden, Mathematics Workshop, Technology Laboratory, Tarbiyah Garden and World Explorer Studio are not built. They are listed in the District and marked "later".
- The English room art is original, simple SVG. It is a quality standard placeholder, not final illustration.
- Teacher personalities and voices are not invented. Lines shown are the introductions only.
- Anis and teacher replies are scripted. No AI or ElevenLabs connection is active.
- Speech uses the browser voice (speechSynthesis) as a temporary fallback.
- World Discovery has no confirmed teacher. Tarbiyah and World Discovery are proposed learning areas, not confirmed compulsory subjects.
- Mr. Jensen uses a placeholder disc, not a final portrait.

## How to run
Open `index.html` in a browser (works from a file, or upload the folder to any static host such as Netlify). No build step.

## Files changed in this stage
- js/data.js (TEC.classrooms), js/store.js (progress), js/router.js (district and class views), js/views/home.js (My classrooms card)
- js/views/district.js, js/views/classroom.js, js/rooms/english.js (new)
- css/app.css (Stage 3 section), index.html (script tags)
- docs/asset-manifest.md (Stage 3 section), docs/stage-3-report.md (this file)

## Next step
Stage 3 continues with the five remaining rooms, each with its own scene and layout, then integration testing.
