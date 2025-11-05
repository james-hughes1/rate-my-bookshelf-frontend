import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import styles from '../styles/PhotoUpload.module.css';

interface PhotoUploadProps {
    onFileSelected: (file: File) => void;
    onAnalyze: (file: File) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onFileSelected, onAnalyze }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [rotation, setRotation] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            onFileSelected(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setRotation(0);
        }
    };

    const handleRotate = () => setRotation((r) => r + 90);

    const handleAnalyzeClick = () => {
        if (!file) return alert("Please upload a photo first!");
        onAnalyze(file);
    };

    return (
        <section className={styles.container}>
            <div className={styles.textSection}>
                <h2 className={styles.title}>Take a photo of your bookshelf</h2>
                <p className={styles.subtitle}>
                    Upload or capture an image of your bookshelf below. Try to ensure your bookshelf image is well-lit, clear, and captures the bookshelf straight-on.
                </p>
            </div>

            <div className={styles.uploadArea}>
                {!preview ? (
                    <label className={styles.uploadPlaceholder}>
                        <span className={styles.placeholderIcon}>📚</span>
                        <p className={styles.placeholderText}>Upload picture of your bookshelf</p>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className={styles.hiddenInput}
                            onChange={handleFileChange}
                        />
                    </label>
                ) : (
                    <div className={styles.imageWrapper}>
                        <img
                            src={preview}
                            alt="Bookshelf preview"
                            className={styles.previewImage}
                            style={{ transform: `rotate(${rotation}deg)` }}
                        />
                    </div>
                )}

                {preview && (
                    <div className={styles.buttonRow}>
                        {/* ✅ Fixed change photo */}
                        <label className={styles.changeBtn}>
                            Change Photo
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className={styles.hiddenInput}
                                onChange={handleFileChange}
                            />
                        </label>

                        <button type="button" className={styles.rotateBtn} onClick={handleRotate}>
                            <RotateCw size={18} />
                            Rotate
                        </button>

                        <button type="button" className={styles.analyzeBtn} onClick={handleAnalyzeClick}>
                            Analyse My Bookshelf
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PhotoUpload;
