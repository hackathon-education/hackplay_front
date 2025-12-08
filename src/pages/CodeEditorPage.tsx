import { useEffect, useRef, useState } from 'react';
import { AiFillFileText } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { BsPencilFill } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

import { toast } from 'sonner';

import BEDeveloperImg from '@/assets/backend.png';
import DesignerImg from '@/assets/designer.png';
import FEDeveloperImg from '@/assets/frontend.png';
import PlannerImg from '@/assets/planner.png';
import LockModal from '@/components/LockModal';
import BottomPanel from '@/components/features/BottomPanel';
import CodeEditor from '@/components/features/CodeEditor';
import EditorTabs from '@/components/features/EditorTabs';
import FileTree from '@/components/features/FileTree';
import { JOB_TYPES } from '@/constants/jobTypes';
import { useLockModal } from '@/hooks/useLockModal';

// 좌측 패널 - 탭 아이템 인터페이스
interface tabItem {
  key: 'overview' | 'request' | 'answer';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  sizeClass?: string;
}

// 좌측 패널 - 실습 개요(첫 번째 탭) 아이템 인터페이스
interface overviewItem {
  title: string;
  content: string;
}

// 좌측 패널 - 직무별 요청사항(두 번째 탭) 인터페이스
interface Request {
  role: string;
  image: string;
  content: string;
}

// 요청사항 및 작업 절차 박스 인터페이스
interface RequestBoxProps {
  title: string;
  content: string;
}

// 파일 트리 노드 인터페이스
interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
}

// 탭 인터페이스
interface Tab {
  id: string;
  path: string;
  name: string;
  isModified: boolean;
  isSaved: boolean;
}

// 요청사항 및 작업 절차 박스 컴포넌트
const RequestBox = ({ title, content }: RequestBoxProps) => (
  <div
    className={`flex flex-1 w-full ${title === '요청사항' ? 'h-[25.813rem] px-[2.719rem]' : ''}`}
  >
    <div className="flex-1 max-w-full bg-gray-90 rounded-lg px-[1.813rem] py-[1.125rem] flex flex-col gap-[0.438rem]">
      <h4 className="font-[590] text-2xl/[1.17] tracking-[0.03em]">{title}</h4>
      <p className="font-[410] text-[0.938rem]/[1.33] whitespace-pre-wrap">{content}</p>
      <Link
        to="https://www.notion.so/VSCode-259a586dfb0d80acb42ed1b52dac5a95?source=copy_link"
        target="_blank"
      >
        노션
      </Link>
    </div>
  </div>
);

const CodeEditorPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const { isLockModalOpen, closeLockModal, handleLockedItemClick } = useLockModal();

  const userRole = JOB_TYPES.FE; // 사용자 직무
  const [activeTab, setActiveTab] = useState<'overview' | 'request' | 'answer'>('overview');
  const [currentRequestIndex, setCurrentRequestIndex] = useState<number>(0); // 직무별 요청사항 현재 인덱스
  const noRequest = path === '/workspaces/team-project-1'; // 1주차는 요청사항 없음

  // 코드 에디터 관련 상태
  const [files, setFiles] = useState<FileNode[]>([
    {
      name: '텍스트를 입력하세요',
      type: 'folder',
      path: '/src',
      children: [
        { name: 'index.html', type: 'file', path: '/src/index.html' },
        { name: '텍스트를 입력하세요', type: 'file', path: '/src/텍스트를 입력하세요' },
        { name: '텍스트를 입력하세요 1', type: 'file', path: '/src/텍스트를 입력하세요 1' },
        { name: '텍스트를 입력하세요 2', type: 'file', path: '/src/텍스트를 입력하세요 2' },
        { name: '텍스트를 입력하세요 3', type: 'file', path: '/src/텍스트를 입력하세요 3' },
        { name: '텍스트를 입력하세요 4', type: 'file', path: '/src/텍스트를 입력하세요 4' },
        { name: '텍스트를 입력하세요 5', type: 'file', path: '/src/텍스트를 입력하세요 5' },
        { name: '텍스트를 입력하세요 6', type: 'file', path: '/src/텍스트를 입력하세요 6' },
        { name: '텍스트를 입력하세요 7', type: 'file', path: '/src/텍스트를 입력하세요 7' },
        { name: '텍스트를 입력하세요 8', type: 'file', path: '/src/텍스트를 입력하세요 8' },
        { name: '텍스트를 입력하세요 9', type: 'file', path: '/src/텍스트를 입력하세요 9' },
      ],
    },
  ]);
  const [editorTabs, setEditorTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | undefined>();
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string>('');

  // 자동 저장 토글
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(() => {
    // 초기값을 localStorage에서 읽어오기
    const stored = localStorage.getItem('isAutoSaveEnabled');
    return stored !== null ? JSON.parse(stored) : true;
  });
  useEffect(() => {
    localStorage.setItem('isAutoSaveEnabled', JSON.stringify(isAutoSaveEnabled));
  }, [isAutoSaveEnabled]);

  // 좌측 패널 상단 탭 데이터
  const leftPanelTabs: tabItem[] = [
    { key: 'overview', icon: AiFillFileText, sizeClass: 'w-6 h-6' },
    { key: 'request', icon: BiSolidUser, sizeClass: 'w-7 h-7 translate-y-1/3' },
    { key: 'answer', icon: BsPencilFill },
  ];

  // 좌측 패널 실습 개요 데이터
  const overviewItems: overviewItem[] = [
    { title: '회사 소개', content: '회사(Instagram)에 대한 간단 설명' },
    {
      title: '실습 설명',
      content: `- 깃 연결 → main 브랜치를 기준으로 작업 브랜치 checkout (예: feat/saved-posts-api)\n- 페이지 구성 (라우팅 구현)\n- 홈(피드): 게시물 카드 우하단에 저장(북마크) 아이콘 배치 → 클릭 시 저장/해제 API 호출\n- 프로필(/:username)에 Saved(저장됨) 탭/섹션 추가 → 진입 시 저장 목록 조회 API 호출해 렌더링\n- API 연동\n- POST /api/v1/saved: { postId } 저장\n- DELETE /api/v1/saved/{postId}: 저장 해제\n- GET /api/v1/saved: 내가 저장한 게시물 목록 조회\n- 모든 요청에 Authorization: Bearer <JWT> 헤더 포함(2~3주차 로그인에서 저장한 토큰 사용)\n- UI/동작 세부\n- 저장/해제 시 아이콘 상태 즉시 토글 → 실패 시 롤백 & 에러 안내\n- 프로필 Saved 섹션: 그리드 카드로 표시(모바일 1열, 데스크톱 2열 이상)\n- 비로그인 상태에서 저장 시도 → 안내 alert 후 /login으로 리다이렉션\n- 오류/로딩 처리\n- 버튼/아이콘에 로딩 상태 반영(중복 클릭 방지)\n- 백엔드 오류코드별 메시지 노출(아래 문서 섹션 참고)\n- 기능 동작 확인 후 작업 브랜치 push\n- 작업 브랜치 → main으로 Pull Request 생성\n⇒ 위 동작들은 Hackplay에 삽입된 Code Editor 내에서 수행 가능해야 함`,
    },
    { title: '실습 결과', content: '텍스트를 입력하세요 (실습 결과)' },
  ];

  // 좌측 패널 - 직무별 요청사항(두 번째 탭) 데이터
  const requests: Request[] = [
    {
      role: JOB_TYPES.PLAN,
      image: PlannerImg,
      content:
        '회원가입은 이름/이메일/비밀번호/비밀번호 확인 4개 입력이에요. 전부 입력되기 전까지 가입 버튼 비활성화 해주세요. 성공하면 /login으로 이동하고, 실패 시 현재 페이지에서 에러만 보여주세요. 비밀번호는 최소 8자 권장 문구 넣어주세요. 로딩 중엔 버튼 라벨을 **‘가입 중…’**으로 바꿔주세요.',
      // '회원가입은 이름/이메일/비밀번호/비밀번호 확인 4개 입력이에요. 전부 입력되기 전까지 가입 버튼 비활성화 해주세요. 성공하면 /login으로 이동하고, 실패 시 현재 페이지에서 에러만 보여주세요. 비밀번호는 최소 8자 권장 문구 넣어주세요. 로딩 중엔 버튼 라벨을 **‘가입 중…’**으로 바꿔주세요. 회원가입은 이름/이메일/비밀번호/비밀번호 확인 4개 입력이에요. 전부 입력되기 전까지 가입 버튼 비활성화 해주세요. 성공하면 /login으로 이동하고, 실패 시 현재 페이지에서 에러만 보여주세요. 비밀번호는 최소 8자 권장 문구 넣어주세요. 로딩 중엔 버튼 라벨을 **‘가입 중…’**으로 바꿔주세요. 회원가입은 이름/이메일/비밀번호/비밀번호 확인 4개 입력이에요. 전부 입력되기 전까지 가입 버튼 비활성화 해주세요. 성공하면 /login으로 이동하고, 실패 시 현재 페이지에서 에러만 보여주세요. 비밀번호는 최소 8자 권장 문구 넣어주세요. 로딩 중엔 버튼 라벨을 **‘가입 중…’**으로 바꿔주세요. 회원가입은 이름/이메일/비밀번호/비밀번호 확인 4개 입력이에요. 전부 입력되기 전까지 가입 버튼 비활성화 해주세요. 성공하면 /login으로 이동하고, 실패 시 현재 페이지에서 에러만 보여주세요. 비밀번호는 최소 8자 권장 문구 넣어주세요. 로딩 중엔 버튼 라벨을 **‘가입 중…’**으로 바꿔주세요. 회원가입은 이름/이메일/비밀번호/비밀번호 확인 4개 입력이에요. 전부 입력되기 전까지 가입 버튼 비활성화 해주세요. 성공하면 /login으로 이동하고, 실패 시 현재 페이지에서 에러만 보여주세요. 비밀번호는 최소 8자 권장 문구 넣어주세요. 로딩 중엔 버튼 라벨을 **‘가입 중…’**으로 바꿔주세요. 회원가입은 이름/이메일/비밀번호/비밀번호 확인 4개 입력이에요. 전부 입력되기 전까지 가입 버튼 비활성화 해주세요. 성공하면 /login으로 이동하고, 실패 시 현재 페이지에서 에러만 보여주세요. 비밀번호는 최소 8자 권장 문구 넣어주세요. 로딩 중엔 버튼 라벨을 **‘가입 중…’**으로 바꿔주세요. 회원가입은 이름/이메일/비밀번호/비밀번호 확인 4개 입력이에요. 전부 입력되기 전까지 가입 버튼 비활성화 해주세요. 성공하면 /login으로 이동하고, 실패 시 현재 페이지에서 에러만 보여주세요. 비밀번호는 최소 8자 권장 문구 넣어주세요. 로딩 중엔 버튼 라벨을 **‘가입 중…’**으로 바꿔주세요.',
    },
    {
      role: JOB_TYPES.DESIGN,
      image: DesignerImg,
      content:
        '회원가입 시안은 피그마에 있어요. 폰트는 Pretendard, 버튼 색 #0070f3 / hover #005bb5. placeholder는 ‘이름 입력’, ‘이메일 주소 입력’, ‘비밀번호 입력’, ‘비밀번호 확인’. 에러 메시지는 입력창 하단 **빨간색(#FF4D4F)**으로 표시해주세요. 모바일에선 입력창 100% 폭, 버튼 하단 여백 16px.',
    },
    { role: JOB_TYPES.FE, image: FEDeveloperImg, content: '텍스트를 입력하세요. (요청사항)' },
    {
      role: JOB_TYPES.BE,
      image: BEDeveloperImg,
      content:
        '회원가입 API는 **/api/v1/register**로 POST입니다. Body에 name, email, password 주세요. 성공 시 201 Created로 사용자 정보를 JSON으로 반환하고, 토큰은 발급하지 않아요(로그인은 3주차에서 별도 진행). 실패 시 400/409/422/500 등 상태 코드로 내려줄게요.',
    },
  ];

  const filteredRequests = requests.filter((request) => request.role !== userRole); // 직무별 요청사항 필터링 - 사용자 직무 제외

  // 직무별 요청사항 인덱스 이동
  const handlePrevRequest = () => {
    setCurrentRequestIndex((prev) => (prev > 0 ? prev - 1 : filteredRequests.length - 1));
  };
  const handleNextRequest = () => {
    setCurrentRequestIndex((prev) => (prev < filteredRequests.length - 1 ? prev + 1 : 0));
  };

  // 정답 탭 클릭 시 안내 모달 열기
  const handleAnswerTabClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLockedItemClick(e);
  };

  // 파일 선택 핸들러
  const handleFileSelect = (filePath: string) => {
    // 이미 열려있는 탭인지 확인
    const existingTab = editorTabs.find((tab) => tab.path === filePath);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }

    // 최대 10개 탭 제한
    if (editorTabs.length >= 10) {
      alert('최대 10개까지 파일을 열 수 있습니다.');
      return;
    }

    // 새 탭 생성
    const fileName = filePath.split('/').pop() || 'untitled';
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      path: filePath,
      name: fileName,
      isModified: false,
      isSaved: true,
    };

    // 파일 내용 로드 (없으면 빈 문자열)
    if (!fileContents[filePath]) {
      setFileContents((prev) => ({ ...prev, [filePath]: '' }));
    }

    setEditorTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  // 파일 삭제
  const handleDeleteFile = (filePath: string) => {
    const removeNode = (nodes: FileNode[]): FileNode[] =>
      nodes
        .filter((node) => node.path !== filePath)
        .map((node) => (node.children ? { ...node, children: removeNode(node.children) } : node));

    setFiles((prev) => removeNode(prev));

    // 삭제된 파일이 현재 열린 탭이면 닫기
    const tabToClose = editorTabs.find((t) => t.path === filePath);
    if (tabToClose) handleTabClose(tabToClose.id);
  };

  // 탭 클릭 핸들러
  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  // 탭 닫기 핸들러
  const handleTabClose = (tabId: string) => {
    const tab = editorTabs.find((t) => t.id === tabId);
    if (tab?.isModified) {
      const shouldClose = window.confirm('저장되지 않은 변경사항이 있습니다. 정말 닫으시겠습니까?');
      if (!shouldClose) return;
    }

    const newTabs = editorTabs.filter((t) => t.id !== tabId);
    setEditorTabs(newTabs);

    // 닫은 탭이 활성 탭이었다면 다른 탭으로 전환
    if (activeTabId === tabId) {
      if (newTabs.length > 0) {
        // 이전 탭이 있으면 그걸, 없으면 다음 탭
        const newActiveIdx = newTabs.findIndex((tab) => tab.id === tabId);
        const newActiveTab = newTabs[newActiveIdx >= 0 ? newActiveIdx - 1 : 0];
        setActiveTabId(newActiveTab.id); // 새 탭을 활성화
      } else {
        setActiveTabId(undefined); // 탭이 하나도 없으면 activeTabId를 undefined로
      }
    }
  };

  // 에디터 내용 변경 핸들러
  const handleEditorChange = (value: string | undefined) => {
    if (!activeTabId) return;

    const activeTab = editorTabs.find((t) => t.id === activeTabId);
    if (!activeTab) return;

    const newValue = value || '';
    setFileContents((prev) => ({ ...prev, [activeTab.path]: newValue }));

    // 변경 상태 업데이트
    setEditorTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId ? { ...tab, isModified: true, isSaved: false } : tab,
      ),
    );
    if (!isAutoSaveEnabled) return;
    // 자동 저장 타이머 리셋
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // 2초 후 자동 저장
    autoSaveTimerRef.current = setTimeout(() => {
      handleSave();
    }, 2000);
  };

  // 저장 핸들러
  const handleSave = async () => {
    if (!activeTabId) return;

    const activeTab = editorTabs.find((t) => t.id === activeTabId);
    if (!activeTab) return;

    try {
      // TODO: 실제 API 호출로 대체
      // await axiosInstance.put(`/v1/files${activeTab.path}`, {
      //   content: fileContents[activeTab.path],
      // });

      // 저장 성공
      setEditorTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTabId ? { ...tab, isModified: false, isSaved: true } : tab,
        ),
      );

      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
    } catch (error) {
      console.error('저장 실패:', error);
      toast.error('저장 실패, 다시 시도해주세요');
    }
  };

  // 웹 페이지 열기 핸들러
  const handleOpenWebPage = () => {
    // TODO: 웹 페이지 열기 기능 구현
    setTerminalOutput('웹 페이지를 여는 중...');
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`px-[3.164rem] pt-[1.009rem] pb-[2.688rem] flex gap-[0.813rem] h-[calc(100vh-5.095rem)] ${noRequest ? 'justify-center' : ''}`}
    >
      {/* 좌측 패널 */}
      <div
        className={`bg-gray-90 p-[0.969rem] rounded-2xl shadow-1 flex flex-col ${noRequest ? 'w-full max-w-1/2' : 'flex-[0_0_31.9%] max-w-[31.9%]'}`}
      >
        {/* 좌측 패널 - 탭 */}
        <div className="flex gap-[0.063rem]">
          {leftPanelTabs.map((tab) => {
            return (
              <button
                key={tab.key}
                onClick={(e) => {
                  if (tab.key === 'answer') {
                    handleAnswerTabClick(e);
                    return;
                  } else {
                    setActiveTab(tab.key);
                  }
                }}
                className={`basis-1/3 rounded-t-2xl h-[4.375rem] flex items-stretch! justify-center shadow-1 last:shadow-none ${activeTab === tab.key ? 'bg-white' : 'bg-gray-150'}`}
              >
                <tab.icon className={`translate-y-1/2 ${tab.sizeClass ?? ''}`} />
              </button>
            );
          })}
        </div>

        {/* 좌측 패널 - 내용 */}
        <div className="relative bg-white h-full rounded-2xl -mt-6 shadow-1 overflow-hidden">
          <div className="overflow-auto h-full">
            {/* 1. 실습 개요 패널 */}
            {activeTab === 'overview' && (
              <div className="flex flex-col pt-6 px-7 pb-[4.063rem]">
                {/* 직무 배지 */}
                <div className="flex ml-[0.175rem] mb-[0.419rem] bg-blue-300 w-fit rounded-2.7xl px-[0.419rem] py-[0.134rem]">
                  <span className="font-[590] text-[0.542rem]/[1.25] tracking-[0.03em] text-white">
                    {userRole}
                  </span>
                </div>

                {overviewItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-[0.43rem] mb-[3.353rem] last:mb-0 pr-15 last:pr-0"
                  >
                    <h3 className="font-[590] text-2xl/[1.17] tracking-wider">{item.title}</h3>
                    {item.title === '실습 결과' && (
                      <div className="mt-[0.787rem] mb-[0.695rem] bg-gray-90 h-64 flex items-center justify-center rounded-xs">
                        <span className="font-[410] text-[0.938rem]/[1.33] tracking-[0.03em]">
                          (실습 내용 사진)
                        </span>
                      </div>
                    )}
                    <p
                      className={`font-[410] leading-[1.33] tracking-[0.03em] whitespace-pre-line ${item.title === '실습 결과' ? 'text-[0.938rem]' : 'text-[0.812rem]'}`}
                    >
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 2. 요청 사항 패널 */}
            {activeTab === 'request' && (
              <div className={'min-h-full pt-[1.919rem] pb-[2.875rem] flex flex-col px-[1.375rem]'}>
                {/* 작업 절차 */}
                {noRequest ? (
                  <RequestBox
                    title="작업 절차"
                    content="### Version Control & Github Repository 연결
- Git Workflow 전략
    - 브랜치 전략 : Git Flow 방식
        
        main (배포용)
        ├── dev (작업용)
        ├── feature/register (2주차 회원가입)
        ├── feature/login-out (3주차 로그인/로그아웃)
        └── feature/post-save (4주차 게시물 저장)
        
    - 브랜치 명명 규칙
        - `feature/기능명`: 새로운 기능 개발
        - `bugfix/버그명`: 버그 수정
        - `hotfix/긴급수정명`: 프로덕션 긴급 수정
        - `release/버전명`: 릴리즈 준비
- 작업 디렉토리 생성
    
    mkdir insta-company && cd insta-company
    
- Frontend Github Repo 연결
    
    git clone https://github.com/hackathon-education/insta_clone_front.git
    
- Backend Github Repo 연결
    
    git clone [https://github.com/hackathon-education/insta_clone_back.git](https://github.com/hackathon-education/insta_clone_front.git)
    
- 프론트/백엔드를 **각각 별도 리포지토리**로 운영

### DataBase 설정 (추후 공개 DB로 제공)

- MongoDB 설치
    - mongoDB Compass 설치 - GUI로 확인
        
        https://www.mongodb.com/try/download/compass
        
    - mongoDB Community 서버 설치
        
        https://www.mongodb.com/try/download/community
        
- Database 생성
    - Add Connection
        
        ![image.png](attachment:63d242a4-e9c3-4509-ba0a-b7c548185cf0:image.png)
        
    - Name : InstaDB
    - → Save & Connect
    - 백엔드 Backend\src\main\resources\application.properties 파일 내용
        
        ```bash
        spring.application.name=Backend
        spring.data.mongodb.uri=mongodb://localhost:27017/InstaDB
        server.port=1010
        
        # JWT
        app.jwt.secret=change-this-to-a-long-random-secret
        app.jwt.exp-min=60
        ```
        
- Table(스키마) 생성 → 백엔드 연결 시 자동 생성
- 더미 Data 삽입 → 자동 삽입
    - 유저 data : 회원가입 시 자동 삽입
    - 게시물 data : 게시물 저장 기능 구현 시 사용 (삽입문 제공)

### Figma 디자인 확인

- Figma URL : [URL]
- 확인 사항
    - 컬러 팔레트
    - 타이포그래피
    - 컴포넌트 라이브러리
    - 레이아웃 가이드

### 동작 검증(연결 테스트)

- Frontend 검증
    - 의존성 설치 : npm install
    - 실행 : npm run dev
    - Port : 5173
- Backend 검증
    - 의존성 설치 : .\mvnw.cmd clean install
    - 실행 : .\mvnw.cmd spring-boot:run
    - Port : 1010
- Database 검증
- 연결 테스트
    - Backend에서 MongoDB 연결 확인
    - Frontend에서 Backend API 호출 테스트"
                  />
                ) : (
                  <>
                    <div className="flex-1 overflow-x-hidden flex">
                      <div
                        className="flex w-full min-h-full transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentRequestIndex * 100}%)` }}
                      >
                        {filteredRequests.map((request, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center min-w-full min-h-full"
                          >
                            <>
                              {/* 직무 배지 */}
                              <div className="flex px-[1.527rem] py-[0.363rem] bg-blue-400 rounded-1.5xl mb-[0.231rem]">
                                <span className="text-[0.938rem]/[1.2] text-white">
                                  {request.role}
                                </span>
                              </div>

                              {/* 직무 아바타 */}
                              <div className="flex w-[11.563rem] h-[18.063rem] mb-3.5 items-center justify-center">
                                <img src={request.image} alt="" className="object-contain" />
                              </div>

                              {/* 요청사항 박스 */}
                              <RequestBox title="요청사항" content={request.content} />
                            </>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 인디케이터 */}
                    <div className="flex justify-center gap-[0.563rem] mt-[1.875rem]">
                      {filteredRequests.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentRequestIndex(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                            index === currentRequestIndex ? 'bg-blue-400' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 직무별 요청사항 - 좌우 이동 버튼 */}
          {activeTab === 'request' && !noRequest && (
            <div className="absolute flex inset-0 justify-between top-[64.73%] mx-[1.375rem] pointer-events-none">
              <button
                onClick={handlePrevRequest}
                className="flex w-8 h-8 bg-white shadow-9 rounded-full items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white transition-colors hover:shadow-4 transition-shadow pointer-events-auto"
              >
                <FaChevronLeft className="w-2 stroke-30" />
              </button>
              <button
                onClick={handleNextRequest}
                className="flex w-8 h-8 bg-white shadow-9 rounded-full items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white transition-colors hover:shadow-4 transition-shadow pointer-events-auto"
              >
                <FaChevronRight className="w-2 stroke-30" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 코드 에디터 영역 */}
      {noRequest ? null : (
        <div className="flex-1 flex bg-gray-90 rounded-2xl shadow-1 overflow-hidden pt-[0.969rem] pl-[0.969rem]">
          <div className="flex flex-1 overflow-hidden gap-1.5">
            {/* 파일 트리 사이드바 */}
            {isSidebarOpen && (
              <div className="flex-[0_0_24%] flex-shrink-0 border-[0.5px] border-gray-200 rounded-2xl rounded-br-none overflow-hidden">
                <FileTree
                  files={files}
                  selectedPath={editorTabs.find((t) => t.id === activeTabId)?.path}
                  onFileSelect={handleFileSelect}
                  onDelete={handleDeleteFile}
                />
              </div>
            )}

            {/* 에디터 영역 */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* 탭 바 */}
              <EditorTabs
                tabs={editorTabs}
                activeTabId={activeTabId}
                onTabClick={handleTabClick}
                onTabClose={handleTabClose}
              />

              {/* Monaco Editor */}
              <div className="flex-1 border-[0.5px] border-gray-200 rounded-tr-2xl overflow-hidden bg-white">
                {activeTabId ? (
                  <div className="w-full h-full">
                    <CodeEditor
                      value={
                        fileContents[editorTabs.find((t) => t.id === activeTabId)?.path || ''] || ''
                      }
                      path={editorTabs.find((t) => t.id === activeTabId)?.path || ''}
                      onChange={handleEditorChange}
                      onSave={handleSave}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex items-center justify-center w-full h-full">
                      <img
                        src={`${import.meta.env.BASE_URL}favicon/android-chrome-512x512.png`}
                        alt="아이콘"
                        className="grayscale brightness-110 h-1/3"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 하단 패널 */}
              <BottomPanel
                onOpenWebPage={handleOpenWebPage}
                terminalOutput={terminalOutput}
                onSave={handleSave}
                isAutoSaveEnabled={isAutoSaveEnabled}
                setIsAutoSaveEnabled={setIsAutoSaveEnabled}
              />
            </div>
          </div>
        </div>
      )}

      <LockModal
        isOpen={isLockModalOpen}
        onClose={closeLockModal}
        message="정답을 보시겠습니까? 점수를 얻을 수 없습니다."
      />
    </div>
  );
};

export default CodeEditorPage;
