import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, MessageSquare, ExternalLink, ShieldCheck, Mail, X, CheckCircle, Send, Loader2 } from "lucide-react";
import { ServerConfig } from "../config";

interface InquiryForm {
  userId: string;
  category: string;
  discordTag: string;
  message: string;
}

export const Support = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<InquiryForm>({
    userId: "",
    category: "일반 문의",
    discordTag: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; msg: string } | null>(null);

  const faqs = [
    { q: "서버 주소와 권장 버전은 어떻게 되나요?", a: `서버 도메인은 ${ServerConfig.serverIp} 이며, 최신 권장 버전은 1.21.4~26.2 입니다.` },
    { q: "아이템이 사라졌을 때는 어떻게 하나요?", a: "디스코드 또는 아래 1:1 문의 접수를 통해 복구 폼을 남겨주시면, 서버 상태 모니터링 로그 및 백업 파일을 확인하여 유실 등 확실한 사유 발생 시 신속하게 복구해 드립니다." },
    { q: "서버 후원은 어떻게 진행하나요?", a: "공식 디스코드의 1:1 문의 채널(티켓)을 개설하여 진행해 주시기 바랍니다." },
    { q: "비매너 유저나 핵 의심 유저를 제보하고 싶어요.", a: "인게임에서 /report [닉네임] [사유]를 사용하여 제보하시거나, 공식 디스코드의 1:1 문의 채널(티켓)을 통해 접수해 주시면 처리 후 처리결과를 전달드립니다." },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.userId.trim() || !formData.message.trim()) {
      alert("닉네임과 문의 내용을 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      if (ServerConfig.discordWebhookUrl && ServerConfig.discordWebhookUrl.trim() !== "") {
        // 실제 운영 시 Webhook이 세팅되어 있는 경우 Discord로 전송
        const embedPayload = {
          username: "마인소프트 건의 및 문의 알리미",
          avatar_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150",
          embeds: [
            {
              title: "📩 새로운 1:1 문의가 접수되었습니다!",
              color: 3447003, // 빛나는 블루 계열
              fields: [
                { name: "Minecraft ID (닉네임)", value: `\`${formData.userId}\``, inline: true },
                { name: "문의 항목 분류", value: `\`${formData.category}\``, inline: true },
                { name: "회신용 디스코드 ID", value: formData.discordTag ? `\`${formData.discordTag}\`` : "미입력", inline: true },
                { name: "문의 내용", value: formData.message }
              ],
              footer: {
                text: "홈페이지 1:1 문의 폼 접수 모듈"
              },
              timestamp: new Date().toISOString()
            }
          ]
        };

        const res = await fetch(ServerConfig.discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(embedPayload)
        });

        if (res.ok) {
          setSubmitResult({
            success: true,
            msg: "문의가 공식 디스코드로 성공적으로 전송되었습니다! 충실히 검토 후 가능한 한 빨리 디스코드 또는 이메일로 답변을 연락드리겠습니다."
          });
          setFormData({ userId: "", category: "일반 문의", discordTag: "", message: "" });
        } else {
          throw new Error("Discord Webhook API returned non-2xx response");
        }
      } else {
        // Webhook 주소가 아직 채워지지 않았을 때 로컬에 목업 기록 및 친절한 안내 제공
        const savedInquiries = JSON.parse(localStorage.getItem("inquiries") || "[]");
        savedInquiries.push({
          ...formData,
          date: new Date().toLocaleDateString()
        });
        localStorage.setItem("inquiries", JSON.stringify(savedInquiries));

        setSubmitResult({
          success: true,
          msg: "1:1 문의가 정상 접수되었습니다! (현재 데모 상태로 브라우저 LocalStorage에 안전하게 저장되었습니다. 실제 디스코드로 문의 사항을 즉시 자동 수신하고 싶으시면, src/config.ts 파일의 discordWebhookUrl 부분에 채널 웹훅 주소를 입력해 주시면 실제 연동이 완료됩니다!)"
        });
        setFormData({ userId: "", category: "일반 문의", discordTag: "", message: "" });
      }
    } catch (err) {
      console.error(err);
      setSubmitResult({
        success: false,
        msg: "접수 도중 통신 오류가 발생했습니다. 공식 디스코드를 이용해 주시거나 주소를 재확인해 주세요."
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <h2 className="text-4xl font-black text-gray-900 mb-4">고객 지원</h2>
            <p className="text-gray-500">서버 이용 중 궁금하신 점이나 도움이 필요하신가요?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.a 
              href={ServerConfig.links.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl glow-blue-hover transition-all flex flex-col items-center text-center cursor-pointer"
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
              onClick={() => {
                setIsOpen(true);
                setSubmitResult(null);
              }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border-dashed transition-all flex flex-col items-center text-center cursor-pointer hover:border-solid hover:border-gray-300"
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

      {/* 1:1 Support Request Modal Form */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-xs"
            />

            {/* Modal Body Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 25 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl border border-gray-100 relative z-10 flex flex-col focus:outline-none max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary/15 rounded-xl flex items-center justify-center text-secondary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-950">1:1 문의 접수하기</h3>
                  <p className="text-xs text-gray-400">관리자용 보안 문의 양식입니다.</p>
                </div>
              </div>

              {submitResult ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center flex flex-col items-center py-10"
                >
                  {submitResult.success ? (
                    <CheckCircle className="w-14 h-14 text-emerald-500 mb-4" />
                  ) : (
                    <HelpCircle className="w-14 h-14 text-red-500 mb-4" />
                  )}
                  <h4 className="font-bold text-gray-900 mb-4 text-base">
                    {submitResult.success ? "접수 완료" : "접수 실패"}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {submitResult.msg}
                  </p>
                  <button
                    onClick={() => {
                      if (submitResult.success) {
                        setIsOpen(false);
                      }
                      setSubmitResult(null);
                    }}
                    className="px-6 py-2.5 bg-gray-900 border border-gray-900 text-white rounded-xl text-xs font-black hover:bg-gray-800 transition-colors"
                  >
                    확인
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      마인크래프트 ID (닉네임) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="userId"
                      value={formData.userId}
                      onChange={handleInputChange}
                      placeholder="올바른 닉네임을 입력하세요"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 bg-slate-50/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      문의 분류 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 bg-slate-50/50 cursor-pointer"
                    >
                      <option value="일반 문의">일반 문의</option>
                      <option value="아이템/재화 오류 복구">아이템/재화 오류 복구</option>
                      <option value="유저/기타 신고 접수">비매너 유저 신고</option>
                      <option value="서포터 / 관리자 지원">서포터 지원 (가디언즈)</option>
                      <option value="후원 문의">결제 및 후원 문의</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      디스코드 ID (또는 이메일)
                    </label>
                    <input 
                      type="text" 
                      name="discordTag"
                      value={formData.discordTag}
                      onChange={handleInputChange}
                      placeholder="예시: userid#1234 또는 이메일 주소"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      상세 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="구체적인 현상 또는 내용을 작성해 주시면 처리에 큰 도움이 됩니다."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 bg-slate-50/50 resize-none leading-relaxed"
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-5 py-3 border border-gray-200 text-gray-500 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-xl text-sm font-black shadow-md hover:shadow-lg transition-all flex items-center gap-2 duration-250 disabled:bg-gray-400"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> 전송 중...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> 전송하기
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
