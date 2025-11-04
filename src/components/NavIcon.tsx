import React from 'react';
import styles from '../styles/NavIcon.module.css';

interface NavIconProps {
    onClick: () => void;
}

const NavIcon: React.FC<NavIconProps> = ({ onClick }) => {
    return (
        <div className={styles.navIcon} onClick={onClick} title="About this project">
            ☰
        </div>
    );
};

export default NavIcon;
