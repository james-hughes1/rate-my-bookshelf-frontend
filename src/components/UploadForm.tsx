import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pingBackend } from '../services/api';
import { useBookshelf } from '../context/BookshelfContext';
import PhotoUpload from './PhotoUpload';
import '../styles/UploadForm.css';

const UploadForm: React.FC = () => {
    const navigate = useNavigate();
    const { setFile } = useBookshelf();

    useEffect(() => {
        pingBackend().then(alive =>
            console.log(alive ? "Backend reachable ✅" : "Backend not reachable ❌")
        );
    }, []);

    return <PhotoUpload />;
};

export default UploadForm;
