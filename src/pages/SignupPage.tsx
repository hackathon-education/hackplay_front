import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TbEye, TbEyeOff } from 'react-icons/tb';

import { axiosInstance } from '@/api/axios';

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  role: string;
  agreeMail: boolean;
  agreeTerms: boolean;
};

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const passwordsMatch = confirmPassword && password !== confirmPassword;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axiosInstance.post('/v1/auth/signup', data);
      alert('회원가입이 완료되었습니다!');
      // TODO: 회원가입 완료 후 페이지 이동 또는 상태 처리
    } catch (error: any) {
      if (error.response) {
        alert(`회원가입 실패: ${error.response.data.message || '알 수 없는 오류'}`);
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[10vh] px-4 py-20">
      <div className="w-full max-w-md bg-white border border-[#0070f3] rounded-xl shadow-lg px-8 py-10">
        <h2 className="text-2xl font-bold text-center text-[#111] mb-6">회원가입</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 */}
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="이메일"
              {...register('email', { required: '이메일을 입력해주세요' })}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-[#fefefe] text-base focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3]"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* 닉네임 */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="닉네임"
              {...register('nickname', { required: '닉네임을 입력해주세요' })}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-[#fefefe] text-base focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3]"
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-1">{errors.nickname.message}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              {...register('password', { required: '비밀번호를 입력해주세요' })}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-[#fefefe] text-base pr-10 focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3]"
            />
            <button
              type="button"
              className="absolute right-3 p-1 hover:opacity-70"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <TbEyeOff className="w-5 h-5 text-gray-600" />
              ) : (
                <TbEye className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="relative flex flex-col">
            <div className="flex items-center">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호 확인"
                {...register('confirmPassword', { required: '비밀번호 확인을 입력해주세요' })}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-[#fefefe] text-base pr-10 focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3]"
              />
              <button
                type="button"
                className="absolute right-3 p-1 hover:opacity-70"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <TbEyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <TbEye className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
            {passwordsMatch && (
              <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</p>
            )}
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* 직무 선택 */}
          <select
            {...register('role', { required: '직무를 선택해주세요' })}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-[#fefefe] text-base appearance-none focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3]"
          >
            <option value="">직무 선택</option>
            <option value="PLAN">기획</option>
            <option value="DESIGN">디자인</option>
            <option value="FRONT">Frontend</option>
            <option value="BACK">Backend</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}

          {/* 체크박스 */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              {...register('agreeMail', { required: '메일 동의가 필요합니다' })}
            />
            안내 메일 수신에 동의합니다
          </label>
          {errors.agreeMail && (
            <p className="text-red-500 text-sm mt-1">{errors.agreeMail.message}</p>
          )}

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              {...register('agreeTerms', { required: '약관 동의가 필요합니다' })}
            />
            이용약관 및 개인정보처리방침에 동의합니다
          </label>
          {errors.agreeTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.agreeTerms.message}</p>
          )}

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="bg-[#0052cc] hover:bg-[#003f9e] text-white font-semibold text-lg py-3 rounded-lg transition-colors"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
