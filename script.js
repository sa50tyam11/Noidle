/* =========================================
   NOIDLE — script.js
   Pixel Art · Retro Neon · Dark Room Vibes
   ========================================= */

// ── TYPEWRITER ──────────────────────────────
const typeText = document.getElementById('typeText');
const phrases = [
  'learn. build. grow. 💻',
  'DSA grind every day ⚡',
  'LeetCode Sundays 🏆',
  'AI/ML talks incoming 🤖',
  'Cybersec & Web Dev 🔒',
  '78 builders & counting 🚀',
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function type() {
  if (!typeText) return;
  const current = phrases[phraseIdx];
  if (!isDeleting) {
    typeText.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeText.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, isDeleting ? 40 : 70);
}
setTimeout(type, 1400);


// ── PIXEL CANVAS PARTICLES ──────────────────
(function initCanvas() {
  const canvas = document.getElementById('pixelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const pixels = Array.from({ length: 60 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() < 0.6 ? 2 : 4,
    speed: 0.15 + Math.random() * 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    color: Math.random() < 0.5 ? '#b47fff' : '#80ffea',
    drift: (Math.random() - 0.5) * 0.3,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pixels.forEach(p => {
      ctx.globalAlpha = p.opacity * (0.5 + 0.5 * Math.sin(Date.now() * 0.001 + p.x));
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);

      p.y -= p.speed;
      p.x += p.drift;
      p.opacity -= 0.0005;

      if (p.y < -10 || p.opacity <= 0) {
        p.x = Math.random() * canvas.width;
        p.y = canvas.height + 10;
        p.opacity = Math.random() * 0.4 + 0.1;
        p.speed = 0.15 + Math.random() * 0.3;
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();


// ── COUNT-UP STATS ───────────────────────────
function countUp(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const run = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start);
    if (start < target) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        countUp(el, parseInt(el.dataset.target), 1200);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);


// ── SCROLL REVEAL ────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
revealEls.forEach(el => revealObserver.observe(el));


// ── NAV SCROLL BEHAVIOUR ─────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = current;
}, { passive: true });
navbar.style.transition = 'transform 0.3s ease';


// ── NAVBAR ACTIVE LINK HIGHLIGHT ─────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('nav-active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('nav-active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => sectionObserver.observe(s));


// ── PIXEL GLITCH ON HOVER (feat cards) ───────
document.querySelectorAll('.feat-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const icon = card.querySelector('.feat-icon');
    if (!icon) return;
    const original = icon.textContent;
    const glitchChars = ['▓', '▒', '░', '█', '▪'];
    let count = 0;
    const iv = setInterval(() => {
      icon.textContent = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      count++;
      if (count > 4) { clearInterval(iv); icon.textContent = original; }
    }, 60);
  });
});


// ── NEON FLICKER (CTA box border) ────────────
(function neonPulse() {
  const ctaBox = document.querySelector('.cta-box');
  if (!ctaBox) return;
  setInterval(() => {
    const shouldFlicker = Math.random() < 0.08;
    if (shouldFlicker) {
      ctaBox.style.borderColor = 'rgba(180,127,255,0.05)';
      setTimeout(() => {
        ctaBox.style.borderColor = '';
      }, 80 + Math.random() * 100);
    }
  }, 400);
})();


// ── CHANNEL ITEM CLICK HIGHLIGHT ─────────────
document.querySelectorAll('.ch-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.ch-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});


// ── SMOOTH ANCHOR SCROLL ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ── ACTIVE NAV STYLE INJECTION ────────────────
const styleTag = document.createElement('style');
styleTag.textContent = `
  .nav-links a.nav-active {
    color: var(--purple);
    text-shadow: 0 0 8px rgba(180,127,255,0.5);
  }
`;
document.head.appendChild(styleTag);


// ── PIXEL CURSOR TRAIL ────────────────────────
(function cursorTrail() {
  const trail = [];
  const maxTrail = 8;
  document.addEventListener('mousemove', e => {
    trail.push({ x: e.clientX, y: e.clientY, life: 1 });
    if (trail.length > maxTrail) trail.shift();

    trail.forEach((p, i) => {
      let dot = document.getElementById(`trail-${i}`);
      if (!dot) {
        dot = document.createElement('div');
        dot.id = `trail-${i}`;
        dot.style.cssText = `
          position:fixed;pointer-events:none;z-index:9997;
          width:4px;height:4px;background:var(--purple);
          image-rendering:pixelated;transition:opacity 0.1s;
        `;
        document.body.appendChild(dot);
      }
      dot.style.left = p.x + 'px';
      dot.style.top = p.y + 'px';
      dot.style.opacity = (i / maxTrail) * 0.5;
      dot.style.transform = `translate(-50%,-50%) scale(${i / maxTrail})`;
    });
  });
})();


// ── BOOT MESSAGE IN CONSOLE ───────────────────
console.log('%c𐌍Ꝋ𐌉𐌃𐌋𐌄 Tech Community', 'color:#80ffea;font-family:"Courier New";font-size:20px;font-weight:bold;text-shadow:0 0 10px #80ffea;');
console.log('%c discord.gg/s2fnGZxgNV', 'color:#b47fff;font-family:"Courier New";font-size:13px;');
console.log('%c learning // building // growing', 'color:#6e6a9b;font-family:"Courier New";font-size:11px;');
