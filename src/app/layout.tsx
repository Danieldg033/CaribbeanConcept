import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavigationMenu from "@/components/NavigationMenu"
import Users from "@/components/Users"

/*Comunication between page.tsx and layaout.tsx*/

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Caribbean Concept',
  description: 'Ondas del caribe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationMenu></NavigationMenu>
        {/* <Users></Users> */}
        {children}
      </body>
    </html>
  )
}
