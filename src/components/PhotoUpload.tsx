import { House, BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import styles from '../styles/PhotoUpload.module.css';
import { useBookshelf } from '../context/BookshelfContext';
import { useNavigate } from 'react-router-dom';

const PhotoUpload: React.FC = () => {
    const { file, setFile, mode, setMode, description, setDescription } = useBookshelf();
    const navigate = useNavigate();

    const [preview, setPreview] = useState<string | null>(null);
    const [rotation, setRotation] = useState<number>(0);
    const [inputError, setInputError] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setRotation(0);
        }
    };

    const handleRotate = () => setRotation((r) => r + 90);

    const handleAnalyzeClick = () => {
        if (!file) {
            setInputError(true);
            return;
        }
        if (mode === 'library' && description.trim() === '') {
            setInputError(true);
            return;
        }
        setInputError(false);
        navigate('/loading'); // go to loading screen
    };


    return (
        <section className={styles.container}>
            <div className={styles.modeToggle}>
                <div
                    className={`${styles.toggleOption} ${mode === 'home' ? styles.active : ''}`}
                    onClick={() => setMode('home')}
                >
                    <House size={16} />
                    Home
                </div>
                <div
                    className={`${styles.toggleOption} ${mode === 'library' ? styles.active : ''}`}
                    onClick={() => setMode('library')}
                >
                    <BookOpen size={16} />
                    Library
                </div>
                <div
                    className={styles.toggleSwoosh}
                    style={{ transform: mode === 'home' ? 'translateX(0%)' : 'translateX(100%)' }}
                />
            </div>

            {mode === 'library' && (
                <div className={styles.libraryDescription}>
                    <input
                        type="text"
                        placeholder="Describe what sort of book you're looking for..."
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            if (e.target.value.trim() !== '') setInputError(false);
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
