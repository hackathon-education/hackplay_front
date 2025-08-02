import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Page.css';
import '../styles/LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="login-page-container">
            <div className="login-box">
                <h3 className="login-title">환영합니다!</h3>
                <p className="login-subtitle">서비스 사용을 위해 로그인 해주세요</p>
                <form className="login-form">
                    <input type="text" placeholder="아이디" required />
                    <input type="password" placeholder="비밀번호" required />
                    <button type="submit" className="login-submit-btn">로그인</button>
                </form>
                <hr className="login-divider" />
                <p className="signup-text">
                    처음 방문하셨나요?
                    <button
                        className="signup-link-btn"
                        onClick={() => navigate('/signup')}
                    >
                        회원 가입
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
