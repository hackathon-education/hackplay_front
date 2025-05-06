import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Page.css';
import '../styles/CoursesPage.css';

function CoursesPage() {
    const [selectedTab, setSelectedTab] = useState(null);
    const [frontLevel] = useState('beginner');
    const navigate = useNavigate();

    const handleBeginnerClick = () => {
        navigate('/front/beginner');
    };

    const renderFrontLevels = () => (
        <div>
            <div className="tab-wrapper">
                <div
                    className={`level-tab level-beginner ${frontLevel === 'beginner' ? 'active' : ''}`}
                    onClick={handleBeginnerClick}
                >
                    초급
                </div>
                <div className="level-tab level-intermediate locked">
                    중급 - 추후 개발 🔒
                </div>
                <div className="level-tab level-advanced locked">
                    고급 - 추후 개발 🔒
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (selectedTab) {
            case 'front':
                return renderFrontLevels();
            case 'back':
                return (
                    <div className="tab-content locked">
                        <h3>Back - 추후 개발</h3>
                        <p>🔒 잠겨있는 항목입니다.</p>
                    </div>
                );
            case 'design':
                return (
                    <div className="tab-content locked">
                        <h3>Design - 추후 개발</h3>
                        <p>🔒 잠겨있는 항목입니다.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="page-container">
            <h2>단계별 학습 과정</h2>
            <div className="tab-wrapper">
                <div
                    className={`tab front-tab ${selectedTab === 'front' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('front')}
                >
                    Front
                </div>
                <div
                    className={`tab back-tab ${selectedTab === 'back' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('back')}
                >
                    Back
                </div>
                <div
                    className={`tab design-tab ${selectedTab === 'design' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('design')}
                >
                    Design
                </div>
            </div>
            {renderContent()}
        </div>
    );
}

export default CoursesPage;
