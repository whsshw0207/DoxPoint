'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

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

/* ── SVG Radar 상수 ── */
const CX = 250
const CY = 250
const R = 180
const LABEL_R = 208
const N = 6
const GRID_LEVELS = [0.2, 0.5, 0.8]

// TODO: SKILL-VALUES 스킬 수치 수정 (초기값)
const INIT_VALUES = [85, 95, 90, 80, 88, 85]

const SKILL_LABELS = ['에임', '포지셔닝', '맵 이해도', '영웅 숙련도', '궁극기 활용', '조합 맞춤 전략']
const ANCHORS: Array<'start' | 'middle' | 'end'> = ['middle', 'start', 'start', 'middle', 'end', 'end']

const SKILL_DESCS = [
  { skill: '에임',         desc: '정확한 조준과 반응 속도 향상' },
  { skill: '포지셔닝',     desc: '상황별 최적 위치 선정' },
  { skill: '맵 이해도',   desc: '맵별 핵심 지점과 동선 파악' },
  { skill: '영웅 숙련도', desc: '영웅별 스킬 활용 극대화' },
  { skill: '궁극기 활용', desc: '타이밍과 연계 전략' },
  { skill: '조합 맞춤 전략', desc: '팀 조합에 맞는 플레이 설계' },
]

function getAngle(i: number) {
  return (-90 + i * 60) * (Math.PI / 180)
}

function getPoint(i: number, r: number): [number, number] {
  return [CX + r * Math.cos(getAngle(i)), CY + r * Math.sin(getAngle(i))]
}

function buildPath(radii: number[]): string {
  return (
    radii
      .map((r, i) => {
        const [x, y] = getPoint(i, r)
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
      })
      .join(' ') + 'Z'
  )
}

function randomVals(): number[] {
  return Array.from({ length: N }, () => 55 + Math.random() * 40)
}

function SvgRadar() {
  const [values, setValues] = useState<number[]>(INIT_VALUES)

  useEffect(() => {
    const id = setInterval(() => setValues(randomVals()), 1500)
    return () => clearInterval(id)
  }, [])

  const dataRadii = values.map(v => R * v / 100)
  const dPath = buildPath(dataRadii)

  return (
    <svg
      viewBox="0 0 500 500"
      width="100%"
      height="100%"
      style={{ overflow: 'visible' }}
    >
      {/* 그리드 육각형 3단계 */}
      {GRID_LEVELS.map(g => (
        <path
          key={g}
          d={buildPath(Array(N).fill(R * g))}
          fill="none"
          stroke="rgba(0,102,255,0.25)"
          strokeWidth={1}
        />
      ))}

      {/* 중심 → 꼭짓점 축 선 6개 */}
      {Array.from({ length: N }, (_, i) => {
        const [x, y] = getPoint(i, R)
        return (
          <line
            key={i}
            x1={CX} y1={CY}
            x2={x.toFixed(2)} y2={y.toFixed(2)}
            stroke="rgba(0,102,255,0.2)"
            strokeWidth={1}
          />
        )
      })}

      {/* 데이터 다각형 */}
      <path
        d={dPath}
        fill="rgba(0,102,255,0.12)"
        stroke="#0066ff"
        strokeWidth={2.5}
        strokeLinejoin="round"
        style={{ transition: 'd 0.8s cubic-bezier(0.16,1,0.3,1)' }}
      />

      {/* 꼭짓점 점 */}
      {dataRadii.map((r, i) => {
        const [x, y] = getPoint(i, r)
        return (
          <circle
            key={i}
            cx={x.toFixed(2)}
            cy={y.toFixed(2)}
            r={4}
            fill="#0066ff"
            style={{
              transition: 'cx 0.8s cubic-bezier(0.16,1,0.3,1), cy 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        )
      })}

      {/* 라벨 */}
      {SKILL_LABELS.map((label, i) => {
        const [x, y] = getPoint(i, LABEL_R)
        return (
          <text
            key={i}
            x={x.toFixed(2)}
            y={y.toFixed(2)}
            textAnchor={ANCHORS[i]}
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.85)"
            fontSize={13}
            fontWeight={700}
          >
            {label}
          </text>
        )
      })}
    </svg>
  )
}

function SkillMap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <FadeUp>
      <div ref={ref}>

        {/* 차트 + 리스트 */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* 좌 — SVG 레이더 차트 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] shrink-0"
            style={{ overflow: 'visible' }}
          >
            <SvgRadar />
          </motion.div>

          {/* 우 — 스킬 설명 리스트 */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SKILL_DESCS.map((s, i) => (
              <motion.div
                key={s.skill}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 p-4 bg-[#0d0f18] border border-white/[0.07] hover:border-[#0066ff]/30 transition-all duration-300"
                style={{
                  clipPath:
                    'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: '#0066ff', boxShadow: '0 0 6px rgba(0,102,255,0.7)' }}
                />
                <div>
                  <p className="text-sm font-black text-white mb-0.5">{s.skill}</p>
                  <p className="typo-body-sm text-white/45">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </FadeUp>
  )
}

const PREMIUM_PRODUCTS = [
  {
    id: 'pro',
    badge: 'PRO',
    name: '프로 지망',
    price: '390,000원~',
    desc: '프로게이머를 목표로 하는 집중 코칭',
    color: '#38bdf8',
    image: '/class/프로.png',
  },
  {
    id: 'guarantee',
    badge: 'GUARANTEE',
    name: '티어 보장',
    price: '상담 후 결정',
    desc: '목표 티어 달성까지 무제한 수업',
    color: '#a78bfa',
    image: '/class/티어.png',
  },
  {
    id: 'monthly',
    badge: 'POPULAR',
    name: '한달 특강',
    price: '175,000원',
    desc: '한 달 집중 케어 코칭',
    color: '#86efac',
    image: '/class/한달.png',
  },
]

const BASIC_PRODUCTS = [
  { id: '1hour', name: '1시간 특강', price: '25,000원', desc: '빠른 원포인트 레슨', image: '/class/1시간.png' },
  { id: '2hour', name: '2시간 특강', price: '45,000원', desc: '심화 분석 코칭', image: '/class/2시간.png' },
  { id: 'short', name: '단기 특강', price: '120,000원', desc: '집중 단기 케어', image: '/class/단기특강_큰용량.jpg' },
  { id: 'group', name: '1:N 그룹 수업', price: '25,000원~', originalPrice: '35,000원~', eventBadge: '5월 이벤트 할인', desc: '소규모 그룹 코칭', image: '/class/그룹특강.png' },
]

function PremiumCard({
  product,
  index,
}: {
  product: (typeof PREMIUM_PRODUCTS)[number]
  index: number
}) {
  const router = useRouter()
  return (
    <FadeUp delay={index * 0.1} className="h-full">
      <div
        onClick={() => router.push(`/coaching/${product.id}`)}
        className="group relative h-full md:cursor-pointer overflow-hidden bg-[#0a0c12] transition-all duration-300 flex flex-col hover:scale-[1.02] hover:-translate-y-1 pointer-events-none md:pointer-events-auto"
        style={{
          clipPath:
            'polygon(14px 0%,100% 0%,100% calc(100% - 14px),calc(100% - 14px) 100%,0% 100%,0% 14px)',
          border: `1px solid ${product.color}40`,
          boxShadow: `0 0 40px ${product.color}18, inset 0 1px 0 rgba(255,255,255,0.08)`,
          transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* 그리드 배경 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${product.color}0d 1px,transparent 1px),linear-gradient(90deg,${product.color}0d 1px,transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
        {/* 좌측 컬러 라인 */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{
            background: `linear-gradient(to bottom, ${product.color}cc, ${product.color}44)`,
          }}
        />
        {/* 호버 글로우 */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${product.color}12 0%, transparent 60%)`,
          }}
        />
        {/* 상단 라인 */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${product.color}60, transparent)`,
          }}
        />

        {/* 프리미엄 상품 썸네일 */}
        <div className="relative shrink-0">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </div>

        <div className="relative p-[22px] flex flex-col gap-4 flex-1">
          {/* 뱃지 */}
          <div>
            <span
              className="text-[10px] font-black tracking-[0.3em] px-2.5 py-1.5"
              style={{
                color: product.color,
                background: `${product.color}18`,
                border: `1px solid ${product.color}45`,
                clipPath:
                  'polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)',
              }}
            >
              {product.badge}
            </span>
          </div>

          {/* 이름 + 설명 */}
          <div>
            <h3
              className="typo-card-title text-white mb-1.5 leading-snug"
            >
              {product.name}
            </h3>
            <p className="typo-body-sm text-white/50">{product.desc}</p>
          </div>

          {/* 가격 + 링크 */}
          <div className="mt-auto pt-4 border-t border-white/[0.07] flex items-center justify-between gap-3">
            <span className="text-xl font-black" style={{ color: product.color }}>
              {product.price}
            </span>
            <Link href={`/coaching/${product.id}`} className="typo-button text-white/35 group-hover:text-white/65 transition-colors flex items-center gap-2 pointer-events-auto">
              자세히 보기
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white/20 group-hover:translate-x-0.5 transition-all duration-300">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

function BasicCard({
  product,
  index,
}: {
  product: (typeof BASIC_PRODUCTS)[number]
  index: number
}) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const isGroup = product.id === 'group'

  const CLIP = 'polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)'

  if (isGroup) {
    return (
      <FadeUp delay={index * 0.08} className="h-full">
        {/* 그라디언트 wrapper — 2px padding이 곧 테두리 */}
        <div
          onClick={() => router.push(`/coaching/${product.id}`)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group relative md:cursor-pointer h-full pointer-events-none md:pointer-events-auto"
          style={{
            padding: '2px',
            background: hovered
              ? 'linear-gradient(135deg, #fde68a 0%, #f59e0b 35%, #fcd34d 65%, #d97706 100%)'
              : 'linear-gradient(135deg, #f59e0b 0%, #fcd34d 40%, #d97706 70%, #f59e0b 100%)',
            clipPath: CLIP,
            boxShadow: hovered
              ? '0 0 28px rgba(245,158,11,0.45), 0 8px 32px rgba(0,0,0,0.5)'
              : '0 0 16px rgba(245,158,11,0.3), 0 4px 24px rgba(0,0,0,0.4)',
            transform: hovered ? 'scale(1.02) translateY(-2px)' : 'scale(1) translateY(0)',
            transition: 'box-shadow 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div
            className="flex flex-col h-full overflow-hidden bg-[#0d0f18]"
            style={{ clipPath: CLIP }}
          >
            {/* 상단 썸네일 */}
            <div className="relative shrink-0">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>

            <div className="flex-1 flex flex-col gap-2 p-4 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-base font-bold text-white leading-snug">{product.name}</h4>
                <Link href={`/coaching/${product.id}`} className="pointer-events-auto shrink-0 mt-0.5 p-1 -m-1">
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-[#0066ff]/60 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <p className="typo-body-sm text-white/40">{product.desc}</p>
              <div className="mt-auto pt-2 border-t border-white/[0.06]">
                {product.eventBadge && (
                  <span
                    className="inline-block text-[9px] tracking-[0.2em] px-2 py-1 mb-1.5"
                    style={{
                      color: '#000',
                      background: '#f59e0b',
                      fontWeight: 700,
                      boxShadow: '0 0 8px rgba(245,158,11,0.5)',
                      clipPath: 'polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)',
                    }}
                  >
                    {product.eventBadge}
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  {product.originalPrice && (
                    <span className="text-sm font-bold text-white/30 line-through">{product.originalPrice}</span>
                  )}
                  <span className="text-lg font-black text-[#f5c842]">{product.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    )
  }

  return (
    <FadeUp delay={index * 0.08} className="h-full">
      <div
        onClick={() => router.push(`/coaching/${product.id}`)}
        className="group relative md:cursor-pointer bg-[#0d0f18] border border-white/[0.07] hover:border-[#0066ff]/30 hover:bg-[#0f1120] transition-all duration-300 flex flex-col h-full overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5 pointer-events-none md:pointer-events-auto"
        style={{
          clipPath: CLIP,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* 상단 썸네일 */}
        <div className="relative shrink-0">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </div>

        <div className="flex-1 flex flex-col gap-2 p-4 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-base font-bold text-white leading-snug">{product.name}</h4>
            <Link href={`/coaching/${product.id}`} className="pointer-events-auto shrink-0 mt-0.5 p-1 -m-1">
              <svg
                className="w-4 h-4 text-white/20 group-hover:text-[#0066ff]/60 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <p className="typo-body-sm text-white/40">{product.desc}</p>
          <div className="mt-auto pt-2 border-t border-white/[0.06]">
            {product.eventBadge && (
              <span
                className="inline-block text-[9px] tracking-[0.2em] px-2 py-1 mb-1.5"
                style={{
                  color: '#f97316',
                  background: '#f9731618',
                  border: '1px solid #f9731640',
                  fontWeight: 900,
                  clipPath: 'polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)',
                }}
              >
                {product.eventBadge}
              </span>
            )}
            <div className="flex items-baseline gap-2">
              {product.originalPrice && (
                <span className="text-sm font-bold text-white/30 line-through">{product.originalPrice}</span>
              )}
              <span className="text-lg font-black text-[#f5c842]">{product.price}</span>
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

function CTABanner() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden"
      style={{ clipPath: 'polygon(16px 0%,100% 0%,100% calc(100% - 16px),calc(100% - 16px) 100%,0% 100%,0% 16px)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0066ff]/12 via-[#0a0c12] to-[#0a0c12]" />
      <div className="absolute inset-0 border border-[#0066ff]/20" style={{ clipPath: 'inherit' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066ff] to-transparent" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-[#0066ff] opacity-[0.05] blur-[80px] rounded-full pointer-events-none" />

      <div className="relative px-6 sm:px-10 md:px-14 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <p className="typo-card-title text-white mb-2 leading-snug">
            오늘도 경쟁큐 돌리다가 멘탈만 터지셨나요?
          </p>
          <p className="typo-body-sm text-white/55 max-w-lg">
            현재 티어와 고민만 말씀해주셔도{' '}
            <span className="text-white/80 font-semibold">지금 바로 고쳐야 할 포인트</span>를 짚어드립니다.
          </p>
        </div>

        <a
          href="/contact"
          className="typo-button shrink-0 group inline-flex items-center gap-3 px-7 py-4 bg-[#0066ff] text-white hover:bg-[#0052cc] active:scale-[0.98] transition-all duration-300"
          style={{
            clipPath: 'polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)',
            boxShadow: '0 0 28px rgba(0,102,255,0.35)',
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.113 18.1.127 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
          코칭 신청 & Contact
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>
    </motion.div>
  )
}

export default function Coaching() {
  return (
    <section id="coaching" className="relative py-24 md:py-32 bg-bg overflow-hidden">
      {/* 배경 글로우 */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0066ff] opacity-[0.03] blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 섹션 헤더 */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#0066ff]" />
            <span className="typo-eyebrow text-[#0066ff]">COACHING</span>
          </div>
          <h2 className="typo-section-title text-white mb-2">DOX.POINT 코칭</h2>
          <p className="typo-subtitle text-white/55">DOX.POINT 코칭으로 향상되는 6가지 핵심 스킬</p>
        </FadeUp>

        {/* 스킬 맵 */}
        <SkillMap />

        {/* 상품 목록 */}
        <div className="flex flex-col gap-5">
          {/* 상품 서브 타이틀 */}
          <FadeUp>
            <p id="classes" className="typo-subtitle text-white/55" style={{ marginBottom: '10px', scrollMarginTop: '100px' }}>classes</p>
          </FadeUp>

          {/* 프리미엄 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {PREMIUM_PRODUCTS.map((p, i) => (
              <PremiumCard key={p.id} product={p} index={i} />
            ))}
          </div>

          {/* 기본 카드 */}
          <div style={{ marginTop: '45px' }}>
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-5 h-px bg-white/20" />
                <span className="typo-eyebrow text-white/35">
                  가볍게 시작하고 싶다면
                </span>
              </div>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {BASIC_PRODUCTS.map((p, i) => (
                <BasicCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>

        <CTABanner />
      </div>
    </section>
  )
}
