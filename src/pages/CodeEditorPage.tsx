import {
  type ReactElement,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BookOpenText,
  CheckCircle2,
  ExternalLink,
  FileText,
  Folder,
  Home,
  Maximize2,
  MessageSquareText,
  PenLine,
  RotateCcw,
  XCircle,
  X,
} from 'lucide-react';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { HiSearch } from 'react-icons/hi';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'sonner';

import { createFile, getFile, getProjectDirTree, updateFileContent, renameFile, moveFile, deleteFile } from '@/api/project';
import LogoPrimary from '@/assets/logo/logo-primary.svg?react';
import BEDeveloperImg from '@/assets/backend.png';
import DesignerImg from '@/assets/designer.png';
import FEDeveloperImg from '@/assets/frontend.png';
import PlannerImg from '@/assets/planner.png';
import BottomPanel from '@/components/features/BottomPanel';
import CodeEditor from '@/components/features/CodeEditor';
import CourseOutlineDrawer, {
  type OutlineChapter,
  type LessonProgress,
} from '@/components/features/CourseOutlineDrawer';
import EditorTabs from '@/components/features/EditorTabs';
import FileTree from '@/components/features/FileTree';
import { JOB_TYPES } from '@/constants/jobTypes';
import { ROUTES } from '@/constants/routes';
import {
  TEAM_PROJECT_LEARNING_DETAILS,
  TEAM_PROJECT_LEARNING_OVERVIEWS,
  type TeamProjectLearningContentBlock,
  type TeamProjectLearningListItem,
} from '@/data/teamProjectLearningContents';
import { TEAM_PROJECT_PRACTICE_TIPS } from '@/data/teamProjectPracticeTips';
import { TEAM_PROJECT_QUIZZES } from '@/data/teamProjectQuizzes';
import {
  TEAM_PROJECT_WEEK_GUIDES,
  type TeamProjectWeekGuideDocument,
} from '@/data/teamProjectWeekGuides';

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

interface RoleHandoff {
  role: string;
  roleLabel: string;
  image: string;
  detailLinks: HandoffDetailLink[];
  items: string[];
}

interface HandoffDetailLink {
  label: string;
  url: string;
}

type QuizModalMode = 'submitted' | 'answer' | 'success';

interface QuizModalState {
  mode: QuizModalMode;
  wrongQuestionIds: string[];
  showAnswers: boolean;
}

interface LessonIntro {
  title: string;
  description: string;
}

interface PracticeTipFileNode {
  name: string;
  type: 'file' | 'folder';
  isExpanded?: boolean;
  isMuted?: boolean;
  children?: PracticeTipFileNode[];
}

const LEFT_SIDEBAR_MIN_WIDTH = 260;
const LEFT_SIDEBAR_DEFAULT_WIDTH = 352;
const LEFT_SIDEBAR_MAX_WIDTH = 520;
const EDITOR_MIN_WIDTH = 420;
const FILE_TREE_DEFAULT_WIDTH = 272;
const RESIZER_LAYOUT_RESERVED_WIDTH = 56;

const LESSON_INTROS: Record<string, LessonIntro> = {
  'team-project-1': {
    title: '팀 프로젝트 구조 이해',
    description: '프로젝트의 큰 흐름과 협업 기준을 먼저 익힙니다.',
  },
  'team-project-2': {
    title: '프론트엔드 소스 구조 이해',
    description: '프론트엔드 폴더와 파일이 어떤 책임으로 나뉘는지 살펴봅니다.',
  },
  'team-project-3': {
    title: '회원가입 화면 구성',
    description: '이제 코드 에디터에서 회원가입 화면을 직접 구현합니다.',
  },
  'team-project-4': {
    title: '회원가입 유효성 검사',
    description: '입력값 검증과 사용자 피드백 흐름을 구현합니다.',
  },
};

const clampLeftSidebarWidth = (value: number, maxWidth: number) =>
  Math.min(Math.max(value, LEFT_SIDEBAR_MIN_WIDTH), Math.max(LEFT_SIDEBAR_MIN_WIDTH, maxWidth));

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

/** 강의 목차(주차) UI용 목업 — 추후 API 연동 */
const OUTLINE_CHAPTERS_MOCK: OutlineChapter[] = [
  {
    id: 'ch1',
    title: 'CHAPTER 01 · 회사 협업 방식 익히기',
    lessons: [
      {
        id: '1-1',
        title: '팀 프로젝트 구조 이해',
        duration: '1:05:00',
        progress: 'not_started',
      },
      {
        id: '1-2',
        title: '프론트엔드 소스 구조 이해',
        duration: '2:30:00',
        progress: 'not_started',
      },
      {
        id: '1-3',
        title: '스타일(CSS)과 코드 관리 규칙 이해',
        duration: '55:00',
        progress: 'not_started',
      },
      {
        id: '1-4',
        title: 'Github 관리 파일 이해',
        duration: '55:00',
        progress: 'not_started',
      },
      {
        id: '1-5',
        title: '로컬 개발 환경 & 데이터베이스 세팅',
        duration: '55:00',
        progress: 'not_started',
      },
      {
        id: '1-6',
        title: 'Git 원격 레포 연결 실습',
        duration: '55:00',
        progress: 'not_started',
      },
      {
        id: '1-7',
        title: '직무별 협업 흐름 이해',
        duration: '55:00',
        progress: 'not_started',
      },
    ],
  },
  {
    id: 'ch2',
    title: 'CHAPTER 02 · 간단한 이슈 해결 & Git 실습',
    lessons: [
      {
        id: '2-1',
        title: '팀 코드와 로컬 환경 동기화',
        duration: '1:05:00',
        progress: 'not_started',
      },
      {
        id: '2-2',
        title: '이슈를 생성하고 작업 범위 정의',
        duration: '2:30:00',
        progress: 'not_started',
      },
      {
        id: '2-3',
        title: '이슈 단위 브랜치로 작업 흐름 구성',
        duration: '55:00',
        progress: 'not_started',
      },
      {
        id: '2-4',
        title: '변경 사항 커밋 규칙 이해 및 적용',
        duration: '55:00',
        progress: 'not_started',
      },
      {
        id: '2-5',
        title: 'Pull Request로 변경 사항 공유',
        duration: '55:00',
        progress: 'not_started',
      },
      {
        id: '2-6',
        title: '리뷰 피드백 반영 흐름 이해',
        duration: '55:00',
        progress: 'not_started',
      },
      {
        id: '2-7',
        title: '머지 후 브랜치 정리 마무리',
        duration: '55:00',
        progress: 'not_started',
      },
    ],
  },
  {
    id: 'ch3',
    title: 'CHAPTER 03 · 인증 구조 설계와 책임 분리',
    lessons: [
      { id: '3-1', title: '회원가입 화면 구성', duration: '1:05:00', progress: 'not_started' },
      { id: '3-2', title: '회원가입 유효성 검사', duration: '2:30:00', progress: 'not_started' },
      { id: '3-3', title: '회원가입 API 연동', duration: '55:00', progress: 'not_started' },
      {
        id: '3-4',
        title: '회원가입 성공과 실패 처리 흐름 구성',
        duration: '55:00',
        progress: 'not_started',
      },
      { id: '3-5', title: '로그인 화면 구성', duration: '55:00', progress: 'not_started' },
      {
        id: '3-6',
        title: 'JWT 토큰 저장과 인증 상태 유지',
        duration: '55:00',
        progress: 'not_started',
      },
      {
        id: '3-7',
        title: '로그인 실패 처리와 UX 보완',
        duration: '55:00',
        progress: 'not_started',
      },
    ],
  },
  {
    id: 'ch4',
    title: 'CHAPTER 04 · 상태 관리와 UX 품질 설계',
    lessons: [
      { id: '4-1', title: '게시물 저장 UI 구현', duration: '1:05:00', progress: 'not_started' },
      {
        id: '4-2',
        title: '낙관적 업데이트로 저장 UX 구성',
        duration: '2:30:00',
        progress: 'not_started',
      },
      { id: '4-3', title: '게시물 저장 API 연동', duration: '55:00', progress: 'not_started' },
      {
        id: '4-4',
        title: '게시물 저장 해제 기능 구현',
        duration: '55:00',
        progress: 'not_started',
      },
      {
        id: '4-5',
        title: '인증 여부에 따른 저장 기능 접근 제어',
        duration: '55:00',
        progress: 'not_started',
      },
      { id: '4-6', title: 'Saved 목록 화면 구성', duration: '55:00', progress: 'not_started' },
      {
        id: '4-7',
        title: '로딩과 오류 상태 처리까지 완성',
        duration: '55:00',
        progress: 'not_started',
      },
    ],
  },
];

const OUTLINE_LESSONS_MOCK = OUTLINE_CHAPTERS_MOCK.flatMap((chapter) => chapter.lessons);
const OUTLINE_LESSON_IDS = OUTLINE_LESSONS_MOCK.map((lesson) => lesson.id);
const LOCKED_OUTLINE_LESSON_IDS = new Set(['4-7']);
const OPEN_OUTLINE_LESSON_ORDER = OUTLINE_LESSON_IDS.filter(
  (lessonId) => !LOCKED_OUTLINE_LESSON_IDS.has(lessonId),
);
const OPEN_OUTLINE_LESSON_IDS = new Set(OPEN_OUTLINE_LESSON_ORDER);
const getWorkspaceIdForOutlineLesson = (lessonId: string) => {
  const [chapter, lesson] = lessonId.split('-');
  return lesson === '1' ? `team-project-${chapter}` : `team-project-${lessonId}`;
};
const OUTLINE_LESSON_TO_WORKSPACE_ID = Object.fromEntries(
  OPEN_OUTLINE_LESSON_ORDER.map((lessonId) => [lessonId, getWorkspaceIdForOutlineLesson(lessonId)]),
) as Record<string, string>;
const WORKSPACE_TO_OUTLINE_LESSON_ID = Object.fromEntries(
  OUTLINE_LESSON_IDS.map((lessonId) => [getWorkspaceIdForOutlineLesson(lessonId), lessonId]),
) as Record<string, string>;

type WorkspaceNavState = {
  lectureMainPath?: string;
  projectId?: string;
};

const buildPracticeTipFileTree = (files: string[]): PracticeTipFileNode[] => {
  const root: PracticeTipFileNode = {
    name: `My First Project (${files.length})`,
    type: 'folder',
    isExpanded: true,
    children: [],
  };

  if (!files.length) {
    root.children = [{ name: '해당 파일 없음', type: 'file', isMuted: true }];
    return [root];
  }

  files.forEach((filePath) => {
    const segments = filePath.split('/').filter(Boolean);
    let children = root.children ?? [];

    segments.forEach((segment, index) => {
      const isFile = index === segments.length - 1;
      const nodeType: PracticeTipFileNode['type'] = isFile ? 'file' : 'folder';
      let node = children.find((child) => child.name === segment && child.type === nodeType);

      if (!node) {
        node = {
          name: segment,
          type: nodeType,
          isExpanded: !isFile,
          children: isFile ? undefined : [],
        };
        children.push(node);
      }

      if (!isFile) {
        node.children ??= [];
        children = node.children;
      }
    });
  });

  return [root];
};

function countProjectFiles(nodes: FileNode[]): number {
  let n = 0;
  for (const node of nodes) {
    if (node.type === 'file') n += 1;
    if (node.children?.length) n += countProjectFiles(node.children);
  }
  return n;
}

const PracticeTipTreeNode = ({
  node,
  level = 0,
}: {
  node: PracticeTipFileNode;
  level?: number;
}) => {
  const isFolder = node.type === 'folder';
  const hasChildren = Boolean(node.children?.length);
  const isExpanded = Boolean(node.isExpanded && hasChildren);

  return (
    <div>
      <div
        className={`flex h-6 min-w-0 items-center gap-1.5 text-xs ${
          node.isMuted ? 'text-neutral-400' : 'text-neutral-700'
        }`}
        style={{ paddingLeft: `${level * 1.1}rem` }}
      >
        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-neutral-500">
          {isFolder && hasChildren ? (
            isExpanded ? (
              <FaChevronDown className="h-2.5 w-2.5" />
            ) : (
              <FaChevronRight className="h-2.5 w-2.5" />
            )
          ) : null}
        </span>
        {isFolder ? (
          <Folder className="h-4 w-4 shrink-0 fill-yellow-300 text-yellow-400" />
        ) : (
          <FileText className="h-4 w-4 shrink-0 text-neutral-400" />
        )}
        <span className={`min-w-0 truncate ${level === 0 ? 'font-bold text-neutral-800' : ''}`}>
          {node.name}
        </span>
      </div>
      {isExpanded && (
        <div className="relative">
          {level === 0 && (
            <span className="absolute left-[1.4rem] top-0 h-full border-l border-dashed border-neutral-200" />
          )}
          {node.children?.map((child, index) => (
            <PracticeTipTreeNode
              key={`${child.name}-${child.type}-${level}-${index}`}
              node={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PracticeTipFileTreeCard = ({ nodes }: { nodes: PracticeTipFileNode[] }) => (
  <div className="min-h-[10rem] rounded-2xl bg-white/95 px-3 py-4 shadow-[0_10px_26px_rgba(0,0,0,0.10)]">
    <div className="space-y-0.5">
      {nodes.map((node, index) => (
        <PracticeTipTreeNode key={`${node.name}-${index}`} node={node} />
      ))}
    </div>
  </div>
);

const HandoffDetailButtons = ({
  links,
  size = 'compact',
}: {
  links: HandoffDetailLink[];
  size?: 'compact' | 'modal';
}) => {
  if (!links.length) return null;

  const buttonClass =
    size === 'modal'
      ? 'inline-flex min-w-0 items-center justify-center gap-2 rounded-lg bg-[#007df1] px-4 py-2 text-sm font-semibold leading-tight text-white transition-colors hover:bg-[#0064c1]'
      : 'inline-flex min-w-0 items-center justify-center gap-1 rounded-md bg-[#007df1] px-3 py-1.5 text-xs font-semibold leading-tight text-white shadow-sm transition-colors hover:bg-[#0064c1]';
  const iconClass = size === 'modal' ? 'h-4 w-4 shrink-0' : 'h-3 w-3 shrink-0';

  return (
    <div className="flex flex-wrap justify-end gap-2">
      {links.map((link) => (
        <a
          key={`${link.label}-${link.url}`}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className={buttonClass}
        >
          <span className="min-w-0 text-center">{link.label}</span>
          <ExternalLink className={iconClass} />
        </a>
      ))}
    </div>
  );
};

const WeekGuideText = ({ text }: { text: string }) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlPattern);

  return (
    <>
      {parts.map((part, index) =>
        part.match(/^https?:\/\//) ? (
          <a
            key={`${part}-${index}`}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#007df1] underline-offset-2 hover:underline"
          >
            {part}
          </a>
        ) : (
          <span key={`${part}-${index}`}>{part.replace(/\*\*/g, '')}</span>
        ),
      )}
    </>
  );
};

const WeekGuideMarkdownView = ({ content }: { content: string }) => {
  const lines = content.trim().split('\n');
  const elements: ReactElement[] = [];
  let codeLines: string[] = [];
  let isCodeBlock = false;
  let codeIndex = 0;

  const flushCode = () => {
    if (!codeLines.length) return;

    elements.push(
      <pre
        key={`code-${codeIndex}`}
        className="my-4 overflow-x-auto rounded-xl bg-neutral-950 px-4 py-3 text-xs leading-relaxed text-neutral-50"
      >
        <code>{codeLines.join('\n')}</code>
      </pre>,
    );
    codeIndex += 1;
    codeLines = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (isCodeBlock) {
        flushCode();
        isCodeBlock = false;
      } else {
        isCodeBlock = true;
      }
      return;
    }

    if (isCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (!trimmed) {
      return;
    }

    if (trimmed === '---') {
      elements.push(<hr key={`hr-${index}`} className="my-5 border-neutral-200" />);
      return;
    }

    if (trimmed.startsWith('# ')) {
      elements.push(
        <h3 key={`h1-${index}`} className="mt-1 text-2xl font-extrabold leading-tight text-neutral-950">
          <WeekGuideText text={trimmed.replace(/^#\s+/, '')} />
        </h3>,
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h4 key={`h2-${index}`} className="mt-6 text-lg font-extrabold leading-tight text-neutral-900">
          <WeekGuideText text={trimmed.replace(/^##\s+/, '')} />
        </h4>,
      );
      return;
    }

    if (trimmed.startsWith('### ')) {
      elements.push(
        <h5 key={`h3-${index}`} className="mt-5 text-base font-bold leading-tight text-neutral-900">
          <WeekGuideText text={trimmed.replace(/^###\s+/, '')} />
        </h5>,
      );
      return;
    }

    if (trimmed.startsWith('>')) {
      elements.push(
        <blockquote
          key={`quote-${index}`}
          className="my-3 rounded-xl border-l-4 border-primary-400 bg-primary-400/5 px-4 py-3 text-sm font-semibold leading-relaxed text-neutral-700"
        >
          <WeekGuideText text={trimmed.replace(/^>\s?/, '')} />
        </blockquote>,
      );
      return;
    }

    if (/^- \[ \]\s+/.test(trimmed)) {
      elements.push(
        <label
          key={`checkbox-${index}`}
          className="flex gap-2 rounded-lg bg-neutral-50 px-3 py-2 text-sm leading-relaxed text-neutral-700"
        >
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300" readOnly />
          <span>
            <WeekGuideText text={trimmed.replace(/^- \[ \]\s+/, '')} />
          </span>
        </label>,
      );
      return;
    }

    if (trimmed.startsWith('- ')) {
      elements.push(
        <div key={`li-${index}`} className="flex gap-2 text-sm leading-relaxed text-neutral-700">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
          <span>
            <WeekGuideText text={trimmed.replace(/^-\s+/, '')} />
          </span>
        </div>,
      );
      return;
    }

    const ordered = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (ordered) {
      elements.push(
        <div key={`ol-${index}`} className="flex gap-2 text-sm leading-relaxed text-neutral-700">
          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary-400/10 text-xs font-bold text-primary-500">
            {ordered[1]}
          </span>
          <span>
            <WeekGuideText text={ordered[2]} />
          </span>
        </div>,
      );
      return;
    }

    elements.push(
      <p key={`p-${index}`} className="text-sm leading-relaxed text-neutral-700">
        <WeekGuideText text={trimmed} />
      </p>,
    );
  });

  if (isCodeBlock) flushCode();

  return <div className="space-y-2">{elements}</div>;
};

const LearningContentList = ({ items }: { items: TeamProjectLearningListItem[] }) => (
  <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-800">
    {items.map((item, index) => (
      <li key={`${item.text}-${index}`}>
        <span>{item.text}</span>
        {item.children?.length ? <LearningContentList items={item.children} /> : null}
      </li>
    ))}
  </ul>
);

const LearningContentBlockView = ({ block }: { block: TeamProjectLearningContentBlock }) => {
  if (block.type === 'title') {
    return <h4 className="text-xl font-extrabold leading-snug text-neutral-950">{block.text}</h4>;
  }

  if (block.type === 'heading') {
    return <h5 className="text-base font-extrabold leading-snug text-neutral-950">{block.text}</h5>;
  }

  if (block.type === 'paragraph') {
    return <p className="text-neutral-700">{block.text}</p>;
  }

  if (block.type === 'quote') {
    return (
      <div className="rounded-xl border-l-4 border-primary-400 bg-primary-400/5 px-4 py-3 text-sm font-semibold leading-relaxed text-neutral-700">
        {block.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    );
  }

  if (block.type === 'list') {
    return <LearningContentList items={block.items} />;
  }

  if (block.type === 'code') {
    return (
      <pre className="overflow-x-auto rounded-xl bg-neutral-950 px-4 py-3 text-xs leading-relaxed text-neutral-50">
        <code>{block.code}</code>
      </pre>
    );
  }

  if (block.type === 'table') {
    return (
      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="bg-neutral-50 text-neutral-700">
            <tr>
              {block.headers.map((header) => (
                <th key={header} className="border-b border-neutral-200 px-3 py-2 font-bold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`${row.join('-')}-${rowIndex}`} className="odd:bg-white even:bg-neutral-50/70">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className="border-b border-neutral-100 px-3 py-2 align-top text-neutral-700 last:border-b-0"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <hr className="border-neutral-200" />;
};

const CodeEditorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { lectureId } = useParams<{ lectureId: string }>();
  const navState = location.state as WorkspaceNavState | null;
  const stateProjectId = navState?.projectId?.toString().trim();
  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const cached = sessionStorage.getItem('workspaceProjectId') ?? '';
    return cached;
  });

  const userRole = JOB_TYPES.FRONT; // 사용자 직무
  const [leftSectionTab, setLeftSectionTab] = useState<'weekGuide' | 'learning' | 'practiceTip'>(
    'weekGuide',
  );
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);
  const [selectedOutlineLessonId, setSelectedOutlineLessonId] = useState('1-1');
  const [practiceResultDraft, setPracticeResultDraft] = useState('');
  const [workspaceSearch, setWorkspaceSearch] = useState('');
  const [outlineSearchTarget, setOutlineSearchTarget] = useState<{
    lessonId: string;
    requestKey: number;
  } | null>(null);
  const [currentRequestIndex, setCurrentRequestIndex] = useState<number>(0);
  const [isHandoffModalOpen, setIsHandoffModalOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizModal, setQuizModal] = useState<QuizModalState | null>(null);
  const [lessonIntroModal, setLessonIntroModal] = useState<LessonIntro | null>(null);
  const [retryQuestionIds, setRetryQuestionIds] = useState<string[]>([]);
  const [lastWrongQuestionIds, setLastWrongQuestionIds] = useState<string[]>([]);
  const [weekGuideModalDocument, setWeekGuideModalDocument] =
    useState<TeamProjectWeekGuideDocument | null>(null);
  const activeWeekGuideChapterNumber = Number(lectureId?.match(/team-project-(\d+)/)?.[1] ?? 1);
  const activeWeekGuide =
    TEAM_PROJECT_WEEK_GUIDES[activeWeekGuideChapterNumber] ?? TEAM_PROJECT_WEEK_GUIDES[1];
  const noRequest = activeWeekGuide.handoffs.length === 0;
  const isContentOnlyWorkspace = activeWeekGuideChapterNumber === 1 || activeWeekGuideChapterNumber === 2;

  useEffect(() => {
    const next = stateProjectId ?? '';
    if (!next) return;
    setActiveProjectId(next);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('workspaceProjectId', next);
    }
  }, [stateProjectId]);

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

  // 서버에서 받은 디렉토리 트리 노드를 애플리케이션 FileNode 타입으로 변환
  const convertDirNode = (node: any, rootPath: string): FileNode => {
    const normalize = (p: string) => p.replace(/\\/g, '/');
    const rootNorm = normalize(rootPath);
    const nodePath = normalize(node.path || '');
    let relative = nodePath.startsWith(rootNorm) ? nodePath.slice(rootNorm.length) : nodePath;
    if (!relative.startsWith('/')) relative = `/${relative}`;

    const mapped: FileNode = {
      name: node.name || relative.split('/').pop() || '/',
      type: node.type === 'DIRECTORY' ? 'folder' : 'file',
      path: relative === '/' ? '/' : relative,
      children: [],
    };

    if (node.children && node.children.length > 0) {
      mapped.children = node.children.map((ch: any) => convertDirNode(ch, rootPath));
    }

    return mapped;
  };

  // 프로젝트 ID가 바뀌면 서버에서 루트 디렉토리 트리 조회
  useEffect(() => {
    if (isContentOnlyWorkspace) return;
    if (!activeProjectId) {
      toast.error('프로젝트 정보가 없어 워크스페이스를 불러올 수 없습니다.');
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const res = await getProjectDirTree(activeProjectId);
        if (!mounted) return;
        if (res && res.code === 200 && res.data) {
          const rootPath = res.data.path || '';
          // 최상단 폴더를 제외하고 children만 사용
          const children = res.data.children || [];
          const converted = children.map((child: any) => convertDirNode(child, rootPath));
          setFiles(converted);
        } else {
          toast.error('디렉토리 트리 조회에 실패했습니다.');
        }
      } catch (error) {
        console.error('디렉토리 트리 조회 오류', error);
        toast.error('디렉토리 트리 조회 중 오류가 발생했습니다.');
      }
    })();

    return () => {
      mounted = false;
    };
  }, [activeProjectId, isContentOnlyWorkspace]);
  const [editorTabs, setEditorTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | undefined>();
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const editorLayoutRef = useRef<HTMLDivElement | null>(null);
  const fileTreeSidebarRef = useRef<HTMLElement | null>(null);
  const resizeCleanupRef = useRef<(() => void) | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(LEFT_SIDEBAR_DEFAULT_WIDTH);
  const [isResizingLeftSidebar, setIsResizingLeftSidebar] = useState(false);

  // 자동 저장 토글
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(() => {
    // 초기값을 localStorage에서 읽어오기
    const stored = localStorage.getItem('isAutoSaveEnabled');
    return stored !== null ? JSON.parse(stored) : true;
  });
  useEffect(() => {
    localStorage.setItem('isAutoSaveEnabled', JSON.stringify(isAutoSaveEnabled));
  }, [isAutoSaveEnabled]);

  useEffect(() => {
    setQuizAnswers({});
    setQuizModal(null);
    setRetryQuestionIds([]);
    setLastWrongQuestionIds([]);
    setCurrentRequestIndex(0);
    setIsHandoffModalOpen(false);
    if (lectureId && WORKSPACE_TO_OUTLINE_LESSON_ID[lectureId]) {
      setSelectedOutlineLessonId(WORKSPACE_TO_OUTLINE_LESSON_ID[lectureId]);
    }
  }, [lectureId]);

  useEffect(
    () => () => {
      resizeCleanupRef.current?.();
    },
    [],
  );

  const getLeftSidebarMaxWidth = () => {
    const layoutWidth = editorLayoutRef.current?.getBoundingClientRect().width;
    const fileTreeWidth =
      fileTreeSidebarRef.current?.getBoundingClientRect().width ?? FILE_TREE_DEFAULT_WIDTH;

    if (!layoutWidth) {
      return LEFT_SIDEBAR_MAX_WIDTH;
    }

    return Math.min(
      LEFT_SIDEBAR_MAX_WIDTH,
      layoutWidth - fileTreeWidth - EDITOR_MIN_WIDTH - RESIZER_LAYOUT_RESERVED_WIDTH,
    );
  };

  const handleLeftSidebarResizeStart = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    resizeCleanupRef.current?.();

    const startX = event.clientX;
    const startWidth = leftSidebarWidth;
    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;

    setIsResizingLeftSidebar(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const nextWidth = startWidth + moveEvent.clientX - startX;
      setLeftSidebarWidth(clampLeftSidebarWidth(nextWidth, getLeftSidebarMaxWidth()));
    };

    const cleanup = () => {
      setIsResizingLeftSidebar(false);
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', cleanup);
      window.removeEventListener('pointercancel', cleanup);
      resizeCleanupRef.current = null;
    };

    resizeCleanupRef.current = cleanup;
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', cleanup);
    window.addEventListener('pointercancel', cleanup);
  };

  const handleLeftSidebarResizeKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 40 : 16;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setLeftSidebarWidth((width) =>
        clampLeftSidebarWidth(width - step, getLeftSidebarMaxWidth()),
      );
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setLeftSidebarWidth((width) =>
        clampLeftSidebarWidth(width + step, getLeftSidebarMaxWidth()),
      );
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setLeftSidebarWidth(LEFT_SIDEBAR_MIN_WIDTH);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setLeftSidebarWidth(clampLeftSidebarWidth(LEFT_SIDEBAR_MAX_WIDTH, getLeftSidebarMaxWidth()));
    }
  };

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
    { role: JOB_TYPES.FRONT, image: FEDeveloperImg, content: '텍스트를 입력하세요. (요청사항)' },
    {
      role: JOB_TYPES.BACK,
      image: BEDeveloperImg,
      content:
        '회원가입 API는 **/api/v1/register**로 POST입니다. Body에 name, email, password 주세요. 성공 시 201 Created로 사용자 정보를 JSON으로 반환하고, 토큰은 발급하지 않아요(로그인은 3주차에서 별도 진행). 실패 시 400/409/422/500 등 상태 코드로 내려줄게요.',
    },
  ];

  const filteredRequests = requests.filter((request) => request.role !== userRole); // 직무별 요청사항 필터링 - 사용자 직무 제외
  const handoffImageByRole: Record<string, string> = {
    [JOB_TYPES.PLAN]: PlannerImg,
    [JOB_TYPES.DESIGN]: DesignerImg,
    [JOB_TYPES.FRONT]: FEDeveloperImg,
    [JOB_TYPES.BACK]: BEDeveloperImg,
  };
  const roleHandoffs: RoleHandoff[] = activeWeekGuide.handoffs.map((handoff) => ({
    ...handoff,
    image: handoffImageByRole[handoff.role] ?? PlannerImg,
    detailLinks: handoff.detailLinks ?? [],
  }));
  const visibleRoleHandoffs = roleHandoffs.filter((request) => request.role !== userRole);
  const activeHandoffIndex = visibleRoleHandoffs.length
    ? currentRequestIndex % visibleRoleHandoffs.length
    : 0;
  const activeHandoff = visibleRoleHandoffs[activeHandoffIndex];
  const hasRoleHandoffs = visibleRoleHandoffs.length > 0;
  const showLegacyWeekGuide = false;

  // 직무별 요청사항 인덱스 이동
  const handlePrevRequest = () => {
    if (!visibleRoleHandoffs.length) return;
    setCurrentRequestIndex((prev) => (prev > 0 ? prev - 1 : visibleRoleHandoffs.length - 1));
  };
  const handleNextRequest = () => {
    if (!visibleRoleHandoffs.length) return;
    setCurrentRequestIndex((prev) => (prev < visibleRoleHandoffs.length - 1 ? prev + 1 : 0));
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

    // 파일 내용 로드
    const loadFileContent = async () => {
      try {
        if (!activeProjectId) {
          toast.error('프로젝트 정보가 없어 파일을 불러올 수 없습니다.');
          return;
        }

        const res = await getFile(activeProjectId, filePath);
        if (res && res.code === 200 && res.data) {
          setFileContents((prev) => ({ ...prev, [filePath]: res.data.content }));
        } else {
          toast.error('파일 조회에 실패했습니다.');
          setFileContents((prev) => ({ ...prev, [filePath]: '' }));
        }
      } catch (error) {
        console.error('파일 조회 오류:', error);
        toast.error('파일 조회 중 오류가 발생했습니다.');
        setFileContents((prev) => ({ ...prev, [filePath]: '' }));
      }
    };

    setFileContents((prev) => ({ ...prev, [filePath]: '' }));
    setEditorTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);

    // 파일 내용 비동기 로드
    loadFileContent();
  };

  // 파일 삭제
  const handleDeleteFile = async (filePath: string) => {
    try {
      if (!activeProjectId) {
        toast.error('프로젝트 정보가 없어 파일을 삭제할 수 없습니다.');
        return;
      }

      const body = {
        path: filePath.startsWith('/') ? filePath.slice(1) : filePath,
      };

      // 서버에 파일 삭제 요청
      await deleteFile(activeProjectId, body);

      // 로컬 파일 트리에서 노드 제거
      const removeNode = (nodes: FileNode[]): FileNode[] =>
        nodes
          .filter((node) => node.path !== filePath)
          .map((node) => (node.children ? { ...node, children: removeNode(node.children) } : node));

      setFiles((prev) => removeNode(prev));

      // 삭제된 파일이 현재 열린 탭이면 닫기
      const tabToClose = editorTabs.find((t) => t.path === filePath);
      if (tabToClose) handleTabClose(tabToClose.id);

      toast.success('파일을 삭제했습니다.');
    } catch (error) {
      console.error('파일 삭제 실패', error);
      toast.error('파일 삭제에 실패했습니다.');
    }
  };

  // 파일 생성 핸들러 (API 호출 후 로컬 상태 반영)
  const handleCreateFile = async (
    parentPath: string,
    type: 'file' | 'folder',
    name: string,
    content?: string,
  ) => {
    try {
      if (!activeProjectId) {
        toast.error('프로젝트 정보가 없어 파일을 생성할 수 없습니다.');
        return;
      }

      const body = {
        name,
        content: content ?? '',
        parentPath: parentPath.replace(/^\//, ''),
      };

      // 서버에 파일 생성 요청
      await createFile(activeProjectId, body);

      // 로컬 파일 트리에 새 노드 추가
      const normalizedParent = parentPath.startsWith('/') ? parentPath : `/${parentPath}`;
      const newNode: FileNode = { name, type: 'file', path: `${normalizedParent}/${name}` };

      const addNode = (nodes: FileNode[]): FileNode[] =>
        nodes.map((node) => {
          if (node.path === normalizedParent && node.type === 'folder') {
            const children = node.children ? [...node.children, newNode] : [newNode];
            return { ...node, children };
          }
          if (node.children) {
            return { ...node, children: addNode(node.children) };
          }
          return node;
        });

      setFiles((prev) => addNode(prev));
      toast.success('파일을 생성했습니다.');
    } catch (error) {
      console.error('파일 생성 실패', error);
      toast.error('파일 생성에 실패했습니다.');
    }
  };

  // 파일 이름 변경 핸들러
  const handleRenameFile = async (currentPath: string, newName: string) => {
    try {
      if (!activeProjectId) {
        toast.error('프로젝트 정보가 없어 파일명을 변경할 수 없습니다.');
        return;
      }

      const body = {
        currentPath,
        newName,
      };

      // 서버에 파일 이름 변경 요청
      await renameFile(activeProjectId, body);

      // 로컬 파일 트리 업데이트
      const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
      const newPath = `${parentPath}/${newName}`;

      const updateNode = (nodes: FileNode[]): FileNode[] =>
        nodes.map((node) => {
          if (node.path === currentPath) {
            return { ...node, path: newPath, name: newName };
          }
          if (node.children) {
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });

      setFiles((prev) => updateNode(prev));

      // 열려있는 탭의 path도 업데이트
      const tabToUpdate = editorTabs.find((t) => t.path === currentPath);
      if (tabToUpdate) {
        setEditorTabs((prev) =>
          prev.map((tab) =>
            tab.path === currentPath
              ? { ...tab, path: newPath, name: newName }
              : tab,
          ),
        );

        // 파일 내용도 옮기기
        setFileContents((prev) => {
          const content = prev[currentPath];
          const newContents = { ...prev };
          delete newContents[currentPath];
          if (content) {
            newContents[newPath] = content;
          }
          return newContents;
        });
      }

      toast.success('파일 이름을 변경했습니다.');
    } catch (error) {
      console.error('파일 이름 변경 실패', error);
      toast.error('파일 이름 변경에 실패했습니다.');
    }
  };

  // 파일 이동 핸들러
  const handleMoveFile = async (currentPath: string, newParentDir: string) => {
    try {
      if (!activeProjectId) {
        toast.error('프로젝트 정보가 없어 파일을 이동할 수 없습니다.');
        return;
      }

      const body = {
        currentPath,
        newParentDir,
      };

      // 서버에 파일 이동 요청
      await moveFile(activeProjectId, body);

      // 새로운 경로 계산
      const fileName = currentPath.split('/').pop() || '';
      const newPath = `${newParentDir}/${fileName}`;

      // 로컬 파일 트리 업데이트 - 기존 위치에서 제거 후 새 위치에 추가
      let nodeToMove: FileNode | null = null;

      const removeNode = (nodes: FileNode[]): FileNode[] => {
        return nodes.filter((node) => {
          if (node.path === currentPath) {
            nodeToMove = node;
            return false;
          }
          if (node.children) {
            node.children = removeNode(node.children);
          }
          return true;
        });
      };

      const addNode = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.path === newParentDir && node.type === 'folder' && nodeToMove) {
            const movedNode = { ...nodeToMove, path: newPath };
            const children = node.children ? [...node.children, movedNode] : [movedNode];
            return { ...node, children };
          }
          if (node.children) {
            return { ...node, children: addNode(node.children) };
          }
          return node;
        });
      };

      setFiles((prev) => {
        let result = removeNode([...prev]);
        result = addNode(result);
        return result;
      });

      // 열려있는 탭의 path도 업데이트
      const tabToUpdate = editorTabs.find((t) => t.path === currentPath);
      if (tabToUpdate) {
        setEditorTabs((prev) =>
          prev.map((tab) =>
            tab.path === currentPath
              ? { ...tab, path: newPath }
              : tab,
          ),
        );

        // 파일 내용도 옮기기
        setFileContents((prev) => {
          const content = prev[currentPath];
          const newContents = { ...prev };
          delete newContents[currentPath];
          if (content) {
            newContents[newPath] = content;
          }
          return newContents;
        });
      }

      toast.success('파일을 이동했습니다.');
    } catch (error) {
      console.error('파일 이동 실패', error);
      toast.error('파일 이동에 실패했습니다.');
    }
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
      if (!activeProjectId) {
        toast.error('프로젝트 정보가 없어 저장할 수 없습니다.');
        return;
      }

      // 파일 경로에서 프로젝트 루트를 기준으로 한 상대 경로 추출
      const filePath = activeTab.path.startsWith('/') ? activeTab.path.slice(1) : activeTab.path;

      // 파일 내용 수정 API 호출
      await updateFileContent(activeProjectId, {
        path: filePath,
        content: fileContents[activeTab.path] || '',
      });

      // 저장 성공
      setEditorTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTabId ? { ...tab, isModified: false, isSaved: true } : tab,
        ),
      );

      toast.success('파일이 저장되었습니다.');

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

  const lectureMainHref = useMemo(() => {
    const fromState = navState?.lectureMainPath;
    if (fromState) return fromState;
    if (lectureId?.startsWith('team-project')) {
      return ROUTES.COURSES.LECTURE_MAIN('fe', 'intermediate', 'team-project');
    }
    return ROUTES.COURSES.ROOT;
  }, [navState?.lectureMainPath, lectureId]);

  const weekLabel = useMemo(() => {
    const m = lectureId?.match(/(\d+)/);
    return m ? `${m[1]}주차` : '1주차';
  }, [lectureId]);

  const workspaceChapterNumber = useMemo(() => {
    const m = lectureId?.match(/team-project-(\d+)/);
    return m ? Number(m[1]) : 0;
  }, [lectureId]);
  const currentOutlineLessonId =
    lectureId && WORKSPACE_TO_OUTLINE_LESSON_ID[lectureId]
      ? WORKSPACE_TO_OUTLINE_LESSON_ID[lectureId]
      : selectedOutlineLessonId;
  const currentOutlineLesson = OUTLINE_LESSONS_MOCK.find(
    (lesson) => lesson.id === currentOutlineLessonId,
  );
  const currentLectureLabel = currentOutlineLesson
    ? `${currentOutlineLesson.id}. ${currentOutlineLesson.title}`
    : currentOutlineLessonId;
  const isQuizTab = workspaceChapterNumber === 1 || workspaceChapterNumber === 2;
  const quizQuestions = useMemo(
    () => TEAM_PROJECT_QUIZZES[currentOutlineLessonId] ?? [],
    [currentOutlineLessonId],
  );
  const visibleQuizQuestions = retryQuestionIds.length
    ? quizQuestions.filter((question) => retryQuestionIds.includes(question.id))
    : quizQuestions;
  const quizWrongQuestionIds = quizQuestions
    .filter((question) => quizAnswers[question.id] !== question.answerIndex)
    .map((question) => question.id);
  const quizWrongQuestions = quizQuestions.filter((question) =>
    quizModal?.wrongQuestionIds.includes(question.id),
  );
  const quizModalQuestions =
    quizModal?.mode === 'success'
      ? quizQuestions.slice(0, 1)
      : quizWrongQuestions.length
        ? quizWrongQuestions
        : quizQuestions.slice(0, 1);
  const currentOutlineLessonIndex = OUTLINE_LESSON_IDS.indexOf(currentOutlineLessonId);
  const nextOutlineLessonId =
    currentOutlineLessonIndex >= 0 ? OUTLINE_LESSON_IDS[currentOutlineLessonIndex + 1] : undefined;
  const nextOutlineLesson = OUTLINE_LESSONS_MOCK.find((lesson) => lesson.id === nextOutlineLessonId);
  const nextLectureId =
    nextOutlineLessonId && OUTLINE_LESSON_TO_WORKSPACE_ID[nextOutlineLessonId]
      ? OUTLINE_LESSON_TO_WORKSPACE_ID[nextOutlineLessonId]
      : 'team-project-2-1';
  const nextLessonIntro = nextOutlineLesson
    ? {
        title: nextOutlineLesson.title,
        description: '다음 강의의 주차 가이드에서 이어질 내용을 확인해보세요.',
      }
    : LESSON_INTROS[nextLectureId] ?? {
        title: `${workspaceChapterNumber + 1}주차 강의`,
        description: '다음 강의에서 이어질 내용을 확인해보세요.',
      };
  const outlineChapters = useMemo(() => {
    const currentOpenLessonIndex = OPEN_OUTLINE_LESSON_ORDER.indexOf(currentOutlineLessonId);

    return OUTLINE_CHAPTERS_MOCK.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => {
        const openLessonIndex = OPEN_OUTLINE_LESSON_ORDER.indexOf(lesson.id);
        const progress: LessonProgress =
          lesson.id === currentOutlineLessonId
            ? 'in_progress'
            : openLessonIndex !== -1 &&
                currentOpenLessonIndex !== -1 &&
                openLessonIndex < currentOpenLessonIndex
              ? 'completed'
              : 'not_started';

        return {
          ...lesson,
          progress,
          isLocked: !OPEN_OUTLINE_LESSON_IDS.has(lesson.id),
        };
      }),
    }));
  }, [currentOutlineLessonId]);
  const searchableOutlineLessons = useMemo(
    () => outlineChapters.flatMap((chapter) => chapter.lessons),
    [outlineChapters],
  );
  const activeLearningOverview =
    TEAM_PROJECT_LEARNING_OVERVIEWS[currentOutlineLessonId] ?? {
      lessonId: currentOutlineLessonId,
      summary: '강의 개요가 준비 중입니다.',
    };
  const activeLearningDetail = TEAM_PROJECT_LEARNING_DETAILS[currentOutlineLessonId];
  const activePracticeTip = TEAM_PROJECT_PRACTICE_TIPS[currentOutlineLessonId];
  const modifiedPracticeTipFiles = useMemo(
    () => buildPracticeTipFileTree(activePracticeTip?.modifiedFiles ?? []),
    [activePracticeTip],
  );
  const addedPracticeTipFiles = useMemo(
    () => buildPracticeTipFileTree(activePracticeTip?.addedFiles ?? []),
    [activePracticeTip],
  );
  const practiceTipRules = activePracticeTip?.rules.length
    ? activePracticeTip.rules
    : ['실습 Tip이 준비 중입니다.'];
  const showOutlineAssignmentButton = workspaceChapterNumber === 3 || workspaceChapterNumber === 4;

  const projectTitle = useMemo(() => `My First Project (${countProjectFiles(files)})`, [files]);

  const labDescription = activeWeekGuide.labDescription;
  const weekGuideDocuments = activeWeekGuide.guideDocuments ?? [];
  const isFoundationWeekGuide =
    activeWeekGuide.guideDisplay === 'modalCards' ||
    activeWeekGuide.guideDisplay === 'inlineDocument';

  const breadcrumbPath = useMemo(() => {
    const activePath = editorTabs.find((t) => t.id === activeTabId)?.path;
    const rel = activePath?.replace(/^\//, '') ?? '';
    if (!rel) return 'C: > Users > 바탕화면 > hackplay';
    return `C: > Users > 바탕화면 > hackplay > ${rel.split('/').join(' > ')}`;
  }, [editorTabs, activeTabId]);

  const leftTabs: { key: typeof leftSectionTab; label: string; Icon: typeof BookOpenText }[] = [
    { key: 'weekGuide', label: '주차 가이드', Icon: BookOpenText },
    { key: 'learning', label: '학습 내용', Icon: MessageSquareText },
    { key: 'practiceTip', label: isQuizTab ? '퀴즈' : '실습 Tip', Icon: PenLine },
  ];

  const handleQuizAnswerSelect = (questionId: string, optionIndex: number) => {
    setQuizAnswers((answers) => ({ ...answers, [questionId]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    if (!quizWrongQuestionIds.length) {
      setRetryQuestionIds([]);
      setLastWrongQuestionIds([]);
      setQuizModal({ mode: 'success', wrongQuestionIds: [], showAnswers: true });
      return;
    }

    setLastWrongQuestionIds(quizWrongQuestionIds);
    setQuizModal({
      mode: 'submitted',
      wrongQuestionIds: quizWrongQuestionIds,
      showAnswers: false,
    });
  };

  const handleQuizShowAnswer = () => {
    setLastWrongQuestionIds(quizWrongQuestionIds);
    setQuizModal({
      mode: quizWrongQuestionIds.length ? 'answer' : 'success',
      wrongQuestionIds: quizWrongQuestionIds,
      showAnswers: true,
    });
  };

  const handleQuizRetryWrong = () => {
    const wrongIds = quizModal?.wrongQuestionIds.length
      ? quizModal.wrongQuestionIds
      : lastWrongQuestionIds;

    if (!wrongIds.length) return;

    setRetryQuestionIds(wrongIds);
    setQuizAnswers((answers) => {
      const nextAnswers = { ...answers };
      wrongIds.forEach((id) => {
        delete nextAnswers[id];
      });
      return nextAnswers;
    });
    setQuizModal(null);
  };

  const handleQuizNextLesson = () => {
    setQuizModal(null);
    setLeftSectionTab('weekGuide');
    setLessonIntroModal(nextLessonIntro);
    navigate(ROUTES.WORKSPACE(nextLectureId), {
      state: { lectureMainPath: lectureMainHref, projectId: activeProjectId || undefined },
    });
  };

  const handleOutlineOpen = () => {
    setOutlineSearchTarget(null);
    setIsOutlineOpen(true);
  };

  const handleOutlineClose = () => {
    setIsOutlineOpen(false);
    setOutlineSearchTarget(null);
  };

  const handleOutlineLessonSelect = (lessonId: string) => {
    const workspaceId = OUTLINE_LESSON_TO_WORKSPACE_ID[lessonId];

    if (!workspaceId) {
      toast.info('아직 이동할 수 없는 강의입니다.');
      return;
    }

    setSelectedOutlineLessonId(lessonId);
    setLeftSectionTab('weekGuide');
    navigate(ROUTES.WORKSPACE(workspaceId), {
      state: { lectureMainPath: lectureMainHref, projectId: activeProjectId || undefined },
    });
  };

  const handleLectureSearch = () => {
    const searchText = workspaceSearch.trim();

    if (!searchText) {
      toast.info('검색할 강의명을 입력해주세요.');
      return;
    }

    const normalizedSearchText = searchText.toLowerCase().replace(/\s+/g, '');
    const matchedLesson = searchableOutlineLessons.find((lesson) => {
      const normalizedTitle = lesson.title.toLowerCase().replace(/\s+/g, '');
      return normalizedTitle.includes(normalizedSearchText);
    });

    if (!matchedLesson) {
      toast.error('일치하는 강의를 찾을 수 없습니다.');
      return;
    }

    setOutlineSearchTarget({
      lessonId: matchedLesson.id,
      requestKey: Date.now(),
    });
    setIsOutlineOpen(true);
  };

  return (
    <div className="flex h-dvh max-h-dvh min-h-0 w-full flex-col gap-3 overflow-hidden px-3 pb-3 pt-3 lg:px-4">
      <header className="flex shrink-0 flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <Link
          to={lectureMainHref}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-50"
          aria-label="강의 메인으로 돌아가기"
        >
          <FaChevronLeft className="h-4 w-4" />
        </Link>
        <LogoPrimary className="h-7 w-auto shrink-0 [&_path]:fill-[#007df1]" aria-hidden />
        <div className="min-w-[1rem] flex-1" />
        <button
          type="button"
          onClick={handleOutlineOpen}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-100"
        >
          {weekLabel}
          <HiOutlineMenuAlt2 className="h-5 w-5 text-neutral-600" />
        </button>
        <div
          className="min-w-0 max-w-[26rem] flex-[1_1_16rem] rounded-xl border border-primary-100 bg-white px-3 py-2 shadow-sm"
          title={currentLectureLabel}
        >
          <p className="truncate text-sm font-extrabold text-neutral-900">
            {currentLectureLabel}
          </p>
        </div>
        <div className="relative min-w-[12rem] max-w-md flex-1 basis-[200px]">
          <HiSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            value={workspaceSearch}
            onChange={(e) => setWorkspaceSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleLectureSearch();
              }
            }}
            placeholder="강의명을 검색해주세요"
            className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-3 text-sm outline-none ring-primary-400/30 placeholder:text-neutral-400 focus:border-primary-400 focus:ring-2"
          />
        </div>
      </header>

      <div
        ref={editorLayoutRef}
        className={`flex min-h-0 flex-1 gap-3 ${
          isContentOnlyWorkspace ? 'justify-center' : ''
        }`}
      >
        {/* 좌측 학습 패널 */}
        <aside
          className={`flex min-h-0 flex-col rounded-2xl bg-gradient-to-b from-[#e8f5f0] via-[#eef6f3] to-[#e9eaec] p-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)] ${
            isContentOnlyWorkspace ? 'w-full max-w-[60rem]' : 'shrink-0'
          }`}
          style={
            isContentOnlyWorkspace
              ? undefined
              : {
                  width: leftSidebarWidth,
                  minWidth: LEFT_SIDEBAR_MIN_WIDTH,
                  maxWidth: LEFT_SIDEBAR_MAX_WIDTH,
                }
          }
        >
          <div className="flex gap-1 rounded-xl bg-white/60 p-1 shadow-sm">
            {leftTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setLeftSectionTab(tab.key)}
                className={`flex min-h-[2.75rem] flex-1 items-center justify-center gap-1.5 rounded-lg px-2 text-center text-xs font-semibold leading-tight transition-colors sm:text-sm ${
                  leftSectionTab === tab.key
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-600 hover:bg-white/80'
                }`}
              >
                <tab.Icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative mt-3 flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="min-h-0 flex-1 overflow-y-auto">
              {leftSectionTab === 'learning' && (
                <div className="flex min-h-full flex-col px-5 pb-6 pt-5">
                  <section>
                    <h3 className="mb-3 text-base font-bold text-neutral-950">강의 개요</h3>
                    <div className="rounded-xl bg-white px-4 py-4 text-sm leading-relaxed text-neutral-700 shadow-[0_8px_24px_rgba(0,0,0,0.09)]">
                      {activeLearningOverview.summary}
                    </div>
                  </section>

                  <section className="mt-5">
                    <h3 className="mb-3 text-base font-bold text-neutral-950">강의 내용</h3>
                    <div className="rounded-xl bg-white px-5 py-5 text-sm leading-relaxed text-neutral-950 shadow-[0_8px_24px_rgba(0,0,0,0.09)]">
                      {activeLearningDetail ? (
                        <div className="space-y-5">
                          <h4 className="text-xl font-extrabold leading-snug text-neutral-950">
                            {activeLearningDetail.title}
                          </h4>
                          {activeLearningDetail.blocks.map((block, index) => (
                            <LearningContentBlockView
                              key={`${block.type}-${index}`}
                              block={block}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg bg-neutral-50 px-4 py-6 text-center text-sm font-semibold text-neutral-500">
                          이 강의의 상세 학습 내용은 준비 중입니다.
                        </div>
                      )}
                    </div>
                  </section>

                  <section className="mt-5">
                    <label
                      htmlFor="lecture-note"
                      className="mb-3 block text-base font-bold text-neutral-950"
                    >
                      강의메모
                    </label>
                    <textarea
                      id="lecture-note"
                      value={practiceResultDraft}
                      onChange={(e) => setPracticeResultDraft(e.target.value)}
                      placeholder="강의 메모"
                      className="min-h-[12rem] w-full resize-none rounded-xl border border-transparent bg-white px-4 py-4 text-sm leading-relaxed text-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,0.09)] outline-none ring-primary-400/20 placeholder:text-neutral-400 focus:border-primary-400 focus:ring-2"
                    />
                  </section>
                </div>
              )}

              {leftSectionTab === 'weekGuide' && (
                <div className="flex min-h-full flex-col px-5 pb-6 pt-5">
                  {isFoundationWeekGuide ? (
                    <>
                      <section>
                        <h3 className="mb-2 text-base font-bold text-neutral-950">실습설명</h3>
                        <div className="rounded-xl bg-white px-4 py-4 text-sm leading-relaxed text-neutral-600 shadow-[0_8px_24px_rgba(0,0,0,0.09)]">
                          {labDescription}
                        </div>
                      </section>

                      <section className="mt-5">
                        <h3 className="mb-3 text-base font-bold text-neutral-950">주차 가이드</h3>

                        {activeWeekGuide.guideDisplay === 'modalCards' ? (
                          <div className="grid gap-3 sm:grid-cols-2">
                            {weekGuideDocuments.map((guide, index) => (
                              <button
                                key={guide.id}
                                type="button"
                                onClick={() => setWeekGuideModalDocument(guide)}
                                className="group min-h-[9rem] rounded-2xl bg-white px-5 py-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.09)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,125,241,0.18)]"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-400/10 text-sm font-extrabold text-primary-500 group-hover:bg-primary-400 group-hover:text-white">
                                    {index + 1}
                                  </span>
                                  <BookOpenText className="h-5 w-5 shrink-0 text-neutral-300 transition-colors group-hover:text-primary-400" />
                                </div>
                                <p className="mt-4 text-base font-extrabold leading-snug text-neutral-950">
                                  {guide.title}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                                  {guide.summary}
                                </p>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {weekGuideDocuments.map((guide) => (
                              <article
                                key={guide.id}
                                className="rounded-2xl bg-white px-5 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.09)]"
                              >
                                <div className="mb-4">
                                  <h4 className="text-lg font-extrabold text-neutral-950">
                                    {guide.title}
                                  </h4>
                                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                                    {guide.summary}
                                  </p>
                                </div>
                                <div className="max-h-[34rem] overflow-y-auto rounded-xl border border-neutral-100 bg-neutral-50/60 px-4 py-4">
                                  <WeekGuideMarkdownView content={guide.content} />
                                </div>
                              </article>
                            ))}
                          </div>
                        )}
                      </section>
                    </>
                  ) : (
                    <>
                  <div className="relative flex min-h-[17rem] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#eef9f3] via-white to-[#fff2f8]">
                    {hasRoleHandoffs && activeHandoff ? (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevRequest}
                          aria-label="이전 직무 전달사항"
                          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-600 shadow-md transition-colors hover:bg-white hover:text-primary-500"
                        >
                          <FaChevronLeft className="h-4 w-4" />
                        </button>
                        <img
                          src={activeHandoff.image}
                          alt=""
                          className="h-64 max-h-full w-auto object-contain"
                        />
                        <button
                          type="button"
                          onClick={handleNextRequest}
                          aria-label="다음 직무 전달사항"
                          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-600 shadow-md transition-colors hover:bg-white hover:text-primary-500"
                        >
                          <FaChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <div className="rounded-2xl bg-white/85 px-6 py-5 text-center shadow-sm">
                        <p className="text-sm font-semibold text-neutral-500">
                          직무별 전달사항 없음
                        </p>
                        <p className="mt-2 text-base font-bold text-neutral-800">
                          {activeWeekGuide.handoffEmptyText}
                        </p>
                      </div>
                    )}
                  </div>

                  {hasRoleHandoffs && (
                    <div className="mt-3 flex justify-center gap-2">
                      {visibleRoleHandoffs.map((handoff, index) => (
                        <button
                          key={handoff.role}
                          type="button"
                          onClick={() => setCurrentRequestIndex(index)}
                          aria-label={`${handoff.roleLabel} 전달사항 보기`}
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            index === activeHandoffIndex ? 'bg-primary-400' : 'bg-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  <section className="mt-4">
                    <h3 className="mb-2 text-base font-bold text-neutral-950">실습설명</h3>
                    <div className="rounded-xl bg-white px-4 py-4 text-sm leading-relaxed text-neutral-600 shadow-[0_8px_24px_rgba(0,0,0,0.09)]">
                      {labDescription}
                    </div>
                  </section>

                  <section className="mt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-base font-bold text-neutral-950">직무별 전달사항</h3>
                      {activeHandoff && (
                        <span className="rounded-full bg-primary-400/10 px-2 py-1 text-xs font-semibold text-primary-500">
                          {activeHandoff.roleLabel}
                        </span>
                      )}
                    </div>
                    <div className="relative rounded-xl bg-white px-4 pb-4 pt-5 shadow-[0_8px_24px_rgba(0,0,0,0.09)]">
                      {activeHandoff ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsHandoffModalOpen(true)}
                            aria-label="직무별 전달사항 크게 보기"
                            className="absolute right-3 top-3 rounded-lg p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-primary-500"
                          >
                            <Maximize2 className="h-4 w-4" />
                          </button>

                          <ul className="space-y-5 pr-6">
                            {activeHandoff.items.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-sm leading-relaxed text-neutral-600"
                              >
                                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 fill-blue-100 text-primary-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          {activeHandoff.detailLinks.length ? (
                            <div className="mt-4">
                              <HandoffDetailButtons links={activeHandoff.detailLinks} />
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <div className="flex min-h-[8rem] items-center justify-center rounded-lg bg-neutral-50 px-4 text-center text-sm font-semibold text-neutral-500">
                          {activeWeekGuide.handoffEmptyText}
                        </div>
                      )}
                    </div>
                  </section>
                    </>
                  )}
                </div>
              )}

              {showLegacyWeekGuide && leftSectionTab === 'weekGuide' && (
                <div className="flex min-h-full flex-col px-[1.375rem] pb-[2.875rem] pt-[1.919rem]">
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

              {leftSectionTab === 'practiceTip' && (
                isQuizTab ? (
                  <div className="relative min-h-full overflow-hidden px-5 pb-6 pt-5">
                    <div className="pointer-events-none absolute left-20 top-48 h-72 w-8 rotate-[-45deg] rounded-full bg-[#99cdf9]/35" />
                    <div className="pointer-events-none absolute left-20 top-80 h-72 w-8 rotate-45 rounded-full bg-[#99cdf9]/80" />
                    <div className="pointer-events-none absolute bottom-28 right-10 h-8 w-48 rounded-full bg-[#99cdf9]/80" />

                    <h3 className="relative z-10 text-base font-bold text-neutral-950">Quiz</h3>
                    <div className="relative z-10 mt-3 flex flex-col gap-4">
                      {visibleQuizQuestions.map((question, questionIndex) => (
                        <div
                          key={question.id}
                          className="rounded-xl bg-white px-5 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.09)]"
                        >
                          <div className="grid grid-cols-[2rem_1fr] gap-x-2 gap-y-4 text-sm text-neutral-700">
                            <span className="text-2xl font-bold text-neutral-500">Q.</span>
                            <p className="pt-1 font-semibold">
                              {retryQuestionIds.length ? questionIndex + 1 : questionIndex + 1}.{' '}
                              {question.question}
                            </p>

                            <span className="text-2xl font-bold text-neutral-500">A.</span>
                            <ol className="space-y-3">
                              {question.options.map((option, index) => {
                                const optionNumber = index + 1;
                                const isSelected = quizAnswers[question.id] === index;

                                return (
                                  <li key={option}>
                                    <button
                                      type="button"
                                      onClick={() => handleQuizAnswerSelect(question.id, index)}
                                      className="flex w-full items-center gap-3 rounded-lg py-1 text-left transition-colors hover:bg-neutral-50"
                                    >
                                      <span
                                        className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs font-bold ${
                                          isSelected
                                            ? 'border-[#99cdf9] bg-[#dff0ff] text-neutral-700'
                                            : 'border-neutral-400 text-neutral-500'
                                        }`}
                                      >
                                        {optionNumber}
                                      </span>
                                      <span>{option}</span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ol>
                          </div>
                        </div>
                      ))}

                      <div className="flex flex-col items-end gap-2">
                        <button
                          type="button"
                          onClick={handleQuizSubmit}
                          className="rounded-full bg-[#007df1] px-7 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#0064c1]"
                        >
                          제출하기 -&gt;
                        </button>
                        <button
                          type="button"
                          onClick={handleQuizShowAnswer}
                          className="rounded-full bg-[#007df1] px-7 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#0064c1]"
                        >
                          답안 보기 -&gt;
                        </button>
                        <button
                          type="button"
                          onClick={handleQuizRetryWrong}
                          disabled={!lastWrongQuestionIds.length}
                          className="rounded-full bg-[#007df1] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#0064c1] disabled:bg-neutral-300 disabled:text-neutral-500"
                        >
                          틀린문제 다시 풀기 -&gt;
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative min-h-full overflow-hidden px-5 pb-6 pt-5">
                    <div className="pointer-events-none absolute left-16 top-52 h-72 w-8 rotate-[-45deg] rounded-full bg-[#99cdf9]/35" />
                    <div className="pointer-events-none absolute left-16 top-80 h-72 w-8 rotate-45 rounded-full bg-[#99cdf9]/70" />
                    <div className="pointer-events-none absolute bottom-72 right-8 h-8 w-48 rounded-full bg-[#99cdf9]/80" />

                    <div className="relative z-10 space-y-9">
                      <section>
                        <h3 className="mb-3 text-base font-extrabold text-neutral-950">
                          수정 파일
                        </h3>
                        <PracticeTipFileTreeCard nodes={modifiedPracticeTipFiles} />
                      </section>

                      <section>
                        <h3 className="mb-3 text-base font-extrabold text-neutral-950">
                          추가 파일
                        </h3>
                        <PracticeTipFileTreeCard nodes={addedPracticeTipFiles} />
                      </section>

                      <section>
                        <h3 className="mb-3 text-base font-extrabold text-neutral-950">
                          필수 규칙
                        </h3>
                        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_26px_rgba(0,0,0,0.10)]">
                          <div className="flex h-8 items-center gap-2 bg-neutral-50 px-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                          </div>
                          <div className="min-h-[14rem] bg-white px-5 py-4 text-sm leading-relaxed text-neutral-600">
                            <ul className="space-y-2">
                              {practiceTipRules.map((rule, index) => (
                                <li key={`${rule}-${index}`} className="whitespace-pre-line">
                                  {rule}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                )
              )}
            </div>

            {false && leftSectionTab === 'learning' && (
              <div className="shrink-0 border-t border-neutral-100 bg-neutral-50/90 p-3">
                <label className="sr-only" htmlFor="practice-result">
                  실습 결과
                </label>
                <textarea
                  id="practice-result"
                  value={practiceResultDraft}
                  onChange={(e) => setPracticeResultDraft(e.target.value)}
                  rows={3}
                  placeholder="텍스트를 입력하세요 (실습 결과)"
                  className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none ring-primary-400/20 placeholder:text-neutral-400 focus:border-primary-400 focus:ring-2"
                />
              </div>
            )}

            {showLegacyWeekGuide && leftSectionTab === 'weekGuide' && !noRequest && (
              <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-between px-4">
                <button
                  type="button"
                  onClick={handlePrevRequest}
                  className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-400 shadow-md transition-colors hover:bg-primary-400 hover:text-white"
                >
                  <FaChevronLeft className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={handleNextRequest}
                  className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-400 shadow-md transition-colors hover:bg-primary-400 hover:text-white"
                >
                  <FaChevronRight className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </aside>

        {!isContentOnlyWorkspace && (
          <>
        {/* 중앙: 에디터 + 하단 패널 */}
        <button
          type="button"
          role="separator"
          aria-label="왼쪽 사이드바 크기 조절"
          aria-orientation="vertical"
          aria-valuemin={LEFT_SIDEBAR_MIN_WIDTH}
          aria-valuemax={LEFT_SIDEBAR_MAX_WIDTH}
          aria-valuenow={Math.round(leftSidebarWidth)}
          title="사이드바 크기 조절"
          onPointerDown={handleLeftSidebarResizeStart}
          onKeyDown={handleLeftSidebarResizeKeyDown}
          className={`group relative z-20 -mx-3 flex w-9 shrink-0 cursor-col-resize items-stretch justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-400 ${
            isResizingLeftSidebar ? 'bg-primary-400/10' : 'hover:bg-primary-400/10'
          }`}
          style={{ cursor: 'col-resize', touchAction: 'none' }}
        >
          <span
            aria-hidden="true"
            className={`my-6 w-1 rounded-full transition-colors ${
              isResizingLeftSidebar
                ? 'bg-primary-400'
                : 'bg-neutral-300 group-hover:bg-primary-400 group-focus-visible:bg-primary-400'
            }`}
          />
        </button>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-[#eceff3] p-2 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
            <EditorTabs
              tabs={editorTabs}
              activeTabId={activeTabId}
              onTabClick={handleTabClick}
              onTabClose={handleTabClose}
            />
            <div className="min-h-0 flex-1 overflow-hidden bg-white">
              {activeTabId ? (
                <div className="h-full w-full">
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
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}favicon/android-chrome-512x512.png`}
                    alt=""
                    className="h-1/3 max-h-32 grayscale brightness-110"
                  />
                </div>
              )}
            </div>
            <BottomPanel
              onOpenWebPage={handleOpenWebPage}
              terminalOutput={terminalOutput}
              onSave={handleSave}
              isAutoSaveEnabled={isAutoSaveEnabled}
              setIsAutoSaveEnabled={setIsAutoSaveEnabled}
              breadcrumbPath={breadcrumbPath}
            />
          </div>
        </div>

        {/* 우측: 파일 트리 */}
        <aside
          ref={fileTreeSidebarRef}
          className="flex min-h-0 w-[min(17rem,26vw)] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
        >
          <FileTree
            files={files}
            projectTitle={projectTitle}
            selectedPath={editorTabs.find((t) => t.id === activeTabId)?.path}
            onFileSelect={handleFileSelect}
            onDelete={handleDeleteFile}
            onCreate={handleCreateFile}
            onRename={handleRenameFile}
            onMove={handleMoveFile}
          />
        </aside>
          </>
        )}
      </div>

      {isHandoffModalOpen && activeHandoff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="flex max-h-[86vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                  {activeHandoff.roleLabel}
                </p>
                <h2 className="text-xl font-bold text-neutral-950">직무별 전달사항</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsHandoffModalOpen(false)}
                aria-label="닫기"
                className="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-5">
              <div className="mb-5 flex justify-center rounded-2xl bg-gradient-to-br from-[#eef9f3] via-white to-[#fff2f8]">
                <img src={activeHandoff.image} alt="" className="h-48 w-auto object-contain" />
              </div>
              <ul className="space-y-4">
                {activeHandoff.items.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-neutral-700">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 fill-blue-100 text-primary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeHandoff.detailLinks.length ? (
              <div className="border-t border-neutral-100 px-6 py-4">
                <HandoffDetailButtons links={activeHandoff.detailLinks} size="modal" />
              </div>
            ) : null}
          </div>
        </div>
      )}

      {weekGuideModalDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                  주차 가이드
                </p>
                <h2 className="mt-1 text-2xl font-extrabold leading-tight text-neutral-950">
                  {weekGuideModalDocument.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {weekGuideModalDocument.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWeekGuideModalDocument(null)}
                aria-label="닫기"
                className="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <WeekGuideMarkdownView content={weekGuideModalDocument.content} />
            </div>
          </div>
        </div>
      )}

      {quizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="flex max-h-[90vh] w-full max-w-[29rem] flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="relative overflow-y-auto px-11 pb-7 pt-16 text-center">
              <button
                type="button"
                onClick={() => setQuizModal(null)}
                aria-label="닫기"
                className="absolute right-6 top-6 rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                className={`mx-auto flex h-20 w-20 rotate-[-14deg] items-center justify-center rounded-3xl ${
                  quizModal.mode === 'success' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                {quizModal.mode === 'success' ? (
                  <CheckCircle2 className="h-10 w-10 rotate-[14deg] text-green-500" />
                ) : (
                  <XCircle className="h-10 w-10 rotate-[14deg] text-red-500" />
                )}
              </div>

              <h2 className="mt-9 text-3xl font-extrabold text-neutral-700">
                {quizModal.mode === 'success' ? '정답입니다 !' : '다시 확인해볼까요?'}
              </h2>
              <p className="mt-5 text-lg font-semibold text-neutral-500">
                {quizModal.mode === 'success'
                  ? '축하합니다! 완벽하게 이해하고 계시네요.'
                  : quizModal.showAnswers
                    ? '틀린 문제와 정답을 함께 확인해보세요.'
                    : `${quizModal.wrongQuestionIds.length}문제를 다시 풀어보면 좋아요.`}
              </p>

              <div className="mt-8 space-y-4">
                {quizModalQuestions.map((question) => {
                  const selectedIndex = quizAnswers[question.id];
                  const selectedOption =
                    selectedIndex === undefined ? '선택한 답안 없음' : question.options[selectedIndex];
                  const answerOption = question.options[question.answerIndex];
                  const isCorrect = selectedIndex === question.answerIndex;

                  return (
                    <div
                      key={question.id}
                      className="rounded-2xl bg-white px-5 py-4 text-left text-neutral-600 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                    >
                      <div className="grid grid-cols-[1.5rem_1fr] gap-x-2 gap-y-2">
                        <span className="text-lg font-extrabold">Q.</span>
                        <p className="font-semibold leading-relaxed">{question.question}</p>
                        <span className="text-lg font-extrabold">
                          {isCorrect ? '✓' : '✕'}
                        </span>
                        <div>
                          <p className={isCorrect ? 'font-semibold text-neutral-700' : 'text-red-500'}>
                            {selectedIndex === undefined ? '-' : selectedIndex + 1}. {selectedOption}
                          </p>
                          {quizModal.showAnswers && !isCorrect && (
                            <p className="mt-2 font-semibold text-green-600">
                              정답: {question.answerIndex + 1}. {answerOption}
                            </p>
                          )}
                          {quizModal.showAnswers && (
                            <p className="mt-2 text-sm text-neutral-500">{question.explanation}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col items-end gap-3">
                {quizModal.mode === 'success' ? (
                  <button
                    type="button"
                    onClick={handleQuizNextLesson}
                    className="rounded-full bg-[#007df1] px-9 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#0064c1]"
                  >
                    다음강의로 이동 -&gt;
                  </button>
                ) : (
                  <>
                    {!quizModal.showAnswers && (
                      <button
                        type="button"
                        onClick={handleQuizShowAnswer}
                        className="rounded-full bg-[#007df1] px-9 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0064c1]"
                      >
                        답안 보기 -&gt;
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleQuizRetryWrong}
                      className="inline-flex items-center gap-2 rounded-full bg-[#007df1] px-7 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0064c1]"
                    >
                      틀린 문제 다시 풀기
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(lectureMainHref)}
              className="flex h-20 items-center justify-center gap-2 border-t border-neutral-100 text-base font-semibold text-neutral-500 transition-colors hover:bg-neutral-50"
            >
              <Home className="h-5 w-5" />
              메인으로 돌아가기
            </button>
          </div>
        </div>
      )}

      {lessonIntroModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="relative w-full max-w-[29rem] overflow-hidden rounded-[2rem] bg-white px-10 pb-9 pt-12 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setLessonIntroModal(null)}
              aria-label="닫기"
              className="absolute right-6 top-6 rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto flex h-20 w-20 rotate-[-14deg] items-center justify-center rounded-3xl bg-blue-50">
              <BookOpenText className="h-10 w-10 rotate-[14deg] text-[#007df1]" />
            </div>

            <p className="mt-8 text-sm font-bold text-[#007df1]">다음 강의 안내</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-neutral-800">
              {lessonIntroModal.title}
            </h2>
            <p className="mt-5 text-base font-semibold leading-relaxed text-neutral-500">
              {lessonIntroModal.description}
            </p>

            <button
              type="button"
              onClick={() => {
                setLeftSectionTab('weekGuide');
                setLessonIntroModal(null);
              }}
              className="mt-9 inline-flex items-center justify-center rounded-full bg-[#007df1] px-9 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#0064c1]"
            >
              주차 가이드 보기
            </button>
          </div>
        </div>
      )}

      <CourseOutlineDrawer
        open={isOutlineOpen}
        onClose={handleOutlineClose}
        chapters={outlineChapters}
        selectedLessonId={currentOutlineLessonId}
        focusedLessonId={outlineSearchTarget?.lessonId}
        focusedLessonKey={outlineSearchTarget?.requestKey}
        onSelectLesson={handleOutlineLessonSelect}
        showSubmitAssignment={showOutlineAssignmentButton}
        onSubmitAssignment={() => toast.info('과제 제출은 추후 연결됩니다.')}
      />
    </div>
  );
};

export default CodeEditorPage;
