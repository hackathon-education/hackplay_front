import React from 'react';
// import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';

function MainPage() {
    // const navigate = useNavigate();

    return (
        <div className="container">
            <main className="main-content">
                <section className="content-section">
                    <h2>플랫폼 소개</h2>
                    <p>웹 개발 입문부터 실전 프로젝트까지! 체계적으로 성장할 수 있는 실습형 학습 플랫폼입니다.</p>
                    <p>HTML, CSS, JavaScript부터 시작해 React, Node.js를 거쳐 실제 서비스를 기획하고 배포하는 과정까지 경험할 수 있습니다.</p>
                    <p>단순한 강의 시청이 아닌, 코드를 직접 작성하고 실시간 피드백을 통해 실력을 키워나갈 수 있습니다.</p>
                    <p>실습 이후에는 팀을 모집하여 실제 프로젝트를 수행하는 기회도 제공됩니다.</p>
                </section>
            </main>
        </div>
    );
}

export default MainPage;
