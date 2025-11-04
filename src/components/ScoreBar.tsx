import React from 'react';
import styles from '../styles/ScoreBar.module.css';

interface ScoreBarProps {
    value: number; // [-1, 1]
    leftLabel: string;
    rightLabel: string;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ value, leftLabel, rightLabel }) => {
    const clamped = Math.max(-1, Math.min(1, value));
    const positionPercent = ((clamped + 1) / 2) * 100; // maps [-1,1] → [0,100]%

    return (
        <div className={styles.scoreBarContainer}>
            <div className={styles.labels}>
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
            <div className={styles.barBackground}>
                {/* Midline at 50% */}
                <div className={styles.midline}></div>
                {/* Score indicator as a diamond */}
                <div
                    className={styles.scoreIndicator}
                    style={{ left: `${positionPercent}%` }}
                />
            </div>
        </div>
    );
};

export default ScoreBar;
