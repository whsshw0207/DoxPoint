import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  title: 'DOX.POINT — 오버워치 티어 상승 코칭',
  description: '감이 아닌 이해를 통해 지속 가능한 티어 상승을 설계합니다. 플레이 직접 분석, 티어별 맞춤 전략, 즉시 적용 가능한 피드백.',
  keywords: ['오버워치 코칭', '오버워치 티어', 'DOX.POINT', '게임 코칭', '오버워치 강의'],
  openGraph: {
    title: 'DOX.POINT — 오버워치 티어 상승 코칭',
    description: '감이 아닌 이해를 통해 지속 가능한 티어 상승을 설계합니다.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,700;0,900;1,900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
