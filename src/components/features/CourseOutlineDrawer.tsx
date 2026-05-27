import { useEffect, useRef, useState } from 'react';
import { LockKeyhole, X } from 'lucide-react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';

export type LessonProgress = 'completed' | 'in_progress' | 'not_started';

export interface OutlineLesson {
  id: string;
  title: string;
  duration: string;
  free?: boolean;
  progress: LessonProgress;
  isLocked?: boolean;
}

export interface OutlineChapter {
  id: string;
  title: string;
  lessons: OutlineLesson[];
}

const STATUS_DOT: Record<LessonProgress, string> = {
  completed: 'bg-emerald-500',
  in_progress: 'bg-red-500',
  not_started: 'bg-orange-400',
};

interface CourseOutlineDrawerProps {
  open: boolean;
  onClose: () => void;
  chapters: OutlineChapter[];
  selectedLessonId: string;
  focusedLessonId?: string;
  focusedLessonKey?: number;
  onSelectLesson: (lessonId: string) => void;
  showSubmitAssignment?: boolean;
  onSubmitAssignment?: () => void;
}

const CourseOutlineDrawer = ({
  open,
  onClose,
  chapters,
  selectedLessonId,
  focusedLessonId,
  focusedLessonKey,
  onSelectLesson,
  showSubmitAssignment = true,
  onSubmitAssignment,
}: CourseOutlineDrawerProps) => {
  const [expandedChapterIds, setExpandedChapterIds] = useState<Set<string>>(
    () => new Set(chapters.map((chapter) => chapter.id)),
  );
  const [moveTargetLesson, setMoveTargetLesson] = useState<OutlineLesson | null>(null);
  const [lockedLesson, setLockedLesson] = useState<OutlineLesson | null>(null);
  const lessonRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const selectedChapter = chapters.find((chapter) =>
      chapter.lessons.some((lesson) => lesson.id === selectedLessonId),
    );

    if (!selectedChapter) return;

    setExpandedChapterIds((current) => {
      if (current.has(selectedChapter.id)) return current;
      const next = new Set(current);
      next.add(selectedChapter.id);
      return next;
    });
  }, [chapters, selectedLessonId]);

  useEffect(() => {
    if (!open || !focusedLessonId) return;

    const focusedChapter = chapters.find((chapter) =>
      chapter.lessons.some((lesson) => lesson.id === focusedLessonId),
    );

    if (!focusedChapter) return;

    setExpandedChapterIds((current) => {
      if (current.has(focusedChapter.id)) return current;
      const next = new Set(current);
      next.add(focusedChapter.id);
      return next;
    });

    const timeoutId = window.setTimeout(() => {
      lessonRefs.current[focusedLessonId]?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [chapters, focusedLessonId, focusedLessonKey, open]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterIds((current) => {
      const next = new Set(current);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const handleLessonClick = (lesson: OutlineLesson, selected: boolean) => {
    if (lesson.isLocked) {
      setLockedLesson(lesson);
      return;
    }

    if (selected) {
      onClose();
      return;
    }

    setMoveTargetLesson(lesson);
  };

  const handleConfirmMove = () => {
    if (!moveTargetLesson) return;

    onSelectLesson(moveTargetLesson.id);
    setMoveTargetLesson(null);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="패널 닫기"
        className="fixed inset-0 z-[60] bg-black/25 backdrop-blur-[1px]"
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.08)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-outline-title"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-neutral-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="강의 목차 닫기"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F4FF] text-[#1890FF] transition-colors hover:bg-[#D8EEFF]"
            >
              <HiOutlineMenuAlt2 className="h-6 w-6" />
            </button>
            <div>
              <h2 id="course-outline-title" className="text-lg font-bold text-neutral-900">
                강의 목차
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  진행완료
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  진행중
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-orange-400" />
                  시작 전
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 [scrollbar-width:thin] [scrollbar-color:#1890FF_#f0f0f0]">
          {chapters.map((chapter) => (
            <section key={chapter.id} className="mb-3">
              <button
                type="button"
                aria-expanded={expandedChapterIds.has(chapter.id)}
                aria-controls={`course-outline-${chapter.id}`}
                onClick={() => toggleChapter(chapter.id)}
                className="flex w-full items-center gap-2 rounded-lg bg-neutral-150 px-3 py-2.5 text-left text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-100"
              >
                <IoChevronDown
                  className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform ${
                    expandedChapterIds.has(chapter.id) ? 'rotate-0' : '-rotate-90'
                  }`}
                />
                {chapter.title}
              </button>
              {expandedChapterIds.has(chapter.id) && (
                <ul id={`course-outline-${chapter.id}`} className="mt-1 space-y-0.5 pl-1">
                  {chapter.lessons.map((lesson) => {
                    const selected = lesson.id === selectedLessonId;
                    const progress = selected ? 'in_progress' : lesson.progress;

                    return (
                      <li
                        key={lesson.id}
                        ref={(element) => {
                          lessonRefs.current[lesson.id] = element;
                        }}
                      >
                        <button
                          type="button"
                          aria-disabled={lesson.isLocked}
                          onClick={() => handleLessonClick(lesson, selected)}
                          className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                            selected
                              ? 'border-[#1890FF] bg-[#E6F4FF] text-neutral-900'
                              : focusedLessonId === lesson.id
                                ? 'border-[#1890FF]/70 bg-[#E6F4FF]/60 text-neutral-900 ring-2 ring-[#1890FF]/20'
                              : lesson.isLocked
                                ? 'cursor-not-allowed border-transparent bg-neutral-50 text-neutral-400 hover:bg-neutral-50'
                              : 'border-transparent bg-white hover:bg-neutral-100'
                          }`}
                        >
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[progress]}`}
                          />
                          <span className="min-w-0 flex-1 font-medium leading-snug">
                            {lesson.title}
                          </span>
                          {lesson.isLocked && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500">
                              <LockKeyhole className="h-3 w-3" />
                              잠김
                            </span>
                          )}
                          {lesson.free && (
                            <span className="shrink-0 rounded-md border border-[#91CAFF] bg-[#E6F4FF] px-1.5 py-0.5 text-[10px] font-semibold text-[#1890FF]">
                              무료
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          ))}
        </div>

        {showSubmitAssignment && (
          <div className="shrink-0 border-t border-neutral-200 p-4">
            <button
              type="button"
              onClick={onSubmitAssignment}
              className="w-full rounded-xl bg-[#1890FF] py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-[#1677d9] active:scale-[0.99]"
            >
              과제 제출하기
            </button>
          </div>
        )}
      </aside>

      {moveTargetLesson && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-sm rounded-3xl bg-white px-7 pb-7 pt-8 text-center shadow-2xl">
            <button
              type="button"
              aria-label="닫기"
              onClick={() => setMoveTargetLesson(null)}
              className="absolute right-4 top-4 rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6F4FF] text-[#1890FF]">
              <HiOutlineMenuAlt2 className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-extrabold text-neutral-900">강의를 이동하시겠습니까?</h3>
            <p className="mt-3 text-sm font-medium leading-relaxed text-neutral-500">
              {moveTargetLesson.title} 강의로 이동합니다.
            </p>
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => setMoveTargetLesson(null)}
                className="h-12 flex-1 rounded-xl border border-neutral-200 bg-white text-sm font-bold text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirmMove}
                className="h-12 flex-1 rounded-xl bg-[#1890FF] text-sm font-bold text-white transition-colors hover:bg-[#1677d9]"
              >
                이동하기
              </button>
            </div>
          </div>
        </div>
      )}

      {lockedLesson && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-sm rounded-3xl bg-white px-7 pb-7 pt-8 text-center shadow-2xl">
            <button
              type="button"
              aria-label="닫기"
              onClick={() => setLockedLesson(null)}
              className="absolute right-4 top-4 rounded-xl p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-extrabold text-neutral-900">강의가 잠겨있습니다</h3>
            <p className="mt-3 text-sm font-medium leading-relaxed text-neutral-500">
              이전 강의를 완료하면 {lockedLesson.title} 강의가 열립니다.
            </p>
            <button
              type="button"
              onClick={() => setLockedLesson(null)}
              className="mt-7 h-12 w-full rounded-xl bg-[#1890FF] text-sm font-bold text-white transition-colors hover:bg-[#1677d9]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseOutlineDrawer;
