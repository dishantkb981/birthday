import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export default function AudioControl() {
  const { isMuted, toggleMute, playClick } = useSound();

  const handleToggle = () => {
    playClick();
    toggleMute();
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        delay: 1,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      onClick={handleToggle}
      className="fixed top-6 right-6 z-50 p-4 rounded-full glass-strong border border-white/40 glow hover:shadow-[0_12px_40px_rgba(232,160,169,0.6)] transition-all duration-300"
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
        transition: { type: "spring", stiffness: 400 }
      }}
      whileTap={{ 
        scale: 0.9,
        rotate: -5,
        transition: { type: "spring", stiffness: 600 }
      }}
    >
      <motion.div
        animate={isMuted ? { rotate: 0 } : { rotate: [0, -5, 5, -5, 0] }}
        transition={{ 
          duration: isMuted ? 0.2 : 2,
          repeat: isMuted ? 0 : Infinity,
          repeatDelay: 3
        }}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-[#E8A0A9]" />
        ) : (
          <Volume2 className="w-6 h-6 text-[#2A5D4E]" />
        )}
      </motion.div>

      {/* Pulse indicator when unmuted */}
      {!isMuted && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#2A5D4E]/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
}
