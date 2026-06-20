import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, HelpCircle, Gift, Zap, ShieldAlert, Check, ExternalLink, Lock } from "lucide-react";
import { ServerConfig } from "../config";

interface BenefitItem {
  text: string;
  isStrong?: boolean;
}

interface TierInfo {
  name: string;
  price: string;
  period: string;
  badgeColor: string;
  badgeBg: string;
  textColor: string;
  glowColor: string;
  desc: string;
  primaryPerk: string;
  benefits: BenefitItem[];
  borderColor: string;
  iconBg: string;
  iconColor: string;
  isComingSoon?: boolean;
}

export const Donate = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const tiers: TierInfo[] = [
    {
      name: "VIP",
      price: "6,005원", // 6,000원
      period: "평생 소장 / 단판 결제",
      badgeColor: "text-blue-600",
      badgeBg: "bg-blue-50",
      textColor: "text-blue-700",
      glowColor: "shadow-blue-500/[0.04] hover:shadow-blue-500/15",
      borderColor: "border-slate-150 hover:border-blue-200",
      desc: "단 한 번의 편리한 기부로 평생 유지되는 마인소프트 기본 등급입니다.",
      primaryPerk: "인게임 VIP 전용 칭호 부여 및 로비 비행권 평생 제공",
      benefits: [
        { text: "칭호 지급 (VIP 고유 칭호 및 디스코드 전용 역할 제공)", isStrong: true },
        { text: "서버 인원 제한 무시 (서버가 꽉 찬 상태에서도 다이렉트 우선 슬롯 접속 가능)", isStrong: true },
        { text: "wild서버에서 커스텀 코스튬 기능 제공 (전용 외형/장식 자유 자재 커스터마이징 가능)", isStrong: true },
        { text: "메인로비에서 /fly 기능 제공 (로비 허브 내 영구 비행 유틸리티 보장)", isStrong: true },
      ],
      iconBg: "bg-blue-100/80",
      iconColor: "text-blue-600"
    },
    {
      name: "MVP",
      price: "20,000원",
      period: "평생 소장 / 단판 결제",
      badgeColor: "text-amber-600",
      badgeBg: "bg-amber-50",
      textColor: "text-amber-700",
      glowColor: "shadow-amber-500/[0.03]",
      borderColor: "border-slate-100 opacity-60",
      desc: "더욱 강력하고 풍성한 보장이 제공될 마인소프트 최상위 전용 보상 등급입니다.",
      primaryPerk: "추후 대공개 예정 - 잠시만 기다려주세요!",
      benefits: [
        { text: "상세 기능은 공개 시점에 전면 공개 예정" },
        { text: "VIP 혜택 전면 귀속 연계형 사양 설계 진행 중" }
      ],
      iconBg: "bg-amber-100/50",
      iconColor: "text-amber-500",
      isComingSoon: true
    },
    {
      name: "커스텀 태그",
      price: "30,000원",
      period: "평생 소장 (이후 변경 시 회당 4,000원)",
      badgeColor: "text-purple-600",
      badgeBg: "bg-purple-50",
      textColor: "text-purple-700",
      glowColor: "shadow-purple-500/[0.04] hover:shadow-purple-600/15",
      borderColor: "border-purple-150 hover:border-purple-250",
      desc: "채팅창에 나만의 개성을 한껏 살려 직접 설계한 문구와 RGB 색상을 평생 사용하는 칭호권입니다.",
      primaryPerk: "직접 주문제작하는 RGB 그라데이션 고유 전용 태그 평생 채팅 적용",
      benefits: [
        { text: "원하는 글자 수 및 RGB 그라데이션 적용 커스텀 칭호 평생 활성화", isStrong: true },
        { text: "최초 1회 전면 무료 세팅 제공 및 이후 변경 시 건당 4,000원의 교체 수수료 발생", isStrong: true },
        { text: "⚠️ [약관] 서버 운영자/관리자로 타 유저를 혼동하게 만드는 칭호 문구 장착 불가", isStrong: true },
        { text: "⚠️ [약관] 서버 채팅 규정을 위반하는 욕설, 비방, 외설 문구 적용 불가", isStrong: true },
        { text: "⚠️ VIP, MVP 등의 다른 특별 등급 권한(비행, 대기열 우회 등) 없이 오직 커스텀 태그만 단독 지급", isStrong: true }
      ],
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  const donationFaqs = [
    {
      q: "후원금은 어떻게 사용되나요?",
      a: "전달해주신 후원 기부금은 마인소프트 서버 유지 및 확장 비용(회선 증설, 고사양 호스트 장비 업그레이드), 최적화 안티 치트 모니터링 라이선스 갱신 결제, 그리고 새로운 시즌의 양질의 콘텐츠 개발을 위해 전액 투명하게 재투자됩니다.",
    },
    {
      q: "후원 후 등급 칭호 적용까지 시간이 얼마나 소요되나요?",
      a: "가장 신속한 확인을 위해 후원 양식 접수 후 등급 적용은 입금 및 이력 정보가 일치할 때, 관리자가 실시간 조회 후 늦어도 수 시간 내 전면 인게임과 디스코드에 동기화가 적용됩니다. 혹여 오류로 누락된 경우 고객센터 1:1 문의나 디스코드로 접수하면 완벽 복원해드립니다.",
    },
    {
      q: "후원 유효 기간이 인게임 월정액 형식인가요?",
      a: "아닙니다! 마인소프트 서버의 서포터(VIP, MVP, 커스텀 태그) 플랜은 매달 결제 해야 하는 번거로운 정기 구독/월정액 방식이 절대 아닙니다. 오직 단 한 번의 투명 후원만으로 영구히 유지되는 영구 평생권입니다. (단, 커스텀 태그의 경우 최초 1회 무료 지정 이후에 새로운 칭호 문구로 또다시 교체하기를 원하실 때만 건당 4,000원의 교정 수수료가 청구됩니다.)",
    },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles className="w-4.5 h-4.5 animate-spin-slow text-secondary" />
              Sponsorship Overview
            </div>
            <h2 className="text-4xl font-black text-gray-950 mb-4 tracking-tight">MINESOFT 후원 안내</h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
              마인소프트를 지원하고 평생 누리는 전용 혜택을 획득해보세요.
              정기 구독이 아닌 영구 평생권으로 구성되어 있습니다.
            </p>
          </div>

          {/* Pricing Grid - Smoothly 3-Columns Layout */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {tiers.map((tier) => {
              const isVIP = tier.name === "VIP";
              const displayPrice = isVIP ? "6,000원" : tier.price;
              
              return (
                <motion.div
                  key={tier.name}
                  whileHover={tier.isComingSoon ? {} : { y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`bg-white rounded-[2.5rem] border ${tier.borderColor} p-8 flex flex-col justify-between transition-all relative overflow-hidden shadow-xs ${
                    tier.isComingSoon ? "shadow-none bg-slate-50/50" : "hover:shadow-lg " + tier.glowColor
                  }`}
                >
                  {tier.isComingSoon && (
                    <div className="absolute inset-0 bg-slate-950/5 backdrop-blur-xs flex flex-col items-center justify-center z-10 text-center p-6">
                      <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-600 mb-3 animate-pulse">
                        <Lock className="w-5 h-5" />
                      </div>
                      <h4 className="font-extrabold text-gray-950 text-base mb-1">MVP 등급 추후 공개</h4>
                      <p className="text-gray-400 text-xs">더욱 다채로운 소장 혜택으로 찾아옵니다</p>
                    </div>
                  )}

                  <div>
                    {/* Tier Name */}
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className={`px-4 py-1.5 rounded-xl ${tier.badgeBg} ${tier.badgeColor} text-xs font-black tracking-tighter`}>
                        {tier.name}
                      </span>
                    </div>

                    {/* Price Tag */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-4xl font-black text-gray-950 tracking-tight">{displayPrice}</span>
                      <span className="text-gray-400 font-bold text-xs">/ {tier.period}</span>
                    </div>

                    <p className="text-gray-500 text-xs leading-relaxed mb-6">{tier.desc}</p>

                    {/* Highly highlighted core perk */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50 mb-6 text-xs flex items-start gap-2.5">
                      <Zap className={`w-5 h-5 shrink-0 text-primary`} />
                      <span className="font-bold text-gray-800 leading-normal">{tier.primaryPerk}</span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100 mb-6" />

                    {/* Perk List */}
                    <h4 className="text-xs font-black text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-primary" />
                      전용 보상 및 명세
                    </h4>
                    <ul className="space-y-3 mb-8">
                      {tier.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs text-gray-550 leading-relaxed">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${tier.iconBg} ${tier.iconColor}`}>
                            <Check className="w-2.5 h-2.5 stroke-[4]" />
                          </div>
                          <span className={benefit.isStrong ? "font-bold text-gray-900" : ""}>{benefit.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={ServerConfig.links.discordInvite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-2xl font-black text-xs md:text-sm text-center flex items-center justify-center gap-2 transition-all ${
                      tier.name === "VIP" 
                        ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                        : tier.name === "커스텀 태그"
                        ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                        : "bg-slate-100 text-gray-400 pointer-events-none"
                    }`}
                  >
                    <span>{tier.name === "MVP" ? "추후 대공개" : `${tier.name} 후원 신청하기`}</span>
                    {!tier.isComingSoon && <ExternalLink className="w-3.5 h-3.5" />}
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Refund Notice & Guide info */}
          <div className="bg-red-500/[0.02] border border-red-500/10 rounded-[2rem] p-8 mb-16 flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-extrabold text-red-950 text-sm mb-2">🚨 후원 협찬 시 유의사항 필독 규정</h4>
              <p className="text-xs text-red-800/90 leading-relaxed space-y-1 mb-3">
                마인소프트의 모든 기부 신청은 주체적인 서버 환경 개선 동행으로 분류되며, 정액제가 아닌 영구 혜택권입니다. 충동적인 결제 후 단순 불이익 번복에 의한 기부 환불은 시스템상 지원하지 않습니다.
              </p>
              <div className="p-4 bg-white/70 border border-red-500/10 rounded-xl space-y-1.5 text-xs text-gray-700 font-medium">
                <p className="font-extrabold text-red-900">⚠️ 커스텀 태그 및 칭호 제한 약관:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-[11px] leading-normal">
                  <li><b>서버 운영자/관리자</b>로 타 플레이어를 오도하거나 인식을 교란시킬 여지가 있는 태그는 사용이 엄격히 제재됩니다.</li>
                  <li>욕설, 비하 비방, 외설 혹은 <b>서버 채팅규정</b>에 정해진 사회 윤리적 원칙을 위반하는 문구 배열은 생성을 허용하지 않습니다.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="text-primary w-6 h-6" />
              <h3 className="text-2xl font-bold">후원 관련 자주 묻는 질문 (FAQ)</h3>
            </div>

            <div className="space-y-4">
              {donationFaqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-150 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-bold text-gray-800 text-sm md:text-base flex items-center gap-3">
                      <span className="text-primary font-black font-mono">Q.</span>
                      {faq.q}
                    </span>
                    <span className={`text-xl font-bold text-gray-400 transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}>
                      {"▼"}
                    </span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${
                    activeFaq === idx ? "max-h-[350px] border-t border-gray-100" : "max-h-0"
                  }`}>
                    <p className="p-6 text-xs md:text-sm text-gray-500 leading-relaxed whitespace-pre-line bg-slate-50/20">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
