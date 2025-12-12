import { motion } from 'framer-motion';

interface SimpleLandingProps {
  onEnter: () => void;
}

export default function SimpleLanding({ onEnter }: SimpleLandingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF8F2 0%, #FFD9CC 50%, #E8A0A9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: 'clamp(20px, 5vw, 40px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Birthday Bubbles Background */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: i % 4 === 0 
              ? 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))' 
              : i % 4 === 1
              ? 'linear-gradient(45deg, rgba(232,160,169,0.3), rgba(232,160,169,0.1))'
              : i % 4 === 2
              ? 'linear-gradient(45deg, rgba(255,217,204,0.3), rgba(255,217,204,0.1))'
              : 'linear-gradient(45deg, rgba(42,93,78,0.2), rgba(42,93,78,0.1))',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(5px)',
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Birthday Icons floating */}
      {['🎈', '🎂', '🎁', '🎉', '✨', '🎊', '🌟', '💖'].map((emoji, i) => (
        <motion.div
          key={emoji + i}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Decorative rotating gradient blob behind content */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          left: '50%',
          top: '8%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle at 30% 30%, rgba(232,160,169,0.35) 0%, rgba(232,160,169,0.08) 30%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(42,93,78,0.18) 0%, rgba(42,93,78,0.04) 35%, transparent 60%)',
          filter: 'blur(40px)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* Decorative ribbon SVG (top-right) */}
      <motion.svg
        aria-hidden
        viewBox="0 0 200 60"
        style={{ position: 'absolute', right: 24, top: 18, width: 140, height: 42, zIndex: 3, pointerEvents: 'none' }}
        animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#FFD9CC" />
            <stop offset="50%" stopColor="#E8A0A9" />
            <stop offset="100%" stopColor="#2A5D4E" />
          </linearGradient>
        </defs>
        <path d="M0 40 Q40 -10 80 30 T160 30 L200 30 L200 60 L0 60 Z" fill="url(#ribbonGrad)" opacity="0.9" />
      </motion.svg>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: 'clamp(2.5rem, 10vw, 4rem)',
          color: '#2A5D4E',
          marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 10
        }}
      >
        🎉 Sneha Solanki 🎉
      </motion.h1>
      
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: [0, -8, 0], opacity: 1 }}
        transition={{ delay: 0.6, duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        style={{
          fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
          color: '#2A5D4E',
          marginBottom: 'clamp(1.5rem, 5vw, 2rem)',
          position: 'relative',
          zIndex: 10,
          display: 'inline-block'
        }}
      >
        <div style={{ position: 'relative', display: 'inline-block', padding: '0 6px' }}>
          {/* Removed duplicate blurred text. Use CSS textShadow on the main text for a clean shadow. */}

          {/* Main gradient text with subtle scale/tilt animation */}
          <motion.span
            style={{
              position: 'relative',
              zIndex: 3,
              display: 'inline-block',
              background: 'linear-gradient(90deg, #2A5D4E 0%, #E8A0A9 50%, #FFD9CC 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 800,
              letterSpacing: '0.6px',
              textShadow: '0 6px 18px rgba(232,160,169,0.18), 0 2px 4px rgba(0,0,0,0.04)'
            }}
            animate={{
              scale: [1, 1.03, 1],
              rotate: [0, 1.2, 0],
              x: [0, 4, 0]
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Date (pastel gradient) */}
            <span style={{ marginRight: '10px', fontWeight: 800 }}>17 December -</span>

            {/* Highlighted birthday pill (dark blue) */}
            <motion.span
              style={{
                display: 'inline-block',
                marginLeft: '6px',
                color: '#04173A',
                background: 'rgba(4,23,58,0.06)',
                padding: '6px 12px',
                borderRadius: '12px',
                fontWeight: 900,
                letterSpacing: '0.2px',
                boxShadow: '0 8px 24px rgba(4,23,58,0.12)',
                WebkitBackdropFilter: 'blur(6px)',
                backdropFilter: 'blur(6px)',
                zIndex: 5,
                position: 'relative'
              }}
              animate={{
                scale: [1, 1.03, 1],
                y: [0, -4, 0],
                boxShadow: [
                  '0 8px 24px rgba(4,23,58,0.08)',
                  '0 14px 36px rgba(11,61,145,0.16)',
                  '0 8px 24px rgba(4,23,58,0.08)'
                ]
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop', delay: 0.15 }}
            >
              A special girl's birthday
            </motion.span>

            {/* Shimmer overlay: sit behind the pill so it does not wash out the highlighted text */}
            <motion.span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0.45,
                background: 'linear-gradient(90deg, transparent 8%, rgba(255,255,255,0.9) 50%, transparent 92%)',
                mixBlendMode: 'screen'
              }}
              initial={{ x: '-120%' }}
              animate={{ x: ['-120%', '120%'] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />
          </motion.span>
        </div>
      </motion.p>
      
      {/* Enhanced Dynamic Button */}
      <motion.button
        onClick={onEnter}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, type: 'spring' }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(232,160,169,0.4)'
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: 'clamp(15px, 5vw, 20px) clamp(30px, 10vw, 40px)',
          fontSize: 'clamp(1rem, 4vw, 1.3rem)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(15px)',
          color: '#2A5D4E',
          border: '2px solid transparent',
          borderRadius: '50px', // More capsule-shaped
          cursor: 'pointer',
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(45deg, #E8A0A9, #FFD9CC, #E8A0A9)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box'
        }}
      >
        {/* Animated border effect */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '0',
            background: 'linear-gradient(45deg, #E8A0A9, #FFD9CC, #FFF8F2, #E8A0A9)',
            borderRadius: '50px', // Match the capsule shape
            padding: '2px',
            zIndex: -1
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          style={{
            position: 'absolute',
            top: '0',
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
            zIndex: 1
          }}
          animate={{
            left: ['100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <span style={{ position: 'relative', zIndex: 2 }}>
          Open Your Surprise 🎁
        </span>
      </motion.button>
    </motion.div>
  );
}
