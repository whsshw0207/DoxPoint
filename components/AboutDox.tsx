'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

/* ── 공통 fade-up 애니메이션 ── */
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Section label ── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-px bg-[#0066ff]" />
      <span className="typo-eyebrow text-[#0066ff]">{text}</span>
    </div>
  )
}

/* ══════════════════════════════════════════
   Career Timeline data
══════════════════════════════════════════ */
const CAREER_ITEMS = [
  { team: 'Old Ocean',       role: 'Coach',           color: '#0066ff', hudColor: '#60a5fa', logo: '/logo/oldOcean.webp' },
  { team: 'VEC',             role: 'Head Coach',           color: '#C084FC', hudColor: '#a78bfa', logo: '/logo/VEC.webp' },
  { team: 'Gen.G Academy',   role: 'Coach',           color: '#C9A84C', hudColor: '#fbbf24', logo: '/logo/genG.svg' },
  { team: 'Toronto Defiant', role: 'Coach', color: '#C50D26', hudColor: '#C50D26', logo: '/logo/Toronto_Defiant_logo.svg.png' },
  { team: 'Florida Mayhem',  role: 'Coach', color: '#CF4691', hudColor: '#CF4691', logo: '/logo/Florida Mayhem.svg' },
  { team: 'Team MVP',        role: 'Coach',           color: '#1878BA', hudColor: '#1878BA', logo: '/logo/mvp.webp' },
  { team: 'EHOME Shield',    role: 'playing coach',                color: '#831C1A', hudColor: '#831C1A', logo: '/logo/ehome.webp' },
]

/* ══════════════════════════════════════════
   1. 코치 소개
══════════════════════════════════════════ */
function CoachIntro() {
  const [showText, setShowText] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const delay = showText ? 5500 : 4000
    const t = setTimeout(() => setShowText(prev => !prev), delay)
    return () => clearTimeout(t)
  }, [inView, showText])

  return (
    <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* 좌 - 이미지 */}
      <FadeUp delay={0}>
        <div className="relative mx-auto lg:mx-0 w-full max-w-sm lg:max-w-none aspect-[4/5]">
          <div className="absolute -inset-px bg-gradient-to-br from-[#0066ff]/20 via-transparent to-[#0066ff]/5 pointer-events-none" />
          <div
            className="relative w-full h-full border border-[#0066ff]/20 overflow-hidden bg-[#0f1118]"
            style={{ clipPath: 'polygon(16px 0%,100% 0%,100% calc(100% - 16px),calc(100% - 16px) 100%,0% 100%,0% 16px)' }}
          >
            <Image
                src="/etc/png_DOX_Headshot.webp"
                alt="DOX 코치"
                fill
                priority
                quality={80}
                sizes="(min-width: 1024px) 384px, 100vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                className="object-cover"
                style={{ opacity: 1, zIndex: 1 }}
            />
            <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#0066ff]" style={{ zIndex: 2 }} />
            <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#0066ff]" style={{ zIndex: 2 }} />
            <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#0066ff]" style={{ zIndex: 2 }} />
            <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#0066ff]" style={{ zIndex: 2 }} />
            <div className="absolute bottom-5 left-5 right-5" style={{ zIndex: 2 }}>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a0c12]/80 backdrop-blur-sm border border-[#0066ff]/30"
                style={{ clipPath: 'polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-pulse" />
                <span className="typo-eyebrow text-white/80">DOX COACH</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-3 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#0066ff]/40 to-transparent" />
        </div>
      </FadeUp>

      {/* 우 - State A: 타임라인 / State B: 텍스트 */}
      <div className="relative min-h-[560px] sm:min-h-[680px]">
        {/* 수동 전환 버튼 */}
        <button
          onClick={() => setShowText(prev => !prev)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-[#0066ff] hover:text-[#66aaff] transition-colors duration-200"
          aria-label="전환"
        >
          <span className="text-5xl font-light leading-none select-none">›</span>
        </button>
        <AnimatePresence mode="wait">
          {!showText ? (
            /* ── State A: Career Timeline ── */
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col justify-center pr-4 sm:pr-10"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#0066ff]" />
                <span className="typo-eyebrow text-[#0066ff]">Career Timeline</span>
              </div>

              {/* Timeline body — 중앙선 기준 좌우 번갈아 배치 */}
              <div className="relative">
                {/* Center vertical line */}
                <motion.div
                  className="absolute w-px"
                  style={{
                    left: 'calc(50% - 0.5px)',
                    top: '32px',
                    bottom: '32px',
                    transformOrigin: 'top',
                    background: 'linear-gradient(to bottom, rgba(0,102,255,0.8), rgba(0,102,255,0.35), transparent)',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="space-y-3">
                  {CAREER_ITEMS.map((item, i) => {
                    const isLeft = i % 2 === 0
                    const logo = (
                      <div style={{
                        position: 'relative',
                        width: '64px',
                        height: '64px',
                        background: 'white',
                        border: 'none',
                        borderRadius: 0,
                        padding: '6px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12, borderTop: `1px solid ${item.hudColor}`, borderLeft: `1px solid ${item.hudColor}` }} />
                        <span style={{ position: 'absolute', top: 0, right: 0, width: 12, height: 12, borderTop: `1px solid ${item.hudColor}`, borderRight: `1px solid ${item.hudColor}` }} />
                        <span style={{ position: 'absolute', bottom: 0, left: 0, width: 12, height: 12, borderBottom: `1px solid ${item.hudColor}`, borderLeft: `1px solid ${item.hudColor}` }} />
                        <span style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderBottom: `1px solid ${item.hudColor}`, borderRight: `1px solid ${item.hudColor}` }} />
                        <img src={item.logo} alt={item.team} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    )
                    const info = (
                      <div className={isLeft ? 'text-right min-w-0' : 'text-left min-w-0'}>
                        <p className="text-base font-black text-white leading-tight" style={{ letterSpacing: '-0.01em' }}>
                          {item.team}
                        </p>
                        {item.role && (
                          <p className="text-sm font-semibold mt-0.5" style={{ color: item.color }}>
                            {item.role}
                          </p>
                        )}
                      </div>
                    )
                    return (
                      <motion.div
                        key={item.team}
                        initial={{ opacity: 0, x: isLeft ? -14 : 14 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center"
                      >
                        {/* 왼쪽 절반 */}
                        <div className="flex-1 flex items-center justify-end gap-3 pr-4">
                          {isLeft && <>{info}{logo}</>}
                        </div>

                        {/* 중앙 점 */}
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0 z-10"
                          style={{ background: item.color, boxShadow: `0 0 8px ${item.color}90` }}
                        />

                        {/* 오른쪽 절반 */}
                        <div className="flex-1 flex items-center justify-start gap-3 pl-4">
                          {!isLeft && <>{logo}{info}</>}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* HUD footer */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] text-[#0066ff]/50 uppercase font-mono">
                  9Y+ Pro Coaching Career
                </span>
              </div>
            </motion.div>
          ) : (
            /* ── State B: 기존 텍스트 ── */
            <motion.div
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col justify-center gap-5 pr-4 sm:pr-10"
            >
              <div>
                <SectionLabel text="About Dox" />
                <h2 className="typo-section-title text-white leading-tight mb-3">
                  막혔던 티어,<br />
                  <span className="text-[#0066ff]">답답했던 플레이</span>
                </h2>
                <p className="typo-subtitle text-white/70 mb-2">
                  오버워치 전문 코치가 1:1 플레이 분석으로 돌파구를 찾아드립니다
                </p>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0066ff]/10 border border-[#0066ff]/25"
                  style={{ clipPath: 'polygon(5px 0%,100% 0%,100% calc(100% - 5px),calc(100% - 5px) 100%,0% 100%,0% 5px)' }}
                >
                  <span className="text-sm font-bold tracking-widest text-[#0066ff] uppercase">
                    DOX.POINT — 현실 가능한 성장 로드맵 설계
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-base leading-relaxed sm:leading-7 text-white/55 border-l-2 border-[#0066ff]/40 pl-4">
                플로리다 메이헴, 토론토 디파이언트, 젠지 아카데미, 그리고 OWCS 프로팀까지.<br />
                브론즈부터 챔피언, 프로 선수에 이르기까지 수많은 티어의 수강생들을 지도해 왔습니다.
                <br /><br />
                사람마다 보유한 게임 지식과 피지컬이 모두 다릅니다. 따라서 장기적인 실력 향상을 위해 연습해야 할 부분과, 단기적인 티어 상승을 위해 즉각적으로 교정해야 할 부분 역시 달라야 합니다. 수강생 개인의 성향과 목표에 맞춘 가장 확실한 맞춤형 솔루션을 제시해 드립니다.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '9년+ 코칭 경력', label: '검증된 노하우' },
                  { value: '프로팀 6곳', label: '커리어 진행' },
                  { value: '입문부터 프로까지', label: '전 티어 완벽 지도' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-3 bg-[#0f1118] border border-white/[0.07] text-center"
                    style={{
                      clipPath: 'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                  >
                    <p className="text-sm sm:text-lg font-black text-[#0066ff]">{s.value}</p>
                    <p className="text-[11px] sm:text-[14px] text-white/40 tracking-widest mt-0.5 uppercase">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   2. 핵심 가치 카드
══════════════════════════════════════════ */
const VALUES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: '상황별 최적의 플레이 선택지',
    desc: '매 순간 최선의 판단을 내릴 수 있도록 게임 상황 읽는 법을 체계적으로 훈련합니다.',
    color: '#0066ff',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: '현재 티어 & 라이프스타일에 맞는 현실적 성장 설계',
    desc: '바쁜 일상 속에서도 효율적으로 실력을 끌어올릴 수 있는 맞춤형 로드맵을 제시합니다.',
    color: '#f5c842',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: '편안한 분위기의 1:1 코칭',
    desc: '강압적인 분위기 없이 대화하듯 진행하는 코칭으로 자연스럽게 실력이 향상됩니다.',
    color: '#0066ff',
  },
]

function ValueCards() {
  return (
    <div>
      <FadeUp>
        <SectionLabel text="Core Values" />
        <h3 className="typo-section-title text-white mb-8">
          DOX.POINT의 코칭 철학
        </h3>
      </FadeUp>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {VALUES.map((v, i) => (
          <FadeUp key={v.title} delay={i * 0.1} className="h-full">
            <div
              className="group h-full p-4 bg-[#0f1118] border border-white/[0.07] hover:border-[#0066ff]/30 transition-all duration-300 hover:bg-[#111420] hover:scale-[1.02] hover:-translate-y-0.5"
              style={{
                clipPath: 'polygon(12px 0%,100% 0%,100% calc(100% - 12px),calc(100% - 12px) 100%,0% 100%,0% 12px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{
                    background: `${v.color}15`,
                    border: `1px solid ${v.color}35`,
                    color: v.color,
                    clipPath: 'polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)',
                  }}
                >
                  {v.icon}
                </div>
                <h4 className="text-base font-bold text-white leading-snug">{v.title}</h4>
              </div>
              <p className="typo-body-sm text-white/45">{v.desc}</p>
              <div
                className="mt-3 h-px"
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${v.color}40, transparent)` }}
              />
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   4. 공감 배너
══════════════════════════════════════════ */
function EmpathyBanner() {
  return (
    <div
      className="px-2 py-6 sm:px-6"
      style={{
        position: 'relative',
        margin: '24px 0',
        background: 'rgba(0,102,255,0.03)'
      }}
    >
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
        background: 'linear-gradient(to bottom, transparent, #0066ff 30%, #0066ff 70%, transparent)',
      }} />
      <Image
        src="/etc/3인배너 수정.webp"
        alt="배너"
        width={1920}
        height={800}
        quality={80}
        loading="lazy"
        sizes="100vw"
        style={{width:'100%', height:'auto', display:'block', objectFit:'contain', background:'transparent'}}
      />
      <div style={{borderTop:'1px solid rgba(0,102,255,0.2)', paddingTop:'16px', textAlign:'center'}}>
        <p className="text-lg sm:text-[36px]" style={{color:'rgba(255,255,255,0.8)', lineHeight:'1.4'}}>
          적보다 아군 때문에<br className="sm:hidden" />{' '}
          열받은 적 있으시죠?<br />{' '}
          <strong style={{color:'#ffffff'}}>게임 시야 확장</strong>으로{' '}
          <strong style={{color:'#0066ff'}}>솔로 캐리 + 팀 승리</strong>
          <br className="sm:hidden" />{' '}
          <strong style={{color:'#ffffff'}}>모두</strong> 가능하게 해드립니다.
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   메인 export
══════════════════════════════════════════ */
export default function AboutDox() {
  return (
    <section id="about" className="relative pt-[3.25rem] pb-24 md:pt-[4.875rem] md:pb-32 bg-bg overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0066ff] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CoachIntro />
      </div>
    </section>
  )
}

export function CoachingPhilosophy() {
  return (
    <section className="relative pt-24 md:pt-32 pb-24 md:pb-32 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:gap-4">
          <ValueCards />
          <EmpathyBanner />
        </div>
      </div>
    </section>
  )
}
