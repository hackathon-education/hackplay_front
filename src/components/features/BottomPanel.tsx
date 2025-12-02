import { useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { TfiControlPlay, TfiControlStop, TfiSave } from 'react-icons/tfi';

interface BottomPanelProps {
  onOpenWebPage?: () => void;
  onAIScoring?: () => void;
  terminalOutput?: string;
}

const BottomPanel = ({ onOpenWebPage, terminalOutput = '' }: BottomPanelProps) => {
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(true);

  return (
    <div className="flex flex-col bg-white">
      {/* 툴바 */}
      <div className="flex items-center justify-between px-[1.438rem] py-[1.094rem] border-x-[0.5px] border-gray-200">
        <div className="flex items-center gap-[1.188rem]">
          <button onClick={onOpenWebPage}>
            <TfiControlPlay className="w-4.5 h-4.5 text-gray-620 stroke-[0.5]" />
          </button>
          <button
          // onClick={onAIScoring}
          >
            <TfiControlStop className="w-4.5 h-4.5 text-gray-620 stroke-[0.5]" />
          </button>
        </div>
        <div className="flex items-center gap-[1.188rem]">
          {/* <button
            className="p-2 hover:bg-gray-100 rounded"
            onClick={() => {
              // 업로드 기능
            }}
            title="업로드"
          >
            <HiUpload className="w-4 h-4 text-gray-600" />
          </button> */}
          <button>
            <TfiSave className="w-4.5 h-4.5 text-gray-620 stroke-[0.5]" />
          </button>
          <button>
            <FaHistory className="w-4.5 h-4.5 text-gray-620" />
          </button>
        </div>
      </div>

      {/* 터미널 영역 */}
      <div className="flex h-[10.625rem] border-t-[0.5px] border-x-[0.5px] border-gray-200 pt-[0.563rem] px-[0.813rem]">
        {/* <button
          onClick={() => setIsTerminalExpanded(!isTerminalExpanded)}
          className="flex items-center justify-between px-4 py-2 bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
        >
          <span className="text-xs text-gray-500">{isTerminalExpanded ? '' : ''}</span>
        </button> */}
        {isTerminalExpanded && (
          <div className="bg-white text-gray-630 text-[0.813rem]/[1.54] overflow-y-auto">
            {terminalOutput || <div>&lt;/&gt; 실행 결과</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomPanel;
