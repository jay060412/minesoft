import { motion, AnimatePresence } from "motion/react";
import { Pickaxe, Shield, Sword, Gamepad2, Info, X, CheckSquare, Zap, Trophy, ShieldAlert, Coins } from "lucide-react";
import React, { useState, useEffect } from "react";

// @ts-ignore
import lobbyImg from "../assets/images/로비.png";
// @ts-ignore
import survivalImg from "../assets/images/야생서버.png";
// @ts-ignore
import bedwarsImg from "../assets/images/배드워즈.png";
// @ts-ignore
import screenshotImg from "../assets/images/스크린샷 2026-05-23 003752.png";

interface Server {
  title: string;
  description: string[];
  icon: React.ReactNode;
  color: string;
  image: string;
  details: {
    subtitle: string;
    highlights: { title: string; desc: string; icon: React.ReactNode }[];
    fullDesc: string;
    specs: { label: string; value: string }[];
  };
}

interface ServerCardProps {
  server: Server;
  onOpen: () => void;
  index: number;
  key?: React.Key;
}

const ServerCard = ({ server, onOpen, index }: ServerCardProps) => (
  <motion.div
    layoutId={`server-container-${server.title}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      layout: { type: "spring", stiffness: 220, damping: 18, mass: 1.1 },
      default: { duration: 0.5, delay: index * 0.1 }
    }}
    whileHover={{ y: -8, scale: 1.01 }}
    onClick={onOpen}
    className="relative group h-full flex flex-col cursor-pointer"
  >
    <div className={`absolute inset-0 bg-linear-to-br ${server.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl blur-md`} />
    <div className="relative h-full glass rounded-3xl glow-blue transition-all duration-300 flex flex-col overflow-hidden">
      <div className="aspect-video w-full overflow-hidden border-b border-white/20 relative">
        <img 
          src={server.image} 
          alt={server.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/90 shadow-sm text-primary backdrop-blur-xs z-10">
          {server.icon}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow items-start gap-5">
        <div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">
            {server.title}
          </h3>
          <ul className="space-y-2.5">
            {server.description.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-500 group-hover:text-gray-700 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                <span className="text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="mt-auto pt-4 text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          자세히 보기 <Gamepad2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

export const ServerList = () => {
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  // Prevent scroll when overlay is active
  useEffect(() => {
    if (selectedServer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedServer]);

  const servers: Server[] = [
    {
      title: "로비 서버",
      description: ["서버 이동 및 안내", "유저 친화적 UI", "추천코인 타 서버 환전", "정보 센터"],
      icon: <Info className="w-6 h-6" />,
      color: "from-[#8bb8e8] to-[#5a9ad4]",
      image: lobbyImg,
      details: {
        subtitle: "모든 모험이 시작되는 마인소프트의 허브 광장",
        fullDesc: "마인소프트의 심장부로 모든 여행자들이 처음 도달하는 광장입니다. 이곳에서 실시간 서버 상태와 튜토리얼을 확인할 수 있으며, 다른 콘텐츠 서버로의 실시간 이동이 가능합니다.",
        highlights: [
          { title: "로비 추천코인 환전", desc: "서버 추천코인을 얻어 다른 게임 서버 전용 화폐로 손쉽게 환전 및 연동할 수 있습니다.", icon: <Coins className="w-5 h-5 text-blue-500" /> },
          { title: "서버 게이트웨이", desc: "로비 중심부의 차원문을 타거나 가이드 UI를 통해 지연 없는 실시간 채널이동을 할 수 있습니다.", icon: <Zap className="w-5 h-5 text-amber-500" /> },
          { title: "다이내믹 파쿠르", desc: "도전적인 아기자기 파쿠르 맵이 로비 구석구석 배치되어 지루할 틈이 없습니다.", icon: <Trophy className="w-5 h-5 text-purple-500" /> },
        ],
        specs: [
          { label: "권장 버전", value: "1.21.4~26.2" },
          { label: "서버 특징", value: "채널 허브 / 튜토리얼 / 미니게임" },
          { label: "추천 환전", value: "추천코인 획득 후 다른 서버 환전 가능" }
        ]
      }
    },
    {
      title: "생야생 서버",
      description: ["유튜버 뿐둥재영 운영", "랜덤 좌표 시작", "핵/X-ray/프리캠 차단", "최적화 환경"],
      icon: <Pickaxe className="w-6 h-6" />,
      color: "from-[#57b8ff] to-[#2176ae]",
      image: survivalImg,
      details: {
        subtitle: "유튜버 '뿐둥재영'과 함께 가꾸는 리얼 생야생 월드",
        fullDesc: "마인크래프트 오리지널 서바이벌의 장엄함과 최상의 보안 패치가 만나 안심하고 탐험할 수 있는 생야생 월드입니다. 크리에이터뿐만 아니라 일반 플레이어도 함께 자유롭고 평화롭게 마을을 구축할 수 있습니다.",
        highlights: [
          { title: "공정한 야생 출발", desc: "/rtp(랜덤 전송) 명령어로 스포너 선점 및 독점을 방지하고 공정한 야생 생존을 즐겨보세요.", icon: <Pickaxe className="w-5 h-5 text-emerald-500" /> },
          { title: "X-ray, 프리캠 및 핵 차단", desc: "정밀 보안 패치와 모니터링을 통해 무단 X-ray는 물론, 프리캠(Freecam) 및 각종 악성 핵 행위를 철저하게 원천 차단합니다.", icon: <ShieldAlert className="w-5 h-5 text-rose-500" /> },
          { title: "최상의 최적화 시스템", desc: "렉을 완화하는 멀티 테넌트 연산 분할 설계로 동접자가 늘어나도 고품질 로딩 속도를 유지합니다.", icon: <Zap className="w-5 h-5 text-sky-500" /> },
        ],
        specs: [
          { label: "운영자", value: "뿐둥재영 (유튜버)" },
          { label: "권장 버전", value: "1.21.4~26.2" },
          { label: "안티 치트", value: "X-ray, 프리캠 및 핵 완벽 감지 차단" }
        ]
      }
    },
    {
      title: "배드워즈 서버",
      description: ["자체 제작 맵 다수", "최신 아이템 대거 추가", "팀 플레이 시스템", "빠른 매칭"],
      icon: <Shield className="w-6 h-6" />,
      color: "from-[#2176ae] to-[#0d3b66]",
      image: bedwarsImg,
      details: {
        subtitle: "지능적인 팀 배틀과 흥미진진한 침대 폭파 전쟁",
        fullDesc: "자신의 침대를 수호하면서 상대 팀의 침대를 폭파시키는 미니게임의 절대 강자 배드워즈입니다. 마인소프트만의 수려한 디자인과 부드러운 전투 메커니즘을 제공합니다.",
        highlights: [
          { title: "자체 제작 맵 다수 추가", desc: "서버 운영자가 직접 공들여 만든 대칭형 밸런스 맵 다수가 상시 대기 중입니다.", icon: <Shield className="w-5 h-5 text-indigo-500" /> },
          { title: "최신 아이템 다수 추가", desc: "최신 마인크래프트 업데이트 아이템들을 폭넓게 추가하여 다양한 전술을 펼칠 수 있습니다.", icon: <CheckSquare className="w-5 h-5 text-cyan-500" /> },
          { title: "다채로운 플레이 리그", desc: "한가롭게 즐기는 캐주얼 매치부터 랭커를 향한 강렬한 팀워크 4v4 전술까지 즉시 매칭됩니다.", icon: <Trophy className="w-5 h-5 text-yellow-500" /> },
        ],
        specs: [
          { label: "제작 맵", value: "서버 운영자가 직접 만든 맵 다수 추가" },
          { label: "권장 버전", value: "1.21.4~26.2" },
          { label: "아이템 지원", value: "최신 아이템 다수 추가 탑재" }
        ]
      }
    },
    {
      title: "PVP 연습 서버",
      description: ["일대일 매칭 시스템", "고도화된 PVP 봇", "최신 버전 전투 지원", "랭크 시스템"],
      icon: <Sword className="w-6 h-6" />,
      color: "from-[#57b8ff] to-[#2176ae]",
      image: screenshotImg,
      details: {
        subtitle: "모든 컨트롤의 끝, 한계를 극복하는 전사들을 위한 성지",
        fullDesc: "전투 실력을 가다듬고 상대와 명예롭게 겨룰 수 있는 PvP 연습장입니다. 정교하게 다듬어진 MMR 랭킹 대전과 끝없는 전투 감각을 익힐 수 있는 FFA 난투, 고도로 지능화된 보스와 봇을 체험하세요.",
        highlights: [
          { title: "실시간 랭크 매치메이킹", desc: "자신과 실력이 정교하게 비슷한 게이머를 매칭하여 불필요한 양학을 방지하고 재미있는 경쟁을 제공합니다.", icon: <Trophy className="w-5 h-5 text-amber-600" /> },
          { title: "고도화된 PVP 봇 시스템", desc: "실제 숙련된 플레이어처럼 무빙하고 판단하는 고도화된 PVP AI 봇과 시시각각 모의 대련을 연습할 수 있습니다.", icon: <Sword className="w-5 h-5 text-red-500" /> },
          { title: "정교한 경쟁 랭크 시스템", desc: "아이언 티어부터 출발하여 최고 정점 챌린저까지 오르는 세분화된 랭킹 경쟁의 짜릿함을 선사합니다.", icon: <Info className="w-5 h-5 text-indigo-500" /> },
        ],
        specs: [
          { label: "랭크 티어", value: "아이언부터 챌린저까지 세분화" },
          { label: "권장 버전", value: "1.21.4~26.2" },
          { label: "대련 연습", value: "고도화된 PVP 봇 지능형 탑재" }
        ]
      }
    }
  ];

  return (
    <section className="py-24 bg-bg-light relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-black mb-4 tracking-tight"
          >
            즐길 거리가 <span className="text-primary italic">가득한</span> 서버
          </motion.h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6" />
          <p className="text-gray-500 max-w-xl">
            MINESOFT만의 유니크한 콘텐츠와 쾌적한 플레이 환경에서 <br />
            당신만의 이야기를 만들어보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servers.map((server, index) => (
            <ServerCard
              key={index}
              server={server}
              onOpen={() => setSelectedServer(server)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Apple-style Expanded Card Modal */}
      <AnimatePresence>
        {selectedServer && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedServer(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 pointer-events-auto"
            />

            {/* Apple Card Container */}
            <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-8 md:py-16 flex justify-center items-start pointer-events-none">
              <motion.div
                layoutId={`server-container-${selectedServer.title}`}
                className="w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl pointer-events-auto overflow-hidden relative flex flex-col focus:outline-none border border-gray-200"
                transition={{ type: "spring", stiffness: 220, damping: 18, mass: 1.1 }}
                style={{ willChange: "transform" }}
              >
                {/* Header Image section */}
                <div className="relative aspect-video md:h-80 w-full overflow-hidden">
                  <img
                    src={selectedServer.image}
                    alt={selectedServer.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-white/10 to-black/30" />
                  
                  {/* Apple Style Close Button */}
                  <button
                    onClick={() => setSelectedServer(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-20"
                    aria-label="닫기"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-6 left-8 right-8 z-10">
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 filter drop-shadow-xs">
                      {selectedServer.title}
                    </h3>
                    <p className="text-gray-800 font-bold text-sm md:text-base filter drop-shadow-xs">
                      {selectedServer.details.subtitle}
                    </p>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 md:p-10 space-y-8 max-h-[60vh] md:max-h-none overflow-y-auto md:overflow-visible">
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-800">서버 소개</h4>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {selectedServer.details.fullDesc}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-800">핵심 하이라이트</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {selectedServer.details.highlights.map((hlt, idx) => (
                        <div key={idx} className="bg-gray-50/80 border border-gray-100 p-5 rounded-2xl flex flex-col items-start gap-3">
                          <div className="p-3 bg-white shadow-xs rounded-xl">
                            {hlt.icon}
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-800 text-sm mb-1">{hlt.title}</h5>
                            <p className="text-gray-500 text-xs leading-relaxed">{hlt.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specification Panel */}
                  <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200/50">
                      {selectedServer.details.specs.map((spec, idx) => (
                        <div key={idx} className={`flex flex-col gap-1 ${idx > 0 ? "md:pl-6 pt-4 md:pt-0" : ""}`}>
                          <span className="text-xs font-bold text-gray-400">{spec.label}</span>
                          <span className="text-sm font-bold text-gray-700">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

