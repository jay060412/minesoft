import { MessagesSquare, Globe, Mail } from "lucide-react";
import { motion } from "motion/react";

export const Footer = () => {
  return (
    <footer className="bg-bg-light border-t border-gray-100 pt-20 pb-10">
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
                href="https://discord.com/invite/VVgCW5d3JW" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                title="Discord"
              >
                <MessagesSquare className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">바로가기</h4>
            <ul className="space-y-4 text-gray-500">
              <li><button className="hover:text-primary transition-colors">서버 가이드</button></li>
              <li><button className="hover:text-primary transition-colors">위키/도움말</button></li>
              <li><button className="hover:text-primary transition-colors">서버 랭킹</button></li>
              <li><button className="hover:text-primary transition-colors">후원하기</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">서버 정보</h4>
            <div className="glass p-4 rounded-2xl glow-blue">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Server Address</p>
              <p 
                className="text-sm font-black text-primary select-all cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText("minesoft.mcv.kr");
                  alert("서버 주소가 복사되었습니다: minesoft.mcv.kr");
                }}
              >
                minesoft.mcv.kr
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold text-gray-500">VERSION 1.20 - 1.21.x</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2024 MINESOFT. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
            <button className="hover:text-gray-600 transition-colors">이용약관</button>
            <button className="hover:text-gray-600 transition-colors">개인정보처리방침</button>
            <button className="hover:text-gray-600 transition-colors">운영진 문의</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
