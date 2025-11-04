// src/pages/Home.tsx
import React, { useRef, useState } from 'react';
import Hero from '../components/Hero';
import UploadForm from '../components/UploadForm';
import type { BookshelfAnalysis } from '../services/types';

const Home: React.FC = () => {
    const uploadRef = useRef<HTMLDivElement>(null);
    const [result, setResult] = useState<BookshelfAnalysis | null>(null);

    const scrollToUpload = () => {
        if (uploadRef.current) {
            uploadRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Hero onScrollToUpload={scrollToUpload} />
            <div ref={uploadRef} style={{ minHeight: '50vh', padding: '32px' }}>
                {!result && <UploadForm onResult={setResult} />}
                {result && (
                    <div>
                        <h2>Result JSON (for now):</h2>
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
