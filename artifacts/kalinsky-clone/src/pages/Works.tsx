import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const projects = [
  { id: 'void', title: 'Void', type: 'personal project', date: '12 march', img: 'https://framerusercontent.com/images/eoXtJ1Dyug9tAvul06dslrlMY.webp' },
  { id: 'onera', title: 'Ornatea', type: 'brand identity', date: '8 february', img: 'https://framerusercontent.com/images/dEuwmQauhQuIr8Lcl5z0d1jvksA.webp' },
  { id: 'krbk', title: 'KRBK', type: 'web design', date: '19 january', img: 'https://framerusercontent.com/images/GDddOz2vr0z4dJfYbmWnOTzzg.webp' },
  { id: 'b-p', title: 'B&P', type: 'agency website', date: '24 march', img: 'https://framerusercontent.com/images/Aof0meH6Zjpzxtpp8oK3jI78.webp' },
];

export default function Works() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const idx = Math.round(container.scrollTop / window.innerHeight);
      if (idx !== activeIdx && idx >= 0 && idx < projects.length) {
        setActiveIdx(idx);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIdx]);

  return (
    <div className="relative h-[100dvh] w-full bg-[#121212]">
      <div 
        ref={containerRef}
        className="h-[100dvh] w-full snap-y snap-mandatory overflow-y-auto"
      >
        {projects.map((p, i) => (
          <div key={p.id} className="h-[100dvh] w-full snap-start relative flex flex-col items-center justify-center">
            <Link href={`/works/${p.id}`} className="block">
              <motion.div 
                className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Link>
            
            {/* Mobile Project Info (only visible on mobile layout, fixed on desktop) */}
            <div className="absolute bottom-24 left-6 flex flex-col text-[11px] uppercase tracking-wider text-[rgba(236,236,236,0.5)] md:hidden">
              <span className="font-medium text-[#ececec]">{p.title}</span>
              <span>{p.type}</span>
            </div>
            <div className="absolute bottom-24 right-6 text-[11px] uppercase tracking-wider text-[rgba(236,236,236,0.5)] md:hidden">
              <span>{p.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Works Footer */}
      <div className="fixed bottom-6 w-full px-6 md:px-12 flex justify-between items-end text-[11px] uppercase tracking-wider z-40 pointer-events-none" style={{ color: 'rgba(236, 236, 236, 0.5)' }}>
        
        {/* Left: Project Info & Main Nav */}
        <div className="flex flex-col gap-8 pointer-events-auto text-left">
          <div className="hidden md:flex flex-col gap-1">
            <motion.span 
              key={`title-${activeIdx}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-medium text-[#ececec]"
            >
              {projects[activeIdx].title}
            </motion.span>
            <motion.span
              key={`type-${activeIdx}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {projects[activeIdx].type}
            </motion.span>
          </div>
          <Link href="/works" className="hover:text-[#ececec] transition-colors">Works [{projects.length}]</Link>
        </div>
        
        {/* Center: About */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <Link href="/about" className="hover:text-[#ececec] transition-colors">About</Link>
        </div>

        {/* Right: Date & Contact */}
        <div className="flex flex-col gap-8 pointer-events-auto text-right">
          <div className="hidden md:block">
            <motion.span
              key={`date-${activeIdx}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {projects[activeIdx].date}
            </motion.span>
          </div>
          <Link href="/contact" className="hover:text-[#ececec] transition-colors">Contact</Link>
        </div>

      </div>
    </div>
  );
}
