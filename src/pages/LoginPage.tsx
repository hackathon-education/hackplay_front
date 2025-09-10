import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const canSubmit = isValid;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // 로그인 API 호출
  };

  return (
    <div className="flex justify-center items-start pt-[60px] min-h-[80vh]">
      <div className="flex flex-col w-[200%] max-w-[500px] px-[50px] mx-auto">
        <h3 className="text-[2.4rem] font-bold mb-[6px] text-[#111]">환영합니다!</h3>
        <p className="text-[2rem] text-[#444] mb-6">서비스 사용을 위해 로그인 해주세요</p>
        <form className="flex flex-col gap-[14px] mt-5 mb-7" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="이메일"
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
            className="p-[14px] text-[1.05rem] border border-[#ccc] rounded-[6px]"
          />
          {errors.email && (
            <span className="text-red-500 text-[0.85rem]">{errors.email.message}</span>
          )}

          <input
            type="password"
            placeholder="비밀번호"
            maxLength={20}
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              validate: (value) => {
                if (value.length < 8 || value.length > 20) {
                  return '비밀번호는 8~20자 사이여야 합니다.';
                }
                if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(value)) {
                  return '비밀번호는 영문, 숫자, 특수문자만 사용할 수 있습니다.';
                }

                const hasLetter = /[a-zA-Z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

                const count = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
                if (count < 2) {
                  return '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.';
                }

                return true;
              },
            })}
            className="p-[14px] text-[1.05rem] border border-[#ccc] rounded-[6px]"
          />
          {errors.password && (
            <span className="text-red-500 text-[0.85rem]">{errors.password.message}</span>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={`bg-[#0066cc] text-white p-[14px] text-[1.1rem] border-none rounded-[8px]
              ${canSubmit ? 'hover:bg-[#005bb5]' : ''}`}
          >
            로그인
          </button>
        </form>

        <hr className="border-none border-t border-[#ccc] my-5 mb-2.5" />
        <p className="text-center text-[0.9rem] text-[#777]">
          처음 방문하셨나요?
          <button
            className="bg-none border-none text-[#0070f3] font-semibold text-[0.95rem] ml-[6px] cursor-pointer underline"
            onClick={() => navigate('/signup')}
          >
            회원 가입
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
