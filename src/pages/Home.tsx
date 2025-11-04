import React, { useState } from 'react';
import Hero from '../components/Hero';
import UploadForm from '../components/UploadForm';
import NavIcon from '../components/NavIcon';
import AboutPanel from '../components/AboutPanel';
import InstagramResults from '../components/Results';
import type { BookshelfAnalysis } from '../services/types';

const Home: React.FC = () => {
    const [aboutVisible, setAboutVisible] = useState(false);
    const [instagramResult, setInstagramResult] = useState<BookshelfAnalysis | null>(null);

    if (instagramResult) {
        return (
            <>
                <NavIcon onClick={() => setAboutVisible(true)} />
                <AboutPanel visible={aboutVisible} onClose={() => setAboutVisible(false)} />
                <InstagramResults result={instagramResult} />
            </>
        );
    }

    return (
        <div>
            <NavIcon onClick={() => setAboutVisible(true)} />
            <AboutPanel visible={aboutVisible} onClose={() => setAboutVisible(false)} />
            <Hero
                onScrollToUpload={() => {
                    const uploadSection = document.getElementById('uploadSection');
                    if (uploadSection) {
                        const yOffset = -16; // tweak this to push it further up
                        const y = uploadSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                }}
            />
            <div id="uploadSection">
                <UploadForm onComplete={(res) => setInstagramResult(res)} />
            </div>
        </div>
    );
};

export default Home;
