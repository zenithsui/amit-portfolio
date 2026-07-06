import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomCursor } from './CustomCursor';
import { useEffect } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  
  // All pages use dark theme; the light phase is handled by the IntroScreen overlay on Home
  const isLight = false;
  
  const bg = '#121212';
  const text = '#ececec';
  const muted = 'rgba(236, 236, 236, 0.5)';

  useEffect(() => {
    document.body.style.backgroundColor = bg;
    document.body.style.color = text;
  }, [bg, text]);

  // Determine footer based on location
  const renderFooter = () => {
    // The works page manages its own footer inside its scroll container
    if (location === '/works') return null; 
    
    if (location === '/about') {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed bottom-6 w-full px-6 md:px-12 flex justify-between items-end text-[11px] uppercase tracking-wider z-40 pointer-events-none" 
          style={{ color: muted }}
        >
          <div className="flex flex-col">
            <Link href="/works" className="hover:opacity-100 transition-opacity pointer-events-auto">Works [4]</Link>
          </div>
          <Link href="/contact" className="hover:opacity-100 transition-opacity pointer-events-auto">Contact</Link>
        </motion.div>
      );
    }
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed bottom-6 w-full px-6 md:px-12 flex justify-between items-end text-[11px] uppercase tracking-wider z-40 pointer-events-none" 
        style={{ color: muted }}
      >
        <Link href="/works" className="hover:opacity-100 transition-opacity pointer-events-auto">
          Works {location !== '/' && '[4]'}
        </Link>
        <Link href="/about" className="hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          About
        </Link>
        <Link href="/contact" className="hover:opacity-100 transition-opacity pointer-events-auto">
          Contact
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-[100dvh] w-full font-sans transition-colors duration-700 selection:bg-gray-500/30">
      <CustomCursor isDark={!isLight} />
      
      {/* Header */}
      <header className="fixed top-6 w-full px-6 md:px-12 flex justify-between items-start z-50 pointer-events-none">
        <div 
          className="w-1.5 h-1.5 rounded-full mt-1" 
          style={{ backgroundColor: muted }}
        />
        <Link 
          href="/" 
          className="absolute left-1/2 -translate-x-1/2 font-medium lowercase text-[14px] tracking-[0.1em] hover:opacity-70 transition-opacity pointer-events-auto"
        >
          amit
        </Link>
        <div className="flex items-end gap-[2px] h-3 mt-1">
          <div className="w-[2px] h-full bg-current equalizer-bar origin-bottom" />
          <div className="w-[2px] h-full bg-current equalizer-bar origin-bottom" />
          <div className="w-[2px] h-full bg-current equalizer-bar origin-bottom" />
        </div>
      </header>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[100dvh] w-full"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {renderFooter()}
    </div>
  );
}
