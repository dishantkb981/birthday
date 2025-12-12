import { useState } from 'react';
import { motion } from 'framer-motion';

interface RiddleGameProps {
  onComplete: () => void;
}

export default function RiddleGame({ onComplete }: RiddleGameProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [hintIndex, setHintIndex] = useState(0);

  const riddle = {
    question: "What gets lit on your birthday but isn't a lamp?", 
    answer: "candles",
    hints: ["They go on top of something sweet!", "You make a wish when you blow them out", "They help celebrate another year!"]
  };


  const handleSubmit = () => {
    const answer = userAnswer.toLowerCase().trim();
    const correctAnswer = riddle.answer.toLowerCase();
    
    if (answer === correctAnswer || answer.includes(correctAnswer)) {
      setIsCorrect(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 1) {
        setShowHint(true);
        setHintIndex(Math.min(hintIndex + 1, riddle.hints.length - 1));
      }
      // Add a shake animation for wrong answer
      setUserAnswer('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2A5D4E',
        textAlign: 'center',
        padding: 'clamp(20px, 5vw, 40px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Enhanced floating elements */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 50 + 15}px`,
            height: `${Math.random() * 50 + 15}px`,
            borderRadius: '50%',
            background: i % 5 === 0 
              ? 'linear-gradient(45deg, rgba(255,255,255,0.4), rgba(168,237,234,0.2))' 
              : i % 5 === 1
              ? 'linear-gradient(45deg, rgba(254,214,227,0.4), rgba(255,255,255,0.2))'
              : i % 5 === 2
              ? 'linear-gradient(45deg, rgba(255,182,193,0.3), rgba(255,255,255,0.1))'
              : i % 5 === 3
              ? 'linear-gradient(45deg, rgba(173,216,230,0.3), rgba(255,255,255,0.1))'
              : 'linear-gradient(45deg, rgba(221,160,221,0.3), rgba(255,255,255,0.1))',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(8px)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 60 - 30, 0],
            scale: [1, 1.3, 0.7, 1],
            opacity: [0.3, 0.9, 0.3],
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

      {/* Question mark and brain emojis floating */}
      {['❓', '🧠', '💭', '🤔', '💡', '🎯'].map((emoji, i) => (
        <motion.div
          key={emoji + i}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 360],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
        <motion.h2 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ 
            fontSize: 'clamp(2rem, 8vw, 3rem)', 
            marginBottom: 'clamp(0.5rem, 2vw, 1rem)' 
          }}
        >
          🧩 Birthday Riddle Challenge
        </motion.h2>
        
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ 
            fontSize: 'clamp(1rem, 4vw, 1.3rem)', 
            marginBottom: 'clamp(1.5rem, 5vw, 2rem)' 
          }}
        >
          Solve the riddle to unlock your personal letter!
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            borderRadius: '20px',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
          }}
        >
          <h3 style={{ 
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', 
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)', 
            color: '#E8A0A9' 
          }}>
            Birthday Riddle
          </h3>
          
          <p style={{ 
            fontSize: 'clamp(1rem, 4vw, 1.3rem)', 
            lineHeight: '1.6', 
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            fontStyle: 'italic'
          }}>
            "{riddle.question}"
          </p>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(255, 217, 204, 0.3)',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              <p style={{ fontSize: '1rem', color: '#2A5D4E' }}>
                💡 Hint: {riddle.hints[hintIndex]}
              </p>
            </motion.div>
          )}

          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            style={{
              width: '100%',
              padding: 'clamp(12px, 4vw, 15px)',
              fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
              borderRadius: '15px',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              background: 'rgba(255, 255, 255, 0.6)',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              outline: 'none',
              textAlign: 'center'
            }}
          />

          <motion.button
            onClick={handleSubmit}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(232,160,169,0.4)',
              background: 'rgba(232,160,169,0.7)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: 'clamp(12px, 4vw, 15px) clamp(24px, 8vw, 30px)',
              fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
              background: 'rgba(232,160,169,0.5)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '250px'
            }}
          >
            {/* Button shimmer effect */}
            <motion.div
              style={{
                position: 'absolute',
                top: '0',
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
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
            <span style={{ position: 'relative', zIndex: 1 }}>
              Submit Answer ✨
            </span>
          </motion.button>
        </motion.div>

        {attempts > 0 && !showHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#E8A0A9', marginBottom: '1rem' }}
          >
            Try again! You can do it! 🌟
          </motion.p>
        )}

        {isCorrect && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '20px',
              marginTop: '2rem',
              border: '2px solid rgba(168, 237, 234, 0.5)'
            }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#4ecdc4' }}>
              🎉 Correct! 🎉
            </h3>
            <p style={{ fontSize: '1.2rem' }}>
              Opening your personal letter...
            </p>
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: '2rem', margin: '1rem 0' }}
            >
              ⭐
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
