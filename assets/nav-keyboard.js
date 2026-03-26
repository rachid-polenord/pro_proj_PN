/**
 * nav-keyboard.js
 * Navigation clavier (← → ↑ ↓) + slide horizontal + timeline + progress bar
 */
(function () {

  const pages = [
    { file: 'pages/page0.html', label: 'Accueil' },
    { file: 'pages/page1.html', label: 'Phase 1' },
    { file: 'pages/page2.html', label: 'Phase 2' },
    { file: 'pages/page3.html', label: 'Phase 3' },
    { file: 'pages/page4.html', label: 'Page 4' },
    { file: 'pages/infos_pratiques.html', label: 'infos' },
    { file: 'pages/fiche_activite.html', label: 'Fiches' },
  ];

  let current = 0;
  let animating = false;

  /* ── Slide CSS ────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .slide {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
      transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
    }
    .slide-enter-right { transform: translateX(100%); }
    .slide-enter-left  { transform: translateX(-100%); }
    .slide-active      { transform: translateX(0); }
    .slide-exit-right  { transform: translateX(100%); }
    .slide-exit-left   { transform: translateX(-100%); }
  `;
  document.head.appendChild(style);

  /* ── Références DOM ───────────────────────────────────────── */
  const timeline   = document.getElementById('timeline');
  const progressEl = document.getElementById('progress-bar');
  const btnPrev    = document.getElementById('btn-prev');
  const btnNext    = document.getElementById('btn-next');
  const wrapper    = document.getElementById('frame-wrapper');
  const firstFrame = document.getElementById('frame');

  firstFrame.classList.add('slide', 'slide-active');
  firstFrame.src = pages[0].file;

  /* ── Construire la timeline ───────────────────────────────── */
  function buildTimeline() {
    timeline.innerHTML = '';
    pages.forEach((p, i) => {
      if (i > 0) {
        const conn = document.createElement('div');
        conn.className = 'nav-connector' + (i <= current ? ' filled' : '');
        conn.id = `conn-${i}`;
        timeline.appendChild(conn);
      }

      const step = document.createElement('div');
      step.className = 'nav-step' + (i === current ? ' active' : i < current ? ' done' : '');
      step.id = `step-${i}`;
      step.innerHTML = `
        <div class="nav-step-inner">
          <div class="nav-dot">${i + 1}</div>
          <span class="nav-step-label">${p.label}</span>
        </div>`;
      step.addEventListener('click', () => {
        if (i !== current) goTo(i, i > current ? 'right' : 'left');
      });
      timeline.appendChild(step);
    });
  }

  /* ── Mettre à jour l'UI ───────────────────────────────────── */
  function updateUI() {
    pages.forEach((_, i) => {
      const step = document.getElementById(`step-${i}`);
      if (!step) return;
      step.className = 'nav-step' + (i === current ? ' active' : i < current ? ' done' : '');

      if (i > 0) {
        const conn = document.getElementById(`conn-${i}`);
        if (conn) conn.className = 'nav-connector' + (i <= current ? ' filled' : '');
      }
    });

    /* progress bar */
    const pct = pages.length === 1 ? 100 : (current / (pages.length - 1)) * 100;
    progressEl.style.width = pct + '%';

    /* flèches */
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === pages.length - 1;
  }

  /* ── Slide ────────────────────────────────────────────────── */
  function goTo(index, direction) {
    if (animating || index === current || index < 0 || index >= pages.length) return;
    animating = true;

    const outFrame = wrapper.querySelector('.slide-active');

    const inFrame = document.createElement('iframe');
    inFrame.classList.add('slide');
    inFrame.src = pages[index].file;
    wrapper.appendChild(inFrame);

    inFrame.classList.add(direction === 'right' ? 'slide-enter-right' : 'slide-enter-left');
    inFrame.getBoundingClientRect(); // reflow
    inFrame.classList.remove('slide-enter-right', 'slide-enter-left');
    inFrame.classList.add('slide-active');

    outFrame.classList.remove('slide-active');
    outFrame.classList.add(direction === 'right' ? 'slide-exit-left' : 'slide-exit-right');

    inFrame.addEventListener('transitionend', () => {
      outFrame.remove();
      inFrame.id = 'frame';
      current = index;
      animating = false;
      updateUI();
    }, { once: true });
  }

  function next() { goTo(current + 1, 'right'); }
  function prev() { goTo(current - 1, 'left'); }

  /* ── Boutons flèches ──────────────────────────────────────── */
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  /* ── Clavier ──────────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) { e.preventDefault(); next(); }
    if (['ArrowLeft',  'ArrowUp'  ].includes(e.key)) { e.preventDefault(); prev(); }
  });

  /* ── Init ─────────────────────────────────────────────────── */
  buildTimeline();
  updateUI();

})();
