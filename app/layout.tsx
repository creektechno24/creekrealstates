import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import './globals.css'

import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({
  subsets: ["latin"]
})

const _geistMono = Geist_Mono({
  subsets: ["latin"]
})

export const metadata: Metadata = {

  // ✅ GLOBAL SEO TITLE
  title: {

    default:
      'Creek Real Estates - Find Your Dream Property',

    template:
      '%s | Creek Real Estates',

  },

  // ✅ SEO DESCRIPTION
  description:
    'Browse flats, apartments, villas, houses, lands, and properties for sale with Creek Real Estates.',

  // ✅ SEO KEYWORDS
  keywords: [
    'real estate',
    'property',
    'flats',
    'apartments',
    'villa',
    'land',
    'houses',
    'properties for sale',
  ],

  // ✅ AUTHOR
  authors: [
    {
      name: 'Creek Real Estates',
    },
  ],

  // ✅ OPEN GRAPH
  openGraph: {

    title:
      'Creek Real Estates',

    description:
      'Browse flats, apartments, villas, lands, and properties for sale.',

    type:
      'website',

    siteName:
      'Creek Real Estates',

  },

  // ✅ EXISTING
  generator: 'v0.app',

  // ✅ FAVICONS
 icons: {

  icon: [

    {
      url: "/favicon.ico",
    },

    {
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },

  ],

  apple:
    "/apple-touch-icon.png",

},

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (

    <html
      lang="en"
      className="bg-background"
    >

      <body className="font-sans antialiased">

        <div className="flex min-h-screen flex-col">

          {/* HEADER */}
          <Header />

          {/* MAIN */}
          <main className="flex-1">

            {children}

            <Toaster />

          </main>

          {/* FOOTER */}
          <Footer />

        </div>

        {/* ANALYTICS */}
        {process.env.NODE_ENV ===
          'production' && <Analytics />}

      </body>

    </html>

  )
}