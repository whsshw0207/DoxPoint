'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import CoachingCompareTable from '@/components/CoachingCompareTable'
import { coachingProducts } from '@/lib/coachingData'

/* ── 공통 fade-up ── */
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

interface RoadmapItem {
  label: string
  desc: string
}

interface Product {
  id: string
  badge: string | null
  name: string
  price: string
  copy: string
  desc: string
  color: string
  whatYouGet: string[]
  roadmap: RoadmapItem[] | null
}

/* ══════════════════════════════════════════
   상품 데이터
══════════════════════════════════════════ */

const oneHour: Product = {
  id: '1hour',
  badge: null,
  name: '1시간 · 원포인트 퀵 피드백',
  price: '25,000 KRW',
  copy: '가장 빠르고 확실한 자가 진단, 티어 상승의 실마리를 찾다',
  desc: '핵심 문제점만 정확히 파악하고 싶은 분을 위한 코스. 전문 코치의 시각으로 플레이의 핵심 문제를 날카롭게 진단합니다.',
  color: '#f5c842',
  whatYouGet: [
    '인지하지 못했던 나쁜 습관과 실수 즉시 파악',
    '방향 없는 반복 게임에서 탈출',
    '가장 시급한 개선 우선순위 설정',
  ],
  roadmap: [
    { label: '01', desc: "실력 진단 — 질문 및 리플레이를 통한 현재 상태 파악" },
    { label: '02', desc: '핵심 이론 — 티어에 맞는 영웅 역할군 및 FPS 기본기' },
    { label: '03', desc: '밀착 피드백 — 변수 창출 및 포지셔닝 교정' },
    { label: '04', desc: '실전 적용 — 피드백 내용 인게임 즉시 실행' },
  ],
}

const twoHour: Product = {
  id: '2hour',
  badge: null,
  name: '2시간 · 딥다이브 실전 집중 코칭',
  price: '45,000 KRW',
  copy: '이론을 넘어 실전 감각까지, 코치와 함께하는 120분의 변화',
  desc: '배운 내용을 실전에서 직접 적용하고 즉각적인 피드백을 받는 심화 코스. 단순한 피드백을 넘어 이기는 방법을 체득합니다.',
  color: '#f5c842',
  whatYouGet: [
    '실시간 피드백을 통한 즉각적인 인게임 플레이 개선',
    '상황별 대처 능력과 전략적 사고방식 확립',
    '단순 피드백을 넘어선 실전 감각 체득',
  ],
  roadmap: [
    { label: '01', desc: '실력 진단 — 질문 및 리플레이를 통한 현재 상태 파악' },
    { label: '02', desc: '심화 이론 — 조합별 상성과 맵 이해도' },
    { label: '03', desc: '맞춤 피드백 — 에임, 무빙, 습관 개인별 교정' },
    { label: '04', desc: '실전 적용 — 피드백 내용 인게임 즉시 실행' },
  ],
}

const short: Product = {
  id: 'short',
  badge: null,
  name: '단기 속성 · 2주 집중 성장 패키지',
  price: '120,000 KRW',
  copy: '점검과 교정의 반복, 단기 속성으로 티어를 뒤집다',
  desc: '수업 후 혼자 연습하고 다시 점검받는 체계적인 시스템. 1회성 강의보다 높은 지식 습득률과 유지력을 보장합니다.',
  color: '#f5c842',
  whatYouGet: [
    '중간 점검을 통한 잘못된 연습 방향 방지',
    '연습 과정의 궁금증 즉시 해결',
    '1회성 강의 대비 높은 지식 습득률과 유지력',
  ],
  roadmap: [
    { label: '01', desc: '실력 진단 — 질문 및 리플레이를 통한 현재 상태 파악' },
    { label: '02', desc: '중간 피드백 — 리플레이 분석을 통한 연습 진행도 체크 (녹화본 제공)' },
    { label: '03', desc: '맞춤 피드백 — 추가 문제점 보완 및 상위 단계 전략 전수' },
    { label: '04', desc: '상시 케어 — 수업 기간 중 언제든 메시지로 질문 가능' },
  ],
}

const monthly: Product = {
  id: 'monthly',
  badge: 'POPULAR',
  name: '한달 집중 · 올인원 프로 매니지먼트',
  price: '175,000 KRW',
  copy: '티어 수직 상승, 리그급 코칭으로 다시 태어나는 한 달',
  desc: '한 달간 전담 코치의 밀착 관리를 받는 프리미엄 코스. 실력은 물론 게임을 보는 시각 자체가 달라집니다.',
  color: '#86efac',
  whatYouGet: [
    '브론즈→다이아, 마스터→그마 실제 성공 사례 다수',
    '오버워치에 대한 깊은 통찰력 확보',
    '전문 코치 상시 관리로 슬럼프 없는 꾸준한 성장',
  ],
  roadmap: [
    { label: '01', desc: '주 1회 2시간 실시간 코칭 — 매주 새로운 목표 설정 및 심화 강의' },
    { label: '02', desc: '24시간 Q&A — 수업 외 시간에도 언제든 질문 가능' },
    { label: '03', desc: '맞춤형 커리큘럼 — 에임, 조합, 맵별 플레이 개인 로드맵 제공' },
    { label: '04', desc: '유동적 스케줄 — 한 달 내 미완료 시 편의에 맞춰 여유있는 진행' },
  ],
}

const groupClass: Product = {
  id: 'group',
  badge: null,
  name: '그룹 특강 · 1:N 팀워크 & 전략 마스터 클래스',
  price: '기본(2인) 3.5만 / 인원 추가 당 +1만',
  copy: '혼자서는 못 깨는 한계, 팀게임의 진짜 재미를 알려드립니다',
  desc: '팀 플레이의 정수를 배우고 싶은 분을 위한 그룹 코스. 개인 피지컬을 넘어 팀 합을 맞추는 법을 익힙니다.',
  color: '#f5c842',
  whatYouGet: [
    '실전 커뮤니케이션 능력 향상',
    '조합 시너지 및 맵별 맞춤 전략 습득',
    '팀 단위 거시적 게임 흐름 파악',
  ],
  roadmap: [
    { label: '01', desc: '그룹 실력 진단 및 포지션 배분 — 개개인 성향 파악 후 최적 역할 부여' },
    { label: '02', desc: '팀 플레이 핵심 이론 — 조합별 승리 플랜, 궁극기 사이클 강의' },
    { label: '03', desc: '실전 훈련 — 이론 기반 실전 훈련 (실시간 오더 피드백)' },
    { label: '04', desc: 'Q&A 및 팀 과제 부여 — 다음 세션까지 팀 연습 목표 설정' },
  ],
}

const guarantee: Product = {
  id: 'guarantee',
  badge: 'GUARANTEE',
  name: '티어 보장 · 목표 달성 무제한 책임 코칭',
  price: '상담 후 결정',
  copy: '목표 티어까지, 횟수 제한 없이 끝까지 책임집니다',
  desc: '원하는 티어에 도달할 때까지 추가 비용 없이 무제한 코칭을 제공합니다. 단, 성실한 참여와 과제 수행이 필수입니다.',
  color: '#a78bfa',
  whatYouGet: [
    '목표 티어 달성 시까지 추가 비용 없이 무제한 피드백',
    '슬럼프와 멘탈까지 책임지는 1:1 전담 관리',
    '고착된 나쁜 습관 완전 교정',
  ],
  roadmap: [
    { label: '01', desc: '극딜 진단 및 목표 설정 — 현재 상태 냉정 평가 및 현실적 도달 기간 설정' },
    { label: '02', desc: '무제한 실시간 코칭 — 스케줄에 맞춰 문제점 반복 교정' },
    { label: '03', desc: '멘탈 & 폼 관리 — 연패 및 슬럼프 시 실시간 케어' },
    { label: '04', desc: '단계별 맞춤 과제 — 완벽 마스터 전까지 다음 단계 미진행 원칙' },
  ],
}

const pro: Product = {
  id: 'pro',
  badge: 'PRO',
  name: '프로 양성 · OWCS 데뷔 엘리트 코스',
  price: '390,000 KRW~',
  copy: '단순한 랭커가 아닌, 진짜 프로를 위한 리그급 하드 트레이닝',
  desc: 'Florida Mayhem, Toronto Defiant 출신 코치가 직접 전수하는 프로씬 1급 노하우. 트라이아웃 통과부터 1군 데뷔까지 도와드립니다.',
  color: '#38bdf8',
  whatYouGet: [
    '프로씬에서 요구하는 전술/전략 및 디테일 완벽 장착',
    '실제 프로팀 스크림 방식 및 트라이아웃 대비 모의 훈련',
    '코치진과 팀원에게 어필하는 인게임 커뮤니케이션 스킬',
  ],
  roadmap: [
    { label: '01', desc: '프로의 시선 장착 — 조합과 본인 역할의 이해, 맵 활용, 템포 조절, 변수 창출 심화 이론' },
    { label: '02', desc: '스크림 정밀 분석 — 스크림 환경 플레이 1프레임 단위 피드백' },
    { label: '03', desc: '트라이아웃 모의고사 — 실제 프로팀 테스트 환경 압박 훈련' },
    { label: '04', desc: '전문적인 1:1 멘토링 — 마인드셋, 자기 관리, 슬럼프 극복 노하우' },
  ],
}

const PRODUCTS: Product[] = [pro, guarantee, monthly, short, twoHour, oneHour, groupClass]

/* ══════════════════════════════════════════
   페이지
══════════════════════════════════════════ */
export default function CoachingDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id)

  if (!product) {
    return (
      <main className="relative min-h-[100dvh] bg-[#0a0c12] flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase mb-4">404</p>
          <h1 className="text-2xl font-black text-white mb-6">상품을 찾을 수 없습니다</h1>
          <Link
            href="/#classes"
            className="inline-flex items-center gap-2 text-xs text-[#0066ff] hover:text-[#4d94ff] transition-colors group"
          >
            <svg
              className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            코칭 상품 보기
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-[100dvh] bg-[#0a0c12] overflow-hidden">
      {/* 배경 그리드 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,102,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,102,255,0.06) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* 배경 글로우 */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.05] blur-[120px] rounded-full pointer-events-none"
        style={{ background: product.color }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-16">
        {/* 뒤로 가기 */}
        <Link
          href="/#classes"
          className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors group"
        >
          <svg
            className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          코칭 상품 보기
        </Link>

        {/* ── 상품 헤더 ── */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-[#0066ff]" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#0066ff] uppercase">
              Coaching
            </span>
          </div>
          <div className="flex items-start gap-4 flex-wrap mb-3">
            <h1
              className="text-3xl sm:text-4xl font-black text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              {product.name}
            </h1>
            {product.badge && (
              <span
                className="text-[10px] font-black tracking-[0.3em] px-2.5 py-1.5 mt-2"
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
            )}
          </div>
          <p className="text-base text-white/65 italic mb-2 leading-snug">"{product.copy}"</p>
          <p className="text-sm text-white/40 leading-relaxed mb-8">{product.desc}</p>

          {/* 가격 카드 + 스펙 타임라인 */}
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-8">

            {/* 좌: 가격 카드 */}
            <div
              className="px-6 py-5 shrink-0"
              style={{
                background: '#0f1118',
                border: `1px solid ${product.color}30`,
                clipPath:
                  'polygon(12px 0%,100% 0%,100% calc(100% - 12px),calc(100% - 12px) 100%,0% 100%,0% 12px)',
                boxShadow: `0 0 28px ${product.color}0e`,
              }}
            >
              <p className="text-[10px] text-white/35 tracking-widest uppercase mb-1.5">가격</p>
              <p className="text-3xl font-black" style={{ color: product.color }}>
                {product.price}
              </p>
            </div>

            {/* 우: 스펙 타임라인 + 버튼 */}
            <div className="flex flex-col gap-3 flex-1">
              {/* 스펙 타임라인 */}
              {(() => {
                const ID_MAP: Record<string, string> = { monthly: 'month', '1hour': '60', '2hour': '120' }
                const dataKey = ID_MAP[params.id] ?? params.id
                const specData = coachingProducts[dataKey as keyof typeof coachingProducts]
                if (!specData) return null

                const SPEC_LABELS: Record<string, string> = {
                  duration: '수업 시간',
                  replay: '리플레이',
                  qna: 'Q&A',
                  report: '리포트',
                }
                const items = (Object.entries(specData.spec) as [string, string][]).filter(
                  ([, v]) => v !== '—'
                )
                if (items.length === 0) return null

                return (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
                    {items.flatMap(([key, value], i) => {
                      const nodes = []
                      if (i > 0) {
                        nodes.push(
                          <span
                            key={`sep-${i}`}
                            className="hidden sm:inline-block mx-4"
                            style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14, userSelect: 'none' }}
                          >
                            →
                          </span>
                        )
                      }
                      nodes.push(
                        <div key={key} className="flex flex-col gap-1">
                          <span
                            style={{
                              fontSize: 11,
                              color: 'rgba(255,255,255,0.5)',
                              fontWeight: 600,
                              letterSpacing: '0.06em',
                            }}
                          >
                            {SPEC_LABELS[key] ?? key}
                          </span>
                          <span style={{ fontSize: 16, fontWeight: 700, color: '#ffffff' }}>
                            {value}
                          </span>
                        </div>
                      )
                      return nodes
                    })}
                  </div>
                )
              })()}

              {/* 버튼 — 우측 정렬 */}
              <div className="flex justify-start sm:justify-end">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#0066ff] text-white font-bold text-sm tracking-wide hover:bg-[#0052cc] active:scale-[0.98] transition-all duration-300"
                  style={{
                    clipPath:
                      'polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)',
                    boxShadow: '0 0 28px rgba(0,102,255,0.35)',
                  }}
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.113 18.1.127 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                  </svg>
                  코칭 신청 &amp; Contact
                </a>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── 기대 효과 ── */}
        <div>
          <FadeUp>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-px bg-[#0066ff]" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#0066ff] uppercase">
                Expected Outcome
              </span>
            </div>
            <h2
              className="text-xl sm:text-2xl font-black text-white mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              기대 효과
            </h2>
          </FadeUp>

          <div className="space-y-2.5">
            {product.whatYouGet.map((item, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div
                  className="flex items-start gap-4 px-5 py-4 bg-[#0f1118] border border-white/[0.07] hover:border-white/[0.13] transition-colors duration-300"
                  style={{
                    clipPath:
                      'polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)',
                  }}
                >
                  <span
                    className="text-[11px] font-black font-mono shrink-0 w-6 pt-[2px]"
                    style={{ color: `${product.color}65` }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed">{item}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── 커리큘럼 ── */}
        {product.roadmap && (
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-px bg-[#0066ff]" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#0066ff] uppercase">
                  Curriculum
                </span>
              </div>
              <h2
                className="text-xl sm:text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                커리큘럼
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {product.roadmap.map((step, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <div
                    className="relative overflow-hidden p-5 bg-[#0f1118] border border-white/[0.07] hover:border-white/[0.14] transition-colors duration-300 flex flex-col justify-start"
                    style={{
                      minHeight: 200,
                      clipPath:
                        'polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)',
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px]"
                      style={{
                        background: `linear-gradient(to bottom, ${product.color}90, ${product.color}28)`,
                      }}
                    />
                    {(() => {
                      const idx = step.desc.indexOf(' — ')
                      const title = idx !== -1 ? step.desc.slice(0, idx) : step.desc
                      const body = idx !== -1 ? step.desc.slice(idx + 3) : null
                      return (
                        <>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                            <span style={{ fontSize: 13, fontWeight: 900, color: '#f5c842', flexShrink: 0 }}>{step.label}</span>
                            <p style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', lineHeight: 1.3 }}>{title}</p>
                          </div>
                          {body && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 16, lineHeight: 1.5 }}>{body}</p>}
                        </>
                      )
                    })()}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        )}

        {/* ── 비교표 ── */}
        <CoachingCompareTable currentProduct={params.id} />

        {/* ── 환불 규정 ── */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#0066ff]" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#0066ff] uppercase">
              Refund Policy
            </span>
          </div>
          <h2
            className="text-xl sm:text-2xl font-black text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            환불 및 일정 변경 규정
          </h2>

          <div
            className="rounded-none overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              clipPath: 'polygon(12px 0%,100% 0%,100% calc(100% - 12px),calc(100% - 12px) 100%,0% 100%,0% 12px)',
            }}
          >
            {[
              {
                num: '01',
                title: '환불 기준 (단기 / 한달 / 티어보장 / 프로양성)',
                items: [
                  '강의 시작 24시간 전까지 — 전액 환불',
                  '강의 시작 24시간 이내 / 당일 취소 / 노쇼 — 환불 불가',
                ],
              },
              {
                num: '02',
                title: '부분 환불 (단기 / 한달 특강)',
                items: [
                  '수강 50% 미만 — 잔여 비율에 따라 부분 환불 가능',
                  '수강 50% 이상 — 환불 불가',
                ],
              },
              {
                num: '03',
                title: '그룹 수업',
                items: [
                  '중도 이탈 시 환불 불가',
                  '잔여 수업은 개인 코칭 또는 남은 인원으로 진행',
                ],
              },
              {
                num: '04',
                title: '일정 변경',
                items: [
                  '강의 시작 24시간 전까지 요청 시 1회 가능',
                  '당일 변경 요청은 노쇼로 간주, 해당 회차 소진 처리',
                ],
              },
              {
                num: '05',
                title: '지각 및 기술적 문제',
                items: ['수강생 귀책(기기/네트워크/지각) — 보충 없이 잔여 시간만 진행'],
              },
              {
                num: '06',
                title: '강사 귀책',
                items: ['강사 사정으로 취소 시 — 일정 재조정 또는 100% 환불'],
              },
            ].map((policy, i, arr) => (
              <div
                key={policy.num}
                className="flex items-start gap-4 px-5 py-4"
                style={{
                  borderBottom:
                    i < arr.length - 1
                      ? '1px solid rgba(255,255,255,0.05)'
                      : 'none',
                }}
              >
                <span
                  className="text-[11px] font-black font-mono shrink-0 w-6 pt-[3px]"
                  style={{ color: 'rgba(0,102,255,0.55)' }}
                >
                  {policy.num}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white/80 mb-1.5 leading-snug">
                    {policy.title}
                  </p>
                  <ul className="space-y-1">
                    {policy.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span
                          className="shrink-0 mt-[6px] w-1 h-1 rounded-full"
                          style={{ background: 'rgba(0,102,255,0.5)' }}
                        />
                        <span className="text-xs text-white/45 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* 문의 footer */}
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{ borderTop: '1px solid rgba(0,102,255,0.15)', background: 'rgba(0,102,255,0.04)' }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#0066ff', opacity: 0.7 }}>
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.113 18.1.127 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              <p className="text-[11px] text-white/35">
                환불 문의 —{' '}
                <span className="text-[#0066ff]/70 font-semibold">Discord dox94</span>
              </p>
            </div>
          </div>
        </FadeUp>

        {/* ── CTA ── */}
        <FadeUp>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#0066ff] text-white font-bold text-sm tracking-wide hover:bg-[#0052cc] active:scale-[0.98] transition-all duration-300"
            style={{
              clipPath:
                'polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)',
              boxShadow: '0 0 28px rgba(0,102,255,0.35)',
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.113 18.1.127 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            코칭 신청 &amp; Contact
          </a>
        </FadeUp>
      </div>
    </main>
  )
}
