import { useNavigate } from 'react-router-dom';

function BasicLearningPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[600px] mx-auto my-[50px] p-[30px] border-2 border-[#0059b3] rounded-[10px] text-center">
      <h2 className="text-[1.8rem] mb-[30px] text-center">기초학습</h2>
      <div className="flex justify-center gap-10 flex-wrap">
        <div
          className="bg-gradient-to-br from-[#74ebd5] to-[#ACB6E5] w-[280px] p-[25px] rounded-[20px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all duration-200 ease-in-out cursor-pointer text-left text-[#333] relative hover:-translate-y-[5px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
          onClick={() => navigate('/front/basic/git')}
        >
          <h3 className="mb-2.5 text-[1.3rem]">깃 사용법</h3>
          <p className="text-[0.95rem] text-[#222] mb-[15px]">MVP 개발을 위한 버전 관리 시작하기</p>
          <span className="absolute top-5 right-5 bg-white/80 px-3 py-[5px] text-[0.8rem] rounded-[20px] font-bold text-[#0077b6]">
            Git
          </span>
        </div>
        <div
          className="bg-gradient-to-br from-[#74ebd5] to-[#ACB6E5] w-[280px] p-[25px] rounded-[20px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all duration-200 ease-in-out cursor-pointer text-left text-[#333] relative hover:-translate-y-[5px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
          onClick={() => navigate('/front/basic/tool')}
        >
          <h3 className="mb-2.5 text-[1.3rem]">Tool 설정법</h3>
          <p className="text-[0.95rem] text-[#222] mb-[15px]">개발 환경 셋업부터 Vite까지</p>
          <span className="absolute top-5 right-5 bg-white/80 px-3 py-[5px] text-[0.8rem] rounded-[20px] font-bold text-[#0077b6]">
            Tool
          </span>
        </div>
      </div>
    </div>
  );
}

export default BasicLearningPage;
