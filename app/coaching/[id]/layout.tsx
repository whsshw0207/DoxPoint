import { Metadata } from 'next'

const productMeta: Record<string, { title: string; description: string }> = {
  '1hour': {
    title: 'DOXPOINT | 1시간 원포인트 퀵 피드백 코칭',
    description: '핵심 문제점만 정확히 파악하고 싶은 분을 위한 코스. 오버워치 전문 코치 DOX의 1:1 플레이 분석.',
  },
  '2hour': {
    title: 'DOXPOINT | 2시간 딥다이브 실전 집중 코칭',
    description: '이론을 넘어 실전 감각까지. 코치와 함께하는 120분의 변화.',
  },
  short: {
    title: 'DOXPOINT | 단기 속성 2주 집중 성장 패키지',
    description: '점검과 교정의 반복, 단기 속성으로 티어를 뒤집다.',
  },
  monthly: {
    title: 'DOXPOINT | 한달 집중 올인원 프로 매니지먼트',
    description: '티어 수직 상승, 리그급 코칭으로 다시 태어나는 한 달.',
  },
  group: {
    title: 'DOXPOINT | 그룹 특강 팀워크 & 전략 마스터 클래스',
    description: '혼자서는 못 깨는 한계, 팀게임의 진짜 재미를 알려드립니다.',
  },
  guarantee: {
    title: 'DOXPOINT | 티어 보장 목표 달성 무제한 책임 코칭',
    description: '목표 티어까지 횟수 제한 없이 끝까지 책임집니다.',
  },
  pro: {
    title: 'DOXPOINT | 프로 양성 OWCS 데뷔 엘리트 코스',
    description: 'Florida Mayhem, Toronto Defiant 출신 코치가 직접 전수하는 프로씬 노하우.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const meta = productMeta[params.id] ?? {
    title: 'DOXPOINT | 오버워치 코칭',
    description: '감이 아닌 이해를 통해 지속 가능한 티어 상승을 설계합니다.',
  }
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://dox-point.vercel.app/coaching/${params.id}`,
      siteName: 'DOXPOINT',
      locale: 'ko_KR',
      type: 'website',
    },
  }
}

export default function CoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
