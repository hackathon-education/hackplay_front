import { MdFolder } from 'react-icons/md';
import { TfiClose } from 'react-icons/tfi';

interface Tab {
  id: string;
  path: string;
  name: string;
  isModified: boolean;
  isSaved: boolean;
}

interface EditorTabsProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const EditorTabs = ({ tabs, activeTabId, onTabClick, onTabClose }: EditorTabsProps) => {
  const handleClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabClose(tabId);
  };

  return (
    <div className="flex items-center overflow-x-auto h-[2.375rem] max-h-[2.375rem]">
      <div
        className={
          'flex items-center max-w-[4.563rem] bg-gray-150 px-6 pt-[0.563rem] pb-1 rounded-t-2xl h-full'
        }
      >
        <MdFolder className="text-gray-620 w-[1.3rem] h-[1.3rem]" />
      </div>
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return (
          <div
            key={tab.id}
            className={`flex h-full items-center pt-[0.682rem] pb-[0.491rem] pl-[1.553rem] pr-2 gap-6 cursor-pointer rounded-t-2xl ${
              isActive ? 'bg-white' : 'bg-gray-150'
            }`}
            onClick={() => onTabClick(tab.id)}
          >
            <span className="text-sm/[1] truncate flex-1 tracking-[0.01em] text-gray-630">
              {tab.name}
            </span>
            {/* {tab.isModified && !tab.isSaved && (
              <span className="w-2 h-2 rounded-full bg-orange-500" title="변경됨" />
            )}
            {tab.isSaved && !tab.isModified && (
              <span className="text-xs text-gray-400" title="저장됨">
                ✓
              </span>
            )} */}
            <button
              className="hover:bg-gray-90 rounded p-1"
              onClick={(e) => handleClose(e, tab.id)}
              title="닫기"
            >
              <TfiClose className="text-gray-620 w-2.5 h-2.5 stroke-1" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EditorTabs;
