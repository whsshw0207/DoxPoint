"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type BoardReview = {
  name: string;
  rating: number;
  review: string;
};

type MarqueeReview = {
  name: string;
  rating: number;
  review: string;
  fromTier: string;
  toTier: string;
};

const BOARD_REVIEWS: BoardReview[] = [
  { name: "sung**", rating: 5, review: "친절하게 너무 잘 알려주시고 당연한 걸 알려주시는 게 아닌 진짜 제 문제를 알려주셔서 좋았습니다 다음에 시간이랑 돈이 된다면... ㅋㅋ 다른 포지션으로도 몇 번이고 더 받아보고 싶은 강의입니다" },
  { name: "경관_피**", rating: 5, review: "진짜 혼자서는 모를 내용이나 지나쳤을 내용들을 세세히 알려주셔서 좋았습니다. 앞으로의 방향성을 잡아줬다는 점에서 너무 만족했습니다" },
  { name: "mono**", rating: 5, review: "저도 리플을 많이 봤지만, 제가 보지못했던 디테일한 부분까지 짚어주셔서 정말 좋은 시간이었습니다. 다음에는 말씀하신부분을 수정해서 다시 수강신청하겠습니다. 말씀 감사하고 고생많으셨습니다!!" },
  { name: "대장장이**", rating: 5, review: "쉽게 잘 설명해주시고 전문적으로 설명해줍니다. 2시간이라는 시간이 순삭이었습니다." },
  { name: "T1A-**", rating: 5, review: "키리코 피드백 위주로 받았는데, 어떻게 포지션을 잡고, 어떻게 행동해야 하는지 등 제가 더 잘해지기 위한 방법에 대해 잘 설명해 주셨습니다. 피드백 받고 다이아4에서 마스터5까지 상승했어요!" },
  { name: "달려들어**", rating: 5, review: "초보 유저인데 잘 인지하지 못하고 있던 부분을 상세히 잘 알려주셔서 그 방법으로 연습하고 실력 늘고 다시 배우러오겠습니다" },
  { name: "기병_신**", rating: 5, review: "너무 친절하시고 티어에 맞게 설명 및 연습방법을 알려주십니다" },
  { name: "달을_렝**", rating: 5, review: "방향성도 못잡고 있었는데 자세하게 하나하나 다 봐주시고 앞으로 어떻게 해야할지도 잘 알려주셔서 좋았습니다. 피드백 받기전 다이아에서 마스터3까지 올라왔습니다. 다음에도 또 배우러 오겠습니다!" },
  { name: "T1A-**", rating: 5, review: "엄청 꼼꼼하게 잘 가르쳐 주십니다." },
  { name: "끝판왕_**", rating: 5, review: "딜러 겐지, 트레 피드백 받았는데 섭딜의 기본부터 제가 몰랐었던 부분도 알려주시고 게임 운영도 설명해주셔서 많은 것을 배울 수 있었습니다. 마지막에 설명 끝난 후 피드백 적용됐는지 인게임에 들어가서 봐주시는데 이런 부분도 너무 좋았어요" },
  { name: "고무_소**", rating: 5, review: "딜러 피드백을 받았는데 우선 제가 준비한 리플레이 보면서 좋았던 점, 개선해야할 점 알기 쉽게 알려주십니다. 리플레이 피드백 다음 경쟁전 플레이를 봐주시는데 피드백 받았던걸 신경쓰면서 하니 평소 같았으면 졌다고 생각했을 판도 이겨지는게 신기했습니다. 강의중에 플레이 했던 판도 따로 리플레이 피드백 해주시는데 시간이 넘어가도 다 해주셔서 너무 감사했습니다. 질문에 대한 답변도 만족스러워 이후 피드백을 원한다면 저는 고민없이 독스님께 받을 예정입니다." },
  { name: "xodi**", rating: 5, review: "옵치 강의의 희망입니다. 일정조율도 잘되시고 부족한 여러 부분들에 대해서도 잘 알려주십니다. 탱 디테일이나 기본기, 영웅별 상황 등 좋습니다" },
  { name: "MB77**", rating: 5, review: "오랜만에 옵치를 시작하는데 변한게 너무 많아서 수강신청했는데 너무 친절하시게 알려주셔서 너무 유익했습니다!" },
  { name: "아이치계**", rating: 5, review: "그냥 말이 필요 없습니다" },
  { name: "WiFi**", rating: 5, review: "처음에 많이 긴장했는데 친절하게 알려주시고 정확한 문제점과 연습법도 알려주셔서 좋았습니다" },
  { name: "폭주_아**", rating: 5, review: "긴장했는데 친절하게 해주셔서 이해도 잘되고 좋았습니다. 감사합니다" },
  { name: "내선물**", rating: 5, review: "감사합니다. 간과하고 있던 것들을 정말정말 디테일하게 알려주셨어요. 도움 많이 되었습니다." },
  { name: "거리의_**", rating: 5, review: "상세하고 친절하게 가르쳐주십니다" },
  { name: "경의_리**", rating: 5, review: "강의 전에 제가 배우고 싶은 부분을 먼저 확인해주시고, 그에 맞춰 자세히 도와주셔서 정말 좋았습니다. 전체적인 설명도 이해하기 쉽게 해주셔서 많은 도움이 되었어요. 추천합니다!" },
  { name: "힘_신드**", rating: 5, review: "몰랐던 부분을 배우게 되어서 너무 좋았습니다! 당연히 스펙에 어울리는 전문성과, 초보자도 알기 쉽게 설명하시는 티칭 실력이 강의를 더욱 완벽하게 만듭니다 :) 강력히 추천드립니다." },
  { name: "모르는개**", rating: 5, review: "리플 확인하면서 어떤 지점에서 아쉬웠는지 등 자세히 가르쳐주셨습니다. 에임 연습도 어떻게 해야하는지 알려주셔서 좋았습니다." },
  { name: "Drag**", rating: 5, review: "현 오버워치 프로팀에서 활동하시는 코치님답게 전문성있게 잘 가르쳐주십니다. 상황별 대처방법이라던지 티어향상하는데 큰 도움이 된것 같습니다. 감사합니다. 이 강의를 듣고 마스터 랭크를 달성하였습니다. 1단계 랭크 상승" },
  { name: "성헌이**", rating: 5, review: "강의 내용이 전문적이라 좋았습니다!" },
  { name: "바텀은참**", rating: 5, review: "성향 파악도 확실히 해 주셔서 어떤 부분이 약점인지 잘 짚어주세요. 전체적인 개념을 보강하면서, 내 약점을 극복하면 어떤 긍정적인 상황들이 전개되는지 잘 알려주십니다. 다들 들어보세요~!" },
  { name: "Jazz**", rating: 5, review: "도움 많이 되었습니다!" },
  { name: "정지찬**", rating: 5, review: "정말 친절하시고 제가 놓치던 부분이나 문제점 잘 알려주시고 잘 몰랐던거 쉽게 알려주셨습니다. 정말 좋은 강의였습니다. 수고 많으셨습니다." },
  { name: "opgg**", rating: 5, review: "평소 모르던 제 플레이에 문제점을 알수있는 시간이었습니다" },
  { name: "선생님구**", rating: 5, review: "2달된 뉴비 입장에서도 엄청 쉽게 눈높이 맞춤으로 설명해주십니다. 처음이라 2시간 강의 받아봤는데 2시간 이미 훌쩍 넘겼는데도 짜증 하나 없이 끝까지 피드백 문서를 따로 써주시고 궁금한거 모든거 다 받아주십니다. 혹시 티어에 욕심있으신분은 꼭 이분 강의 들어보셨으면 좋을거같습니다. 하나하나 자세히 알려주시며 제가 따로 이 부분이 더 궁금하다 하면 그 부분을 자세히 뜯어서 알려주시기에 티어 향상에 매우 도움됩니다. 저는 피드백 받은거 연습하고 재수강 예정입니다." },
  { name: "대깨옵입**", rating: 5, review: "너무 유익한 강의였습니다. 기본적인 틀에서 점점 세부적으로 확장시켜 알려나가주셔서 이후에 실시간 플레이를 보며 적용시킬때 수월했습니다. 또 구매하겠습니다!" },
  { name: "은빛_스**", rating: 5, review: "확실한 것 하나 배웠습니다. 실력향상을 위해 좋은 선택이었습니다." },
  { name: "선물_탈**", rating: 5, review: "감사합니다." },
  { name: "반품된_**", rating: 5, review: "플레랑 다이아 사이에서 헤매이고 있었는데 길잡이가 되어주는 수업이였습니다. 꼼꼼하게 봐주시고 질문이 많아도 다 답해주셔서 백과사전 느낌이였습니다. 특히 에임에 대해 궁금한 점들이 있었는데 디테일하게 봐주시고 혼자서 연습해 볼 수 있게 피드백해주셨습니다" },
  { name: "신해영**", rating: 5, review: "너무 좋았습니다. 알려주신대로만 하니 다이아 딜러 상대로 압도하는 모습을 보였습니다. 감사합니다." },
  { name: "지존라이**", rating: 5, review: "후기가 없어서 처음엔 조금 걱정됐지만, 코치님의 경력사항을 보고 믿고 구매했습니다. 초반에 약간의 이슈가 있었지만 피드백을 바로 반영해주시고, 시간을 더 들여 꼼꼼히 알려주시는 모습이 인상 깊었습니다. 다음에는 더 좋은 강의로 다시 뵐 수 있을 것 같아 기대됩니다. 감사합니다!" },
];

const MARQUEE_REVIEWS: MarqueeReview[] = [
  { name: "HANN**", rating: 5, review: "거의 1년 정도 피드백 받으면서 문제점을 정확히 짚어주시고, 끝까지 디테일하게 피드백해 주신 덕분에 유의미한 티어 상승이 있었습니다. 취미여도 못하면 스트레스를 크게 받는 사람이라 정말 큰 도움 되었습니다. 감사합니다!", fromTier: "브론즈 2", toTier: "다이아 3" },
  { name: "Drag**", rating: 5, review: "현 오버워치 프로팀에서 활동하시는 코치님답게 전문성있게 잘 가르쳐주십니다. 상황별 대처방법이라던지 티어향상하는데 큰 도움이 된것 같습니다. 감사합니다.", fromTier: "플레티넘 5", toTier: "마스터 5" },
  { name: "고**", rating: 5, review: "덕분에 많은걸 배우고 겜보는눈도 눈을 뜨게 됐습니다", fromTier: "마스터5", toTier: "그랜드마스터5" },
  { name: "존스토웰**", rating: 5, review: "유튜브에 나오는 강의 영상들만 따라 하다가 작년에 독스코치님께 정기적으로 수업을 받으면서 상황에 맞게 주도적으로 플레이하는 방법에 대해 배웠고 20시즌에 그랜드 마스터 달성했습니다.", fromTier: "마스터 5", toTier: "그랜드마스터 4" },
  { name: "9**", rating: 5, review: "피드백 받은 뒤로 유의미한 티어 상승이 있었습니다. 많은 도움이 됐습니다. 감사합니다!", fromTier: "다이아3", toTier: "마스터3" },
  { name: "tou**", rating: 5, review: "옵태기여서 한동안 안 하다가 올려주신 영상들 보고 다시 한 번 지옥같은 경쟁전을 돌렸는데 플레2에서 마스터5까지 올랐습니다.", fromTier: "플레티넘 2", toTier: "마스터 5" },
  { name: "Ya**", rating: 5, review: "감사합니다. 거의 3달동안 저 알려주실때 정말 열심히 봐주시고 너무 잘 알려주신거 같아서 정말 도움 많이 받았고 정말 많이 실력이 늘었던거 같아요. 이제 제대로 된 프로무대 뛰게 되는데 알려주신거 안까먹고 가서도 열심히 하겠습니다!", fromTier: "그랜드마스터 1", toTier: "챔피언 3" },
  { name: "빡빡이**", rating: 5, review: "코치님 덕분에 점수 100점이나 올렸어요!! 경쟁 분위기도 전보다 좋아지고 오더도 더 수월하게 됐습니다 감사합니다. 덕분에 둠피로 마스터 갔습니다 감사합니다. 마스터3까지 왔네요.", fromTier: "플레티넘 1", toTier: "마스터 3" },
  { name: "이멀**", rating: 5, review: "최근에 일이 생겨서 게임을 잘 못하다 그마 승급전까지 갔습니다", fromTier: "다이아 3", toTier: "마스터 1" },
  { name: "김애**", rating: 5, review: "안녕하세요! 확실히 게임이 수월해졌다는 느낌입니다. 예전에는 플3에서 서식했는데, 코칭 다음날 바로 플1까지는 올렸어요! 꼭 또 신청드리고 싶어요 감사합니다...!!", fromTier: "플레티넘 3", toTier: "플레티넘 1" },
  { name: "Sogu**", rating: 5, review: "실버5에서 골드2로 올랐습니다 감사합니다.", fromTier: "실버 5", toTier: "골드 2" },
];

const PAGE_SIZE = 5;

function tierColor(tier: string): string {
  if (tier.includes("그랜드마스터") || tier.includes("그랜드마스터") || tier.includes("챌린저") || tier.includes("챔피언")) return "#f97316";
  if (tier.includes("마스터")) return "#a78bfa";
  if (tier.includes("다이아")) return "#22d3ee";
  if (tier.includes("에메랄드")) return "#4ade80";
  if (tier.includes("플래티넘") || tier.includes("플레티넘")) return "#5eead4";
  if (tier.includes("골드")) return "#f5c842";
  if (tier.includes("실버")) return "#94a3b8";
  if (tier.includes("브론즈")) return "#cd7f32";
  return "#0066ff";
}

function tierImageName(tier: string): string | null {
  if (tier.includes("챔피언")) return "champion";
  if (tier.includes("그랜드마스터") || tier.includes("그마")) return "grandmaster";
  if (tier.includes("마스터")) return "master";
  if (tier.includes("다이아")) return "diamond";
  if (tier.includes("플래티넘") || tier.includes("플레")) return "platinum";
  if (tier.includes("골드")) return "gold";
  if (tier.includes("실버")) return "silver";
  if (tier.includes("브론즈")) return "bronze";
  return null;
}

function TierBadgeFallback({ tier, size }: { tier: string; size: number }) {
  const color = tierColor(tier);
  return (
    <div style={{ width: size, height: Math.round(size * 1.15), background: `${color}1a`, border: `1.5px solid ${color}60`, clipPath: "polygon(50% 0%,95% 26%,95% 74%,50% 100%,5% 74%,5% 26%)", color, display: "flex", alignItems: "center", justifyContent: "center", filter: `drop-shadow(0 0 6px ${color}50)`, fontSize: Math.round(size * 0.2), fontWeight: 900, letterSpacing: "0.04em", lineHeight: 1, flexShrink: 0 }}>
      {tier.substring(0, 3)}
    </div>
  );
}

function TierImage({ tier, size }: { tier: string; size: number }) {
  const [error, setError] = useState(false);
  const filename = tierImageName(tier);
  if (!filename || error) return <TierBadgeFallback tier={tier} size={size} />;

  return (
      <Image
          src={`/tier/${filename}.webp`}
          alt={tier}
          width={size}
          height={size}
          quality={100}
          unoptimized={true} // 👉 엑스박스 방지용! 잊지 말고 꼭 넣어.
          onError={() => setError(true)}
          style={{ objectFit: "contain", display: "block", flexShrink: 0 }}
      />
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className={i < rating ? "text-[#f5c842]" : "text-gray-700"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [page, setPage] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const totalPages = Math.ceil(BOARD_REVIEWS.length / PAGE_SIZE);
  const pageReviews = BOARD_REVIEWS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handlePageChange(next: number) {
    setPage(next);
    setExpandedIdx(null);
  }

  return (
    <section id="reviews" className="py-8 md:py-10 bg-[#080a10] border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <style>{`
        @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marquee-scroll 44s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#0066ff]" />
            <span className="typo-eyebrow text-[#0066ff]">REVIEWS</span>
          </div>
          <h2 className="typo-section-title text-white">수강생 후기</h2>
        </motion.div>

        <div className="overflow-hidden mb-6" style={{ WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)" }}>
          <div className="marquee-track">
            {[...MARQUEE_REVIEWS, ...MARQUEE_REVIEWS].map((r, i) => (
              <div key={i} className="shrink-0 mr-4" style={isMobile ? { width: '55vw', height: 'auto', minHeight: 280 } : { width: 430, height: 330 }}>
                <div className="w-full h-full px-6 pb-3 rounded-2xl flex flex-col gap-1" style={{ paddingTop: '2px', background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 0 20px rgba(0,102,255,0.04)" }}>
                  <div className="flex items-end justify-center gap-5" style={isMobile ? { paddingTop: 10 } : {}}>
                    <div className="flex flex-col items-center" style={{ gap: 0 }}>
                      <TierImage tier={r.fromTier} size={isMobile ? 66 : 123} />
                      <span className="font-bold" style={{ color: '#ffffff', marginTop: 0, fontSize: isMobile ? 13 : 14 }}>{r.fromTier}</span>
                    </div>
                    <svg width={24} height={48} viewBox="0 0 24 48" fill="none"
                      style={{ flexShrink: 0, alignSelf: 'center' }}>
                      <defs>
                        <linearGradient id="arrowGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0066ff" stopOpacity="0.4"/>
                          <stop offset="50%" stopColor="#0066ff" stopOpacity="1"/>
                          <stop offset="100%" stopColor="#0066ff" stopOpacity="0.4"/>
                        </linearGradient>
                      </defs>
                      <polyline points="6 8 18 24 6 40"
                        stroke="url(#arrowGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        style={{ filter: 'drop-shadow(0 0 6px #0066ff88)' }}
                      />
                    </svg>
                    <div className="flex flex-col items-center" style={{ gap: 0 }}>
                      <TierImage tier={r.toTier} size={isMobile ? 66 : 148} />
                      <span className="font-bold" style={{ color: '#ffffff', marginTop: 0, fontSize: isMobile ? 13 : 14 }}>{r.toTier}</span>
                    </div>
                  </div>
                  <p className="typo-body-sm text-gray-400 flex-1" style={{ marginTop: 7, display: "-webkit-box", WebkitLineClamp: isMobile ? 3 : 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.review}</p>
                  <p className="typo-body-sm text-white font-semibold">{r.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col" style={{ minHeight: 260 }}>
          <AnimatePresence mode="wait">
            <motion.div key={page} initial="hidden" animate="visible" exit={{ opacity: 0, transition: { duration: 0.12 } }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
              {pageReviews.map((r, i) => {
                const isExpanded = expandedIdx === i;
                return (
                  <motion.div key={`${page}-${i}`} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {isMobile ? (
                      <div className="flex flex-col py-2.5 px-1">
                        <div className="flex items-center">
                          <p className="typo-body-sm text-white font-semibold leading-snug">{r.name}</p>
                          <StarRating rating={r.rating} />
                        </div>
                        <p className="typo-body-sm text-gray-400 mt-1">{r.review}</p>
                      </div>
                    ) : (
                      <div className="grid items-start py-2.5 px-1 gap-4 cursor-pointer transition-colors duration-150" style={{ gridTemplateColumns: "180px 80px 1fr", background: "transparent" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                        onClick={() => setExpandedIdx(isExpanded ? null : i)}
                      >
                        <p className="typo-body-sm text-white font-semibold leading-snug">{r.name}</p>
                        <div className="pt-0.5"><StarRating rating={r.rating} /></div>
                        <p className="typo-body-sm text-gray-400" style={isExpanded ? {} : { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.review}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto pt-3 flex items-center justify-center gap-3">
            <button onClick={() => page > 0 && handlePageChange(page - 1)} className="flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-150" style={{ color: page === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.55)", cursor: page === 0 ? "default" : "pointer" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => handlePageChange(i)} className="rounded-full transition-all duration-200" style={{ width: 8, height: 8, background: i === page ? "#0066ff" : "rgba(255,255,255,0.2)", transform: i === page ? "scale(1.35)" : "scale(1)", boxShadow: i === page ? "0 0 8px rgba(0,102,255,0.55)" : "none", cursor: "pointer" }} />
            ))}
            <button onClick={() => page < totalPages - 1 && handlePageChange(page + 1)} className="flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-150" style={{ color: page === totalPages - 1 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.55)", cursor: page === totalPages - 1 ? "default" : "pointer" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
