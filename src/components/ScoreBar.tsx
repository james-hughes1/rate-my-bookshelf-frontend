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

export default ScoreBar;