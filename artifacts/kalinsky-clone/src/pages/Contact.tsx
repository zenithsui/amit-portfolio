import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('amit@xyz.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative px-6 overflow-hidden bg-[#121212]">

      {/* Center Links & Email */}
      <div className="w-full max-w-5xl flex justify-between items-center z-20">
        <a
          href="https://www.instagram.com/amt.exee/"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] uppercase tracking-wider text-[rgba(236,236,236,0.5)] hover:text-[#ececec] transition-colors hidden md:block"
        >
          Instagram
        </a>
        
        <div 
          className="text-[24px] md:text-[42px] tracking-tight relative group cursor-pointer"
          onClick={handleCopy}
        >
          <motion.div
            animate={{ opacity: copied ? 0 : 1 }}
            className="group-hover:opacity-60 transition-opacity duration-300"
          >
            amit@xyz.com
          </motion.div>
          {copied && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] uppercase tracking-wider text-[rgba(236,236,236,0.6)]"
            >
              copied
            </motion.div>
          )}
        </div>

        {/* Spacer to keep email centred */}
        <div className="hidden md:block w-[72px]" />
      </div>

      {/* Mountain Graphic & Footer Message */}
      <div className="absolute bottom-0 w-full h-[50vh] flex flex-col items-center justify-end pb-24 md:pb-32 pointer-events-none z-10">
        {/* Subtle white glow behind mountain */}
        <div className="mountain-glow absolute bottom-0 w-full max-w-[800px] h-full" />
        
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full max-w-xl h-[100px] md:h-[150px] relative z-10">
          {/* Main mountain silhouette */}
          <path 
            d="M 10 30 L 35 15 L 50 25 L 65 5 L 90 30 Z" 
            fill="#121212" 
            stroke="rgba(236,236,236,0.8)" 
            strokeWidth="0.2"
            strokeLinejoin="round"
          />
          {/* Cross on top */}
          <path 
            d="M 65 5 L 65 -2 M 62 2 L 68 2" 
            fill="none" 
            stroke="rgba(236,236,236,0.8)" 
            strokeWidth="0.4"
          />
        </svg>

        <p className="mt-12 text-[12px] md:text-[14px] italic text-[rgba(236,236,236,0.4)] relative z-20 text-center px-6">
          Open to any coloborations, let's build something worth shipping.
        </p>
      </div>
    </div>
  );
}
