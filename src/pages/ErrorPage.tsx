import { Link, useNavigate } from 'react-router-dom';

import logo from '@/assets/logo.svg';
import { ROUTES } from '@/constants/routes';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Link to={ROUTES.MAIN}>
        <img
          src={logo}
          alt="HACKPLAY"
          className="h-8"
        />
      </Link>
      <img
        src={`${import.meta.env.BASE_URL}favicon/android-chrome-512x512.png`}
        alt="아이콘"
        className="w-26 grayscale brightness-110 mt-11"
      />
      <p className="mt-14 mb-2.5 text-gray-600 text-lg/[1.5] tracking-tight">
        앗! 페이지를 찾을 수 없어요. 🫨
      </p>
      <div className="flex gap-0.5 mb-20">
        <Link
          to={ROUTES.MAIN}
          className="flex items-center justify-center w-27 h-10 rounded-2xl border border-gray-250 text-gray-650 text-base/[1.4] tracking-tight"
        >
          메인으로
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="w-27 h-10 rounded-2xl border border-gray-250 text-gray-650 text-base/[1.4] tracking-tight"
        >
          이전 페이지
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
