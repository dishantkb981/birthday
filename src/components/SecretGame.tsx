import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Lock, Unlock } from 'lucide-react';
import confetti from 'canvas-confetti';
import LiquidButton from './LiquidButton';

interface SecretGameProps {
  onComplete: () => void;
}

export default function SecretGame({ onComplete }: SecretGameProps) {
  const [step, setStep] = useState(1);
  const [heartFound, setHeartFound] = useState(false);
  const [wordInput, setWordInput] = useState('');
  const [dateSelected, setDateSelected] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const scrambledLetters = ['A', 'N', 'H', 'E', 'S'];
  const correctWord = 'SNEHA';

  const balloonNumbers = [12, 15, 17, 19, 21, 24];

  useEffect(() => {
    const progress = localStorage.getItem('puzzle-progress');
    if (progress) {
      const { completedStep } = JSON.parse(progress);
      if (completedStep === 3) {
        setIsComplete(true);
      }
    }
  }, []);

  const handleHeartClick = () => {
    setHeartFound(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFD9CC', '#E8A0A9', '#FFF8F2']
    });

    setTimeout(() => {
      setStep(2);
    }, 1500);
  };

  const checkWord = () => {
    if (wordInput.toUpperCase() === correctWord) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setStep(3);
      }, 1500);
    }
  };

  const handleDateSelect = (num: number) => {
    setDateSelected(num);

    if (num === 17) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD9CC', '#E8A0A9', '#FFF8F2', '#2A5D4E']
      });

      setIsComplete(true);
      localStorage.setItem('puzzle-progress', JSON.stringify({ completedStep: 3 }));

      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-[#FFF8F2] via-[#FFD9CC] to-[#E8A0A9] px-6 py-12"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            {step > 1 ? (
              <Unlock className="w-8 h-8 text-[#2A5D4E]" />
            ) : (
              <Lock className="w-8 h-8 text-[#2A5D4E]" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-[#2A5D4E] font-['Poppins']">
            Unlock the Surprise
          </h2>
          <p className="text-[#2A5D4E]/70 mt-2">
            Complete 3 simple challenges
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              className={`h-2 rounded-full ${
                s < step ? 'w-12 bg-[#2A5D4E]' :
                s === step ? 'w-12 bg-[#E8A0A9]' :
                'w-8 bg-[#2A5D4E]/20'
              }`}
              animate={{ width: s === step ? 48 : s < step ? 48 : 32 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="backdrop-blur-md bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl"
            >
              <p className="text-lg text-[#2A5D4E] mb-6 text-center font-semibold">
                Step 1: Find the hidden heart 💖
              </p>

              <div className="relative h-64 bg-white/10 rounded-2xl overflow-hidden">
                {[...Array(30)].map((_, i) => {
                  const isTheHeart = i === 17;
                  return (
                    <motion.div
                      key={i}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${Math.random() * 90}%`,
                        top: `${Math.random() * 90}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        rotate: isTheHeart ? [0, 10, -10, 0] : 0,
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random()
                      }}
                      onClick={isTheHeart ? handleHeartClick : undefined}
                    >
                      {isTheHeart ? (
                        <Heart className={`w-8 h-8 ${heartFound ? 'text-red-500 fill-red-500' : 'text-[#E8A0A9] fill-[#E8A0A9]'}`} />
                      ) : (
                        <Sparkles className="w-6 h-6 text-[#2A5D4E]/30" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="backdrop-blur-md bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl"
            >
              <p className="text-lg text-[#2A5D4E] mb-6 text-center font-semibold">
                Step 2: Unscramble the letters
              </p>
              <p className="text-sm text-[#2A5D4E]/70 mb-4 text-center">
                Hint: I'm in your name 😉
              </p>

              <div className="flex justify-center gap-2 mb-6">
                {scrambledLetters.map((letter, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-12 h-12 bg-white/40 backdrop-blur-sm rounded-lg flex items-center justify-center text-xl font-bold text-[#2A5D4E] border border-white/50"
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>

              <input
                type="text"
                value={wordInput}
                onChange={(e) => setWordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkWord()}
                placeholder="Type the word..."
                className="w-full px-4 py-3 rounded-full bg-white/40 backdrop-blur-sm border border-white/50 text-[#2A5D4E] text-center placeholder-[#2A5D4E]/50 focus:outline-none focus:ring-2 focus:ring-[#E8A0A9]/50 mb-4"
              />

              <LiquidButton
                onClick={checkWord}
                disabled={wordInput.length !== 5}
                className="w-full"
              >
                Check Answer
              </LiquidButton>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="backdrop-blur-md bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl"
            >
              <p className="text-lg text-[#2A5D4E] mb-6 text-center font-semibold">
                Step 3: Find the special date 🎈
              </p>

              <div className="grid grid-cols-3 gap-4">
                {balloonNumbers.map((num, i) => (
                  <motion.button
                    key={num}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    onClick={() => handleDateSelect(num)}
                    className={`h-24 rounded-2xl backdrop-blur-md border-2 ${
                      dateSelected === num
                        ? num === 17
                          ? 'bg-[#2A5D4E]/30 border-[#2A5D4E]'
                          : 'bg-red-500/20 border-red-500'
                        : 'bg-white/20 border-white/30'
                    } flex items-center justify-center text-3xl font-bold text-[#2A5D4E] hover:scale-105 transition-transform`}
                  >
                    {num}
                  </motion.button>
                ))}
              </div>

              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center text-[#2A5D4E] font-semibold"
                >
                  Perfect! Unlocking your surprise... ✨
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
