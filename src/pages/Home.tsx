import React, { useRef } from 'react';
import Hero from '../components/Hero';

const Home: React.FC = () => {
    const uploadRef = useRef<HTMLDivElement>(null);

    const scrollToUpload = () => {
        if (uploadRef.current) {
            uploadRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Hero onScrollToUpload={scrollToUpload} />
            <div ref={uploadRef} style={{ minHeight: '50vh' }}>
                {/* UploadForm will go here */}
            </div>
        </div>
    );
};

export default Home;
