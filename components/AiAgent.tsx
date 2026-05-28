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
  AAAA: { name: '마우가',     desc: '압도적인 화력과 돌파력으로 전장의 흐름을 통째로 휩쓰는 호전적인 전차' },
  AAAB: { name: '해저드',     desc: '거침없이 진입해 전장을 뒤흔들고 아군의 길을 열어주는 선봉장' },
  AABA: { name: '로드호그',   desc: '자립심이 강해 의료 지원 없이도 자가 회복하며 변수를 창출하는 독립형 사냥꾼' },
  AABB: { name: '둠피스트',   desc: '강력한 주먹 하나로 적진을 붕괴시키고 변수를 만드는 전술가' },
  ABAA: { name: '정커퀸',     desc: '치명적인 출혈과 외침으로 적의 진형을 무너뜨리는 거침없는 돌격대장' },
  ABAB: { name: 'D.Va',       desc: '부스터의 기동력과 매트릭스를 활용해 공수를 자유자재로 오가는 만능 기동 타격대' },
  ABBA: { name: '레킹볼',     desc: '본대와 떨어져 뛰어난 기동력으로 적진을 누비며 진형을 뒤흔드는 전장의 별동대' },
  ABBB: { name: '라인하르트', desc: '거대한 방벽으로 아군을 수호하고 묵직한 망치로 적을 휩쓰는 정통파 탱커' },
  BAAA: { name: '윈스턴',     desc: '뛰어난 학식과 도약력을 활용해 적의 진영을 가르는 지능형 탱커' },
  BAAB: { name: '자리야',     desc: '위기를 기회(에너지)로 치환하며 전투의 판도를 완전히 뒤집는 잠재력의 소유자' },
  BABA: { name: '라마트라',   desc: '상황에 맞춰 형태를 변환하며 전투의 템포를 완벽히 지배하는 혁명가' },
  BABB: { name: '도미나',     desc: '탱커의 체급과 딜러의 야망, 섹시함까지 겸비한 포지션 초월자' },
  BBAA: { name: '오리사',     desc: '자리를 잡는 순간 그 어떤 공격에도 절대 밀리지 않는 철벽의 수호자' },
  BBAB: { name: '라인하르트', desc: '거대한 방벽으로 아군을 수호하고 묵직한 망치로 적을 휩쓰는 정통파 탱커' },
  BBBA: { name: '자리야',     desc: '위기를 기회(에너지)로 치환하며 전투의 판도를 완전히 뒤집는 잠재력의 소유자' },
  BBBB: { name: '시그마',     desc: '중력을 다스리며 상대의 모든 공격을 완전히 틀어막는 완벽주의 지휘관' },
}

const DPS_HEROES: Record<string, HeroResult> = {
  AAAA: { name: '위도우메이커 / 한조',   desc: '치명적인 한 발로 적의 숨통을 끊어버리는 냉혹한 전장의 저격수' },
  AAAB: { name: '겐지',                  desc: '치명적인 기습으로 적의 숨통을 확실하게 끊어버리는 암살자' },
  AABA: { name: '트레이서 / 안란',       desc: '기동성과 피지컬로 상대 멘탈을 흔드는 신출귀몰한 스피드스터' },
  AABB: { name: '리퍼',                  desc: '그림자처럼 조용히 잠입해 적진 한가운데서 궁을 집전하는 극적 연출의 대가' },
  ABAA: { name: '솜브라',                desc: '은신과 해킹 하나로 상대의 연계를 소리 없이 끊어내는 정보전의 설계자' },
  ABAB: { name: '벤처',                  desc: '땅을 파고들어 진입한 뒤 적을 교란시키고 진형을 붕괴시키는 땅굴 돌격대' },
  ABBA: { name: '메이',                  desc: '빙벽 하나로 전장의 지형을 재설계하고 상대의 진입을 차단하는 공간 장악형 전문가' },
  ABBB: { name: '바스티온 / 정크랫',     desc: '끊임없는 포격과 무자비한 화력 투사로 눈앞의 모든 방어선을 초토화하는 화력 병기' },
  BAAA: { name: '애쉬',                  desc: '충분한 딜각을 확보한 후 확실하게 방아쇠를 당기는 저격 원칙주의자' },
  BAAB: { name: '솔저: 76 / 소전',       desc: '기동성과 정밀한 트래킹 에임으로 상대를 숨 막히게 압박하는 히트스캔 전문가' },
  BABA: { name: '프레야 / 시에라',       desc: '남들은 흉내 낼 수 없는 세련된 유틸리티 사격으로 적을 제압하는 감각적인 트릭스터' },
  BABB: { name: '캐서디',                desc: '불리한 상황에서도 묵직한 단발 에임과 결정적 하이눈으로 판을 뒤집는 카우보이' },
  BBAA: { name: '에코 / 파라',           desc: '상공을 자유롭게 장악하며 폭발적인 화력을 쏟아붓는 전장의 공중 지배자' },
  BBAB: { name: '벤데타',                desc: '상대의 빈틈을 포착하면 매서운 기세로 몰아쳐 적을 파괴하는 전사' },
  BBBA: { name: '시메트라 / 토르비욘',   desc: '설치 완료 후 여유롭게 결과를 관람하는 설계 기반 플레이어' },
  BBBB: { name: '엠레',                  desc: '묵직한 전투 감각과 전술적 판단으로 전장의 밸런스를 맞추는 베테랑 작전 요원' },
}

const SUPPORT_HEROES: Record<string, HeroResult> = {
  AAAA: { name: '메르시',     desc: '적의 집중 포화를 우아하게 흘려내며, 킬보다 부활에서 희열을 느끼는 진정한 수호천사' },
  AAAB: { name: '라이프위버', desc: '아군이 사망하기 0.1초 전, 완벽한 타이밍에 낚아채 구출해 내는 타이밍의 예술가' },
  AABA: { name: '아나',       desc: '정밀한 수면총과 생체 수류탄 한 방으로 한타를 완벽하게 재편하는 전장의 총괄 디렉터' },
  AABB: { name: '아나',       desc: '정밀한 수면총과 생체 수류탄 한 방으로 한타를 완벽하게 재편하는 전장의 총괄 디렉터' },
  ABAA: { name: '주노',       desc: '매끄러운 궤도 비행과 하이퍼 링을 활용해 아군의 진격 템포를 화끈하게 밀어주는 궤도형 서포터' },
  ABAB: { name: '미즈키',     desc: '독창적인 유틸리티와 세련된 버프로 나만의 타이밍에 전황을 보좌하는 감각적인 조율사' },
  ABBA: { name: '젠야타',     desc: '힐러의 탈을 쓴 채, 부조화 구슬로 딜러보다 더 매서운 딜을 뽑아내는 무력파 구도자' },
  ABBB: { name: '키리코',     desc: '날카로운 쿠나이로 적을 위협하고 방울로 위기의 아군을 구하는 전장의 구원투수' },
  BAAA: { name: '키리코',     desc: '날카로운 쿠나이로 적을 위협하고 방울로 위기의 아군을 구하는 전장의 구원투수' },
  BAAB: { name: '우양',       desc: '뻔한 플레이를 거부하고, 예측 불가한 변칙적인 움직임으로 적팀의 설계를 무력화하는 지략가' },
  BABA: { name: '제트팩 캣', desc: '평범한 시야를 벗어난 3차원 공중 동선으로 적의 허를 찌르고 교란하는 변수 창출자' },
  BABB: { name: '바티스트',   desc: '불사 장치 하나로 죽음마저 통제하며 묵직한 딜과 힐을 동시에 뿜어내는 전장의 엔지니어' },
  BBAA: { name: '루시우',     desc: '자유롭게 전장을 누비고 속도 버프와 비트로 팀의 진격 템포를 지배하는 전장의 DJ' },
  BBAB: { name: '브리기테',   desc: '방패를 들고 전방으로 돌진하는 힐러계의 이단아' },
  BBBA: { name: '일리아리',   desc: '귀찮은 힐은 태양석에 위임하고, 본인은 치명적인 사격과 딜에 전념하는 파괴적인 효율주의자' },
  BBBB: { name: '모이라',     desc: '과학의 이름으로 힐과 딜, 생존까지 내 손으로 직접 해결하는 합리주의자' },
}

/* ─── Hero colors ─── */
const HERO_COLORS: Record<string, { from: string; to?: string }> = {
  // Tank
  '마우가':     { from: '#8C5D49' },
  '해저드':     { from: '#7726DA' },
  '로드호그':   { from: '#C99A52' },
  '둠피스트':   { from: '#8A5A4E' },
  '정커퀸':     { from: '#54A6D0' },
  'D.Va':       { from: '#F08AD8' },
  '레킹볼':     { from: '#D89A3A' },
  '라인하르트': { from: '#BFC4C7' },
  '윈스턴':     { from: '#9FA8DA' },
  '자리야':     { from: '#E56BB5' },
  '라마트라':   { from: '#7833B5' },
  '도미나':     { from: '#E9C571' },
  '오리사':     { from: '#4CAF50' },
  '시그마':     { from: '#9EA7B3' },
  // DPS
  '위도우메이커 / 한조': { from: '#A76ACF', to: '#CFC76A' },
  '겐지':                { from: '#8CF24A' },
  '트레이서 / 안란':     { from: '#E59A3A', to: '#F1831A' },
  '리퍼':                { from: '#8E5C5C' },
  '솜브라':              { from: '#7B4DDB' },
  '벤처':                { from: '#DEC11A' },
  '메이':                { from: '#5EA8FF' },
  '바스티온 / 정크랫':   { from: '#A7C9A1', to: '#E2B93B' },
  '애쉬':                { from: '#A9A9A3' },
  '솔저: 76 / 소전':     { from: '#4E5FAF', to: '#B7B094' },
  '프레야 / 시에라':     { from: '#B0FFFF', to: '#9B2337' },
  '캐서디':              { from: '#C75F5F' },
  '에코 / 파라':         { from: '#8FD8FF', to: '#3D7BDB' },
  '벤데타':              { from: '#C43E41' },
  '시메트라 / 토르비욘': { from: '#59C7E6', to: '#C96B6B' },
  '엠레':                { from: '#B04124' },
  // Support
  '메르시':     { from: '#E8DFAF' },
  '라이프위버': { from: '#FDD6D8' },
  '아나':       { from: '#6F8FCF' },
  '주노':       { from: '#DF76EE' },
  '미즈키':     { from: '#0C7479' },
  '젠야타':     { from: '#E5E06B' },
  '키리코':     { from: '#D04856' },
  '우양':       { from: '#1D86E2' },
  '제트팩 캣': { from: '#D0A57C' },
  '바티스트':   { from: '#4FC3E6' },
  '루시우':     { from: '#8CE34A' },
  '브리기테':   { from: '#C96B6B' },
  '일리아리':   { from: '#F0DA82' },
  '모이라':     { from: '#8B52E8' },
}

/* ─── Color helpers ─── */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function darkenHex(hex: string, factor = 0.45): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const h = (n: number) => Math.round(n * factor).toString(16).padStart(2, '0')
  return `#${h(r)}${h(g)}${h(b)}`
}

function getHeroGradient(heroName: string): { from: string; to: string } {
  const c = HERO_COLORS[heroName]
  if (!c) return { from: '#0066ff', to: '#003388' }
  return { from: c.from, to: c.to ?? darkenHex(c.from) }
}

function getHero(position: Position, answers: string[]): HeroResult {
  const key = answers.join('')
  if (position === 'tank')    return TANK_HEROES[key]    ?? { name: '라인하르트', desc: '거대한 방벽으로 아군을 수호하고 묵직한 망치로 적을 휩쓰는 정통파 탱커' }
  if (position === 'dps')     return DPS_HEROES[key]     ?? { name: '솔저: 76 / 소전', desc: '기동성과 정밀한 트래킹 에임으로 상대를 숨 막히게 압박하는 히트스캔 전문가' }
  return SUPPORT_HEROES[key] ?? { name: '메르시', desc: '적의 집중 포화를 우아하게 흘려내며, 킬보다 부활에서 희열을 느끼는 진정한 수호천사' }
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
  const { from, to } = getHeroGradient(hero.name)

  return (
    <motion.div key="result" variants={fade} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-8">
      <p className="text-xs font-bold tracking-[0.3em] text-white/30 uppercase">옵BTI 결과.</p>

      {/* Gradient border wrapper */}
      <div
        style={{
          padding: '1px',
          background: `linear-gradient(135deg, ${from}, ${to})`,
          clipPath: 'polygon(14px 0%,100% 0%,100% calc(100% - 14px),calc(100% - 14px) 100%,0% 100%,0% 14px)',
          boxShadow: `0 0 60px ${hexToRgba(from, 0.12)}`,
        }}
      >
        {/* Hero card */}
        <div
          className="relative overflow-hidden p-8 bg-[#0d0f18]"
          style={{
            clipPath: 'polygon(14px 0%,100% 0%,100% calc(100% - 14px),calc(100% - 14px) 100%,0% 100%,0% 14px)',
          }}
        >
          {/* bg grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.18]"
            style={{
              backgroundImage: `linear-gradient(${hexToRgba(from, 0.07)} 1px,transparent 1px),linear-gradient(90deg,${hexToRgba(from, 0.07)} 1px,transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />
          {/* top center glow */}
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-64 h-48 opacity-[0.08] blur-[60px] rounded-full pointer-events-none"
            style={{ backgroundColor: from }}
          />
          {/* top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${hexToRgba(from, 0.6)}, transparent)` }}
          />

          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl font-black mb-3 leading-tight"
              style={{
                letterSpacing: '-0.03em',
                background: `linear-gradient(135deg, ${from}, ${to})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 20px ${hexToRgba(from, 0.25)})`,
              }}
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
              className="text-[10px] font-mono tracking-[0.25em] uppercase"
              style={{ color: hexToRgba(from, 0.45) }}
            >
              {POSITION_LABEL[position]} · {answers.join('')}
            </motion.span>
          </div>
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
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' })

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
      <div className="hidden lg:block absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#0066ff] opacity-[0.03] blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />

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
            <span className="text-xs font-bold tracking-widest text-[#0066ff] uppercase">OW+BTI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            옵BTI — 숨겨진 모스트 찾기
          </h2>
          <p className="text-sm text-white/45">
            내 플레이 스타일이랑 핏(Fit)이 딱 맞는 운명의 영웅은?
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
