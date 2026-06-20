import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessagesSquare, Tv, Youtube, ArrowRight, X, AlertCircle } from "lucide-react";
import { ServerConfig } from "../config";

export const Community = () => {
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);

  const customSocials = [
    { 
      icon: MessagesSquare, 
      label: "공식 디스코드", 
      desc: "마인소프트 유저들과 소통하고 공지사항, 파티 구인, 실시간 건의 및 고객 지원을 받을 수 있는 메인 소통 채널입니다.",
      color: "text-[#5865F2]", 
      bg: "bg-[#5865F2]/10", 
      link: ServerConfig.links.discordInvite,
      buttonText: "디스코드 입장하기",
      isModalTrigger: false
    },
    { 
      icon: Tv, 
      label: "방송인 신청 안내", 
      desc: "유튜브, 트위치, 치지직 등에서 방송하시는 크리에이터 분들을 위한 전용 방송인 신청은 공식 디스코드 채널을 통해 처리됩니다.",
      color: "text-[#9146FF]", 
      bg: "bg-[#9146FF]/10", 
      link: "#",
      buttonText: "신청 방법 확인하기",
      isModalTrigger: true
    },
    { 
      icon: Youtube, 
      label: "유튜브 채널", 
      desc: "스트리머 뿐둥재영의 공식 유튜브 채널입니다. 마인소프트 서버 콘텐츠 소개 및 다양한 마인크래프트 공략/리뷰 영상을 만나보세요.",
      color: "text-[#FF0000]", 
      bg: "bg-[#FF0000]/10", 
      link: ServerConfig.links.youtube,
      buttonText: "유튜브 시청하기",
      isModalTrigger: false
    },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-950 mb-4 tracking-tight">커뮤니티</h2>
            <p className="text-gray-500 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
              마인소프트 플레이어들과 소통하고 공식 미디어 및 디스코드 채널에서 실시간 소식과 역할을 누려보세요.
            </p>
          </div>

          {/* Clean Three Columns Social Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {customSocials.map((social, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-[2rem] border border-gray-150 p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${social.bg} flex items-center justify-center ${social.color} mb-6`}>
                    <social.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{social.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    {social.desc}
                  </p>
                </div>

                {social.isModalTrigger ? (
                  <button 
                    onClick={() => setIsCreatorModalOpen(true)}
                    className="w-full py-3 px-5 rounded-2xl bg-slate-50 border border-slate-100/80 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-black text-xs text-slate-705 flex items-center justify-center gap-2 mt-auto cursor-pointer"
                  >
                    {social.buttonText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a 
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 rounded-2xl bg-slate-50 border border-slate-100/80 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-black text-xs text-gray-700 flex items-center justify-center gap-2 mt-auto"
                  >
                    {social.buttonText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Creator Request Info Modal Popup */}
      <AnimatePresence>
        {isCreatorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreatorModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Content Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="bg-white rounded-[2rem] max-w-md w-full p-8 shadow-2xl border border-gray-100 relative z-10 flex flex-col focus:outline-none"
            >
              <button 
                onClick={() => setIsCreatorModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#9146FF]/10 text-[#9146FF] rounded-2xl flex items-center justify-center">
                  <Tv className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-950">방송인 신청 안내</h3>
                  <p className="text-xs text-gray-400">Creator Application Guide</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-gray-600 text-sm leading-relaxed mb-8">
                <p className="mb-4 font-semibold text-gray-800">
                  📢 디스코드 방송인 신청 채널에서 상시 신청이 가능합니다!
                </p>
                <p className="text-xs text-gray-500 mb-4 leading-normal">
                  유튜브, 치지직, 트위치 등 마인소프트 서버에서 성실하게 활동하시는 크리에이터 분들을 모집합니다. 특별 인게임 칭호와 고유 혜택을 제공받으실 수 있습니다.
                </p>
                <div className="flex items-start gap-2 text-xs bg-[#5865F2]/5 text-[#5865F2] p-3 rounded-xl border border-[#5865F2]/10 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>공식 디스코드 서버 입장 뒤, 아래 <b>[#방송인-신청]</b> 채널 가이드를 확인하여 양식에 맞춰 접수해주시기 바랍니다.</span>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setIsCreatorModalOpen(false)}
                  className="px-5 py-3 border border-gray-200 text-gray-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  닫기
                </button>
                <a 
                  href={ServerConfig.links.discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsCreatorModalOpen(false)}
                  className="px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-black rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <MessagesSquare className="w-4 h-4" />
                  디스코드 신청 채널 가기
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
