const fs=require('fs');const path=require('path');
function parseDraft(mod){
  const lines=fs.readFileSync(path.join('docs/modules',`lovyc_fr_module_${mod}.md`),'utf8').split(/\r?\n/);
  const screens={}; let mission=null; let current=null;
  for(const l of lines){
    const mMission=l.match(/^## Mission (\d+)/); if(mMission){mission=mMission[1]; continue;}
    const mScreen=l.match(/^### Ecran (\d+) - \s*(\w+) - \s*(.*)$/i);
    if(mScreen){current={mission:mission, num:mScreen[1], type:mScreen[2], title:mScreen[3].trim(), question:null}; continue;}
    if(current){const q=l.match(/^[-*]\s*Question:\s*(.*)$/); if(q){screens[`${current.mission}-${current.num}`]={title:current.title, question:q[1].trim(), type:current.type}; current=null;}}
  }
  return screens;
}
function parseHtml(mod){
  const dir=path.join('Lovyc/Francais',`Module_${mod}`); const files=fs.readdirSync(dir).filter(f=>/^mission_\d+\.html$/.test(f));
  const screens={};
  for(const f of files){const mission=f.match(/mission_(\d+)\.html/)[1]; const html=fs.readFileSync(path.join(dir,f),'utf8');
    const m=html.match(/const weekData = ([\s\S]*?)];/); if(!m) continue; let arr; try{arr=eval(m[1]+']');}catch(e){continue;}
    if(!Array.isArray(arr)) continue; arr.forEach(day=>{(day.steps||[]).forEach((s,i)=>{screens[`${mission}-${i+1}`]={title:s.title||'', question:(s.q||s.question||s.body||'').replace(/<[^>]+>/g,''), type:s.type};});});
  }
  return screens;
}
[1,2].forEach(mod=>{
  const d=parseDraft(mod), h=parseHtml(mod); console.log(`\n=== Module ${mod} ===`);
  Object.keys(d).sort((a,b)=>{const [ma,sa]=a.split('-').map(Number);const [mb,sb]=b.split('-').map(Number);return ma-mb||sa-sb;}).forEach(k=>{
    const dr=d[k], hr=h[k]; if(!hr){console.log(`${k}: manquant dans HTML`); return;}
    const diffs=[]; if(dr.title.trim()!=hr.title.trim()) diffs.push(`Titre draft="${dr.title}" / html="${hr.title}"`);
    if(dr.question && dr.question.trim()!=hr.question.trim()) diffs.push(`Question draft="${dr.question}" / html="${hr.question}"`);
    if(diffs.length) console.log(`${k}: ${diffs.join(' ; ')}`);
  });
});
