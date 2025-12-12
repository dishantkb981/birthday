interface LandingProps {
  onEnter: () => void;
}

export default function Landing({ onEnter }: LandingProps) {
  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF8F2, #FFD9CC, #E8A0A9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold', 
          color: '#2A5D4E', 
          marginBottom: '2rem',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Sneha
        </h1>
        <p style={{ 
          fontSize: '1.5rem', 
          color: '#2A5D4E', 
          marginBottom: '2rem' 
        }}>
          17 December - A special girl's birthday 🎉
        </p>
        <button 
          onClick={onEnter}
          style={{
            padding: '1rem 2rem',
            background: '#2A5D4E',
            color: 'white',
            borderRadius: '2rem',
            fontSize: '1.2rem',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Open Your Surprise →
        </button>
      </div>
    </div>
  );
}
