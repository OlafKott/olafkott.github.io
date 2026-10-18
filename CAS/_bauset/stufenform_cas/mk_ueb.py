#!/usr/bin/env python3
# Übung "Zeilenstufenform": aus der LGS-Übung (Kopf, Grund-CSS) + eigener Teil
import re
REPO = '/home/claude/olafkott.github.io/CAS/'
t = open(REPO + 'LGS/CAS_Uebung_LGS.html', encoding='utf-8').read()
css = re.search(r'<style>(.*?)</style>', t, re.S).group(1)
top = re.search(r'(<div class="top">.*?</div></div>)', t, re.S).group(1)
top = top.replace('<h1>CAS-Übung: Lineare Gleichungssysteme<small>Neue Aufgaben auf Knopfdruck · mit linSolve lösen · Lösung eintragen</small></h1>',
                  '<h1>CAS-Übung: Zeilenstufenform<small>Neue Aufgaben auf Knopfdruck · Matrix aufstellen · mit rref lösen</small></h1>')
assert 'Zeilenstufenform' in top
css = css.replace('\n/* linksbündig (Moodle-Frame) */', '''
.mxin{ display:inline-flex; align-items:stretch; vertical-align:middle; }
.mxin::before, .mxin::after{ content:""; width:7px; border:2px solid var(--ink); }
.mxin::before{ border-right:0; } .mxin::after{ border-left:0; }
.mxin table{ border-collapse:separate; border-spacing:5px 4px; }
.mxin td{ padding:0; }
.mxin td.rs{ border-left:2px solid var(--ink); padding-left:6px; }
.mxin tr.hd td{ font:italic 15px Cambria,Georgia,serif; color:var(--mute); text-align:center; }
.mxin input{ font:inherit; font-size:16px; width:54px; padding:5px 4px; border:1px solid #b8bdc6; border-radius:6px; background:#f7f8fa; text-align:center; }
.mxin input.ok{ background:var(--okbg); border-color:#8bc79a; }
.mxin input.no{ background:var(--nobg); border-color:#e2a0a0; }
.mxzeile{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; font-family:Cambria,Georgia,serif; font-size:20px; }
.teil{ font-size:14.5px; color:var(--mute); font-weight:600; margin:0 0 6px; }
.mxmsg{ font-size:13.5px; margin-top:6px; min-height:20px; }
@media (max-width:480px){ .mxin input{ width:42px; font-size:15px; } }
''' + '\n/* linksbündig (Moodle-Frame) */', 1)

body = '''<div class="wrap">
  <div class="tabs" id="tabs"></div>
  <div class="card">
    <h2 id="h">Aufgabe</h2>
    <p class="auftrag">Speichern Sie das Gleichungssystem als erweiterte Matrix <i>a</i> und lösen Sie es mit <span class="liste">rref(a)</span>.</p>
    <div id="lgs"></div>
    <div class="vorlage">Matrix: menu ▸ 7 ▸ 1 ▸ 1 · speichern: ctrl + var, <span class="liste">a</span> · rref: menu ▸ 7 ▸ 5</div>
  </div>
  <div class="card">
    <p class="teil">Teil 1 · Erweiterte Matrix</p>
    <div class="mxzeile"><i>a</i> = <span class="mxin"><table id="mx"></table></span></div>
    <div class="mxmsg" id="mxmsg"></div>
    <p class="teil" style="margin-top:14px">Teil 2 · Lösung aus rref(<i>a</i>)</p>
    <div class="grid" id="felder"></div>
    <div class="btns">
      <button class="go" id="pruefen">Prüfen</button>
      <button id="zeigen">Lösung anzeigen</button>
      <button id="neu">Neue Aufgabe ▶</button>
    </div>
    <div class="score" id="score"></div>
    <div class="stats" id="stats"></div>
  </div>
  <p class="hinweis">Alle Zahlen sind ganze Zahlen. Negative Zahlen mit Minuszeichen eintragen, z.&nbsp;B. −3 oder -3. Fehlt eine Variable, steht in der Matrix eine 0.</p>
</div>'''

js = r'''
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const V=['x','y','z'];
function det(M){ const [a,b,c]=M; return a[0]*(b[1]*c[2]-b[2]*c[1])-a[1]*(b[0]*c[2]-b[2]*c[0])+a[2]*(b[0]*c[1]-b[1]*c[0]); }
function gen(){
  for(;;){
    const M=Array.from({length:3},()=>Array.from({length:3},()=>R(-5,5)));
    const nz=M.flat().filter(v=>v===0).length;
    if(nz>2 || M.some(r=>r.filter(v=>v).length<2)) continue;
    if(det(M)===0) continue;
    const s=V.map(()=>R(-5,8));
    const b=M.map(r=>r.reduce((a,v,j)=>a+v*s[j],0));
    if(b.some(v=>Math.abs(v)>40)) continue;
    return {M,s,b,A:M.map((r,i)=>r.concat([b[i]]))};
  }
}
const mi=v=>v<0?'−'+(-v):''+v;
function eqHtml(r,b){
  let t=''; r.forEach((c,j)=>{ if(!c) return; const a=Math.abs(c), co=(a===1?'':a)+'<i>'+V[j]+'</i>';
    t+= t===''? (c<0?'−':'')+co : (c<0?' − ':' + ')+co; });
  return t+' = '+mi(b);
}
let A=null, stat={a:0,r:0};
function neu(){
  A=gen();
  document.getElementById('lgs').innerHTML='<span class="lgs">'+A.M.map((r,i)=>`<span><span class="rn">${['I','II','III'][i]}</span>${eqHtml(r,A.b[i])}</span>`).join('')+'</span>';
  let h='<tr class="hd"><td>x</td><td>y</td><td>z</td><td class="rs"></td></tr>';
  for(let i=0;i<3;i++){ h+='<tr>'; for(let j=0;j<4;j++) h+=`<td class="${j===3?'rs':''}"><input id="m_${i}_${j}" inputmode="numeric" autocomplete="off" aria-label="Zeile ${i+1}, Spalte ${j+1}"></td>`; h+='</tr>'; }
  document.getElementById('mx').innerHTML=h;
  document.getElementById('mxmsg').textContent='';
  document.getElementById('felder').innerHTML=V.map((x,j)=>`<div class="f" id="f_${j}"><label for="i_${j}">${x} =</label><input id="i_${j}" inputmode="numeric" autocomplete="off"><span class="m"></span><div class="msg"></div></div>`).join('');
  document.getElementById('score').textContent='';
  document.querySelectorAll('.f input, .mxin input').forEach(i=>i.addEventListener('keydown',e=>{ if(e.key==='Enter') pruefen(); }));
}
function parse(s){ s=s.trim().replace(/\s/g,'').replace('−','-'); if(!/^-?\d+$/.test(s)) return null; return parseInt(s,10); }
function pruefen(){
  // Teil 1: Matrix
  let mok=0, mleer=0, vz=0, null0=0;
  for(let i=0;i<3;i++) for(let j=0;j<4;j++){
    const el=document.getElementById(`m_${i}_${j}`); el.className='';
    if(!el.value.trim()){ mleer++; continue; }
    const v=parse(el.value), w=A.A[i][j];
    if(v===w){ el.className='ok'; mok++; } else { el.className='no'; if(v===-w) vz++; if(w===0) null0++; }
  }
  const mm=document.getElementById('mxmsg');
  if(mleer===12) mm.textContent='';
  else if(mok===12) mm.innerHTML='<span style="color:var(--ok);font-weight:bold">✓ Matrix richtig.</span>';
  else mm.innerHTML=`<span style="color:var(--no)">${mok} von 12 Einträgen richtig.</span> `+(null0?'Fehlt eine Variable, gehört dort eine 0 hin. ':'')+(vz?'Vorzeichen prüfen. ':'')+(mleer?'Bitte alle Felder ausfüllen.':'');
  // Teil 2: Lösung
  let ok=0; const vals=V.map((_,j)=>parse(document.getElementById('i_'+j).value));
  V.forEach((x,j)=>{
    const f=document.getElementById('f_'+j), m=f.querySelector('.m'), msg=f.querySelector('.msg'), raw=document.getElementById('i_'+j).value;
    f.className='f'; m.textContent=''; msg.textContent='';
    if(!raw.trim()) return;
    const v=vals[j];
    if(v===null){ f.classList.add('fmt'); m.textContent='?'; msg.textContent='Bitte nur eine ganze Zahl eintragen.'; return; }
    if(v===A.s[j]){ f.classList.add('ok'); m.textContent='✓'; ok++; return; }
    f.classList.add('no'); m.textContent='✗';
    if(A.s.includes(v)) msg.textContent='Diese Zahl gehört zu einer anderen Variablen. Zeile 1 = x, Zeile 2 = y, Zeile 3 = z.';
    else if(v===-A.s[j]) msg.textContent='Vorzeichen prüfen: negative Zahlen mit der Taste (−) eintippen.';
    else msg.textContent='Das stimmt noch nicht. Die Lösung steht in der letzten Spalte von rref(a).';
  });
  const alle=(ok===3&&mok===12);
  stat.a++; if(alle) stat.r++;
  document.getElementById('score').innerHTML= alle?'<span style="color:var(--ok)">Alles richtig! Klicken Sie auf „Neue Aufgabe“.</span>':`Matrix: ${mok} von 12 · Lösung: ${ok} von 3 richtig.`;
  document.getElementById('stats').textContent=`Geprüft: ${stat.a} · komplett richtig: ${stat.r}`;
}
function zeigen(){
  for(let i=0;i<3;i++) for(let j=0;j<4;j++){ const el=document.getElementById(`m_${i}_${j}`); if(el.className!=='ok'){ el.value=mi(A.A[i][j]); el.className=''; } }
  document.getElementById('mxmsg').textContent='Die Matrix ist jetzt eingetragen.';
  V.forEach((x,j)=>{ const f=document.getElementById('f_'+j); if(!f.classList.contains('ok')){ f.classList.add('show'); f.querySelector('.msg').textContent='Lösung: '+mi(A.s[j]); } });
}
document.getElementById('pruefen').onclick=pruefen;
document.getElementById('zeigen').onclick=zeigen;
document.getElementById('neu').onclick=neu;
neu();
'''
html = ('<!DOCTYPE html>\n<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<title>CAS-Übung: Zeilenstufenform</title>\n<style>' + css + '</style></head><body>\n' + top + '\n' + body + '\n<script>' + js + '</script>\n</body></html>\n')
assert '`' not in css and '`' not in body
open(REPO + 'Stufenform/CAS_Uebung_Stufenform.html', 'w', encoding='utf-8').write(html)
print('ok', len(html))
