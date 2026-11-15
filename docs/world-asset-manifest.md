# TEC World: asset manifest (Phase A, asset-first)

Status: planning document. No artwork is drawn in code. Artwork arrives progressively and is placed by file name.
Reference: the supplied TEC World Master Map (flat painted illustration). It is the geographical and visual reference only. It is never used as a background image.

## 1. Coordinate system and layout

- World canvas: **1600 × 900 world units** (16:9). Every position below is in world units, origin at top-left.
- Positions are approximate, read from the master map, and must be checked against it in Phase B. The map is the authority.
- Each asset is placed by its **anchor**: the bottom-centre of its footprint (where it touches the ground). Anchors make depth sorting and alignment consistent at any screen size.
- Artwork is supplied at **2× the world size** (retina). Example: a 560 × 320 unit island is supplied at 1120 × 640 px.

| Island | Centre (approx.) | Footprint (approx.) | Position relative to Heartland |
|---|---|---|---|
| Heartland (central, home) | 800, 330 | 380 × 300 | centre |
| Learning Quarter | 400, 220 | 560 × 320 | top left |
| Discovery Isles | 1235, 220 | 520 × 320 | top right |
| Game Garden | 280, 515 | 520 × 330 | left |
| Exploration Valley | 1280, 515 | 560 × 340 | right |
| Growth Garden | 800, 745 | 520 × 280 | bottom, south of Heartland |

Connections (drawn as code-rendered bridges and paths, but built from artwork pieces):
- Knowledge Bridge: Heartland → Learning Quarter (north-west).
- Curiosity Bridge: Heartland → Discovery Isles (north-east).
- Play Bridge: Heartland → Game Garden (west).
- Wonder Bridge: Heartland → Exploration Valley (east).
- Growth Walk: Heartland → Growth Garden (south, a stone path over shallow water).

## 2. File and folder structure

```
assets/world/
  ocean/            tileable water, foam edges
  islands/          one terrain file per island (+ shadow file)
  buildings/        one file per building or landmark (transparent)
  bridges/          bridge pieces (see section 5)
  paths/            walk and path pieces
  nature/           trees, bushes, flowers, rocks, lamps (shared)
  animated/         separate layers for things that move or glow
  wildlife/         boats, clouds, birds, balloon (shared)
  ui/               map plates and title art (labels stay as code)
```

Style: one folder per category keeps files easy to replace. File names are lower-case with hyphens (see section 7).

## 3. Island terrain (one file per island)

Each island needs: the **terrain file** (land, cliffs, beach, vegetation silhouette, transparent outside the coastline) and a separate **contact shadow** file (soft shadow on water, transparent).

| # | Island | Terrain file | Size (px, 2×) | Notes |
|---|---|---|---|---|
| 1 | Heartland | islands/heartland.webp | 760 × 600 | Central plateau, plaza ground, Anis's cottage area, the Compass Tower hill |
| 2 | Learning Quarter | islands/learning-quarter.webp | 1120 × 640 | Campus terraces, paths, room for six buildings, Knowledge Bridge landing |
| 3 | Discovery Isles | islands/discovery-isles.webp | 1040 × 640 | Two cliffs, waterfall edges, space for six geographical clusters |
| 4 | Game Garden | islands/game-garden.webp | 1040 × 660 | Courtyard ground, rounded garden terraces, Play Bridge landing |
| 5 | Exploration Valley | islands/exploration-valley.webp | 1120 × 680 | Mountain foot, valley floor, river gorge edge, two waterfall edges |
| 6 | Growth Garden | islands/growth-garden.webp | 1040 × 560 | Round island, central ring, Growth Walk landing |

Shadows: islands/shadow-heartland.webp, shadow-learning-quarter.webp, and so on (same size, low opacity, no detail).

**Coastline must be part of the terrain file** (foam is a separate animated layer, see section 6). Do not combine two islands in one file.

## 4. Buildings and landmarks (separate files, transparent)

Each building is one file, drawn at the size shown with its anchor at the bottom centre. Window glow is a separate animated overlay (section 6), so the base file has **dark windows**.

### Heartland
| Asset | File | Size (px) | Anchor | Animated | Priority |
|---|---|---|---|---|---|
| TEC Academy (main castle) | buildings/tec-academy.webp | 760 × 620 | bottom centre | window glow, flags | 1 |
| Compass Tower | buildings/compass-tower.webp | 280 × 640 | bottom centre | beacon glow on top, star rotates (code) | 1 |
| Anis's Home (cottage) | buildings/anis-home.webp | 300 × 240 | bottom centre | window glow | 2 |
| World Map Pavilion | buildings/world-map-pavilion.webp | 320 × 260 | bottom centre | globe glow (overlay) | 2 |
| Welcome Plaza fountain | buildings/welcome-plaza-fountain.webp | 220 × 200 | bottom centre | water particles (code) | 2 |

### Learning Quarter: six classroom buildings
Each must read as its own building and match its subject identity. Sizes are for one building.

| Building | File | Size (px) | Identity cue | Priority |
|---|---|---|---|---|
| English Studio | buildings/english-studio.webp | 300 × 260 | warm red-brick, reading bay | 1 |
| Arabic Classroom | buildings/arabic-classroom.webp | 300 × 280 | gold domes, arches | 1 |
| Mathematics Workshop | buildings/mathematics-workshop.webp | 300 × 260 | colourful, clock tower | 1 |
| Computer & Technology Lab | buildings/technology-lab.webp | 300 × 260 | modern, glass panel, antenna | 1 |
| Tarbiyah & Character House | buildings/tarbiyah-house.webp | 280 × 240 | cottage with garden, heart motif | 1 |
| World Discovery Centre | buildings/world-discovery-centre.webp | 300 × 280 | observatory dome, globe | 1 |
| Campus entrance gate | buildings/campus-gate.webp | 260 × 200 | arch gate at the Knowledge Bridge end | 2 |

### Discovery Isles
| Asset | File | Size (px) | Animated | Priority |
|---|---|---|---|---|
| Globe observatory (central landmark) | buildings/discovery-globe.webp | 420 × 380 | globe glow (overlay) | 2 |
| Cluster pavilions (6, one per cluster; can share a base with different signs) | buildings/cluster-pavilion-a.webp, -b.webp | 180 × 160 each | none | 3 |

Six geographical clusters: Living Worlds, Science & Making, Places & Civilisations, Creative Worlds, Movement & Machines, Imagination & Strategy. Each cluster gets a plate (ui) and a marker; the pavilions above can be shared.

### Game Garden
| Asset | File | Size (px) | Animated | Priority |
|---|---|---|---|---|
| Giant chess courtyard (board and pieces) | buildings/chess-courtyard.webp | 460 × 340 | none | 2 |
| Puzzle Pavilion | buildings/puzzle-pavilion.webp | 240 × 240 | none | 2 |
| Matching Games Garden (flower beds with cards motif) | buildings/matching-garden.webp | 260 × 180 | flower sway | 3 |
| Building-Block Workshop (giant cube and blocks) | buildings/block-workshop.webp | 280 × 260 | none | 2 |
| Story and Memory Games Area (storyteller hall) | buildings/story-area.webp | 260 × 240 | lantern glow | 3 |

### Exploration Valley
| Asset | File | Size (px) | Animated | Priority |
|---|---|---|---|---|
| Botanical Gardens (glasshouse dome) | buildings/botanical-glasshouse.webp | 360 × 280 | interior glow | 2 |
| Animal Observation Area (fenced enclosure) | buildings/animal-area.webp | 300 × 220 | none (animals: separate, optional) | 3 |
| Water and Weather Station (tower with vane) | buildings/weather-station.webp | 200 × 300 | vane rotates (code) | 2 |
| Nature Trails (trail head sign) | buildings/trail-head.webp | 160 × 160 | none | 3 |
| Miniature Geography Landscape (diorama) | buildings/miniature-landscape.webp | 300 × 220 | none | 3 |
| Outdoor Observation Pavilion (gazebo with telescope) | buildings/observation-pavilion.webp | 220 × 220 | none | 2 |

### Growth Garden
| Asset | File | Size (px) | Animated | Priority |
|---|---|---|---|---|
| Great growth tree (central landmark) | buildings/growth-tree.webp | 460 × 480 | blossom glow (overlay), leaves sway | 1 |
| Personal learning garden (plot set) | nature/plot-set.webp (shared) | 200 × 160 | none | 3 |
| Kindness element (bench with heart stones) | buildings/kindness-bench.webp | 200 × 140 | none | 3 |
| Achievement lanterns (lantern cluster, no marks) | buildings/growth-lanterns.webp | 160 × 200 | lantern glow | 3 |

## 5. Bridges and paths

Bridges are artwork pieces, placed along a path line by code. Each bridge file is a **single span** that code can stretch or repeat.

| Asset | File | Size (px) | Notes | Priority |
|---|---|---|---|---|
| Knowledge Bridge (arched stone span) | bridges/knowledge-bridge.webp | 480 × 200 | end caps on both sides, transparent | 1 |
| Curiosity Bridge (arched span) | bridges/curiosity-bridge.webp | 480 × 200 | slightly different colour from Knowledge | 1 |
| Play Bridge (wooden/colourful span) | bridges/play-bridge.webp | 440 × 200 | | 1 |
| Wonder Bridge (rope and wood suspension span) | bridges/wonder-bridge.webp | 480 × 220 | sags in the middle | 1 |
| Growth Walk stone path segment | paths/growth-walk-segment.webp | 200 × 120 | tileable along the walk | 1 |
| Growth Walk end landing | paths/growth-walk-end.webp | 240 × 160 | | 2 |
| Path tile (campus, Learning Quarter) | paths/campus-path-tile.webp | 128 × 128 | seamless, tileable | 2 |

## 6. Animated layers (provided separately so they move independently)

Each animated element is its own layer with transparency. The base building is never animated.

| Element | File(s) | Size | Motion (code) | Notes |
|---|---|---|---|---|
| Ocean | ocean/ocean-tile.webp | 512 × 512, seamless | slow offset drift | one tile reused everywhere |
| Shoreline foam | ocean/foam-edge.webp | 256 × 64, tileable | gentle pulse | sits on island coastlines |
| Waterfalls (×3) | animated/waterfall-strip.webp | 80 × 320, vertical loop | flows downward | at least 3 waterfall sites (Discovery, Game, Exploration) |
| Window glow overlay | animated/window-glow-*.webp | matched to building | flicker or soft fade | one overlay per building that has windows |
| Compass Tower beacon | animated/beacon-glow.webp | 120 × 120 | pulse | |
| Globe glow (Discovery, World Map Pavilion) | animated/globe-glow.webp | 200 × 200 | soft pulse | |
| Growth tree canopy | animated/growth-tree-canopy.webp | 460 × 320 | sway, glow | canopy must be a **separate file** from the trunk |
| Tree canopies (shared) | nature/tree-canopy-*.webp | matched | sway (rotation about base) | trunk and canopy separate for every tree |
| Clouds (×4 variants) | wildlife/cloud-*.webp | 320 × 150 | slow drift | |
| Boats (×3) | wildlife/boat-sail.webp, boat-fishing.webp, boat-ferry.webp | 120 × 80 | travel along set routes | |
| Hot-air balloon | wildlife/balloon.webp | 120 × 160 | slow drift | |
| Seagulls | wildlife/gull.webp | 48 × 32 | glide | |

## 7. Shared assets

| Asset | File | Size (px) | Used on |
|---|---|---|---|
| Trees (4 types, each with trunk and canopy files) | nature/tree-*-trunk.webp, tree-*-canopy.webp | 160 × 240 | all islands |
| Bushes (3 types) | nature/bush-*.webp | 120 × 90 | all islands |
| Flower beds (3 colours) | nature/flowers-*.webp | 120 × 60 | all islands |
| Rocks and islets (4–6 variants) | nature/islet-*.webp | 200 × 120 | ocean (smaller islets) |
| Lamp post | nature/lamp-post.webp | 40 × 120 | paths |
| Bench | nature/bench.webp | 90 × 50 | plazas |
| Mountain range (backdrop) | nature/mountains-backdrop.webp | 1800 × 360 | horizon, behind islands |
| Compass rose | ui/compass-rose.webp | 220 × 220 | corner |
| Title plate (TEC logo) | ui/tec-title-plate.webp | 420 × 150 | top left |
| Scroll banner | ui/scroll-banner.webp | 380 × 130 | bottom right |

Labels, name plates and description cards are **code** (text and styling), not artwork. The plates behind labels may be a shared artwork.

## 8. Format, quality and budget

- **Format:** WebP with alpha for everything. Provide the source PNG too if available, so files can be re-exported.
- **Scale:** 2× the world size, as in section 1. Maximum long edge 2048 px.
- **Transparency:** soft, real alpha edges. No baked drop shadows (shadows are separate files). No background colour.
- **Consistency:** one palette and one lighting direction (light from the upper left) across all files. The master map sets the palette.
- **Size budget:** islands ≤ 600 KB each; buildings ≤ 300 KB each; shared nature assets ≤ 60 KB each; ocean tile ≤ 150 KB. Total world load target ≤ 8 MB, with lazy loading for destinations not yet visible.
- **People:** no real people or identifiable faces in any world asset.
- **Naming:** lower-case, hyphens only. The file name is the id used in code. Replacing an asset means replacing the file with the same name, with no code change.

## 9. Animation rules (for artwork)

- Anything that moves is a separate file (canopy, glow, waterfall strip, boat, cloud).
- Trees: trunk and canopy separate, canopy anchored at the trunk top.
- Glows: separate overlay with the same footprint as the building, so it lines up exactly.
- Waterfall strips: seamless vertical loops, 80 px wide.

## 10. Delivery order (what artwork is needed first)

**Batch 1: needed for the Phase B overview (the six islands, bridges and the central landmark)**
1. Terrain files: heartland, learning-quarter, discovery-isles, game-garden, exploration-valley, growth-garden (section 3).
2. Shadows for the same six islands.
3. Ocean tile (ocean/ocean-tile.webp) and foam edge.
4. Buildings: tec-academy, compass-tower, anis-home, world-map-pavilion.
5. Bridges: knowledge-bridge, curiosity-bridge, play-bridge, wonder-bridge.
6. Growth Walk: growth-walk-segment, growth-walk-end.
7. Growth tree: growth-tree.webp.
8. Islets (2–3 variants), and mountains-backdrop.

**Batch 2: Learning Quarter detail (Phase E)**
9. The six classroom buildings and the campus gate.
10. Campus path tile.

**Batch 3: other island landmarks (Phase F, with placeholder allowed)**
11. discovery-globe, cluster pavilions.
12. chess-courtyard, puzzle-pavilion, block-workshop, matching-garden, story-area.
13. botanical-glasshouse, weather-station, observation-pavilion, animal-area, trail-head, miniature-landscape.
14. growth-lanterns, kindness-bench, plot-set.

**Batch 4: animation layers and wildlife (Phase C)**
15. Window-glow overlays (one per building with windows), beacon glow, globe glow, growth tree canopy.
16. Waterfall strip, tree canopies (shared), clouds, boats, balloon, gulls.

**Batch 5: decoration and UI**
17. Shared nature assets, lamp post, bench, flower beds, bushes.
18. TEC title plate, compass rose, scroll banner.

## 11. Placeholders until artwork arrives

Until an asset is supplied, the world shows a **clearly marked placeholder**: a dashed outline in the right footprint with the asset id as its label. Placeholders are never presented as final artwork. The asset manifest lists each placeholder.

## 12. Status (to update as assets arrive)

| Batch | Status |
|---|---|
| 1: overview | awaiting artwork |
| 2: Learning Quarter detail | awaiting artwork |
| 3: other landmarks | awaiting artwork |
| 4: animation and wildlife | awaiting artwork |
| 5: decoration and UI | awaiting artwork |
