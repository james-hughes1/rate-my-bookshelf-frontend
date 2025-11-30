import React from 'react';
import '../styles/index.css';
import Hero from '../components/Hero';
import UploadForm from '../components/UploadForm';
import NavIcon from '../components/NavIcon';
import AboutPanel from '../components/AboutPanel';
import InstructionsModal from '../components/InstructionsModal';

const Home: React.FC = () => {
    const [aboutVisible, setAboutVisible] = React.useState(false);
    const [instructionsVisible, setInstructionsVisible] = React.useState(false); // NEW

    return (
        <div>
            <NavIcon onClick={() => setAboutVisible(true)} />
            <AboutPanel visible={aboutVisible} onClose={() => setAboutVisible(false)} />

            <Hero
                onScrollToUpload={() => {
                    const uploadSection = document.getElementById('uploadSection');
                    if (uploadSection) {
                        uploadSection.scrollIntoView({ behavior: 'smooth' });
                        // Delay opening modal by 1 second
                        setTimeout(() => {
                            setInstructionsVisible(true);
                        }, 1000);
                    }
                }}
            />

            {instructionsVisible && (
                <InstructionsModal onClose={() => setInstructionsVisible(false)} />
            )}

            <div id="uploadSection">
                <UploadForm
                    setInstructionsVisible={setInstructionsVisible} // pass down
                />
            </div>
        </div>
    );
};

export default Home;
