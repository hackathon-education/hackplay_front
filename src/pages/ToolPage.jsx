import React from 'react';

function ToolPage() {
    return (
        <div className="page-container">
            <h2>툴 설정법 - MVP 개발</h2>

            <div className="section">
                <h3>🛠 개발 환경 세팅</h3>
                <ul>
                    <li>✅ Node.js 설치 및 버전 확인</li>
                    <li>✅ VSCode 설치 및 기본 확장 추천</li>
                    <li>✅ Git Bash / 터미널 환경 설정</li>
                    <li>✅ NVM 또는 Volta로 Node 버전 관리</li>
                </ul>
            </div>

            <div className="section">
                <h3>⚙️ Vite 프로젝트 생성</h3>
                <ul>
                    <li>✅ `npm create vite@latest`로 초기화</li>
                    <li>✅ React 템플릿 선택</li>
                    <li>✅ 프로젝트 구조 확인 및 실행</li>
                    <li>✅ ESLint, Prettier 설정 (선택)</li>
                </ul>
            </div>

            <div className="section">
                <h3>🔌 기타 설정 팁</h3>
                <ul>
                    <li>✅ 자동 저장 / 포맷 설정</li>
                    <li>✅ 터미널 단축키 등록</li>
                    <li>✅ GitHub 연동 확인</li>
                </ul>
            </div>
        </div>
    );
}

export default ToolPage;
