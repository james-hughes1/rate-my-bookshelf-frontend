import React from 'react';
import styles from '../styles/Hero.module.css';

interface HeroProps {
    onScrollToUpload?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToUpload }) => {
    return (
        <section className={styles.heroSection}>
            <h1 className={styles.heroTitle}>Discover Your Literary Taste</h1>
            <p className={styles.heroSubtitle}>
                Upload a photo of your bookshelf and get a personalized book recommendation.
            </p>
            <button className={styles.heroButton} onClick={onScrollToUpload}>
                Get Started
            </button>
        </section>
    );
};

export default Hero;
