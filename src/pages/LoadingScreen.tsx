import { BookOpen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getRandomizedPhrases } from '../data/loadingPhrases';
import { mockAnalyzeBookshelf } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useBookshelf } from '../context/BookshelfContext';
import '../styles/UploadForm.css';
import '../styles/index.css';

const LoadingScreen: React.FC = () => {
    const [phrase, setPhrase] = useState('Cooking the books...');
    const [finished, setFinished] = useState(false);
    const { setResult } = useBookshelf();
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
            const data = await mockAnalyzeBookshelf(); // real API call later
            setResult(data);
            setFinished(true);
        }, 10000);

        return () => {
            clearInterval(phraseInterval);
            clearTimeout(timeout);
        };
    }, [setResult]);

    const handleSeeResults = () => navigate('/results');

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
