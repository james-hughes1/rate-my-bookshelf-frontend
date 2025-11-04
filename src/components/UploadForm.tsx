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

    const handleAnalyze = async (file: File) => {
        navigate('/loading', { state: { file } }); // optional, pass file if needed
    };

    return <PhotoUpload onFileSelected={() => { }} onAnalyze={handleAnalyze} />;
};

export default UploadForm;
