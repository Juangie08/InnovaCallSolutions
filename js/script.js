const modal = document.getElementById('modal');
const openModalBtns = document.querySelectorAll('#openModal');
const closeModal = document.getElementById('closeModal');
openModalBtns.forEach(btn => btn.onclick = () => modal.style.display='block');
closeModal.onclick = () => modal.style.display='none';
window.onclick = (e) => {if(e.target == modal){modal.style.display='none';}}

const serviceModal = document.getElementById('serviceModal');
const closeServiceModal = document.getElementById('closeServiceModal');
const serviceDetails = document.getElementById('serviceDetails');
function openServiceModal(type){
    let content = '';
    if(type==='callcenter'){
        content = `<h2>Call Center Inteligente</h2><img src='images/callcenter.jpg' alt='Call Center' style='width:100%; border-radius:8px; margin-bottom:10px;'><p>Gestión avanzada de llamadas y atención al cliente.</p><button style='padding:10px 20px; background:#f59e0b; color:#000; border:none; border-radius:6px; cursor:pointer;'>Solicitar Demo</button>`;
    } else if(type==='crm'){
        content = `<h2>CRM Integrado</h2><img src='images/crm.jpg' alt='CRM' style='width:100%; border-radius:8px; margin-bottom:10px;'><p>Organiza tus clientes y mejora la relación comercial.</p><button style='padding:10px 20px; background:#f59e0b; color:#000; border:none; border-radius:6px; cursor:pointer;'>Solicitar Demo</button>`;
    } else if(type==='auto'){
        content = `<h2>Automatización</h2><img src='images/auto.jpg' alt='Automatización' style='width:100%; border-radius:8px; margin-bottom:10px;'><p>Automatiza procesos para ahorrar tiempo y recursos.</p><button style='padding:10px 20px; background:#f59e0b; color:#000; border:none; border-radius:6px; cursor:pointer;'>Solicitar Demo</button>`;
    }
    serviceDetails.innerHTML = content;
    serviceModal.style.display='block';
}
closeServiceModal.onclick = () => serviceModal.style.display='none';
window.onclick = (e) => {if(e.target == serviceModal){serviceModal.style.display='none';}}