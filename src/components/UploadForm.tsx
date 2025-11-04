import React, { useState, useEffect } from 'react';
import { mockAnalyzeBookshelf, pingBackend } from '../services/api';
import PhotoUpload from './PhotoUpload';
import type { BookshelfAnalysis } from '../services/types';
import { getRandomizedPhrases } from '../data/loadingPhrases';
import '../styles/UploadForm.css';

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
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        pingBackend().then(alive =>
            console.log(alive ? "Backend reachable ✅" : "Backend not reachable ❌")
        );
    }, []);

    const handleAnalyzeClick = async () => {
        if (!file) return alert("Please upload a photo first.");
        setLoading(true);

        // Shuffle phrases to avoid repetition
        const randomized = getRandomizedPhrases();
        let index = 0;
        setPhrase(randomized[index]);

        const interval = setInterval(() => {
            index = (index + 1) % randomized.length;
            setPhrase(randomized[index]);
        }, 1500);

        setTimeout(async () => {
            clearInterval(interval);
            const data = await mockAnalyzeBookshelf();
            setResult(data);
            setLoading(false);
            setReadyToView(true);
        }, 10000);
    };


    const handleSeeRatingsClick = () => {
        if (onComplete && result) onComplete(result);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <p className="loading-text">{phrase}</p>
                <div className="spinner" />
            </div>
        );
    }

    if (readyToView && result) {
        return (
            <div className="ready-container">
                <p className="ready-message">Your bookshelf is ready!</p>
                <button className="primary-button" onClick={handleSeeRatingsClick}>
                    See My Ratings
                </button>
            </div>
        );
    }

    return (
        <div className="upload-container">
            <PhotoUpload onFileSelected={setFile} />
            <button className="primary-button" onClick={handleAnalyzeClick}>
                Analyze My Bookshelf
            </button>
        </div>
    );
};

export default UploadForm;
