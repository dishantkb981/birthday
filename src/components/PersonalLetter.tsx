import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Sparkles, Gift, Music, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';
import LiquidButton from './LiquidButton';

export default function PersonalLetter() {
  const [displayedText, setDisplayedText] = useState('');
  const [showHeart, setShowHeart] = useState(false);
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const fullText = "Sneha, tera smile aur woh choti choti baatein hi meri favourite playlist hain. Aaj tera din hai — have the happiest birthday ever! 🎉";

  const additionalSections = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Memories That Matter",
      content: "Woh coffee dates, late night talks, aur endless laughter - har moment special tha tere saath."
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Your Vibe",
      content: "Teri energy infectious hai, aur tera positive attitude sabko inspire karta hai."
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Today's Wish",
      content: "May this new year bring you endless happiness, success, aur sabse important - lots of cake! 🎂"
    }
  ];

  useEffect(() => {
    // Enhanced confetti animation
    const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD9CC', '#E8A0A9', '#FFF8F2', '#2A5D4E']
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { x: 0.2, y: 0.7 },
          colors: ['#FFD9CC', '#E8A0A9']
        });
      }, 200);
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { x: 0.8, y: 0.7 },
          colors: ['#FFF8F2', '#2A5D4E']
        });
      }, 400);
    };

    triggerConfetti();

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setShowHeart(true);
        setTimeout(() => setShowAdditionalContent(true), 1000);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const nextSection = () => {
    if (currentSection < additionalSections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#FFF8F2] via-[#FFD9CC] to-[#E8A0A9] px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Enhanced floating elements */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          {i % 4 === 0 ? (
            <Star className="w-4 h-4 text-white/60 fill-white/60" />
          ) : i % 4 === 1 ? (
            <Heart className="w-3 h-3 text-[#E8A0A9]/60 fill-[#E8A0A9]/60" />
          ) : i % 4 === 2 ? (
            <Sparkles className="w-3 h-3 text-[#2A5D4E]/60" />
          ) : (
            <div className="w-3 h-3 rounded-full bg-white/40" />
          )}
        </motion.div>
      ))}

      {/* Main letter content */}
      <div className="relative z-10 max-w-3xl w-full space-y-8">
        <motion.div
          initial={{ scale: 0.8, rotateY: -180, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
          className="glass-strong rounded-3xl p-8 md:p-12 border border-white/50 shadow-2xl glow"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block p-3 glass rounded-full mb-4"
            >
              <Gift className="w-12 h-12 text-[#E8A0A9]" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-[#2A5D4E] font-['Poppins'] mb-4 text-shadow">
              Happy Birthday!
            </h2>
            <p className="text-2xl text-[#2A5D4E]/80 font-semibold">17 December 2025</p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="w-24 h-1 bg-gradient-to-r from-[#E8A0A9] to-[#FFD9CC] mx-auto rounded-full mt-4"
            />
          </motion.div>

          {/* Main message */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="absolute -left-4 top-0 text-8xl text-[#E8A0A9]/20 font-serif leading-none">"</div>
            <div className="absolute -right-4 bottom-0 text-8xl text-[#E8A0A9]/20 font-serif leading-none">"</div>

            <div className="glass rounded-2xl p-8 border border-white/30">
              <p className="text-lg md:text-2xl text-[#2A5D4E] leading-relaxed text-center px-4 py-4 min-h-[150px] font-['Inter'] font-medium">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-1 h-7 bg-[#E8A0A9] ml-1"
                />
              </p>
            </div>
          </motion.div>

          {/* Heart animation */}
          {showHeart && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              className="flex justify-center mb-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="p-4 glass-strong rounded-full glow"
              >
                <Heart className="w-16 h-16 text-[#E8A0A9] fill-[#E8A0A9]" />
              </motion.div>
            </motion.div>
          )}

          {/* Birthday emojis */}
          {showHeart && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center mb-6"
            >
              <div className="flex flex-wrap justify-center gap-6">
                {['🎂', '🎉', '🎈', '✨', '💖', '🎁', '🌟', '🎊'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.1, type: "spring" }}
                    className="text-4xl cursor-pointer"
                    whileHover={{ 
                      scale: 1.5, 
                      rotate: 360,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Additional content sections */}
        {showAdditionalContent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-strong rounded-3xl p-8 border border-white/50 shadow-xl"
          >
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block p-3 glass rounded-full mb-4 text-[#E8A0A9]"
              >
                {additionalSections[currentSection].icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-[#2A5D4E] mb-4 font-['Poppins']">
                {additionalSections[currentSection].title}
              </h3>
              <p className="text-lg text-[#2A5D4E] leading-relaxed font-medium">
                {additionalSections[currentSection].content}
              </p>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <LiquidButton
                onClick={prevSection}
                size="medium"
                variant="secondary"
                disabled={currentSection === 0}
              >
                ← Previous
              </LiquidButton>
              <LiquidButton
                onClick={nextSection}
                size="medium"
                variant="secondary"
                disabled={currentSection === additionalSections.length - 1}
              >
                Next →
              </LiquidButton>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {additionalSections.map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === currentSection ? 'bg-[#E8A0A9]' : 'bg-white/40'
                  }`}
                  animate={{
                    scale: i === currentSection ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center"
        >
          <p className="text-[#2A5D4E]/60 text-sm font-medium">
            Made with 💖 for Sneha's special day
          </p>
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#2A5D4E]/50 text-xs mt-2"
          >
            — From Dishant with love
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
