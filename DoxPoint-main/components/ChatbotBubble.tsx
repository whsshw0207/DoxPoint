'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { coachingProducts } from '@/lib/coachingData'

/* ──────────────────────────────────────────────
   Types
─────────────────────────────────────────────── */
type Role = 'bot' | 'user'

interface Message {
  id: number
  role: Role
  text: string
  showDiscord?: boolean
}

/* ──────────────────────────────────────────────
   FAQ rules — 키워드 → 답변
─────────────────────────────────────────────── */
const FAQ_RULES: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['가격', '얼마', '비용', '요금', '금액'],
    answer:
      '현재 수업 가격은 아래와 같아요 😊\n- 1시간 특강: 25,000원\n- 2시간 특강: 45,000원\n- 단기 특강: 120,000원\n- 한달 특강: 175,000원\n- 티어 보장: 상담 후 결정\n- 프로 양성: 390,000원~\n- 그룹 수업: 35,000원~\n자세한 내용은 COACHING 섹션에서 확인하세요!',
  },
  {
    keywords: ['신청', '예약', '등록', '구매', '결제'],
    answer:
      "수강 신청은 상단의 '코칭 신청 & Contact' 버튼을 누르거나\n/contact 페이지에서 신청폼을 작성해주세요! 😊",
  },
  {
    keywords: ['경력', '코치', 'dox', '누구', '강사', '프로필', '소개'],
    answer:
      'DOX 코치는 Florida Mayhem, Toronto Defiant 등\n오버워치 리그, OWCS 프로팀 코칭 9년+ 경력을 보유하고 있어요.\n브론즈부터 챔피언, 프로까지 지도 경험이 있습니다!',
  },
  {
    keywords: ['환불', '취소', '환급'],
    answer:
      '수업 시작 24시간 전까지 전액 환불 가능하며\n이후 취소 및 노쇼는 환불이 불가합니다.',
  },
  {
    keywords: ['시간', '언제', '스케줄', '일정'],
    answer:
      "수업 일정은 코치님과 직접 조율해요.\n'코칭 신청 & Contact' 버튼으로 문의주시면 가능한 일정 안내드립니다!",
  },
  {
    keywords: ['수업', '강의', '종류', '상품'],
    answer:
      '현재 운영 중인 수업은 총 7가지예요 😊\n\n[프리미엄]\n• 프로 양성 — 프로팀 데뷔를 목표로 하는 엘리트 코스\n• 티어 보장 — 목표 티어 달성까지 무제한 책임 코칭\n• 한달 특강 — 한 달 집중 케어\n\n[기본]\n• 1시간 특강 — 원포인트 퀵 피드백\n• 2시간 특강 — 딥다이브 실전 집중 코칭\n• 단기 특강 — 2주 집중 성장 패키지\n• 그룹 수업 — 1:N 팀워크 마스터 클래스',
  },
]

const WELCOME_MESSAGE: Message = {
  id: 0,
  role: 'bot',
  text: '안녕하세요! DOX.POINT 코칭 문의 챗봇이에요 😊\n궁금한 점을 입력해주세요.\n\n(가격 / 신청 / 수업종류 / 경력 / 환불 / 일정)',
  showDiscord: false,
}

const DEFAULT_ANSWER =
  '죄송해요, 해당 내용은 디스코드로 문의해 주시면 정확히 안내드릴 수 있어요!'

function getAnswer(input: string): string {
  const lower = input.toLowerCase()
  for (const rule of FAQ_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.answer
    }
  }
  return DEFAULT_ANSWER
}

/* ──────────────────────────────────────────────
   Typing indicator (세 점 깜빡임)
─────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#0066ff]"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────
   Discord link button (모든 봇 메시지 하단)
─────────────────────────────────────────────── */
function DiscordButton() {
  return (
    <a
      href="https://discord.com/invite/aGbf5sVv24"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] transition-colors"
      style={{ clipPath: 'polygon(5px 0%, 100% 0%, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0% 100%, 0% 5px)' }}
    >
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.113 18.1.127 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
      </svg>
      더 자세한 문의는 👉 디스코드로 연결
    </a>
  )
}

/* ──────────────────────────────────────────────
   Message bubble
─────────────────────────────────────────────── */
function MessageBubble({ msg }: { msg: Message }) {
  const isBot = msg.role === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[85%] ${isBot ? '' : ''}`}>
        {isBot && (
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-4 h-4 bg-[#0066ff] flex items-center justify-center text-[8px] font-black text-white"
              style={{ clipPath: 'polygon(3px 0%, 100% 0%, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0% 100%, 0% 3px)' }}>
              D
            </span>
            <span className="text-[10px] font-bold text-[#0066ff] tracking-widest">DOXBOT</span>
          </div>
        )}
        <div
          className={`px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
            isBot
              ? 'bg-[#131620] border border-white/[0.08] text-white/85'
              : 'bg-[#0066ff] text-white'
          }`}
          style={{
            clipPath: isBot
              ? 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
              : 'polygon(0% 0%, 100% 0%, 100% 100%, 8px 100%, 0% calc(100% - 8px))',
          }}
        >
          {msg.text}
        </div>
        {isBot && <DiscordButton />}
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   Chat Window
─────────────────────────────────────────────── */
function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [idCounter, setIdCounter] = useState(1)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    // Slight delay so animation completes before focus
    const t = setTimeout(() => inputRef.current?.focus(), 300)
    return () => clearTimeout(t)
  }, [])

  const sendMessage = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed || isTyping) return

    const userMsg: Message = { id: idCounter, role: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIdCounter((n) => n + 1)
    setIsTyping(true)

    const answer = getAnswer(trimmed)
    const delay = 600 + Math.min(answer.length * 8, 900)

    setTimeout(() => {
      const botMsg: Message = {
        id: idCounter + 1,
        role: 'bot',
        text: answer,
        showDiscord: true,
      }
      setMessages((prev) => [...prev, botMsg])
      setIdCounter((n) => n + 2)
      setIsTyping(false)
    }, delay)
  }, [input, isTyping, idCounter])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  /* Quick-reply chips */
  const CHIPS = ['가격', '신청', '수업종류', '경력', '환불', '일정']

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-16 right-0 w-[340px] sm:w-[380px] flex flex-col bg-[#0f1118] border border-white/[0.08] overflow-hidden"
      style={{
        clipPath: 'polygon(14px 0%, 100% 0%, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%, 0% 14px)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,102,255,0.12), 0 0 40px rgba(0,102,255,0.08)',
        maxHeight: 'min(520px, calc(100dvh - 120px))',
      }}
    >
      {/* Header */}
      <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#0a0c12] shrink-0">
        {/* Blue accent top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066ff] to-transparent" />

        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 bg-[#0066ff] flex items-center justify-center shrink-0"
            style={{ clipPath: 'polygon(5px 0%, 100% 0%, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0% 100%, 0% 5px)' }}>
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {/* Online dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 border border-[#0a0c12]" />
          </div>
          <div>
            <p className="text-xs font-black tracking-widest text-white">DOXBOT</p>
            <p className="text-[10px] text-green-400 font-medium">온라인 · 자동응답</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
          style={{ clipPath: 'polygon(4px 0%, 100% 0%, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0% 100%, 0% 4px)' }}
          aria-label="채팅창 닫기"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 min-h-0"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,102,255,0.3) transparent' }}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-[#131620] border border-white/[0.08]"
              style={{ clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)' }}>
              <TypingDots />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      <div className="px-3 pb-2 shrink-0">
        <div className="flex gap-1.5 flex-wrap">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => {
                setInput(chip)
                setTimeout(() => {
                  setInput('')
                  const userMsg: Message = { id: idCounter, role: 'user', text: chip }
                  setMessages((prev) => [...prev, userMsg])
                  setIdCounter((n) => n + 1)
                  setIsTyping(true)
                  const answer = getAnswer(chip)
                  const delay = 600 + Math.min(answer.length * 8, 900)
                  setTimeout(() => {
                    const botMsg: Message = { id: idCounter + 1, role: 'bot', text: answer, showDiscord: true }
                    setMessages((prev) => [...prev, botMsg])
                    setIdCounter((n) => n + 2)
                    setIsTyping(false)
                  }, delay)
                }, 0)
              }}
              disabled={isTyping}
              className="px-2.5 py-1 text-[11px] font-semibold text-[#0066ff] border border-[#0066ff]/30 hover:border-[#0066ff]/60 hover:bg-[#0066ff]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              style={{ clipPath: 'polygon(4px 0%, 100% 0%, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0% 100%, 0% 4px)' }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-3 pb-3 shrink-0">
        <div className="flex gap-2 items-center bg-[#0a0c12] border border-white/[0.08] focus-within:border-[#0066ff]/40 transition-colors"
          style={{ clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)' }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isTyping}
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder-white/25 outline-none disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="mr-2 w-7 h-7 flex items-center justify-center bg-[#0066ff] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0052cc] active:scale-95 transition-all duration-200"
            style={{ clipPath: 'polygon(4px 0%, 100% 0%, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0% 100%, 0% 4px)' }}
            aria-label="전송"
          >
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   Main export
─────────────────────────────────────────────── */
export default function ChatbotBubble() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      {/* Bubble button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative mt-3 w-14 h-14 bg-[#0066ff] flex items-center justify-center hover:bg-[#0052cc] active:scale-95 transition-all duration-300"
        style={{
          clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)',
          boxShadow: isOpen
            ? '0 0 32px rgba(0,102,255,0.5), 0 4px 16px rgba(0,0,0,0.3)'
            : '0 0 24px rgba(0,102,255,0.4), 0 4px 16px rgba(0,0,0,0.3)',
        }}
        aria-label={isOpen ? '채팅창 닫기' : '코칭 문의 챗봇 열기'}
      >
        {/* Pulse ring — closed 상태에서만 */}
        {!isOpen && (
          <span className="absolute inset-0 animate-ping bg-[#0066ff] opacity-20"
            style={{ clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)' }} />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 text-white relative z-10"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 text-white relative z-10"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
