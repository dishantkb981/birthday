import { motion } from 'framer-motion';
import { Sparkles, Star, Heart } from 'lucide-react';
import LiquidButton from './LiquidButton';

interface LandingProps {
  onEnter: () => void;
}

export default function Landing({ onEnter }: LandingProps) {
  const containerStyle = {
    position: 'fixed' as const,
    inset: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #FFF8F2 0%, #FFD9CC 50%, #E8A0A9 100%)',
    overflow: 'hidden'
  };

  const particlesStyle = {
    position: 'absolute' as const,
    inset: '0',
    opacity: '0.4'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      style={containerStyle}
    >
      {/* Enhanced floating particles */}
      <div style={particlesStyle}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          >
            {i % 3 === 0 ? (
              <Star style={{ width: '12px', height: '12px', color: 'white', fill: 'white' }} />
            ) : i % 3 === 1 ? (
              <Heart style={{ width: '8px', height: '8px', color: '#E8A0A9', fill: '#E8A0A9' }} />
            ) : (
              <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Animated gradient orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: 'linear-gradient(to right, rgba(255,255,255,0.2), rgba(232,160,169,0.2))',
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '512px' }}>
        {/* Main content with enhanced animations */}
        <motion.div
          initial={{ y: -80, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ 
            delay: 0.3, 
            duration: 1.2, 
            ease: [0.19, 1, 0.22, 1],
            type: "spring",
            stiffness: 100
          }}
        >
          {/* Animated icon with more complex motion */}
          <motion.div
            animate={{
              rotate: [0, 15, -15, 10, -10, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
            style={{ display: 'inline-block', marginBottom: '24px' }}
          >
          <motion.div
            style={{
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
            }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles style={{ width: '64px', height: '64px', color: '#2A5D4E' }} />
          </motion.div>
        </motion.div>

        {/* Enhanced name with text effects */}
        <motion.h1 
          style={{
            fontSize: '4rem',
            fontWeight: '900',
            color: '#2A5D4E',
            marginBottom: '16px',
            fontFamily: 'Poppins, sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.6, 
            type: "spring", 
            stiffness: 200,
            damping: 15
          }}
          whileHover={{ 
            scale: 1.05,
            textShadow: "0 0 20px rgba(232, 160, 169, 0.5)"
          }}
        >
          <motion.span
            animate={{ 
              color: ["#2A5D4E", "#E8A0A9", "#2A5D4E"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Sneha
          </motion.span>
        </motion.h1>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            width: '96px',
            height: '4px',
            background: 'linear-gradient(to right, #E8A0A9, #FFD9CC)',
            margin: '0 auto',
            borderRadius: '2px',
            marginBottom: '24px'
          }}
        />

        <motion.p 
          style={{
            fontSize: '1.5rem',
            color: 'rgba(42, 93, 78, 0.9)',
            marginBottom: '12px',
            fontWeight: '600'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          17 December
        </motion.p>
        
        <motion.p 
          style={{
            fontSize: '2rem',
            color: '#2A5D4E',
            fontWeight: 'bold',
            marginBottom: '48px',
            fontFamily: 'Poppins, sans-serif'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
            <motion.span
              animate={{ 
                scale: [1, 1.06, 1],
                textShadow: ["0 2px 4px rgba(0,0,0,0.1)", "0 8px 28px rgba(232,160,169,0.45)", "0 2px 4px rgba(0,0,0,0.1)"],
                rotate: [0, -2, 2, 0]
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              17 December - A special girl's birthday
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced button with staggered animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ 
            delay: 1.4, 
            duration: 0.8, 
            type: "spring", 
            stiffness: 200,
            damping: 15
          }}
        >
          <LiquidButton onClick={onEnter} size="large" variant="primary">
            <motion.span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              Open Your Surprise
              <motion.span
                animate={{ 
                  x: [0, 8, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ fontSize: '1.25rem' }}
              >
                ✨
              </motion.span>
            </motion.span>
          </LiquidButton>
        </motion.div>

        {/* Enhanced subtitle with typing effect */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            marginTop: '32px',
            fontSize: '1rem',
            color: 'rgba(42, 93, 78, 0.7)',
            fontWeight: '500'
          }}
        >
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            A magical surprise crafted just for you
          </motion.span>
        </motion.p>
      </div>
    </motion.div>
  );
}
