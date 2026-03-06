import LogoPrimary from '@/assets/logo/logo-primary.svg?react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import AuthBg from '@/assets/auth/auth-bg.webp';
import SignInFooterBg from '@/assets/auth/auth-footer-bg-signin.webp';
import SignUpFooterBg from '@/assets/auth/auth-footer-bg-signup.webp';
import { ROUTES } from '@/constants/routes';

import Footer from './Footer';

const AuthLayout = () => {
  const { pathname } = useLocation();

  const isLoginPage = pathname === ROUTES.SIGNIN;

  const config = {
    description: isLoginPage
      ? '서비스 사용을 위해 로그인 해주세요.'
      : '서비스 사용을 위해 회원가입 해주세요.',
    footerText: isLoginPage ? '처음 방문하셨나요?' : '이미 계정이 있나요?',
    linkText: isLoginPage ? '회원가입' : '로그인',
    linkHref: isLoginPage ? ROUTES.SIGNUP : ROUTES.SIGNIN,
    footerBg: isLoginPage ? SignInFooterBg : SignUpFooterBg,
  };

  return (
    <>
      <div className="relative flex min-h-screen lg:h-[1115px] flex-col overflow-x-hidden">
        {/* 배경 */}
        <img
          src={AuthBg}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover object-top"
        />

        <main
          className={`z-base relative flex flex-1 flex-col items-center px-6 py-12 md:px-10 ${
            isLoginPage ? 'md:pt-[11.56%]' : 'md:pt-[8.02%]'
          }`}
        >
          {/* 로고 */}
          <Link to={ROUTES.MAIN} className="mb-10 md:mb-16.5">
            <LogoPrimary className="h-7 w-auto md:h-[31.5px]" />
          </Link>

          {/* 카드 컨테이너 */}
          <div className="border-card-border-auth bg-auth-bg shadow-2 divide-divider w-full max-w-[422px] divide-y overflow-hidden rounded-20 border px-2.5">
            <div className="py-6 text-center md:py-3.5">
              <h2 className="text-text-title mb-2.5 text-xl font-bold leading-[1.21] md:text-2xl">
                환영합니다!
              </h2>
              <p className="text-text-base mb-8 leading-[1.21] md:mb-10">{config.description}</p>

              {/* 입력 폼 영역 */}
              <div className="px-2 md:px-0">
                <Outlet />
              </div>
            </div>

            {/* 하단 배너/푸터 영역 */}
            <div
              className={`mt-3.5 mb-4 flex flex-col gap-1 rounded-2xl bg-center bg-no-repeat px-6 py-5 md:px-8 md:py-[23px] ${
                isLoginPage ? 'items-start' : 'items-end'
              }`}
              style={{
                backgroundImage: `url(${config.footerBg})`,
                backgroundSize: 'cover',
              }}
            >
              <span className="text-text-title text-sm font-semibold leading-[1.2] md:text-base">
                {config.footerText}
              </span>
              <Link
                to={config.linkHref}
                className="text-text-accent text-xs leading-[1.3] md:text-sm"
              >
                {config.linkText}
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;
