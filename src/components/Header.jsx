import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import logoIcon from '../assets/logo_icon.png';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null); // 메뉴 영역 참조

    const isActive = (path) => location.pathname === path;

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // 클린업
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

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

                    <div className="menu-wrapper" ref={menuRef}>
                        <button className="menu-circle" onClick={toggleMenu}>☰</button>
                        {isMenuOpen && (
                            <div className="dropdown-menu">
                                <button onClick={() => alert('계정설정')}>계정설정</button>
                                <button onClick={() => alert('문의하기')}>문의하기</button>
                                <button onClick={() => navigate('/mypage')}>마이페이지</button>
                                <button onClick={() => alert('로그아웃')}>로그아웃</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
