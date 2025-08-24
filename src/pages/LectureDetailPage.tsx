import { useParams } from 'react-router-dom';

import GitPage from './GitPage';
import ToolPage from './ToolPage';

const LectureDetailPage = () => {
  const { lectureId } = useParams();

  switch (lectureId) {
    case 'git':
      return <GitPage />;
    case 'tool':
      return <ToolPage />;
  }
};

export default LectureDetailPage;
