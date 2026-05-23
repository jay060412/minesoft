import { motion } from "motion/react";
import { HelpCircle, MessageSquare, ExternalLink, ShieldCheck, Mail } from "lucide-react";

export const Support = () => {
  const faqs = [
    { q: "서버 주소가 무엇인가요?", a: "minesoft.mcv.kr 입니다. 최신 버전(1.20 - 1.21.x)으로 접속 가능합니다." },
    { q: "아이템이 사라졌을 때는 어떻게 하나요?", a: "디스코드 #복구신청 채널을 통해 로그를 제출해 주시면 확인 후 도와드립니다." },
    { q: "후원은 어떻게 하나요?", a: "/shop 명령어 또는 디스코드 후원 안내 채널을 확인해 주세요." },
    { q: "플레이 중 유저를 신고하고 싶어요.", a: "/report [유저이름] [사유] 명령어를 사용하거나 디스코드 문의를 이용하세요." },
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
            <h2 className="text-4xl font-black text-gray-900 mb-4">고객 지원</h2>
            <p className="text-gray-500">서버 이용 중 궁금하신 점이나 도움이 필요하신가요?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.a 
              href="https://discord.com/invite/VVgCW5d3JW"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl glow-blue-hover transition-all flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2] mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">실시간 디스코드 지원</h3>
              <p className="text-gray-500 text-sm mb-6">가장 빠른 지원을 받을 수 있는 공식 디스코드 채널입니다.</p>
              <span className="flex items-center gap-2 text-primary font-bold">
                입장하기 <ExternalLink className="w-4 h-4" />
              </span>
            </motion.a>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border-dashed transition-all flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">관리자 1:1 문의</h3>
              <p className="text-gray-500 text-sm mb-6">보안 및 개인적인 문의 사항이 있는 경우 이용해 주세요.</p>
              <span className="flex items-center gap-2 text-secondary font-bold">
                문의하기 <ExternalLink className="w-4 h-4" />
              </span>
            </motion.div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="text-primary w-6 h-6" />
              <h3 className="text-2xl font-bold">자주 묻는 질문</h3>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.details 
                  key={idx}
                  className="group glass rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/40 transition-colors">
                    <span className="font-bold text-gray-800">{faq.q}</span>
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-open:rotate-180 transition-transform">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                  </summary>
                  <div className="p-6 pt-0 text-gray-500 text-sm leading-relaxed border-t border-white/20">
                    {faq.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
