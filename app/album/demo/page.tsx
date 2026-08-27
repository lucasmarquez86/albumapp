'use client'
import {useEffect,useState} from 'react'
import Link from 'next/link'

type Card={id:number,name:string}
const cards:Card[]=Array.from({length:52},(_,i)=>({id:i+1,name:['JUAN','TOMI','FEDE','MATI','NICO','LUCA'][i%6]}))

export default function Album(){
 const [page,setPage]=useState(0); const [owned,setOwned]=useState<number[]>(Array.from({length:37},(_,i)=>i+1)); const [selected,setSelected]=useState<Card|null>(null); const [portrait,setPortrait]=useState(false); const [tab,setTab]=useState<'album'|'sobre'|'figus'>('album');
 useEffect(()=>{const check=()=>setPortrait(innerHeight>innerWidth&&innerWidth<900);check();addEventListener('resize',check);return()=>removeEventListener('resize',check)},[])
 async function landscape(){try{await document.documentElement.requestFullscreen?.();await (screen.orientation as any).lock?.('landscape')}catch{}}
 const visible=cards.slice(page*12,page*12+12); const pct=Math.round(owned.length/cards.length*100); const missing=cards.length-owned.length; const maxPage=Math.ceil(cards.length/12)-1;
 const Slot=({c}:{c:Card})=>{const yes=owned.includes(c.id);return <button onClick={()=>yes&&setSelected(c)} className={`relative min-h-0 rounded-md border-2 overflow-hidden ${yes?'bg-zinc-100 text-black border-white':'bg-zinc-700/70 text-zinc-400 border-zinc-400'}`}><span className="absolute top-1 left-1.5 text-[10px] font-black">{String(c.id).padStart(2,'0')}</span>{yes?<div className="h-full flex flex-col justify-end"><div className="flex-1 grid place-items-center text-3xl">⚽</div><b className="bg-black text-white text-[9px] py-1">{c.name}</b></div>:<div className="h-full grid place-items-center"><div className="relative w-10 h-12 opacity-70"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-current"/><div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-8 rounded-t-full bg-current"/></div></div>}</button>}
 return <main className="fixed inset-0 bg-[#080808] text-white overflow-hidden">
 {portrait&&<div className="fixed inset-0 z-[60] bg-black grid place-items-center text-center p-8"><div><div className="text-6xl">↻</div><h2 className="text-3xl font-black mt-4">GIRÁ EL CELULAR</h2><p className="text-white/60 mt-2">Esta pantalla funciona únicamente en horizontal.</p><button onClick={landscape} className="mt-6 bg-white text-black px-6 py-4 rounded-xl font-black">VER EN HORIZONTAL</button></div></div>}
 {selected&&<div onClick={()=>setSelected(null)} className="fixed inset-0 z-50 bg-black/95 grid place-items-center p-2"><div onClick={e=>e.stopPropagation()} className="h-full max-h-[390px] flex items-center gap-3"><div className="h-full aspect-[3/4] bg-white text-black rounded-xl p-3 flex flex-col"><small>#{selected.id}</small><div className="text-6xl grid place-items-center flex-1">⚽</div><h2 className="text-2xl font-black text-center">{selected.name}</h2><p className="text-xs text-center">LOS PIBES FC</p></div><div className="w-28 space-y-2"><button className="w-full bg-white text-black rounded-xl py-4 text-xs font-bold">↓ Descargar</button><button onClick={()=>setSelected(null)} className="w-full border border-white/30 rounded-xl py-4 text-xs font-bold">✕ Cerrar</button></div></div></div>}
 <div className="h-full flex flex-col p-2 md:p-3">
  <header className="h-[52px] shrink-0 grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 px-2">
   <div className="flex items-center gap-3"><Link href="/dashboard/mis-albumes" className="text-3xl leading-none">‹</Link><b className="text-sm md:text-lg">ÁLBUM</b><span className="text-white/40">|</span><span className="text-sm md:text-base">Los Pibes FC</span></div>
   <div className="w-14 h-14 rounded-b-xl border-2 border-white bg-black grid place-items-center font-black z-10">LP</div>
   <nav className="justify-self-end flex bg-white/5 border border-white/10 rounded-xl p-1">{(['album','sobre','figus'] as const).map(t=><button key={t} onClick={()=>setTab(t)} className={`px-4 md:px-6 py-2 rounded-lg uppercase text-[10px] md:text-xs font-black ${tab===t?'bg-white text-black':''}`}>{t==='sobre'?'SOBRES':t}</button>)}</nav>
  </header>
  {tab==='album'&&<div className="flex-1 min-h-0 flex gap-2 pt-2">
   <aside className="w-[22%] max-w-[220px] shrink-0 rounded-xl border border-white/15 bg-zinc-950 p-3 flex flex-col justify-center"><div className="flex justify-between items-end"><b className="text-xl md:text-2xl">{owned.length} / {cards.length}</b><b className="text-lg md:text-xl">{pct}%</b></div><small className="mt-1">Figuritas pegadas</small><div className="h-2 bg-zinc-700 rounded-full mt-3 overflow-hidden"><div className="h-full bg-white rounded-full" style={{width:`${pct}%`}}/></div><div className="flex gap-3 text-[10px] md:text-xs mt-3"><span>Faltan: {missing}</span><span className="text-white/30">|</span><span>Repetidas: 23</span></div></aside>
   <section className="relative flex-1 min-w-0 rounded-xl border border-white/20 bg-gradient-to-b from-zinc-800 via-zinc-950 to-black p-2 grid grid-cols-[1fr_28%_1fr] gap-2 overflow-hidden">
    <button disabled={!page} onClick={()=>setPage(p=>p-1)} className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-4xl disabled:opacity-20">‹</button>
    <div className="grid grid-cols-3 grid-rows-2 gap-1.5 pl-5 min-h-0">{visible.slice(0,6).map(c=><Slot key={c.id} c={c}/>)}</div>
    <div className="relative min-h-0 border-x border-white/10 grid place-items-center text-center overflow-hidden"><div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_65%,white_0,transparent_35%)]"/><div className="relative"><h2 className="font-black text-sm md:text-xl">LOS PIBES FC</h2><div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white mx-auto my-3 grid place-items-center font-black text-2xl">LP</div><b className="text-[10px] md:text-sm">TEMPORADA 2026</b><small className="block text-white/40 mt-1">Página {page+1} de {maxPage+1}</small></div></div>
    <div className="grid grid-cols-3 grid-rows-2 gap-1.5 pr-5 min-h-0">{visible.slice(6,12).map(c=><Slot key={c.id} c={c}/>)}</div>
    <button disabled={page>=maxPage} onClick={()=>setPage(p=>p+1)} className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-4xl disabled:opacity-20">›</button>
   </section>
  </div>}
  {tab==='sobre'&&<div className="flex-1 grid place-items-center"><div className="text-center"><div className="w-28 h-36 border-2 border-white rounded-xl mx-auto grid place-items-center text-3xl font-black">LP</div><h2 className="text-xl font-black mt-3">SOBRE DISPONIBLE</h2><button className="mt-3 bg-white text-black px-6 py-3 rounded-xl font-black">ABRIR SOBRE</button></div></div>}
  {tab==='figus'&&<div className="flex-1 grid place-items-center text-white/60">Tus figuritas repetidas aparecerán acá.</div>}
  <footer className="h-[48px] shrink-0 mt-2 border-t border-white/10 flex items-center justify-between px-3"><span className="text-[10px] md:text-xs">ⓘ Tocá una figurita para verla más grande</span><button className="border border-white/15 rounded-xl px-5 py-2 text-xs">▦ Ver faltantes</button><button className="border border-white/15 rounded-xl px-5 py-2 text-xs">▽ Filtrar</button></footer>
 </div>
 </main>
}
