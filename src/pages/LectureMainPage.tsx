import { useParams } from 'react-router-dom';

import TeamProjectPage from './TeamProjectPage';

type LectureMainParams = {
  job: string;
  level: string;
  lectureId?: string;
};

const LectureMainPage = () => {
  const { job, level, lectureId } = useParams<LectureMainParams>();

  return <div>{lectureId === 'team-project' && <TeamProjectPage />}</div>;
};

export default LectureMainPage;
