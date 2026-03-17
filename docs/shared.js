/* ============================================================
   FDS Docs — Shared JavaScript
   Features: Syntax highlighting, copy, search, sidebar, scroll spy, theme toggle
   ============================================================ */

// ---- Search data ----
const SEARCH_INDEX = [
  { page: 'Getting Started', title: 'Overview', url: 'index.html' },
  { page: 'Getting Started', title: 'Architecture', url: 'index.html#architecture' },
  { page: 'Getting Started', title: 'CSS Layers', url: 'index.html#layers' },
  { page: 'Getting Started', title: 'File Structure', url: 'index.html#files' },
  { page: 'Getting Started', title: 'Installation', url: 'index.html#installation' },
  { page: 'Tokens', title: 'Design Tokens', url: 'tokens.html' },
  { page: 'Tokens', title: 'Colors (OKLCH)', url: 'tokens.html#colors' },
  { page: 'Tokens', title: 'Primary palette', url: 'tokens.html#colors' },
  { page: 'Tokens', title: 'Secondary palette', url: 'tokens.html#colors' },
  { page: 'Tokens', title: 'Semantic Spacing', url: 'tokens.html#spacing' },
  { page: 'Tokens', title: 'Typography Scale', url: 'tokens.html#type-scale' },
  { page: 'Tokens', title: 'Knobs Reference', url: 'tokens.html#knobs' },
  { page: 'Tokens', title: 'Leading (line-height)', url: 'tokens.html#other' },
  { page: 'Tokens', title: 'Border Radius', url: 'tokens.html#other' },
  { page: 'Tokens', title: 'Aspect Ratios', url: 'tokens.html#other' },
  { page: 'Buttons', title: 'Button Components', url: 'buttons.html' },
  { page: 'Buttons', title: 'Color Variants', url: 'buttons.html#color-variants' },
  { page: 'Buttons', title: 'Sizes', url: 'buttons.html#sizes' },
  { page: 'Buttons', title: 'Shapes', url: 'buttons.html#shapes' },
  { page: 'Buttons', title: 'Full Width', url: 'buttons.html#full-width' },
  { page: 'Buttons', title: 'Combinations', url: 'buttons.html#combinations' },
  { page: 'Buttons', title: 'Submit auto-styling', url: 'buttons.html#submit' },
  { page: 'Buttons', title: 'CSS Variables', url: 'buttons.html#css-variables' },
  { page: 'Typography', title: 'Typography Classes', url: 'typography.html' },
  { page: 'Typography', title: 'Display', url: 'typography.html#display' },
  { page: 'Typography', title: 'Heading', url: 'typography.html#heading' },
  { page: 'Typography', title: 'Subheading', url: 'typography.html#subheading' },
  { page: 'Typography', title: 'Text (body)', url: 'typography.html#text' },
  { page: 'Typography', title: 'CSS Implementation', url: 'typography.html#css' },
  { page: 'Typography', title: 'Scale Reference', url: 'typography.html#scale' },
  { page: 'Layouts', title: 'Layout Components', url: 'layouts.html' },
  { page: 'Layouts', title: 'Sections', url: 'layouts.html#sections' },
  { page: 'Layouts', title: 'Content Flex (9 points)', url: 'layouts.html#content-flex' },
  { page: 'Layouts', title: 'Proportional Grids', url: 'layouts.html#grids' },
  { page: 'Layouts', title: 'Auto-fill / Auto-fit', url: 'layouts.html#auto-grids' },
  { page: 'Utilities', title: 'Utility Classes', url: 'utilities.html' },
  { page: 'Utilities', title: 'Flip', url: 'utilities.html#flip' },
  { page: 'Utilities', title: 'Transition Durations', url: 'utilities.html#durations' },
  { page: 'Utilities', title: 'Background Image', url: 'utilities.html#bg-image' },
  { page: 'Utilities', title: 'Click Parent', url: 'utilities.html#click-parent' },
  { page: 'Utilities', title: 'Focus from Child', url: 'utilities.html#focus-from-child' },
  { page: 'Utilities', title: 'Custom Variants', url: 'utilities.html#custom-variants' },
  { page: 'Utilities', title: 'Eyebrow', url: 'utilities.html#eyebrow' },
];

// ---- Copy to clipboard ----
function copyCode(btn) {
  const container = btn.closest('.code-group, .code-standalone');
  const codeBlock = container?.querySelector('.code-block') || btn.parentElement;
  const code = codeBlock.textContent.replace(/Copiar|Copiado!/g, '').trim();
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copiado!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copiar';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ---- Syntax Highlighting (token-safe) ----
// Uses placeholder tokens to prevent regex passes from corrupting each other's output.

function highlightCSS(code) {
  const saved = [];

  function tok(html) {
    saved.push(html);
    return `\x00T${saved.length - 1}\x00`;
  }

  // 1. Protect comments
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, (m) =>
    tok(`<span class="syn-cmt">${m}</span>`)
  );

  // 2. Protect strings (before any span insertion that uses quotes)
  code = code.replace(/(["'])((?:(?!\1).)*)\1/g, (m) =>
    tok(`<span class="syn-str">${m}</span>`)
  );

  // 3. @keywords
  code = code.replace(/@([\w-]+)/g, (m) =>
    tok(`<span class="syn-kw">${m}</span>`)
  );

  // 4. Functions (before properties, so fn names don't become props)
  code = code.replace(/\b(oklch|clamp|calc|min|max|var|minmax|repeat|env)\b/g, (m) =>
    tok(`<span class="syn-fn">${m}</span>`)
  );

  // 5. Selectors (lines starting with .)
  code = code.replace(/^(\s*)(\.[\w-]+(?:\s*,\s*\.[\w-]+)*)/gm, (m, space, sel) =>
    space + tok(`<span class="syn-sel">${sel}</span>`)
  );

  // 6. Property names (word before colon)
  code = code.replace(/([\w-]+)(\s*:)(?!:)/g, (m, prop, colon) =>
    tok(`<span class="syn-prop">${prop}</span>`) + colon
  );

  // 7. Hex colors (before numbers to avoid partial match)
  code = code.replace(/(#[0-9a-fA-F]{3,8})\b/g, (m) =>
    tok(`<span class="syn-val">${m}</span>`)
  );

  // 8. Numbers with units
  code = code.replace(/(\b\d+\.?\d*)(px|rem|em|%|ms|s|vw|vh|deg|fr)\b/g, (m) =>
    tok(`<span class="syn-val">${m}</span>`)
  );

  // 9. Plain numbers (skip those inside token placeholders)
  code = code.replace(/(?<!\x00)(\b\d+\.?\d*\b)(?!T?\d*\x00)/g, (m) =>
    tok(`<span class="syn-val">${m}</span>`)
  );

  // Restore all tokens
  code = code.replace(/\x00T(\d+)\x00/g, (_, i) => saved[parseInt(i)]);

  return code;
}

function highlightHTML(code) {
  const saved = [];

  function tok(html) {
    saved.push(html);
    return `\x00H${saved.length - 1}\x00`;
  }

  // 1. Protect comments
  code = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, (m) =>
    tok(`<span class="syn-cmt">${m}</span>`)
  );

  // 2. Opening/closing tags
  code = code.replace(/(&lt;\/?)([\w-]+)/g, (m, bracket, tag) =>
    bracket + tok(`<span class="syn-tag">${tag}</span>`)
  );

  // 3. Attributes — only match &quot; (HTML-entity quotes from source), not " from our spans
  code = code.replace(/\s([\w-]+)(=)(&quot;)(.*?)(&quot;)/g, (m, attr, eq, q1, val, q2) =>
    ` ${tok(`<span class="syn-attr">${attr}</span>`)}${eq}${q1}${tok(`<span class="syn-str">${val}</span>`)}${q2}`
  );

  // Also match literal quotes for non-escaped HTML
  code = code.replace(/\s([\w-]+)(=)(")((?:(?!")[^<\x00])*?)(")/g, (m, attr, eq, q1, val, q2) =>
    ` ${tok(`<span class="syn-attr">${attr}</span>`)}${eq}${q1}${tok(`<span class="syn-str">${val}</span>`)}${q2}`
  );

  // 4. Closing brackets
  code = code.replace(/(\/?&gt;)/g, (m) =>
    tok(`<span class="syn-punc">${m}</span>`)
  );

  // Restore all tokens
  code = code.replace(/\x00H(\d+)\x00/g, (_, i) => saved[parseInt(i)]);

  return code;
}

function initHighlighting() {
  document.querySelectorAll('.code-block[data-lang]').forEach(block => {
    const lang = block.dataset.lang;
    const raw = block.innerHTML;
    if (raw.includes('class="syn-')) return;
    if (lang === 'css') {
      block.innerHTML = highlightCSS(raw);
    } else if (lang === 'html') {
      block.innerHTML = highlightHTML(raw);
    }
  });
}

// ---- Theme Toggle ----
function initTheme() {
  const stored = localStorage.getItem('fds-theme');
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('fds-theme', next);
}

// Apply theme immediately (before DOMContentLoaded) to prevent flash
initTheme();

// ---- Sidebar active state ----
function initSidebar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.doc-sidebar a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('#')[0] || 'index.html';
    if (linkPage === currentPage && !href.includes('#')) {
      link.classList.add('active');
    }
  });

  const sections = document.querySelectorAll('.doc-section[id]');
  if (sections.length === 0) return;

  const activePage = document.querySelector(`.doc-sidebar a.active:not(.sub-link)`);
  if (!activePage) return;

  const subLinks = document.createElement('div');
  subLinks.className = 'doc-sidebar-sub-links';

  sections.forEach(section => {
    const h2 = section.querySelector('h2');
    if (!h2) return;
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.textContent = h2.textContent;
    link.className = 'sub-link';
    subLinks.appendChild(link);
  });

  activePage.after(subLinks);
  initScrollSpy(sections);
}

// ---- Scroll Spy ----
function initScrollSpy(sections) {
  if (!sections || sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.doc-sidebar a.sub-link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll('.doc-sidebar a.sub-link.active').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {
    rootMargin: '-80px 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

// ---- Mobile Sidebar Toggle ----
function initMobileMenu() {
  const toggle = document.querySelector('.doc-menu-toggle');
  const sidebar = document.querySelector('.doc-sidebar');
  const overlay = document.querySelector('.doc-sidebar-overlay');

  if (!toggle || !sidebar) return;

  function open() {
    sidebar.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    sidebar.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? close() : open();
  });

  overlay?.addEventListener('click', close);

  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) close();
    });
  });
}

// ---- Search ----
function initSearch() {
  const input = document.querySelector('.doc-search-input');
  const results = document.querySelector('.doc-search-results');
  if (!input || !results) return;

  let highlightedIndex = -1;

  function render(query) {
    if (!query || query.length < 2) {
      results.classList.remove('open');
      return;
    }

    const q = query.toLowerCase();
    const matches = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.page.toLowerCase().includes(q)
    ).slice(0, 8);

    if (matches.length === 0) {
      results.innerHTML = '<div class="doc-search-empty">No results found</div>';
      results.classList.add('open');
      return;
    }

    results.innerHTML = matches.map((item, i) => {
      const title = item.title.replace(
        new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
        '<mark>$1</mark>'
      );
      return `<a href="${item.url}" class="doc-search-result${i === highlightedIndex ? ' highlighted' : ''}">
        <div class="doc-search-result-page">${item.page}</div>
        <div class="doc-search-result-title">${title}</div>
      </a>`;
    }).join('');

    results.classList.add('open');
    highlightedIndex = -1;
  }

  input.addEventListener('input', () => render(input.value));

  input.addEventListener('keydown', (e) => {
    const items = results.querySelectorAll('.doc-search-result');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('highlighted', i === highlightedIndex));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = Math.max(highlightedIndex - 1, 0);
      items.forEach((el, i) => el.classList.toggle('highlighted', i === highlightedIndex));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const highlighted = results.querySelector('.doc-search-result.highlighted');
      if (highlighted) {
        window.location.href = highlighted.href;
      } else if (items.length > 0) {
        window.location.href = items[0].href;
      }
    } else if (e.key === 'Escape') {
      results.classList.remove('open');
      input.blur();
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.doc-search')) {
      results.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.target.matches('input, textarea, [contenteditable]')) {
      e.preventDefault();
      input.focus();
    }
  });
}

// ---- Tab switching ----
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('[data-tab]');
    const panels = tabGroup.querySelectorAll('[data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        tabGroup.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
      });
    });
  });
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  initHighlighting();
  initSidebar();
  initMobileMenu();
  initSearch();
  initTabs();
});
