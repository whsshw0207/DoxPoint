export const coachingProducts = {
  pro: {
    name: "프로 양성",
    badge: "PRO",
    price: "390,000원~",
    description: "프로게이머를 목표로 하는 집중 코칭",
    spec: { duration: "주 4회 2시간", replay: "개인 맞춤", qna: "기간 내 무제한", report: "매 세션 PDF" }
  },
  guarantee: {
    name: "티어 보장",
    badge: "GUARANTEE",
    price: "상담 후 결정",
    description: "목표 티어 달성까지 무제한 수업",
    spec: { duration: "개인 맞춤", replay: "개인 맞춤", qna: "기간 내 무제한", report: "매 세션 PDF" }
  },
  month: {
    name: "한달 특강",
    badge: "POPULAR",
    price: "175,000원",
    description: "한 달 집중 케어 코칭",
    spec: { duration: "4회 각 120분", replay: "—", qna: "기간 내 무제한", report: "매 세션 PDF" }
  },
  short: {
    name: "단기 특강",
    badge: "SHORT",
    price: "120,000원",
    description: "집중 단기 케어",
    spec: { duration: "2회 각 120분", replay: "코드 2개", qna: "기간 내 무제한", report: "매 세션 PDF" }
  },
  "120": {
    name: "2시간",
    badge: "",
    price: "45,000원",
    description: "심화 분석 코칭",
    spec: { duration: "단회 120분", replay: "—", qna: "—", report: "세션 후 1회" }
  },
  "60": {
    name: "1시간",
    badge: "",
    price: "25,000원",
    description: "빠른 원포인트 레슨",
    spec: { duration: "단회 60분", replay: "—", qna: "—", report: "세션 후 1회" }
  },
  group: {
    name: "1:N 그룹",
    badge: "",
    price: "35,000원~",
    description: "소규모 그룹 코칭",
    spec: { duration: "단회", replay: "—", qna: "—", report: "세션 후 1회" }
  }
}

// TODO: COACHING-PRICES 가격 수정할 때 이 파일만 수정하면 됨
