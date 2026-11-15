# TEC World: asset manifest

Generated from the same data as `js/world/asset-manifest.js`. Edit the data there, not this file.

Status: planning only. No world artwork is drawn in code. Placeholders are shown only as clearly marked outlines and are never presented as final art. The overview is not finalised until Batch 1 artwork arrives.

## Global rules

- **Format:** WebP with alpha (`webp`). Keep the source PNG where possible so files can be re-exported.
- **Size:** supply each file at **2× the world size** (retina). World size = pixel size ÷ 2. Long edge maximum 2048 px.
- **Transparency:** real soft alpha for every file except `ocean-tile`, which is opaque and seamless. No baked background, and no drop shadows except the separate `shadow-*` files.
- **Anchor:** buildings anchor at the **bottom centre** of their footprint. Terrain, shadows, bridges, backdrops and effects anchor at their **centre**.
- **Positions:** world units on a 1600 × 900 canvas, origin top-left. Where a position is marked *estimated*, it was read from the master map and is confirmed in Phase B.
- **Animation:** anything that moves or glows is its own file (never baked into the base building). Trunk and canopy are separate.
- **Light:** upper-left light direction and one palette, taken from the master map.
- **People:** no real or identifiable people in any asset.
- **Naming:** lower-case, hyphens, exactly the file name shown below.
- **Replacement:** replace a file with the same name and the world updates with no code change.

## Folder structure

```
assets/world/
  islands/      terrain and shadow files (6 + 6)
  buildings/    one file per building or landmark
  bridges/      four bridge spans
  paths/        Growth Walk and campus path pieces
  nature/       trees, bushes, flowers, rocks, lamps, benches, backdrop
  animated/     separate glow, sway and flow layers
  wildlife/     clouds, boats, balloon, gulls
  ocean/        ocean tile and foam edge
  ui/           title plate, compass rose, scroll banner
```

## Batch 1: complete world overview (needed first)

| ID | File | Px (w×h) | World (w×h) | Aspect | Transparent | Animated | Anchor | Position(s) (world x,y) | Use |
|---|---|---|---|---|---|---|---|---|---|
| `terrain-heartland` | `islands/heartland.webp` | 760×600 | 380×300 | 1.267 | yes | no | centre | (800, 330) | Heartland central island terrain and coastline (home) |
| `terrain-learning-quarter` | `islands/learning-quarter.webp` | 1120×640 | 560×320 | 1.75 | yes | no | centre | (400, 220) | Learning Quarter terrain, campus terraces, Knowledge Bridge landing |
| `terrain-discovery-isles` | `islands/discovery-isles.webp` | 1040×640 | 520×320 | 1.625 | yes | no | centre | (1235, 220) | Discovery Isles terrain with two cliffs and waterfall edges |
| `terrain-game-garden` | `islands/game-garden.webp` | 1040×660 | 520×330 | 1.576 | yes | no | centre | (280, 515) | Game Garden terrain, courtyard ground, Play Bridge landing |
| `terrain-exploration-valley` | `islands/exploration-valley.webp` | 1120×680 | 560×340 | 1.647 | yes | no | centre | (1280, 515) | Exploration Valley terrain, valley floor and gorge edge |
| `terrain-growth-garden` | `islands/growth-garden.webp` | 1040×560 | 520×280 | 1.857 | yes | no | centre | (800, 745) | Growth Garden round island, central ring, Growth Walk landing |
| `shadow-heartland` | `islands/shadow-heartland.webp` | 760×600 | 380×300 | 1.267 | yes | no | centre | (800, 330) | Contact shadow under Heartland |
| `shadow-learning-quarter` | `islands/shadow-learning-quarter.webp` | 1120×640 | 560×320 | 1.75 | yes | no | centre | (400, 220) | Contact shadow under Learning Quarter |
| `shadow-discovery-isles` | `islands/shadow-discovery-isles.webp` | 1040×640 | 520×320 | 1.625 | yes | no | centre | (1235, 220) | Contact shadow under Discovery Isles |
| `shadow-game-garden` | `islands/shadow-game-garden.webp` | 1040×660 | 520×330 | 1.576 | yes | no | centre | (280, 515) | Contact shadow under Game Garden |
| `shadow-exploration-valley` | `islands/shadow-exploration-valley.webp` | 1120×680 | 560×340 | 1.647 | yes | no | centre | (1280, 515) | Contact shadow under Exploration Valley |
| `shadow-growth-garden` | `islands/shadow-growth-garden.webp` | 1040×560 | 520×280 | 1.857 | yes | no | centre | (800, 745) | Contact shadow under Growth Garden |
| `ocean-tile` | `ocean/ocean-tile.webp` | 512×512 | 256×256 | 1 | no (opaque) | yes: ocean-drift | centre | (800, 450) | Seamless water tile repeated across the whole world (opaque) |
| `foam-edge` | `ocean/foam-edge.webp` | 256×64 | 128×32 | 4 | yes | yes: foam-pulse | centre | (800, 450) | Shoreline foam strip, repeated along coastlines by code |
| `tec-academy` | `buildings/tec-academy.webp` | 760×620 | 380×310 | 1.226 | yes | yes: window-glow | bottom-centre | (804, 316) | TEC Academy, main castle of Heartland |
| `compass-tower` | `buildings/compass-tower.webp` | 280×640 | 140×320 | 0.438 | yes | yes: beacon-glow | bottom-centre | (800, 250) | Compass Tower, behind the academy |
| `anis-home` | `buildings/anis-home.webp` | 300×240 | 150×120 | 1.25 | yes | yes: window-glow | bottom-centre | (660, 306) | Anis's Home cottage |
| `world-map-pavilion` | `buildings/world-map-pavilion.webp` | 320×260 | 160×130 | 1.231 | yes | yes: globe-glow | bottom-centre | (935, 316) | World Map Pavilion (globe dome) |
| `welcome-plaza-fountain` | `buildings/welcome-plaza-fountain.webp` | 220×200 | 110×100 | 1.1 | yes | no | bottom-centre | (800, 352) | Welcome Plaza fountain (water particles are code) |
| `bridge-knowledge` | `bridges/knowledge-bridge.webp` | 480×200 | 240×100 | 2.4 | yes | no | centre | (545, 250) (655, 265) | Knowledge Bridge, Heartland to Learning Quarter (span stretched between the two points) |
| `bridge-curiosity` | `bridges/curiosity-bridge.webp` | 480×200 | 240×100 | 2.4 | yes | no | centre | (965, 258) (1090, 245) | Curiosity Bridge, Heartland to Discovery Isles |
| `bridge-play` | `bridges/play-bridge.webp` | 440×200 | 220×100 | 2.2 | yes | no | centre | (460, 440) (612, 411) | Play Bridge, Heartland to Game Garden |
| `bridge-wonder` | `bridges/wonder-bridge.webp` | 480×220 | 240×110 | 2.182 | yes | no | centre | (976, 421) (1100, 450) | Wonder Bridge, Heartland to Exploration Valley (sags slightly) |
| `growth-walk-segment` | `paths/growth-walk-segment.webp` | 200×120 | 100×60 | 1.667 | yes | no | centre | (794, 510) | Growth Walk stone path, tiled between Heartland and Growth Garden (x 794, y 450 to 565) |
| `growth-walk-end` | `paths/growth-walk-end.webp` | 240×160 | 120×80 | 1.5 | yes | no | centre | (794, 575) | Growth Walk landing at Growth Garden |
| `growth-tree` | `buildings/growth-tree.webp` | 460×480 | 230×240 | 0.958 | yes | yes: growth-canopy-sway | bottom-centre | (800, 600) | Growth tree, central landmark of Growth Garden |
| `islet-1` | `nature/islet-1.webp` | 200×120 | 100×60 | 1.667 | yes | no | centre | (80, 290) | Small islet, north-west ocean |
| `islet-2` | `nature/islet-2.webp` | 200×120 | 100×60 | 1.667 | yes | no | centre | (1510, 200) | Small islet, north-east ocean |
| `islet-3` | `nature/islet-3.webp` | 200×120 | 100×60 | 1.667 | yes | no | centre | (1530, 300) (60, 640) (1560, 640) | Small islets, east and south ocean (may use islet-1 or islet-2 instead) |
| `mountains-backdrop` | `nature/mountains-backdrop.webp` | 1800×360 | 900×180 | 5 | yes | no | centre | (800, 80) | Mountain range behind the islands, along the top edge |

## Batch 2: Learning Quarter detail

| ID | File | Px (w×h) | World (w×h) | Aspect | Transparent | Animated | Anchor | Position(s) (world x,y) | Use |
|---|---|---|---|---|---|---|---|---|---|
| `bld-english-studio` | `buildings/english-studio.webp` | 300×260 | 150×130 | 1.154 | yes | yes: window-glow | bottom-centre | (260, 205) | English Studio, red-brick building |
| `bld-arabic-classroom` | `buildings/arabic-classroom.webp` | 300×280 | 150×140 | 1.071 | yes | yes: window-glow | bottom-centre | (350, 180) *est.* | Arabic Classroom, gold domes and arches (estimated position) |
| `bld-mathematics-workshop` | `buildings/mathematics-workshop.webp` | 300×260 | 150×130 | 1.154 | yes | yes: window-glow | bottom-centre | (430, 200) *est.* | Mathematics Workshop, colourful building with clock (estimated position) |
| `bld-technology-lab` | `buildings/technology-lab.webp` | 300×260 | 150×130 | 1.154 | yes | yes: window-glow | bottom-centre | (510, 175) *est.* | Computer & Technology Lab, modern building (estimated position) |
| `bld-tarbiyah-house` | `buildings/tarbiyah-house.webp` | 280×240 | 140×120 | 1.167 | yes | yes: window-glow | bottom-centre | (575, 205) *est.* | Tarbiyah & Character House, cottage with garden (estimated position) |
| `bld-world-discovery-centre` | `buildings/world-discovery-centre.webp` | 300×280 | 150×140 | 1.071 | yes | yes: window-glow | bottom-centre | (440, 140) *est.* | World Discovery Centre, observatory dome (estimated position, back row) |
| `campus-gate` | `buildings/campus-gate.webp` | 260×200 | 130×100 | 1.3 | yes | no | bottom-centre | (560, 300) *est.* | Campus entrance gate at the Knowledge Bridge landing (estimated) |
| `campus-path-tile` | `paths/campus-path-tile.webp` | 128×128 | 64×64 | 1 | yes | no | centre | (400, 260) | Seamless campus path tile, tiled across Learning Quarter |

## Batch 3: other island landmarks

| ID | File | Px (w×h) | World (w×h) | Aspect | Transparent | Animated | Anchor | Position(s) (world x,y) | Use |
|---|---|---|---|---|---|---|---|---|---|
| `discovery-globe` | `buildings/discovery-globe.webp` | 420×380 | 210×190 | 1.105 | yes | yes: globe-glow | bottom-centre | (1190, 140) *est.* | Globe observatory, central landmark of Discovery Isles (estimated) |
| `cluster-pavilion-a` | `buildings/cluster-pavilion-a.webp` | 180×160 | 90×80 | 1.125 | yes | no | bottom-centre | (1110, 200) (1270, 200) (1150, 260) | Cluster pavilion, three of six clusters (shared base) |
| `cluster-pavilion-b` | `buildings/cluster-pavilion-b.webp` | 180×160 | 90×80 | 1.125 | yes | no | bottom-centre | (1190, 210) (1240, 265) (1320, 255) | Cluster pavilion, other three clusters (shared base) |
| `chess-courtyard` | `buildings/chess-courtyard.webp` | 460×340 | 230×170 | 1.353 | yes | no | bottom-centre | (185, 420) *est.* | Giant chess courtyard, Game Garden (estimated) |
| `puzzle-pavilion` | `buildings/puzzle-pavilion.webp` | 240×240 | 120×120 | 1 | yes | no | bottom-centre | (285, 395) *est.* | Puzzle Pavilion, Game Garden (estimated) |
| `matching-garden` | `buildings/matching-garden.webp` | 260×180 | 130×90 | 1.444 | yes | yes: flower-sway | bottom-centre | (300, 500) *est.* | Matching Games Garden (estimated) |
| `block-workshop` | `buildings/block-workshop.webp` | 280×260 | 140×130 | 1.077 | yes | no | bottom-centre | (365, 430) *est.* | Building-Block Workshop, giant cube (estimated) |
| `story-area` | `buildings/story-area.webp` | 260×240 | 130×120 | 1.083 | yes | yes: lantern-glow | bottom-centre | (230, 500) *est.* | Story and Memory Games Area (estimated) |
| `botanical-glasshouse` | `buildings/botanical-glasshouse.webp` | 360×280 | 180×140 | 1.286 | yes | yes: window-glow | bottom-centre | (1290, 480) *est.* | Botanical Gardens glasshouse, Exploration Valley (estimated) |
| `animal-area` | `buildings/animal-area.webp` | 300×220 | 150×110 | 1.364 | yes | no | bottom-centre | (1420, 470) *est.* | Animal Observation Area enclosure (estimated) |
| `weather-station` | `buildings/weather-station.webp` | 200×300 | 100×150 | 0.667 | yes | yes: vane-turn | bottom-centre | (1180, 430) *est.* | Water and Weather Station tower (estimated) |
| `trail-head` | `buildings/trail-head.webp` | 160×160 | 80×80 | 1 | yes | no | bottom-centre | (1200, 520) *est.* | Nature Trails sign (estimated) |
| `miniature-landscape` | `buildings/miniature-landscape.webp` | 300×220 | 150×110 | 1.364 | yes | no | bottom-centre | (1350, 540) *est.* | Miniature Geography Landscape diorama (estimated) |
| `observation-pavilion` | `buildings/observation-pavilion.webp` | 220×220 | 110×110 | 1 | yes | no | bottom-centre | (1240, 380) *est.* | Outdoor Observation Pavilion with telescope (estimated) |
| `growth-lanterns` | `buildings/growth-lanterns.webp` | 160×200 | 80×100 | 0.8 | yes | yes: lantern-glow | bottom-centre | (880, 690) *est.* | Achievement lanterns, Growth Garden (no marks shown) |
| `kindness-bench` | `buildings/kindness-bench.webp` | 200×140 | 100×70 | 1.429 | yes | no | bottom-centre | (700, 700) *est.* | Kindness bench with heart stones, Growth Garden |
| `plot-set` | `nature/plot-set.webp` | 200×160 | 100×80 | 1.25 | yes | no | bottom-centre | (740, 760) (880, 760) | Personal learning garden plots, Growth Garden (shared) |

## Batch 4: animation layers and wildlife

| ID | File | Px (w×h) | World (w×h) | Aspect | Transparent | Animated | Anchor | Position(s) (world x,y) | Use |
|---|---|---|---|---|---|---|---|---|---|
| `waterfall-strip` | `animated/waterfall-strip.webp` | 80×320 | 40×160 | 0.25 | yes | yes: waterfall-flow | centre | (1490, 260) (1150, 570) (400, 600) | Waterfall loop, at three sites (Discovery, Exploration, Game Garden) |
| `growth-tree-canopy` | `animated/growth-tree-canopy.webp` | 460×320 | 230×160 | 1.438 | yes | yes: growth-canopy-sway | bottom-centre | (800, 600) | Growth tree canopy, separate from the trunk, sways and glows |
| `beacon-glow` | `animated/beacon-glow.webp` | 120×120 | 60×60 | 1 | yes | yes: beacon-glow | centre | (800, 190) | Compass Tower beacon overlay (pulses) |
| `globe-glow` | `animated/globe-glow.webp` | 200×200 | 100×100 | 1 | yes | yes: globe-glow | centre | (935, 290) (1190, 140) *est.* | Globe glow overlay, World Map Pavilion and Discovery globe |
| `window-glow-heartland` | `animated/window-glow-heartland.webp` | 760×620 | 380×310 | 1.226 | yes | yes: window-glow | bottom-centre | (804, 316) *est.* | Window light overlay for TEC Academy (same footprint as the building) |
| `window-glow-learning-quarter` | `animated/window-glow-learning-quarter.webp` | 1120×640 | 560×320 | 1.75 | yes | yes: window-glow | centre | (400, 220) *est.* | Window light overlay, Learning Quarter buildings (one sheet, same footprint as the island) |
| `cloud-1` | `wildlife/cloud-1.webp` | 320×150 | 160×75 | 2.133 | yes | yes: cloud-drift | centre | (150, 120) | Cloud, drifts slowly (four variants: cloud-1 to cloud-4) |
| `cloud-2` | `wildlife/cloud-2.webp` | 320×150 | 160×75 | 2.133 | yes | yes: cloud-drift | centre | (1450, 140) | Cloud, drifts slowly |
| `cloud-3` | `wildlife/cloud-3.webp` | 320×150 | 160×75 | 2.133 | yes | yes: cloud-drift | centre | (1500, 760) | Cloud, drifts slowly |
| `cloud-4` | `wildlife/cloud-4.webp` | 320×150 | 160×75 | 2.133 | yes | yes: cloud-drift | centre | (120, 800) | Cloud, drifts slowly |
| `boat-sail` | `wildlife/boat-sail.webp` | 120×80 | 60×40 | 1.5 | yes | yes: boat-route | centre | (520, 600) | Sailing boat, travels a set route between islands |
| `boat-fishing` | `wildlife/boat-fishing.webp` | 120×80 | 60×40 | 1.5 | yes | yes: boat-route | centre | (230, 700) | Fishing boat, travels near Game Garden |
| `boat-ferry` | `wildlife/boat-ferry.webp` | 120×80 | 60×40 | 1.5 | yes | yes: boat-route | centre | (1380, 660) | Ferry, travels near Exploration Valley |
| `balloon` | `wildlife/balloon.webp` | 120×160 | 60×80 | 0.75 | yes | yes: balloon-drift | centre | (1040, 80) | Hot-air balloon, drifts above Discovery Isles |
| `gull` | `wildlife/gull.webp` | 48×32 | 24×16 | 1.5 | yes | yes: gull-glide | centre | (1620, 470) (120, 540) | Seagull, glides (small, several copies) |

## Batch 5: decoration and UI

| ID | File | Px (w×h) | World (w×h) | Aspect | Transparent | Animated | Anchor | Position(s) (world x,y) | Use |
|---|---|---|---|---|---|---|---|---|---|
| `tree-1-trunk` | `nature/tree-1-trunk.webp` | 160×240 | 80×120 | 0.667 | yes | no | bottom-centre | (400, 300) | Tree type 1 trunk (shared, instanced) |
| `tree-1-canopy` | `nature/tree-1-canopy.webp` | 160×240 | 80×120 | 0.667 | yes | yes: tree-sway | bottom-centre | (400, 300) | Tree type 1 canopy, sways (separate from trunk) |
| `tree-2-trunk` | `nature/tree-2-trunk.webp` | 160×240 | 80×120 | 0.667 | yes | no | bottom-centre | (1000, 640) | Tree type 2 trunk (shared) |
| `tree-2-canopy` | `nature/tree-2-canopy.webp` | 160×240 | 80×120 | 0.667 | yes | yes: tree-sway | bottom-centre | (1000, 640) | Tree type 2 canopy, sways |
| `tree-3-trunk` | `nature/tree-3-trunk.webp` | 160×240 | 80×120 | 0.667 | yes | no | bottom-centre | (1160, 320) | Tree type 3 trunk (shared) |
| `tree-3-canopy` | `nature/tree-3-canopy.webp` | 160×240 | 80×120 | 0.667 | yes | yes: tree-sway | bottom-centre | (1160, 320) | Tree type 3 canopy, sways |
| `tree-4-trunk` | `nature/tree-4-trunk.webp` | 160×240 | 80×120 | 0.667 | yes | no | bottom-centre | (120, 400) | Tree type 4 trunk (shared) |
| `tree-4-canopy` | `nature/tree-4-canopy.webp` | 160×240 | 80×120 | 0.667 | yes | yes: tree-sway | bottom-centre | (120, 400) | Tree type 4 canopy, sways |
| `bush-1` | `nature/bush-1.webp` | 120×90 | 60×45 | 1.333 | yes | no | bottom-centre | (600, 380) | Bush (3 variants bush-1 to bush-3, shared) |
| `flowers-1` | `nature/flowers-1.webp` | 120×60 | 60×30 | 2 | yes | no | bottom-centre | (640, 640) | Flower bed (3 colours, shared) |
| `lamp-post` | `nature/lamp-post.webp` | 40×120 | 20×60 | 0.333 | yes | yes: lamp-glow | bottom-centre | (720, 395) *est.* | Lamp post along paths (glow is a separate code effect) |
| `bench` | `nature/bench.webp` | 90×50 | 45×25 | 1.8 | yes | no | bottom-centre | (770, 700) | Bench, plazas (shared) |
| `compass-rose` | `ui/compass-rose.webp` | 220×220 | 110×110 | 1 | yes | no | centre | (120, 800) | Compass rose, bottom-left corner, fixed to the screen (not the world) |
| `tec-title-plate` | `ui/tec-title-plate.webp` | 420×150 | 210×75 | 2.8 | yes | no | centre | (150, 70) | TEC title plate, top-left, fixed to the screen |
| `scroll-banner` | `ui/scroll-banner.webp` | 380×130 | 190×65 | 2.923 | yes | no | centre | (1400, 850) | Scroll banner, bottom-right, fixed to the screen |

## Island layout (world units)

| Island | Terrain centre | Terrain world size | Relative to Heartland |
|---|---|---|---|
| Heartland | (800, 330) | 380 × 300 | centre |
| Learning Quarter | (400, 220) | 560 × 320 | top left |
| Discovery Isles | (1235, 220) | 520 × 320 | top right |
| Game Garden | (280, 515) | 520 × 330 | left |
| Exploration Valley | (1280, 515) | 560 × 340 | right |
| Growth Garden | (800, 745) | 520 × 280 | south |

Bridges: each bridge is drawn as one span between its two given points. Code stretches the span along that line and keeps its ends undistorted. For bridges, the two listed points are the span ends.

## Placeholders

Until a file exists, the renderer draws a dashed outline at the asset's footprint and position, labelled with the asset id. Placeholders are listed here so they are never mistaken for artwork.

## Open items before Phase B

1. Confirm the island centres and footprints against the master map.
2. Confirm the estimated building positions (marked *est.*) on each island.
3. Decide whether `islet-3` is needed (it can be replaced by islet-1 or islet-2).
4. Confirm the wildlife routes (boats, balloon, gulls) with the artist.
