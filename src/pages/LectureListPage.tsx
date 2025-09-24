import { useParams } from 'react-router-dom';

import FrontIntermediatePage from './FrontIntermediatePage';

type LectureListParams = {
  job: string;
  level: string;
};

const LectureListPage = () => {
  const { job, level } = useParams<LectureListParams>();

  return <div>{job === 'fe' && level === 'intermediate' && <FrontIntermediatePage />}</div>;
};

export default LectureListPage;
