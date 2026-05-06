import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0c12',
        'bg-secondary': '#0f1118',
        'bg-card': '#131620',
        blue: {
          primary: '#0066ff',
          hover: '#0052cc',
          muted: '#0066ff1a',
          glow: '#0066ff33',
        },
        gold: {
          primary: '#f5c842',
          muted: '#f5c8421a',
          glow: '#f5c84233',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          DEFAULT: 'rgba(255,255,255,0.10)',
          bright: 'rgba(255,255,255,0.18)',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(0,102,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,102,255,0.04) 1px, transparent 1px)
        `,
        'scanline': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,102,255,0.015) 2px, rgba(0,102,255,0.015) 4px)',
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      },
      keyframes: {
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'flicker': {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.8' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.6' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,102,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,102,255,0.6), 0 0 80px rgba(0,102,255,0.2)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glitch-h': {
          '0%': { clipPath: 'polygon(0 0, 100% 0, 100% 5%, 0 5%)' },
          '20%': { clipPath: 'polygon(0 15%, 100% 15%, 100% 25%, 0 25%)' },
          '40%': { clipPath: 'polygon(0 40%, 100% 40%, 100% 55%, 0 55%)' },
          '60%': { clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)' },
          '80%': { clipPath: 'polygon(0 85%, 100% 85%, 100% 95%, 0 95%)' },
          '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
        },
        'typing-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'scan': 'scan 4s linear infinite',
        'flicker': 'flicker 8s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'typing-cursor': 'typing-cursor 1s step-end infinite',
        'marquee': 'marquee 20s linear infinite',
      },
      boxShadow: {
        'blue-glow': '0 0 30px rgba(0,102,255,0.25), 0 0 60px rgba(0,102,255,0.1)',
        'blue-glow-lg': '0 0 60px rgba(0,102,255,0.35), 0 0 120px rgba(0,102,255,0.15)',
        'gold-glow': '0 0 30px rgba(245,200,66,0.25)',
        'card': '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)',
      },
    },
  },
  plugins: [],
}

export default config
