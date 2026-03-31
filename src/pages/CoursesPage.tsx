import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import BeChar from '@/assets/step/be-character.webp';
import DeChar from '@/assets/step/de-character.webp';
import FeChar from '@/assets/step/fe-character.webp';
import StepBg from '@/assets/step/step-bg.webp';
import InfoPanel from '@/components/InfoPanel';

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedTab]);

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
          {/* 프론트엔드 */}
          <motion.div className="position-card group relative rounded-30 w-80 h-120 shadow-1 transition-all duration-300 self-end">
            <div className="overflow-hidden rounded-30">
              <img
                src={FeChar}
                alt=""
                className="w-full h-full object-cover grayscale brightness-[1.02] transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* 백엔드 */}
          <motion.div className="position-card group relative rounded-30 w-80 h-120 shadow-5 transition-all duration-300 border border-card-border-lavender-200">
            <div className="overflow-hidden rounded-30">
              <img
                src={BeChar}
                alt=""
                className="w-full h-full object-cover grayscale brightness-[1.02] transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* 디자이너 */}
          <motion.div className="position-card group relative rounded-30 w-80 h-120 shadow-1 transition-all duration-300 self-end">
            <div className="overflow-hidden rounded-30">
              <img
                src={DeChar}
                alt=""
                className="w-full h-full object-cover grayscale brightness-[1.02] transition-all duration-300"
              />
            </div>
          </motion.div>
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
