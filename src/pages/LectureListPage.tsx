import { useParams } from 'react-router-dom';

import FrontBeginnerPage from './FrontBeginnerPage';

type LectureListParams = {
  job: string;
  level: string;
};

const LectureListPage = () => {
  const { job, level } = useParams<LectureListParams>();

  return <div>{job === 'fe' && level === 'intermediate' && <FrontBeginnerPage />}</div>;
};

export default LectureListPage;
