import React, { useState, useEffect } from 'react';
import { mockAnalyzeBookshelf, pingBackend } from '../services/api';
import type { BookshelfAnalysis } from '../services/types';

const loadingPhrases = [
    "Cooking the books...",
    "Dotting the I's and crossing the T's...",
    "Sweeping the shelves...",
    "Assessing the vibes...",
    "Checking the spine alignment...",
    "Organizing your literary aura..."
];

const UploadForm: React.FC<{ onComplete?: (result: BookshelfAnalysis) => void }> = ({ onComplete }) => {
    const [loading, setLoading] = useState(false);
    const [phrase, setPhrase] = useState<string>(loadingPhrases[0]);
    const [result, setResult] = useState<BookshelfAnalysis | null>(null);
    const [readyToView, setReadyToView] = useState(false);

    // Ping backend once (console only)
    useEffect(() => {
        pingBackend().then(alive => console.log(alive ? "Backend reachable ✅" : "Backend not reachable ❌"));
    }, []);

    const handleAnalyzeClick = async () => {
        setLoading(true);

        let phraseIndex = 0;
        const interval = setInterval(() => {
            phraseIndex = (phraseIndex + 1) % loadingPhrases.length;
            setPhrase(loadingPhrases[phraseIndex]);
        }, 1500);

        // Fake 10-second processing
        setTimeout(async () => {
            clearInterval(interval);
            const data = await mockAnalyzeBookshelf();
            setResult(data);
            setLoading(false);
            setReadyToView(true);
        }, 10000);
    };

    const handleSeeRatingsClick = () => {
        if (onComplete && result) {
            onComplete(result);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div style={{ padding: '64px 32px', textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{phrase}</p>
                <div style={{
                    display: 'inline-block',
                    border: '4px solid #8b5cf6',
                    borderTop: '4px solid transparent',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    animation: 'spin 1s linear infinite'
                }} />
                <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    // Ready-to-view state
    if (readyToView && result) {
        return (
            <div style={{ textAlign: 'center', padding: '64px 32px' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Your bookshelf is ready!</p>
                <button
                    onClick={handleSeeRatingsClick}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        backgroundColor: '#8b5cf6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer'
                    }}
                >
                    See My Ratings
                </button>
            </div>
        );
    }

    // Initial state
    return (
        <div style={{ padding: '64px 32px', textAlign: 'center' }}>
            <button
                onClick={handleAnalyzeClick}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
            >
                Analyze My Bookshelf
            </button>
        </div>
    );
};

export default UploadForm;
