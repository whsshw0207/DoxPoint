'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/* ─── Types ─── */
type Position = 'tank' | 'dps' | 'support'
interface Question { q: string; a: string; b: string }
interface HeroResult { name: string; desc: string }

/* ─── Static data ─── */
const POSITIONS = [
  {
    id: 'tank' as Position,
    label: '탱커',
    desc: '선봉에서 팀을 지키는 든든한 방패',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6l-8-4z" />
      </svg>
    ),
  },
  {
    id: 'dps' as Position,
    label: '딜러',
    desc: '적의 숨통을 끊는 날카로운 창',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    id: 'support' as Position,
    label: '지원가',
    desc: '전장의 생사를 결정짓는 수호천사',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
]

const POSITION_LABEL: Record<Position, string> = { tank: '탱커', dps: '딜러', support: '지원가' }

const QUESTIONS: Record<Position, Question[]> = {
  tank: [
    {
      q: '거점을 향해 달려가는 길, 나의 첫 움직임은?',
      a: '"다 비켜! 내가 먼저 들어간다!" 앞장서서 과감하게 뛰어든다.',
      b: '"천천히 밀어내자." 팀원 위치 확인하며 방벽을 세우고 진입한다.',
    },
    {
      q: '적 딜러가 내 앞을 알짱거리며 도발한다. 이때 나는?',
      a: '"저게 진짜?!" 냅다 달려가서 묵직한 피지컬로 짓눌러버린다.',
      b: '"어림없지." 침착하게 스킬로 막아내며 우리 팀 딜러에게 처리를 맡긴다.',
    },
    {
      q: '적의 집중 포화에 내 체력이 반토막 났다!',
      a: '"우리 힐러를 믿어!" 더 깊숙이 파고들어 적의 진형을 흔든다.',
      b: '"잠깐 타임!" 엄폐물 뒤로 빠져서 힐을 받고 숨을 고른다.',
    },
    {
      q: '치열한 한타가 절정에 달했을 때, 나의 포지션은?',
      a: '"다 헤쳐모여!" 적들 한가운데로 파고들어 진형을 붕괴시킨다.',
      b: '"내 뒤로 숨어!" 묵묵히 내 자리를 지키며 든든한 방패가 된다.',
    },
  ],
  dps: [
    {
      q: '한타 시작 직전, 내가 자리 잡은 곳은?',
      a: '적들의 시선이 닿지 않는 깊숙한 뒷골목.',
      b: '든든한 우리 탱커 등 뒤, 시야가 확 트인 본대.',
    },
    {
      q: '방아쇠를 당길 때, 나의 쾌감 포인트는?',
      a: '숨을 참으며 단 한 발로 적의 머리를 꿰뚫는 정교함.',
      b: '피할 틈도 주지 않고 화려한 스킬과 총알을 쏟아붓는 짜릿함.',
    },
    {
      q: '적 탱커가 나를 향해 무섭게 돌진해 온다!',
      a: '"안녕~" 날렵한 이동기로 얄밉게 쏙 빠져나가 거리를 벌린다.',
      b: '"어디 한번 해보자!" 피하지 않고 화력을 쏟아부어 맞딜을 넣는다.',
    },
    {
      q: '난전 속, 내 눈이 가장 먼저 쫓는 타겟은?',
      a: '저 뒤에서 안전하게 아군을 살리고 있는 얄미운 적 지원가.',
      b: '내 눈앞에서 가장 위협적으로 알짱거리는 가까운 적.',
    },
  ],
  support: [
    {
      q: '피가 1 남은 아군과 피가 1 남은 적이 동시에 보인다!',
      a: '"살아야 해!!" 무조건 아군에게 힐을 먼저 꽂아 넣는다.',
      b: '"저건 무조건 잡아야지!" 힐은 잠시 미루고 적의 숨통을 끊는다.',
    },
    {
      q: '전장을 누비는 나의 기본 포지션은?',
      a: '맵 전체가 한눈에 들어오는 가장 안전한 최후방.',
      b: '아군들과 찰싹 붙어서 흙먼지를 마시며 함께 구르는 최전방.',
    },
    {
      q: '우리 탱커가 죽기 일보 직전이다!',
      a: '"안 돼!" 엄청난 폭힐을 쏟아부어 어떻게든 생명을 연장시킨다.',
      b: '"침착해." 무적기나 디버프 스킬로 위험한 상황 자체를 무효화한다.',
    },
    {
      q: '적 겐지가 나를 노리고 뒤로 돌았다!',
      a: '"살려주세요!!" 미친 듯이 핑을 찍으며 아군 품으로 도망친다.',
      b: '"어딜 감히." 내 손으로 직접 스킬을 맞추고 때려서 역관광 보낸다.',
    },
  ],
}

const TANK_HEROES: Record<string, HeroResult> = {
  AAAA: { name: '둠피스트',   desc: '무지성 돌격, 피지컬 캐리의 화신' },
  AAAB: { name: '해저드',     desc: '저돌적인 진입 후 연계' },
  AABA: { name: '로드호그',   desc: '변수 창출' },
  AABB: { name: '레킹볼',     desc: '진형 붕괴 특화' },
  ABAA: { name: '윈스턴',     desc: '어그로 핑퐁 및 진입' },
  ABAB: { name: 'D.Va',       desc: '유동적인 커버와 다이브' },
  ABBA: { name: '로드호그',   desc: '변수 창출' },
  ABBB: { name: '라인하르트', desc: '본대 보호의 정석' },
  BAAA: { name: '정커퀸',     desc: '공격적인 전방 압박' },
  BAAB: { name: '마우가',     desc: '압도적 화력방어' },
  BABA: { name: '라마트라',   desc: '스킬 분배와 자리 유지' },
  BABB: { name: '자리야',     desc: '아군 보호와 턴 쓰기' },
  BBAA: { name: '도미나',     desc: '전방 딜탱 역할' },
  BBAB: { name: '자리야',     desc: '아군 보호와 턴 쓰기' },
  BBBA: { name: '오리사',     desc: '단단한 라인 유지' },
  BBBB: { name: '시그마',     desc: '완벽한 스킬 분배와 수비' },
}

const DPS_HEROES: Record<string, HeroResult> = {
  AAAA: { name: '겐지 / 트레이서',     desc: '순수 피지컬 암살' },
  AAAB: { name: '솜브라',              desc: '지능적인 해킹 암살' },
  AABA: { name: '위도우메이커',        desc: '정밀 저격' },
  AABB: { name: '한조',                desc: '변수 창출 저격' },
  ABAA: { name: '에코 / 파라',         desc: '입체적인 기동 타격' },
  ABAB: { name: '시에라 / 안란',       desc: '스킬 연계 암살' },
  ABBA: { name: '리퍼',                desc: '과감한 진입과 맞딜' },
  ABBB: { name: '메이',                desc: '팀플레이와 지능적 수비' },
  BAAA: { name: '캐서디',              desc: '든든한 본대 딜러' },
  BAAB: { name: '애쉬 / 소전',         desc: '정석적인 딜각 창출' },
  BABA: { name: '정크랫 / 엠레',       desc: '진형 파괴와 스팸' },
  BABB: { name: '바스티온 / 프레야',   desc: '압도적 화력 쏟아붓기' },
  BBAA: { name: '솔저: 76',            desc: '지속 딜링' },
  BBAB: { name: '바스티온 / 프레야',   desc: '압도적 화력 쏟아붓기' },
  BBBA: { name: '시메트라 / 토르비욘', desc: '설치물 기반 수비' },
  BBBB: { name: '시메트라 / 토르비욘', desc: '설치물 기반 수비' },
}

const SUPPORT_HEROES: Record<string, HeroResult> = {
  AAAA: { name: '라이프위버',       desc: '최후방 극강의 아군 세이브' },
  AAAB: { name: '메르시',           desc: '안전한 포지션에서 퓨어 힐' },
  AABA: { name: '아나',             desc: '수면총 등 유틸과 강력한 힐' },
  AABB: { name: '젠야타',           desc: '최후방 딜 지원 및 카운터 궁' },
  ABAA: { name: '주노 / 미즈키',    desc: '기동성 기반 힐 지원' },
  ABAB: { name: '일리아리',         desc: '딜러형 서포터' },
  ABBA: { name: '아나',             desc: '수면총 등 유틸과 강력한 힐' },
  ABBB: { name: '젠야타',           desc: '최후방 딜 지원 및 카운터 궁' },
  BAAA: { name: '키리코',           desc: '순간 합류와 정화 변수' },
  BAAB: { name: '키리코',           desc: '순간 합류와 정화 변수' },
  BABA: { name: '우앙 / 제트팩 캣', desc: '변수 창출 및 유틸' },
  BABB: { name: '바티스트',         desc: '전방 화력 지원과 불사 장치' },
  BBAA: { name: '루시우',           desc: '전방 이속 버프와 찰싹 붙기' },
  BBAB: { name: '브리기테',         desc: '전방 아군 밀착 보호' },
  BBBA: { name: '루시우',           desc: '전방 이속 버프와 찰싹 붙기' },
  BBBB: { name: '모이라',           desc: '생존력 갑, 전방 힐딜 밸런스' },
}

function getHero(position: Position, answers: string[]): HeroResult {
  const key = answers.join('')
  if (position === 'tank')    return TANK_HEROES[key]    ?? { name: '라인하르트', desc: '본대 보호의 정석' }
  if (position === 'dps')     return DPS_HEROES[key]     ?? { name: '솔저: 76',    desc: '지속 딜링' }
  return SUPPORT_HEROES[key] ?? { name: '메르시',         desc: '안전한 포지션에서 퓨어 힐' }
}

/* ─── Animation variants ─── */
const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}

/* ─── Position Selection ─── */
function PositionSelect({ onSelect }: { onSelect: (p: Position) => void }) {
  return (
    <motion.div key="pos" variants={fade} initial="initial" animate="animate" exit="exit">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {POSITIONS.map((pos) => (
          <button
            key={pos.id}
            onClick={() => onSelect(pos.id)}
            className="group relative p-6 text-left bg-[#0d0f18] border border-white/[0.08] hover:border-[#0066ff]/60 transition-all duration-300 cursor-pointer"
            style={{ clipPath: 'polygon(12px 0%,100% 0%,100% calc(100% - 12px),calc(100% - 12px) 100%,0% 100%,0% 12px)' }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(0,102,255,0.10) 0%, transparent 70%)' }}
            />
            <div className="text-[#0066ff] mb-4">{pos.icon}</div>
            <p className="text-lg font-black text-white mb-2" style={{ letterSpacing: '-0.01em' }}>{pos.label}</p>
            <p className="text-sm text-white/45 leading-relaxed">{pos.desc}</p>
            <span className="absolute bottom-4 right-4 text-[10px] font-bold tracking-widest text-[#0066ff] opacity-0 group-hover:opacity-100 transition-opacity">
              SELECT →
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Question Step ─── */
function QuestionStep({
  step,
  question,
  onAnswer,
  onBack,
}: {
  step: number
  question: Question
  onAnswer: (a: 'A' | 'B') => void
  onBack: () => void
}) {
  return (
    <motion.div key={`q${step}`} variants={fade} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-8">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#0066ff] uppercase">
            Question {step} / 4
          </span>
          <button
            onClick={onBack}
            className="text-[10px] text-white/30 hover:text-white/60 transition-colors tracking-widest uppercase"
          >
            ← 뒤로
          </button>
        </div>
        <div className="relative h-px bg-white/[0.07] overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#0066ff]"
            initial={{ width: `${(step - 1) / 4 * 100}%` }}
            animate={{ width: `${step / 4 * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Question text */}
      <p className="text-2xl sm:text-3xl font-black text-white leading-tight" style={{ letterSpacing: '-0.02em' }}>
        {question.q}
      </p>

      {/* Answer buttons */}
      <div className="flex flex-col gap-3">
        {(['A', 'B'] as const).map((choice) => (
          <button
            key={choice}
            onClick={() => onAnswer(choice)}
            className="group relative w-full text-left p-5 bg-[#0d0f18] border border-white/[0.08] hover:border-[#0066ff]/50 hover:bg-[#0d0f20] active:scale-[0.99] transition-all duration-200 cursor-pointer"
            style={{ clipPath: 'polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)' }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.06), transparent 60%)' }}
            />
            <div className="relative flex items-start gap-4">
              <span className="text-[11px] font-black text-[#0066ff] tracking-widest shrink-0 mt-0.5 w-4">{choice}</span>
              <p className="text-sm text-white/65 leading-relaxed group-hover:text-white/90 transition-colors">
                {choice === 'A' ? question.a : question.b}
              </p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Result Screen ─── */
function ResultScreen({
  hero,
  position,
  answers,
  onReset,
}: {
  hero: HeroResult
  position: Position
  answers: string[]
  onReset: () => void
}) {
  return (
    <motion.div key="result" variants={fade} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-8">
      <p className="text-xs font-bold tracking-[0.3em] text-white/30 uppercase">당신의 영혼의 영웅 메이트는...</p>

      {/* Hero card */}
      <div
        className="relative overflow-hidden p-8 bg-[#0d0f18] border border-[#0066ff]/25"
        style={{
          clipPath: 'polygon(14px 0%,100% 0%,100% calc(100% - 14px),calc(100% - 14px) 100%,0% 100%,0% 14px)',
          boxShadow: '0 0 60px rgba(0,102,255,0.08)',
        }}
      >
        {/* bg grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.18]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,102,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,102,255,0.07) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* top glow */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-64 h-48 bg-[#0066ff] opacity-[0.08] blur-[60px] rounded-full pointer-events-none" />
        {/* top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066ff]/60 to-transparent" />

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl font-black text-[#0066ff] mb-3 leading-tight"
            style={{ letterSpacing: '-0.03em', textShadow: '0 0 40px rgba(0,102,255,0.45)' }}
          >
            {hero.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="text-sm text-white/50 leading-relaxed mb-6"
          >
            {hero.desc}
          </motion.p>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="text-[10px] font-mono tracking-[0.25em] text-[#0066ff]/35 uppercase"
          >
            {POSITION_LABEL[position]} · {answers.join('')}
          </motion.span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/15 text-white/55 font-bold text-sm tracking-wide hover:border-white/35 hover:text-white active:scale-[0.98] transition-all duration-300"
          style={{ clipPath: 'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)' }}
        >
          ↩ 다시 하기
        </button>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0066ff] text-white font-bold text-sm tracking-wide hover:bg-[#0052cc] active:scale-[0.98] transition-all duration-300"
          style={{
            clipPath: 'polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)',
            boxShadow: '0 0 24px rgba(0,102,255,0.30)',
          }}
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.113 18.1.127 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
          코칭 신청 &amp; Contact
        </a>
      </div>
    </motion.div>
  )
}

/* ─── Main export ─── */
export default function HeroMatcher() {
  const [step, setStep]         = useState(0)
  const [position, setPosition] = useState<Position | null>(null)
  const [answers, setAnswers]   = useState<string[]>([])

  const selectPosition = (pos: Position) => {
    setPosition(pos)
    setStep(1)
  }

  const answerQuestion = (answer: 'A' | 'B') => {
    const next = [...answers, answer]
    setAnswers(next)
    setStep(next.length === 4 ? 6 : step + 1)
  }

  const goBack = () => {
    if (step === 1) {
      setPosition(null)
      setStep(0)
    } else {
      setAnswers(answers.slice(0, -1))
      setStep(step - 1)
    }
  }

  const reset = () => {
    setStep(0)
    setPosition(null)
    setAnswers([])
  }

  const currentQuestion = position && step >= 1 && step <= 4
    ? QUESTIONS[position][step - 1]
    : null

  const hero = step === 6 && position ? getHero(position, answers) : null

  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="hero-matcher" className="relative py-10 md:py-12 bg-[#0a0c12] overflow-hidden">
      {/* BG grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,102,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,102,255,0.05) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* BG glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#0066ff] opacity-[0.03] blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#0066ff]" />
            <span className="text-xs font-bold tracking-widest text-[#0066ff] uppercase">FIND YOUR HERO</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            나의 영혼의 영웅 메이트 찾기
          </h2>
          <p className="text-sm text-white/45">
            당신의 플레이 스타일에 꼭 맞는 오버워치 영웅을 찾아드립니다
          </p>
        </motion.div>

        {/* Interactive area */}
        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <PositionSelect key="pos" onSelect={selectPosition} />
            )}
            {step >= 1 && step <= 5 && currentQuestion && (
              <QuestionStep
                key={step}
                step={step}
                question={currentQuestion}
                onAnswer={answerQuestion}
                onBack={goBack}
              />
            )}
            {step === 6 && hero && position && (
              <ResultScreen
                key="result"
                hero={hero}
                position={position}
                answers={answers}
                onReset={reset}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
