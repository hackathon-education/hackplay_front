import GithubIcon from '@/assets/common/github-icon.svg?react';
import InstagramIcon from '@/assets/common/instagram-icon.svg?react';
import MailIcon from '@/assets/common/mail-icon.svg?react';
import NotionIcon from '@/assets/common/notion-icon.svg?react';
import LogoMono from '@/assets/logo/logo-mono.svg?react';

interface SnsIconProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}

const SnsIcon = ({ href, ariaLabel, children }: SnsIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex size-10 items-center justify-center rounded-full border-[1.33px] border-icon-border"
    aria-label={ariaLabel}
  >
    {children}
  </a>
);

const Footer = () => {
  const menus = [
    // TODO: 메뉴 5개 각각 href 값 넣기
    { name: '공지사항', href: '/notice' },
    { name: 'FAQ', href: '/faq' },
    { name: '문의하기', href: '/contact' },
    { name: '피드백제안', href: '/feedback' },
    { name: '개발인원 소개 및 포트폴리오', href: '/team' },
  ];

  return (
    <footer className="w-full divide-y divide-divider-heavy border-t border-banner-border bg-nav-bg pb-10 text-sm text-nav-text-default">
      {/* 상단 서비스 메뉴 */}
      <nav className="flex flex-wrap gap-x-6 gap-y-2 px-6 py-4 md:gap-10 md:px-12.5 lg:px-50">
        {menus.map((menu) => (
          <a
            key={menu.name}
            href={menu.href}
            className="transition-colors hover:text-nav-text-hover"
          >
            {menu.name}
          </a>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-10 px-6 pt-10 md:grid-cols-2 md:px-12.5 lg:px-50">
        {/* 좌측 영역: 로고 및 사업자 정보 */}
        {/* TODO: 실제 정보로 수정 */}
        <div className="flex flex-col">
          <LogoMono className="mt-[11px] mb-4" />
          <p className="mb-7.5 text-text-base leading-[1.2]">
            초보자부터 실무까지, 단계별로 배우는 웹 개발 학습 플랫폼
          </p>

          <div className="mb-10 space-y-1.5 text-text-base leading-[1.2]">
            <address className="not-italic">
              hackplay Inc. ㅣ부산광역시 해운대구 웹로 123 ㅣ 대표 : 홍길동 ㅣ 사업자등록번호 :
              000-01-23456
            </address>
            <p>
              사업지전화번호 : 000-123-4567 ㅣ 통신판매업번호 : 12-12345 ㅣ 기타 사업자관련등록번호
              : 01-2345
            </p>
          </div>

          <p className="text-xs text-text-base md:text-sm leading-[1.29]">
            Copyright ⓒ 2026 hackplay Inc. All rights reserved.
          </p>
        </div>

        {/* 우측 영역: SNS 및 약관 */}
        <div className="flex flex-col items-start gap-5 md:items-end">
          {/* SNS 아이콘 모음 */}
          {/* TODO: SNS 4개 연결 */}
          <div className="flex gap-2.5">
            <SnsIcon href="https://github.com" ariaLabel="Github">
              <GithubIcon />
            </SnsIcon>
            <SnsIcon href="https://notion.so" ariaLabel="Notion">
              <NotionIcon />
            </SnsIcon>
            <SnsIcon href="https://instagram.com" ariaLabel="Instagram">
              <InstagramIcon />
            </SnsIcon>
            <SnsIcon href="mailto:contact@hackplay.com" ariaLabel="Email">
              <MailIcon />
            </SnsIcon>
          </div>

          {/* 약관 링크 */}
          {/* TODO: 약관 2개 연결 */}
          <nav className="flex gap-5 text-text-base leading-[1.2]">
            <a href="/terms" className="hover:underline">
              이용약관
            </a>
            <a href="/privacy" className="hover:underline">
              개인정보처리방침
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
