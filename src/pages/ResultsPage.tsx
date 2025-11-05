import React, { useEffect, useState } from 'react';
import { useBookshelf } from '../context/BookshelfContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Results.module.css';
import ScoreBar from '../components/ScoreBar';
import LearnMoreBar from '../components/LearnMoreBar';
import AboutPanel from '../components/AboutPanel';

const ResultsPage: React.FC = () => {
    const { result } = useBookshelf();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aboutVisible, setAboutVisible] = React.useState(false);

    useEffect(() => {
        if (!result) navigate('/');
    }, [result, navigate]);

    // Add a separate effect for the modal
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isModalOpen]);

    if (!result) return null;

    const { three_words, scores, recommendation } = result;
    const axisLabels: Record<string, [string, string]> = {
        age: ['Classic', 'Modern'],
        intensity: ['Beach Reads', 'Intense Study'],
        mood: ['Dystopian', 'Inspiring'],
        popularity: ['Esoteric', 'Well-known'],
        focus: ['Plot', 'Characters'],
        realism: ['Down-to-earth', 'Imaginary'],
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.pageHeader}>Rate My Bookshelf</h1>

            <section className={styles.tasteWordsSection}>
                <h2 className={styles.tasteWordsHeading}>In three words...</h2>
                <div className={styles.wordContainer}>
                    {[three_words.word_one, three_words.word_two, three_words.word_three].map(word => (
                        <span key={word} className={styles.word}>{word}</span>
                    ))}
                </div>
            </section>

            <section className={styles.scoresSection}>
                <h2 className={styles.scoresHeading}>Your preferences:</h2>
                {Object.entries(scores).map(([metric, value]) => (
                    <ScoreBar
                        key={metric}
                        value={value}
                        leftLabel={axisLabels[metric][0]}
                        rightLabel={axisLabels[metric][1]}
                    />
                ))}
            </section>

            <section className={styles.recommendationSection}>
                {/* Entire card clickable */}
                <div
                    className={styles.recommendationCard}
                    onClick={() => setIsModalOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsModalOpen(true); }}
                >
                    {/* Info icon first */}
                    <p className={styles.recommendationLabel}>
                        Recommended Book:
                        <h3 className={styles.recommendationTitle}>
                            {recommendation.recommended_book}
                        </h3>
                        Click to learn more
                    </p>
                </div>
            </section>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalPanel} onClick={e => e.stopPropagation()}>
                        <h2 className={styles.modalTitle}>{recommendation.recommended_book}</h2>
                        <p className={styles.modalDescription}>{recommendation.explanation}</p>
                        <button
                            className={styles.modalCloseBtn}
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <AboutPanel visible={aboutVisible} onClose={() => setAboutVisible(false)} />
            <LearnMoreBar setAboutVisible={setAboutVisible} />
        </div>
    );
};

export default ResultsPage;
