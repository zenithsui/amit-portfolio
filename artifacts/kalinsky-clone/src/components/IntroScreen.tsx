import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';

// Custom portraits for the intro screen
const LIGHT_PORTRAITS = [p1, p2, p3, p4];

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [counter, setCounter] = useState(0);
  const [exiting, setExiting] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const DURATION = 2600;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease-out curve: feel faster at start, slow at end
      const eased = 1 - Math.pow(1 - progress, 2);
      setCounter(Math.round(eased * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (!completedRef.current) {
        completedRef.current = true;
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 750);
        }, 250);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.75, ease: [0.8, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#ececec',
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Giant "kd" — top center */}
      <div
        style={{
          fontSize: 'clamp(90px, 18vw, 240px)',
          fontWeight: 500,
          color: '#121212',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginTop: '3vh',
          fontFamily: 'inherit',
        }}
      >
        amit
      </div>

      {/* 6 portrait photos spread across the screen — vertically centered */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 4vw',
        }}
      >
        {LIGHT_PORTRAITS.map((src, i) => {
          // Center photo (index 2) is notably larger
          const isCenter = i === 2;
          const size = isCenter ? 'clamp(55px, 7vw, 120px)' : 'clamp(32px, 4.2vw, 72px)';
          return (
            <img
              key={i}
              src={`${src}?width=300`}
              alt=""
              draggable={false}
              style={{
                width: size,
                height: size,
                objectFit: 'cover',
                display: 'block',
                userSelect: 'none',
              }}
            />
          );
        })}
      </div>

      {/* Counter — bottom center */}
      <div
        style={{
          position: 'absolute',
          bottom: '8vh',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          color: 'rgba(18,18,18,0.4)',
          letterSpacing: '0.08em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {counter}°
      </div>
    </motion.div>
  );
}
