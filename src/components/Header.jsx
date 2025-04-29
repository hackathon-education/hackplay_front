import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo" onClick={() => navigate('/')}>
                    웹 개발 학습 플랫폼
                </div>
                <nav className="nav">
                    <ul className="nav-links">
                        <li><button onClick={() => navigate('/')}>소개</button></li>
                        <li><button onClick={() => navigate('/courses')}>단계별 학습</button></li>
                        <li><button onClick={() => navigate('/projects')}>프로젝트 모집</button></li>
                    </ul>
                </nav>
                <div className="login-button">
                    <button onClick={() => navigate('/login')}>로그인</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
