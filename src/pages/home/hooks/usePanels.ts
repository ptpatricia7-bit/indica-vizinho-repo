/**
 * Everything AFTER the chapter: reveal-on-entry, transform parallax, the resample
 * softening pass and the manifesto's word-by-word light-up. Scroll-driven, reversible.
 */

let panelsStarted = false;

export function initPanels() {
  if (typeof window === 'undefined' || panelsStarted) return;
  const start = () => {
    if (panelsStarted) return;
    panelsStarted = true;
    run();
    startCounter();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}

function run() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }),
    { rootMargin: '0px 0px -12% 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const siblings = Array.from(el.parentElement?.children || []).filter((c) =>
      (c as HTMLElement).hasAttribute('data-reveal'),
    );
    el.style.setProperty('--i', String(siblings.indexOf(el)));
    io.observe(el);
  });

  const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  const cio = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        cio.unobserve(el);
        const target = parseFloat(el.dataset.count || '0') || 0;
        const suffix = el.dataset.countSuffix || '';
        const t0 = performance.now();
        const dur = 1400;
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString('pt-BR') + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }),
    { rootMargin: '0px 0px -12% 0px' },
  );
  counters.forEach((el) => cio.observe(el));

  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  let raf = 0;
  const paint = () => {
    raf = 0;
    const h = innerHeight;
    for (const el of layers) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -h || r.top > 2 * h) continue;
      const centre = (r.top + r.height / 2 - h / 2) / h;
      let speed = parseFloat(el.dataset.parallax || '.32');
      if (el.classList.contains('panel-bg') && innerWidth < 780) speed = Math.min(speed, 0.22);
      el.style.setProperty('--py', (centre * -speed * h).toFixed(1) + 'px');
    }
  };

  const soften = (el: HTMLElement) => {
    const media = el as HTMLImageElement & HTMLVideoElement;
    const nw = media.naturalWidth || media.videoWidth;
    const nh = media.naturalHeight || media.videoHeight;
    if (!nw || !nh) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const factor = Math.max(r.width / nw, r.height / nh);
    const px = factor <= 1.15 ? 0 : Math.min(1.6, Math.max(0.4, (factor - 1) * 1.2));
    el.style.setProperty('--soften', px.toFixed(2) + 'px');
  };
  const SOFT = '.stage video, .plate, .panel-bg';
  const softenAll = () => document.querySelectorAll<HTMLElement>(SOFT).forEach(soften);
  document.addEventListener(
    'load',
    (e) => {
      const t = e.target as HTMLElement;
      if (t && t.matches && t.matches(SOFT)) soften(t);
    },
    true,
  );
  document.addEventListener(
    'loadedmetadata',
    (e) => {
      const t = e.target as HTMLElement;
      if (t && t.matches && t.matches(SOFT)) soften(t);
    },
    true,
  );
  addEventListener('resize', softenAll);
  softenAll();

  // Manifesto: wrap words once, light them in order from the section's progress.
  const manifestos = Array.from(document.querySelectorAll<HTMLElement>('[data-words]')).map((el) => {
    const wrap = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          (child.textContent || '').split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
              return;
            }
            const w = document.createElement('span');
            w.className = 'w';
            w.textContent = part;
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          wrap(child);
        }
      });
    };
    wrap(el);
    return { section: el.closest('section') || el, words: Array.from(el.querySelectorAll<HTMLElement>('.w')) };
  });

  const light = () => {
    const h = innerHeight;
    for (const m of manifestos) {
      const r = m.section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > h) continue;
      const p = Math.min(1, Math.max(0, (h * 0.8 - r.top) / (r.height + h * 0.45)));
      const n = m.words.length;
      m.words.forEach((w, i) => w.style.setProperty('--lit', p * (n + 1) > i + 1 ? '1' : '0'));
    }
  };

  addEventListener(
    'scroll',
    () => {
      requestAnimationFrame(light);
      if (!raf) raf = requestAnimationFrame(paint);
    },
    { passive: true },
  );
  addEventListener('resize', paint);
  light();
  paint();
}

/**
 * The 30-day recurrence counter. It counts from the visitor's first day on the site up to
 * day 30 of the cycle (kept locally, renewed when the cycle completes).
 */
function startCounter() {
  const KEY = 'iv-ciclo-inicio';
  let start: number;
  try {
    const saved = localStorage.getItem(KEY);
    start = saved ? parseInt(saved, 10) : Date.now();
    if (!saved) localStorage.setItem(KEY, String(start));
  } catch {
    start = Date.now();
  }
  if (!isFinite(start) || start <= 0) start = Date.now();

  const paint = () => {
    const days = Math.floor((Date.now() - start) / 86400000);
    const day = Math.min(30, Math.max(1, days + 1));
    const pct = Math.round((day / 30) * 100);
    document.querySelectorAll<HTMLElement>('[data-cycle-day]').forEach((el) => {
      el.textContent = String(day);
    });
    document.querySelectorAll<HTMLElement>('[data-cycle-bar]').forEach((el) => {
      el.style.width = pct + '%';
    });
    document.querySelectorAll<HTMLElement>('[data-cycle-msg]').forEach((el) => {
      el.textContent =
        day >= 30 ? 'Ciclo completo — recorrência renovada no dia 30.' : `Faltam ${30 - day} dias para renovar a recorrência.`;
    });
  };
  paint();
  setInterval(paint, 60000);
}