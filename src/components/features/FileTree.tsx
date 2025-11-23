import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6';
import { MdFolder } from 'react-icons/md';
import { MdInsertDriveFile } from 'react-icons/md';
import { TbDownload } from 'react-icons/tb';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
}

interface FileTreeProps {
  files: FileNode[];
  selectedPath?: string;
  onFileSelect: (path: string) => void;
}

const FileTree = ({ files, selectedPath, onFileSelect }: FileTreeProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedPath === node.path;
    const isFolder = node.type === 'folder';

    return (
      <div key={node.path}>
        <div
          className={`flex items-center cursor-pointer ${
            isSelected
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-260 hover:bg-gray-120 hover:text-gray-620'
          } ${isFolder ? 'py-2' : 'py-1'}`}
          style={{ paddingLeft: `${level * 1 + 0.813}rem` }}
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.path);
            } else {
              onFileSelect(node.path);
            }
          }}
        >
          {isFolder ? (
            <>
              {isExpanded ? (
                <FaChevronDown className="w-3.5 h-3.5 text-gray-620 mr-2.5" />
              ) : (
                <FaChevronRight className="w-3.5 h-3.5 text-gray-260 mr-2.5" />
              )}
              {isExpanded ? (
                <MdFolder className="w-5 h-5 text-gray-620" />
              ) : (
                <MdFolder className="w-5 h-5 text-gray-260" />
              )}
            </>
          ) : (
            <>
              <div className="w-7.5" /> {/* spacing */}
              <MdInsertDriveFile className="w-5 h-5" />
            </>
          )}
          <span
            className={`ml-[0.281rem] text-gray-260 self-end ${isFolder ? 'text-[1.005rem] leading-[1.18]' : 'text-[0.939rem] leading-[1.2] font-[410]'} ${isFolder && isExpanded ? 'text-gray-620' : 'text-inherit'}`}
          >
            {node.name}
          </span>
        </div>
        {isFolder && isExpanded && node.children && (
          <div>{node.children.map((child) => renderNode(child, level + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between pt-2.5 pb-2 pl-[1.188rem] border-b-[0.5px] border-gray-200 bg-gray-150">
        <button
          onClick={() => {
            // 다운로드 기능
          }}
          title="다운로드"
        >
          <TbDownload className="w-5 h-5 text-gray-620" />
        </button>
      </div>

      {/* 파일 트리 */}
      <div className="flex-1 overflow-y-auto bg-white">{files.map((file) => renderNode(file))}</div>
    </div>
  );
};

export default FileTree;
