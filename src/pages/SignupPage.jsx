import React, { useState } from 'react';
import '../styles/Page.css';
import '../styles/SignupPage.css';

function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const EyeIcon = ({ visible }) => (
        <svg
            className="eye-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {visible ? (
                <>
                    <path d="M1 1l22 22" stroke="gray" />
                    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-5.52 0-10.27-3.94-11-9 0-1.63 1.5-4 3.56-5.94" />
                    <path d="M10.29 10.29a3 3 0 014.24 4.24" />
                </>
            ) : (
                <>
                    <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                </>
            )}
        </svg>
    );

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">회원가입</h2>
                <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-wrapper">
                        <input type="email" placeholder="이메일" required />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="이름" required />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="닉네임" required />
                    </div>
                    <div className="input-wrapper">
                        <input type="tel" placeholder="전화번호" required />
                    </div>


                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="비밀번호"
                            required
                        />
                        <button
                            type="button"
                            className="toggle-button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <EyeIcon visible={showPassword} />
                        </button>
                    </div>

                    <div className="password-wrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="비밀번호 확인"
                            required
                        />
                        <button
                            type="button"
                            className="toggle-button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <EyeIcon visible={showConfirmPassword} />
                        </button>
                    </div>

                    <select required>
                        <option value="">직군 선택</option>
                        <option value="기획">기획</option>
                        <option value="디자인">디자인</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="마케팅">마케팅</option>
                        <option value="ai">AI/데이터</option>
                    </select>

                    <label className="checkbox-label">
                        <input type="checkbox" required />
                        안내 메일 수신에 동의합니다
                    </label>

                    <label className="checkbox-label">
                        <input type="checkbox" required />
                        이용약관 및 개인정보처리방침에 동의합니다
                    </label>

                    <button type="submit" className="basic-button">회원가입</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
