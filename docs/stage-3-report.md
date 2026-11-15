# Stage 3 report: Classroom District and the six classrooms

## What was built
- **Classroom District** (#/district): a corridor with six doors. Each door shows the room title, subject, assigned teacher and symbol. All six open.
- **Six classrooms**, each with its own scene, layout, wall charts, board and lessons. Each lives in its own file in `js/rooms/`:

| Room (district title) | File | Teacher (from data.js) | Scene and board | Lessons (3–4 each) |
|---|---|---|---|---|
| English Studio | js/rooms/english.js | Mr. David | Wooden classroom, chalkboard, alphabet/vowel/picture-word charts | Letter A (pick), letter B (pick), letter C (pick) |
| Arabic Garden | js/rooms/arabic.js | Mr. Umar | Cream and gold room, arched windows, rug, lantern-free calligraphy plaque, Arabic alphabet and greetings posters | Alif, Ba, "Hello" (السلام عليكم), "Thank you" (شكراً) |
| Mathematics Workshop | js/rooms/mathematics.js | Mr. Muhammad | Bright blue and green room, number line 0–10 on the back wall, clock, shape and number charts, counting table | Add (3 + 2 apples, count by tapping), Shapes (find the circle), Pattern (red, blue, red, blue, next) |
| Technology Laboratory | js/rooms/computer.js | Mr. Jensen (placeholder portrait) | Dark blue lab, the large screen is the board, robot on a shelf, keyboard/mouse chart, sequence chart | Parts (find the mouse), Cause and effect (press the button, the light comes on), Order (plug in, press start, robot waves) |
| Tarbiyah Garden | js/rooms/tarbiyah.js | Mr. Abdul Hadi | Peach room, window with a tree, family frames, gratitude wall, sharing cushion, plant | Sharing (two toys, none for a friend), Thank you, Honesty (the broken cup) |
| World Explorer Studio | js/rooms/world.js | **None confirmed** (neutral placeholder shown) | Night-sky room with stars, globe, planets and animals charts | Land and water, Animal homes, Sun and Moon |

- **Shared renderer** (`js/views/classroom.js`): draws the scene, hotspots, board, teacher and activities from the room file. Lessons either use the default "tap the right object" activity or their own `render()` function. Progress is saved per room.
- **Shared perspective helpers** (`js/rooms/common.js`): one 1200 × 675 frame, so all six rooms share the same geometry but differ in colour, furniture and charts.
- **Board**: changes with each lesson, shows text, numbers, shapes or pictures, and is tappable to hear its content. Some lessons update the board during the activity (for example "3 + 2 = 5").
- **Wall charts**: each opens a closer view. Tapping a picture speaks it, and Arabic items are spoken with the Arabic language setting.
- **School Home**: the "My classrooms" card links to the District.

## What works (tested)
- All six rooms load at 1280 px and 390 px wide, with no horizontal overflow and no console errors.
- Every room has three wall hotspots, and each opens its dialog.
- Lesson navigation (next, previous, board tap, hint) works in every room.
- Activities tested:
  - Arabic: choosing the lion (alif) is saved.
  - Mathematics: adding apples shows 3 + 2, counting all five marks the total done, and the shape lesson saves.
  - Technology: pressing the button turns the lamp on; choosing step 2 first is refused; steps 1, 2, 3 in order update the board.
  - Tarbiyah: the sharing choice is saved.
  - World: the water choice is saved, and the teacher placeholder is shown.
- Progress survives a page reload.

## What remains incomplete or provisional
- **Room art is original simple SVG**, not final illustration. It is designed to be replaced (see the manifest).
- **Mr. Jensen's portrait is a placeholder disc.** It must not be used as his final portrait.
- **World Explorer Studio has no confirmed teacher.** Its teacher slot is empty and configurable (`teacher: null`). No teacher is invented.
- **Anis and teacher replies are scripted.** No AI or ElevenLabs connection is active. Speech uses the browser voice as a temporary fallback.
- **Arabic pronunciation** depends on whether the browser has an Arabic voice. If it does not, the spoken sound will be missing or wrong. Arabic letter names are taught as scripted content and should be checked by a qualified Arabic teacher.
- **Tarbiyah and World Discovery** are proposed learning areas. Their compulsory status is not declared final.
- **Room names**: the District uses the names already shown in Stage 3 (Arabic Garden, Mathematics Workshop, Technology Laboratory, Tarbiyah Garden, World Explorer Studio). The completion spec uses longer names (Arabic Classroom, Mathematics Classroom, Computer & Technology Lab, Tarbiyah & Character Room, World Discovery Room). They can be changed in `TEC.classrooms` in `js/data.js`.
- **Mobile**: the room scales with its frame (it does not shrink the desktop layout). Hotspot labels may be small on very narrow screens.
- No screen-time, video, internet or social features are used. There are no marks, percentages, leaderboards or timers.

## How to run
Open `index.html` in a browser, or upload the folder to a static host (for example Netlify). There is no build step.

## Files changed in this stage
- New: `js/rooms/common.js`, `js/rooms/arabic.js`, `js/rooms/mathematics.js`, `js/rooms/computer.js`, `js/rooms/tarbiyah.js`, `js/rooms/world.js`, `js/views/district.js`, `js/views/classroom.js`, `js/rooms/english.js`
- Changed: `js/data.js` (rooms ready), `js/anis.js` (speech language), `js/store.js` (progress), `js/router.js` (routes), `js/views/home.js` (My classrooms card), `css/app.css` (room and board styles), `index.html` (script tags), `docs/asset-manifest.md`, `docs/stage-3-report.md`.
