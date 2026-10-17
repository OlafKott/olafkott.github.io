// ---------- Handy: Display oben festhalten, Tasten einblendbar, Taste im Text antippbar ----------
(function(){
  const mq=window.matchMedia('(max-width:620px), (max-height:520px)');
  const upd=()=>{ APP.classList.toggle('phone',mq.matches); document.documentElement.style.setProperty('--barh',document.querySelector('.bar').offsetHeight+'px'); };
  window.addEventListener('resize',upd);
  mq.addEventListener ? mq.addEventListener('change',upd) : mq.addListener(upd); upd();
  document.querySelectorAll('.keytog').forEach(b=>b.addEventListener('click',()=>{
    const open=APP.classList.toggle('keys-open');
    document.querySelectorAll('.keytog').forEach(x=>x.textContent=open?'Tasten ausblenden':'Tasten einblenden');
  }));
  $('right').addEventListener('click',e=>{
    if(!APP.classList.contains('phone')||mode!=='g') return;
    const c=e.target.closest('.stat .chip.now, .chips .chip.now'); if(!c) return;
    const k=STAGE.querySelector('.cwrap:not([hidden]) .calc .k.hit'); if(k) k.click();
  });
})();
