export const JOB_TYPES = {
  FRONT: 'Frontend',
  BACK: 'Backend',
  DESIGN: 'Designer',
  PLAN: 'Project Manager',
} as const;

export type JobKey = keyof typeof JOB_TYPES;
