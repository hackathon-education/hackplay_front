import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-start pt-[60px] min-h-[80vh]">
      <div className="flex flex-col w-[200%] max-w-[500px] px-[50px] mx-auto">
        <h3 className="text-[2.4rem] font-bold mb-[6px] text-[#111]">환영합니다!</h3>
        <p className="text-[2rem] text-[#444] mb-6">서비스 사용을 위해 로그인 해주세요</p>
        <form className="flex flex-col gap-[14px] mt-5 mb-7">
          <input
            type="email"
            placeholder="이메일"
            required
            className="p-[14px] text-[1.05rem] border border-[#ccc] rounded-[6px]"
          />
          <input
            type="password"
            placeholder="비밀번호"
            required
            className="p-[14px] text-[1.05rem] border border-[#ccc] rounded-[6px]"
          />
          <button
            type="submit"
            className="bg-[#0066cc] text-white p-[14px] text-[1.1rem] border-none rounded-[8px] cursor-pointer hover:bg-[#005bb5]"
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
}

export default LoginPage;
