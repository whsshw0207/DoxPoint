'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import HeroGraphic from './HeroGraphic'

/* ──────────────────────────────────────────────
   Typing Hook
─────────────────────────────────────────────── */
function useTypingEffect(text: string, speed = 55, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    const startTimer = setTimeout(() => {
      let i = 0
      const timer = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(timer)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(timer)
    }, startDelay)
    return () => clearTimeout(startTimer)
  }, [text, speed, startDelay])

  return { displayed, done }
}

/* ──────────────────────────────────────────────
   Particle Grid Background
─────────────────────────────────────────────── */
function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLS = 24
    const ROWS = 14
    type Particle = { x: number; y: number; alpha: number; speed: number; size: number }
    const particles: Particle[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        alpha: Math.random() * 0.4 + 0.05,
        speed: Math.random() * 0.3 + 0.1,
        size: Math.random() * 1.5 + 0.5,
      })
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid lines
      const cw = canvas.width / COLS
      const rh = canvas.height / ROWS
      ctx.strokeStyle = 'rgba(0,102,255,0.06)'
      ctx.lineWidth = 0.5
      for (let c = 0; c <= COLS; c++) {
        ctx.beginPath()
        ctx.moveTo(c * cw, 0)
        ctx.lineTo(c * cw, canvas.height)
        ctx.stroke()
      }
      for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath()
        ctx.moveTo(0, r * rh)
        ctx.lineTo(canvas.width, r * rh)
        ctx.stroke()
      }

      // Grid intersections — pulsing dots
      for (let c = 0; c <= COLS; c++) {
        for (let r = 0; r <= ROWS; r++) {
          const pulse = Math.sin(t * 0.02 + c * 0.4 + r * 0.3) * 0.5 + 0.5
          ctx.beginPath()
          ctx.arc(c * cw, r * rh, pulse * 1.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,102,255,${0.04 + pulse * 0.1})`
          ctx.fill()
        }
      }

      // Floating particles
      for (const p of particles) {
        p.y -= p.speed
        if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,102,255,${p.alpha})`
        ctx.fill()
      }

      // Horizontal scan line
      const scanY = ((t * 0.8) % canvas.height)
      const grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 2)
      grad.addColorStop(0, 'rgba(0,102,255,0)')
      grad.addColorStop(1, 'rgba(0,102,255,0.12)')
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 40, canvas.width, 42)

      t++
      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}

/* ──────────────────────────────────────────────
   Strength Card
─────────────────────────────────────────────── */
const STRENGTH_CARDS = [
  {
    icon: '◈',
    title: '플레이 직접 분석',
    desc: '내 문제점을 정확히',
    color: '#0066ff',
    delay: 0,
  },
  {
    icon: '◆',
    title: '티어별 맞춤 전략',
    desc: '현재 티어에 맞는 전략',
    color: '#f5c842',
    delay: 0.1,
  },
  {
    icon: '▣',
    title: '즉시 적용 가능한 피드백',
    desc: '오늘 경쟁전부터 바로',
    color: '#0066ff',
    delay: 0.2,
  },
]

/* ──────────────────────────────────────────────
   Hero
─────────────────────────────────────────────── */
export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const { displayed: headline, done: headlineDone } = useTypingEffect(
    '같은 티어에서 1년째 막혔다면?',
    55,
    800
  )

  const handleCoachingScroll = useCallback(() => {
    const el = document.querySelector('#classes')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-[100dvh] pt-16 overflow-hidden bg-bg"
    >
      {/* Animated background — 모바일 제거 */}
      {!isMobile && <ParticleGrid />}

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 max-w-[600px] max-h-[600px] w-full h-full rounded-full bg-[#0066ff] opacity-[0.04] blur-[120px]" style={{ willChange: 'transform' }} />
        <div className="absolute bottom-1/4 right-1/4 max-w-[400px] max-h-[400px] w-full h-full rounded-full bg-[#0066ff] opacity-[0.03] blur-[100px]" style={{ willChange: 'transform' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100dvh-4rem)]">

          {/* ── Left: Copy + CTA ── */}
          <div className="flex flex-col justify-center py-8 lg:py-16">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-6 w-fit"
            >
              <span className="typo-eyebrow flex items-center gap-1.5 px-3 py-1.5 bg-[#0066ff]/10 border border-[#0066ff]/30 text-[#0066ff]"
                style={{ clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-pulse" />
                OVERWATCH COACHING
              </span>
            </motion.div>

            {/* Headline — typing effect */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4"
              style={{ letterSpacing: '-0.02em' }}>
              <span className="text-white">
                {headline}
              </span>
              <span className={`inline-block w-[3px] h-[0.9em] bg-[#0066ff] ml-1 align-middle ${headlineDone ? 'animate-typing-cursor' : ''}`} />
            </h1>

            {/* Sub headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: (isMobile || headlineDone) ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="typo-subtitle text-white/80 mb-3"
            >
              정체된 구간에는 이유가 있습니다.
            </motion.p>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="typo-body text-white/50 mb-8 max-w-[48ch]"
            >
              감이 아닌 이해를 통해 지속 가능한 티어 상승을 설계합니다.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: (isMobile || headlineDone) ? 1 : 0, y: (isMobile || headlineDone) ? 0 : 16 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              {/* Primary CTA */}
              <a
                href="/contact"
                className="typo-button group relative inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#0066ff] text-white hover:bg-[#0052cc] active:scale-[0.98] transition-all duration-300"
                style={{
                  clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)',
                  boxShadow: '0 0 30px rgba(0,102,255,0.35), 0 4px 16px rgba(0,102,255,0.25)',
                }}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.113 18.1.127 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                  </svg>
                  코칭 신청 & Contact
                </span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>

              {/* Secondary CTA */}
              <button
                onClick={handleCoachingScroll}
                className="typo-button group relative inline-flex items-center justify-center gap-2 px-7 py-4 bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.98] transition-all duration-300"
                style={{ clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)' }}
              >
                코칭 상품 보기
                <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>

            {/* Strength Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: (isMobile || headlineDone) ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {STRENGTH_CARDS.map((card) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: (isMobile || headlineDone) ? 1 : 0, y: (isMobile || headlineDone) ? 0 : 12 }}
                  transition={{ delay: 0.85 + card.delay, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group p-4 bg-white/[0.03] border border-white/[0.08] hover:border-[#0066ff]/40 hover:bg-[#0066ff]/[0.04] transition-all duration-300 cursor-default"
                  style={{ clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)' }}
                >
                  <span className="block text-xl mb-2" style={{ color: card.color }}>{card.icon}</span>
                  <p className="text-xs font-bold text-white mb-0.5">{card.title}</p>
                  <p className="typo-body-sm text-white/40">{card.desc}</p>
                  <span className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: card.color }} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: HeroGraphic ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={isMobile ? 'w-full mt-6 h-[280px] overflow-hidden' : 'relative flex items-center justify-end py-8'}
          >
            <div className={isMobile ? 'w-full h-full' : 'w-[95%]'}>
              <HeroGraphic accent="#0066ff" intensity="high" isMobile={isMobile} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0c12] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="typo-micro text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#0066ff]/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
