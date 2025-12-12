import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
  '/images/memory1.jpg',
  '/images/memory2.jpg',
  '/images/memory3.jpg'
];

export default function MemoryLane() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1rem',
        overflow: 'hidden'
      }}
    >
      {/* Soft background vignette */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, rgba(232,160,169,0.06) 40%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Floating images container */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 980, height: 420 }}>
        {IMAGES.map((src, i) => {
          // staggered animation settings for organic movement
          const delay = i * 0.6;
          const scale = 1 - i * 0.06;

          return (
            <motion.img
              key={src}
              src={src}
              alt={`memory-${i + 1}`}
              style={{
                position: 'absolute',
                width: `clamp(110px, ${28 - i * 4}vw, 260px)`,
                height: `clamp(110px, ${28 - i * 4}vw, 260px)`,
                objectFit: 'cover',
                borderRadius: '50%',
                left: `${10 + i * 28}%`,
                top: `${10 + i * 18}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: 10 + i,
                boxShadow: '0 20px 40px rgba(14,20,30,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
                border: '6px solid rgba(255,255,255,0.6)',
                backdropFilter: 'blur(6px)'
              }}

              // floating motion: gentle circular-ish movement + slow rotation
              animate={{
                y: [0, -18 - i * 6, 0, 10 + i * 4],
                x: [0, 8 + i * 6, 0, -6 - i * 4],
                rotate: [0, 2 + i * 2, 0, -2 - i * 2],
                scale: [scale, scale + 0.03, scale]
              }}
              transition={{
                duration: 9 + i * 2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay
              }}

              whileHover={{ scale: scale + 0.08, zIndex: 9999 }}
              whileTap={{ scale: scale + 0.02 }}
            />
          );
        })}

        {/* Subtle orbit rings to give circular material feel */}
        <svg
          aria-hidden
          viewBox="0 0 900 420"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
        >
          <defs>
            <linearGradient id="ringGrad" x1="0%" x2="100%">
              <stop offset="0%" stopColor="rgba(232,160,169,0.06)" />
              <stop offset="50%" stopColor="rgba(42,93,78,0.06)" />
              <stop offset="100%" stopColor="rgba(255,217,204,0.04)" />
            </linearGradient>
          </defs>

          <g>
            <motion.circle
              cx="240"
              cy="140"
              r="120"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="18"
              style={{ opacity: 0.9 }}
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
            />

            <motion.circle
              cx="640"
              cy="220"
              r="160"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="14"
              style={{ opacity: 0.85 }}
              animate={{ rotate: [0, -360] }}
              transition={{ repeat: Infinity, duration: 48, ease: 'linear' }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
