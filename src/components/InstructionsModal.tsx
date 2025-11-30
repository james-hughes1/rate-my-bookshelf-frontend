import React from 'react';
import styles from '../styles/InstructionsModal.module.css';

interface InstructionsModalProps {
    onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>x</button>
                <h2>How to use</h2>
                <ul>
                    <li><strong>Home Mode:</strong> Upload an image of your bookshelf, and we'll rate it and give you a recommendation.</li>
                    <li><strong>Library Mode:</strong> Upload someone else's bookshelf and describe what you're looking for, then we'll pick one you'll like.</li>
                </ul>
                <p><strong>Top Tip:</strong> For the best results, tidy the bookshelf, take the photo straight-on, and ensure good lighting.</p>
            </div>
        </div >
    );
};

export default InstructionsModal;
