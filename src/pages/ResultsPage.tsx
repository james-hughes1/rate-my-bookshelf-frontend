import React, { useState, useEffect } from 'react';
import type { BookshelfAnalysis } from '../services/types';
import styles from '../styles/Results.module.css';

// ScoreBar Component
interface ScoreBarProps {
    value: number; // -1 to 1
    leftLabel: string;
    rightLabel: string;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ value, leftLabel, rightLabel }) => {
    // Fill width is always positive percentage
    const fillWidth = `${Math.abs(value) * 50}%`;

    // If value >=0, fill starts at 50% (center), else start at center - width
    const fillLeft = '50%';
    const fillTransform = value < 0 ? `translateX(-${fillWidth})` : 'none';

    return (
        <div className={styles.scoreBarContainer}>
            <div className={styles.barLabelLeft}>{leftLabel}</div>
            <div className={styles.barBackground}>
                <div
                    className={styles.barFill}
                    style={{
                        width: fillWidth,
                        left: fillLeft,
                        transform: fillTransform,
                    }}
                />
                <div className={styles.centerLine} />
            </div>
            <div className={styles.barLabelRight}>{rightLabel}</div>
        </div>
    );
};

// Main ResultsPage Component
interface ResultsPageProps {
    result: BookshelfAnalysis;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result }) => {
    const { three_words, scores, recommendation } = result;
    const scoreEntries = Object.entries(scores);

    const [showModal, setShowModal] = useState(false);

    // Lock scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Axis labels
    const axisLabels: Record<string, [string, string]> = {
        age: ['Classic', 'Modern'],
        intensity: ['Beach', 'Intense'],
        mood: ['Dystopian', 'Light'],
        popularity: ['Esoteric', 'Well-known'],
        focus: ['Plot', 'Character'],
        realism: ['Down-to-earth', 'Imaginary'],
    };

    return (
        <div className={styles.container}>
            {/* Taste Words */}
            <section className={styles.tasteWordsSection}>
                <h2 className={styles.tasteWordsHeading}>Your Literary Taste</h2>
                <div className={styles.wordContainer}>
                    {[three_words.word_one, three_words.word_two, three_words.word_three].map(word => (
                        <span key={word} className={styles.word}>{word}</span>
                    ))}
                </div>
            </section>

            {/* Score Bars */}
            <section className={styles.scoresSection}>
                {scoreEntries.map(([metric, value]) => (
                    <ScoreBar
                        key={metric}
                        value={value}
                        leftLabel={axisLabels[metric][0]}
                        rightLabel={axisLabels[metric][1]}
                    />
                ))}
            </section>

            {/* Recommended Book */}
            <section className={styles.recommendationSection}>
                <div className={styles.recommendationCard} onClick={() => setShowModal(true)}>
                    <h4 className={styles.recommendationTitle}>
                        Recommended Book: {recommendation.recommended_book}
                    </h4>
                    <span className={styles.infoCircle}>i</span>
                </div>

                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <button className={styles.closeButton} onClick={() => setShowModal(false)}>✕</button>
                            <h3>{recommendation.recommended_book}</h3>
                            <p>{recommendation.explanation}</p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ResultsPage;
