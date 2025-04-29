import React from 'react';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div>© 2025 웹 개발 학습 플랫폼</div>
            <div className="company-info">
                <p><strong>회사명</strong>: WebGrow Inc.</p>
                <p><strong>대표자</strong>: 홍길동</p>
                <p><strong>설립일</strong>: 2024년 6월</p>
                <p><strong>주소</strong>: 부산광역시 해운대구 웹로 123</p>
                <p><strong>사업자등록번호</strong>: 123-45-67890</p>
                <p><strong>비전</strong>: 누구나 쉽게 웹 개발자가 될 수 있는 세상을 만든다.</p>
            </div>
        </footer>
    );
}

export default Footer;
