import React, { useEffect } from 'react';
import { pingBackend } from '../services/api';
import PhotoUpload from './PhotoUpload';
import '../styles/UploadForm.css';
interface UploadFormProps {
    setInstructionsVisible: (visible: boolean) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ setInstructionsVisible }) => {
    useEffect(() => {
        pingBackend().then(alive =>
            console.log(alive ? "Backend reachable ✅" : "Backend not reachable ❌")
        );
    }, []);

    return <PhotoUpload
        setInstructionsVisible={setInstructionsVisible} // pass down
    />;
};

export default UploadForm;
