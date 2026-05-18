'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

interface HeroGraphicProps {
  accent?: string
  intensity?: 'low' | 'medium' | 'high'
  isMobile?: boolean
}

export default function HeroGraphic({ accent = '#0066ff', intensity = 'high', isMobile = false }: HeroGraphicProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    if (isMobile) return
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      setMouse({
        x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
        y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [isMobile])

  const px = isMobile ? 0 : (mouse.x - 0.5) * 24
  const py = isMobile ? 0 : (mouse.y - 0.5) * 24

  const [mouseActive, setMouseActive] = useState(false)
  const targetRef   = useRef(100)
  const barsRef     = useRef<[number, number, number]>([0, 0, 0])
  const prevRef     = useRef<[number, number, number]>([0, 0, 0])
  const rafRef      = useRef<number>()
  const [bars, setBars] = useState<[number, number, number]>([0, 0, 0])

  // Different lerp speeds per bar — all converge to the same target
  const LERP: [number, number, number] = [0.10, 0.055, 0.030]

  useEffect(() => {
    if (isMobile) {
      setBars([100, 100, 100])
      return
    }
    const loop = () => {
      const t = targetRef.current
      const cur = barsRef.current
      const next: [number, number, number] = [
        Math.abs(cur[0] + (t - cur[0]) * LERP[0] - t) < 0.5 ? t : cur[0] + (t - cur[0]) * LERP[0],
        Math.abs(cur[1] + (t - cur[1]) * LERP[1] - t) < 0.5 ? t : cur[1] + (t - cur[1]) * LERP[1],
        Math.abs(cur[2] + (t - cur[2]) * LERP[2] - t) < 0.5 ? t : cur[2] + (t - cur[2]) * LERP[2],
      ]
      barsRef.current = next
      const r: [number, number, number] = [Math.round(next[0]), Math.round(next[1]), Math.round(next[2])]
      const p = prevRef.current
      if (r[0] !== p[0] || r[1] !== p[1] || r[2] !== p[2]) {
        prevRef.current = r
        setBars(r)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMobile) return
    targetRef.current = mouseActive ? Math.round(mouse.x * 100) : 100
  }, [mouse.x, mouseActive, isMobile])

  const trails = useMemo(() => {
    const arr = []
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2 + (i % 3) * 0.2
      const r1 = 180 + (i % 4) * 40
      const r2 = 420 + (i % 3) * 50
      arr.push({
        x1: 500 + Math.cos(angle) * r1,
        y1: 400 + Math.sin(angle) * r1,
        x2: 500 + Math.cos(angle) * r2,
        y2: 400 + Math.sin(angle) * r2,
        delay: (i * 0.28) % 3.6,
      })
    }
    return arr
  }, [])

  const floaters = [
    { t: '狙撃',     x: 12,  y: 22,  s: 42, rot: -8,  cls: 'fl-jp',    delay: 0   },
    { t: 'BANG!',   x: 78,  y: 14,  s: 28, rot: 10,  cls: 'fl-pop',   delay: 0.4 },
    { t: '力',      x: 86,  y: 66,  s: 72, rot: 6,   cls: 'fl-kanji', delay: 0.8 },
    { t: 'LOCK-ON', x: 8,   y: 70,  s: 14, rot: 0,   cls: 'fl-mono',  delay: 1.2 },
    { t: 'HEADSHOT',x: 72,  y: 82,  s: 13, rot: -4,  cls: 'fl-mono',  delay: 1.6 },
    { t: '—01',    x: 4,   y: 48,  s: 14, rot: 0,   cls: 'fl-mono',  delay: 0.2 },
    { t: 'v8.2',    x: 92,  y: 42,  s: 12, rot: 0,   cls: 'fl-mono',  delay: 0.6 },
    { t: 'HIT',     x: 58,  y: 8,   s: 20, rot: -6,  cls: 'fl-pop',   delay: 2.0 },
  ]

  const corners: Array<[number, number, number]> = [
    [160, 150, 0], [840, 150, 90], [840, 650, 180], [160, 650, 270],
  ]

  return (
    <div className="hero-gfx" ref={ref} style={{ color: accent }}
      {...(!isMobile && {
        onMouseEnter: () => setMouseActive(true),
        onMouseLeave: () => setMouseActive(false),
      })}
    >
      {/* BACK: grid + radials */}
      <div className="gfx-grid" />
      <div className="gfx-vignette" />

      {/* MID: big type as background */}
      <div className="gfx-bgtype">
        <span className="gfx-bgtype-line">DOX.POINT</span>
        <span className="gfx-bgtype-line gfx-bgtype-alt">DOX.POINT</span>
        <span className="gfx-bgtype-line">DOX.POINT</span>
      </div>

      {/* SVG: reticles, trails, rings */}
      <svg
        className="gfx-svg"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ transform: `translate(${px * 0.3}px, ${py * 0.3}px)`, overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="hg-rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="55%"  stopColor="currentColor" stopOpacity="0.05" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hg-trail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0" />
            <stop offset="70%"  stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
          <filter id="hg-glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* glow disc */}
        <circle cx="500" cy="400" r="320" fill="url(#hg-rg)" />

        {/* concentric scope rings */}
        {[320, 260, 200, 140].map((r, i) => (
          <circle
            key={i}
            cx="500" cy="400" r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.18 + i * 0.06}
            strokeWidth="1"
            strokeDasharray={i === 0 ? '2 6' : i === 3 ? '0' : '4 8'}
            style={{
              transformOrigin: '500px 400px',
              animation: `ringPulse ${6 + i}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}

        {/* rotating hex rings */}
        <polygon
          points="500,140 730,270 730,530 500,660 270,530 270,270"
          fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1"
          style={{ transformOrigin: '500px 400px', animation: 'hexSpin 40s linear infinite' }}
        />
        <polygon
          points="500,220 660,310 660,490 500,580 340,490 340,310"
          fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5"
          strokeDasharray="8 4"
          style={{ transformOrigin: '500px 400px', animation: 'hexSpin 25s linear infinite reverse' }}
        />

        {/* radial tick marks */}
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2
          const r1 = 340
          const r2 = i % 3 === 0 ? 360 : 350
          return (
            <line
              key={i}
              x1={500 + Math.cos(a) * r1} y1={400 + Math.sin(a) * r1}
              x2={500 + Math.cos(a) * r2} y2={400 + Math.sin(a) * r2}
              stroke="currentColor"
              strokeOpacity={i % 3 === 0 ? 0.7 : 0.3}
              strokeWidth="1"
            />
          )
        })}

        {/* bullet trails */}
        {trails.map((t, i) => (
          <line
            key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="url(#hg-trail)" strokeWidth="1.5"
            style={{ animation: `trail 3.6s ease-out ${t.delay}s infinite` }}
            filter="url(#hg-glow)"
          />
        ))}

        {/* outer target corners */}
        {corners.map(([x, y, rot], i) => (
          <g
            key={i}
            transform={`translate(${x} ${y}) rotate(${rot})`}
            style={{ animation: `cornerBlink 2.4s ease-in-out ${i * 0.15}s infinite` }}
          >
            <path d="M 0 0 L 24 0 M 0 0 L 0 24" stroke="currentColor" strokeWidth="2" fill="none" />
          </g>
        ))}

        {/* reticle crosshair */}
        <g className="reticle" style={{ transformOrigin: '500px 400px' }}>
          <g style={{ animation: 'retSpin 20s linear infinite', transformOrigin: '500px 400px' }}>
            <polygon
              points="500,320 580,400 500,480 420,400"
              fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6"
            />
          </g>
          <circle cx="500" cy="400" r="76" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.85" />
          <circle cx="500" cy="400" r="76" fill="none" stroke="currentColor" strokeWidth="6"   strokeOpacity="0.15" />
          <circle cx="500" cy="400" r="3"  fill="currentColor" />
          <circle
            cx="500" cy="400" r="10"
            fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6"
            style={{ animation: 'dotPulse 1.6s ease-out infinite', transformOrigin: '500px 400px' }}
          />
          <line x1="500" y1="300" x2="500" y2="360" stroke="currentColor" strokeWidth="1.5" />
          <line x1="500" y1="440" x2="500" y2="500" stroke="currentColor" strokeWidth="1.5" />
          <line x1="400" y1="400" x2="460" y2="400" stroke="currentColor" strokeWidth="1.5" />
          <line x1="540" y1="400" x2="600" y2="400" stroke="currentColor" strokeWidth="1.5" />
          <line x1="500" y1="276" x2="500" y2="286" stroke="currentColor" strokeWidth="2" />
          <line x1="500" y1="514" x2="500" y2="524" stroke="currentColor" strokeWidth="2" />
          <line x1="376" y1="400" x2="386" y2="400" stroke="currentColor" strokeWidth="2" />
          <line x1="614" y1="400" x2="624" y2="400" stroke="currentColor" strokeWidth="2" />
        </g>

        {/* distance / angle labels */}
        <g fontFamily="JetBrains Mono, monospace" fontSize="11" fill="currentColor" fillOpacity="0.7">
          <text x="500" y="256" textAnchor="middle">270m</text>
          <text x="500" y="548" textAnchor="middle">0m</text>
          <text x="360" y="404" textAnchor="end">W</text>
          <text x="640" y="404" textAnchor="start">E</text>
          <text x="420" y="320" textAnchor="middle" fillOpacity="0.5">HIT.PROB</text>
          <text x="580" y="320" textAnchor="middle" fillOpacity="0.5">92%</text>
          <text x="420" y="490" textAnchor="middle" fillOpacity="0.5">WIND</text>
          <text x="580" y="490" textAnchor="middle" fillOpacity="0.5">0.2</text>
        </g>

        {/* scope HUD frame */}
        <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5">
          <path d="M 20 20 L 60 20 L 60 60" />
          <path d="M 980 20 L 940 20 L 940 60" />
          <path d="M 20 780 L 60 780 L 60 740" />
          <path d="M 980 780 L 940 780 L 940 740" />
        </g>
      </svg>

      {/* CENTER: DOX.POINT callsign */}
      <div
        className="gfx-center"
        style={{ transform: `translate(calc(-50% + ${px * 0.15}px), calc(-50% + ${py * 0.15}px))` }}
      >
        <div className="gfx-center-top mono">
          <span>—</span>
          <span>T-MINUS 00:00</span>
          <span>●</span>
          <span>LIVE</span>
        </div>
        <h2 className="gfx-callsign">
          <span className="gfx-call-main">DOX<span className="gfx-call-dot">·</span>POINT</span>
          <span className="gfx-call-sub">PRECISION COACH</span>
        </h2>
        <div className="gfx-center-bot mono" style={{ whiteSpace: 'nowrap', display: 'flex', justifyContent: 'center', letterSpacing: '0.15em' }}>
          <span>[</span><span>COACH · DOX</span><span>]</span>
          <span className="sep">/</span>
          <span>[</span><span>1994</span><span>]</span>
          <span className="sep">/</span>
          <span>[</span><span>9Y PRO</span><span style={{ marginRight: '-0.15em' }}>]</span>
        </div>
      </div>

      {/* FLOATING typographic accents */}
      {floaters.map((f, i) => (
        <span
          key={i}
          className={`floater ${f.cls}`}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            fontSize: f.s,
            transform: `rotate(${f.rot}deg)`,
            animationDelay: `${f.delay}s`,
          }}
        >
          {f.t}
        </span>
      ))}

      {/* SIDE HUD modules */}
      <div className="gfx-hud gfx-hud-tl mono">
        <div className="hud-row"><span className="k">TGT</span><span className="v">DOX-01</span></div>
        <div className="hud-row"><span className="k">DIST</span><span className="v">248m</span></div>
        <div className="hud-row"><span className="k">WIND</span><span className="v">0.2 N</span></div>
        <div className="hud-row"><span className="k">STATUS</span><span className="v ok">● LOCKED</span></div>
      </div>

      <div className="gfx-hud gfx-hud-br mono">
        <div className="hud-mini">
          <div className="hud-bar">
            <div className="hud-bar-fill" style={{ width: `${bars[0]}%`, animation: 'none' }} />
          </div>
          <div className="hud-row"><span className="k">ACCURACY</span><span className="v">{bars[0]}%</span></div>
        </div>
        <div className="hud-mini">
          <div className="hud-bar">
            <div className="hud-bar-fill" style={{ width: `${bars[1]}%`, animation: 'none' }} />
          </div>
          <div className="hud-row"><span className="k">POSITION</span><span className="v">{bars[1]}%</span></div>
        </div>
        <div className="hud-mini">
          <div className="hud-bar">
            <div className="hud-bar-fill" style={{ width: `${bars[2]}%`, animation: 'none' }} />
          </div>
          <div className="hud-row"><span className="k">GAME SENSE</span><span className="v">{bars[2]}%</span></div>
        </div>
      </div>

      <div className="gfx-hud gfx-hud-tr mono">
        <div className="hud-pulse" />
        <span>REC</span>
      </div>

      {/* SCAN line sweep */}
      <div className="gfx-scan" />
    </div>
  )
}
