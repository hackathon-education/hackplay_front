import { MdLockOpen, MdLockOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import DataIcon from '@/assets/info-panel/data.png';
import ELearningIcon from '@/assets/info-panel/e_learning.png';
import GuideIcon from '@/assets/info-panel/guide.png';
import LayoutIcon from '@/assets/info-panel/layout.png';
import PerformanceMacbookIcon from '@/assets/info-panel/performance_macbook.png';
import ProgrammingIcon from '@/assets/info-panel/programming.png';
import ResponsiveIcon from '@/assets/info-panel/responsive.png';
import SecurityIcon from '@/assets/info-panel/security.png';
import SettingsIcon from '@/assets/info-panel/settings.png';
import TypewriterWithScreenIcon from '@/assets/info-panel/typewriter_with_screen.png';
import WebIcon from '@/assets/info-panel/web.png';
import WorkstationIcon from '@/assets/info-panel/workstation.png';
import { ROUTES } from '@/constants/routes';
import { useLockModal } from '@/hooks/useLockModal';

import LockModal from './LockModal';

interface InfoPanelProps {
  type: 'fe' | 'be' | 'design';
  onClose: () => void;
}

interface DescItem {
  icon: string;
  text: string;
  sizeClass?: string;
}

interface LevelItem {
  id: string;
  label: string;
  locked?: boolean;
}

const panelContent: Record<InfoPanelProps['type'], { title: string; desc: DescItem[] }> = {
  fe: {
    title: 'Frontend란?',
    desc: [
      {
        icon: WorkstationIcon,
        text: '웹/앱 화면을 구현, 사용자와 상호작용 파트 개발',
        sizeClass: 'w-[2.464rem]',
      },
      {
        icon: TypewriterWithScreenIcon,
        text: `디자인 시안을 바탕으로 HTML, CSS,\nJavaScript(React 등)로 UI 제작`,
        sizeClass: 'w-[2.693rem]',
      },
      {
        icon: ProgrammingIcon,
        text: 'API를 호출하여 백엔드 데이터를 화면에 표시',
        sizeClass: 'w-[2.292rem]',
      },
      {
        icon: ResponsiveIcon,
        text: '반응형·접근성 고려 및 브라우저 호환성 확보',
        sizeClass: 'w-[2.292rem]',
      },
    ],
  },
  be: {
    title: 'Backend란?',
    desc: [
      {
        icon: SettingsIcon,
        text: '서버, 데이터베이스, API 설계 및 개발',
        sizeClass: 'w-[2.865rem]',
      },
      {
        icon: DataIcon,
        text: '비즈니스 로직 구현 및 데이터 처리',
        sizeClass: 'w-[2.177rem]',
      },
      {
        icon: SecurityIcon,
        text: '보안, 인증, 권한 관리 기능 개발',
        sizeClass: 'w-8 aspect-[9/11]!',
      },
      {
        icon: PerformanceMacbookIcon,
        text: '서버 성능 최적화 및 에러 로그 관리',
        sizeClass: 'w-[45.83335rem]',
      },
    ],
  },
  design: {
    title: 'Designer란?',
    desc: [
      {
        icon: WebIcon,
        text: '서비스의 UI/UX 설계 및 디자인 시안 제작',
      },
      {
        icon: LayoutIcon,
        text: '사용자 경험(UX) 흐름 기획 및 화면 구성 정의',
        sizeClass: 'w-[2.625rem]',
      },
      {
        icon: GuideIcon,
        text: '색상, 컴포넌트 스타일 등 디자인 가이드 제공',
        sizeClass: 'w-[2.256rem]',
      },
      {
        icon: ELearningIcon,
        text: '디자인이 실제 화면에 구현되도록 지원',
        sizeClass: 'w-[2.718rem]',
      },
    ],
  },
};

const levels: LevelItem[] = [
  { id: 'beginner', label: '초급', locked: true },
  { id: 'intermediate', label: '중급' },
  { id: 'advanced', label: '고급', locked: true },
];

const InfoPanel = ({ type, onClose }: InfoPanelProps) => {
  const navigate = useNavigate();
  const isLeft = type === 'design';
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();

  const handleLevelClick = (type: InfoPanelProps['type'], level: string) => {
    navigate(ROUTES.COURSES.LECTURE_LIST(type, level));
  };

  return (
    <motion.div
      initial={{ x: isLeft ? '-20%' : '20%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: isLeft ? '-20%' : '20%', opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`info-panel absolute top-0 ${isLeft ? 'right-full mr-11' : 'left-full ml-11'} 
                  w-[38.816rem] h-[43.563rem] bg-blue-300 shadow-6 pt-[2.625rem] px-[3.563rem] pb-[2.938rem] rounded-2xl z-dropdown cursor-default`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 꼬리 */}
      <div
        className={`absolute w-0 h-0 top-10 ${
          isLeft
            ? '-right-6 border-l-blue-300 border-l-[2.385rem] border-y-transparent border-y-[1.039rem]'
            : '-left-6 border-r-blue-300 border-r-[2.385rem] border-y-transparent border-y-[1.039rem]'
        }`}
      ></div>

      <div className="flex flex-col w-full h-full items-start text-white">
        {/* 헤더 */}
        <>
          <p className="font-[410] text-xl leading-[1.15] mb-[0.063rem]">들어가기 전에</p>

          <h2 className="text-[2.396rem] leading-[1.17] font-[590] mb-[1.438rem]">
            {panelContent[type].title}
          </h2>
        </>

        {/* 설명 */}
        <ul className="w-full max-w-[31.563rem] h-full max-h-72 self-center flex flex-col gap-2 mb-8">
          {panelContent[type].desc.map((item, index) => (
            <li
              key={index}
              className="flex items-center bg-white/30 w-full flex-1 rounded-2xl pl-[2.266rem] gap-[1.763rem]"
            >
              <div className="flex justify-center w-11">
                <img
                  src={item.icon}
                  alt=""
                  className={`aspect-square ${item.sizeClass ?? 'w-full'}`}
                />
              </div>
              <span className="text-[1.29rem] font-[410] leading-none  whitespace-pre-line">
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        {/* 단계 */}
        <>
          <p className="ml-[0.063rem] text-xl leading-[1.15]">단계 선택</p>
          <ol className="mt-2 flex w-full h-full max-h-[10.188rem] gap-[0.563rem]">
            {levels.map((level) => (
              <li key={level.id} className="flex-1">
                <button
                  type="button"
                  className="w-full h-full bg-white/75 rounded-2xl pt-6 pb-10 flex flex-col justify-between items-center"
                  onClick={
                    level.locked ? handleLockedItemClick : () => handleLevelClick(type, level.id)
                  }
                >
                  <span className="text-xl leading-[1.15] text-blue-500">{level.label}</span>
                  {level.locked ? (
                    <MdLockOutline className="w-15 h-15 text-blue-450" />
                  ) : (
                    <MdLockOpen className="w-15 h-15 text-blue-450" />
                  )}
                </button>
              </li>
            ))}
          </ol>
        </>
      </div>

      <LockModal
        isOpen={isLockModalOpen}
        onClose={closeLockModal}
        message="이 강의는 현재 잠겨 있습니다."
      />
    </motion.div>
  );
};

export default InfoPanel;
