'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: '코칭은 어떤 방식으로 진행되나요?',
    a: '디스코드 화면공유를 통해 진행됩니다. 수강생의 실제 게임 화면을 보며 실시간으로 피드백을 드리거나, 녹화된 리플레이를 함께 분석합니다.',
  },
  {
    q: '어떤 티어부터 수강이 가능한가요?',
    a: '브론즈부터 챔피언까지 모든 티어 수강 가능합니다. 티어와 관계없이 본인의 플레이 습관과 목표에 맞춰 맞춤 코칭을 진행합니다.',
  },
  {
    q: '환불 정책은 어떻게 되나요?',
    a: '수업 시작 24시간 전까지 전액 환불 가능하며, 이후 취소 및 노쇼는 환불이 불가합니다. 자세한 내용은 각 상품 상세 페이지를 확인해주세요.',
  },
  {
    q: '수업 일정은 어떻게 잡나요?',
    a: '코칭 신청 & Contact 버튼을 통해 디스코드로 문의주시면 가능한 일정을 조율해드립니다.',
  },
  {
    q: '노쇼 규정이 있나요?',
    a: '노쇼 시 해당 회차는 소진된 것으로 처리되며 환불이 불가합니다. 일정 변경은 수업 시작 24시간 전까지 1회 가능합니다.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" className="relative pt-40 md:pt-52 bg-bg" style={{ paddingBottom: '232px', scrollMarginTop: '-10px' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-[#0066ff]" />
          <span className="typo-eyebrow text-[#0066ff]">FAQ</span>
        </div>
        <h2 className="typo-section-title text-white mb-12">자주 묻는 질문</h2>

        <div className="space-y-2 max-w-[800px] mx-auto">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={i}
                className="border transition-colors duration-200"
                style={{
                  clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)',
                  borderColor: isOpen ? 'rgba(0,102,255,0.35)' : 'rgba(255,255,255,0.08)',
                  background: isOpen ? 'rgba(0,102,255,0.04)' : 'rgba(255,255,255,0.02)',
                  boxShadow: isOpen ? 'inset 0 1px 0 rgba(0,102,255,0.18)' : 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                  position: 'relative',
                }}
              >
                {/* 열린 항목 좌측 세로선 */}
                {isOpen && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{ background: 'linear-gradient(to bottom, #0066ff, #0066ff88)' }}
                  />
                )}

                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 group"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  <span
                    className="font-semibold leading-snug transition-colors duration-200"
                    style={{
                      fontSize: '15px',
                      color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.75)',
                    }}
                  >
                    {item.q}
                  </span>
                  <svg
                    className="shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: isOpen ? '#0066ff' : 'rgba(255,255,255,0.3)' }}
                    width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4">
                    <p className="typo-body-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
