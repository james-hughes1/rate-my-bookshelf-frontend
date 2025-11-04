import React, { useEffect } from 'react';
import { useBookshelf } from '../context/BookshelfContext';
import { useNavigate } from 'react-router-dom';
import type { BookshelfAnalysis } from '../services/types';
import styles from '../styles/Results.module.css';
import ScoreBar from '../components/ScoreBar';

const ResultsPage: React.FC = () => {
    const { result } = useBookshelf();
    const navigate = useNavigate();

    useEffect(() => {
        if (!result) navigate('/'); // redirect if no data
        else document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, [result, navigate]);

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
                <h2 className={styles.tasteWordsHeading}>
                    Your collection summed up in three words
                </h2>
                <div className={styles.wordContainer}>
                    {[three_words.word_one, three_words.word_two, three_words.word_three].map(word => (
                        <span key={word} className={styles.word}>{word}</span>
                    ))}
                </div>
            </section>

            <section className={styles.scoresSection}>
                <h2 className={styles.scoresHeading}>
                    How your taste in literature stacks up against everybody else's
                </h2>
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
