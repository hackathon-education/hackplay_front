import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Backend from '../assets/backend.png';
import Designer from '../assets/designer.png';
import Frontend from '../assets/frontend.png';
import LockModal from '../components/LockModal';
import { useLockModal } from '../hooks/useLockModal';

function CoursesPage() {
  const [selectedTab, setSelectedTab] = useState('front');
  const navigate = useNavigate();
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();

  const handleBeginnerClick = () => {
    navigate('/front/beginner');
  };

  const handleBackendClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLockedItemClick(e);
  };

  const handleDesignerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLockedItemClick(e);
  };

  return (
    <div className="max-w-[600px] mx-auto my-[50px] p-[30px] border-2 border-[#0059b3] rounded-[10px] bg-[#f9f9f9] text-center">
      <h2 className="text-[1.5rem] font-bold text-center mb-10">나의 포지션 선택</h2>

      <div className="flex justify-center gap-10 mb-10 flex-nowrap overflow-x-auto py-2.5">
        <div
          className={`bg-white border-2 ${
            selectedTab === 'front' ? 'border-[#007bff]' : 'border-transparent'
          } rounded-2xl p-5 w-[200px] cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out text-center hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]`}
          onClick={() => setSelectedTab('front')}
        >
          <img src={Frontend} alt="Front end" className="w-full rounded-xl mb-3" />
          <button
            className={`bg-none border border-[#007bff] rounded-full px-3 py-1.5 text-[0.9rem] cursor-pointer ${
              selectedTab === 'front' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'
            }`}
          >
            Front end
          </button>
        </div>

        <div
          className={`bg-white border-2 ${
            selectedTab === 'back' ? 'border-[#007bff]' : 'border-transparent'
          } rounded-2xl p-5 w-[200px] cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out text-center hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]`}
          // onClick={() => setSelectedTab('back')}
          onClick={handleBackendClick}
        >
          <img src={Backend} alt="Back end" className="w-full rounded-xl mb-3" />
          <button
            className={`bg-none border border-[#007bff] rounded-full px-3 py-1.5 text-[0.9rem] cursor-pointer ${
              selectedTab === 'back' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'
            }`}
          >
            Back end
          </button>
        </div>

        <div
          className={`bg-white border-2 ${
            selectedTab === 'design' ? 'border-[#007bff]' : 'border-transparent'
          } rounded-2xl p-5 w-[200px] cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out text-center hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]`}
          // onClick={() => setSelectedTab('design')}
          onClick={handleDesignerClick}
        >
          <img src={Designer} alt="Designer" className="w-full rounded-xl mb-3" />
          <button
            className={`bg-none border border-[#007bff] rounded-full px-3 py-1.5 text-[0.9rem] cursor-pointer ${
              selectedTab === 'design' ? 'bg-[#007bff] text-white' : 'text-[#007bff]'
            }`}
          >
            Designer
          </button>
        </div>
      </div>

      <div className="tab-wrapper">
        {selectedTab === 'front' && (
          <div className="level-tab-wrapper">
            <div className="level-tab level-beginner" onClick={handleBeginnerClick}>
              초급
            </div>
            <div className="level-tab level-intermediate locked">중급 - 추후 개발 🔒</div>
            <div className="level-tab level-advanced locked">고급 - 추후 개발 🔒</div>
          </div>
        )}
        {selectedTab !== 'front' && (
          <div className="tab-content locked">
            <h3>{selectedTab === 'back' ? 'Back' : 'Design'} - 추후 개발</h3>
            <p>🔒 잠겨있는 항목입니다.</p>
          </div>
        )}
      </div>
      <LockModal isOpen={isLockModalOpen} onClose={closeLockModal} />
    </div>
  );
}

export default CoursesPage;
