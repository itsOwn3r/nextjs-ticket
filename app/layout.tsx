import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import AuthProvider from './auth/Provider'
const roboto = localFont({ src: '../public/fonts/roboto.ttf' })

export const metadata: Metadata = {
  title: 'Ticketing System',
  description: 'NextJS Ticketing System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
        <div id='root' className='flex justify-between'>
       {children}
       </div>
       </AuthProvider>
        </body>
    </html>
  )
}
