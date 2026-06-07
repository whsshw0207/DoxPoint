import type { Metadata } from 'next'
import { Suspense } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DOXPOINT | DOX.POINT — 오버워치 코칭',
  description: '같은 티어에서 1년째 막혔다면? 정체된 구간에는 이유가 있습니다. 감이 아닌 이해를 통해 지속 가능한 티어 상승을 설계합니다. DOXPOINT(독스포인트) 오버워치 전문 코칭.',
  keywords: ['오버워치 코칭', '오버워치 과외', 'DOXPOINT', 'doxpoint', 'overwatch coaching', 'OW 코칭', '티어 상승', '독스포인트', '독스', 'dox', 'DOX', 'DOX.POINT', '오버워치', 'overwatch'],
  openGraph: {
    title: 'DOXPOINT | DOX.POINT — 오버워치 코칭',
    description: '같은 티어에서 1년째 막혔다면? 정체된 구간에는 이유가 있습니다. 감이 아닌 이해를 통해 지속 가능한 티어 상승을 설계합니다. DOXPOINT(독스포인트) 오버워치 전문 코칭.',
    url: 'https://dox-point.vercel.app',
    siteName: 'DOXPOINT',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'P1VxrVsgxWDxSPRXxUHqFM87tZB9_BTR9kOLSrUQ0FA',
    other: {
      'naver-site-verification': '448bfb8aaefd896838921e652d1ce6d23c3ab233',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`dark ${archivo.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
      </head>
      <body className="bg-bg text-white antialiased">
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <Suspense fallback={null}>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        </Suspense>
      )}
    </html>
  )
}
