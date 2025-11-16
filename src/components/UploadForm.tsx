import React, { useEffect } from 'react';
import { pingBackend } from '../services/api';
import PhotoUpload from './PhotoUpload';
import '../styles/UploadForm.css';

const UploadForm: React.FC = () => {
    useEffect(() => {
        pingBackend().then(alive =>
            console.log(alive ? "Backend reachable ✅" : "Backend not reachable ❌")
        );
    }, []);

    return <PhotoUpload />;
};

export default UploadForm;
