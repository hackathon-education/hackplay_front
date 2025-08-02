import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import logoIcon from '../assets/logo_icon.png';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo-wrapper" onClick={() => navigate('/')}>
                    <img src={logoIcon} alt="logo-icon" className="logo-icon" />
                    <span className="logo-text">hackplay</span>
                </div>

                <nav className="nav">
                    <ul className="nav-links">
                        <li className={isActive('/') ? 'active' : ''}>
                            <button onClick={() => navigate('/')}>소개</button>
                        </li>
                        <li className={isActive('/courses') ? 'active' : ''}>
                            <button onClick={() => navigate('/courses')}>단계별 학습</button>
                        </li>
                        <li className={isActive('/projects') ? 'active' : ''}>
                            <button onClick={() => navigate('/projects')}>프로젝트 모집</button>
                        </li>
                        <li className={isActive('/ranking') ? 'active' : ''}>
                            <button onClick={() => navigate('/ranking')}>랭킹</button>
                        </li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <button className="login-button" onClick={() => navigate('/login')}>
                        로그인 <span className="arrow">〉</span>
                    </button>
                    <button className="menu-circle">☰</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
