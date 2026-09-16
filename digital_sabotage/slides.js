/*
  Digital Sabotage — deck engine.
  Slide content lives in slides-data.js (data) + media/ (assets); nothing here.
  Hash navigation is 1-based so the URL matches the on-screen counter.
*/
(() => {
  const slides = window.SLIDES;
  let idx = parseInt(window.location.hash.slice(1), 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= slides.length) idx = 0;

  const stage = document.getElementById('stage');
  const captionEl = document.getElementById('caption');
  const counterEl = document.getElementById('counter');
  const progressEl = document.getElementById('progress');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');
  const btnNotes = document.getElementById('notes');
  let notesWin = null;

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function render() {
    stage.innerHTML = '';
    const s = slides[idx];

    if (s.kind === 'cover') {
      const d = el('div', 'cover-wrap');
      d.id = 'cover';
      d.append(el('h1', null, s.title));
      d.append(el('p', 'subtitle', s.subtitle));
      d.append(el('p', 'byline', s.byline));
      stage.append(d);
      captionEl.textContent = '';
    } else if (s.kind === 'image') {
      const m = el('div', 'media');
      const img = document.createElement('img');
      img.src = s.src;
      img.alt = s.caption || '';
      m.append(img);
      stage.append(m);
      captionEl.textContent = s.caption || '';
    } else if (s.kind === 'video') {
      const m = el('div', 'media');
      if (/\.(mp4|webm|ogv|m4v|mov)$/i.test(s.src)) {
        const v = document.createElement('video');
        v.src = s.src;
        v.controls = true;
        v.preload = 'metadata';
        if (s.poster) v.poster = s.poster;
        v.addEventListener('loadedmetadata', () => {
          const maxH = window.innerHeight - 150;
          const scale = Math.min(1, maxH / v.videoHeight, window.innerWidth / v.videoWidth);
          v.style.width = Math.round(v.videoWidth * scale) + 'px';
          v.style.height = Math.round(v.videoHeight * scale) + 'px';
        });
        m.append(v);
      } else {
        const frame = document.createElement('iframe');
        frame.src = s.src;
        frame.allow = 'fullscreen; autoplay; encrypted-media; picture-in-picture';
        frame.referrerPolicy = 'origin-when-cross-origin';
        m.append(frame);
      }
      stage.append(m);
      captionEl.textContent = s.caption || '';
    } else if (s.kind === 'side') {
      const row = el('div', 'side');
      s.src.forEach((src) => {
        const f = el('div', 'frame');
        const img = document.createElement('img');
        img.src = src;
        f.append(img);
        row.append(f);
      });
      stage.append(row);
      captionEl.textContent = s.caption || '';
    } else if (s.kind === 'gallery') {
      const g = el('div', 'gallery');
      s.src.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        g.append(img);
      });
      stage.append(g);
      captionEl.textContent = s.caption || '';
    } else if (s.kind === 'text' || s.kind === 'textimg') {
      const wrap = el('div', s.kind === 'text' ? 'text-wrap' : 'textimg');
      const titleEl = el('div', 'slide-title', s.title);
      const subEl = s.sub ? el('div', 'slide-sub', s.sub) : null;
      const body = el('div', 'body');
      s.body.forEach((line) => {
        body.append(el('p', 'line', line));
      });

      if (s.kind === 'text') {
        wrap.append(titleEl);
        if (subEl) wrap.append(subEl);
        wrap.append(body);
      } else {
        const col = el('div', 'text-col');
        col.append(titleEl);
        if (subEl) col.append(subEl);
        col.append(body);
        const fig = el('div', 'figure');
        const img = document.createElement('img');
        img.src = s.src;
        img.alt = s.title;
        fig.append(img);
        wrap.append(col, fig);
      }
      stage.append(wrap);
      captionEl.textContent = '';
    }

    counterEl.textContent = (idx + 1) + ' / ' + slides.length;
    progressEl.style.width = ((idx + 1) / slides.length * 100) + '%';
    btnPrev.disabled = (idx === 0);
    btnNext.disabled = (idx === slides.length - 1);
    document.title = (s.title || s.caption || 'Digital Sabotage') + ' — Digital Sabotage';
    syncNotes();
  }

  function go(n) {
    if (n < 0 || n >= slides.length) return;
    idx = n;
    window.location.hash = idx + 1;
    render();
  }

  function openNotes() {
    if (notesWin && !notesWin.closed) { notesWin.focus(); return; }
    notesWin = window.open('notes.html', 'digital-sabotage-notes', 'width=540,height=800');
    if (notesWin) {
      btnNotes.classList.add('active');
      setTimeout(syncNotes, 350);
    }
  }

  function syncNotes() {
    if (notesWin && !notesWin.closed) {
      notesWin.postMessage({ slide: idx }, '*');
    } else if (btnNotes) {
      btnNotes.classList.remove('active');
    }
  }

  window.addEventListener('hashchange', () => {
    const h = parseInt(window.location.hash.slice(1), 10);
    if (!isNaN(h) && h !== idx + 1 && h >= 1 && h <= slides.length) {
      idx = h - 1;
      render();
    }
  });

  btnPrev.addEventListener('click', () => go(idx - 1));
  btnNext.addEventListener('click', () => go(idx + 1));
  document.getElementById('fullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  });
  btnNotes.addEventListener('click', openNotes);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(idx - 1);
    else if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(idx + 1); }
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(slides.length - 1);
    else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      else document.exitFullscreen();
    }
    else if (e.key === 'n' || e.key === 'N') openNotes();
  });

  let touchX = 0;
  document.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].screenX; }, false);
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchX;
    if (Math.abs(dx) > 50) go(dx < 0 ? idx + 1 : idx - 1);
  }, false);

  render();
})();