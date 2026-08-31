'use client'
import {useRef,useState} from 'react'
import Link from 'next/link'
const patterns=[
 ['Diagonal','repeating-linear-gradient(135deg,transparent 0 38px,var(--s) 38px 47px,transparent 47px 82px,var(--t) 82px 86px)'],
 ['Banda','linear-gradient(135deg,transparent 0 38%,var(--s) 38% 51%,transparent 51% 76%,var(--t) 76% 81%,transparent 81%)'],
 ['Líneas','repeating-linear-gradient(135deg,transparent 0 26px,var(--s) 26px 32px,transparent 32px 61px,var(--t) 61px 64px)'],
 ['Esquinas','linear-gradient(135deg,var(--s) 0 16%,transparent 16% 76%,var(--t) 76% 82%,transparent 82%)']
]
const DEFAULT_PITCH='/depositphotos_100991624-stock-photo-soccer-stadium-background.jpg'
export default function Page(){
 const [tool,setTool]=useState('diseño'),[p,setP]=useState('#8b542d'),[s,setS]=useState('#d2b38e'),[t,setT]=useState('#f3e7d7'),[pat,setPat]=useState(0),[patternPower,setPatternPower]=useState(24),[pitchTint,setPitchTint]=useState(42),[pitch,setPitch]=useState<string|null>(null),[logo,setLogo]=useState<string|null>(null),[body,setBody]=useState<string|null>(null)
 const cameraBody=useRef<HTMLInputElement>(null),galleryBody=useRef<HTMLInputElement>(null)
 const vars:any={'--p':p,'--s':s,'--t':t}
 const upload=(set:any)=>(e:any)=>{const f=e.target.files?.[0];if(f)set(URL.createObjectURL(f))}
 const pitchImage=`url(${pitch||DEFAULT_PITCH})`
 const tint=`linear-gradient(${p}${Math.round(pitchTint*2.55).toString(16).padStart(2,'0')},${p}${Math.round(pitchTint*2.55).toString(16).padStart(2,'0')})`
 const stadium=`${tint},${pitchImage}`
 const Pattern=({soft=false}:{soft?:boolean})=><div className="absolute inset-0 pointer-events-none" style={{...vars,background:patterns[pat][1],opacity:(soft?patternPower*.55:patternPower)/100}}/>
 return <main className="min-h-screen bg-[#f2f2f0] text-[#111] pb-24">
  <div className="max-w-[1280px] mx-auto px-3 md:px-6 py-4 md:py-6">
   <header className="bg-white border border-black/10 rounded-[22px] px-4 md:px-6 py-4 flex flex-wrap gap-4 items-center justify-between shadow-sm">
    <div><Link href="/dashboard" className="text-xs text-black/45">ALBUMAPP / CREAR ÁLBUM</Link><h1 className="text-xl md:text-2xl font-black tracking-tight">Diseño de la colección</h1></div>
    <div className="flex gap-1 md:gap-2 text-[10px] md:text-xs font-bold overflow-auto">{['01 DATOS','02 DISEÑO','03 CUERPO','04 JUGADORES','05 PUBLICAR'].map((x,i)=><span key={x} className={`whitespace-nowrap rounded-full px-3 py-2 ${i===1?'bg-black text-white':'bg-[#f2f2f0] text-black/40'}`}>{x}</span>)}</div>
   </header>
   <div className="mt-4 grid md:grid-cols-[190px_1fr] gap-4">
    <nav className="bg-[#151515] text-white rounded-[22px] p-2 md:p-3 flex md:flex-col gap-2 overflow-auto md:self-start md:sticky md:top-4">
     {[['diseño','◫','Diseño'],['cancha','▧','Cancha'],['escudo','◇','Escudo'],['cuerpo','♙','Cuerpo']].map(([id,ic,n])=><button key={id} onClick={()=>setTool(id)} className={`min-w-[100px] md:min-w-0 text-left rounded-2xl px-4 py-3 font-bold transition ${tool===id?'bg-white text-black':'hover:bg-white/10'}`}><span className="mr-2">{ic}</span>{n}</button>)}
    </nav>
    <section className="grid xl:grid-cols-[330px_1fr] gap-4">
     <div className="bg-white border border-black/10 rounded-[22px] p-5 self-start shadow-sm">
      {tool==='diseño'&&<><p className="text-[11px] font-black tracking-[.18em] text-black/40">IDENTIDAD VISUAL</p><h2 className="text-2xl font-black mt-1">Colores & pattern</h2><p className="text-sm text-black/50 mt-2">Esto define toda la colección. La foto de cancha siempre queda visible debajo.</p><div className="mt-6 space-y-3">{[['PRIMARIO',p,setP],['SECUNDARIO',s,setS],['TERCIARIO',t,setT]].map(([n,v,set]:any)=><label key={n} className="flex items-center justify-between border-b pb-3"><span className="text-xs font-black">{n}</span><span className="flex items-center gap-2 text-xs font-mono"><input type="color" value={v} onChange={e=>set(e.target.value)} className="w-11 h-11 border-0 bg-transparent"/>{v.toUpperCase()}</span></label>)}</div><p className="text-xs font-black mt-6 mb-3">PATTERN</p><div className="grid grid-cols-2 gap-2">{patterns.map((x,i)=><button key={x[0]} onClick={()=>setPat(i)} className={`relative aspect-[1.4] rounded-xl overflow-hidden border-2 ${pat===i?'border-black':'border-transparent'}`} style={{background:p,...vars}}><div className="absolute inset-0" style={{background:x[1]}}/><span className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-[9px] font-black">{x[0]}</span></button>)}</div><label className="block mt-5 text-[11px] font-black">INTENSIDAD PATTERN · {patternPower}%<input className="w-full mt-2 accent-black" type="range" min="0" max="70" value={patternPower} onChange={e=>setPatternPower(+e.target.value)}/></label></>}
      {tool==='cancha'&&<><p className="text-[11px] font-black tracking-[.18em] text-black/40">FONDO GENERAL</p><h2 className="text-2xl font-black mt-1">Cancha real</h2><p className="text-sm text-black/50 mt-2">La colección arranca con una foto real preestablecida. El admin puede reemplazarla por otra.</p><div className="aspect-[4/3] mt-5 rounded-2xl bg-cover bg-center overflow-hidden relative" style={{backgroundImage:stadium}}><Pattern soft/></div><label className="block mt-4 border-2 border-dashed rounded-xl p-4 text-center font-black text-xs cursor-pointer">CAMBIAR IMAGEN<input type="file" accept="image/*" className="hidden" onChange={upload(setPitch)}/></label>{pitch&&<button className="mt-2 text-xs underline" onClick={()=>setPitch(null)}>Volver a la cancha preestablecida</button>}<label className="block mt-5 text-[11px] font-black">CAPA DE COLOR · {pitchTint}%<input className="w-full mt-2 accent-black" type="range" min="0" max="80" value={pitchTint} onChange={e=>setPitchTint(+e.target.value)}/></label></>}
      {tool==='escudo'&&<><p className="text-[11px] font-black tracking-[.18em] text-black/40">IDENTIDAD</p><h2 className="text-2xl font-black mt-1">Escudo</h2><p className="text-sm text-black/50 mt-2">Idealmente PNG transparente. Después incorporamos recorte y eliminación de fondo.</p><label className="mt-5 min-h-48 border-2 border-dashed rounded-2xl grid place-items-center cursor-pointer overflow-hidden">{logo?<img src={logo} className="max-h-40 max-w-[80%] object-contain"/>:<b className="text-sm">＋ SUBIR ESCUDO</b>}<input type="file" accept="image/*" className="hidden" onChange={upload(setLogo)}/></label></>}
      {tool==='cuerpo'&&<><p className="text-[11px] font-black tracking-[.18em] text-black/40">BASE DEL EQUIPO</p><h2 className="text-2xl font-black mt-1">Cuerpo / camiseta</h2><p className="text-sm text-black/50 mt-2">Dos opciones reales: sacar una foto o elegir una existente.</p><div className="grid grid-cols-2 gap-2 mt-5"><button onClick={()=>cameraBody.current?.click()} className="bg-black text-white rounded-xl p-4 text-xs font-black">📷 CÁMARA</button><button onClick={()=>galleryBody.current?.click()} className="border border-black rounded-xl p-4 text-xs font-black">▧ CARRETE</button></div><input ref={cameraBody} type="file" accept="image/*" capture="environment" className="hidden" onChange={upload(setBody)}/><input ref={galleryBody} type="file" accept="image/*" className="hidden" onChange={upload(setBody)}/>{body&&<div className="mt-4 bg-[#eee] rounded-2xl p-3"><img src={body} className="h-52 w-full object-contain"/></div>}</>}
     </div>
     <div className="bg-[#e8e8e5] rounded-[22px] border border-black/10 p-4 md:p-7 overflow-hidden">
      <div className="flex justify-between items-end"><div><p className="text-[10px] font-black tracking-[.2em] text-black/40">LIVE PREVIEW</p><h2 className="text-xl md:text-3xl font-black">Así va a quedar</h2></div><span className="text-[10px] font-bold bg-white px-3 py-2 rounded-full">COLECCIÓN 2026</span></div>
      <div className="mt-6 grid lg:grid-cols-[310px_1fr] gap-6 items-start">
       <div><p className="text-[10px] font-black mb-2">FIGURITA</p><div className="mx-auto bg-[#f7f7f5] border-[9px] border-white shadow-[0_18px_45px_rgba(0,0,0,.16)] w-full max-w-[300px] aspect-[.70] p-[5px]">
        <div className="relative h-[76%] overflow-hidden bg-[#eee]">
         <div className="absolute inset-x-0 top-0 h-[22%] bg-[#ececeb]"/>
         <div className="absolute inset-x-0 top-[21%] bottom-0 bg-cover bg-center" style={{backgroundImage:stadium}}/><Pattern/>
         <div className="absolute z-10 top-[26%] left-3 text-7xl font-black text-white/20">13</div>
         {logo?<img src={logo} className="absolute z-30 top-3 left-3 w-16 h-16 object-contain"/>:<div className="absolute z-30 top-3 left-3 w-14 h-14 rounded-lg bg-white border grid place-items-center text-[8px] font-black">ESCUDO</div>}
         <div className="absolute z-30 top-3 right-3 w-12 h-14 rounded-lg bg-white border grid place-items-center text-[8px] font-black">LIGA</div>
         {body?<img src={body} className="absolute z-20 bottom-0 left-1/2 -translate-x-1/2 w-[112%] h-[82%] object-contain object-bottom"/>:<div className="absolute z-20 bottom-0 inset-x-6 h-[66%] rounded-t-[48%] bg-white/12 grid place-items-center text-white text-center text-xs font-black">JUGADOR<br/>PROTAGONISTA</div>}
        </div>
        <div className="h-[24%] bg-[#f5f5f3] grid grid-cols-[30%_1fr_25%] border-t border-black/10"><div className="p-2 flex flex-col justify-center gap-2 text-[9px] font-black"><span>18-04-97</span><span>1,84 M</span><span className="border border-black/30 text-center px-1">PANINI</span></div><div className="p-1 flex flex-col justify-center text-center"><span className="text-[9px]">IGNACIO</span><b className="text-xl leading-none">VÁZQUEZ</b><span className="mt-2 py-1 text-[9px] text-white font-black" style={{background:p}}>DEFENSOR</span></div><div className="border-l border-black/10 flex flex-col items-center justify-center"><span className="text-2xl">🇦🇷</span><span className="text-[8px] font-black mt-1">ARGENTINA</span></div></div>
       </div></div>
       <div><p className="text-[10px] font-black mb-2">ÁLBUM · DOBLE PÁGINA</p><div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,.16)] bg-cover bg-center" style={{backgroundImage:stadium}}><Pattern soft/><div className="absolute inset-y-0 left-1/2 w-px bg-black/35"/><div className="relative h-full grid grid-cols-6 grid-rows-2 gap-[3%] p-[5%]">{Array.from({length:12},(_,i)=><div key={i} className="relative bg-white p-[5%] shadow-lg"><div className="h-full border border-white/40 bg-black/10 grid place-items-center"><span className="text-white/80 font-black text-xs">{String(i+1).padStart(3,'0')}</span></div></div>)}</div></div><div className="mt-4 bg-white/70 rounded-xl p-4 text-xs"><b>Fondo:</b> foto real preestablecida + capa del color primario + pattern.</div></div>
      </div>
     </div>
    </section>
   </div>
  </div>
  <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t p-3 z-50"><div className="max-w-[1280px] mx-auto flex gap-3 justify-end"><Link href="/dashboard" className="px-6 py-3 border rounded-xl font-bold">Atrás</Link><Link href="/dashboard/album-demo/jugadores" className="px-6 py-3 bg-black text-white rounded-xl font-black">Guardar y continuar →</Link></div></div>
 </main>
}
