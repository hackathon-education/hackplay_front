export const JOB_TYPES = {
  FRONT: 'Frontend',
  BACK: 'Backend',
  DESIGN: 'Designer',
  PLAN: 'Project Manager',
} as const;

export type JobKey = keyof typeof JOB_TYPES;

export const DIFFICULTY_LABELS = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
} as const;

export type DifficultyType = keyof typeof DIFFICULTY_LABELS;
