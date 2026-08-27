import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'AlbumApp', description: 'Álbum digital de figuritas' }

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
