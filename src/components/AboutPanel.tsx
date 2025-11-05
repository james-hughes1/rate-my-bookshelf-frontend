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
                    Rate my bookshelf is a web app that uses image segmentation, EasyOCR, and Gemini to give you a fun summary of an image of a bookshelf.
                </p>
                <p>
                    If you want to learn more about how it works behind the scenes visit the GitHub or connect with me on LinkedIn.
                </p>
                <div>
                    <a href="https://github.com/james-hughes1" target="_blank" rel="noreferrer" className={styles.pill}>GitHub</a>
                </div>
                <div>
                    <a href="https://linkedin.com/in/jameshughes-1" target="_blank" rel="noreferrer" className={styles.pill}>LinkedIn</a>
                </div>
                <button onClick={onClose} className={styles.closeButton}>Close</button>
            </div>
        </div >
    );
};

export default AboutPanel;
