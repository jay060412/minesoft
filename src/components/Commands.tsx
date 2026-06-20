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
    desc: "메인 로비 허브에서 조작 가능한 편의 명령 전자기기 모음",
    icon: Layout,
    commands: [
      { cmd: "/menu", desc: "서버 전체의 월드 콘텐츠와 핵심 설정화면을 모아볼 수 있는 메인 통합 메뉴창을 호출합니다." },
      { cmd: "/추천", desc: "도움이 되는 마인소프트 일일 공식 추천을 실행하고 추천 혜택 패키지를 상시 수령합니다." },
      { cmd: "/fly", desc: "메인 로비 허브 지대에서 중력을 극복하고 공중 비행 모드를 활성화 및 제어합니다. (VIP 이상 전용)" },
      { cmd: "/spawn", desc: "어디에서나 마인소프트 대형 로비 시네마틱 스폰 광장 중심 원점으로 즉각 이동합니다." },
      { cmd: "/후원", desc: "수호 서포터 요건 요람, 평생 결제 상점 수치 정보 알림 채널 바로가기 정보를 표시합니다." },
    ]
  },
  {
    category: "WILD",
    title: "WILD",
    desc: "야생 월드의 드넓은 탐험과 자원 연산을 위한 필수 실시간 연령대 조작 가이드",
    icon: Compass,
    commands: [
      { cmd: "/rtp", desc: "야생 미지 월드의 안전하고 비어있는 임의 무작위 좌표로 딜레이 없이 즉시 워프 순간이동합니다." },
      { cmd: "/sethome [이름]", desc: "현재 자신이 모험 구축한 영역의 정확한 좌표를 지정 홈명으로 영구 안전 보존 저장합니다." },
      { cmd: "/home [이름]", desc: "자신이 세팅하여 등록 완료한 지정 집 주소 위치까지 시간 소모 없이 즉각 귀환합니다." },
      { cmd: "/tpa [유저]", desc: "친한 길드 친구나 함께 집을 지을 모험 파트너 유저 좌표로 워프 소환해달라는 인가를 송출합니다." },
      { cmd: "/tpaccept", desc: "전송받아 대기 중인 동료 유저의 온갖 tpa 이동 희망 권한 요청을 쾌히 수락 승인합니다." },
      { cmd: "/돈", desc: "현재 야생에서 농사, 사냥, 자원 발굴, 경매 판매 등으로 취득한 자신의 총 에코 재화 잔액을 조회합니다." },
      { cmd: "/돈 보내기 [유저] [금액]", desc: "자신과 동고동락하는 타인 마인크래프트 계정으로 재화 머니의 특정 분량을 에어로 송금 배송합니다." },
      { cmd: "/ah", desc: "야생 글로벌 경매 마켓을 활짝 소환하여 갖고픈 유물 장비나 자재 블록들을 거래 입찰 판매합니다." },
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
