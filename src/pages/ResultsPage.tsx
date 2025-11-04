import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import type { BookshelfAnalysis } from '../services/types';
import styles from '../styles/Results.module.css';

// ScoreBar Component
interface ScoreBarProps {
    value: number; // -1 to 1
    leftLabel: string;
    rightLabel: string;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ value, leftLabel, rightLabel }) => {
    const fillWidth = `${Math.abs(value) * 50}%`;
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
    result: BookshelfAnalysis | null; // allow null
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result }) => {
    // Redirect if no result
    if (!result) {
        return <Navigate to="/" replace />;
    }

    const { three_words, scores, recommendation } = result;
    const scoreEntries = Object.entries(scores);

    // Lock scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

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
            {/* Header */}
            <h1 className={styles.pageHeader}>Rate My Bookshelf</h1>

            {/* Three Words */}
            <section className={styles.tasteWordsSection}>
                <h2 className={styles.tasteWordsHeading}>
                    Your collection summed up in three words
                </h2>
                <div className={styles.wordContainer}>
                    {[three_words.word_one, three_words.word_two, three_words.word_three].map(word => (
                        <span key={word} className={styles.word}>{word}</span>
                    ))}
                </div>
            </section>

            {/* Score Bars */}
            <section className={styles.scoresSection}>
                <h2 className={styles.scoresHeading}>
                    How your taste in literature stacks up against everybody else's
                </h2>
                {scoreEntries.map(([metric, value]) => (
                    <ScoreBar
                        key={metric}
                        value={value}
                        leftLabel={axisLabels[metric][0]}
                        rightLabel={axisLabels[metric][1]}
                    />
                ))}
            </section>

            {/* Recommendation */}
            <section className={styles.recommendationSection}>
                <div className={styles.recommendationCard}>
                    <p className={styles.recommendationLabel}>Recommended Book:</p>
                    <h3 className={styles.recommendationTitle}>{recommendation.recommended_book}</h3>
                    <p className={styles.recommendationExplanation}>{recommendation.explanation}</p>
                </div>
            </section>
        </div>
    );
};

export default ResultsPage;
