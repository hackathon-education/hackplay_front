import { MouseEvent, useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6';
import { LuFiles } from 'react-icons/lu';
import { MdFolder } from 'react-icons/md';
import { MdInsertDriveFile } from 'react-icons/md';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
}

interface FileTreeProps {
  files: FileNode[];
  /** 우측 상단 제목 (예: My First Project (19)) */
  projectTitle?: string;
  selectedPath?: string;
  onFileSelect: (path: string) => void;
  onDelete: (path: string) => void; // 삭제 핸들러
  onCreate?: (parentPath: string, type: 'file' | 'folder', name: string, content?: string) => void;
  onRename?: (currentPath: string, newName: string) => void; // 이름 변경 핸들러
  onMove?: (currentPath: string, newParentDir: string) => void; // 파일 이동 핸들러
}

const FileTree = ({
  files,
  projectTitle,
  selectedPath,
  onFileSelect,
  onDelete,
  onCreate,
  onRename,
  onMove,
}: FileTreeProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [contextMenu, setContextMenu] = useState<null | {
    x: number;
    y: number;
    filePath: string;
    isFolder: boolean;
  }>(null);
  const [creatingInFolder, setCreatingInFolder] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [renamingPath, setRenamingPath] = useState<string | null>(null);
  const [renameNewName, setRenameNewName] = useState('');
  const [draggedPath, setDraggedPath] = useState<string | null>(null);
  const [dropTargetPath, setDropTargetPath] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };

    if (contextMenu) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu]);

  // 입력 필드 자동 포커스
  useEffect(() => {
    if (creatingInFolder && inputRef.current) {
      inputRef.current.focus();
    }
  }, [creatingInFolder]);

  // 이름 변경 입력 필드 자동 포커스
  useEffect(() => {
    if (renamingPath && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renamingPath]);

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
    const isRenaming = renamingPath === node.path;
    const isDragged = draggedPath === node.path;
    const isDropTarget = dropTargetPath === node.path && isFolder;

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault(); // 기본 우클릭 메뉴를 막음
      setContextMenu({ x: e.clientX, y: e.clientY, filePath: node.path, isFolder });
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
      setDraggedPath(node.path);
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      if (!isFolder || isDragged) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDropTargetPath(node.path);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      if (e.currentTarget === (e.target as HTMLElement)) {
        setDropTargetPath(null);
      }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!draggedPath || !isFolder || draggedPath === node.path) {
        setDropTargetPath(null);
        return;
      }

      if (onMove) {
        onMove(draggedPath, node.path);
      }

      setDraggedPath(null);
      setDropTargetPath(null);
      // 드롭한 폴더 자동 확장
      if (!isExpanded) {
        toggleFolder(node.path);
      }
    };

    return (
      <div key={node.path}>
        <div
          className={`flex items-center cursor-pointer transition-colors ${
            isSelected
              ? 'bg-blue-50 text-blue-600'
              : isDropTarget
                ? 'bg-blue-100 text-blue-600'
                : isDragged
                  ? 'opacity-50 bg-gray-100'
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
          onContextMenu={handleRightClick}
          draggable={!isRenaming}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isFolder ? (
            <>
              {isExpanded ? (
                <FaChevronDown className="w-3.5 h-3.5 text-gray-620 mr-2.5" />
              ) : (
                <FaChevronRight className="w-3.5 h-3.5 mr-2.5" />
              )}
              {isExpanded ? (
                <MdFolder className="w-5 h-5 text-gray-620" />
              ) : (
                <MdFolder className="w-5 h-5" />
              )}
            </>
          ) : (
            <>
              <div className="w-3.5 mr-2.5" /> {/* spacing */}
              <MdInsertDriveFile className="w-5 h-5 shrink-0" />
            </>
          )}

          {/* 이름 변경 중이면 입력 필드, 아니면 파일명 표시 */}
          {isRenaming ? (
              <input
                ref={renameInputRef}
                type="text"
                value={renameNewName}
                onChange={(e) => setRenameNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameFile(node.path);
                  } else if (e.key === 'Escape') {
                    setRenamingPath(null);
                    setRenameNewName('');
                  }
                }}
                onBlur={() => {
                  setRenamingPath(null);
                  setRenameNewName('');
                }}
                className="ml-[0.281rem] flex-1 min-w-0 px-1 border border-blue-400 rounded text-[0.939rem]/[1.2] font-[410]"
                onClick={(e) => e.stopPropagation()}
              />
          ) : (
            <span
              className={`ml-[0.281rem] text-gray-260 self-end ${isFolder ? 'text-[1.005rem] leading-[1.18]' : 'text-[0.939rem] leading-[1.2] font-[410]'} ${isFolder && isExpanded ? 'text-gray-620' : 'text-inherit'}`}
            >
              {node.name}
            </span>
          )}
        </div>

        {/* 인라인 파일명 입력 */}
        {isFolder && isExpanded && creatingInFolder === node.path && (
          <div
            className="flex items-center"
            style={{ paddingLeft: `${(level + 1) * 1 + 0.813}rem` }}
          >
            <div className="w-3.5 mr-2.5 shrink-0"></div>
            <MdInsertDriveFile className="w-5 h-5 shrink-0 text-gray-260" />
            <input
              ref={inputRef}
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateFileInline(node.path);
                } else if (e.key === 'Escape') {
                  setCreatingInFolder(null);
                  setNewFileName('');
                }
              }}
              onBlur={() => {
                setCreatingInFolder(null);
                setNewFileName('');
              }}
              className="w-full h-full ml-[0.281rem] border border-blue-400 rounded text-[0.939rem]/[1.2] font-[410]"
            />
          </div>
        )}

        {isFolder && isExpanded && node.children && (
          <div>
            {node.children
              .sort((a, b) => {
                // 폴더 우선 정렬
                if (a.type === 'folder' && b.type === 'file') return -1;
                if (a.type === 'file' && b.type === 'folder') return 1;
                // 같은 타입일 때는 이름 순서대로
                return a.name.localeCompare(b.name);
              })
              .map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const handleDelete = () => {
    if (contextMenu) {
      onDelete(contextMenu.filePath);
      setContextMenu(null); // 메뉴 닫기
    }
  };

  const handleCreateFileInline = (parentPath: string) => {
    // 검증
    if (!newFileName.trim()) {
      alert('파일 이름을 입력해주세요.');
      return;
    }
    if (newFileName.length > 255) {
      alert('파일 이름은 최대 255자입니다.');
      return;
    }
    const validName = /^[A-Za-z0-9._-]+$/.test(newFileName);
    if (!validName) {
      alert("파일명은 영문, 숫자, '.', '_', '-'만 허용됩니다.");
      return;
    }

    if (onCreate) {
      onCreate(parentPath, 'file', newFileName, '');
    }

    setCreatingInFolder(null);
    setNewFileName('');
  };

  const handleRenameFile = (currentPath: string) => {
    // 검증
    if (!renameNewName.trim()) {
      alert('파일 이름을 입력해주세요.');
      return;
    }
    if (renameNewName.length > 255) {
      alert('파일 이름은 최대 255자입니다.');
      return;
    }
    const validName = /^[A-Za-z0-9._-]+$/.test(renameNewName);
    if (!validName) {
      alert("파일명은 영문, 숫자, '.', '_', '-'만 허용됩니다.");
      return;
    }

    if (onRename) {
      onRename(currentPath, renameNewName);
    }

    setRenamingPath(null);
    setRenameNewName('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between gap-2 border-b-[0.5px] border-gray-200 bg-gray-150 px-3 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <LuFiles className="h-5 w-5 shrink-0 text-gray-620 stroke-[2.2]" />
          {projectTitle ? (
            <span className="truncate text-sm font-semibold tracking-tight text-gray-630">
              {projectTitle}
            </span>
          ) : null}
        </div>
      </div>

      {/* 파일 트리 */}
      <div className="flex-1 overflow-y-auto bg-white">
        {files
          .sort((a, b) => {
            if (a.type === 'folder' && b.type === 'file') return -1;
            if (a.type === 'file' && b.type === 'folder') return 1;
            return a.name.localeCompare(b.name);
          })
          .map((file) => renderNode(file))}
      </div>
      {/* 우클릭 메뉴 */}
      {contextMenu && (
        <div
          ref={menuRef}
          className="absolute bg-gray-80 border border-gray-50 shadow-lg rounded-md z-dropdown overflow-hidden"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul>
            {contextMenu.isFolder && (
              <li>
                <button
                  className="w-full !justify-start text-base px-3.5 py-1.5 hover:bg-blue-50"
                  onClick={() => {
                    setCreatingInFolder(contextMenu.filePath);
                    setContextMenu(null);
                  }}
                >
                  새 파일...
                </button>
              </li>
            )}
            {!contextMenu.isFolder && (
              <li>
                <button
                  className="w-full !justify-start text-base px-3.5 py-1.5 hover:bg-blue-50"
                  onClick={() => {
                    const fileName = contextMenu.filePath.split('/').pop() || '';
                    setRenamingPath(contextMenu.filePath);
                    setRenameNewName(fileName);
                    setContextMenu(null);
                  }}
                >
                  이름 바꾸기...
                </button>
              </li>
            )}
            <li>
              <button
                className="w-full !justify-start text-base px-3.5 py-1.5 hover:bg-blue-50"
                onClick={handleDelete}
              >
                삭제
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileTree;
