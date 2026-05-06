'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { coachingProducts } from '@/lib/coachingData'

// 페이지 라우트 id → coachingData 키 매핑
const ID_MAP: Record<string, keyof typeof coachingProducts> = {
  pro:       'pro',
  guarantee: 'guarantee',
  monthly:   'month',
  short:     'short',
  '2hour':   '120',
  '1hour':   '60',
  group:     'group',
}

const COLUMNS = [
  { routeId: 'pro' },
  { routeId: 'guarantee' },
  { routeId: 'monthly' },
  { routeId: 'short' },
  { routeId: '2hour' },
  { routeId: '1hour' },
  { routeId: 'group' },
] as const

const ROWS = [
  { key: 'duration', label: '기간' },
  { key: 'replay',   label: '리플레이 분석' },
  { key: 'qna',      label: '디스코드 Q&A' },
  { key: 'report',   label: '리포트' },
  { key: 'price',    label: '가격' },
] as const

function getCell(routeId: string, key: string): string {
  const dataKey = ID_MAP[routeId]
  if (!dataKey) return '—'
  const product = coachingProducts[dataKey]
  if (key === 'price') return product.price
  return product.spec[key as keyof typeof product.spec] ?? '—'
}

function getName(routeId: string): string {
  const dataKey = ID_MAP[routeId]
  if (!dataKey) return routeId
  return coachingProducts[dataKey].name
}

function CellValue({ value, isPrice }: { value: string; isPrice: boolean }) {
  if (value === 'O') {
    return (
      <svg
        className="w-[14px] h-[14px] text-[#0066ff]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )
  }
  if (value === '—') {
    return <span className="text-white/18 text-xs select-none">—</span>
  }
  if (isPrice) {
    return <span className="text-[11px] font-bold text-white">{value}</span>
  }
  return <span className="text-[11px] text-white/55 text-center leading-snug">{value}</span>
}

export default function CoachingCompareTable({ currentProduct }: { currentProduct: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-3 mb-3">
        <span className="w-6 h-px bg-[#0066ff]" />
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#0066ff] uppercase">Compare</span>
      </div>
      <h3
        className="text-xl sm:text-2xl font-black text-white mb-7"
        style={{ letterSpacing: '-0.02em' }}
      >
        어떤 코스가 내 상황에 맞을까?
      </h3>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <div>
          {/* 헤더 행 */}
          <div className="flex">
            <div className="w-[80px] shrink-0" />
            {COLUMNS.map(({ routeId }) => {
              const isCurrent = routeId === currentProduct
              return (
                <div
                  key={routeId}
                  className="flex-1 min-w-[84px] px-1 py-3 text-center"
                  style={
                    isCurrent
                      ? {
                          background: 'rgba(0,102,255,0.07)',
                          borderLeft: '1px solid rgba(0,102,255,0.38)',
                          borderRight: '1px solid rgba(0,102,255,0.38)',
                          borderTop: '1px solid rgba(0,102,255,0.38)',
                        }
                      : { borderBottom: '1px solid rgba(255,255,255,0.05)' }
                  }
                >
                  {isCurrent && (
                    <div className="flex justify-center mb-2">
                      <span
                        className="text-[8px] font-black tracking-[0.15em] px-2 py-[3px] text-white bg-[#0066ff]"
                        style={{
                          clipPath:
                            'polygon(3px 0%,100% 0%,100% calc(100% - 3px),calc(100% - 3px) 100%,0% 100%,0% 3px)',
                        }}
                      >
                        ★ 현재 상품
                      </span>
                    </div>
                  )}
                  <p
                    className="text-[11px] font-bold"
                    style={{ color: isCurrent ? '#0066ff' : 'rgba(255,255,255,0.32)' }}
                  >
                    {getName(routeId)}
                  </p>
                </div>
              )
            })}
          </div>

          {/* 데이터 행 */}
          {ROWS.map((row, rowIndex) => {
            const isLast = rowIndex === ROWS.length - 1
            return (
              <div
                key={row.key}
                className="flex"
                style={!isLast ? { borderBottom: '1px solid rgba(255,255,255,0.04)' } : {}}
              >
                {/* 행 레이블 */}
                <div className="w-[80px] shrink-0 px-2 py-3.5 flex items-center">
                  <span
                    className="text-[11px] font-semibold"
                    style={{
                      color:
                        row.key === 'price'
                          ? 'rgba(255,255,255,0.65)'
                          : 'rgba(255,255,255,0.38)',
                    }}
                  >
                    {row.label}
                  </span>
                </div>

                {/* 데이터 셀 */}
                {COLUMNS.map(({ routeId }) => {
                  const isCurrent = routeId === currentProduct
                  const value = getCell(routeId, row.key)
                  return (
                    <div
                      key={routeId}
                      className="flex-1 min-w-[84px] px-1 py-3.5 flex items-center justify-center"
                      style={
                        isCurrent
                          ? {
                              background: 'rgba(0,102,255,0.04)',
                              borderLeft: '1px solid rgba(0,102,255,0.22)',
                              borderRight: '1px solid rgba(0,102,255,0.22)',
                              ...(isLast
                                ? { borderBottom: '1px solid rgba(0,102,255,0.38)' }
                                : {}),
                            }
                          : {}
                      }
                    >
                      <CellValue value={value} isPrice={row.key === 'price'} />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* 모바일 스크롤 힌트 */}
      <p className="mt-3 text-center text-[10px] text-white/20 sm:hidden tracking-widest">
        ← 좌우로 스크롤하세요 →
      </p>
    </motion.div>
  )
}
