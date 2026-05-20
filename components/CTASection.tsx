'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [clicked, setClicked] = useState(false)

  return (
    <section id="cta" className="relative py-24 md:py-32 bg-[#0a0c12] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,102,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,102,255,0.06) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="hidden lg:block absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066ff] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#0066ff]" />
            <span className="typo-eyebrow text-[#0066ff]">PREVIEW</span>
          </div>
          <h2 className="typo-section-title text-white">코칭 스타일 미리 보기</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative w-full border border-[#0066ff]/30"
              style={{
                clipPath: 'polygon(14px 0%,100% 0%,100% calc(100% - 14px),calc(100% - 14px) 100%,0% 100%,0% 14px)',
                boxShadow: '0 0 40px rgba(0,102,255,0.12)',
              }}
            >
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                {clicked ? (
                  <iframe
                    src="https://www.youtube.com/embed/67kDttIDm8A?autoplay=1"
                    title="DOX 코칭 영상"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 w-full h-full cursor-pointer group"
                    onClick={() => setClicked(true)}
                  >
                    <Image
                      src="https://img.youtube.com/vi/67kDttIDm8A/maxresdefault.jpg"
                      alt="DOX 코칭 영상 썸네일"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                    {/* 재생 버튼 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center group-hover:bg-[#0066ff]/80 transition-colors duration-300">
                        <svg className="w-7 h-7 text-white translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#0066ff]/60 pointer-events-none z-10" />
              <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#0066ff]/60 pointer-events-none z-10" />
              <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#0066ff]/60 pointer-events-none z-10" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#0066ff]/60 pointer-events-none z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7"
          >
            <div>
              <p className="typo-subtitle text-white mb-3 leading-snug">실제 코칭 세션을 직접 확인해보세요.</p>
              <p className="typo-body-sm text-white/55">DOX 코치의 분석 방식과 피드백 스타일을 영상으로 미리 경험할 수 있습니다.</p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <a
                href="https://youtube.com/@dox9494"
                target="_blank"
                rel="noopener noreferrer"
                className="typo-button group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0066ff] text-white hover:bg-[#0052cc] active:scale-[0.98] transition-all duration-300"
                style={{ clipPath: 'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)', boxShadow: '0 0 24px rgba(0,102,255,0.30)' }}
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                채널 바로가기 →
              </a>

              <a
                href="/contact"
                className="typo-button group inline-flex items-center gap-2.5 px-6 py-3.5 border border-white/20 text-white/65 hover:border-white/45 hover:text-white active:scale-[0.98] transition-all duration-300"
                style={{ clipPath: 'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)' }}
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.113 18.1.127 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                코칭 신청 &amp; Contact
              </a>
            </div>

            <div className="flex items-center gap-2 opacity-40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-pulse shrink-0" />
              <span className="typo-meta-mono text-[#0066ff]">Live Coaching Available</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
