import React, { useState } from 'react';
import Hero from '../components/Hero';
import UploadFormMock from '../components/UploadForm';
import NavIcon from '../components/NavIcon';
import AboutPanel from '../components/AboutPanel';

const Home: React.FC = () => {
    const [aboutVisible, setAboutVisible] = useState(false);

    return (
        <div>
            <NavIcon onClick={() => setAboutVisible(true)} />
            <AboutPanel visible={aboutVisible} onClose={() => setAboutVisible(false)} />
            <Hero onScrollToUpload={() => {
                const uploadSection = document.getElementById('uploadSection');
                uploadSection?.scrollIntoView({ behavior: 'smooth' });
            }} />
            <div id="uploadSection">
                <UploadFormMock />
            </div>
        </div>
    );
};

export default Home;
