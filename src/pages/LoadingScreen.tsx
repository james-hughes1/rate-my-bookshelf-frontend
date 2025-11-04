import React, { useEffect, useState } from 'react';
import '../styles/UploadForm.css';
import { getRandomizedPhrases } from '../data/loadingPhrases';
import { mockAnalyzeBookshelf } from '../services/api';
import type { BookshelfAnalysis } from '../services/types';

interface LoadingScreenProps {
    onComplete: (result: BookshelfAnalysis) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [phrase, setPhrase] = useState<string>('Cooking the books...');

    useEffect(() => {
        const randomized = getRandomizedPhrases();
        let index = 0;
        setPhrase(randomized[index]);

        const phraseInterval = setInterval(() => {
            index = (index + 1) % randomized.length;
            setPhrase(randomized[index]);
        }, 1500);

        const timeout = setTimeout(async () => {
            clearInterval(phraseInterval);
            const data = await mockAnalyzeBookshelf();
            onComplete(data);
        }, 10000);

        return () => {
            clearInterval(phraseInterval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <div className="loading-container">
            <p className="loading-text">{phrase}</p>
            <div className="spinner" />
        </div>
    );
};

export default LoadingScreen;
