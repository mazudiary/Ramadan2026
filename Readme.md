# Ramadan Mubarak 2026 🤍

An immersive 3D interactive experience celebrating Ramadan 2026 with personalized prayers and spiritual reflections.

## Overview

This is a beautiful, web-based Ramadan greeting experience built with **Three.js** that combines stunning 3D graphics with interactive Islamic prayer flows. Users can view a procedurally generated moon with realistic phases, explore Bengali duas and zikr, and create personalized spiritual prayers with their loved one's name.

## Features

### 🌙 3D Moon Scene
- **8 Realistic Moon Phases**: New Moon → Waxing Crescent → First Quarter → Waxing Gibbous → Full Moon → Waning Gibbous → Last Quarter → Waning Crescent
- **Procedurally Generated Textures**:
  - Displacement mapping for crater detail
  - Normal mapping for surface realism
  - Albedo texture with dynamic crater patterns
  - Seeded random generation for consistency
- **Dynamic Lighting**:
  - Sun position rotates with moon phase
  - Directional and point lights for depth
  - Bloom post-processing effects
  - Realistic shadows and reflections

### ✨ Atmospheric Elements
- **Multi-layer Star Field**: 3 layers of procedurally placed stars
- **Floating Lanterns**: 3 glowing lanterns with particle smoke effects
- **Hemispherical Lighting**: Realistic ambient lighting
- **Fog Effect**: Depth-based atmospheric rendering

### 📱 Interactive Prayer Flow
A multi-step spiritual experience:
1. **View Story**: Ramadan messages and prayer requests
2. **Explore Duas**: 18 Bengali Islamic duas and zikr
3. **Input Name**: Enter husband/partner's name
4. **Personalized Prayer**: Comprehensive munajat with name substitution

### 🎵 Audio
- Ramadan background music from local file (`music.mp3`)
- Plays on "Begin the Story" button click
- 40% volume for balanced ambiance
- Loops continuously
- Respects browser autoplay policies

### 🎨 UI Components
- **Overlay**: Splash screen with "Begin the Story" button (hides after start)
- **Info Button**: Top-right corner toggles prayer notes
  - Hidden during overlay (splash screen)
  - Visible after story begins
  - Shows/hides using opacity and pointer-events transitions
- **Notes Modal**: Glass-morphism modal with prayer content
  - Sticky header with close button
  - Scrollable content
  - Responsive width and height

### 📝 Content

**Story (17 Messages)**
- Spiritual Ramadan greetings
- Prayer requests for marriage, job, prosperity
- Educational about Ramadan's significance
- Personally signed message

**Bengali Duas (18 Items)**
- Subhanallah, Alhamdulillah, La ilaha illallah, Allah u Akbar
- Istighfar (repentance), Salawat on Prophet
- Each repeated 3 times following Islamic tradition

**Comprehensive Munajat (Supplication)**
- 10+ paragraphs of Bengali spiritual prayer
- Invocations to God's 99 Names
- Personal requests for marriage blessing
- Dynamic name substitution (`{HUSBAND_NAME}`)
- Authentic Islamic Arabic phrases with Bengali translation

### 📱 Responsive Design
- Desktop, tablet, and mobile optimized
- Touch and mouse event support
- Safe area insets for notches
- Adaptive quality settings per device
- Reduced motion support for accessibility

## File Structure

```
Ramadan2026/
├── index.html           # Main HTML with imports
├── script.js            # 1073 lines of core logic
│                        # - UI rendering (dua, names, prayers)
│                        # - Three.js scene setup
│                        # - Moon phases and lighting
│                        # - Event handlers
│                        # - Audio playback on user interaction
├── styles.css           # Complete styling (515 lines)
│                        # - Glass-morphism modal
│                        # - Responsive grid layouts
│                        # - 3D card transforms
│                        # - Hidden/visible button states
├── README.md            # This file
└── music.mp3            # Ramadan background music (user-provided)
```

## Technologies

### Core
- **Three.js 0.158.0** - 3D graphics library
- **JavaScript ES6+** - Vanilla JS (no frameworks)
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with transforms

### Three.js Modules
- `OrbitControls` - Camera manipulation
- `FontLoader` + `TextGeometry` - 3D text rendering
- `EffectComposer` + `RenderPass` - Post-processing
- `UnrealBloomPass` - Bloom glow effects

### Fonts & Assets
- **Noto Sans Bengali** - Bengali typography
- **Local Audio File** - Ramadan music (user-provided)
- **Three.js Fonts** - helvetiker typeface

## Usage

### Opening the Experience

1. Ensure `music.mp3` is in the same folder as `index.html`
2. Open `index.html` in a modern browser
3. Click **"Begin the Story"** button
   - Audio starts playing (40% volume)
   - Info button (i) becomes visible
   - Overlay disappears with fade-out animation
4. Click the moon or info button to access the prayer flow

### Prayer Flow Steps

**Step 1: View Story**
- Read 17 messages about Ramadan
- Click **"i"** button (info button at top-right) to toggle notes

**Step 2: Explore Duas**
- View 18 Bengali duas and zikr
- Click **"Next →"** to proceed

**Step 3: Enter Husband's Name**
- Input your loved one's name
- Press Enter or click **"Next →"**

**Step 4: Read Personalized Prayer**
- Munajat with name inserted
- Click **"← Back to دعا"** to restart

### Audio Setup

The audio file must be named `music.mp3` and placed in the project root directory:

```
Ramadan2026/
├── index.html
├── script.js
├── styles.css
├── music.mp3          ← Add your audio file here
└── README.md
```

**To use YouTube audio:**
1. Download MP3 from: https://www.youtube.com/watch?v=AIyAPGumseA
   - Use: y2mate.com, Convert2mp3, or yt-dlp
2. Save as `music.mp3` in project root
3. Audio will play from song start (trimming to specific time range requires FFmpeg or audio editor)

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `i` / `I` | Toggle Prayer/Wish Notes |
| `Escape` | Close modal |
| `→` | Next moon phase (after started) |
| `←` | Previous moon phase (after started) |

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Chromium 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Requirements
- WebGL support
- ES6 JavaScript
- CSS Grid & Flexbox
- Web Audio API (for music)

## Performance

### Optimization Features
- **Adaptive Rendering**:
  - Small screens: 1.5x pixel ratio, reduced geometry
  - Large screens: 2x pixel ratio, full geometry
- **Texture Scaling**: 512px on mobile, 768px on desktop
- **Bloom Effect Tuning**: Based on device type
- **Reduced Motion Support**: Respects `prefers-reduced-motion`

### Performance Tips
- Use Chrome/Firefox for best performance
- Disable browser extensions (especially ad blockers)
- Close other browser tabs for smooth 60 FPS
- Update your GPU drivers

### Approximate Requirements
- **CPU**: Dual-core 2 GHz+
- **GPU**: Dedicated or integrated graphics
- **Memory**: 512 MB+
- **Network**: 2 Mbps for music streaming

## Data & Privacy

- ❌ No data collection
- ❌ No analytics tracking
- ❌ No storage of user input
- ✅ All processing happens locally in browser
- ✅ Wife's name never sent to server

## Customization

### Audio File

The audio loads from `music.mp3` in the project root. To change:

1. **Replace the audio file**:
   - Delete current `music.mp3`
   - Add your new audio file as `music.mp3`
   - Ensure format is MP3 (or adjust `type="audio/mpeg"` in HTML)

2. **Change audio volume**:
   Edit [script.js line 932](script.js#L932):
   ```javascript
   ramadenMusic.volume = 0.4;  // Change to 0.0 (silent) to 1.0 (max)
   ```

3. **Use different audio format** (WAV, OGG, etc):
   Edit [index.html line 36](index.html#L36):
   ```html
   <audio id="ramadenMusic" loop>
     <source src="music.wav" type="audio/wav">
   </audio>
   ```

### Changing Partner Name (3D Text)
Edit [script.js line 10](script.js#L10):
```javascript
const PARTNER_NAME = "Premii 🤍";  // Change this
```

### Editing Story Messages
Edit [script.js lines 33-49](script.js#L33) (storyLines array):
```javascript
const storyLines = [
  "Your message here",
  "Another message",
  // ...
];
```

### Editing Bengali Duas
Edit [script.js lines 51-66](script.js#L51) (banglaDuaLines array):
```javascript
const banglaDuaLines = [
  'আপনার দোয়া এখানে',
  // ...
];
```

### Editing Munajat (Main Prayer)
Edit [script.js lines 68-168](script.js#L68) (comprehensiveDua template literal):
```javascript
const comprehensiveDua = `
আপনার দোয়ার পাঠ্য এখানে
{HUSBAND_NAME} প্লেসহোল্ডার ব্যবহার করুন
`;
```

### Changing Moon Colors
Search for color hex codes in script.js:
- Moon color: `#d8d5d1` 
- Moon emission: `#ffaa33` 
- Lantern color: `#ffc96b`

### UI Button Visibility

**Info Button** is now controlled via CSS and JavaScript:
- Edit [styles.css (info button styles)](styles.css#L23) - Default hidden with `opacity: 0` and `pointer-events: none`
- Edit [script.js line 932-934](script.js#L932) - Shown when story starts with `opacity: 1` and `pointer-events: auto`

## Deployment

### Local Testing
```bash
# Python 3
python -m http.server 8000

# Node.js with http-server
npx http-server

# Or use any local server - open http://localhost:8000
```

### Production Hosting
- **Recommended**: Netlify, Vercel, GitHub Pages
- Upload the 3 files: `index.html`, `script.js`, `styles.css`
- Audio and fonts load from CDN (no server storage needed)
- No backend required - fully static site

### Performance on Hosting
- Minify CSS and JavaScript for production
- Enable gzip compression on server
- Use CDN for static assets
- Consider caching headers for Three.js modules

## Browser Console

### Helpful Debug Info
Open DevTools (F12) → Console to see:
- "Music autoplay blocked:" - Browser prevented audio auto-play (user gesture required)
- Any WebGL errors or warnings
- Three.js version confirmation

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Blank screen | Check WebGL support: `new THREE.WebGLRenderer()` |
| Music not playing | Ensure `music.mp3` exists in project root; click button to trigger playback |
| "Music autoplay blocked" error | This is expected - audio plays on button click to comply with browser autoplay policy |
| Janky animation | Lower bloom effect or disable post-processing |
| Mobile lag | Reduce pixel ratio or use portrait orientation |
| Text rendering issues | Check Noto Sans Bengali font loaded in DevTools |
| Info button not visible | Wait for story to start (button becomes visible after clicking "Begin the Story") |

## Accessibility

### Features
- ✅ Keyboard navigation support
- ✅ Semantic HTML (role, aria-labels)
- ✅ Reduced motion preferences respected
- ✅ Focus management in modals
- ✅ High contrast dark theme

### Improvements Needed
- Add ARIA live regions for dynamic content
- Implement screen reader announcements
- Better keyboard focus indicators
- Alt text for 3D scene description

## Future Enhancements

### Planned Features
- [ ] Sound effects (Azan, recitation)
- [ ] Dua history/favorites
- [ ] Sharing personalized prayer
- [ ] Multiple language support
- [ ] Screenshot/PDF export
- [ ] Dark/light theme toggle
- [ ] Dua search functionality
- [ ] Islamic calendar integration

### Technical Improvements
- [ ] Code minification & bundling
- [ ] WebGL fallback for older browsers
- [ ] Progressive Web App (PWA)
- [ ] Offline support with service workers
- [ ] Unit tests
- [ ] E2E tests

## Credits

### Technologies
- **Three.js** - 3D Graphics
- **Google Fonts** - Noto Sans Bengali
- **Pixabay** - Free Ramadan Music

### Inspiration
- Islamic prayer traditions
- Ramadan spiritual significance
- Modern web design principles

## License

This project is created for personal and educational use during Ramadan 2026.

---

## Support & Feedback

For issues or suggestions:
1. Check the browser console for errors (F12)
2. Test in Chrome/Firefox first
3. Clear browser cache and reload
4. Verify JavaScript is enabled

## Developer Notes

### Code Organization
- **UI Functions**: `renderDuaView()`, `renderNameInputView()`, `renderMunaView()`
- **3D Setup**: Moon mesh, lanterns, stars, lighting
- **Event Handlers**: Click, keyboard, resize, visibility
- **Helpers**: `clamp01()`, `seededRandom()`, `easeInOutCubic()`

### Performance Bottlenecks
- Moon texture generation (one-time on load)
- Bloom post-processing (per-frame cost: ~5-10%)
- Lantern smoke particles (per-frame cost: ~2-5%)
- Text geometry loading (one-time, ~1-2 seconds)

### Known Limitations
- Text rendering is English-only (Three.js limitation)
- No mobile gesture support for camera rotation
- Smoke particle count fixed (can be optimized)
- No state persistence between sessions

---

**Created with ❤️ for Ramadan 2026**

*"In the month of Ramadan when the Quran was sent down, it is a guidance for the people and a clear proof of guidance and the Criterion." - Quran 2:185*
