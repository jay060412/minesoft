import { motion } from "motion/react";
import { Pickaxe, Shield, Sword, Gamepad2, Info } from "lucide-react";
import React, { ReactNode } from "react";

// @ts-ignore
import lobbyImg from "../assets/images/로비.png";
// @ts-ignore
import survivalImg from "../assets/images/야생서버.png";
// @ts-ignore
import bedwarsImg from "../assets/images/배드워즈.png";
// @ts-ignore
import screenshotImg from "../assets/images/스크린샷 2026-05-23 003752.png";

interface ServerCardProps {
  title: string;
  description: string[];
  icon: React.ReactNode;
  color: string;
  delay: number;
  image?: string;
  key?: React.Key;
}

const ServerCard = ({ title, description, icon, color, delay, image }: ServerCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="relative group h-full flex flex-col"
  >
    <div className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl blur-md`} />
    <div className="relative h-full glass rounded-3xl glow-blue transition-all duration-300 flex flex-col overflow-hidden">
      {image && (
        <div className="aspect-video w-full overflow-hidden border-b border-white/20 relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/90 shadow-sm text-primary backdrop-blur-xs z-10">
            {icon}
          </div>
        </div>
      )}
      
      <div className="p-8 flex flex-col flex-grow items-start gap-5">
        {!image && (
          <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
            {icon}
          </div>
        )}
        
        <div>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <ul className="space-y-2.5">
            {description.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-500 group-hover:text-gray-700 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <motion.button 
          whileHover={{ x: 5 }}
          className="mt-auto pt-4 text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          자세히 보기 <Gamepad2 className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export const ServerList = () => {
  const servers = [
    {
      title: "로비 서버",
      description: ["서버 이동 및 안내", "유저 친화적 UI", "다양한 편의 기능", "정보 센터"],
      icon: <Info className="w-8 h-8" />,
      color: "from-[#8bb8e8] to-[#5a9ad4]",
      image: lobbyImg,
    },
    {
      title: "생야생 서버",
      description: ["유튜버 뿐둥재영 운영", "랜덤 좌표 시작", "핵/X-ray 방지", "최적화 환경"],
      icon: <Pickaxe className="w-8 h-8" />,
      color: "from-[#57b8ff] to-[#2176ae]",
      image: survivalImg,
    },
    {
      title: "배드워즈 서버",
      description: ["커스텀 맵 지원", "팀 플레이 시스템", "독창적인 아이템", "빠른 매칭"],
      icon: <Shield className="w-8 h-8" />,
      color: "from-[#2176ae] to-[#0d3b66]",
      image: bedwarsImg,
    },
    {
      title: "PVP 연습 서버",
      description: ["일대일 매칭 시스템", "FFA (모두의 적)", "최신 버전 전투 지원", "랭크 시스템"],
      icon: <Sword className="w-8 h-8" />,
      color: "from-[#57b8ff] to-[#2176ae]",
      image: screenshotImg,
    },
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
              title={server.title}
              description={server.description}
              icon={server.icon}
              color={server.color}
              delay={index * 0.1}
              image={server.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
