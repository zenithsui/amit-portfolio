import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroScreen } from '../components/IntroScreen';

import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';

// Custom portraits
const PORTRAITS = [p1, p2, p3, p4];

const TAGLINES = [
  '[ Yoo guys ]',
  '[ creative designer & developer ]',
  '[ content creator ]',
  '[ originally from india ]',
  '[ open for any collaborations ]',
  '[ Comes new in this field ]',
];

const N = PORTRAITS.length;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// ─── Photo carousel — all 4 photos always mounted, positions animated ────────
function PhotoCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const cooldownRef = useRef(false);
  const accRef = useRef(0);            // accumulated deltaY for threshold detection
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActiveIdx(prev => mod(prev + 1, N));
  }, []);

  const retreat = useCallback(() => {
    setActiveIdx(prev => mod(prev - 1, N));
  }, []);

  // Reset auto-advance timer after manual scroll
  const resetAutoTimer = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(advance, 3200);
  }, [advance]);

  // Auto-advance
  useEffect(() => {
    autoTimerRef.current = setInterval(advance, 3200);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [advance]);

  // Wheel scroll — accumulate delta, fire once per gesture crossing threshold
  useEffect(() => {
    const THRESHOLD = 50;
    let resetAcc: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      accRef.current += e.deltaY;

      // Reset accumulator after scroll stops
      clearTimeout(resetAcc);
      resetAcc = setTimeout(() => { accRef.current = 0; }, 200);

      if (cooldownRef.current) return;
      if (Math.abs(accRef.current) < THRESHOLD) return;

      cooldownRef.current = true;
      accRef.current = 0;
      setTimeout(() => { cooldownRef.current = false; }, 800);

      if (e.deltaY > 0) advance(); else retreat();
      resetAutoTimer();
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(resetAcc);
    };
  }, [advance, retreat, resetAutoTimer]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(72px, 9.5vw, 165px)',
        overflow: 'visible',
      }}
    >

      {PORTRAITS.map((src, i) => {
        // offset: 0=center active, 1=right, N-1=left, others=hidden
        const offset = mod(i - activeIdx, N);
        const isCenter = offset === 0;
        const isRight = offset === 1;
        const isLeft = offset === N - 1;
        const visible = isCenter || isLeft || isRight;

        // x position in vw from horizontal center
        const xVw = isCenter ? 0 : isRight ? 36 : isLeft ? -36 : offset < N / 2 ? 80 : -80;
        // size in vw
        const sizeVw = isCenter ? 9 : 4.8;
        // opacity
        const opacity = isCenter ? 1 : visible ? 0.6 : 0;

        return (
          <motion.div
            key={i}
            animate={{
              x: `${xVw}vw`,
              opacity,
            }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
              pointerEvents: 'none',
              zIndex: isCenter ? 2 : 1,
            }}
          >
            <motion.img
              src={`${src}?width=300`}
              alt=""
              draggable={false}
              animate={{
                width: `${sizeVw}vw`,
                height: `${sizeVw}vw`,
                filter: isCenter
                  ? 'brightness(1)'
                  : 'brightness(0.5)',
              }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{
                objectFit: 'cover',
                display: 'block',
                userSelect: 'none',
                minWidth: 28,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Cycling tagline ──────────────────────────────────────────────────────────
function CyclingTagline() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // Start offset so tagline and carousel don't change at the same moment
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const delay = setTimeout(() => {
      intervalId = setInterval(() => setIdx(i => (i + 1) % TAGLINES.length), 3200);
    }, 1600);
    return () => {
      clearTimeout(delay);
      if (intervalId !== null) clearInterval(intervalId);
    };
  }, []);

  return (
    <div style={{ minHeight: 20 }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45 }}
          style={{
            margin: 0,
            fontSize: '13px',
            letterSpacing: '0.05em',
            color: 'rgba(236,236,236,0.45)',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          {TAGLINES[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// ─── Main Home component ──────────────────────────────────────────────────────
export default function Home() {
  const alreadyShown =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('kd-intro-shown') === '1';

  const [introShown, setIntroShown] = useState(alreadyShown);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('kd-intro-shown', '1');
    setIntroShown(true);
  }, []);

  return (
    <>
      {!introShown && <IntroScreen onComplete={handleIntroComplete} />}

      <div
        style={{
          height: '100dvh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(16px, 2.4vh, 32px)',
          padding: '0 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* Portrait carousel */}
        <PhotoCarousel />

        {/* Quote */}
        <div style={{ textAlign: 'center', maxWidth: 580 }}>
          <p
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 1.9vw, 23px)',
              lineHeight: 1.65,
              color: 'rgba(236,236,236,0.88)',
              margin: 0,
            }}
          >
            Yoo Guys !!&nbsp;&nbsp; Made by AMIT
          </p>
        </div>

        {/* Cycling tagline */}
        <CyclingTagline />
      </div>
    </>
  );
}
