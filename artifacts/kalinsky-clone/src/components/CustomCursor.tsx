import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor({ isDark }: { isDark: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isReady) setIsReady(true);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [isReady]);

  if (!isReady) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[100]"
      style={{
        backgroundColor: isDark ? '#ececec' : '#121212',
      }}
      animate={{
        x: mousePosition.x - 4, // center the 8px dot
        y: mousePosition.y - 4,
      }}
      transition={{ type: 'spring', mass: 0.1, damping: 20, stiffness: 400 }}
    />
  );
}
