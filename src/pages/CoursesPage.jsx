import React from 'react';
import '../styles/Page.css';

function CoursesPage() {
    return (
        <div className="page-container">
            <h2>단계별 학습 과정</h2>
            <p>여기는 학습 과정을 소개하는 페이지입니다.</p>
            <ul className="simple-list">
                <li>HTML/CSS 기초 배우기</li>
                <li>React로 프론트엔드 만들기</li>
                <li>Node.js로 백엔드 만들기</li>
            </ul>
        </div>
    );
}

export default CoursesPage;
