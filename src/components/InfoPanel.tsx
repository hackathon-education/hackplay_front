import { motion } from 'framer-motion';

interface InfoPanelProps {
  type: 'front' | 'back' | 'design';
  onClose: () => void;
}

const panelContent = {
  front: {
    title: 'Frontend란?',
    desc: [
      '웹/앱 화면을 구현, 사용자와 상호작용 파트 개발',
      '디자인 시안을 바탕으로 HTML, CSS, JavaScript(React 등)로 UI 제작',
      'API를 호출하여 백엔드 데이터를 화면에 표시',
      '반응형·접근성 고려 및 브라우저 호환성 확보',
    ],
  },
  back: {
    title: 'Backend란?',
    desc: [
      '서버, 데이터베이스, API 설계 및 개발',
      '비즈니스 로직 구현 및 데이터 처리',
      '보안, 인증, 권한 관리 기능 개발',
      '서버 성능 최적화 및 에러 로그 관리',
    ],
  },
  design: {
    title: 'Designer란?',
    desc: [
      '서비스의 UI/UX 설계 및 디자인 시안 제작',
      '사용자 경험(UX) 흐름 기획 및 화면 구성 정의',
      '색상, 컴포넌트 스타일 등 디자인 가이드 제공',
      '디자인이 실제 화면에 구현되도록 지원',
    ],
  },
};

const InfoPanel = ({ type, onClose }: InfoPanelProps) => {
  const isLeft = type === 'design';

  return (
    <motion.div
      initial={{ x: isLeft ? '-20%' : '20%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: isLeft ? '-20%' : '20%', opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`info-panel absolute top-0 ${isLeft ? 'right-full mr-4' : 'left-full ml-4'} 
                  w-[250px] bg-white shadow-lg p-4 rounded-xl z-dropdown`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="mb-2 text-sm text-gray-500"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        닫기
      </button>
      <h2 className="text-lg font-bold mb-2">{panelContent[type].title}</h2>
      <ul className="space-y-1 text-sm text-gray-700">
        {panelContent[type].desc.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default InfoPanel;
