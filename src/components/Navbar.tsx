import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = ({ currentView, setView }: { currentView: string, setView: (view: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "소개", id: "home" },
    { label: "위키/도움말", id: "commands" },
    { label: "후원 안내", id: "donate" },
    { label: "지원", id: "support" },
    { label: "커뮤니티", id: "community" }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
          isScrolled ? "glass shadow-lg glow-blue" : "bg-transparent"
        }`}>
          <div 
            className="text-2xl font-black tracking-tighter cursor-pointer"
            onClick={() => setView("home")}
          >
            <span className={isScrolled ? "gradient-text" : "text-[#222]"}>MINESOFT</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-sm font-bold transition-colors relative group ${
                  currentView === item.id ? "text-primary" : "text-gray-600 hover:text-primary"
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                  currentView === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button 
              onClick={() => {
                navigator.clipboard.writeText("minesoft.mcv.kr");
                window.showToast?.("서버 주소가 클립보드에 복사되었습니다! (minesoft.mcv.kr)");
              }}
              className="px-6 py-2.5 bg-linear-to-r from-primary to-secondary text-white text-sm font-bold rounded-xl glow-blue hover:scale-105 transition-all"
            >
              접속 주소 복사
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-6 right-6 glass p-6 rounded-2xl shadow-2xl md:hidden flex flex-col gap-4 z-40"
        >
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => {
                setView(item.id);
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-left font-bold py-2 border-b border-gray-100 last:border-0 ${
                currentView === item.id ? "text-primary" : "text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => {
              navigator.clipboard.writeText("minesoft.mcv.kr");
              window.showToast?.("서버 주소가 클립보드에 복사되었습니다! (minesoft.mcv.kr)");
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 py-4 bg-primary text-white font-bold rounded-xl"
          >
            접속 주소 복사
          </button>
        </motion.div>
      )}
    </nav>
  );
};
