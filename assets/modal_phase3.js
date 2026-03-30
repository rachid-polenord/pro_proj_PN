// modal_phase3.js - Modale dédiée à la page Phase 3 Lancement

const MODAL_URLS_PHASE3 = {
  // ── Colonne GAUCHE ──
  // Section 1
  's1_v1': '../fiches_activités/fiche_souris_Lev_1.html',
  's1_v2': '../fiches_activités/fiche_clavier_Lev_1.html',
  's1_v3': '../fiches_activités/fiche_paint_Lev_1.html',
  'infos_s1': 'infos_s1.html',
  // Section 2
  's2_v1': 'voir_s2_v1.html',
  's2_v2': 'voir_s2_v2.html',
  's2_v3': 'voir_s2_v3.html',
  'infos_s2': 'infos_s2.html',

  // ── Colonne CENTRE ──
  // Section 3
  's3_v1': 'voir_s3_v1.html',
  's3_v2': 'voir_s3_v2.html',
  's3_v3': 'voir_s3_v3.html',
  'infos_s3': 'infos_s3.html',
  // Section 4
  's4_v1': 'voir_s4_v1.html',
  's4_v2': 'voir_s4_v2.html',
  's4_v3': 'voir_s4_v3.html',
  'infos_s4': 'infos_s4.html',
};

let modalPhase3Open = false;

function createModalPhase3() {
  if (document.getElementById('contentModalPhase3')) return;

  const modal = document.createElement('div');
  modal.id = 'contentModalPhase3';
  modal.innerHTML = `
    <div class="modal-overlay-p3">
      <div class="modal-content-p3">
        <div class="modal-header-p3">
          <button class="modal-fiche-btn-p3" onclick="goToFichesPhase3()">📋 Vers exercices</button>
          <span class="modal-title-p3"></span>
          <button class="modal-close-p3">✕</button>
        </div>
        <iframe id="modalIframePhase3" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const style = document.createElement('style');
  style.textContent = `
    #contentModalPhase3 { position:fixed; top:0; left:0; right:0; bottom:0; z-index:10000; display:none; }
    .modal-overlay-p3 { position:absolute; inset:0; background:rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center; padding:8px; }
    .modal-content-p3 {
      background:white; width:98vw; height:98vh; max-width:1600px; max-height:95vh;
      border-radius:16px; position:relative; box-shadow:0 20px 60px rgba(0,0,0,0.6);
      display:flex; flex-direction:column;
    }
    .modal-header-p3 {
      padding:12px 20px; display:flex; justify-content:space-between; align-items:center;
      border-bottom:1px solid #e0e0e0; flex-shrink:0; height:50px; position:relative;
    }
    .modal-title-p3 { font-size:18px; font-weight:700; color:#333; }
    .modal-fiche-btn-p3 {
      position:absolute; left:15px; top:12px; padding:8px 16px; border:none; border-radius:8px;
      background:#0d6efd; color:white; cursor:pointer; font-size:14px; font-weight:600;
      transition: background 0.2s;
    }
    .modal-fiche-btn-p3:hover { background:#0856c4; }
    .modal-close-p3 {
      background:#dc3545; color:white; width:36px; height:36px;
      border-radius:50%; font-size:18px; border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center; transition: all 0.2s;
    }
    .modal-close-p3:hover { background:#c82333; transform:scale(1.05); }
    #modalIframePhase3 {
      flex:1; width:100%; height:100%; border:none !important; outline:none !important;
      margin:0; padding:0; border-radius:0 0 16px 16px;
    }
    @media (max-width:768px) {
      .modal-content-p3 { width:99vw; height:99vh; border-radius:8px; }
      .modal-header-p3 { padding:10px 15px; height:45px; }
      .modal-title-p3 { font-size:16px; }
      .modal-close-p3 { width:32px; height:32px; font-size:16px; }
    }
  `;
  document.head.appendChild(style);

  // Fermeture
  modal.querySelector('.modal-close-p3').addEventListener('click', closeModalPhase3);
  modal.querySelector('.modal-overlay-p3').addEventListener('click', function(e) {
    if (e.target === this) closeModalPhase3();
  });
}

function openModalPhase3(key) {
  createModalPhase3();
  const modal  = document.getElementById('contentModalPhase3');
  const iframe = document.getElementById('modalIframePhase3');
  const url    = MODAL_URLS_PHASE3[key];

  if (!url) { console.warn('modal_phase3.js : clé inconnue →', key); return; }

  iframe.src = url;
  modal.style.display = 'block';
  modalPhase3Open = true;
  iframe.onload = () => iframe.focus();
}

function closeModalPhase3() {
  const modal = document.getElementById('contentModalPhase3');
  if (modal) modal.style.display = 'none';
  modalPhase3Open = false;
}

function goToFichesPhase3() {
  closeModalPhase3();
  window.open('exercices.html', '_blank');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalPhase3Open) closeModalPhase3();
});
