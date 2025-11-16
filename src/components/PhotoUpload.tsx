import { House, BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import styles from '../styles/PhotoUpload.module.css';

interface PhotoUploadProps {
    onFileSelected: (file: File) => void;
    onAnalyze: (file: File, description?: string) => void; // new description param
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onFileSelected, onAnalyze }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [rotation, setRotation] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);
    const [mode, setMode] = useState<'home' | 'library'>('home');
    const [description, setDescription] = useState<string>('');
    const [inputError, setInputError] = useState(false);

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
        if (mode === 'library' && description.trim() === '') {
            // Highlight input instead of alert
            setInputError(true);
            return;
        }
        // Clear error if input is fine
        setInputError(false);
        onAnalyze(file, mode === 'library' ? description : undefined);
    };

    return (
        <section className={styles.container}>
            <div className={styles.modeToggle}>
                <div className={`${styles.toggleOption} ${mode === 'home' ? styles.active : ''}`} onClick={() => setMode('home')}>
                    <House size={16} />
                    Home
                </div>
                <div className={`${styles.toggleOption} ${mode === 'library' ? styles.active : ''}`} onClick={() => setMode('library')}>
                    <BookOpen size={16} />
                    Library
                </div>
                <div className={styles.toggleSwoosh} style={{ transform: mode === 'home' ? 'translateX(0%)' : 'translateX(100%)' }} />
            </div>

            <div className={styles.textSection}>
                <h2 className={styles.title}>Take a photo of your bookshelf</h2>
                <p className={styles.subtitle}>
                    Upload or capture an image of your bookshelf below. Try to ensure your bookshelf image is well-lit, clear, and captures the bookshelf straight-on.
                </p>
            </div>

            {mode === 'library' && (
                <div className={styles.libraryDescription}>
                    <input
                        type="text"
                        placeholder="Describe what sort of book you're looking for..."
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            if (e.target.value.trim() !== '') setInputError(false); // remove highlight as user types
                        }}
                        className={`${styles.descriptionInput} ${inputError ? styles.inputError : ''}`}
                    />
                </div>
            )}

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
