import React, { useState } from 'react';
import '../styles/PhotoUpload.css';

interface PhotoUploadProps {
    onFileSelected: (file: File) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onFileSelected }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelected(file);
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    return (
        <div className="photo-upload-container">
            {preview && (
                <img src={preview} alt="preview" className="photo-preview" />
            )}
            <label className="upload-label">
                {preview ? 'Change Photo' : 'Upload Photo'}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="upload-input"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

export default PhotoUpload;
