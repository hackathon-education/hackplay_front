export type LearningStatus = 'IN_PROGRESS' | 'COMPLETED';

export interface LearningLecture {
  lectureId: string;
  title: string;
  description?: string;
  position?: string; // e.g. Frontend
  rating?: number; // 0~5
  thumbnailUrl?: string;
  status: LearningStatus;
  startedAt?: string; // ISO
  teamCount?: number;
  lastStudiedAt?: string; // ISO
  resumeLectureId?: string; // 이어하기용 (없으면 lectureId 사용)
  instructorName?: string;
  instructorImageUrl?: string;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'; // 난도
  progressRate?: number; // 0~100
  studyDurationMinutes?: number; // 학습 시간 (분 단위)
}

type ApiEnvelope<T> = {
  code: number;
  message: string;
  data: T;
};
