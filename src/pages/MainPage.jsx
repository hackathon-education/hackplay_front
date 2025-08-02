import React from 'react';
import '../styles/MainPage.css';
import Mockup from '../assets/mockup.png'

function MainPage() {
    return (
        <div className="main-container">
            <header className="main-header">
                <h1>
                    웹 개발 입문부터 실전 프로젝트까지!<br />
                    <span className="highlight">체계적으로 성장할 수 있는 실습형 학습 플랫폼</span>
                </h1>
            </header>

            <section className="visual-section">
                <div className="slide-mockup">
                    <div className="mockup-placeholder">
                        <img
                            src={Mockup}
                            alt="메인 모형 이미지"
                            className="mockup-image"
                        />
                    </div>
                    <div className="dots">
                        <span className="dot active" />
                        <span className="dot" />
                    </div>
                </div>
            </section>

            <section className="description-section">
                <p>HTML, CSS, JavaScript부터 시작해</p>
                <p>React, Node.js를 거쳐 실제 서비스를 기획하고 배포하는 과정까지</p>
                <p>기초 문법부터 실습 중심으로 탄탄히 쌓는 프론트엔드 개발의 첫걸음.</p>
                <p>단순한 강의 시청이 아닌, 코드를 직접 작성하고 실시간 피드백을 통해 실력을 키워나갈 수 있습니다.</p>
            </section>
        </div>
    );
}

export default MainPage;
