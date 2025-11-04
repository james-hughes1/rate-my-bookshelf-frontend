import React from 'react';
import '../styles/index.css';
import Hero from '../components/Hero';
import UploadForm from '../components/UploadForm';
import NavIcon from '../components/NavIcon';
import AboutPanel from '../components/AboutPanel';

const Home: React.FC = () => {
    const [aboutVisible, setAboutVisible] = React.useState(false);

    return (
        <div>
            <NavIcon onClick={() => setAboutVisible(true)} />
            <AboutPanel visible={aboutVisible} onClose={() => setAboutVisible(false)} />
            <Hero onScrollToUpload={() => {
                const uploadSection = document.getElementById('uploadSection');
                if (uploadSection) {
                    const yOffset = -16;
                    const y = uploadSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }} />
            <div id="uploadSection">
                <UploadForm />
            </div>
        </div>
    );
};

export default Home;
