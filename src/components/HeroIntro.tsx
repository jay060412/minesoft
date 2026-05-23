import { motion } from "motion/react";
import { ChevronRight, MessagesSquare } from "lucide-react";
import { ReactNode } from "react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Local Background Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 via-white/20 to-blue-50/30" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 glow-blue">
            PREMIUM MINECRAFT SERVER
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
            <span className="gradient-text">MINESOFT</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
            다양한 콘텐츠를 하나로 모은 <br className="md:hidden" />
            종합 마인크래프트 서버
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigator.clipboard.writeText("minesoft.mcv.kr");
                alert("서버 주소가 복사되었습니다: minesoft.mcv.kr");
              }}
              className="group relative px-8 py-4 bg-linear-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg glow-blue hover:glow-blue-hover transition-all flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              서버 주소 복사
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            
            <motion.a
              href="https://discord.com/invite/VVgCW5d3JW"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#5865F2] border border-[#5865F2]/20 rounded-xl font-bold text-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <MessagesSquare className="w-5 h-5 fill-current" />
              디스코드 참여
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Intro = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
              가장 완벽한 <span className="text-primary italic">마인크래프트</span> 경험을 제공합니다.
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              MINESOFT는 플레이어의 즐거움을 최우선으로 생각합니다. 
              최적화된 성능과 균형 잡힌 게임 플레이, 그리고 끊임없이 개발되는 새로운 콘텐츠를 통해 
              다른 서버에서는 느낄 수 없는 프리미엄한 재미를 경험해 보세요.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
