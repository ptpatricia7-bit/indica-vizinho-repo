/**
 * The first screen's driver.
 * One chapter, one screen tall. The film autoplays muted + looped and runs on its own
 * clock; the copy over it changes beat by beat with the playhead. Scrolling never drives
 * the film — it only lets the visitor leave for the panels below.
 */

type Beat = {
  el: HTMLElement;
  from: number;
  to: number;
  parts: HTMLElement[];
  lines: HTMLElement[];
  chips: HTMLElement[];
};

type Chapter = {
  el: HTMLElement;
  beats: Beat[];
  stage: HTMLElement;
  src: string;
  dur: number;
  video: HTMLVideoElement | null;
  playing: boolean;
  held: boolean;
  armed: boolean;
  clock: number;
};

let filmStarted = false;

export function initFilm() {
  if (typeof window === 'undefined' || filmStarted) return;

  const startOnce = () => {
    if (filmStarted) return;
    filmStarted = true;
    run();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startOnce, { once: true });
  } else {
    startOnce();
  }
}

function run() {
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(pointer: fine)').matches;

  const FADE = 0.1;
  const STAGGER = 0.035;
  const NEAR = '200px';
  const FAR = '260%';

  const chapterEls = Array.from(document.querySelectorAll<HTMLElement>('.chapter'));
  if (!chapterEls.length) return;

  if (REDUCED) {
    chapterEls.forEach((el) => el.classList.add('is-static'));
    return;
  }

  // Split headlines into lines so each line rises out of its own clipped box.
  document.querySelectorAll<HTMLElement>('.beat h1[data-split="lines"], .beat h2[data-split="lines"]').forEach((h) => {
    const lines = h.innerHTML
      .split(/<br\s*\/?>/i)
      .map((s) => s.trim())
      .filter(Boolean);
    h.innerHTML = lines
      .map((l) => `<span class="line"><span class="line-in">${l}</span></span>`)
      .join('');
  });

  const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);

  const chapters: Chapter[] = chapterEls.map((el) => {
    const beats: Beat[] = Array.from(el.querySelectorAll<HTMLElement>('.beat')).map((b) => ({
      el: b,
      from: parseFloat(b.dataset.from || '0') || 0,
      to: b.dataset.to ? parseFloat(b.dataset.to) : 1,
      parts: (Array.from(b.children) as HTMLElement[]).filter((c) => !c.classList.contains('chips')),
      lines: Array.from(b.querySelectorAll<HTMLElement>('.line-in')),
      chips: Array.from(b.querySelectorAll<HTMLElement>('.chips li')),
    }));
    return {
      el,
      beats,
      stage: el.querySelector<HTMLElement>('.stage') as HTMLElement,
      src: el.dataset.video || '',
      dur: parseFloat(el.dataset.duration || '') || beats.length * 5,
      video: null,
      playing: false,
      held: false,
      armed: false,
      clock: 0,
    };
  });

  const afterLCP = new Promise<void>((res) => {
    if (document.readyState === 'complete') res();
    else addEventListener('load', () => res(), { once: true });
  }).then(
    () =>
      new Promise<void>((res) => {
        const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
          .requestIdleCallback;
        if (ric) ric(() => res(), { timeout: 1500 });
        else setTimeout(res, 300);
      }),
  );

  function posterOf(c: Chapter): string {
    const plate = c.stage.querySelector<HTMLImageElement>('.plate');
    if (plate && plate.getAttribute('src')) return plate.getAttribute('src') as string;
    console.error('[film] missing .plate <img> in the stage — the first screen has no LCP image.');
    const url = c.el.dataset.poster;
    if (!url) return '';
    const img = document.createElement('img');
    img.className = 'plate';
    img.src = url;
    img.alt = '';
    c.stage.insertBefore(img, c.stage.firstChild);
    return url;
  }

  async function attach(c: Chapter) {
    if (!c || c.video) return;
    await afterLCP;
    if (c.video || !c.el.isConnected) return;
    const v = document.createElement('video');
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = 'auto';
    v.disablePictureInPicture = true;
    v.tabIndex = -1;
    v.setAttribute('aria-hidden', 'true');
    const poster = posterOf(c);
    if (poster) v.poster = poster;
    v.src = c.src;
    v.addEventListener(
      'loadedmetadata',
      () => {
        if (isFinite(v.duration) && v.duration > 0) c.dur = v.duration;
      },
      { once: true },
    );
    v.addEventListener('loadeddata', () => c.stage.classList.add('is-live'), { once: true });
    const veil = c.stage.querySelector('.veil');
    c.stage.insertBefore(v, veil);
    c.video = v;
    start(c);
  }

  function start(c: Chapter) {
    const v = c.video;
    if (!v) return;
    const p = v.play();
    if (!p || !p.then) {
      c.playing = true;
      return;
    }
    p.then(() => {
      c.playing = true;
      if (isFinite(v.duration) && v.duration > 0) v.currentTime = c.clock * v.duration;
      if (c.held) v.pause();
    }).catch(() => {
      c.playing = false;
      if (c.armed) return;
      c.armed = true;
      const retry = () => start(c);
      addEventListener('pointerdown', retry, { once: true, passive: true });
      addEventListener('touchstart', retry, { once: true, passive: true });
    });
  }

  function detach(c: Chapter) {
    if (!c || !c.video) return;
    c.stage.classList.remove('is-live');
    c.playing = false;
    c.video.pause();
    c.video.removeAttribute('src');
    c.video.load();
    c.video.remove();
    c.video = null;
  }

  const find = (t: Element) => chapters.find((c) => c.el === t);
  const near = new IntersectionObserver(
    (es) => es.forEach((e) => e.isIntersecting && attach(find(e.target) as Chapter)),
    { rootMargin: NEAR },
  );
  const far = new IntersectionObserver(
    (es) => es.forEach((e) => !e.isIntersecting && detach(find(e.target) as Chapter)),
    { rootMargin: FAR },
  );
  chapters.forEach((c) => {
    near.observe(c.el);
    far.observe(c.el);
  });

  function playhead(c: Chapter, dt: number) {
    const v = c.video;
    if (c.playing && v && isFinite(v.duration) && v.duration > 0) {
      c.clock = clamp01(v.currentTime / v.duration);
      return c.clock;
    }
    if (!c.held) c.clock = (c.clock + dt / Math.max(1, c.dur)) % 1;
    return c.clock;
  }

  function setState(el: HTMLElement, o: number, leaving: boolean) {
    el.style.setProperty('--o', o.toFixed(3));
    el.style.setProperty('--o-inv', (1 - o).toFixed(3));
    el.style.setProperty('--dir', leaving ? '1' : '-1');
  }

  function drive(el: HTMLElement, local: number, i: number, n: number) {
    const tIn = clamp01((local - i * STAGGER) / FADE);
    const tOut = clamp01((1 - local - (n - 1 - i) * STAGGER) / FADE);
    setState(el, ease(Math.min(tIn, tOut)), tOut < 1);
  }

  function applyBeats(c: Chapter, p: number) {
    c.beats.forEach((b) => {
      const span = b.to - b.from;
      const local = span > 0 ? (p - b.from) / span : 0;
      const inside = local >= 0 && local < 1;
      b.el.style.setProperty('--local', clamp01(local).toFixed(3));
      if (!inside) {
        [...b.parts, ...b.lines, ...b.chips].forEach((el) => setState(el, 0, local > 1));
      } else {
        b.parts.forEach((el, i) => drive(el, local, i, b.parts.length));
        b.lines.forEach((el, i) => drive(el, local, i * 0.8, b.lines.length * 0.8));
        b.chips.forEach((el, i) => drive(el, local, 2 + i, 2 + b.chips.length));
      }
      b.el.classList.toggle('is-on', inside);
      b.el.classList.toggle('is-leaving', inside && 1 - local < FADE + STAGGER * 4);
    });
  }

  if (FINE) {
    chapters.forEach((c) => {
      c.stage.addEventListener('pointerover', (e) => {
        const t = e.target as HTMLElement;
        if (t.closest('.beat')) hold(c, true);
      });
      c.stage.addEventListener('pointerout', (e) => {
        const t = e.relatedTarget as HTMLElement | null;
        if (!t || !t.closest || !t.closest('.beat')) hold(c, false);
      });
    });
  }

  function hold(c: Chapter, on: boolean) {
    if (c.held === on) return;
    c.held = on;
    const v = c.video;
    if (!v || !c.playing) return;
    if (on) v.pause();
    else v.play().catch(() => {});
  }

  function setExit(c: Chapter) {
    const top = c.el.getBoundingClientRect().top;
    c.el.style.setProperty('--exit', clamp01(-top / Math.max(1, innerHeight)).toFixed(3));
  }

  addEventListener(
    'scroll',
    () => document.documentElement.style.setProperty('--cue', '0'),
    { once: true, passive: true },
  );

  let raf = 0;
  let prev = 0;
  const inView = new Set<Element>();
  const runObs = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) inView.add(e.target);
      else {
        inView.delete(e.target);
        const c = find(e.target);
        if (c) setExit(c);
      }
    });
    if (inView.size && !raf) {
      prev = 0;
      raf = requestAnimationFrame(tick);
    }
    if (!inView.size && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  chapters.forEach((c) => runObs.observe(c.el));

  function tick(now: number) {
    const dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0;
    prev = now;
    for (const c of chapters) {
      setExit(c);
      applyBeats(c, playhead(c, dt));
    }
    raf = requestAnimationFrame(tick);
  }

  // POINTER PARALLAX — the front planes follow the mouse a few pixels.
  if (FINE) {
    const root = document.documentElement;
    const MLERP = 0.08;
    let tx = 0;
    let ty = 0;
    let mx = 0;
    let my = 0;
    let mraf = 0;
    const settle = () => {
      mx += (tx - mx) * MLERP;
      my += (ty - my) * MLERP;
      root.style.setProperty('--mx', mx.toFixed(3));
      root.style.setProperty('--my', my.toFixed(3));
      mraf = Math.abs(tx - mx) + Math.abs(ty - my) > 0.002 ? requestAnimationFrame(settle) : 0;
    };
    const aim = (x: number, y: number) => {
      tx = x;
      ty = y;
      if (!mraf) mraf = requestAnimationFrame(settle);
    };
    addEventListener(
      'pointermove',
      (e) => aim((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1),
      { passive: true },
    );
    document.addEventListener('mouseleave', () => aim(0, 0));
  }
}