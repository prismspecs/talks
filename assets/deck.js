/*
  Shared deck engine. One copy, used by every talk:

    <link rel="stylesheet" href="../assets/deck.css">
    <script src="slides-data.js"></script>
    <script src="../assets/deck.js"></script>
    <script>Deck.init({ slides: window.SLIDES, title: 'Talk Name' });</script>

  Builds the entire page chrome (stage, caption, controls, slide
  navigator sidebar, optional notes-sync button, optional ambient
  background audio bar) from scratch, so every talk gets identical
  markup, styling, and behavior. Per-talk differences are expressed
  only through the config object passed to Deck.init.

  config:
    slides            required, flat array of slide objects
    title             string, used for the wordmark + document.title suffix
    storageKey        string, localStorage namespace (default: slugified title)
    editableCaptions  bool, captions become click-to-edit and persist per viewer
    notes             bool, adds a button that opens notes.html and keeps it
                       synced via postMessage({slide}); slide.note is the
                       lookup key the notes page is responsible for using
    bgAudio           { src, volume? }, adds a persistent ambient audio bar
*/
(() => {
  const KIND_HTML = new Set(['cover', 'section', 'text', 'textimg']);

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function icon(paths, size) {
    const s = size || 20;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', s);
    svg.setAttribute('height', s);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    paths.forEach((d) => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d);
      svg.append(p);
    });
    return svg;
  }

  function fmtTime(t) {
    if (!isFinite(t)) return '0:00';
    t = Math.round(t);
    const m = Math.floor(t / 60), s = t % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  function slugify(s) {
    return (s || 'deck').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'deck';
  }

  // Basic Python-ish keyword highlighter for the "code" slide kind, so
  // slide data can stay plain text instead of carrying pre-built HTML.
  const PY_KEYWORDS = ['def', 'for', 'in', 'with', 'if', 'continue', 'import', 'return', 'while', 'else', 'elif'];
  const PY_BUILTINS = ['range', 'print', 'len', 'open'];
  function highlightCode(code) {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return esc(code)
      .replace(/(#.*)$/gm, '<span class="code-str">$1</span>')
      .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="code-str">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="code-num">$1</span>')
      .replace(new RegExp('\\bdef\\s+([a-zA-Z_]\\w*)', 'g'), 'def <span class="code-fname">$1</span>')
      .replace(new RegExp('\\b(' + PY_KEYWORDS.join('|') + ')\\b', 'g'), '<span class="code-kw">$1</span>')
      .replace(new RegExp('\\b(' + PY_BUILTINS.join('|') + ')\\b', 'g'), '<span class="code-builtin">$1</span>');
  }

  function init(config) {
    const slides = config.slides || [];
    const storageKey = config.storageKey || slugify(config.title);
    const talkTitle = config.title || 'Talk';

    document.title = talkTitle;

    // ---- build chrome ----
    const progress = el('div'); progress.id = 'progress';
    const stage = el('div'); stage.id = 'stage';
    const caption = el('div'); caption.id = 'caption';
    if (config.editableCaptions) {
      caption.contentEditable = 'true';
      caption.spellcheck = false;
    }

    const controls = el('div'); controls.id = 'controls';
    const btnHome = el('button');
    btnHome.append(icon(['M3 11.5L12 4l9 7.5', 'M5 9.5V20h14V9.5']));
    btnHome.setAttribute('aria-label', 'First slide');
    btnHome.title = 'First slide (Home)';
    const btnPrev = el('button'); btnPrev.append(icon(['M15 18l-6-6 6-6']));
    btnPrev.setAttribute('aria-label', 'Previous slide');
    const counter = el('span', null, '–'); counter.id = 'counter';
    const btnNext = el('button'); btnNext.append(icon(['M9 18l6-6-6-6']));
    btnNext.setAttribute('aria-label', 'Next slide');
    controls.append(btnHome, btnPrev, counter, btnNext);

    let btnNotes = null;
    if (config.notes) {
      btnNotes = el('button');
      btnNotes.append(icon(['M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z', 'M8 8h8M8 12h8M8 16h5'], 18));
      btnNotes.setAttribute('aria-label', 'Open speaker notes');
      btnNotes.title = 'Speaker notes (n)';
      controls.append(btnNotes);
    }

    const btnNavToggle = el('button'); btnNavToggle.id = 'nav-toggle';
    btnNavToggle.append(icon(['M4 6h16M4 12h16M4 18h16'], 18));
    btnNavToggle.setAttribute('aria-label', 'Browse all slides');
    btnNavToggle.title = 'Browse slides';
    controls.append(btnNavToggle);

    const btnFullscreen = el('button');
    btnFullscreen.append(icon(['M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'], 18));
    btnFullscreen.setAttribute('aria-label', 'Toggle fullscreen');
    controls.append(btnFullscreen);

    const wordmark = el('div', null, talkTitle.toLowerCase()); wordmark.id = 'wordmark';
    const hint = el('div', null, config.editableCaptions
      ? '←/→ navigate · space next · f fullscreen · double-click caption to edit'
      : '←/→ navigate · space next · f fullscreen' + (config.notes ? ' · n notes' : ''));
    hint.id = 'hint';

    // slide navigator sidebar
    const navOverlay = el('div'); navOverlay.id = 'nav-overlay';
    const navSidebar = el('div'); navSidebar.id = 'nav-sidebar';
    const navHeader = el('header');
    navHeader.append(el('span', null, 'slides'));
    const navClose = el('button'); navClose.append(icon(['M18 6L6 18M6 6l12 12'], 16));
    navClose.setAttribute('aria-label', 'Close');
    navHeader.append(navClose);
    const navList = el('div'); navList.id = 'nav-list';
    navSidebar.append(navHeader, navList);
    navOverlay.append(navSidebar);

    document.body.append(progress, stage, caption, controls, wordmark, hint, navOverlay);

    // optional ambient background audio
    let bgAudioEl = null;
    if (config.bgAudio) {
      bgAudioEl = document.createElement('audio');
      bgAudioEl.src = config.bgAudio.src;
      bgAudioEl.loop = true;
      bgAudioEl.volume = config.bgAudio.volume != null ? config.bgAudio.volume : 0.4;
      bgAudioEl.style.display = 'none';
      document.body.append(bgAudioEl);

      const bar = el('div'); bar.id = 'bg-audio-bar';
      const playPause = el('button');
      const playIcon = icon(['M8 5v14l11-7z']);
      const pauseIcon = icon(['M6 19h4V5H6v14zm8-14v14h4V5h-4z']);
      pauseIcon.style.display = 'none';
      playPause.append(playIcon, pauseIcon);
      playPause.setAttribute('aria-label', 'Play ambient audio');
      const vol = document.createElement('input');
      vol.type = 'range'; vol.min = 0; vol.max = 100; vol.value = Math.round(bgAudioEl.volume * 100);
      vol.setAttribute('aria-label', 'Volume');
      bar.append(playPause, vol);
      document.body.append(bar);

      playPause.addEventListener('click', () => {
        if (bgAudioEl.paused) bgAudioEl.play(); else bgAudioEl.pause();
      });
      bgAudioEl.addEventListener('play', () => { playIcon.style.display = 'none'; pauseIcon.style.display = ''; });
      bgAudioEl.addEventListener('pause', () => { playIcon.style.display = ''; pauseIcon.style.display = 'none'; });
      vol.addEventListener('input', () => { bgAudioEl.volume = vol.value / 100; });
    }

    // ---- state ----
    let idx = parseInt(window.location.hash.slice(1), 10) - 1;
    if (isNaN(idx) || idx < 0 || idx >= slides.length) {
      const saved = parseInt(localStorage.getItem(storageKey + '-slide'), 10);
      idx = (!isNaN(saved) && saved >= 0 && saved < slides.length) ? saved : 0;
    }

    function slideLabel(s, i) {
      if (s.title) return s.title;
      if (s.caption) return s.caption.split(' (')[0];
      if (s.quote) return s.quote.slice(0, 48) + (s.quote.length > 48 ? '…' : '');
      return (s.kind || 'slide') + ' ' + (i + 1);
    }

    function buildNavList() {
      navList.innerHTML = '';
      slides.forEach((s, i) => {
        const btn = el('button');
        btn.append(el('span', 'n', String(i + 1).padStart(2, '0')));
        btn.append(document.createTextNode(slideLabel(s, i)));
        btn.dataset.idx = i;
        btn.addEventListener('click', () => { go(i); closeNav(); });
        navList.append(btn);
      });
    }
    buildNavList();

    function openNav() {
      navOverlay.classList.add('open');
      const cur = navList.children[idx];
      if (cur) cur.scrollIntoView({ block: 'center' });
    }
    function closeNav() { navOverlay.classList.remove('open'); }
    function toggleNav() { navOverlay.classList.contains('open') ? closeNav() : openNav(); }

    // ---- caption ----
    function setCaption(text, link) {
      caption.innerHTML = '';
      if (!text) return;
      const split = text.indexOf(' (');
      const head = split === -1 ? text : text.slice(0, split);
      if (link) {
        const a = document.createElement('a');
        a.href = link; a.textContent = head; a.target = '_blank'; a.rel = 'noopener';
        a.className = 'caption-link';
        caption.append(a);
      } else {
        caption.append(document.createTextNode(head));
      }
      if (split !== -1) caption.append(el('span', 'detail', text.slice(split)));
    }

    function captionStorage() {
      try { return JSON.parse(localStorage.getItem(storageKey + '-captions') || '{}'); }
      catch (e) { return {}; }
    }

    if (config.editableCaptions) {
      caption.addEventListener('blur', () => {
        const saved = captionStorage();
        saved[idx] = caption.textContent;
        localStorage.setItem(storageKey + '-captions', JSON.stringify(saved));
      });
    }

    // ---- render ----
    function render() {
      stage.innerHTML = '';
      const s = slides[idx];
      let captionText = s.caption || '';

      if (s.kind === 'cover') {
        const d = el('div', 'cover-wrap'); d.id = 'cover';
        d.append(el('h1', null, s.title));
        if (s.subtitle) d.append(el('p', 'subtitle', s.subtitle));
        if (s.byline) d.append(el('p', 'byline', s.byline));
        stage.append(d);
        captionText = '';
      } else if (s.kind === 'section') {
        const d = el('div', 'section-wrap');
        d.append(el('h1', 'section-title', s.title));
        if (s.sub) d.append(el('p', 'section-sub', s.sub));
        stage.append(d);
        captionText = '';
      } else if (s.kind === 'image') {
        const m = el('div', 'media');
        const img = document.createElement('img');
        img.src = s.src; img.alt = s.caption || '';
        m.append(img);
        stage.append(m);
      } else if (s.kind === 'video') {
        const m = el('div', 'media');
        if (/\.(mp4|webm|ogv|m4v|mov)$/i.test(s.src)) {
          const v = document.createElement('video');
          v.src = s.src; v.controls = true; v.preload = 'metadata';
          if (s.poster) v.poster = s.poster;
          v.addEventListener('loadedmetadata', () => {
            const maxH = window.innerHeight - 150;
            const maxW = window.innerWidth * 0.9;
            const scale = Math.min(maxH / v.videoHeight, maxW / v.videoWidth);
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
      } else if (s.kind === 'gallery') {
        const g = el('div', 'gallery');
        s.src.forEach((src) => {
          const img = document.createElement('img');
          img.src = src;
          g.append(img);
        });
        stage.append(g);
      } else if (s.kind === 'text' || s.kind === 'textimg') {
        const wrap = el('div', s.kind === 'text' ? 'text-wrap' : 'textimg');
        const titleEl = el('div', 'slide-title', s.title);
        const subEl = s.sub ? el('div', 'slide-sub', s.sub) : null;
        const body = el('div', 'body');
        (s.body || []).forEach((line) => body.append(el('p', s.prose ? 'prose' : 'line', line)));

        if (s.kind === 'text') {
          wrap.append(titleEl);
          if (subEl) wrap.append(subEl);
          wrap.append(body);
          if (s.playAudio && bgAudioEl) {
            const playBtn = el('button', 'btn-play-slide', '▶ Play');
            playBtn.addEventListener('click', () => bgAudioEl.play());
            wrap.append(playBtn);
          }
        } else {
          const col = el('div', 'text-col');
          col.append(titleEl);
          if (subEl) col.append(subEl);
          col.append(body);
          const fig = el('div', 'figure');
          const img = document.createElement('img');
          img.src = s.src; img.alt = s.title;
          fig.append(img);
          wrap.append(col, fig);
        }
        stage.append(wrap);
        captionText = '';
      } else if (s.kind === 'quote') {
        const wrap = el('div', 'quote-wrap');
        if (s.title) wrap.append(el('div', 'slide-title', s.title));
        const bq = document.createElement('blockquote');
        if (s.quoteHtml) bq.innerHTML = s.quoteHtml;
        else bq.textContent = s.quote;
        wrap.append(bq);
        if (s.attribution) wrap.append(el('div', 'quote-attribution', s.attribution));
        stage.append(wrap);
        captionText = '';
      } else if (s.kind === 'code') {
        const wrap = el('div', 'code-wrap');
        if (s.title) wrap.append(el('div', 'slide-title', s.title));
        const box = el('div', 'code-container');
        const header = el('div', 'code-header');
        const dots = el('div', 'code-dots');
        dots.append(el('span', 'code-dot red'), el('span', 'code-dot'), el('span', 'code-dot'));
        header.append(dots);
        if (s.filename) header.append(el('div', 'code-filename', s.filename));
        const pre = document.createElement('pre');
        const codeEl = document.createElement('code');
        codeEl.innerHTML = highlightCode(s.code || '');
        pre.append(codeEl);
        box.append(header, pre);
        wrap.append(box);
        stage.append(wrap);
        captionText = '';
      } else if (s.kind === 'list') {
        const wrap = el('div', 'list-wrap');
        if (s.title) wrap.append(el('div', 'slide-title', s.title));
        const ul = document.createElement('ul');
        (s.items || []).forEach((it) => {
          const li = document.createElement('li');
          if (it.term) li.append(el('strong', null, it.term));
          li.append(document.createTextNode(it.body || ''));
          ul.append(li);
        });
        wrap.append(ul);
        stage.append(wrap);
        captionText = '';
      } else if (s.kind === 'links') {
        const wrap = el('div', 'links-wrap');
        if (s.title) wrap.append(el('div', 'slide-title', s.title));
        const ul = document.createElement('ul');
        (s.items || []).forEach((it) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = it.url; a.textContent = it.label;
          a.target = '_blank'; a.rel = 'noopener';
          li.append(a);
          if (it.sub && it.sub.length) {
            const subUl = document.createElement('ul');
            it.sub.forEach((sub) => {
              const subLi = document.createElement('li');
              const subA = document.createElement('a');
              subA.href = sub.url; subA.textContent = sub.label;
              subA.target = '_blank'; subA.rel = 'noopener';
              subLi.append(subA);
              subUl.append(subLi);
            });
            li.append(subUl);
          }
          ul.append(li);
        });
        wrap.append(ul);
        stage.append(wrap);
        captionText = '';
      } else if (s.kind === 'audio') {
        const wrap = el('div', 'audio-wrap');
        if (s.image) {
          const img = document.createElement('img');
          img.src = s.image;
          wrap.append(img);
        }
        const player = el('div', 'audio-player');
        const btn = el('button', null, '▶');
        const slider = document.createElement('input');
        slider.type = 'range'; slider.min = 0; slider.max = 100; slider.value = 0;
        const time = el('span', null, '0:00 / 0:00');
        const a = document.createElement('audio');
        a.src = s.src; a.preload = 'metadata';
        slider.addEventListener('input', () => { if (a.duration) a.currentTime = slider.value / 100 * a.duration; });
        a.addEventListener('timeupdate', () => {
          if (a.duration) slider.value = a.currentTime / a.duration * 100;
          time.textContent = fmtTime(a.currentTime) + ' / ' + fmtTime(a.duration);
        });
        a.addEventListener('loadedmetadata', () => { time.textContent = '0:00 / ' + fmtTime(a.duration); });
        a.addEventListener('ended', () => { btn.textContent = '▶'; });
        btn.addEventListener('click', () => {
          if (a.paused) { a.play(); btn.textContent = '❚❚'; }
          else { a.pause(); btn.textContent = '▶'; }
        });
        player.append(btn, slider, time);
        wrap.append(player, a);
        stage.append(wrap);
      }

      if (config.editableCaptions) {
        const saved = captionStorage();
        setCaption(saved[idx] !== undefined ? saved[idx] : captionText);
      } else {
        setCaption(captionText, s.link);
      }

      counter.textContent = (idx + 1) + ' / ' + slides.length;
      progress.style.width = ((idx + 1) / slides.length * 100) + '%';
      btnHome.disabled = (idx === 0);
      btnPrev.disabled = (idx === 0);
      btnNext.disabled = (idx === slides.length - 1);
      document.title = (s.title || s.caption || talkTitle) + ' | ' + talkTitle;

      Array.from(navList.children).forEach((c, i) => c.classList.toggle('current', i === idx));

      syncNotes();
      if (typeof config.onChange === 'function') config.onChange(idx, s);
    }

    function go(n) {
      if (n < 0 || n >= slides.length) return;
      idx = n;
      window.location.hash = idx + 1;
      localStorage.setItem(storageKey + '-slide', idx);
      render();
    }

    // ---- notes window sync (optional) ----
    let notesWin = null;
    function openNotes() {
      if (notesWin && !notesWin.closed) { notesWin.focus(); return; }
      notesWin = window.open('notes.html', storageKey + '-notes', 'width=540,height=800');
      if (notesWin) {
        if (btnNotes) btnNotes.classList.add('active');
        setTimeout(syncNotes, 350);
      }
    }
    function syncNotes() {
      if (!config.notes) return;
      if (notesWin && !notesWin.closed) {
        notesWin.postMessage({ slide: idx }, '*');
      } else if (btnNotes) {
        btnNotes.classList.remove('active');
      }
    }
    if (btnNotes) btnNotes.addEventListener('click', openNotes);

    // ---- wiring ----
    window.addEventListener('hashchange', () => {
      const h = parseInt(window.location.hash.slice(1), 10);
      if (!isNaN(h) && h !== idx + 1 && h >= 1 && h <= slides.length) {
        idx = h - 1;
        render();
      }
    });

    btnHome.addEventListener('click', () => go(0));
    btnPrev.addEventListener('click', () => go(idx - 1));
    btnNext.addEventListener('click', () => go(idx + 1));
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      else document.exitFullscreen();
    });
    btnNavToggle.addEventListener('click', toggleNav);
    navClose.addEventListener('click', closeNav);
    navOverlay.addEventListener('click', (e) => { if (e.target === navOverlay) closeNav(); });

    document.addEventListener('keydown', (e) => {
      const tag = document.activeElement && document.activeElement.tagName;
      const editing = tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement === caption;
      if (e.key === 'Escape') { closeNav(); return; }
      if (editing) return;
      if (e.key === 'ArrowLeft') go(idx - 1);
      else if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(idx + 1); }
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(slides.length - 1);
      else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen();
      }
      else if ((e.key === 'n' || e.key === 'N') && config.notes) openNotes();
    });

    let touchX = 0;
    document.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].screenX; }, false);
    document.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].screenX - touchX;
      if (Math.abs(dx) > 50) go(dx < 0 ? idx + 1 : idx - 1);
    }, false);

    render();
  }

  window.Deck = { init };
})();
