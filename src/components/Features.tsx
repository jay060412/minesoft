import { motion, AnimatePresence } from "motion/react";
import { Zap, Clock, Cpu, Users } from "lucide-react";
import { useState, useEffect } from "react";
// @ts-ignore
import lobbyImg from "../assets/images/로비.png";
// @ts-ignore
import survivalImg from "../assets/images/야생서버.png";
// @ts-ignore
import bedwarsImg from "../assets/images/배드워즈.png";
// @ts-ignore
import screenshotImg from "../assets/images/스크린샷 2026-05-23 003752.png";

const IMAGES = [
  lobbyImg,
  survivalImg,
  bedwarsImg,
  screenshotImg
];

const IMAGE_LABELS = [
  "로비 서버",
  "생야생 서버",
  "배드워즈 서버",
  "PvP 연습 서버"
];

const FeatureItem = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex items-start gap-4 p-6 glass rounded-2xl hover:glow-blue transition-all group"
  >
    <div className="p-3 rounded-xl bg-white shadow-sm text-primary group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="text-lg font-bold mb-1">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export const Features = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
              <Zap className="w-3 h-3 fill-current" />
              SYSTEM PERFORMANCE
            </div>
            <h2 className="text-4xl font-black mb-6 tracking-tight leading-tight">
              서버 <span className="gradient-text">최적화</span>와 <br />
              쾌적한 환경은 기본입니다.
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-lg">
              우리는 플레이어들이 어떠한 지연시간도 없이 최고의 퍼포먼스를 낼 수 있도록 
              최강의 하드웨어와 최적화 알고리즘을 사용합니다.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <FeatureItem 
                icon={Zap} 
                title="낮은 핑 (~20ms)" 
                description="국내 최고 수준의 네트워크 인프라로 지연 없는 플레이" 
                delay={0.1}
              />
              <FeatureItem 
                icon={Clock} 
                title="24시간서버" 
                description="단 1분도 놓치지 않는 안정적인 가동률 보장" 
                delay={0.2}
              />
              <FeatureItem 
                icon={Cpu} 
                title="강력한 최적화" 
                description="생야생의 경우 folia 기반으로 제작" 
                delay={0.3}
              />
              <FeatureItem 
                icon={Users} 
                title="유저 의견 반영" 
                description="커뮤니티의 목소리를 귀담아듣는 적극적 운영진" 
                delay={0.4}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 glass rounded-3xl p-4 glow-blue-hover transition-all duration-700">
              <div className="aspect-video rounded-2xl flex items-center justify-center border border-white/40 overflow-hidden relative group">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentIndex}
                    src={IMAGES[currentIndex]}
                    alt="Server Gameplay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                <div className="relative z-10 text-center text-white mt-auto pb-6 bg-linear-to-t from-black/80 via-black/40 to-transparent w-full">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-black uppercase tracking-widest">{IMAGE_LABELS[currentIndex]}</span>
                  </div>
                  <span className="text-xs text-white/70">실시간 스크린샷</span>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                  {IMAGES.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decals */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-md z-0" 
            />
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
              className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/15 rounded-full blur-lg z-0" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
