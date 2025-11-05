import React from "react";
import "../styles/LearnMoreBar.css";

interface LearnMoreBarProps {
    setAboutVisible: (visible: boolean) => void;
}

const LearnMoreBar: React.FC<LearnMoreBarProps> = ({ setAboutVisible }) => {
    return (
        <div className="learn-more-bar" onClick={() => setAboutVisible(true)}>
            Learn more about this app
        </div>
    );
};

export default LearnMoreBar;
