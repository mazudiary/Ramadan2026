# Ramadan Mubarak — 3D Moon Scene

A single-file Ramadan greeting experience built with **Three.js**: a textured moon with phases, drifting stars, lantern glow + smoke, and a prayer/wish notes panel.

## How to run

This project is a single HTML file.

### Option A (quickest)
- Open `ramadan.html` in your browser.

### Option B (recommended)
Some browsers block ES module imports from `file://`. Use a local server instead:

- VS Code: install **Live Server** and run “Open with Live Server” on `ramadan.html`.
- Or any static server (examples):
  - Python: `python -m http.server 5173`
  - Node: `npx serve .`

Then open `http://localhost:5173/ramadan.html`.

## Controls

- **Start**: Tap **Begin the Story**.
- **Notes**: Tap the **i** button (top-right) to open “Prayer / Wish Notes”.
- **Close notes**: Tap **Close**, tap outside the card, or press `Esc`.
- **Moon phase label**: Shows current phase in the top-left.
- **Keyboard (desktop)**:
  - `I` opens notes
  - `Esc` closes notes
  - `←` / `→` cycle moon phases

## Mobile behavior

- Uses safe-area insets (iPhone notch / Android cutouts) for UI spacing.
- Reduces pixel ratio + disables rotate/zoom controls on small screens to avoid accidental camera movement while tapping.

## Customize

### Partner name
Edit the constant near the top of the script:

- `const PARTNER_NAME = "Premii 🤍";`

Notes:
- The 3D text uses a font that **does not support emojis**, so the 3D name is automatically sanitized to avoid showing `?`.
- Emojis are still fine inside the Notes panel text.

### Story / prayer notes
Edit the `storyLines` array.

## Tech

- **Three.js** via CDN import map
- Post-processing bloom: `EffectComposer` + `UnrealBloomPass`
- Procedural moon textures generated in-canvas (albedo + normal + displacement)

## Credits

- Three.js: https://threejs.org/
- Helvetiker typeface JSON: distributed with Three.js examples

## Notes / troubleshooting

- If the scene is blank when opened directly, use a local server (see “How to run”).
- For smoother performance on older phones, reduce bloom strength and/or the moon texture size.
