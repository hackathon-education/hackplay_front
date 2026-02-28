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
    className="size-10 flex items-center justify-center border-[1.33px] border-icon-border rounded-full"
    aria-label={ariaLabel}
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="w-full border-t border-banner-border bg-nav-bg pb-10 text-sm text-nav-text-default divide-y divide-divider-heavy">
      {/* 상단 서비스 메뉴 */}
      <nav className="flex gap-10 px-50 py-4">
        {['공지사항', 'FAQ', '문의하기', '피드백제안', '개발인원 소개 및 포트폴리오'].map(
          (menu) => (
            // TODO: 메뉴 5개 각각 href 값 넣기
            <a key={menu} href={`/${menu}`} className="hover:text-nav-text-hover">
              {menu}
            </a>
          ),
        )}
      </nav>
      <div className="px-50 grid grid-cols-1 md:grid-cols-2 gap-10 pt-10">
        {/* 좌측 영역: 로고 및 사업자 정보 */}
        {/* TODO: 실제 정보로 수정 */}
        <div>
          <LogoMono className="mb-4 mt-[11px]" />
          <div className="text-sm leading-[1.2] mb-7.5 text-text-base">
            초보자부터 실무까지, 단계별로 배우는 웹 개발 학습 플랫폼
          </div>
          <div className="space-y-1.5 text-sm leading-[1.2] text-text-base mb-10">
            <div>
              hackplay Inc. ㅣ부산광역시 해운대구 웹로 123 ㅣ 대표 : 홍길동 ㅣ 사업자등록번호 :
              000-01-23456
            </div>
            <div>
              사업지전화번호 : 000-123-4567 ㅣ 통신판매업번호 : 12-12345 ㅣ 기타 사업자관련등록번호
              : 01-2345
            </div>
          </div>
          <div className="text-sm leading-[1.29] text-text-base">
            Copyright ⓒ 2026 hackplay Inc. All rights reserved.
          </div>
        </div>

        {/* SNS 및 약관 */}
        <div className="flex flex-col items-start md:items-end gap-5 w-full">
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
          <nav className="flex gap-5 text-text-base text-sm leading-[1.2]">
            <a href="/terms">이용약관</a>
            <a href="/privacy">개인정보처리방침</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
