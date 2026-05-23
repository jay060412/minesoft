import { motion } from "motion/react";
import { Terminal, Copy, Search } from "lucide-react";
import { useState } from "react";

const COMMAND_GROUPS = [
  {
    category: "기본 명령어",
    commands: [
      { cmd: "/추천", desc: "서버를 추천하고 보상을 받습니다." },
      { cmd: "/spawn", desc: "스폰 지점으로 즉시 이동합니다." },
      { cmd: "/tpa [유저]", desc: "해당 유저에게 이동 요청을 보냅니다." },
      { cmd: "/menu", desc: "서버 통합 메뉴창을 엽니다." },
    ]
  },
  {
    category: "경제 & 상점",
    commands: [
      { cmd: "/돈", desc: "현재 보유 중인 재화를 확인합니다." },
      { cmd: "/돈 보내기 [유저] [금액]", desc: "유저에게 돈을 송금합니다." },
      { cmd: "/ah", desc: "경매장을 열어 아이템을 거래합니다." },
      { cmd: "/shop", desc: "서버 상점을 이용합니다." },
    ]
  },
  {
    category: "전투 & 랭킹",
    commands: [
      { cmd: "/rank", desc: "현재 자신의 랭킹 순위를 확인합니다." },
      { cmd: "/pvp", desc: "PVP 경기장으로 이동합니다." },
      { cmd: "/stats", desc: "자신의 전투 능력치를 확인합니다." },
    ]
  }
];

export const Commands = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = COMMAND_GROUPS.map(group => ({
    ...group,
    commands: group.commands.filter(c => 
      c.cmd.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.desc.includes(searchTerm)
    )
  })).filter(group => group.commands.length > 0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`복사되었습니다: ${text}`);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">위키 / 도움말</h2>
            <p className="text-gray-500">서버 이용에 필요한 핵심 명령어와 가이드를 확인하세요.</p>
          </div>

          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="찾으시는 명령어 또는 가이드를 입력하세요..."
              className="w-full pl-12 pr-4 py-4 glass rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-12">
            {filteredGroups.map((group, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  <h3 className="text-xl font-bold text-gray-800">{group.category}</h3>
                </div>
                
                <div className="grid gap-4">
                  {group.commands.map((cmd, cIdx) => (
                    <div 
                      key={cIdx}
                      className="glass p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:glow-blue-hover transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Terminal className="w-5 h-5" />
                        </div>
                        <div>
                          <code className="text-primary font-bold text-lg">{cmd.cmd}</code>
                          <p className="text-gray-500 text-sm mt-1">{cmd.desc}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(cmd.cmd)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-xl text-gray-500 text-sm font-bold transition-all"
                      >
                        <Copy className="w-4 h-4" />
                        복사
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            
            {filteredGroups.length === 0 && (
              <div className="text-center py-24 glass rounded-3xl">
                <p className="text-gray-400">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
