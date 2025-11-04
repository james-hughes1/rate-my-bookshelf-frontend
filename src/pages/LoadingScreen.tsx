import { BookOpen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import '../styles/UploadForm.css';
import { getRandomizedPhrases } from '../data/loadingPhrases';
import { mockAnalyzeBookshelf } from '../services/api';
import type { BookshelfAnalysis } from '../services/types';
import { useNavigate } from 'react-router-dom';

interface LoadingScreenProps {
    onComplete: (result: BookshelfAnalysis) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [phrase, setPhrase] = useState<string>('Cooking the books...');
    const [finished, setFinished] = useState(false);
    const [result, setResult] = useState<BookshelfAnalysis | null>(null);
    const navigate = useNavigate();

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
            const data = await mockAnalyzeBookshelf(); // Replace with real backend call later
            setResult(data);
            setFinished(true);
        }, 10000);

        return () => {
            clearInterval(phraseInterval);
            clearTimeout(timeout);
        };
    }, []);

    const handleSeeResults = () => {
        if (result) onComplete(result);
    };

    return (
        <div className="loading-container">
            {!finished ? (
                <>
                    <p className="loading-text">{phrase}</p>
                    <BookOpen className="bookshelf-icon" />
                </>
            ) : (
                <div className="finished-container">
                    <p className="finished-text">Your bookshelf is ready!</p>
                    <button className="primary-button" onClick={handleSeeResults}>
                        See My Ratings →
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoadingScreen;
