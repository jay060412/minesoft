import { useState } from "react";
import { MessagesSquare, Globe, Mail, X, BookOpen, HelpCircle, Trophy, CreditCard, Scale, Lock, Shield, ChevronRight, Award, Crown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ServerConfig } from "../config";

interface FooterProps {
  setView: (view: string) => void;
}

export const Footer = ({ setView }: FooterProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpenModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSupportClick = () => {
    setView("support");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-bg-light border-t border-gray-100 pt-20 pb-10 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">MINESOFT</span>
            </h3>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-6">
              다양한 콘텐츠를 한 곳에서 즐길 수 있는 최고의 종합 서버.
              지금 바로 마인소프트와 함께 무궁무진한 모험을 시작하세요.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href={ServerConfig.links.discordInvite} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                title="공식 디스코드"
              >
                <MessagesSquare className="w-5 h-5" />
              </a>
              <button 
                onClick={() => handleOpenModal("guide")}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                title="서버 가이드"
              >
                <BookOpen className="w-5 h-5" />
              </button>
              <a 
                href={`mailto:${ServerConfig.links.supportEmail}`}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                title="고객 지원 이메일"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-gray-900">바로가기</h4>
            <ul className="space-y-4 text-gray-500 font-medium text-sm">
              <li>
                <button onClick={() => handleOpenModal("guide")} className="hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer">
                  서버 가이드 <ChevronRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenModal("wiki")} className="hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer">
                  위키/도움말 <ChevronRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenModal("ranking")} className="hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer">
                  서버 랭킹 <ChevronRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenModal("donate")} className="hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer">
                  후원하기 <ChevronRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-gray-900">서버 정보</h4>
            <div className="glass p-4 rounded-2xl glow-blue">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Server Address</p>
              <p 
                className="text-sm font-black text-primary select-all cursor-pointer hover:underline"
                onClick={() => {
                  navigator.clipboard.writeText(ServerConfig.serverIp);
                  window.showToast?.(`서버 주소가 클립보드에 복사되었습니다! (${ServerConfig.serverIp})`);
                }}
              >
                {ServerConfig.serverIp}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold text-gray-500">VERSION 1.21.4~26.2 (권장)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © 2026 MINESOFT. All Rights Reserved. 본 서버는 Mojang AB와 무관하며, 독립적으로 운영되는 팬 커뮤니티입니다.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-400 font-semibold">
            <button onClick={() => handleOpenModal("terms")} className="hover:text-gray-700 transition-colors cursor-pointer">이용약관</button>
            <button onClick={() => handleOpenModal("privacy")} className="hover:text-gray-700 transition-colors cursor-pointer">개인정보처리방침</button>
            <button onClick={handleSupportClick} className="hover:text-gray-700 transition-colors cursor-pointer">운영진 문의</button>
          </div>
        </div>
      </div>

      {/* FOOTER DIALOGS / MODALS SYSTEM */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Content Container */}
            <motion.div 
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white rounded-[2.5rem] max-w-lg w-full p-8 shadow-2xl border border-gray-150 relative z-10 flex flex-col focus:outline-none max-h-[85vh] overflow-y-auto"
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 1. SERVER GUIDE MODAL */}
              {activeModal === "guide" && (
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-950">서버 가이드를 확인해보세요!</h3>
                      <p className="text-xs text-gray-400">네트워크 인게임 첫걸음 핵심 요약</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-gray-650 leading-relaxed">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <p className="font-bold text-gray-900 mb-1">🎮 서버 접속 주소</p>
                      <p className="text-xs text-primary font-bold">{ServerConfig.serverIp} (권장 버전: 1.21.4~26.2)</p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <p className="font-bold text-gray-900 mb-2">📜 기본 초보 플로우</p>
                      <ul className="text-xs space-y-1.5 list-disc list-inside text-gray-500 leading-normal">
                        <li>서버에 접속하여 <b>로비 광장</b>에서 튜토리얼을 읽어보세요.</li>
                        <li><b>/menu</b> 명령어를 실행하여 원하는 콘텐츠 서버를 고릅니다.</li>
                        <li>생야생으로 가시려면 <b>/rtp</b>로 안전한 야생 무작위 구역으로 출발하세요.</li>
                        <li>랭크를 올리고 싶다면 <b>PvP 연습장</b>이나 <b>배드워즈</b>에 대기해보세요!</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <p className="font-bold text-gray-900 mb-2">🛠️ 반드시 지켜야 할 기초 비매너 경고</p>
                      <p className="text-xs text-gray-500 leading-normal">
                        타인의 건축물을 훼손(그리핑)하거나 허가되지 않은 클라이언트 핵/핵심 엑스레이 모드 등을 사용 시 계정이 즉각 정지되며, 복구 대상에서 영구 제외됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. WIKI / HELP MODAL */}
              {activeModal === "wiki" && (
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-950">위키 및 게임 도움말</h3>
                      <p className="text-xs text-gray-400">콘텐츠별 유용한 팁과 인게임 명령어</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm max-h-[50vh] overflow-y-auto pr-1">
                    <div className="p-4.5 border border-purple-500/10 bg-purple-500/[0.02] rounded-2xl">
                      <h4 className="font-bold text-purple-700 text-sm mb-1.5">생야생 월드 팁만 모아보기</h4>
                      <p className="text-xs text-gray-500 leading-normal mb-2">
                        마을을 생성하고 땅을 보호할 수 있습니다. 금 블록을 땅에 건설하여 소유 영역을 쉽게 확장하세요.
                      </p>
                      <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-purple-600">
                        <span className="bg-purple-50 px-2 py-0.5 rounded-md">/claim (부지 확인)</span>
                        <span className="bg-purple-50 px-2 py-0.5 rounded-md">/spawn (귀환)</span>
                      </div>
                    </div>

                    <div className="p-4.5 border border-amber-500/10 bg-amber-500/[0.02] rounded-2xl">
                      <h4 className="font-bold text-amber-700 text-sm mb-1.5">배드워즈 전장 상점 룰</h4>
                      <p className="text-xs text-gray-500 leading-normal">
                        상점 상인 앞에서 은, 금, 에메랄드를 바쳐 블록이나 철갑 무구를 교체할 수 있습니다. 아군 침대가 깨지면 다시 회생되지 않으므로 침대 방어막 설계가 생명입니다.
                      </p>
                    </div>

                    <div className="p-4.5 border border-blue-500/10 bg-blue-500/[0.02] rounded-2xl">
                      <h4 className="font-bold text-blue-700 text-sm mb-1.5">PvP 전적 레이팅 정보</h4>
                      <p className="text-xs text-gray-500 leading-normal">
                        전투 승리 시 적의 ElO 점수를 약탈하여 나의 리그 점수가 누적됩니다. 2시즌 마다 특별 등급 달성 선물을 증정합니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. RANKING MODAL */}
              {activeModal === "ranking" && (
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Trophy className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-950">Minesoft 실시간 랭킹</h3>
                      <p className="text-xs text-gray-400">명예의 전당 TOP 5 모험가들</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="p-5 bg-gradient-to-tr from-amber-500/5 to-yellow-500/10 border border-amber-100 rounded-3xl">
                      <p className="font-bold text-gray-800 text-xs flex items-center gap-1 mb-3">
                        <Crown className="w-4 h-4 text-amber-500" />
                        PVP 아레나 ElO 레이팅 리더보드
                      </p>
                      <div className="space-y-2">
                        {[
                          { r: "1", id: "PundoungJaeyoung", pts: "2,481 PTS", icon: true },
                          { r: "2", id: "Mincoding", pts: "2,240 PTS" },
                          { r: "3", id: "Steve_07", pts: "2,192 PTS" },
                          { r: "4", id: "Alex_Mine", pts: "1,980 PTS" },
                          { r: "5", id: "K-PVP_Master", pts: "1,955 PTS" }
                        ].map((user, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs text-gray-700 py-1 border-b border-gray-100/40 last:border-0">
                            <span className="font-mono font-bold flex items-center gap-2">
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black ${
                                idx === 0 ? "bg-amber-100 text-amber-700" :
                                idx === 1 ? "bg-slate-100 text-slate-700" :
                                "text-gray-400"
                              }`}>
                                {user.r}
                              </span>
                              {user.id}
                            </span>
                            <span className="font-mono font-black text-primary">{user.pts}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center">
                      * 수치는 전적 승패 연산에 따라 매 시간 자동으로 동기화됩니다.
                    </p>
                  </div>
                </div>
              )}

              {/* 4. DONATE/SHOP MODAL */}
              {activeModal === "donate" && (
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-950">후원 및 상점 이용</h3>
                      <p className="text-xs text-gray-400">서버 운영 유지를 위한 작은 따뜻한 마음</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm leading-relaxed text-gray-650">
                    <p className="text-xs text-gray-500">
                      마인소프트는 과도한 이득(P2W)성 유료 아이템 판매를 철저히 지양합니다! 플레이에 불이익이 없는 귀엽고 화려한 이펙트와 커스텀 치장 칭호들이 준비되어 있습니다.
                    </p>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <h4 className="font-bold text-gray-950 mb-1.5 text-xs">🎉 공식 후원 방법</h4>
                      <ul className="text-xs list-disc list-inside text-gray-500 space-y-1">
                        <li>정기 구독이나 월정액 없는 영구 평생권으로 제공됩니다.</li>
                        <li>공식 디스코드의 일반 <b>[#후원-안내]</b> 채널에서 가이드를 확인해 주세요.</li>
                        <li>공식 디스코드 내 1:1 문의(티켓) 채널을 개설하여 신속하고 간편하게 신청하실 수 있습니다.</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl flex items-start gap-2.5">
                      <Award className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-emerald-800 text-xs mb-1">서포터즈 특전 혜택</h4>
                        <p className="text-[11px] text-emerald-700 leading-normal">
                          서포터즈 전용 황금 대화 접두사 칭호 및 한정판 날개 오라 효과, 가디언 등급 로비 고유 이펙트가 계정에 영구 활성화됩니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. TERMS OF SERVICE MODAL */}
              {activeModal === "terms" && (
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#0d3b66]/10 text-[#0d3b66] flex items-center justify-center">
                      <Scale className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-950">마인소프트 이용약관</h3>
                      <p className="text-xs text-gray-400">쾌적하고 공정한 게임 이용을 위한 규칙</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs text-gray-500 leading-relaxed max-h-[45vh] overflow-y-auto pr-1">
                    <div>
                      <p className="font-bold text-gray-900 mb-1">제 1 조 (목적)</p>
                      <p>
                        본 약관은 마인소프트 Minecraft 멀티플레이어 서버(이하 "서버")를 이용함에 있어서 운영진과 이용자 사이의 기본적인 권리 및 의무 관계를 규정함을 목적으로 합니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">제 2 조 (이용자의 규범)</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>이용자는 비정상 클라이언트(체킹 툴, 외부 모드, X-ray 등)를 이용해 타 유저나 서버 성능에 방해를 주어서는 안 됩니다.</li>
                        <li>타인에 대한 악의적인 언어폭력, 괴롭힘 및 스캠 사기 거래 훼손 등은 경고 조치 없이 즉시 차단 처리됩니다.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">제 3 조 (후원 처리 정책)</p>
                      <p>
                        모든 후원금은 서비스 하드웨어 회선 증설 등 지속가능한 개발을 위해 전액 환원되어 투명하게 지출되며, 개인의 충동적 변심에 의한 환불 사유 청구는 불가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. PRIVACY POLICY MODAL */}
              {activeModal === "privacy" && (
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#0d3b66]/10 text-[#0d3b66] flex items-center justify-center">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-950">개인정보처리방침</h3>
                      <p className="text-xs text-gray-400">안전하고 신뢰할 수 있게 보호받는 개인정보</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs text-gray-500 leading-relaxed max-h-[45vh] overflow-y-auto pr-1">
                    <div>
                      <p className="font-bold text-gray-900 mb-1">1. 수집하는 최소한의 일관 항목</p>
                      <p>
                        서버는 인게임 닉네임, UUID(마인크래프트 고유식별자), 접속 일시 이외에 그 어떠한 민감 정보(주민번호, 휴대전화 등 일체)도 수집하거나 요구를 하지 않습니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">2. 개인 데이터 수집 목적</p>
                      <p>
                        플레이 데이터 식별 및 비매너 행위 이력을 보정하여 공명정대하게 클라이언트 연산을 검증하기 위한 기록 연계 목적으로만 한정 보관합니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">3. 제3자 비제공의 원칙</p>
                      <p>
                        정당한 권리를 가진 사법 행정기관 외에 그 누구에게도 어떠한 개인 식별 수치를 넘기거나 대여 유출하지 않음을 엄숙히 선포합니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleCloseModal}
                  className="px-6 py-3 bg-gray-950 hover:bg-gray-800 text-white font-black rounded-2xl text-xs shadow-sm transition-colors cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
