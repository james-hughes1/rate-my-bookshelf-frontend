import React from 'react';
import styles from '../styles/AboutPanel.module.css';

interface AboutPanelProps {
    visible: boolean;
    onClose: () => void;
}

const AboutPanel: React.FC<AboutPanelProps> = ({ visible, onClose }) => {
    return (
        <div
            className={`${styles.panel} ${visible ? styles.visible : ''}`}
            onClick={onClose}
        >
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <h2>About This Project</h2>
                <p>
                    Description here
                </p>
                <p>
                    Description continued.
                </p>
                <button onClick={onClose} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

export default AboutPanel;
