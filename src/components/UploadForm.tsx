import React, { useState, useEffect } from 'react';
import { mockAnalyzeBookshelf, pingBackend } from '../services/api';
import type { BookshelfResult } from '../services/types';

const UploadFormMock: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BookshelfResult | null>(null);

    // Ping backend once, just for console logging
    useEffect(() => {
        const checkBackend = async () => {
            try {
                const alive = await pingBackend();
                console.log(alive ? 'Backend reachable ✅' : 'Backend not reachable ❌');
            } catch {
                console.log('Backend ping failed ❌');
            }
        };
        checkBackend();
    }, []);

    const handleAnalyzeClick = async () => {
        setLoading(true);
        const data = await mockAnalyzeBookshelf(); // simulate API response
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
                <pre style={{ textAlign: 'left', maxWidth: '600px', margin: '16px auto' }}>
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default UploadFormMock;
