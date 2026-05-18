import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Archivo } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DOX.POINT',
  description: '같은 티어에서 막혔다면? 감이 아닌 이해를 통해 지속 가능한 티어 상승을 설계합니다. 오버워치 전문 코치 DOX의 1:1 플레이 분석 코칭.',
  keywords: ['오버워치 코칭', '오버워치 과외', 'DOXPOINT', 'doxpoint', 'overwatch coaching', 'OW 코칭', '티어 상승'],
  openGraph: {
    title: 'DOX.POINT',
    description: '감이 아닌 이해를 통해 지속 가능한 티어 상승을 설계합니다.',
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
    <html lang="ko" className={`dark ${archivo.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-white antialiased">
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}
