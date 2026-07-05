import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroScreen } from '../components/IntroScreen';

// Dark-theme portraits (1–6 from the Framer bundle)
const PORTRAITS = [
  'https://framerusercontent.com/images/QvTUzgM4QXMJB88t3P4ohJ2Rrw.webp',
  'https://framerusercontent.com/images/wLEKFalYy783HuwYJayXgqsH3Ic.webp',
  'https://framerusercontent.com/images/5mxOsRF8TmCJFvCus3HH55HAVXk.webp',
  'https://framerusercontent.com/images/nkLx9qBMqG0BuvtxpXXg2m8W040.webp',
  'https://framerusercontent.com/images/Izf8LRZFcldMeGxy64SCfvWjYTo.webp',
  'https://framerusercontent.com/images/KFA1huAUc5VNhLbKvJEFBAX6OQ.webp',
];

const TAGLINES = [
  '[ max kalinsky ]',
  '[ creative designer & developer ]',
  '[ content creator ]',
  '[ originally from Ukraine ]',
  '[ open for any collaborations ]',
  '[ 4+ years experience ]',
];

const N = PORTRAITS.length;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// ─── Ghost trail: a bright cross-star that flashes during photo transitions ──
function GhostTrail({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ghost"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55 } }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {/* Horizontal ray */}
          <div style={rayStyle(0)} />
          {/* Vertical ray */}
          <div style={rayStyle(90)} />
          {/* Diagonal rays */}
          <div style={{ ...rayStyle(45), width: '4vw', opacity: 0.5 }} />
          <div style={{ ...rayStyle(-45), width: '4vw', opacity: 0.5 }} />
          {/* Center glow */}
          <div
            style={{
              position: 'absolute',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)',
              boxShadow: '0 0 16px 8px rgba(255,255,255,0.35)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function rayStyle(rotate: number): React.CSSProperties {
  return {
    position: 'absolute',
    width: '7vw',
    height: 1,
    background:
      'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, transparent 80%)',
    transform: `rotate(${rotate}deg)`,
  };
}

// ─── Photo carousel — all 6 photos always mounted, positions animated ────────
function PhotoCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showGhost, setShowGhost] = useState(false);

  const advance = useCallback(() => {
    setActiveIdx(prev => mod(prev + 1, N));
    setShowGhost(true);
    setTimeout(() => setShowGhost(false), 750);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, 3200);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(72px, 9.5vw, 165px)',
        overflow: 'visible',
      }}
    >
      <GhostTrail visible={showGhost} />

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
            if they put a cross on you — carry it on your back,
            <br />
            and silently bring it to the top.
          </p>
        </div>

        {/* Cycling tagline */}
        <CyclingTagline />
      </div>
    </>
  );
}
