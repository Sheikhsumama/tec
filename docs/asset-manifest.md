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
