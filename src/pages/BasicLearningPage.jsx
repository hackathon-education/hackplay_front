import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Page.css';
import '../styles/BasicLearningPage.css';

function BasicLearningPage() {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <h2 className="page-title">기초학습</h2>
            <div className="basic-card-wrapper">
                <div className="basic-card" onClick={() => navigate('/front/basic/git')}>
                    <h3>깃 사용법</h3>
                    <p>MVP 개발을 위한 버전 관리 시작하기</p>
                    <span className="card-badge">Git</span>
                </div>
                <div className="basic-card" onClick={() => navigate('/front/basic/tool')}>
                    <h3>Tool 설정법</h3>
                    <p>개발 환경 셋업부터 Vite까지</p>
                    <span className="card-badge">Tool</span>
                </div>
            </div>
        </div>
    );
}

export default BasicLearningPage;
