import React from 'react';
import '../styles/Page.css';

function LoginPage() {
    return (
        <div className="page-container">
            <h2>로그인</h2>
            <form className="login-form">
                <input type="email" placeholder="이메일" required />
                <input type="password" placeholder="비밀번호" required />
                <button type="submit" className="basic-button">로그인</button>
            </form>
        </div>
    );
}

export default LoginPage;
