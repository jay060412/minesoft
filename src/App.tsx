import { Navbar } from "./components/Navbar";
import { Hero, Intro } from "./components/HeroIntro";
import { ServerList } from "./components/ServerList";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Commands } from "./components/Commands";
import { Support } from "./components/Support";
import { Community } from "./components/Community";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function App() {
  const [view, setView] = useState("home");

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
              x: [0, 100, 0], 
              y: [0, -50, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[70rem] h-[70rem] bg-blue-100/20 blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              x: [0, -80, 0], 
              y: [0, 100, 0],
              scale: [1, 1.05, 1] 
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] -right-[20%] w-[60rem] h-[60rem] bg-blue-200/10 blur-[100px] rounded-full" 
          />

          {/* Layer 2: Medium blobs (Medium speed) */}
          <motion.div 
            animate={{ 
              x: [0, 60, -60, 0], 
              y: [0, 80, -80, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] left-[20%] w-[40rem] h-[40rem] bg-blue-300/10 blur-[80px] rounded-full" 
          />

          {/* Layer 3: Smaller highlights (Fastest) */}
          <motion.div 
            animate={{ 
              x: [0, -40, 40, 0], 
              y: [0, 60, -60, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[40%] left-[10%] w-[30rem] h-[30rem] bg-white/40 blur-[60px] rounded-full" 
          />
        </div>

        {/* Noise Texture Overlay for Premium Feel */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
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
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
