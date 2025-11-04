import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pingBackend } from '../services/api';
import PhotoUpload from './PhotoUpload';
import '../styles/UploadForm.css';

const UploadForm: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        pingBackend().then(alive =>
            console.log(alive ? "Backend reachable ✅" : "Backend not reachable ❌")
        );
    }, []);

    const handleAnalyze = (file: File) => {
        console.log("Analyzing file:", file.name);
        navigate('/loading'); // 🚀 go to loading screen
    };

    return <PhotoUpload onFileSelected={() => { }} onAnalyze={handleAnalyze} />;
};

export default UploadForm;
