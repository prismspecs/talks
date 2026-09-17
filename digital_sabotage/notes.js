/*
  Speaker notes for the Digital Sabotage deck.
  Fetches lecture-notes.md, renders it as a scrolling document, and
  highlights + scrolls to the section that matches the slide currently
  shown in the presenting window (received via postMessage).
*/
(() => {
  const content = document.getElementById('content');
  const status = document.getElementById('status');

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // micro-markdown: links, bold, italic
  function inline(text) {
    return esc(text)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/_([^_]+)_/g, '<em>$1</em>');
  }

  // block-level renderer: paragraphs, list items, blockquotes
  function renderBlocks(lines) {
    let html = '';
    let listOpen = false;
    let quoteOpen = false;
    const closeAll = () => {
      if (listOpen) { html += '</ul>'; listOpen = false; }
      if (quoteOpen) { html += '</blockquote>'; quoteOpen = false; }
    };
    for (const ln of lines) {
      const t = ln.trim();
      if (t === '' || t === '---') { closeAll(); continue; }
      if (/^#\s+/.test(ln)) { closeAll(); html += '<h1 class="doc-title">' + inline(ln.replace(/^#\s+/, '')) + '</h1>'; continue; }
      if (t.startsWith('> ')) {
        if (!quoteOpen) { closeAll(); html += '<blockquote>'; quoteOpen = true; }
        html += '<p>' + inline(t.replace(/^> /, '')) + '</p>';
        continue;
      }
      if (/^[-*] /.test(ln)) {
        if (!listOpen) { closeAll(); html += '<ul>'; listOpen = true; }
        html += '<li>' + inline(ln.replace(/^[-*] /, '')) + '</li>';
        continue;
      }
      closeAll();
      html += '<p>' + inline(ln) + '</p>';
    }
    closeAll();
    return html;
  }

  // Each `## Heading {#slug}` in lecture-notes.md becomes <section id="sec-<slug>">.
  // Slides declare which section they belong to via their own `note: "<slug>"`
  // field in slides-data.js, so there is no separate index to keep in sync here.
  const HEADING_RE = /^##\s+(.+?)(?:\s*\{#([a-z0-9-]+)\}\s*)?$/;
  const knownSlugs = new Set();

  function render(md) {
    const sections = [];
    let cur = null;
    const header = [];
    for (const ln of md.split(/\r?\n/)) {
      const h = ln.match(HEADING_RE);
      if (h) {
        const title = h[1];
        const slug = h[2];
        if (!slug) console.warn('notes.js: heading missing {#slug} anchor:', title);
        cur = { title, slug, body: [] };
        sections.push(cur);
        continue;
      }
      if (cur) { cur.body.push(ln); continue; }
      header.push(ln);
    }

    let html = renderBlocks(header);
    sections.forEach((s) => {
      if (!s.slug) return;
      knownSlugs.add(s.slug);
      html += '<section id="sec-' + s.slug + '"><h2>' + inline(s.title) + '</h2>' + renderBlocks(s.body) + '</section>';
    });
    content.innerHTML = html;

    if (window.SLIDES) {
      window.SLIDES.forEach((s, i) => {
        if (s.note && !knownSlugs.has(s.note)) {
          console.warn('notes.js: slide ' + i + ' references unknown note slug "' + s.note + '"');
        }
      });
    }
  }

  let last = null;
  function focusSection(slug) {
    const el = document.getElementById('sec-' + slug);
    if (!el) return;
    const prev = document.querySelector('.current');
    if (prev) prev.classList.remove('current');
    el.classList.add('current');
    el.scrollIntoView({ block: 'start', behavior: last === slug ? 'auto' : 'smooth' });
    last = slug;
  }

  window.addEventListener('message', (e) => {
    if (!e.data || typeof e.data.slide !== 'number') return;
    const slide = window.SLIDES && window.SLIDES[e.data.slide];
    const slug = slide && slide.note;
    if (!slug) return;
    focusSection(slug);
    status.textContent = 'synced, slide ' + (e.data.slide + 1);
  });

  fetch('lecture-notes.md', { cache: 'no-store' })
    .then((r) => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    })
    .then(render)
    .catch(() => {
      content.innerHTML = '<p class="error">Could not load lecture-notes.md directly.<br>Notes are meant to be served over http. Open the deck from a local server or its published URL, or read the file in the repo.</p>';
    });
})();