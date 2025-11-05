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
    const [error, setError] = useState<string | null>(null);

    const { file, setResult } = useBookshelf();
    const navigate = useNavigate();

    useEffect(() => {
        if (!file) {
            navigate('/');
            return;
        }

        const randomized = getRandomizedPhrases();
        let index = 0;
        setPhrase(randomized[index]);

        const phraseInterval = setInterval(() => {
            index = (index + 1) % randomized.length;
            setPhrase(randomized[index]);
        }, 1500);

        const analyze = async () => {
            try {
                const data = await mockAnalyzeBookshelf(file);
                setResult(data);
                setFinished(true);
            } catch (err) {
                console.error(err);
                setError('Failed to analyze bookshelf. Please try again - make sure you take a clear, well-lit image.');
            } finally {
                clearInterval(phraseInterval); // stop phrases only when API finishes
            }
        };

        analyze(); // start the API call immediately

        return () => {
            clearInterval(phraseInterval);
        };
    }, [file, navigate, setResult]);

    const handleSeeResults = () => navigate('/results');

    if (error) {
        return (
            <div className="loading-container">
                <p className="loading-text">{error}</p>
                <button className="primary-button" onClick={() => navigate('/')}>
                    Go Back
                </button>
            </div>
        );
    }

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
