import React, { useEffect } from 'react';
import type { BookshelfAnalysis } from '../services/types';
import styles from '../styles/Results.module.css';

interface ResultsProps {
    result: BookshelfAnalysis;
}

const Results: React.FC<ResultsProps> = ({ result }) => {
    const { three_words, scores, recommendation } = result;
    const scoreEntries = Object.entries(scores);

    // Lock scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className={styles.container}>
            <section className={styles.tasteWordsSection}>
                <h2 className={styles.tasteWordsHeading}>Your Literary Taste</h2>
                <div className={styles.wordContainer}>
                    {[three_words.word_one, three_words.word_two, three_words.word_three].map(word => (
                        <span key={word} className={styles.word}>{word}</span>
                    ))}
                </div>
            </section>

            <section className={styles.scoresSection}>
                <h3 className={styles.scoresHeading}>Your Scores</h3>
                {scoreEntries.map(([metric, value]) => (
                    <div key={metric} className={styles.scoreItem}>
                        <span className={styles.scoreLabel}>{metric.replace('_', ' ')}:</span>
                        <div className={styles.scoreBarBackground}>
                            <div
                                className={styles.scoreBarFill}
                                style={{ width: `${((value + 1) / 2) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </section>

            <section className={styles.recommendationSection}>
                <h3 className={styles.recommendationHeading}>Recommended Book</h3>
                <div className={styles.recommendationCard}>
                    <h4 className={styles.recommendationTitle}>{recommendation.recommended_book}</h4>
                    <p className={styles.recommendationAuthor}>{recommendation.explanation}</p>
                </div>
            </section>
        </div>
    );
};

export default Results;
