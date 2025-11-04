import React, { useState, useEffect } from 'react';
import { mockAnalyzeBookshelf, pingBackend } from '../services/api';
import type { BookshelfAnalysis } from '../services/types';
import Results from './Results';

const UploadFormMock: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BookshelfAnalysis | null>(null);

    // Ping backend once, log in console
    useEffect(() => {
        pingBackend().then(alive => {
            console.log(alive ? 'Backend reachable ✅' : 'Backend not reachable ❌');
        });
    }, []);

    const handleAnalyzeClick = async () => {
        setLoading(true);
        const data = await mockAnalyzeBookshelf();
        setResult(data);
        setLoading(false);
    };

    return (
        <div style={{ padding: '32px', textAlign: 'center' }}>
            {!result ? (
                <button
                    onClick={handleAnalyzeClick}
                    style={{ padding: '12px', fontSize: '16px' }}
                >
                    {loading ? 'Analyzing...' : 'Run Mock Analysis'}
                </button>
            ) : (
                <Results result={result} />
            )}
        </div>
    );
};

export default UploadFormMock;
