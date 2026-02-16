import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const PARTNER_NAME = "Premii 🤍";

function sanitizeFor3DText(s) {
  return String(s)
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const PARTNER_NAME_3D = sanitizeFor3DText(PARTNER_NAME) || 'My Love';

const hintEl = document.getElementById("hint");
const overlayEl = document.getElementById("overlay");
const startBtn = document.getElementById("startBtn");
const infoBtn = document.getElementById('infoBtn');
const notesModal = document.getElementById('notesModal');
const notesClose = document.getElementById('notesClose');
const notesBody = document.getElementById('notesBody');
const notesCard = document.getElementById('notesCard');
const notesTitleEl = document.getElementById('notesTitle');

const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let isSmallScreen = Math.min(innerWidth, innerHeight) < 720;
let started = false;

const storyLines = [
  "Ramadan Mubarak 🤍",
  "Please pray for us.",
  "Pray for my job.",
  "Pray for our marriage.",
  "Ramadan is the most blessed month for prayer.",
  "So I humbly ask you to remember us in your duas.",
  "Please pray especially after suhoor,",
  "and before iftar, while waiting to break your fast.",
  "At that moment, Allah says to the angels:",
  "\"Look at My servants. Food is ready before them, yet they choose not to eat for My sake.\"",
  "At that time, Allah accepts all sincere duas.",
  "So please include us in your prayers during those precious moments.",
  "I want to live with you.",
  "I want to pray with you.",
  "I want to receive Allah's gifts with you.",
  "And I want to see Allah in Jannatul Firdaus with you.",
  `Ameen 🤍<br>${PARTNER_NAME}`
];

const banglaDuaLines = [
  'সুবহানাল্লাহ (৩ বার)',
  'আলহামদুলিল্লাহ (৩ বার)',
  'লা ইলাহা ইল্লাল্লাহ (৩ বার)',
  'আল্লাহু আকবার (৩ বার)',
  'আস্তাগফিরুল্লাহ (৩ বার)',
  'আল্লাহুম্মাগফিরলি (৩ বার)',
  'আস্তাগফিরুল্লাহ ওয়া আতুবু ইলাইহি (৩ বার)',
  'আস্তাগফিরুল্লাহ হাল্লাজি লা ইলাহা ইল্লা হুয়াল হাইয়ুুল কাইয়ুম ওয়া আতুবু ইলাইহি (৩ বার)',
  'ইয়া রব্বিগফিরলি (৩ বার)',
  'আল্লাহুম্মা আজিরনি মিনান-নার (৩ বার)',
  'সল্লাল্লাহু আলাইহি ওয়াসাল্লাম (৩ বার)',
  'লা হাওলা ওয়ালা কুউওয়াতা ইল্লা বিল্লাহ (৩ বার)',
  'লা ইলাহা ইল্লা আংতা সুবহানাকা ইন্নি কুংতু মিনায জোয়ালিমিন (৩ বার)',
  'লা ইলাহা ইল্লাল্লাহু মুহাম্মাদুর রাসূলুল্লাহ সাঃ (৩ বার)',
  'লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারিকালাহু আহাদান ছামাদান লাম ইয়ালিদ ওয়ালাম ইয়ুলাদ ওয়ালাম ইয়া কুল্লাহু কুফুওয়ান আহাদ (৩ বার)',
  "আস্তাগফিরুল্লাহ্-হাল্লাজি লা ইলাহা ইল্লা হুওয়াল হাইয়্যুল কাইয়্যুম ওয়া আতুবু ইলাইহি, লা হাওলা ওয়ালা কুয়্যাতা ইল্লা বিল্লাহিল আলিয়্যিল আযী'ম (৩ বার)",
  'আলহামদুলিল্লাহ'
];

const comprehensiveDua = `
ইয়া রহমান, ইয়া রহিম,
ইয়া জাল জালালি ওয়াল ইকরাম,
ইয়া গাফফার, ইয়া সাত্তার,
ইয়া জব্বার, ইয়া ওয়াদুদ,
ইয়া আজিজু, ইয়া আজিম,
ইয়া হান্নানু, ইয়া মান্নান

হে আমার রব,
হে আমার সৃষ্টি কর্তা।

তোমার পবিত্র নামগুলোর উছিলায়,
তোমার তাওহীদের সাক্ষী
লা ইলাহা ইল্লাল্লাহু এর উছিলায়,
এবং তোমার বন্ধু ও হাবীব
হযরত মুহাম্মদ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) এর উম্মত হিসেবে

আমাদের সকলের মনের নেক ইচ্ছাগুলো তুমি পূরণ করে দাও।
আমাদের অভাব ও ঋণ দূর করে দাও।
আমার মতো যারা বিপদে আছে
তাদের সবাইকে তুমি বিপদ থেকে মুক্ত করে দাও।
আমাদের অন্তরের কষ্ট, দুঃখ ও অস্থিরতা দূর করে দাও।

হে আল্লাহ,
আমি তোমার এক বান্দাকে ভালোবেসেছি।
যদি আমরা দু’জন একে অপরের জন্য কল্যাণকর না হয়ে থাকি
তবে তুমি আমাদের মাঝে কল্যাণ বর্ষণ করে দাও।
ভালোবাসায় আমাদের পূর্ণ করে দাও, তোমার রহমত নাযিল করো।

হে পরম করুণাময়,
আমাদের দু’জনকে একে অপরের জন্য
সর্বোচ্চ কল্যাণকর, সর্বোচ্চ উত্তম,
সর্বোচ্চ শান্তি ও প্রশান্তিময় করে দাও।
আমাদের অন্তরে একে অপরের জন্য
অগাধ ভালোবাসা, মুগ্ধতা, সম্মান, শ্রদ্ধা,
মহব্বত ও অটুট বিশ্বাস দান করো।

তুমি তো সর্বশক্তিমান, হে আল্লাহ
তুমি চাইলে তো সবই সম্ভব।

হে আল্লাহ,
তুমি {HUSBAND_NAME} এবং আমাকে
একে অপরের জন্য যথেষ্ট করে দাও।
কোনো সমস্যা, জটিলতা ও কষ্ট ছাড়া
হালালভাবে, মন অপরিবর্তিত রেখে
আজীবনের জন্য জীবনসঙ্গী হিসেবে আমাদের কবুল করে নাও।

হে রব,
বিয়ের সঠিক সময়টাকে আমাদের খুব কাছে নিয়ে এসো।
আমাদের অপেক্ষাকে সহজ করে দাও।
আমাদের দোয়াগুলোকে কবুলের সৌন্দর্যে সাজিয়ে দাও।
সব কিছু তো তোমারই মুখাপেক্ষী
তোমার আদেশেই সব কিছু হয়।


হে পরম দয়ালু,
কোনো ফিতনা, কোনো অশান্তি ছাড়া
আমার মনকে দৃঢ় ও অপরিবর্তিত রেখে
তাকে আজীবনের জন্য
আমার জীবনসঙ্গী হিসেবে কবুল করে নাও।
তুমি তো সেই রব
যিনি দোয়ার মাধ্যমে ভাগ্যও পরিবর্তন করে দাও।

আর হে আল্লাহ,
যেভাবে তুমি আমাদের দুনিয়াতে এক করতে চাইছো
সেভাবেই আমাদের
জান্নাতুল ফেরদৌসেও একসাথে রেখো।
সেখানে যেন কোনো বিচ্ছেদ না থাকে
থাকে শুধু তোমার সন্তুষ্টি
আর চিরস্থায়ী শান্তি।

আমিন, ইয়া রব্বুল আলামিন  🤲🌙`;

let husbandName = '';
const phaseLabel = document.getElementById('phaseLabel');

function renderDuaView() {
  const html = `
    <div class="bn bnPanel" aria-label="Bangla dua list">
      <div class="bnTitleRow">
        <h3>দোয়া ও যিকির</h3>
        <span class="bnBadge">পড়ুন মনোযোগ দিয়ে</span>
      </div>
      <ol>${banglaDuaLines.map((t) => `<li>${t}</li>`).join('')}</ol>
      <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.12);">
        <button id="duaNextBtn" class="duaBtn" type="button">Next →</button>
      </div>
    </div>
  `;
  notesBody.innerHTML = html;
  document.getElementById('duaNextBtn').addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    renderNameInputView();
  });
}

function renderNameInputView() {
  const html = `
    <div style="text-align:center;">
      <p style="margin:0 0 14px; color:rgba(255,255,255,0.9); font-size:0.95rem; line-height:1.45;">
        দু'আ করো। অসম্ভবের জন্য দু'আ করো এবং দেখো আল্লাহ কিভাবে তোমার জন্য তা সম্ভব করে তোলেন, কারণ তাঁর কাছে কিছুই অসম্ভব নয়। যখন তুমি প্রার্থনা করো, তখন তোমার পুরো হৃদয় দিয়ে প্রার্থনা করো এবং নিজেকে নিশ্চিত করো যে আল্লাহ তোমাকে তোমার যা কিছু চাও তা দেবেন, সন্দেহের কোন অবকাশ নেই। এমনকি যদি তুমি মনে করো যে সবকিছুই স্থির হয়ে গেছে এবং কিছুই করা যাবে না, তবুও দু'আ করো।
      </p>
      <h3 style="margin:0 0 8px; color:rgba(212,175,55,0.95); font-size:1.1rem;">আপনার ভবিষ্যৎ স্বামীর নাম লিখুন</h3>
      <p style="margin:0 0 14px; color:rgba(255,255,255,0.8); font-size:0.95rem;">দোয়ায় তার নাম অন্তর্ভুক্ত হবে</p>
      <input id="husbandNameInput" type="text" placeholder="নাম লিখুন..." />
      <button id="nameSubmitBtn" class="duaBtn" type="button">Next →</button>
    </div>
  `;
  notesBody.innerHTML = html;
  const input = document.getElementById('husbandNameInput');
  const submitBtn = document.getElementById('nameSubmitBtn');
  
  input.focus();
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const name = input.value.trim();
    if (name) {
      husbandName = name;
      renderMunaView();
    }
  };
  submitBtn.addEventListener('pointerdown', handleSubmit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSubmit(e);
  });
}

function renderMunaView() {
  const personalizedDua = comprehensiveDua.replace('{HUSBAND_NAME}', husbandName || 'আমার প্রিয়জন');
  const html = `
    <div class="bn bnPanel">
      <div class="bnTitleRow">
        <h3>দোয়া ও মুনাজাত</h3>
      </div>
      <span style="font-size:0.85rem; color:rgba(212,175,55,0.75);">${husbandName || 'আপনার'} এর জন্য</span>
      ${personalizedDua.split('\n\n').map(para => 
        `<div class="duaText">${para.split('\n').join('<br>')}</div>`
      ).join('')}
      <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.12);">
        <button id="backBtn" class="duaBtn" type="button">← Back to دعا</button>
      </div>
    </div>
  `;
  notesBody.innerHTML = html;
  document.getElementById('backBtn').addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    renderDuaView();
  });
}

function renderNotes(mode) {
  if (mode === 'dua') {
    renderDuaView();
    return;
  }

  const storyHtml = storyLines.map((line) => `<p>${line}</p>`).join('');
  const wrapped = `
    <div class="storyPanel" aria-label="Story lines">
      <div class="storyTitleRow">
        <h3>গল্প / বার্তা</h3>
        <span class="storyPill">ক্লিক: 🌙 দোয়া</span>
      </div>
      ${storyHtml}
    </div>
  `;
  notesBody.innerHTML = wrapped;
}

function setNotesTilt(enabled) {
  if (!notesCard) return;
  if (!enabled) {
    notesCard.style.transform = '';
    notesCard.style.boxShadow = '';
    return;
  }

  const maxRot = 7;

  const onMove = (e) => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = notesCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * (maxRot * 2);
    const rotX = -(y - 0.5) * (maxRot * 2);
    notesCard.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(0)`;
    notesCard.style.boxShadow = '0 18px 70px rgba(0,0,0,0.60)';
  };

  const onLeave = () => {
    notesCard.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    notesCard.style.boxShadow = '0 16px 60px rgba(0,0,0,0.55)';
  };

  notesCard.addEventListener('pointermove', onMove);
  notesCard.addEventListener('pointerleave', onLeave);
  notesCard.addEventListener('pointerdown', onMove, { passive: true });

  notesCard._tiltCleanup = () => {
    notesCard.removeEventListener('pointermove', onMove);
    notesCard.removeEventListener('pointerleave', onLeave);
    notesCard.removeEventListener('pointerdown', onMove);
    notesCard.style.transform = '';
    notesCard.style.boxShadow = '';
  };
}

function openNotes(mode) {
  renderNotes(mode);
  notesModal.dataset.open = 'true';

  if (notesTitleEl) {
    notesTitleEl.textContent = mode === 'dua' ? 'দোয়া ও যিকির' : 'Prayer / Wish Notes';
  }

  const canHover = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  setNotesTilt(!!canHover);
}

function openDuaFromMoon() {
  husbandName = '';
  renderDuaView();
  notesModal.dataset.open = 'true';
  notesTitleEl.textContent = 'দোয়া ও যিকির';
  
  setTimeout(() => {
    const panel = notesBody.querySelector('.bnPanel');
    if (!panel) return;
    panel.classList.remove('flash');
    void panel.offsetWidth;
    panel.classList.add('flash');
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 0);
}

function closeNotes() {
  notesModal.dataset.open = 'false';
  if (notesCard && typeof notesCard._tiltCleanup === 'function') {
    notesCard._tiltCleanup();
    notesCard._tiltCleanup = null;
  }
  // Restore overlay if story hasn't started
  if (!started) {
    overlayEl.style.opacity = 1;
    overlayEl.style.pointerEvents = 'auto';
  }
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x04040a);
scene.fog = new THREE.FogExp2(0x000000,0.0018);

const camera = new THREE.PerspectiveCamera(70,innerWidth/innerHeight,0.1,1000);
camera.position.set(0,6,28);

const renderer = new THREE.WebGLRenderer({
  antialias: !(isSmallScreen || prefersReducedMotion),
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, isSmallScreen ? 1.5 : 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

const clickRaycaster = new THREE.Raycaster();
const clickNdc = new THREE.Vector2();

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  0.85,
  0.6,
  0.22
);
composer.addPass(bloomPass);

function tuneBloomForDevice() {
  if (prefersReducedMotion) {
    bloomPass.strength = 0.35;
    bloomPass.radius = 0.25;
    bloomPass.threshold = 0.35;
    return;
  }

  if (isSmallScreen) {
    bloomPass.strength = 0.62;
    bloomPass.radius = 0.52;
    bloomPass.threshold = 0.28;
  } else {
    bloomPass.strength = 0.85;
    bloomPass.radius = 0.6;
    bloomPass.threshold = 0.22;
  }
}

tuneBloomForDevice();

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.enablePan=false;
controls.minDistance=18;
controls.maxDistance=40;

if (isSmallScreen) {
  controls.enableRotate = false;
  controls.enableZoom = false;
}

scene.add(new THREE.AmbientLight(0x1b2140, 0.22));
const hemi = new THREE.HemisphereLight(0x2a4bff, 0x0b0614, 0.18);
scene.add(hemi);

const SUN_DISTANCE = 75;
const sunLight = new THREE.DirectionalLight(0xfff1d6, 1.25);
sunLight.position.set(0, 22, 60);
scene.add(sunLight);

const sunMat = new THREE.MeshBasicMaterial({ color: 0xfff2c2 });
sunMat.toneMapped = false;
const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(1.25, 28, 28), sunMat);
scene.add(sunMesh);

const moonKey = new THREE.DirectionalLight(0xffffff, 2.3);
moonKey.position.set(12, 6, 18);
scene.add(moonKey);
const moonKeyBase = new THREE.Vector3(12, 6, 18);

const sunDir = new THREE.Vector3(0, 0.35, 1).normalize();
const tmpVec3 = new THREE.Vector3();

const moonFill = new THREE.PointLight(0xffd4a3, 0.7, 120);
moonFill.position.set(-10, 2, 10);
scene.add(moonFill);

function clamp01(v){ return Math.min(1, Math.max(0, v)); }

function seededRandom(seed){
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function generateMoonHeight(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(size, size);
  const data = img.data;

  const rand = seededRandom(1337);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const n = rand();
      const m = rand();
      const v = clamp01(0.55 * n + 0.35 * m + 0.1 * ((x ^ y) % 7) / 7);
      const g = Math.floor(v * 255);
      data[i] = g;
      data[i + 1] = g;
      data[i + 2] = g;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  ctx.globalCompositeOperation = 'source-over';
  const craterCount = Math.floor(size / 2.2);
  for (let c = 0; c < craterCount; c++) {
    const cx = Math.floor(rand() * size);
    const cy = Math.floor(rand() * size);
    const r = (rand() * 0.018 + 0.006) * size;
    const grd = ctx.createRadialGradient(cx, cy, r * 0.05, cx, cy, r);
    grd.addColorStop(0.0, 'rgba(0,0,0,0.00)');
    grd.addColorStop(0.35, 'rgba(0,0,0,0.10)');
    grd.addColorStop(0.70, 'rgba(255,255,255,0.06)');
    grd.addColorStop(1.0, 'rgba(0,0,0,0.12)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 0.55;
  for (let k = 0; k < 3; k++) {
    ctx.drawImage(canvas, -1, -1);
    ctx.drawImage(canvas, 1, 1);
  }
  ctx.globalAlpha = 1;

  return canvas;
}

function makeNormalFromHeight(heightCanvas) {
  const size = heightCanvas.width;
  const hctx = heightCanvas.getContext('2d');
  const hImg = hctx.getImageData(0, 0, size, size);
  const hData = hImg.data;

  const nCanvas = document.createElement('canvas');
  nCanvas.width = size;
  nCanvas.height = size;
  const nctx = nCanvas.getContext('2d');
  const nImg = nctx.createImageData(size, size);
  const nData = nImg.data;

  const strength = 2.2;
  const idx = (x, y) => (y * size + x) * 4;
  const sample = (x, y) => {
    x = (x + size) % size;
    y = (y + size) % size;
    return hData[idx(x, y)] / 255;
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const hl = sample(x - 1, y);
      const hr = sample(x + 1, y);
      const hd = sample(x, y - 1);
      const hu = sample(x, y + 1);
      const dx = (hl - hr) * strength;
      const dy = (hd - hu) * strength;

      let nx = dx;
      let ny = dy;
      let nz = 1.0;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= len; ny /= len; nz /= len;

      const i = idx(x, y);
      nData[i] = Math.floor((nx * 0.5 + 0.5) * 255);
      nData[i + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      nData[i + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      nData[i + 3] = 255;
    }
  }

  nctx.putImageData(nImg, 0, 0);
  return nCanvas;
}

function generateMoonAlbedo(size = 512, heightCanvas) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#d8d5d1';
  ctx.fillRect(0, 0, size, size);

  const rand = seededRandom(2024);
  ctx.globalAlpha = 0.35;
  for (let i = 0; i < 70; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = (rand() * 0.09 + 0.02) * size;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(80,80,90,0.40)');
    g.addColorStop(1, 'rgba(80,80,90,0.00)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  if (heightCanvas) {
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.75;
    ctx.drawImage(heightCanvas, 0, 0, size, size);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  return canvas;
}

function createFresnelMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color(0xffe7b0) },
      uPower: { value: 2.4 },
      uIntensity: { value: 0.55 }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPos.xyz);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uPower;
      uniform float uIntensity;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float fres = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), uPower);
        float a = fres * uIntensity;
        gl_FragColor = vec4(uColor, a);
      }
    `
  });
}

const moonTexSize = (isSmallScreen || prefersReducedMotion) ? 512 : 768;
const moonHeight = generateMoonHeight(moonTexSize);
const moonNormal = makeNormalFromHeight(moonHeight);
const moonAlbedo = generateMoonAlbedo(moonTexSize, moonHeight);

const moonMap = new THREE.CanvasTexture(moonAlbedo);
moonMap.colorSpace = THREE.SRGBColorSpace;
moonMap.anisotropy = 8;

const moonBump = new THREE.CanvasTexture(moonHeight);
moonBump.anisotropy = 8;

const moonNorm = new THREE.CanvasTexture(moonNormal);
moonNorm.anisotropy = 8;

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6.2, (isSmallScreen ? 96 : 128), (isSmallScreen ? 96 : 128)),
  new THREE.MeshStandardMaterial({
    map: moonMap,
    normalMap: moonNorm,
    displacementMap: moonBump,
    displacementScale: 0.12,
    roughness: 0.95,
    metalness: 0.0
  })
);
moon.position.set(0, 0, 0);
scene.add(moon);

const crescent = {
  occluderPos: new THREE.Vector3(1.75, 0.25, 0.15),
  occluderRadius: 6.55
};

const PHASES = [
  { name: 'New Moon', t: 0.00 },
  { name: 'Waxing Crescent', t: 0.12 },
  { name: 'First Quarter', t: 0.25 },
  { name: 'Waxing Gibbous', t: 0.38 },
  { name: 'Full Moon', t: 0.50 },
  { name: 'Waning Gibbous', t: 0.62 },
  { name: 'Last Quarter', t: 0.75 },
  { name: 'Waning Crescent', t: 0.88 }
];

let phaseIndex = 1;
let phaseT = PHASES[phaseIndex].t;

const FULL_MOON_T = 0.5;
const FULL_MOON_SECONDS = 10;
let fullMoonMode = false;
let fullMoonStartTime = 0;
let fullMoonFromT = phaseT;

function easeInOutCubic(x){
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function applyMoonPhase(t, updateLabel = false, label) {
  const tt = ((t % 1) + 1) % 1;
  phaseT = tt;

  const xOffset = (tt - 0.5) * 4.6;
  const yOffset = 0.10 + Math.sin(tt * Math.PI * 2) * 0.08;
  crescent.occluderPos.set(xOffset, yOffset, 0.15);

  crescent.occluderRadius = 6.5 + Math.cos(tt * Math.PI * 2) * 0.08;

  sunDir.set(Math.sin(tt * Math.PI * 2), 0.35, Math.cos(tt * Math.PI * 2)).normalize();

  sunLight.position.copy(sunDir).multiplyScalar(SUN_DISTANCE);
  sunMesh.position.copy(sunDir).multiplyScalar(SUN_DISTANCE * 0.86);

  moonKeyBase.copy(sunDir).multiplyScalar(18);
  moonKey.color.copy(sunLight.color);
  moonKey.intensity = sunLight.intensity * 1.9;
  moonFill.intensity = sunLight.intensity * 0.55;

  if (moon.material.userData.shader) {
    const sh = moon.material.userData.shader;
    sh.uniforms.uOccPos.value.copy(crescent.occluderPos);
    sh.uniforms.uOccR.value = crescent.occluderRadius;
  }

  if (updateLabel) {
    phaseLabel.textContent = label ? `Moon phase: ${label}` : `Moon phase: ${Math.round(tt * 100)}%`;
  }
}

function setMoonPhase(t, label) {
  applyMoonPhase(t, true, label);
}

function nextMoonPhase(step = 1) {
  phaseIndex = (phaseIndex + step + PHASES.length) % PHASES.length;
  const p = PHASES[phaseIndex];
  setMoonPhase(p.t, p.name);
}

moon.material.onBeforeCompile = (shader) => {
  shader.uniforms.uOccPos = { value: crescent.occluderPos };
  shader.uniforms.uOccR = { value: crescent.occluderRadius };

  shader.vertexShader = shader.vertexShader
    .replace(
      '#include <common>',
      '#include <common>\nvarying vec3 vObjPos;'
    )
    .replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\nvObjPos = position;'
    );

  shader.fragmentShader = shader.fragmentShader
    .replace(
      '#include <common>',
      '#include <common>\nvarying vec3 vObjPos;\nuniform vec3 uOccPos;\nuniform float uOccR;'
    )
    .replace(
      'void main() {',
      'void main() {\n  if (length(vObjPos - uOccPos) < uOccR) discard;'
    );

  moon.material.userData.shader = shader;
};
moon.material.needsUpdate = true;

const moonHalo = new THREE.Mesh(
  new THREE.SphereGeometry(6.35, (isSmallScreen ? 72 : 96), (isSmallScreen ? 72 : 96)),
  createFresnelMaterial()
);
moonHalo.renderOrder = 2;
scene.add(moonHalo);

renderer.domElement.addEventListener('pointerdown', (e) => {
  if (notesModal.dataset.open === 'true') return;

  const rect = renderer.domElement.getBoundingClientRect();
  clickNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  clickNdc.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  clickRaycaster.setFromCamera(clickNdc, camera);

  const hits = clickRaycaster.intersectObjects([moon, moonHalo], true);
  if (hits && hits.length) {
    e.preventDefault();
    e.stopPropagation();
    openDuaFromMoon();
  }
}, { passive: false });

function makeStarLayer(count, spread, size, opacity) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const rand = seededRandom(Math.floor(999 + size * 1000));
  for (let i = 0; i < pos.length; i += 3) {
    pos[i] = (rand() - 0.5) * spread;
    pos[i + 1] = (rand() - 0.5) * spread;
    pos[i + 2] = (rand() - 0.5) * spread;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    size,
    color: 0xffffff,
    transparent: true,
    opacity,
    depthWrite: false
  });
  return new THREE.Points(geo, mat);
}

const starsFar = makeStarLayer(isSmallScreen ? 950 : 1400, 420, 0.35, 0.45);
const starsMid = makeStarLayer(isSmallScreen ? 700 : 1000, 320, 0.55, 0.65);
const starsNear = makeStarLayer(isSmallScreen ? 520 : 700, 240, 0.85, 0.85);
scene.add(starsFar, starsMid, starsNear);

const lanterns=[];
const lanternSmokes=[];

function createSoftParticleTexture(){
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const smokeTex = createSoftParticleTexture();

function createLanternSmoke(count = 140){
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const speed = new Float32Array(count);
  const phase = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3 + 0] = (Math.random() - 0.5) * 0.9;
    pos[i * 3 + 1] = Math.random() * 3.5;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 0.9;
    speed[i] = 0.45 + Math.random() * 0.75;
    phase[i] = Math.random() * Math.PI * 2;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1));
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
  geo.attributes.position.setUsage(THREE.DynamicDrawUsage);

  const mat = new THREE.PointsMaterial({
    map: smokeTex,
    size: 0.55,
    sizeAttenuation: true,
    color: 0xfff1d4,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const pts = new THREE.Points(geo, mat);
  pts.position.set(0, 1.05, 0);
  return pts;
}

for(let i=0;i<3;i++){
  const l=new THREE.Mesh(
    new THREE.CylinderGeometry(.6,.8,2.2,12),
    new THREE.MeshStandardMaterial({
      color:0xffc96b,
      emissive:0xffaa33,
      emissiveIntensity:.4
    })
  );
  l.position.set(Math.sin(i*2)*10,-6,Math.cos(i*2)*10);
  l.visible=false;

  const inner = new THREE.PointLight(0xffc96b, 1.2, 26, 2);
  inner.position.set(0, 0.2, 0);
  l.add(inner);

  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xffe2a8,
      emissive: 0xffc96b,
      emissiveIntensity: 1.25,
      roughness: 0.4,
      metalness: 0.0
    })
  );
  orb.position.set(0, 0.2, 0);
  l.add(orb);

  const smoke = createLanternSmoke(isSmallScreen ? 95 : 140);
  l.add(smoke);
  lanternSmokes.push(smoke);

  scene.add(l);
  lanterns.push(l);
}

let finalText;

function layoutFinalText() {
  if (!finalText) return;
  const narrow = Math.min(innerWidth, innerHeight) < 720;
  const portrait = innerHeight > innerWidth;

  finalText.scale.setScalar(narrow ? 0.78 : 0.95);

  finalText.position.set(0, portrait ? -6.8 : -6.2, portrait ? 11.8 : 10.8);
}

new FontLoader().load(
  "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/fonts/helvetiker_regular.typeface.json",
  font=>{
    finalText=new THREE.Mesh(
      new TextGeometry(`Ramadan Mubarak\n${PARTNER_NAME_3D}`,{
        font,
        size:1,
        height:.2,
        bevelEnabled:true,
        bevelSize:.03,
        bevelThickness:.04
      }),
      new THREE.MeshStandardMaterial({
        color:0xfffbf2,
        emissive:0xffffff,
        emissiveIntensity:.18,
        roughness: 0.55,
        metalness: 0.0
      })
    );
    finalText.geometry.center();
    layoutFinalText();
    finalText.visible=false;
    scene.add(finalText);
  }
);

let revealFinalTextAfterFullMoon = false;

function startStory(){
  if (started) return;
  started = true;

  overlayEl.style.opacity=0;
  infoBtn.style.opacity = 1;
  infoBtn.style.pointerEvents = 'auto';
  setTimeout(()=>overlayEl.remove(),1200);
  hintEl.style.opacity = 1;
  setMoonPhase(PHASES[phaseIndex].t, PHASES[phaseIndex].name);

  fullMoonMode = true;
  fullMoonStartTime = performance.now();
  fullMoonFromT = phaseT;

  lanterns.forEach(l=>l.visible=true);

  revealFinalTextAfterFullMoon = true;
}

startBtn.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  e.stopPropagation();
  // Play audio before starting story to ensure user interaction is registered
  const ramadenMusic = document.getElementById('ramadenMusic');
  if (ramadenMusic) {
    ramadenMusic.volume = 0.4;
    ramadenMusic.play().catch(err => console.log('Music play error:', err));
  }
  startStory();
}, { passive: false });

infoBtn.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!started) {
    overlayEl.style.opacity = 0;
    overlayEl.style.pointerEvents = 'none';
  }
  openNotes('story');
}, { passive: false });

notesClose.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  e.stopPropagation();
  closeNotes();
}, { passive: false });

notesModal.addEventListener('pointerdown', (e) => {
  if (e.target === notesModal) closeNotes();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNotes();
  if (e.key === 'i' || e.key === 'I') openNotes('story');
  if (!started) return;
  if (e.key === 'ArrowRight') nextMoonPhase(1);
  if (e.key === 'ArrowLeft') nextMoonPhase(-1);
});

const clock=new THREE.Clock();
let paused = false;
let rafId = null;

function loop(){
  if (paused) {
    rafId = null;
    return;
  }

  rafId = requestAnimationFrame(loop);
  const t=clock.getElapsedTime();

  if (fullMoonMode) {
    const elapsed = (performance.now() - fullMoonStartTime) / 1000;
    const p = Math.min(1, elapsed / FULL_MOON_SECONDS);
    const eased = easeInOutCubic(p);
    const tt = fullMoonFromT + (FULL_MOON_T - fullMoonFromT) * eased;
    applyMoonPhase(tt, false);
    if (p >= 1) {
      fullMoonMode = false;
      setMoonPhase(FULL_MOON_T, 'Full Moon');

      if (revealFinalTextAfterFullMoon && finalText) {
        finalText.visible = true;
        revealFinalTextAfterFullMoon = false;
      }
    }
  } else {
    const drift = prefersReducedMotion ? 0 : (Math.sin(t * 0.06) * 0.004);
    applyMoonPhase(phaseT + drift, false);
  }

  const motion = prefersReducedMotion ? 0.35 : 1;
  moon.rotation.y += 0.0016 * motion;
  moon.rotation.x = Math.sin(t * 0.12) * 0.03 * motion;
  moonHalo.rotation.copy(moon.rotation);
  moon.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02 * motion);

  moonKey.position.copy(moonKeyBase);
  tmpVec3.set(
    Math.sin(t * 0.18) * 0.6 * motion,
    Math.cos(t * 0.12) * 0.35 * motion,
    0
  );
  moonKey.position.add(tmpVec3);

  sunLight.intensity = 1.22 + Math.sin(t * 0.12) * 0.06 * motion;

  starsFar.rotation.y -= 0.00018;
  starsMid.rotation.y -= 0.00028;
  starsNear.rotation.y -= 0.00038;

  lanterns.forEach((l,i)=>{
    l.position.y=Math.sin(t+i)*.6-3;
    l.rotation.y+=.01;
  });

  if (!prefersReducedMotion) {
    for (let li = 0; li < lanternSmokes.length; li++) {
      const pts = lanternSmokes[li];
      const geo = pts.geometry;
      const pos = geo.attributes.position.array;
      const speed = geo.attributes.aSpeed.array;
      const phase = geo.attributes.aPhase.array;
      for (let p = 0; p < speed.length; p++) {
        const i3 = p * 3;
        pos[i3 + 1] += speed[p] * 0.012;
        pos[i3 + 0] += Math.sin(t * 1.2 + phase[p]) * 0.0015;
        pos[i3 + 2] += Math.cos(t * 1.1 + phase[p]) * 0.0015;
        if (pos[i3 + 1] > 3.8) {
          pos[i3 + 1] = 0;
          pos[i3 + 0] = (Math.random() - 0.5) * 0.9;
          pos[i3 + 2] = (Math.random() - 0.5) * 0.9;
        }
      }
      geo.attributes.position.needsUpdate = true;
    }
  }

  controls.update();
  composer.render();
}

function setPaused(nextPaused) {
  paused = nextPaused;
  if (!paused && rafId == null) {
    clock.getDelta();
    rafId = requestAnimationFrame(loop);
  }
}

document.addEventListener('visibilitychange', () => {
  setPaused(document.hidden);
});

setPaused(false);

window.addEventListener("resize",()=>{
  isSmallScreen = Math.min(innerWidth, innerHeight) < 720;
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, isSmallScreen ? 1.5 : 2));
  composer.setSize(innerWidth, innerHeight);
  bloomPass.setSize(innerWidth, innerHeight);
  tuneBloomForDevice();
  layoutFinalText();

  controls.enableRotate = !isSmallScreen;
  controls.enableZoom = !isSmallScreen;
});
