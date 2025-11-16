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
                    document.getElementById('uploadSection')?.scrollIntoView({ behavior: 'smooth' });
                }
            }} />
            <div id="uploadSection">
                <UploadForm />
            </div>
        </div>
    );
};

export default Home;
