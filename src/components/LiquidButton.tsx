import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LiquidButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
}

export default function LiquidButton({
  children,
  onClick,
  className = '',
  size = 'medium',
  disabled = false,
  variant = 'primary'
}: LiquidButtonProps) {
  const sizeStyles = {
    small: { 
      padding: 'clamp(8px, 3vw, 12px) clamp(16px, 6vw, 24px)', 
      fontSize: 'clamp(0.8rem, 3vw, 0.875rem)' 
    },
    medium: { 
      padding: 'clamp(12px, 4vw, 16px) clamp(24px, 8vw, 32px)', 
      fontSize: 'clamp(0.9rem, 3.5vw, 1rem)' 
    },
    large: { 
      padding: 'clamp(16px, 5vw, 20px) clamp(32px, 10vw, 48px)', 
      fontSize: 'clamp(1rem, 4vw, 1.125rem)' 
    }
  };

  const variantStyles = {
    primary: {
      background: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      color: '#2A5D4E',
      boxShadow: '0 12px 40px rgba(232,160,169,0.4)'
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: '#2A5D4E',
      boxShadow: '0 8px 32px rgba(255,217,204,0.3)'
    },
    accent: {
      background: 'linear-gradient(to right, rgba(42, 93, 78, 0.8), rgba(42, 93, 78, 0.6))',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(232, 160, 169, 0.5)',
      color: 'white',
      boxShadow: '0 15px 45px rgba(42,93,78,0.4)'
    }
  };

  const baseStyle = {
    position: 'relative' as const,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderRadius: '50px', // More capsule-shaped
    transition: 'all 0.5s ease-out',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? '0.5' : '1',
    ...sizeStyles[size],
    ...variantStyles[variant]
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      className={className}
      whileHover={disabled ? {} : { 
        scale: 1.05, 
        y: -3,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      whileTap={disabled ? {} : { 
        scale: 0.95,
        transition: { type: "spring", stiffness: 600, damping: 20 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1
      }}
    >
      {/* Animated liquid background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '0',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(232,160,169,0.3), rgba(255,255,255,0.2))',
          opacity: '0.6'
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "linear"
        }}
      />

      {/* Shimmer effect */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '0',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)'
        }}
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
          repeatDelay: 1
        }}
      />

      {/* Pulsing glow on hover */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '0',
          borderRadius: '50px', // Match the capsule shape
          boxShadow: '0 0 30px rgba(232,160,169,0.8)',
          opacity: '0'
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <span style={{ 
        position: 'relative', 
        zIndex: 10, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '8px', 
        fontWeight: 'bold', 
        letterSpacing: '0.05em' 
      }}>
        {children}
      </span>
    </motion.button>
  );
}
