import { Navbar } from "./components/Navbar";
import { Hero, Intro } from "./components/HeroIntro";
import { ServerList } from "./components/ServerList";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Commands } from "./components/Commands";
import { Support } from "./components/Support";
import { Community } from "./components/Community";
import { Donate } from "./components/Donate";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

declare global {
  interface Window {
    showToast?: (message: string) => void;
  }
}

export default function App() {
  const [view, setView] = useState("home");
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    window.showToast = (message: string) => {
      setToast({ message, visible: true });
      clearTimeout(timer);
      timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 2500);
    };

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Modern Premium Background System */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#fafafa]">
        {/* Base Gradient Layer */}
        <div className="absolute inset-0 bg-linear-to-tr from-blue-50/50 via-white to-blue-50/30" />
        
        {/* Animated Background Blobs (Parallax-like layers) */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Layer 1: Large soft blobs (Slowest) */}
          <motion.div 
            animate={{ 
              x: [0, 80, 0], 
              y: [0, -30, 0],
              scale: [1, 1.05, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
            className="absolute -top-[10%] -left-[10%] w-[70rem] h-[70rem] bg-blue-100/15 blur-[80px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              x: [0, -60, 0], 
              y: [0, 70, 0],
              scale: [1, 1.03, 1] 
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
            className="absolute top-[20%] -right-[20%] w-[60rem] h-[60rem] bg-blue-200/10 blur-[80px] rounded-full" 
          />

          {/* Layer 2: Medium blobs (Medium speed) */}
          <motion.div 
            animate={{ 
              x: [0, 40, -40, 0], 
              y: [0, 50, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
            className="absolute bottom-[10%] left-[20%] w-[40rem] h-[40rem] bg-blue-300/10 blur-[70px] rounded-full" 
          />

          {/* Layer 3: Smaller highlights (Fastest) */}
          <motion.div 
            animate={{ 
              x: [0, -30, 30, 0], 
              y: [0, 40, -40, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
            className="absolute top-[40%] left-[10%] w-[30rem] h-[30rem] bg-white/30 blur-[50px] rounded-full" 
          />
        </div>

        {/* Noise Texture Overlay for Premium Feel */}
        <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <Navbar currentView={view} setView={setView} />
      
      <main>
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              <Intro />
              <ServerList />
              <Features />
            </motion.div>
          )}

          {view === "commands" && (
            <motion.div
              key="commands"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Commands />
            </motion.div>
          )}

          {view === "support" && (
            <motion.div
              key="support"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Support />
            </motion.div>
          )}

          {view === "community" && (
            <motion.div
              key="community"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Community />
            </motion.div>
          )}

          {view === "donate" && (
            <motion.div
              key="donate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Donate />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setView={setView} />

      {/* Modern Custom Toast Alert */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 15, scale: 0.95, x: "-50%" }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="fixed bottom-12 left-1/2 z-[99999] px-6 py-4 bg-slate-900 border border-slate-800 text-white font-black text-xs md:text-sm rounded-2xl shadow-2xl flex items-center gap-3"
            style={{ left: "50%" }}
          >
            <div className="w-5 h-5 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
