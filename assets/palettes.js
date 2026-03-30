const palettes = {
  moderne: { header: '#1e3a8a', note: '#93c5fd', intro: '#f1f5f9', cards: ['#0f172a','#1e40af','#3b82f6','#60a5fa'] },
  sombre: { header: '#475569', note: '#64748b', intro: '#1e293b', cards: ['#f1f8ff','#e2e8f0','#cbd5e1','#94a3b8'] },
  chaude: { header: '#b45309', note: '#f59e0b', intro: '#fef3c7', cards: ['#78350f','#d97706','#ea580c','#c2410c'] },
  verte: { header: '#166534', note: '#4ade80', intro: '#f0fdf4', cards: ['#14532d','#22c55e','#16a34a','#15803d'] },
  violette: { header: '#7c3aed', note: '#c084fc', intro: '#fdf4ff', cards: ['#581c87','#a855f7','#9333ea','#7e22ce'] }
};

function applyPalette(name) {
  const p = palettes[name];
  
  // Header
  document.querySelector('header').style.background = p.header;
  
  // Note  
  document.querySelector('.note').style.background = p.note;
  
  // CARD-INTRO - 5 MÉTHODES (UNE marchera)
  const methods = [
    '.card-intro',
    '.intro',
    '.page > div:nth-child(3)', 
    '[class*="card"]',
    'div[style*="flex: 0.6"]'
  ];
  
  let intro = null;
  for(let selector of methods) {
    intro = document.querySelector(selector);
    if(intro) break;
  }
  
  // FORCE le background même si nested
  if(intro) {
    intro.style.background = p.intro;
    intro.style.backgroundColor = p.intro; // Double assurance
  }
  
  // Vignettes
  document.querySelectorAll('.phase-card').forEach((card, i) => {
    card.style.background = p.cards[i];
  });
  
  localStorage.setItem('palette', name);
}

// Au chargement - ATTENTE DOM complet
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('palette');
    applyPalette(saved || 'moderne');
  });
} else {
  const saved = localStorage.getItem('palette');
  applyPalette(saved || 'moderne');
}
