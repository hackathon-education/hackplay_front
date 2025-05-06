import React from 'react';
import '../styles/Page.css';
import '../styles/TeamProjectPage.css';

function TeamProjectPage() {
    // 임시 진도 데이터 (나중에 상태 기반으로 확장 가능)
    const completedUnits = 2;
    const totalUnits = 5;
    const progress = (completedUnits / totalUnits) * 100;

    return (
        <div className="team-project-container">
            <div className="header-section">
                <div className="title-block">
                    <h1>실전 Team Project 해보기</h1>
                    <p>프론트엔드 개발 실습을 위한 실전 프로젝트입니다. HTML/CSS/React를 활용한 간단한 MVP 개발 과정을 체험합니다.</p>
                    <div className="tag">Easy</div>
                    <div className="tag">React</div>
                    <div className="tag">MVP</div>
                </div>
                <div className="info-box">
                    <div>총 학습 시간: 약 2시간</div>
                    <div>강의 수: 6개</div>
                    <div>퀴즈: 3개</div>
                    <div className="progress-box">
                        <label>진도율</label>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <button className="start-button">지금 시작하기</button>
                </div>
            </div>

            <div className="section">
                <h2>학습 목표</h2>
                <ul>
                    <li>HTML/CSS 기반의 레이아웃 구성</li>
                    <li>컴포넌트 기반 React 구조 이해</li>
                    <li>간단한 SPA 라우팅 구현</li>
                </ul>
            </div>

            <div className="section">
                <h2>Unit 구성</h2>
                <ol className="unit-list">
                    <li className="unit-card">
                        <img src="https://placehold.co/100x60?text=🔒" alt="locked" />
                        <div>
                            <strong>1. 프로젝트 개요 및 개발환경 구축</strong>
                            <p>Vite + React 개발환경 설정, 구조 설명</p>
                        </div>
                    </li>
                    <li className="unit-card">
                        <img src="https://placehold.co/100x60?text=🔒" alt="locked" />
                        <div>
                            <strong>2. 기본 컴포넌트 만들기</strong>
                            <p>Header, Footer, Card 컴포넌트 구성</p>
                        </div>
                    </li>
                    <li className="unit-card">
                        <img src="https://placehold.co/100x60?text=🔒" alt="locked" />
                        <div>
                            <strong>3. React Router로 페이지 연결</strong>
                            <p>페이지 이동 구조 구현 및 테스트</p>
                        </div>
                    </li>
                    <li className="unit-card locked">
                        <img src="https://placehold.co/100x60?text=🔒" alt="locked" />
                        <div>
                            <strong>4. 상태관리 적용 (추후 공개 🔒)</strong>
                        </div>
                    </li>
                    <li className="unit-card locked">
                        <img src="https://placehold.co/100x60?text=🔒" alt="locked" />
                        <div>
                            <strong>5. 프로젝트 최종 완성 (추후 공개 🔒)</strong>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    );
}

export default TeamProjectPage;
