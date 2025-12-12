import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import LiquidButton from './LiquidButton';

interface WishesConfettiProps {
  onNext: () => void;
}

export default function WishesConfetti({ onNext }: WishesConfettiProps) {
  const [wish, setWish] = useState('');
  const [wishes, setWishes] = useState<string[]>([]);
  const [showFloatingWish, setShowFloatingWish] = useState(false);
  const [currentFloatingWish, setCurrentFloatingWish] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('sneha-wishes');
    if (stored) {
      setWishes(JSON.parse(stored));
    }

    // Enhanced confetti animation
    const timer = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD9CC', '#E8A0A9', '#FFF8F2', '#2A5D4E']
      });
      
      // Additional bursts
      setTimeout(() => {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { x: 0.3, y: 0.7 },
          colors: ['#FFD9CC', '#E8A0A9']
        });
      }, 300);
      
      setTimeout(() => {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { x: 0.7, y: 0.7 },
          colors: ['#FFF8F2', '#2A5D4E']
        });
      }, 600);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSendWish = () => {
    if (wish.trim()) {
      const newWishes = [...wishes, wish];
      setWishes(newWishes);
      localStorage.setItem('sneha-wishes', JSON.stringify(newWishes));

      setCurrentFloatingWish(wish);
      setShowFloatingWish(true);
      setWish('');

      // Enhanced confetti for wish submission
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FFD9CC', '#E8A0A9', '#FFF8F2']
      });

      setTimeout(() => {
        setShowFloatingWish(false);
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-[#E8A0A9] via-[#FFD9CC] to-[#FFF8F2] px-4 sm:px-6 py-8 sm:py-12 overflow-hidden relative"
    >
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Heart className="w-4 h-4 text-white fill-white" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#2A5D4E] mb-4 font-['Poppins']"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            Happy Birthday
          </motion.h2>
          <motion.h3
            className="text-3xl font-bold text-[#2A5D4E]"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            Sneha! 🎉
          </motion.h3>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="backdrop-blur-md bg-white/20 rounded-3xl p-6 border border-white/30 shadow-xl mb-8"
        >
          <p className="text-lg text-[#2A5D4E] mb-6 font-semibold">
            Make a Wish for Sneha 💫
          </p>

          <div className="relative">
            <input
              type="text"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendWish()}
              placeholder="Type your wish for Sneha…"
              className="w-full px-4 py-3 rounded-full bg-white/40 backdrop-blur-sm border border-white/50 text-[#2A5D4E] placeholder-[#2A5D4E]/50 focus:outline-none focus:ring-2 focus:ring-[#E8A0A9]/50 transition-all"
            />
            <button
              onClick={handleSendWish}
              disabled={!wish.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#E8A0A9]/50 hover:bg-[#E8A0A9] transition-colors disabled:opacity-30"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>

          {wishes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-[#2A5D4E]/70"
            >
              {wishes.length} wish{wishes.length !== 1 ? 'es' : ''} sent 💖
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <LiquidButton onClick={onNext}>
            Next Surprise →
          </LiquidButton>
        </motion.div>

        {showFloatingWish && (
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{
              y: -300,
              opacity: 0,
              scale: 0.5,
              rotate: 360
            }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-md rounded-full px-6 py-3 border border-white/50 shadow-lg"
          >
            <p className="text-[#2A5D4E] font-semibold whitespace-nowrap">
              {currentFloatingWish} ✨
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
