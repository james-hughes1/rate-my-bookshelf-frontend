import React, { useState } from 'react';

interface PhotoUploadProps {
    onFileSelected: (file: File) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onFileSelected }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelected(file);

            // Show preview
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '16px' }}>
            {preview && <img src={preview} alt="preview" style={{ maxWidth: '80%', borderRadius: '12px', marginBottom: '16px' }} />}
            <label
                style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                {preview ? "Change Photo" : "Upload Photo"}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment" // opens camera on mobile
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

export default PhotoUpload;
