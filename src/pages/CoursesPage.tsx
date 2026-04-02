import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import BeChar from '@/assets/step/be-character.webp';
import BeComputerIcon from '@/assets/step/be-computer-icon.webp';
import BeDataIcon from '@/assets/step/be-data-icon.webp';
import BeSecurityIcon from '@/assets/step/be-security-icon.webp';
import BeSettingIcon from '@/assets/step/be-setting-icon.webp';
import DeChar from '@/assets/step/de-character.webp';
import DeELearningIcon from '@/assets/step/de-e-learning-icon.webp';
import DeGuideIcon from '@/assets/step/de-guide-icon.webp';
import DeLayoutIcon from '@/assets/step/de-layout-icon.webp';
import DeWebIcon from '@/assets/step/de-web-icon.webp';
import FeChar from '@/assets/step/fe-character.webp';
import FeComputerIcon from '@/assets/step/fe-computer-icon.webp';
import FeProgrammingIcon from '@/assets/step/fe-programming-icon.webp';
import FeTypewriterWithScreenIcon from '@/assets/step/fe-typewriter-with-screen-icon.webp';
import FeWorkstationIcon from '@/assets/step/fe-workstation-icon.webp';
import StepBg from '@/assets/step/step-bg.webp';
import InfoPanel from '@/components/InfoPanel';

import LockModal from '../components/LockModal';
import { JOB_TYPES } from '../constants/jobTypes';
import { useLockModal } from '../hooks/useLockModal';

const JOB_DETAILS = {
  fe: [
    { icon: FeWorkstationIcon, text: '웹/앱 화면을 구현' },
    { icon: FeTypewriterWithScreenIcon, text: '사용자와 상호작용 파트 개발' },
    { icon: FeProgrammingIcon, text: 'API를 호출하여 데이터를 화면에 표시' },
    { icon: FeComputerIcon, text: '반응형·접근성 고려' },
  ],
  be: [
    { icon: BeSettingIcon, text: '서버, 데이터베이스, API 설계 및 개발' },
    { icon: BeDataIcon, text: '비즈니스 로직 구현 및 데이터 처리' },
    { icon: BeSecurityIcon, text: '보안, 인증, 권한 관리 기능 개발' },
    { icon: BeComputerIcon, text: '서버 성능 최적화 및 에러 로그 관리' },
  ],
  de: [
    { icon: DeWebIcon, text: '서비스의 UI/UX 설계 및 디자인 시안 제작' },
    { icon: DeLayoutIcon, text: '사용자 경험(UX) 흐름 기획 및 화면 구성 정의' },
    { icon: DeGuideIcon, text: '색상, 컴포넌트 스타일 등 디자인 가이드 제공' },
    { icon: DeELearningIcon, text: '디자인이 실제 화면에 구현되도록 지원' },
  ],
};

const CoursesPage = () => {
  const [hoveredTab, setHoveredTab] = useState<'fe' | 'be' | 'de' | null>('fe');
  const navigate = useNavigate();
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();

  // 각 포지션별 데이터 설정
  const positions = [
    { id: 'fe' as const, image: FeChar, title: 'Frontend', data: JOB_TYPES.FRONT },
    { id: 'be' as const, image: BeChar, title: 'Backend', data: JOB_TYPES.BACK },
    { id: 'de' as const, image: DeChar, title: 'Designer', data: JOB_TYPES.DESIGN },
  ];

  return (
    <div className="relative lg:h-[1114px] overflow-hidden -mx-[15px] lg:-mx-5 -mt-16.5 lg:-mt-24">
      {/* 배경 */}
      <img src={StepBg} alt="" className="absolute inset-0 z-0" />

      <div className="relative z-base px-[15px] lg:px-5 pt-34">
        {/* 헤더 섹션 */}
        <div className="flex flex-col items-center mb-[45px]">
          <div className="w-13.5 h-13.5 bg-logo-bg rounded-full flex items-center justify-center mb-5 shadow-1 border border-logo-border">
            <img
              src={`${import.meta.env.BASE_URL}favicon/android-chrome-512x512.png`}
              alt=""
              className="w-8 -translate-y-[1px]"
            />
          </div>
          <h2 className="text-[34px] font-bold text-text-title mb-2.5 leading-[1.21]">
            나의 포지션 선택
          </h2>
          <p className="text-text-base text-xl leading-[1.2]">
            각 포지션에 대해 알아보고 원하는 포지션을 선택해주세요!
          </p>
        </div>

        {/* 카드 컨테이너 */}
        <div className="flex justify-center gap-10 h-[495px] max-w-[1040px] mx-auto">
          {positions.map((pos) => (
            <motion.div
              key={pos.id}
              className={`position-card relative rounded-30 w-80 h-120 overflow-hidden ${
                pos.id == 'be'
                  ? 'shadow-5 border border-card-border-lavender-200'
                  : 'self-end shadow-1'
              }`}
              onMouseEnter={() => setHoveredTab(pos.id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {/* 기본 캐릭터 이미지 (호버 시 블러 처리) */}
              <img
                src={pos.image}
                alt={pos.title}
                className={`w-full h-full object-cover transition-all duration-300 ${hoveredTab === pos.id ? '' : 'grayscale brightness-[1.02]'}`}
              />

              {/* 호버 오버레이 (디졸브 애니메이션) */}
              <AnimatePresence>
                {hoveredTab === pos.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute inset-0 z-nav bg-gradient-card-glass backdrop-blur-[15px] flex flex-col items-center px-[13px]"
                  >
                    {/* 포지션 뱃지 */}
                    <div className="bg-[#007AFF] px-8 py-3 rounded-full mb-8 shadow-lg">
                      <span className="text-white text-2xl font-bold">{pos.title}</span>
                    </div>

                    {/* 상세 설명 리스트 */}
                    <div className="w-full space-y-3 mb-auto">
                      {JOB_DETAILS[pos.id].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 bg-white/10 border border-white/30 rounded-xl px-4 py-3 backdrop-blur-sm"
                        >
                          <span className="text-white text-lg">
                            <img src={item.icon} alt="" className="w-6 h-6 object-contain" />
                          </span>
                          <p className="text-white text-[15px] font-medium leading-tight">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* 단계 선택 섹션 */}
                    <div className="w-full mt-6">
                      <p className="text-white text-center font-bold mb-4">단계 선택</p>
                      <div className="flex justify-between gap-2">
                        {['초급', '중급', '고급'].map((level) => (
                          <div
                            key={level}
                            className="flex-1 bg-white/80 rounded-2xl py-3 flex flex-col items-center gap-1 shadow-inner"
                          >
                            <span className="text-[#0056b3] text-xs font-bold">{level}</span>
                            <svg
                              className="w-5 h-5 text-[#0056b3]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <LockModal
        isOpen={isLockModalOpen}
        onClose={closeLockModal}
        message="이 강의는 현재 준비 중입니다."
      />
    </div>
  );
};

export default CoursesPage;
