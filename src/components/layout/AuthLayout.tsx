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
      <div className="min-h-screen flex flex-col relative overflow-hidden h-[1115px]">
        {/* 배경 */}
        <img
          src={AuthBg}
          alt=""
          className="absolute inset-0 w-full object-cover object-top z-0 h-full"
        />

        <main
          className={`flex-1 flex flex-col items-center z-base px-10 ${isLoginPage ? 'pt-[11.56%]' : 'pt-[8.02%]'}`}
        >
          {/* 로고 */}
          <Link to={ROUTES.MAIN}>
            <LogoPrimary className="mb-16.5 w-auto h-[31.5px]" />
          </Link>

          {/* 카드 컨테이너 */}
          <div className="w-full max-w-[422px] bg-auth-bg rounded-20 shadow-2 border border-card-border-auth overflow-hidden divide-y divide-divider px-[11px]">
            <div className="py-3.5 text-center">
              <h2 className="text-2xl font-bold text-text-title leading-[1.21] mb-2.5">
                환영합니다!
              </h2>
              <p className="text-text-base leading-[1.21] mb-10">{config.description}</p>

              {/* 입력 폼 영역 */}
              <Outlet />
            </div>

            {/* 하단 배너/푸터 영역 */}
            <div
              className={`mt-3.5 mb-4 px-8 py-[23px] flex flex-col bg-no-repeat bg-center gap-1 rounded-2xl ${isLoginPage ? '' : 'items-end'}`}
              style={{ backgroundImage: `url(${config.footerBg})`, backgroundSize: '100%' }}
            >
              <span className="font-semibold text-text-title leading-[1.2]">
                {config.footerText}
              </span>
              <Link to={config.linkHref} className="text-sm text-text-accent leading-[1.3]">
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
