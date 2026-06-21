import { motion, AnimatePresence } from "motion/react";
import { Terminal, Copy, Search, Layout, Compass, HelpCircle } from "lucide-react";
import { useState } from "react";

interface CommandItem {
  cmd: string;
  desc: string;
}

interface CommandGroup {
  category: "LOBBY" | "WILD";
  title: string;
  desc: string;
  icon: any;
  commands: CommandItem[];
}

const COMMAND_GROUPS: CommandGroup[] = [
  {
    category: "LOBBY",
    title: "LOBBY",
    desc: "메인 로비 허브 및 전체 서버에서 조작 가능한 기본 명령어와 소통 유틸리티",
    icon: Layout,
    commands: [
      { cmd: "/menu", desc: "서버 전체의 월드 콘텐츠와 핵심 설정 화면을 모아볼 수 있는 메인 통합 메뉴창을 호출합니다." },
      { cmd: "/lobby", desc: "어느 장소에서든 메인 로비 허브 서버로 즉시 이동합니다." },
      { cmd: "/fly", desc: "메인 로비 허브 지대에서 중력을 극복하고 공중 비행 모드를 활성화 및 제어합니다. (VIP 이상 전용)" },
      { cmd: "/report", desc: "비매너 유저나 시스템 악용 의심 대상을 즉각 신고 제보합니다." },
      { cmd: "/한글채팅", desc: "영어로 타자 입력 시 자동 번역 한글 채팅으로 출력되도록 전환하거나 원래대로 취소합니다." },
      { cmd: "/vote", desc: "마인소프트 일일 공식 추천을 진행하고 소정의 추천코인 보상을 획득합니다." },
    ]
  },
  {
    category: "WILD",
    title: "WILD",
    desc: "야생 생존 모험, 텔레포트, 코어 블록 조회 및 소집 팀(Team) 관리용 명세 가이드",
    icon: Compass,
    commands: [
      { cmd: "/rtp", desc: "야생 미지 월드의 안전하고 비어있는 임의 무작위 좌표로 딜레이 없이 즉시 워프 순간이동합니다." },
      { cmd: "/tpa <플레이어>", desc: "대상 플레이어로 지정된 위치까지 텔레포트 이동 동선을 긴급 요청 형식으로 송출합니다." },
      { cmd: "/tpahere <플레이어>", desc: "대상 플레이어가 현재 내가 서 있는 좌표 지점으로 직접 텔레포트 이동하도록 호출(소환)을 신청합니다." },
      { cmd: "/tpaccept", desc: "전송받아 대기 중인 동료 플레이어들의 온갖 tp 이동 요청을 즉시 수락하고 통과시킵니다." },
      { cmd: "/tpaignore <플레이어>", desc: "전송 신청된 해당 플레이어의 텔레포트 수락 승인 요구를 단번에 패스하고 무시합니다." },
      { cmd: "/sethome <이름>", desc: "현재 서 있는 모험 서바이벌 구역을 지정 홈명 이름을 가진 귀환 홈 장소로 제작하여 영구 보존합니다." },
      { cmd: "/home <이름>", desc: "자신이 미리 제작해둔 특정 홈 이름 위치로 차원 대기열 없이 즉각 텔레포트 귀환합니다." },
      { cmd: "/homes", desc: "자기 홈 리스트에 등록하여 동기화 세팅된 활성 홈 이름들을 모두 조회하고 확인합니다." },
      { cmd: "/delhome <이름>", desc: "세팅하여 사용되지 않는 구 버전 홈 명의 등록 내역을 완전히 제거하고 지웁니다." },
      { cmd: "/co i", desc: "블록 파괴 및 설치 모니터 검사기(CoreProtect) 로그 도구를 켜거나 끄는 토글을 활성화합니다." },
      { cmd: "/ignore <플레이어>", desc: "특정 플레이어가 발신하는 인게임 채팅 대화를 보이지 않게 감추고 차단/무시합니다." },
      { cmd: "[inv]", desc: "자신이 현재 수납 중인 소지품 인벤토리를 인게임 채팅창에 실시간으로 시각 링크 공유합니다." },
      { cmd: "[e]", desc: "개인 금고인 엔더상자의 품목 명세 상황을 실시간 채팅창에 아름답게 공유합니다." },
      { cmd: "[i]", desc: "현재 자신의 오른손에 장착 중인 무기/아이템의 도구 명과 옵션을 인게임 채팅창에 투명하게 공유합니다." },
      { cmd: "@<플레이어>", desc: "대상 플레이어 닉네임을 태그하여 멘션 피드백 알림을 송출합니다." },
      
      { cmd: "/team create [ 이름 ]", desc: "자신이 군주가 되어 야생에서 함께할 새로운 고유 파티 팀을 생성 제작합니다." },
      { cmd: "/team invite [ 유저 닉네임 ]", desc: "특정 플레이어 닉네임 유저를 우리 팀 대열로 신속하게 초대 제안합니다." },
      { cmd: "/team open", desc: "사전 인증이나 허가가 없어도 누구나 자유롭게 우리 팀에 조인할 수 있게 오픈 공개 설정합니다." },
      { cmd: "/team join [ 팀 이름 ]", desc: "현재 오픈되어 개방된 타 팀에 바로 즉시 소속원으로 가입 접수합니다." },
      { cmd: "/team leave", desc: "현재 자신이 가담하여 전우애를 나눈 기존 소속 팀을 영구 탈퇴하여 떠납니다." },
      { cmd: "/team disband", desc: "동일 명령어를 2회 연속 입력 시 완전히 팀을 파쇄 배제해체합니다." },
      { cmd: "/team list", desc: "규모 크기 및 소속원 수가 많은 순위 역순대로 전체 활성 팀 리스트 목록을 열람합니다." },
      { cmd: "/team setowner [ 팀원 ]", desc: "권력 및 리더 지위를 전권 양도하여 해당 소속 팀원을 우리 팀의 새로운 정식 대표 리더로 등록합니다." },
      { cmd: "/team info [ 팀원 ]", desc: "지정된 팀원에 대조되는 팀의 세부 상세 구성 데이터 정보를 모아봅니다." },
      { cmd: "/team chat [ 메세지 ]", desc: "일반 플레이어들에게 공인 노출되지 않는 고유 전용 팀 채널 내부에서 극비 모의 대화를 나눕니다." },
      { cmd: "/team setwarp", desc: "모든 팀원이 동일하게 언제나 도달할 수 있는 패스 지정 고유 공유 워프 요소를 지정 건설합니다." },
      { cmd: "/team warp [ 이름 ]", desc: "기록되어 있는 지정 워프 지점 좌표로 아레나 대기열 없이 다이렉트 순간이동합니다." },
      { cmd: "/team delwarp [ 이름 ]", desc: "더는 무력 가치가 없는 워프 지점 기록의 기억을 지우고 깨끗이 삭제합니다." },
      { cmd: "/team echest", desc: "클랜 공유 계정형 가방 격인 팀 상자 보관함을 열어 수납 자원을 투명하게 거래 유용합니다." },
      { cmd: "/team name [ 이름 ]", desc: "부여되어 있던 기존 우리 팀의 직급 표기명 타이틀 이름을 역동적으로 바꿉니다." },
      { cmd: "/team color [ 색깔 ]", desc: "팀명이 풍기는 다이내믹 아이덴티티 색상을 원하는 다른 광원 색깔로 변경합니다." },
      { cmd: "/team pvp", desc: "팀원 상호 간 칼날이 들어가는 친선 사태(pvp) 판정을 활성 또는 비활성 상태로 상시 토글 변경합니다." },
    ]
  }
];

export const Commands = () => {
  const [activeTab, setActiveTab] = useState<"ALL" | "LOBBY" | "WILD">("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    window.showToast?.(`명령어가 복사되었습니다: ${text}`);
  };

  const filteredGroups = COMMAND_GROUPS
    .filter(group => activeTab === "ALL" || group.category === activeTab)
    .map(group => ({
      ...group,
      commands: group.commands.filter(c => 
        c.cmd.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.desc.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(group => group.commands.length > 0);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-4">
              <HelpCircle className="w-4.5 h-4.5 text-secondary" />
              Minesoft Commands Wiki
            </div>
            <h2 className="text-4xl font-black text-gray-950 mb-4 tracking-tight">위키 / 도움말</h2>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed text-sm md:text-base">
              마인소프트 월드에서 사용되고 있는 필수 명령어를 LOBBY와 WILD 범주별로 모았습니다.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative mb-10">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input 
              type="text" 
              placeholder="궁금한 명령어 혹은 수식 가이드를 검색해보세요... (/spawn, 홈, tpa 등)"
              className="w-full pl-14 pr-6 py-4.5 bg-white border border-gray-150 rounded-2xl focus:ring-4 focus:ring-primary/10 hover:border-gray-300 outline-none text-gray-800 font-medium transition-all shadow-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Tabs System (LOBBY and WILD only) */}
          <div className="flex justify-center p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto mb-14 border border-slate-200/50">
            {[
              { id: "ALL", label: "전체 보기" },
              { id: "LOBBY", label: "로비 (LOBBY)" },
              { id: "WILD", label: "야생 (WILD)" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all cursor-pointer select-none ${
                    isActive 
                      ? "bg-white text-gray-950 shadow-sm" 
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Help Categories Listings */}
          <div className="space-y-16">
            <AnimatePresence mode="popLayout">
              {filteredGroups.map((group, groupIdx) => (
                <motion.div 
                  key={group.category}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, delay: groupIdx * 0.05 }}
                  className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xs"
                >
                  {/* Category Card Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-2xl bg-linear-to-tr ${
                      group.category === "LOBBY" 
                        ? "from-blue-500 to-indigo-500 text-white" 
                        : "from-emerald-500 to-teal-500 text-white"
                    } flex items-center justify-center`}>
                      <group.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-950 tracking-tight">{group.title}</h3>
                      <p className="text-xs text-gray-400 font-semibold">{group.desc}</p>
                    </div>
                  </div>

                  {/* Commands Sub-Grid */}
                  <div className="space-y-4">
                    {group.commands.map((command, cmdIdx) => (
                      <div 
                        key={cmdIdx}
                        className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100/60 hover:bg-slate-50 hover:border-slate-200/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 shrink-0 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Terminal className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <span className="font-mono text-base font-extrabold text-primary tracking-tight select-all">
                              {command.cmd}
                            </span>
                            <p className="text-xs text-gray-550 leading-relaxed font-semibold mt-1">
                              {command.desc}
                            </p>
                          </div>
                        </div>

                        <button 
                          onClick={() => copyToClipboard(command.cmd)}
                          className="self-end sm:self-center px-4.5 py-2.5 rounded-xl bg-white border border-slate-200/80 hover:bg-gray-950 hover:border-gray-950 hover:text-white font-extrabold text-xs text-gray-600 shadow-2xs hover:shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>명령어 복사</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {filteredGroups.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-250"
                >
                  <p className="text-gray-400 font-bold text-sm">해당 단어가 포함된 명령어 또는 도움말이 존재하지 않습니다.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
