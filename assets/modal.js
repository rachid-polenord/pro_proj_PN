// modal.js - VERSION COMPLÈTE FINALE (NOUVEL ONGLEt)
const MODAL_URLS = {
  'souris': '../fiches_activités/fiche_souris_Lev_1.html',
  'clavier': '../fiches_activités/fiche_clavier_Lev_1.html', 
  'paint': '../fiches_activités/fiche_paint_Lev_3.html',
  'word': 'seance4.html',
  'outlook': 'seance5.html',
  'excel': 'seance6.html'
};

let modalOpen = false;

function createModal() {
  if (document.getElementById('contentModal')) return;
  
  const modal = document.createElement('div');
  modal.id = 'contentModal';
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <button class="modal-fiche-btn" onclick="goToFiches()">📋 Vers exercices</button>
          <span class="modal-title">Séance</span>
          <button class="modal-close">✕</button>
        </div>
        <iframe id="modalIframe" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  const style = document.createElement('style');
  style.textContent = `
    #contentModal { position:fixed; top:0; left:0; right:0; bottom:0; z-index:10000; display:none; }
    .modal-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center; padding:8px; }
    .modal-content { 
      background:white; width:98vw; height:98vh; max-width:1600px; max-height:95vh; 
      border-radius:16px; position:relative; box-shadow:0 20px 60px rgba(0,0,0,0.6); 
      display:flex; flex-direction:column;
    }
    .modal-header { 
      padding:12px 20px; display:flex; justify-content:space-between; align-items:center; 
      border-bottom:1px solid #e0e0e0; flex-shrink:0; height:50px; position:relative;
    }
    .modal-title { font-size:20px; font-weight:700; color:#333; }
    .modal-fiche-btn { 
      position:absolute; left:15px; top:12px; padding:8px 16px; border:none; border-radius:8px; 
      background:#0d6efd; color:white; cursor:pointer; font-size:14px; font-weight:600;
      transition: background 0.2s;
    }
    .modal-fiche-btn:hover { background:#0856c4; }
    .modal-close { 
      margin-left:auto; background:#dc3545; color:white; width:36px; height:36px; 
      border-radius:50%; font-size:18px; border:none; cursor:pointer; 
      display:flex; align-items:center; justify-content:center; transition: all 0.2s;
    }
    .modal-close:hover { background:#c82333; transform:scale(1.05); }
    #modalIframe { 
      flex:1; width:100%; height:100%; border:none !important; outline:none !important;
      margin:0; padding:0; border-radius:0 0 16px 16px;
    }
    @media (max-width:768px) { 
      .modal-content { width:99vw; height:99vh; border-radius:8px; }
      .modal-header { padding:10px 15px; height:45px; }
      .modal-title { font-size:18px; }
      .modal-fiche-btn { left:10px; top:10px; padding:6px 12px; font-size:13px; }
      .modal-close { width:32px; height:32px; font-size:16px; }
    }
  `;
  document.head.appendChild(style);
}

function openModal(seance) {
  createModal();
  const modal = document.getElementById('contentModal');
  const iframe = document.getElementById('modalIframe');
  
  iframe.src = MODAL_URLS[seance];
  modal.style.display = 'block';
  modalOpen = true;
  iframe.onload = () => iframe.focus();
}

function closeModal() {
  const modal = document.getElementById('contentModal');
  if (modal) modal.style.display = 'none';
  modalOpen = false;
}

function goToFiches() {
  closeModal();
  window.open('fiches.html', '_blank'); // ✅ NOUVEL ONGLEt
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.step button').forEach(btn => {
    btn.textContent = 'Voir fiche';
    btn.onclick = function() {
      const title = this.parentElement.querySelector('.title').textContent.toLowerCase();
      const seance = title.includes('souris') ? 'souris' :
                    title.includes('clavier') ? 'clavier' :
                    title.includes('paint') ? 'paint' :
                    title.includes('word') ? 'word' :
                    title.includes('outlook') ? 'outlook' : 'excel';
      openModal(seance);
    };
  });
  
  document.addEventListener('click', (e) => {
    if (e.target.id === 'contentModal' || e.target.classList.contains('modal-close')) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOpen) closeModal();
  });
});