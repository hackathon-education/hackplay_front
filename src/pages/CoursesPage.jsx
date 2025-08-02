import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Page.css';
import '../styles/CoursesPage.css';
import Frontend from '../assets/frontend.png'
import Backend from'../assets/backend.png'
import Designer from '../assets/designer.png'

function CoursesPage() {
    const [selectedTab, setSelectedTab] = useState('front');
    const navigate = useNavigate();

    const handleBeginnerClick = () => {
        navigate('/front/beginner');
    };

    return (
        <div className="page-container">
            <h2 className="step-title">나의 포지션 선택</h2>

            <div className="card-list">
                <div
                    className={`position-card ${selectedTab === 'front' ? 'selected' : ''}`}
                    onClick={() => setSelectedTab('front')}
                >
                    <img src={Frontend} alt="Front end" className="position-image" />
                    <button className="position-label">
                        Front end
                    </button>
                </div>
                <div
                    className={`position-card ${selectedTab === 'back' ? 'selected' : ''}`}
                    onClick={() => setSelectedTab('back')}
                >
                    <img src={Backend} alt="Back end" className="position-image" />
                    <button className="position-label">
                        Back end
                    </button>
                </div>
                <div
                    className={`position-card ${selectedTab === 'design' ? 'selected' : ''}`}
                    onClick={() => setSelectedTab('design')}
                >
                    <img src={Designer} alt="Designer" className="position-image" />
                    <button className="position-label">
                        Designer
                    </button>
                </div>
            </div>

            <div className="tab-wrapper">
                {selectedTab === 'front' && (
                    <div className="level-tab-wrapper">
                        <div className="level-tab level-beginner" onClick={handleBeginnerClick}>
                            초급
                        </div>
                        <div className="level-tab level-intermediate locked">
                            중급 - 추후 개발 🔒
                        </div>
                        <div className="level-tab level-advanced locked">
                            고급 - 추후 개발 🔒
                        </div>
                    </div>
                )}
                {selectedTab !== 'front' && (
                    <div className="tab-content locked">
                        <h3>{selectedTab === 'back' ? 'Back' : 'Design'} - 추후 개발</h3>
                        <p>🔒 잠겨있는 항목입니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoursesPage;
