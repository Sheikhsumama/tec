# TEC Level 1 — Asset manifest

Status key: **Supplied** = provided and in use · **Placeholder** = temporary, replace later · **Pending** = not yet built.

| File / item | Character or location | Used in | Status |
|---|---|---|---|
| `assets/anis.jpg` | Anis, the fennec-style companion | Onboarding, School Home panel, teacher pages, top of every Anis panel | Supplied |
| `assets/teachers/arabic.jpg` | Mr. Umar, Arabic | School Home (My teachers), teacher page | Supplied |
| `assets/teachers/english.jpg` | Mr. David, English | School Home, teacher page | Supplied |
| `assets/teachers/maths.png` | Mr. Muhammad, Mathematics | School Home, teacher page | Supplied |
| `assets/teachers/tarbiyah.jpg` | Mr. Abdul Hadi, Tarbiyah & Character (main teacher) | School Home, teacher page | Supplied |
| Mr. Jensen portrait | Computer & Technology | School Home, teacher page | **Placeholder**: a coloured disc with the initial "J", drawn in code. Replace by setting `img` for `tech` in `js/data.js`. |
| Classroom artwork (six rooms) | Classroom District | Stage 3 | Pending |
| 24 discovery world artworks | Explore the World | Stage 4 | Pending |
| Game Garden and Exploration Day artwork | Special days | Stage 5 | Pending |

## Not used

- The leather-jacket picture supplied earlier (`science.jpg`) is not in the project. It looks like a real, identifiable person, and the app is for young children.

## How to replace an image later

1. Put the new file in `assets/` (or `assets/teachers/`).
2. Change the path in `js/data.js` (teachers) or the matching data entry. No view needs rewriting.
3. Keep the same file name to avoid editing data.

## Configurable data

- Teacher names, subjects, intro lines, photos and colours: `js/data.js` → `TEC.teachers`.
- Interests: `js/data.js` → `TEC.likes`.
- Weekly routine and day types: `js/data.js` → `TEC.week`, `TEC.dayTypes`.

## Stage 3 additions

| Asset | Path | Status | Used in |
|---|---|---|---|
| Mr. David portrait | assets/teachers/english.jpg | Supplied | English Studio (front of room) |
| Mr. Umar portrait | assets/teachers/arabic.jpg | Supplied, room not built yet | Arabic Garden (later) |
| Mr. Muhammad portrait | assets/teachers/maths.png | Supplied, room not built yet | Mathematics Workshop (later) |
| Mr. Abdul Hadi portrait | assets/teachers/tarbiyah.jpg | Supplied, room not built yet | Tarbiyah Garden (later) |
| Mr. Jensen | placeholder disc (generated in code) | PLACEHOLDER, not a final portrait | Technology Laboratory (later) |
| World Discovery teacher | none | NOT CONFIRMED | World Explorer Studio (later) |
| Anis | assets/anis.jpg | Supplied | Anis panel, every classroom |
| English Studio scene | drawn in SVG in js/rooms/english.js | Original placeholder art, replaceable | English Studio walls, floor, board, desks |
| Other five room scenes | none | Not built | Later stage |
| Door signs | text and symbols in js/data.js | Placeholder | Classroom District |

Replacing a teacher portrait: put the new file in assets/teachers/ and change `img` in js/data.js.
Replacing the English room art: edit the `scene()` function in js/rooms/english.js.
Teacher assignments and room titles are configured in `TEC.classrooms` (js/data.js).

## Stage 3 (completion): the five remaining classrooms

| Asset | Where | Status |
|---|---|---|
| Arabic room scene (arches, rug, plaque, posters) | js/rooms/arabic.js `scene()` | Original placeholder art |
| Mathematics room scene (number line, clock, charts, table) | js/rooms/mathematics.js `scene()` | Original placeholder art |
| Technology lab scene (screen board, robot, charts, desks) | js/rooms/computer.js `scene()` | Original placeholder art |
| Tarbiyah room scene (window, family frames, gratitude wall, cushion) | js/rooms/tarbiyah.js `scene()` | Original placeholder art |
| World Explorer scene (stars, globe, charts) | js/rooms/world.js `scene()` | Original placeholder art |
| Mr. Umar portrait | assets/teachers/arabic.jpg | Supplied |
| Mr. Muhammad portrait | assets/teachers/maths.png | Supplied |
| Mr. Abdul Hadi portrait | assets/teachers/tarbiyah.jpg | Supplied |
| Mr. Jensen | placeholder disc (in code) | PLACEHOLDER, not a final portrait |
| World Discovery teacher | none (`teacher: null`) | NOT CONFIRMED, slot shows "Teacher to be confirmed" |
| Emoji used in charts and activities | text in the scenes and lessons | Temporary; replace with illustrated artwork later |

How to replace a room scene: edit `scene()` in the room's file; the layout and hotspot positions are shared with the frame in js/rooms/common.js.
How to change a teacher: edit `teacher` in the room file (a key from `TEC.teachers` in js/data.js), or set it to `null`.
