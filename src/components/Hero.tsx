import React from 'react';

interface HeroProps {
    onScrollToUpload?: () => void; // optional callback
}

const Hero: React.FC<HeroProps> = ({ onScrollToUpload }) => {
    return (
        <section
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #8b5cf6, #ec4899)',
                color: 'white',
                textAlign: 'center',
                padding: '32px',
            }}
        >
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
                Discover Your Literary Taste
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '24px' }}>
                Upload a photo of your bookshelf and get a personalized book recommendation.
            </p>
            <button
                onClick={onScrollToUpload}
                style={{
                    backgroundColor: 'white',
                    color: '#8b5cf6',
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
                Get Started
            </button>
        </section>
    );
};

export default Hero;
