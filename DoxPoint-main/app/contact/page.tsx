'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import GNB from '@/components/GNB'

const WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1500105093603917926/M_hRLW6O2wKvPGIlKz6M2hk-8D6X8ki7wyGIQ5KArwbIOKeruu_xdqgU3kcMmnMad_dj'

const LESSON_TYPES = ['1시간', '2시간', '단기', '한달', '그룹', '티어보장', '프로양성']

const CHANNELS = [
  {
    label: 'DISCORD',
    sub: '서버 참여 후 문의',
    href: 'https://discord.com/invite/aGbf5sVv24',
  },
  {
    label: 'KAKAO',
    sub: '카카오 오픈채팅',
    href: 'https://open.kakao.com/placeholder',
  },
]

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
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({
    tier: '',
    lessonType: '',
    message: '',
    discordId: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [copied, setCopied] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const tier = form.tier
    const selectedProduct = form.lessonType
    const message = form.message
    const discordId = form.discordId
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📋 **새 코칭 신청이 들어왔습니다!**\n\n**티어:** ${tier}\n**희망 수업:** ${selectedProduct}\n**문의 내용:** ${message}\n**디스코드 ID:** ${discordId}`
        })
      })
      if (!response.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const copyDiscordId = () => {
    navigator.clipboard.writeText('dox94')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <GNB />
      <main className="relative min-h-[100dvh] bg-[#0a0c12] overflow-hidden pt-16">
        {/* BG grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,102,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,102,255,0.06) 1px,transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* BG glows */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#0066ff] opacity-[0.04] blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0066ff] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

            {/* ── LEFT: CONTACT INFO ── */}
            <div>
              <FadeUp>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-[#0066ff]" />
                  <span className="text-xs font-bold tracking-widest text-[#0066ff] uppercase">
                   CONTACT
                  </span>
                </div>
                <h1
                  className="text-5xl sm:text-6xl font-black text-white mb-3"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  REACH OUT
                </h1>
                <p
                  className="text-sm text-white/45 leading-relaxed mb-6"
                  style={{ wordBreak: 'keep-all' }}
                >
                  코칭 문의 및 수강 신청은 아래 채널 또는 신청 폼을 이용해주세요.
                </p>
              </FadeUp>

              {/* Channel list */}
              <FadeUp delay={0.1}>
                <div>
                  {CHANNELS.map((ch) => (
                    <a
                      key={ch.label}
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-5 border-b border-white/[0.08] hover:border-[#0066ff]/40 transition-all duration-300"
                    >
                      <div>
                        <p className="text-[10px] font-black tracking-[0.25em] text-[#0066ff] mb-1 uppercase">
                          {ch.label}
                        </p>
                        <p className="text-base font-semibold text-white/60 group-hover:text-white transition-colors duration-300">
                          {ch.sub}
                        </p>
                      </div>
                      <span className="text-white/20 group-hover:text-[#0066ff] group-hover:translate-x-1 transition-all duration-300 text-xl">
                        →
                      </span>
                    </a>
                  ))}

                  {/* Discord ID — copy only */}
                  <div className="flex items-center justify-between py-5 border-b border-white/[0.08]">
                    <div>
                      <p className="text-[10px] font-black tracking-[0.25em] text-[#0066ff] mb-1 uppercase">
                        DISCORD ID
                      </p>
                      <p className="text-base font-semibold text-white/60 font-mono tracking-wider">
                        dox94
                      </p>
                    </div>
                    <button
                      onClick={copyDiscordId}
                      className="text-[10px] font-black tracking-widest uppercase transition-colors duration-200"
                      style={{ color: copied ? '#0066ff' : 'rgba(255,255,255,0.25)' }}
                    >
                      {copied ? 'COPIED ✓' : 'COPY'}
                    </button>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* ── RIGHT: FORM ── */}
            <FadeUp delay={0.15}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#0066ff]" />
                <span className="text-xs font-bold tracking-widest text-[#0066ff] uppercase">
                REQUEST FORM
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                SEND A MESSAGE
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 티어 */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/35 uppercase mb-1">
                    최고 티어 / 현재 티어
                  </label>
                  <input
                    type="text"
                    name="tier"
                    value={form.tier}
                    onChange={handleChange}
                    placeholder="예) 다이아 1 / 골드 2"
                    required
                    className="w-full bg-[#0d0f18] border border-white/[0.08] text-white text-sm px-4 py-2 placeholder-white/20 focus:outline-none focus:border-[#0066ff]/60 transition-colors duration-200"
                    style={{
                      clipPath:
                        'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)',
                    }}
                  />
                </div>

                {/* 희망 수업 유형 */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/35 uppercase mb-1">
                    희망 수업 유형
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LESSON_TYPES.map((type) => {
                      const selected = form.lessonType === type
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, lessonType: type }))}
                          className="px-3 py-2 text-xs font-bold tracking-wide transition-all duration-200"
                          style={{
                            clipPath:
                              'polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)',
                            background: selected ? 'rgba(0,102,255,0.14)' : '#0d0f18',
                            border: `1px solid ${selected ? 'rgba(0,102,255,0.65)' : 'rgba(255,255,255,0.08)'}`,
                            color: selected ? '#0066ff' : 'rgba(255,255,255,0.38)',
                          }}
                        >
                          {type}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 문의 내용 */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/35 uppercase mb-1">
                    문의 내용
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="피드백 받고 싶은 이유 & 궁금한 사항을 자유롭게 적어주세요"
                    required
                    rows={3}
                    className="w-full bg-[#0d0f18] border border-white/[0.08] text-white text-sm px-4 py-2 placeholder-white/20 focus:outline-none focus:border-[#0066ff]/60 transition-colors duration-200 resize-none"
                    style={{
                      clipPath:
                        'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)',
                    }}
                  />
                </div>

                {/* 디스코드 ID */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-white/35 uppercase mb-1">
                    디스코드 ID
                  </label>
                  <input
                    type="text"
                    name="discordId"
                    value={form.discordId}
                    onChange={handleChange}
                    placeholder="예) player#1234"
                    required
                    className="w-full bg-[#0d0f18] border border-white/[0.08] text-white text-sm px-4 py-2 placeholder-white/20 focus:outline-none focus:border-[#0066ff]/60 transition-colors duration-200"
                    style={{
                      clipPath:
                        'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)',
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-5 bg-[#0066ff] text-white font-black text-sm tracking-[0.15em] hover:bg-[#0052cc] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  style={{
                    clipPath:
                      'polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)',
                    boxShadow: '0 0 28px rgba(0,102,255,0.30)',
                  }}
                >
                  {status === 'loading' ? '전송 중...' : '신청하기 →'}
                </button>

                {/* Status messages */}
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#0066ff] text-center pt-1"
                  >
                    신청이 완료됐습니다! 24시간 내 디스코드로 연락드릴게요 😊
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-400/80 text-center pt-1"
                  >
                    잠시 오류가 발생했습니다. 디스코드 dox94로 직접 문의해주세요.
                  </motion.p>
                )}
              </form>
            </FadeUp>

          </div>
        </div>
      </main>
    </>
  )
}
