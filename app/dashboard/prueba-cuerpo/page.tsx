'use client'

import Link from 'next/link'
import {useRef,useState} from 'react'

export default function PruebaCuerpo(){
 const camera=useRef<HTMLInputElement>(null),gallery=useRef<HTMLInputElement>(null)
 const [image,setImage]=useState<string|null>(null),[zoom,setZoom]=useState(100),[x,setX]=useState(50),[y,setY]=useState(50),[cut,setCut]=useState(31),[saved,setSaved]=useState(false)
 const load=(e:React.ChangeEvent<HTMLInputElement>)=>{const f=e.target.files?.[0];if(!f)return;setImage(URL.createObjectURL(f));setSaved(false);setZoom(100);setX(50);setY(50);setCut(31)}
 const photoStyle=image?{backgroundImage:`url(${image})`,backgroundSize:`${zoom}% auto`,backgroundPosition:`${x}% ${y}%`}:{}
 return <main className="min-h-screen bg-[#f2f2f0] text-[#111] pb-10">
  <div className="max-w-5xl mx-auto px-4 py-6">
   <div className="flex items-center justify-between gap-4 mb-5"><div><Link href="/dashboard/crear-album" className="text-xs text-black/45">← VOLVER AL DISEÑO</Link><h1 className="text-2xl md:text-3xl font-black">Prueba · cuerpo base</h1><p className="text-sm text-black/55 mt-1">Archivo separado: no modifica la versión aprobada.</p></div></div>
   {!image?<section className="bg-white rounded-[22px] border border-black/10 p-5 md:p-8"><h2 className="text-xl font-black">1. Subí una foto de cuerpo entero</h2><p className="text-sm text-black/55 mt-2">Ideal: de frente, camiseta visible, brazos separados del torso y buena luz.</p><div className="grid grid-cols-2 gap-3 mt-6"><button onClick={()=>camera.current?.click()} className="bg-black text-white rounded-2xl p-5 font-black">📷 CÁMARA</button><button onClick={()=>gallery.current?.click()} className="border-2 border-black rounded-2xl p-5 font-black">▧ CARRETE</button></div></section>:
   <div className="grid lg:grid-cols-[1fr_320px] gap-5">
    <section className="bg-white rounded-[22px] border border-black/10 p-4 md:p-6"><div className="flex justify-between items-center mb-3"><div><span className="text-[10px] tracking-[.18em] font-black text-black/40">PASO 2</span><h2 className="text-xl font-black">Ajustá cuerpo y cuello</h2></div><button onClick={()=>setImage(null)} className="text-xs font-black border rounded-xl px-3 py-2">CAMBIAR FOTO</button></div>
     <div className="relative mx-auto w-full max-w-[430px] aspect-[2/3] bg-[#ddd] overflow-hidden rounded-2xl touch-none" style={photoStyle}>
      <div className="absolute inset-x-0 top-0 bg-black/55" style={{height:`${cut}%`}}/>
      <div className="absolute inset-x-0 border-t-2 border-red-600" style={{top:`${cut}%`}}><span className="absolute right-2 -top-7 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded">CORTE DE CUELLO</span></div>
      <div className="absolute inset-x-0 bottom-0 border-2 border-dashed border-white/60 pointer-events-none" style={{top:`${cut}%`}}/>
     </div>
     <p className="text-xs text-black/50 mt-3 text-center">La zona oscura se elimina. La línea roja marca dónde empieza el cuerpo que queremos conservar.</p>
    </section>
    <aside className="bg-white rounded-[22px] border border-black/10 p-5 self-start"><h3 className="font-black">Ajustes</h3><label className="block mt-5 text-[11px] font-black">ZOOM · {zoom}%<input className="w-full mt-2 accent-black" type="range" min="70" max="180" value={zoom} onChange={e=>setZoom(+e.target.value)}/></label><label className="block mt-5 text-[11px] font-black">HORIZONTAL<input className="w-full mt-2 accent-black" type="range" min="0" max="100" value={x} onChange={e=>setX(+e.target.value)}/></label><label className="block mt-5 text-[11px] font-black">VERTICAL<input className="w-full mt-2 accent-black" type="range" min="0" max="100" value={y} onChange={e=>setY(+e.target.value)}/></label><label className="block mt-5 text-[11px] font-black">CORTE CUELLO · {cut}%<input className="w-full mt-2 accent-red-600" type="range" min="10" max="60" value={cut} onChange={e=>setCut(+e.target.value)}/></label><button onClick={()=>setSaved(true)} className="w-full bg-black text-white rounded-xl p-4 mt-6 text-xs font-black">PROCESAR CUERPO →</button><p className="text-[11px] text-black/45 mt-3">Esta primera prueba guarda el encuadre y la guía de corte. La segmentación real de fondo/cabeza es el siguiente paso.</p></aside>
   </div>}
   {saved&&<div className="mt-5 bg-[#111] text-white rounded-[22px] p-5"><b>Encuadre confirmado.</b><p className="text-sm text-white/65 mt-1">Ya tenemos la interacción de cámara/carrete, zoom, posición y corte de cuello aislada del editor principal.</p></div>}
   <input ref={camera} type="file" accept="image/*" capture="environment" className="hidden" onChange={load}/><input ref={gallery} type="file" accept="image/*" className="hidden" onChange={load}/>
  </div>
 </main>
}
