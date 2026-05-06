import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
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
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUPSURBVHhe7d0hqGRVHMfxjUaj0bjRaDRuNBpNIlg2GLSswaBFZIsGgxYRi4LlFUGLCJYtC2IQwbJFEIMIlpE/jwfLeS577p17zsz9vc8H/mVh39zhfme4c++ZubcOEORW+w+wZ4ImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJsrug37nm/HzxU+Hw3e//P/882+7RZzS7oO+9dp5zAvvHg4vfXD5Arh4eDj8+Xe7pcwg6EHzzBuHw6ufHQ4/P2q3mJEEPWHu3L9812Y8QU+c2/cuj7sZR9AnmA+/bZ8FWxH0ieaVT5whGUHQJ5w6M/LbH+0z4hiCPvE8e1fUWxL0GcyL7zv82Iqgz2Tuftk+M9YQ9BnN1w/aZ8dSNzLo5968viajZ+p029X6jrpY8vzb1//2MeN4+ng3MugKcSsPfr88XKgXSfs4a6aOp1lP0Bv69IfLd9n28ZZOvUhYR9Abq8VI9S7bPuaSefmj9q/SS9CDVJTt4y4Zq/TWEfQgtR76mA+NTuOtI+iB6l221kW3j98z9f8e/dX+RZ5G0IPVO237+L1jVd5ygh6s3mXXvkv7cLicoCeopaLtNvRMnQJkGUFPUOeV223oHWc7lhH0JGvPeNTFGvoJepL6Bni7HT1T/49+gp7k4++vb0fP1Lda6CfoSX789fp29I4frekn6EkqynY7eqdeDPQR9ERrz0db+N9P0BOtPdNRx9/0EfRE9QGv3ZaeqW/I0EfQE9Wvk7bb0jNO3fUT9ESCHk/QEwl6PEFPJOjxBD2RoMcT9ESCHk/QE60N2vcL+wl6orVBOw/dT9ATrf29Dt8t7CfoidZe+rbIv5+gJ7I4aTxBT3LM8lF3zuon6EmO+aKsH2/sJ+hJ6n7h7Xb0jJ8yWEbQk6z9BSU/NrOMoCexFnoOQU/gA+E8gp6gLoy029AzdZrP7d6WEfQEaw812lI5ywh6sDpkaB+/d1zyXk7Qg629NUWdrnO4sZygB6o1GO1j944lo+sIehC3ozgNQQ9QP921dmVdzeuft3+RXoLe2HsX1x9v6Vi7sZ6gN1CHF299ddy78tVseam7Xlx16m/J7H3t9Y0Meu3N66/m6ib29eXV2/eu//21s/XN69f8yPreL7XfyKDPdS4ets/uOILeoXaH7HXq8GBrgt6hdofscbY8bn6coHeo3SF7mzoGH3VFUNA71O6QPU3FvOWHwJagd6jdIXuZim3UO/MVQe9Qu0POfeqy9qxzvYLeoXaHnPPcuT/3VseC3qF2h5zb1MWSWpsx8lj5SQS9Q+0OOZepD3x196pT3jRT0DvU7pBTTL0L1zqIWsNcv79xLks/Rb1D7TqLmXMu4T5JHa+32/y0OcWh0ZZ2HzQ8TtBEETRRBE0UQRNF0EQRNFEETRRBE0XQRBE0UQRNFEETRdBEETRRBE0UQRNF0EQRNFEETRRBE0XQRBE0UQRNFEETRdBEETRRBE0UQRNF0EQRNFEETRRBE0XQRBE0UQRNFEETRdBEETRRBE0UQRNF0EQRNFEETRRBE0XQRBE0UQRNFEETRdBEETRRBE0UQRNF0EQRNFEETRRBE0XQRBE0UQRNFEETRdBEETRR/gNO8o8GUX3OQwAAAABJRU5ErkJggg==" />
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
