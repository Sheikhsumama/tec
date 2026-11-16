# TEC World: Batch 1 production brief

For the artist (ChatGPT) producing the artwork. The application developer integrates each file by name. Do not start drawing the final overview from these notes until the positions in section 9 are confirmed against the master map.

## 1. Overall look

- **Art direction:** premium 3D-inspired fantasy illustration, painted-digital style. Not flat vector, not clip-art, not neon. Soft volumes, gentle gradients, rich but harmonious colour.
- **Camera for every asset:** a three-quarter aerial view, tilted about 40–45° from the ground, looking down on the world from the south-west. Use this same angle on every island, building and tree so they sit together.
- **Light:** soft sunlight from the **upper left**. Shadows fall to the lower right. Afternoon warmth, with a gentle cyan sky-light on the shaded sides.
- **Palette family:** emerald and sage greens for vegetation, warm cream and sand for stone and paths, sky blue and turquoise for water, warm gold and ivory for the academy, one or two accent colours per island (listed in section 3). No neon. Keep saturation controlled.
- **Detail level:** clear, readable silhouettes at small size. Major landmarks should still be recognisable when the overview is zoomed out to about 40%.
- **Transparency:** all assets are transparent PNG-quality alpha, except the ocean tile (opaque).
- **No text, no logos, no UI, no real people, no identifiable faces** inside any asset.

## 2. Format and file rules (every file)

- Supply the master as **PNG (RGBA)**, exactly the pixel size in section 4. Also convert to **WebP with alpha** at the same size. The developer uses the WebP.
- Pixel size = 2× world size. World size is shown in section 4 for reference; you draw at pixel size.
- Edges: soft, anti-aliased alpha, no halo, no baked background, no baked drop shadow (except where stated).
- File name: lower-case, hyphens, exactly as listed. Folder: exactly as listed.
- Max file size: islands 600 KB, buildings 300 KB, others 150 KB (WebP).

## 3. The six islands (overall visual description)

These describe the **terrain only** (ground, cliffs, beaches, paths base, large vegetation masses). Buildings, bridges and individual trees are separate assets and are not painted into the terrain.

### 3.1 Heartland (central, the child's home)
- **Shape:** a broad, rounded plateau, slightly larger than the others in the middle, with an irregular coastline. Gentle green slopes rise toward the centre.
- **Surface:** lush emerald lawns, sage hedges, warm cream stone plaza in a large ring around the centre, with four sand-coloured stone paths that radiate to the four bridge landings (west, north-west, north-east, east) and one south path down to the Growth Walk.
- **Cliffs:** low, soft cliffs on the south and east sides. A visible stone stair cut into the south cliff where the Growth Walk starts.
- **Ground detail to paint:** plaza ring, stone paths, flower borders in cream, pink and blue (small, not individual flowers), a small pond area on the south-west side for Anis's cottage. No buildings.
- **Accent colour:** gold and ivory.

### 3.2 Learning Quarter (north-west, the campus)
- **Shape:** an elongated, terraced hillside island, wider than tall, rising gently from the sea on the south side to a flat campus top.
- **Surface:** three stepped terraces with warm sand-coloured paved paths, grass lawns between them, a central round plaza with a shallow circular water basin, and tree-lined avenues. Space is left open on each terrace for six separate classroom buildings (no buildings painted here).
- **Cliffs:** a stone seawall on the south and west edges; soft beach on the north-west.
- **Landing:** a clear paved landing on the **east** coast where the Knowledge Bridge arrives.
- **Accent colour:** coral-red and warm orange (rooftops suggested by the terrace colour, not painted).

### 3.3 Discovery Isles (north-east, the knowledge islands)
- **Shape:** a rugged, two-peaked island with dramatic rocky character. The east side drops into steep cliffs.
- **Surface:** rocky plateaus, shaded groves in darker green and teal, stone terraces, a flat central area (for the globe observatory, which is separate).
- **Waterfalls:** two cliff edges on the east side, where water would fall into the sea. Paint the **rock faces** and the waterfall **origin lips only**; the falling water is an animated asset.
- **Accent colour:** violet and deep teal (for the cluster canopies, which are separate).

### 3.4 Game Garden (west, the play island)
- **Shape:** a round-to-oval island with terraces stepping down toward the water.
- **Surface:** bright but controlled green lawns, a large open paved **courtyard** area (for the chess courtyard, which is separate), curved garden beds, rounded hedges.
- **Cliffs:** a rocky west cliff with a notch where a waterfall would sit (rock and lip only; water is animated).
- **Landing:** a paved landing on the **east** coast where the Play Bridge arrives.
- **Accent colour:** coral-pink and lilac (for the matching garden, separate).

### 3.5 Exploration Valley (east, nature and science)
- **Shape:** the largest island. Mountainous at the back (north), sloping to a valley floor and a curved river gorge that cuts from north to south.
- **Surface:** deep forest greens, meadow clearings, a winding dirt-and-stone trail network (paths base only), a valley floor.
- **Cliffs:** a steep west cliff with a notch for a waterfall (rock and lip only), a gorge edge on the east.
- **Landing:** a paved landing on the **west** coast where the Wonder Bridge arrives.
- **Accent colour:** fresh leaf green and warm earth brown.

### 3.6 Growth Garden (south, the growth island)
- **Shape:** a round, compact island, like a disc, with a clean coastline.
- **Surface:** a **central circular stone ring** surrounding a large open green circle (for the great tree, which is separate). Concentric garden rings in soft green and flower colours toward the edge.
- **Landing:** a paved landing on the **north** coast where the Growth Walk arrives.
- **Accent colour:** soft lavender and warm gold (for the tree and lanterns, separate).

## 4. Asset list (30 files, Batch 1)

Columns: **file** (under `assets/world/`), **pixel size** (draw at this size), **world size** (display size in world units), **aspect ratio**, **transparent**, **animated** (if yes, the base file must not include the animated part), **position** (world x,y), **anchor**.

### 4.1 Island terrain (6)
| File | Px | World | Aspect | Transparent | Position | Anchor |
|---|---|---|---|---|---|---|
| islands/heartland.webp | 760×600 | 380×300 | 1.267 | yes | 800, 330 | centre |
| islands/learning-quarter.webp | 1120×640 | 560×320 | 1.75 | yes | 400, 220 | centre |
| islands/discovery-isles.webp | 1040×640 | 520×320 | 1.625 | yes | 1235, 220 | centre |
| islands/game-garden.webp | 1040×660 | 520×330 | 1.576 | yes | 280, 515 | centre |
| islands/exploration-valley.webp | 1120×680 | 560×340 | 1.647 | yes | 1280, 515 | centre |
| islands/growth-garden.webp | 1040×560 | 520×280 | 1.857 | yes | 800, 745 | centre |

### 4.2 Shadows (6)
| File | Px | World | Aspect | Transparent | Position | Anchor |
|---|---|---|---|---|---|---|
| islands/shadow-heartland.webp | 760×600 | 380×300 | 1.267 | yes | 800, 330 | centre |
| islands/shadow-learning-quarter.webp | 1120×640 | 560×320 | 1.75 | yes | 400, 220 | centre |
| islands/shadow-discovery-isles.webp | 1040×640 | 520×320 | 1.625 | yes | 1235, 220 | centre |
| islands/shadow-game-garden.webp | 1040×660 | 520×330 | 1.576 | yes | 280, 515 | centre |
| islands/shadow-exploration-valley.webp | 1120×680 | 560×340 | 1.647 | yes | 1280, 515 | centre |
| islands/shadow-growth-garden.webp | 1040×560 | 520×280 | 1.857 | yes | 800, 745 | centre |

Shadow rules: a soft, low-opacity (about 25–35%) dark teal shape matching the island's coastline, offset slightly to the lower right. Nothing else in the file.

### 4.3 Ocean (2)
| File | Px | World | Aspect | Transparent | Position | Anchor |
|---|---|---|---|---|---|---|
| ocean/ocean-tile.webp | 512×512 | 256×256 | 1 | **no (opaque)** | repeated | centre |
| ocean/foam-edge.webp | 256×64 | 128×32 | 4 | yes | repeated along coasts | centre |

Ocean tile: a **seamless** tile (left edge matches right, top matches bottom) of blue-turquoise water, with soft, gentle wave patterns, subtle lighter ripples, and very light sun glints. Deeper blue toward the edges. Not busy.
Foam edge: a horizontal strip of white-cream foam with soft broken edges, **tileable left to right**, for placing along island coastlines.

### 4.4 Heartland buildings (5)
| File | Px | World | Aspect | Transparent | Position | Anchor |
|---|---|---|---|---|---|---|
| buildings/tec-academy.webp | 760×620 | 380×310 | 1.226 | yes | 804, 316 | bottom-centre |
| buildings/compass-tower.webp | 280×640 | 140×320 | 0.438 | yes | 800, 250 | bottom-centre |
| buildings/anis-home.webp | 300×240 | 150×120 | 1.25 | yes | 660, 306 | bottom-centre |
| buildings/world-map-pavilion.webp | 320×260 | 160×130 | 1.231 | yes | 935, 316 | bottom-centre |
| buildings/welcome-plaza-fountain.webp | 220×200 | 110×100 | 1.1 | yes | 800, 352 | bottom-centre |

**TEC Academy:** the central landmark, a grand fantasy castle in warm ivory and gold stone, with tall slim towers capped in blue-and-gold domes, arched windows (**dark glass, not lit**), a central gate with steps, and pennants on the spires. Symmetrical, elegant, slightly Gothic-meets-Renaissance.
**Compass Tower:** a tall, slim tower of pale stone, with a golden compass star on its top (the star is painted; its glow is separate). Stands behind and above the academy. Taller than the academy's central spire base.
**Anis's Home:** a small, round-roofed cottage in warm wood and cream walls, with a blue roof, a small round window, and a flower box. Friendly and personal. Windows dark.
**World Map Pavilion:** an open, domed pavilion in white stone with a blue dome and a central globe on a stand (globe painted, glow separate). Arches open on all sides.
**Welcome Plaza Fountain:** a round stone basin with a tiered central column and water spout. Water pool painted; splash particles are separate.

### 4.5 Bridges (4)
| File | Px | World | Aspect | Transparent | Position (two ends) | Anchor |
|---|---|---|---|---|---|---|
| bridges/knowledge-bridge.webp | 480×200 | 240×100 | 2.4 | yes | (545,250) → (655,265) | centre |
| bridges/curiosity-bridge.webp | 480×200 | 240×100 | 2.4 | yes | (965,258) → (1090,245) | centre |
| bridges/play-bridge.webp | 440×200 | 220×100 | 2.2 | yes | (460,440) → (612,411) | centre |
| bridges/wonder-bridge.webp | 480×220 | 240×110 | 2.182 | yes | (976,421) → (1100,450) | centre |

Each bridge is **one horizontal span**, drawn as a side view at the same perspective, with clear stone or wood **end caps** at the left and right edges. The developer stretches it along its line, so keep the end caps at the outer edges of the image and the middle section plain and repeatable.
- **Knowledge Bridge:** an arched stone bridge in warm cream, with a low arch and small lamps.
- **Curiosity Bridge:** a slightly lighter arched bridge in pale stone with blue accents on the railing.
- **Play Bridge:** a colourful wooden-and-painted span, coral and yellow railings, a more playful look.
- **Wonder Bridge:** a suspension bridge with wooden planks and rope rails, with a gentle sag in the middle.

### 4.6 Growth Walk (2)
| File | Px | World | Aspect | Transparent | Position | Anchor |
|---|---|---|---|---|---|---|
| paths/growth-walk-segment.webp | 200×120 | 100×60 | 1.667 | yes | 794, 510 | centre |
| paths/growth-walk-end.webp | 240×160 | 120×80 | 1.5 | yes | 794, 575 | centre |

Segment: a stone path in cream with soft grass edges; a tileable strip (left and right edges match), placed top to bottom between Heartland and the Growth Garden. Needs to read as a path over shallow water.
End: the landing where the path meets the Growth Garden ring, with a small stone step and a flower bed at each side.

### 4.7 Growth tree (1)
| File | Px | World | Aspect | Transparent | Position | Anchor |
|---|---|---|---|---|---|---|
| buildings/growth-tree.webp | 460×480 | 230×240 | 0.958 | yes | 800, 600 | bottom-centre |

**Growth tree:** the central landmark of the Growth Garden. A large, graceful tree with a warm trunk and a wide canopy of soft **lavender-violet** blossoms, with some golden highlights. Roots slightly visible at the base on a stone ring. Gentle, hopeful, magical but not neon. The canopy must be painted as a clearly defined mass so it can be separated later (see section 6).

### 4.8 Islets (3)
| File | Px | World | Aspect | Transparent | Position(s) | Anchor |
|---|---|---|---|---|---|---|
| nature/islet-1.webp | 200×120 | 100×60 | 1.667 | yes | (80, 290) | centre |
| nature/islet-2.webp | 200×120 | 100×60 | 1.667 | yes | (1510, 200) | centre |
| nature/islet-3.webp | 200×120 | 100×60 | 1.667 | yes | (1530, 300), (60, 640), (1560, 640) | centre |

Small rocky islets with one or two trees or a few bushes, in the same perspective and palette. Islet-1 and islet-2 are slightly different shapes; islet-3 is a flat, low rock with a little grass. Each islet has a soft shadow beneath it painted in the same file.

### 4.9 Mountain backdrop (1)
| File | Px | World | Aspect | Transparent | Position | Anchor |
|---|---|---|---|---|---|---|
| nature/mountains-backdrop.webp | 1800×360 | 900×180 | 5 | yes | 800, 80 | centre |

A wide range of soft blue-green mountains with snowy peaks and hazy atmospheric perspective, forming a horizon behind the northern islands. Lighter and more hazy the further back; no detailed foreground.

## 5. Animation requirements

In Batch 1 the artwork is **static**. Animated effects come in Batch 4 as separate files. Batch 1 must be prepared so those can be added without repainting:

| Asset | Animation later | What the Batch 1 file must do |
|---|---|---|
| ocean-tile | slow drift | seamless, opaque tile |
| foam-edge | gentle pulse | tileable strip |
| tec-academy, anis-home, learning buildings | window light | **windows dark** in the base |
| compass-tower | beacon glow | star painted, no glow in base |
| world-map-pavilion | globe glow | globe painted, no glow in base |
| growth-tree | blossom glow and sway | canopy as a clear mass (see below) |
| welcome-plaza-fountain | water particles | water pool painted, no splashes |

**Growth tree separation:** the canopy must be separable. Batch 4 needs a canopy-only file (`animated/growth-tree-canopy.webp`, 460×320 px) that lines up with the tree's canopy in `buildings/growth-tree.webp`. If possible, supply that canopy-only file in the same batch so the two line up exactly from the start.

## 6. Relationships and alignment

These assets must match each other exactly:

1. **Terrain and shadow pairs:** each shadow has the same pixel size and the same coastline as its terrain. When placed at the same centre, they must line up pixel for pixel.
2. **Shared perspective:** all buildings, bridges and trees use the same camera angle and light direction. A building on Learning Quarter must look like it belongs to the same photograph as the Heartland castle.
3. **Bridge ends and landings:** the bridge end caps must meet the paved landings on the terrain. Each landing location is listed in section 3 (for example Knowledge Bridge meets Learning Quarter on its east coast).
4. **Building anchors:** each building's ground contact line is at the bottom edge of its image (with about 2% padding). The developer places it by that bottom centre point.
5. **Palette:** one palette across all six islands, so the set looks like one world. Each island has one accent colour (section 3), used sparingly.
6. **Coastlines:** the terrain coastline defines the land. Shallow water areas can be drawn into the terrain image (lighter turquoise) for smooth transitions to the ocean tile.

## 7. Known layout issues to decide before drawing

These come from the approximate positions, not from artwork:

1. **Heartland and Learning Quarter overlap** by about 70 world units along their shared edge (x 610–680). The two terrain coastlines must either be drawn so they do not overlap (shallow water in the gap), or the island positions must be moved apart. **Decision needed.**
2. **Heartland's footprint** (380 × 300) is close to the Compass Tower and Academy. Check against the master map.
3. **Growth Walk** runs over shallow water. Its segment is drawn as a path, not a bridge.

## 8. Reference requirements

To place everything accurately, please provide:

1. **The master map file itself** at full resolution (the one shown in the chat is only a visible reference, not a file on disk). Needed to confirm island shapes and relative sizes.
2. **A layout sketch** on the 1600 × 900 grid, with island outlines and bridge lines drawn at their positions. This resolves the open items in section 7.
3. **Building reference**: one image or sketch per Heartland building (Academy, Compass Tower, Anis's Home, World Map Pavilion, Fountain), if the master map does not show them clearly enough.
4. **Confirmation** of the island's accent colours (section 3), if different from the master map.

## 9. Open decisions (answer before drawing)

1. Heartland / Learning Quarter overlap: resolve by drawing a water gap or by moving the islands apart? (Section 7.)
2. Terrain content: is **vegetation mass** (hedges, forest, lawns) painted into the terrain, with **individual trees** separate? (Assumed yes.)
3. Growth tree canopy: supply the canopy-only file in Batch 1, or in Batch 4? (Recommended: Batch 1.)
4. Positions marked *estimated* in the manifest (the six classroom buildings and some Batch 3 items) are not in Batch 1. Confirm they are placed later.

## 10. Delivery checklist (for each file)

- [ ] Exact file name and folder (section 4).
- [ ] Exact pixel size (section 4).
- [ ] Transparent alpha, or opaque for `ocean-tile` only.
- [ ] Shadows match their terrain pixel for pixel.
- [ ] Seamless edges on `ocean-tile` and `growth-walk-segment`; tileable `foam-edge`.
- [ ] Same camera angle and light direction as every other file.
- [ ] Windows dark in base buildings.
- [ ] No text, logos, UI or real people.
- [ ] WebP with alpha, within the size limits in section 2.
