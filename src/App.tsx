import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SimpleLanding from './components/SimpleLanding';
import RiddleGame from './components/PuzzleGame';

type Section = 'landing' | 'memory' | 'wishes' | 'game' | 'letter';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('landing');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = (nextSection: Section) => {
    setCurrentSection(nextSection);
  };

  // Enhanced button component
  const EnhancedButton = ({ onClick, children, color = '#E8A0A9' }: {
    onClick: () => void,
    children: React.ReactNode,
    color?: string
  }) => (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 20px 40px ${color}40`,
        y: -2
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: 'clamp(12px, 4vw, 18px) clamp(24px, 8vw, 36px)',
        fontSize: 'clamp(1rem, 4vw, 1.3rem)',
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(15px)',
        color: '#2A5D4E',
        border: '2px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '50px', // More capsule-shaped
        cursor: 'pointer',
        fontWeight: 'bold',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '300px'
      }}
    >
      {/* Animated border */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-2px',
          background: `linear-gradient(45deg, ${color}, #FFD9CC, #FFF8F2, ${color})`,
          borderRadius: '50px', // Match the capsule shape
          zIndex: -1
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
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
        animate={{ left: ['100%', '100%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
      />

      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
    </motion.button>
  );

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {currentSection === 'landing' && (
          <SimpleLanding key="landing" onEnter={() => handleNext('memory')} />
        )}

        {currentSection === 'memory' && (
          <motion.div
            key="memory"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            style={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Enhanced Memory Bubbles - Reduced count for performance */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${Math.random() * 60 + 20}px`,
                  height: `${Math.random() * 60 + 20}px`,
                  borderRadius: '50%',
                  background: i % 4 === 0
                    ? 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(102,126,234,0.2))'
                    : i % 4 === 1
                      ? 'linear-gradient(45deg, rgba(118,75,162,0.3), rgba(255,255,255,0.2))'
                      : i % 4 === 2
                        ? 'linear-gradient(45deg, rgba(147,197,253,0.3), rgba(255,255,255,0.1))'
                        : 'linear-gradient(45deg, rgba(196,181,253,0.3), rgba(255,255,255,0.1))',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  willChange: 'transform' // Performance optimization
                }}
                animate={{
                  y: [0, -120, 0],
                  x: [0, Math.random() * 80 - 40, 0],
                  scale: [1, 1.4, 0.6, 1],
                  opacity: [0.2, 0.8, 0.2],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 7 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 6,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Floating Memory Images with Premium Circular Frames */}
            {[
              // Mobile: Push to extreme corners. Desktop: Keep balanced.
              { src: '/memories/memory1.jpg', x: isMobile ? '2%' : '15%', y: isMobile ? '5%' : '20%', delay: 0 },
              { src: '/memories/memory2.jpg', x: isMobile ? '70%' : '75%', y: isMobile ? '8%' : '25%', delay: 1 },
              { src: '/memories/memory3.jpg', x: isMobile ? '5%' : '20%', y: isMobile ? '75%' : '65%', delay: 2 },
              { src: '/memories/memory4.jpg', x: isMobile ? '72%' : '80%', y: isMobile ? '80%' : '70%', delay: 3 }
            ].map((item, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: item.x,
                  top: item.y,
                  zIndex: 5,
                  willChange: 'transform'
                }}
                animate={{
                  y: [0, -15, 0], // Reduced movement on mobile to prevent overlapping
                  rotate: [0, i % 2 === 0 ? 3 : -3, 0],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay
                }}
                whileHover={{ scale: 1.15, zIndex: 20 }}
              >
                {/* Outer Rotating Ring */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: '-8px', // Slightly smaller ring on mobile
                    borderRadius: '50%',
                    border: '2px dashed rgba(255, 255, 255, 0.6)',
                    zIndex: -1
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Glowing Ring */}
                <div style={{
                  padding: '4px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '50%',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}>
                  {/* Image Container */}
                  <div style={{
                    width: 'clamp(80px, 18vw, 180px)', // Even smaller min size for mobile
                    height: 'clamp(80px, 18vw, 180px)',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid white',
                    position: 'relative'
                  }}>
                    <img
                      src={item.src}
                      alt={`Memory ${i + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'scale(1.05)'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '50%',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
                      pointerEvents: 'none'
                    }} />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative emojis - Reduced size on mobile */}
            {['📸', '💭', '❤️', '🌟', '📖', '🎈'].map((emoji, i) => (
              <motion.div
                key={emoji + i}
                style={{
                  position: 'absolute',
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // Responsive emoji size
                  left: `${Math.random() * 90 + 5}%`,
                  top: `${Math.random() * 90 + 5}%`,
                  zIndex: 1
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 6 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut"
                }}
              >
                {emoji}
              </motion.div>
            ))}

            <div style={{
              position: 'relative',
              zIndex: 10,
              // Add a subtle background on mobile to ensure text readability if overlap happens
              background: isMobile ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
              padding: '20px',
              borderRadius: '20px',
              backdropFilter: isMobile ? 'blur(5px)' : 'none',
              maxWidth: '95vw'
            }}>
              <motion.h2
                initial={{ y: -50, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  backgroundPosition: ['0%', '200%']
                }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                  background: 'linear-gradient(to right, #fff, #e0c3fc, #fff)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.3))',
                  fontWeight: 700,
                  maxWidth: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  y: { duration: 0.5, repeat: 0 },
                  opacity: { duration: 0.5, repeat: 0 }
                }}
              >
                Timeless Memories
              </motion.h2>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(1rem, 4vw, 1.5rem)', // Responsive text size
                  marginBottom: '2rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.95)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)' // Better contrast
                }}
              >
                Cherishing every moment with you
              </motion.p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <EnhancedButton onClick={() => handleNext('wishes')} color="#667eea">
                  Next: Birthday Wishes 🎂
                </EnhancedButton>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentSection === 'wishes' && (
          <motion.div
            key="wishes"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            style={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2A5D4E',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Enhanced confetti bubbles */}
            {[...Array(35)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${Math.random() * 50 + 15}px`,
                  height: `${Math.random() * 50 + 15}px`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '10%',
                  background: i % 5 === 0
                    ? 'linear-gradient(45deg, rgba(255,236,210,0.4), rgba(252,182,159,0.3))'
                    : i % 5 === 1
                      ? 'linear-gradient(45deg, rgba(255,192,203,0.4), rgba(255,255,255,0.3))'
                      : i % 5 === 2
                        ? 'linear-gradient(45deg, rgba(255,218,185,0.4), rgba(255,255,255,0.2))'
                        : i % 5 === 3
                          ? 'linear-gradient(45deg, rgba(255,182,193,0.4), rgba(255,255,255,0.2))'
                          : 'linear-gradient(45deg, rgba(255,160,122,0.4), rgba(255,255,255,0.2))',
                  border: '1px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(6px)',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 60 - 30, 0],
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.3, 0.9, 0.3],
                  rotate: [0, Math.random() * 360]
                }}
                transition={{
                  duration: 5 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Party emojis */}
            {['🎊', '🎉', '✨', '🎈', '🎂', '🌟', '💖', '🎁'].map((emoji, i) => (
              <motion.div
                key={emoji + i}
                style={{
                  position: 'absolute',
                  fontSize: '2.2rem',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -200, 150],
                  x: [0, Math.random() * 120 - 60, 0],
                  rotate: [0, 720],
                  scale: [0.5, 1.4, 0.8]
                }}
                transition={{
                  duration: 8 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              >
                {emoji}
              </motion.div>
            ))}

            <div style={{ position: 'relative', zIndex: 10 }}>
              <motion.h2
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                style={{ fontSize: '3.5rem', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}
              >
                🎂 Birthday Wishes
              </motion.h2>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ fontSize: '1.6rem', marginBottom: '2rem' }}
              >
                Special wishes filled with love just for you!
              </motion.p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <EnhancedButton onClick={() => handleNext('game')} color="#fcb69f">
                  Next: Secret Challenge 🧩
                </EnhancedButton>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentSection === 'game' && (
          <RiddleGame key="game" onComplete={() => handleNext('letter')} />
        )}

        {currentSection === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2A5D4E',
              textAlign: 'center',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Romantic heart and sparkle bubbles */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${Math.random() * 40 + 20}px`,
                  height: `${Math.random() * 40 + 20}px`,
                  borderRadius: '50%',
                  background: i % 4 === 0
                    ? 'linear-gradient(45deg, rgba(255,192,203,0.4), rgba(255,255,255,0.3))'
                    : i % 4 === 1
                      ? 'linear-gradient(45deg, rgba(255,182,193,0.4), rgba(255,255,255,0.2))'
                      : i % 4 === 2
                        ? 'linear-gradient(45deg, rgba(255,240,245,0.5), rgba(255,255,255,0.3))'
                        : 'linear-gradient(45deg, rgba(252,182,159,0.3), rgba(255,255,255,0.2))',
                  border: '1px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(10px)',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -90, 0],
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.4, 1, 0.4],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 6 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Love emojis */}
            {['💖', '✨', '🌟', '💕', '🌹', '💝'].map((emoji, i) => (
              <motion.div
                key={emoji + i}
                style={{
                  position: 'absolute',
                  fontSize: '2rem',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -80, 0],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 1, 0.4],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 4
                }}
              >
                {emoji}
              </motion.div>
            ))}

            <div style={{ maxWidth: '700px', position: 'relative', zIndex: 10 }}>
              <motion.h2
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ fontSize: '3.5rem', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}
              >
                💌 Personal Letter
              </motion.h2>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: '1.3rem',
                  lineHeight: '1.8',
                  marginBottom: '2.5rem',
                  background: 'rgba(255, 255, 255, 0.6)', // Slightly more opaque for better readability
                  padding: 'clamp(1.5rem, 5vw, 3rem)', // Responsive padding
                  borderRadius: '30px',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                  fontFamily: "'Outfit', sans-serif", // Use the premium font
                  color: '#4a4a4a',
                  maxHeight: '70vh', // Prevent scrolling issues on small screens
                  overflowY: 'auto' // Allow scrolling within letter if needed
                }}
              >
                <p style={{ marginBottom: '2rem', fontSize: '1.8rem', fontStyle: 'italic', fontFamily: "'Playfair Display', serif", color: '#d63384' }}>
                  Dear Sneha Solanki, 🌹
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Sneha, tum bahut <span style={{ color: '#e91e63', fontWeight: 'bold' }}>sundar ho</span>, bahut <span style={{ color: '#9c27b0', fontWeight: 'bold' }}>acchi ho</span>, aur… haan, tum mujhe <span style={{ color: '#673ab7', fontWeight: 'bold' }}>genuinely achi lagti ho</span>. 🙈✨
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Mujhe pata hai tum shayad kabhi haan na bolo, aur shayad kabhi is tareh nahi socha hoga… but it's okay. 🌸
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Main bas itna chahta tha ki tumhaare <span style={{ color: '#ff5722', fontWeight: 'bold' }}>special din</span> par tumhe kuch <span style={{ color: '#ff9800', fontWeight: 'bold' }}>special feel karaun</span>. 🎉🎈
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Isliye maine ye chhoti si website tumhare birthday ke liye banayi hai. 💻💝
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Tumhari <span style={{ color: '#e91e63' }}>smile</span> 😊, tumhari <span style={{ color: '#9c27b0' }}>vibe</span> ✨, tumhara <span style={{ color: '#673ab7' }}>kind nature</span> 🦋… ye sab inspire karta hai.
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  Meri wish simple hai: tumhari life hamesha <span style={{ background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>khushiyon</span>, <span style={{ background: 'linear-gradient(45deg, #a18cd1, #fbc2eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>surprises</span> aur un moments se bhari rahe jo tum deserve karti ho. 🌟💫
                </p>
                <p style={{ fontWeight: 'bold', fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", background: 'linear-gradient(to right, #ff512f, #dd2476)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Happy Birthday, Sneha Solanki. 🎂💖<br />
                  <span style={{ fontSize: '1.4rem', fontWeight: 'normal', color: '#555', marginTop: '10px', display: 'block' }}>You’re genuinely a beautiful part of this world. 🌍✨</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <EnhancedButton onClick={() => handleNext('landing')} color="#ff69b4">
                  Celebrate Again 🎉
                </EnhancedButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;