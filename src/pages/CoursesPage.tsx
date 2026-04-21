import BeComputerIcon from '@/assets/step/be-computer-icon.svg?react';
import BeDataIcon from '@/assets/step/be-data-icon.svg?react';
import BeSecurityIcon from '@/assets/step/be-security-icon.svg?react';
import BeSettingIcon from '@/assets/step/be-setting-icon.svg?react';
import DeELearningIcon from '@/assets/step/de-e-learning-icon.svg?react';
import DeGuideIcon from '@/assets/step/de-guide-icon.svg?react';
import DeLayoutIcon from '@/assets/step/de-layout-icon.svg?react';
import DeWebIcon from '@/assets/step/de-web-icon.svg?react';
import FeComputerIcon from '@/assets/step/fe-computer-icon.svg?react';
import FeProgrammingIcon from '@/assets/step/fe-programming-icon.svg?react';
import FeTypewriterWithScreenIcon from '@/assets/step/fe-typewriter-with-screen-icon.svg?react';
import FeWorkstationIcon from '@/assets/step/fe-workstation-icon.svg?react';
import LevelLockIcon from '@/assets/step/level-lock-icon.svg?react';
import LevelLockOpenIcon from '@/assets/step/level-lock-open-icon.svg?react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import BeChar from '@/assets/step/be-character.webp';
import DeChar from '@/assets/step/de-character.webp';
import FeChar from '@/assets/step/fe-character.webp';
import StepBg from '@/assets/step/step-bg.webp';
import Button from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';

import LockModal from '../components/LockModal';
import { JOB_TYPES } from '../constants/jobTypes';
import { useLockModal } from '../hooks/useLockModal';

const JOB_DETAILS = {
  fe: [
    { icon: <FeWorkstationIcon />, text: '웹/앱 화면을 구현' },
    { icon: <FeTypewriterWithScreenIcon />, text: '사용자와 상호작용 파트 개발' },
    { icon: <FeProgrammingIcon />, text: 'API를 호출하여 데이터를 화면에 표시' },
    { icon: <FeComputerIcon />, text: '반응형·접근성 고려' },
  ],
  be: [
    { icon: <BeSettingIcon />, text: '서버, 데이터베이스, API 설계 및 개발' },
    { icon: <BeDataIcon />, text: '비즈니스 로직 구현 및 데이터 처리' },
    { icon: <BeSecurityIcon />, text: '보안, 인증, 권한 관리 기능 개발' },
    { icon: <BeComputerIcon />, text: '서버 성능 최적화 및 에러 로그 관리' },
  ],
  de: [
    { icon: <DeWebIcon />, text: '서비스의 UI/UX 설계 및 디자인 시안 제작' },
    { icon: <DeLayoutIcon />, text: '사용자 경험 흐름 기획 및 화면 구성 정의' },
    { icon: <DeGuideIcon />, text: '색상, 컴포넌트 스타일 등 디자인' },
    { icon: <DeELearningIcon />, text: '디자인이 실제 화면에 구현되도록 지원' },
  ],
};

const CoursesPage = () => {
  const [hoveredTab, setHoveredTab] = useState<'fe' | 'be' | 'de' | null>('fe');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const navigate = useNavigate();
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();

  const FRONT_INTERMEDIATE_DETAIL = {
    title: '중급',
    subtitle: 'Frontend 개발 과정',
    features: [
      '실제 회사와 동일한 Git 협업 흐름 실습',
      '회원가입 · 로그인 · 인증(JWT) 구현',
      'API 연동 및 상태 관리 경험',
      '낙관적 업데이트와 UX 품질 개선',
    ],
    contents: [
      '프로젝트 구조 이해 및 브랜치 전략',
      'Conventional Commits & Pull Request 실습',
      '회원가입 / 로그인 인증 흐름 구현',
      '게시물 저장 기능 및 접근 제어 처리',
    ],
  };

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
                    className="absolute inset-0 z-nav bg-gradient-card-glass backdrop-blur-[15px] flex flex-col items-center px-[13px] pt-[35px] pb-[23px]"
                  >
                    {/* 포지션 뱃지 */}
                    <div className="bg-badge-position-bg px-7 py-[13.5px] rounded-50 mb-8">
                      <span className="text-text-white text-xl font-semibold leading-[1.2]">
                        {pos.title}
                      </span>
                    </div>

                    {/* 상세 설명 리스트 */}
                    <div className="w-full px-[7px] space-y-2.5 mb-auto">
                      {JOB_DETAILS[pos.id].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-list-bg border border-banner-border rounded-xl px-[13px] py-[11.5px]"
                        >
                          <span className="text-text-white w-4 h-4">{item.icon}</span>
                          <p className="text-text-white text-sm font-medium leading-tight">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* 단계 선택 섹션 */}
                    <div className="w-full mt-[17px]">
                      <p className="text-text-white text-center font-medium mb-4 leading-[1.2]">
                        단계 선택
                      </p>
                      <div className="flex justify-between gap-1.5">
                        {['초급', '중급', '고급'].map((level) => {
                          const isFeIntermediate = pos.id === 'fe' && level === '중급';
                          return (
                            <button
                              key={level}
                              onClick={() =>
                                isFeIntermediate
                                  ? setSelectedCourse('fe-intermediate')
                                  : handleLockedItemClick()
                              }
                              className="flex-1 bg-btn-white-bg rounded-20 pt-[13px] pb-[25px] flex flex-col items-center gap-2 hover:bg-white transition-colors"
                            >
                              <span className="text-text-highlight text-sm font-medium leading-none">
                                {level}
                              </span>
                              {isFeIntermediate ? (
                                <LevelLockOpenIcon className="w-[23px] h-[29px] text-icon-blue-820" />
                              ) : (
                                <LevelLockIcon className="w-[23px] h-[29px] text-icon-blue-820" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 상세 정보 모달 */}
      <AnimatePresence>
        {selectedCourse === 'fe-intermediate' && (
          <>
            {/* 딤 배경 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-modal-backdrop bg-black/30"
              onClick={() => setSelectedCourse(null)}
            />

            {/* 모달 카드 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute left-[50.3%] top-[54%] -translate-x-1/2 -translate-y-1/2 z-modal w-[340px] bg-white rounded-20 flex flex-col text-left shadow-2 border border-card-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-3 border-b-[0.67px] border-divider p-[23px] pb-2">
                <div className="flex justify-between items-center">
                  <div className="text-4xl leading-[40px] -translate-y-[3px]">📗</div>
                  <span className="text-icon text-[0.625rem] font-medium leading-normal tracking-[0.5px] uppercase">
                    Intermediate
                  </span>
                </div>
                <h3 className="text-[1.75rem] font-bold leading-normal text-text-title -translate-y-[1px]">
                  {FRONT_INTERMEDIATE_DETAIL.title}
                </h3>
                <p className="text-text-base text-[0.813rem] leading-normal">
                  {FRONT_INTERMEDIATE_DETAIL.subtitle}
                </p>
              </div>

              <div className="p-6 pb-5 divide-y-[0.67px] divide-divider">
                <section className="pb-5">
                  <h4 className="text-[0.938rem] font-semibold text-text-title leading-[22.5px] -translate-y-[1px] mb-[12.5px]">
                    강의 특징
                  </h4>
                  <ul className="space-y-2">
                    {FRONT_INTERMEDIATE_DETAIL.features.map((f, i) => (
                      <li
                        key={i}
                        className="text-text-base text-[0.813rem] leading-[22.79px] flex gap-2"
                      >
                        <span className="text-primary-500">•</span> {f}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="pt-5">
                  <h4 className="text-[0.938rem] font-semibold text-text-title leading-[23px] -translate-y-[1px] mb-[12.5px]">
                    학습 내용
                  </h4>
                  <ul className="space-y-2">
                    {FRONT_INTERMEDIATE_DETAIL.contents.map((c, i) => (
                      <li
                        key={i}
                        className="text-text-base text-[0.813rem] leading-[23px] flex gap-2"
                      >
                        <span className="text-primary-500">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="p-[23px] pt-0">
                <Button
                  size="wfullh42"
                  rounded="default"
                  onClick={() =>
                    navigate(ROUTES.COURSES.LECTURE_MAIN('fe', 'intermediate', 'team-project'))
                  }
                >
                  선택하기
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LockModal
        isOpen={isLockModalOpen}
        onClose={closeLockModal}
        message="이 강의는 현재 준비 중입니다."
      />
    </div>
  );
};

export default CoursesPage;
