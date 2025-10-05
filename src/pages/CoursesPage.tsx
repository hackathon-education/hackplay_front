import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import InfoPanel from '@/components/InfoPanel';

import Backend from '../assets/backend.png';
import Designer from '../assets/designer.png';
import Frontend from '../assets/frontend.png';
import LockModal from '../components/LockModal';
import { JOB_TYPES } from '../constants/jobTypes';
import { useLockModal } from '../hooks/useLockModal';

const CoursesPage = () => {
  const [selectedTab, setSelectedTab] = useState<'fe' | 'be' | 'design' | null>(null);
  const [animatingTab, setAnimatingTab] = useState<'fe' | 'be' | 'design' | null>(null);
  const navigate = useNavigate();
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();

  const handleBackendClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (selectedTab === 'fe' || selectedTab === 'design') {
      setSelectedTab(null);
      setAnimatingTab(null);
    }

    handleLockedItemClick(e);
  };

  const handleDesignerClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (selectedTab === 'fe' || selectedTab === 'be') {
      setSelectedTab(null);
      setAnimatingTab(null);
    }

    handleLockedItemClick(e);
  };

  const handleTabClick = (tab: 'fe' | 'be' | 'design') => {
    if (selectedTab === tab) {
      setSelectedTab(null);
      setTimeout(() => setAnimatingTab(null), 300);
    } else {
      setSelectedTab(tab);
      setAnimatingTab(tab);
    }
  };

  // 외부 클릭 시 패널 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (selectedTab && !target.closest('.position-card') && !target.closest('.info-panel')) {
        setSelectedTab(null);
      }
    };

    if (selectedTab) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedTab]);

  return (
    <div className="max-w-[600px] mx-auto my-[50px] p-[30px] border-2 border-[#0059b3] rounded-[10px] text-center">
      <h2 className="text-[1.5rem] font-bold text-center mb-10">나의 포지션 선택</h2>

      <div className="flex justify-center gap-10 mb-10 flex-nowrap py-2.5">
        {/* 프론트엔드 */}
        <div
          className={`position-card relative bg-white border-2 ${
            selectedTab === 'fe' ? 'border-[#007bff]' : 'border-transparent'
          } ${
            selectedTab === 'fe' || animatingTab === 'fe' ? 'z-dropdown' : ''
          } rounded-2xl p-5 w-[200px] cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out text-center ${
            selectedTab !== 'fe'
              ? 'hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]'
              : ''
          }`}
          onClick={() => handleTabClick('fe')}
        >
          <img src={Frontend} alt="Front end" className="w-full rounded-xl mb-3" />
          <button
            className={`bg-none border border-[#007bff] rounded-full px-3 py-1.5 text-[0.9rem] cursor-pointer ${
              selectedTab === 'fe' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'
            }`}
          >
            {JOB_TYPES.FE}
          </button>

          <AnimatePresence>
            {selectedTab === 'fe' && <InfoPanel type="fe" onClose={() => setSelectedTab(null)} />}
          </AnimatePresence>
        </div>

        {/* 백엔드 */}
        <div
          className={`position-card relative bg-white border-2 ${
            selectedTab === 'be' ? 'border-[#007bff]' : 'border-transparent'
          } ${
            selectedTab === 'be' || animatingTab === 'be' ? 'z-dropdown' : ''
          } rounded-2xl p-5 w-[200px] cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out text-center ${
            selectedTab !== 'be'
              ? 'hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]'
              : ''
          }`}
          // onClick={() => handleTabClick('be')}
          onClick={handleBackendClick}
        >
          <img src={Backend} alt="Back end" className="w-full rounded-xl mb-3" />
          <button
            className={`bg-none border border-[#007bff] rounded-full px-3 py-1.5 text-[0.9rem] cursor-pointer ${
              selectedTab === 'be' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'
            }`}
          >
            {JOB_TYPES.BE}
          </button>

          <AnimatePresence>
            {selectedTab === 'be' && <InfoPanel type="be" onClose={() => setSelectedTab(null)} />}
          </AnimatePresence>
        </div>

        {/* 디자이너 */}
        <div
          className={`position-card relative bg-white border-2 ${
            selectedTab === 'design' ? 'border-[#007bff]' : 'border-transparent'
          } ${
            selectedTab === 'design' || animatingTab === 'design' ? 'z-dropdown' : ''
          } rounded-2xl p-5 w-[200px] cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out text-center ${
            selectedTab !== 'design'
              ? 'hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]'
              : ''
          }`}
          // onClick={() => handleTabClick('design')}
          onClick={handleDesignerClick}
        >
          <img src={Designer} alt="Designer" className="w-full rounded-xl mb-3" />
          <button
            className={`bg-none border border-[#007bff] rounded-full px-3 py-1.5 text-[0.9rem] cursor-pointer ${
              selectedTab === 'design' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'
            }`}
          >
            {JOB_TYPES.DESIGN}
          </button>

          <AnimatePresence>
            {selectedTab === 'design' && (
              <InfoPanel type="design" onClose={() => setSelectedTab(null)} />
            )}
          </AnimatePresence>
        </div>
      </div>

      <LockModal
        isOpen={isLockModalOpen}
        onClose={closeLockModal}
        message="이 강의는 현재 잠겨 있습니다."
      />
    </div>
  );
};

export default CoursesPage;
