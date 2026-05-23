import { motion } from "motion/react";
import { Users, MessagesSquare, Twitch, Youtube, Share2 } from "lucide-react";

export const Community = () => {
  const announcements = [
    { date: "2024.04.25", title: "시즌 3 대규모 업데이트 패치노트 안내", tag: "공지" },
    { date: "2024.04.20", title: "주말 버닝 타임 및 경험치 2배 이벤트", tag: "이벤트" },
    { date: "2024.04.15", title: "신규 관리자 모집 공고 (서포터 부문)", tag: "모집" },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">커뮤니티</h2>
            <p className="text-gray-500">플레이어들과 소통하고 실시간 소식을 만나보세요.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: MessagesSquare, label: "공식 디스코드", color: "text-[#5865F2]", bg: "bg-[#5865F2]/10", link: "https://discord.com/invite/VVgCW5d3JW" },
              { icon: Twitch, label: "방송 지원", color: "text-[#9146FF]", bg: "bg-[#9146FF]/10", link: "#" },
              { icon: Youtube, label: "유튜브 채널", color: "text-[#FF0000]", bg: "bg-[#FF0000]/10", link: "#" },
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass p-6 rounded-3xl flex flex-col items-center gap-4 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${social.bg} flex items-center justify-center ${social.color}`}>
                  <social.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-gray-700">{social.label}</span>
              </motion.a>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Share2 className="text-primary w-6 h-6" />
                  <h3 className="text-2xl font-bold">최신 소식</h3>
                </div>
                <button className="text-sm font-bold text-primary">전체보기</button>
              </div>

              <div className="space-y-4">
                {announcements.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="glass p-5 rounded-2xl flex items-center justify-between group cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                        item.tag === '공지' ? 'bg-primary/10 text-primary' : 
                        item.tag === '이벤트' ? 'bg-orange-500/10 text-orange-500' : 
                        'bg-purple-500/10 text-purple-500'
                      }`}>
                        {item.tag}
                      </span>
                      <h4 className="font-bold text-gray-800 text-sm md:text-base">{item.title}</h4>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Users className="text-primary w-6 h-6" />
                서버 현황
              </h3>
              <div className="glass p-6 rounded-3xl glow-blue space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-gray-500">오늘의 접속자</span>
                    <span className="text-primary">842명</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[84%] h-full bg-primary" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-gray-500">후원 달성도</span>
                    <span className="text-secondary">92%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-secondary" />
                  </div>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">최대 동접 기록</span>
                    <span className="font-bold text-gray-700">1,241명</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
